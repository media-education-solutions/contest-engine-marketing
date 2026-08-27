/**
 * Contest Engine — contact form + purchase + judge notification endpoint
 * (MED-31, MED-32, MED-35).
 *
 * Canonical copy. NOT built or imported by the site: paste into the Apps Script
 * project bound to the "Contest Engine Marketing" spreadsheet, then
 * Deploy > Manage deployments > edit > New version (keeps the same /exec URL).
 *
 * Called server-side by notifyInquiry() in src/lib/contact-delivery.ts and
 * notifyPurchase() in src/lib/purchase-delivery.ts. Auth is the shared TOKEN
 * in Script Properties, matched against CONTACT_SCRIPT_TOKEN. `body.kind`
 * selects the path; missing/absent kind defaults to "contact" so the
 * existing form is untouched. Contact landing pages can optionally set
 * `body.notifyRoute` to an allowlisted audience such as "teacher" or
 * "coordinator".
 */
// Notification recipients are configured in Apps Script > Project Settings >
// Script properties. Values are comma-separated so a route can have more than
// one recipient without changing this code or redeploying the web app.
//
// The defaults keep the endpoint safe during setup and are also the current
// production routing:
//   contact / purchase -> info@educationsolutions.media
//   judge              -> judging@educationsolutions.media
//
// Add teacher/coordinator properties when those landing pages have their own
// destinations. Until then, those routes fall back to the contact recipient.
const DEFAULT_NOTIFY_EMAILS = {
  contact: 'info@educationsolutions.media',
  purchase: 'info@educationsolutions.media',
  judge: 'judging@educationsolutions.media',
  teacher: 'info@educationsolutions.media',
  coordinator: 'info@educationsolutions.media',
};

const NOTIFY_PROPERTY_NAMES = {
  contact: 'CONTACT_NOTIFY_EMAILS',
  purchase: 'PURCHASE_NOTIFY_EMAILS',
  judge: 'JUDGE_NOTIFY_EMAILS',
  teacher: 'TEACHER_NOTIFY_EMAILS',
  coordinator: 'COORDINATOR_NOTIFY_EMAILS',
};

// Contact landing pages may opt into an audience route by sending
// `notifyRoute`. Keep this allowlist separate from the property lookup so a
// request can never select an arbitrary Script Property as a destination.
const CONTACT_NOTIFY_ROUTES = ['teacher', 'coordinator'];

// The TAB name (bottom of the spreadsheet window), not the file name. Falls back
// to the first tab below if no tab matches, so a stock "Sheet1" still works.
const SHEET_NAME = 'Inquiries';

// Must exist as its own tab — unlike SHEET_NAME there is no fallback, because
// falling back to the Inquiries tab would silently merge two different shapes.
const PURCHASE_SHEET_NAME = 'Purchases';

// Must exist as its own tab — no fallback, for the same reason as PURCHASE_SHEET_NAME.
const JUDGE_SHEET_NAME = 'Judges';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    const expected = PropertiesService.getScriptProperties().getProperty('TOKEN');
    if (!expected || body.token !== expected) {
      return json({ ok: false, error: 'unauthorized' });
    }

    const kind = body.kind || 'contact';
    if (kind === 'purchase') return handlePurchase(body);
    if (kind === 'judge') return handleJudge(body);
    return handleContact(body);
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function recipientsFor(route) {
  const propertyName =
    NOTIFY_PROPERTY_NAMES[route] || NOTIFY_PROPERTY_NAMES.contact;
  const fallback =
    DEFAULT_NOTIFY_EMAILS[route] || DEFAULT_NOTIFY_EMAILS.contact;
  const configured = PropertiesService.getScriptProperties().getProperty(propertyName);

  return (configured || fallback)
    .split(',')
    .map(function (email) {
      return email.trim();
    })
    .filter(Boolean)
    .join(',');
}

function contactRoute(body) {
  return CONTACT_NOTIFY_ROUTES.indexOf(body.notifyRoute) >= 0
    ? body.notifyRoute
    : 'contact';
}

function handleContact(body) {
  // Append first: a mail failure must never cost us the Sheet row.
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  sheet.appendRow([
    new Date(),
    body.name || '',
    body.email || '',
    body.organization || '',
    body.role || '',
    body.message || '',
  ]);

  const mailed = sendMail({
    to: recipientsFor(contactRoute(body)),
    replyTo: body.email,
    subject:
      'New inquiry from ' +
      body.name +
      (body.organization ? ' (' + body.organization + ')' : ''),
    body: [
      'Name: ' + body.name,
      'Email: ' + body.email,
      'Organization: ' + (body.organization || '—'),
      'Role: ' + body.role,
      '',
      body.message,
    ].join('\n'),
  });

  return json({ ok: true, mailed: mailed });
}

function handlePurchase(body) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(PURCHASE_SHEET_NAME);
  if (!sheet) {
    return json({ ok: false, error: 'missing "Purchases" tab' });
  }

  // Append first: a mail failure must never cost us the Sheet row.
  const addOns = body.addOns || [];
  sheet.appendRow([
    new Date(),
    body.teacherName || '',
    body.email || '',
    body.phone || '',
    body.schoolName || '',
    body.schoolAddress || '',
    body.schoolPhone || '',
    body.plan || '',
    addOns.join(', '),
    body.amount || '',
    body.stripeSessionId || '',
  ]);

  const mailed = sendMail({
    to: recipientsFor('purchase'),
    replyTo: body.email,
    subject: 'New Contest Engine purchase — ' + (body.schoolName || body.teacherName || ''),
    body: [
      'Plan: ' + body.plan,
      'Add-ons: ' + (addOns.length ? addOns.join(', ') : 'none'),
      'Amount: $' + ((body.amount || 0) / 100).toFixed(2),
      '',
      'Teacher: ' + body.teacherName,
      'Email: ' + body.email,
      'Phone: ' + (body.phone || '—'),
      '',
      'School: ' + body.schoolName,
      'Address: ' + (body.schoolAddress || '—'),
      'School phone: ' + (body.schoolPhone || '—'),
      '',
      'Stripe session: ' + body.stripeSessionId,
    ].join('\n'),
  });

  return json({ ok: true, mailed: mailed });
}

function handleJudge(body) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(JUDGE_SHEET_NAME);
  if (!sheet) {
    return json({ ok: false, error: 'missing "Judges" tab' });
  }

  // Append first: a mail failure must never cost us the Sheet row.
  sheet.appendRow([
    new Date(), body.judgeKind || '', body.name || '', body.email || '',
    body.phone || '', body.jobTitle || '', body.note || '',
  ]);

  const mailed = sendMail({
    to: recipientsFor('judge'),
    replyTo: body.email,
    subject: 'New judge interest — ' + (body.judgeKind || '') + ': ' + body.name,
    body: [
      'Type: ' + body.judgeKind,
      'Name: ' + body.name,
      'Email: ' + body.email,
      'Phone: ' + (body.phone || '—'),
      'Job title: ' + (body.jobTitle || '—'),
      '',
      body.note,
    ].join('\n'),
  });

  return json({ ok: true, mailed: mailed });
}

function sendMail(opts) {
  try {
    MailApp.sendEmail(opts);
    return true;
  } catch (mailErr) {
    console.error('mail failed: ' + mailErr); // quota or scope problem — the row is already safe
    return false;
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
