// The demo contests seeded into the product app's TEST project for MED-42 capture.
// Everything here is fictional: schools, titles, and judge feedback. Nothing visible in
// the app says so, on purpose: every string here can end up on camera. Clips are the
// approved Mixkit stock in stock.json, referenced by id.
//
// Three contests at different lifecycle stages, so every flow can be filmed:
//   finished: results published, winners visible (results/winners shots)
//   judging:  deadlines passed, judge3 mid-review (judging, rating, ranking shots)
//   open:     taking entries, QR self-registration on (student-side shots)
//
// Review shape: [clipId, title, rating?, feedback?]. No rating = not reviewed yet.

/**
 * Contests that `npm run capture` creates on camera (clip 5). The seed reset removes them
 * by EXACT name so a re-shoot starts clean. Never match with LIKE.
 */
export const CAPTURE_CONTEST_NAMES = ["Bayside Student Media Awards"];

export const JUDGES = {
  maya: "judge1@contest-engine.com",
  carlos: "judge2@contest-engine.com",
  priya: "judge3@contest-engine.com",
};

export const CATEGORY_COPY = {
  Documentary: {
    description: "A true story about a real person, place or event.",
    rules: "Up to 5 minutes. Original footage only; credit any music you use.",
  },
  "Music Video": {
    description: "An original visual piece set to music.",
    rules: "Up to 4 minutes. Music must be original or properly licensed.",
  },
  "Short Film": {
    description: "A scripted narrative or experimental short.",
    rules: "Up to 7 minutes including credits.",
  },
  "Sports Highlights": {
    description: "A highlight reel or story from school or community sports.",
    rules: "Up to 3 minutes. Get permission from the coaches and athletes you film.",
  },
  PSA: {
    description: "A public service announcement about an issue in your community.",
    rules: "30 to 60 seconds. End with a clear call to action.",
  },
};

export const SCHOOLS = {
  "High School": [
    "Lakeside High School",
    "Cedar Ridge High School",
    "Northgate Academy",
    "Westbrook High School",
    "Summit Valley High School",
    "Bayview Preparatory",
  ],
  "Middle School": [
    "Pine Hollow Middle School",
    "Eastside Middle School",
    "Oak Grove Middle School",
    "Riverside Charter School",
  ],
};

export const CONTESTS = [
  {
    key: "finished",
    name: "Lakeside Student Film Festival",
    code: "LKSF26",
    ownerCode: "71101501",
    codePrefix: "71",
    status: "finished",
    createdDaysAgo: 80,
    deadlineDaysFromNow: -45,
    cover: 51295,
    description:
      "An annual showcase of student filmmaking from middle and high schools across the lake region.",
    rules: "One entry per student per category. Entries must be original student work.",
    unusedCodes: 2,
    divisions: [
      {
        name: "High School",
        categories: [
          {
            name: "Documentary",
            judge: "maya",
            state: "approved",
            entries: [
              [34477, "Self-Taught", 9, "Smart, honest premise. Showing your own setup makes the film feel personal. Tighten the opening seconds and this is festival-ready."],
              [46563, "Roots", 8, "Beautiful close-ups of the work itself. A line of narration or a short interview would tell us who this person is."],
              [4519, "First Period", 7, "Good instinct to follow the group. Try a few varied angles so the walk builds toward something."],
              [983, "Corner Stand", 6, "Lively location and good color. The edit lingers, so cut on movement to keep the pace up."],
            ],
          },
          {
            name: "Music Video",
            judge: "carlos",
            state: "approved",
            entries: [
              [51295, "After Hours", 9, "The choreography and the camera move together. Excellent framing of all five dancers and confident night lighting."],
              [44152, "Crimson", 8, "A bold color choice that pays off. The silhouette look is striking; a second angle would add rhythm."],
              [3267, "Loud Neighbors", 7, "Real rehearsal energy. Watch your exposure on the bright cymbals and cut closer to the beat."],
              [42836, "One Take", 6, "Strong performance and a clean audio setup. A single static shot needs more variety to hold a full song."],
            ],
          },
          {
            name: "Short Film",
            judge: "priya",
            state: "approved",
            entries: [
              [18308, "Condensation", 10, "A complete story told with one gesture. Patient, controlled and memorable. Outstanding work."],
              [9011, "Finals Week", 8, "Your lead carries the scene with small expressions, and the warm lighting sets the mood well."],
              [48525, "Undertow", 8, "Gorgeous aerial photography. Give us a character or a voice to connect the images to a story."],
              [4855, "Volume Up", 7, "A fun, confident tracking shot. Think about what changes between the start and the end of the walk."],
              [42343, "Skyline", 5, "Impressive footage, but it plays as b-roll. What is the film about? Build a structure around these shots."],
            ],
          },
        ],
      },
      {
        name: "Middle School",
        categories: [
          {
            name: "Sports Highlights",
            judge: "maya",
            state: "approved",
            entries: [
              [43494, "Twelve Yards", 9, "Great tension built in seconds. The low angle and stadium lights make it feel like a championship final."],
              [34389, "Concrete Waves", 8, "Smooth camera work that keeps up with the rider. Add a landing shot to finish the sequence."],
              [609, "Split Time", 7, "Slow motion highlights the effort. A wider establishing shot would give the race some context."],
              [44454, "Above the Rim", 6, "A creative angle on the dunk. The clip ends too quickly, so build up to the big moment."],
            ],
          },
          {
            name: "PSA",
            judge: "carlos",
            state: "approved",
            entries: [
              [25556, "Downstream", 9, "Uncomfortable in the right way. The image makes the argument for you. Add a clear call to action at the end."],
              [33076, "Pick It Up", 8, "Shows the solution, not just the problem. Close-ups of individual volunteers would make it more personal."],
              [47741, "Exhale", 6, "A powerful silhouette, but the message is unclear. Who is the audience, and what should they do?"],
            ],
          },
        ],
      },
    ],
  },
  {
    key: "judging",
    name: "Riverbend Youth Media Awards",
    code: "RVMA26",
    ownerCode: "72111502",
    codePrefix: "72",
    status: "closed",
    createdDaysAgo: 40,
    deadlineDaysFromNow: -5,
    cover: 34477,
    description:
      "Recognizing outstanding student media from across the Riverbend district.",
    rules: "One entry per student per category. Entries must be original student work.",
    unusedCodes: 3,
    divisions: [
      {
        name: "High School",
        categories: [
          {
            // Hero judging clip: Behind the Lens is left unreviewed on purpose.
            name: "Documentary",
            judge: "priya",
            state: "in_progress",
            entries: [
              [34477, "Behind the Lens"],
              [46563, "Hands in the Soil", 8, "Patient camera and great detail on the hands. Tell us who this farmer is."],
              [983, "Saturday Market", 6, "Good energy at the stalls. Find one person to follow and the story will come into focus."],
              [4519, "Between Classes"],
            ],
          },
          {
            // Fully reviewed but not ranked yet: for the drag-to-rank clip.
            name: "Music Video",
            judge: "priya",
            state: "in_progress",
            entries: [
              [44152, "Red Room", 9, "Striking color and silhouette. Confident, stylish work."],
              [51295, "Street Choreo", 8, "Tight choreography and clean framing of the whole group."],
              [3267, "Garage Days", 7, "An authentic rehearsal feel. Vary the shot sizes to match the energy of the song."],
              [42836, "Studio Session", 6, "A strong vocal performance. The static shot needs movement or cutaways."],
            ],
          },
          {
            name: "Short Film",
            judge: "carlos",
            state: "completed",
            entries: [
              [18308, "Fogged Glass", 9, "A whole story in one gesture. Beautifully restrained."],
              [9011, "The Night Before", 8, "Your lead's small expressions do the work. Lovely warm lighting."],
              [48525, "Tide", 7, "Stunning aerials. Connect them to a character or a voice."],
              [4855, "Headphones On", 7, "A confident tracking shot. Let something change by the end of the walk."],
              [42343, "City After Dark", 6, "Impressive footage that needs a story to hold it together."],
            ],
          },
        ],
      },
      {
        name: "Middle School",
        categories: [
          {
            name: "Sports Highlights",
            judge: "priya",
            state: "in_progress",
            entries: [
              [44454, "Fourth Quarter"],
              [43494, "The Penalty"],
              [34389, "Skate Park Sessions"],
              [609, "Last Lap"],
            ],
          },
          {
            name: "PSA",
            judge: "maya",
            state: "in_progress",
            entries: [
              [25556, "What We Leave Behind", 8, "A clear, strong image. End with a specific call to action."],
              [33076, "River Cleanup"],
              [47741, "Smokestack"],
            ],
          },
        ],
      },
    ],
  },
  {
    key: "open",
    name: "Harbor City Student Showcase",
    code: "HCSS27",
    ownerCode: "73111503",
    codePrefix: "73",
    status: "published",
    createdDaysAgo: 10,
    deadlineDaysFromNow: 30,
    cover: 18308,
    publicRegistration: true,
    description:
      "Harbor City's showcase for student filmmakers in grades 6 through 12. Scan the QR code on your flyer to register.",
    rules: "One entry per student per category. Entries must be original student work.",
    unusedCodes: 8,
    divisions: [
      {
        name: "High School",
        categories: [
          { name: "Documentary", judge: "maya", state: "open", entries: [[46563, "Garden Club"]] },
          { name: "Music Video", judge: "carlos", state: "open", entries: [[44152, "Night Drive"]] },
          { name: "Short Film", judge: "carlos", state: "open", entries: [[18308, "Window Seat"]] },
        ],
      },
      {
        name: "Middle School",
        categories: [{ name: "Sports Highlights", judge: "maya", state: "open", entries: [[34389, "Kickflip Diaries"]] }],
      },
    ],
  },
];
