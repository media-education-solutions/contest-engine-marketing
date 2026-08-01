/**
 * Contest Engine — contact form notification endpoint (MED-31).
 *
 * Canonical copy. NOT built or imported by the site: paste into the Apps Script
 * project bound to the "Contest Engine Marketing" spreadsheet, then
 * Deploy > Manage deployments > edit > New version (keeps the same /exec URL).
 *
 * Called server-side by notifyInquiry() in src/lib/contact-delivery.ts.
 * Auth is the shared TOKEN in Script Properties, matched against CONTACT_SCRIPT_TOKEN.
 */
// Everyone who should get the new-inquiry email. Add or remove addresses freely,
// then redeploy (Manage deployments > edit > New version). Each address counts
// separately against the MailApp daily quota.
const NOTIFY_EMAILS = ['hello@example.com'];

// The TAB name (bottom of the spreadsheet window), not the file name. Falls back
// to the first tab below if no tab matches, so a stock "Sheet1" still works.
const SHEET_NAME = 'Inquiries';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    const expected = PropertiesService.getScriptProperties().getProperty('TOKEN');
    if (!expected || body.token !== expected) {
      return json({ ok: false, error: 'unauthorized' });
    }

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

    let mailed = true;
    try {
      MailApp.sendEmail({
        to: NOTIFY_EMAILS.join(','), // comma-separated = one email, several recipients
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
    } catch (mailErr) {
      mailed = false; // quota or scope problem — the row is already safe
      console.error('mail failed: ' + mailErr);
    }

    return json({ ok: true, mailed: mailed });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
