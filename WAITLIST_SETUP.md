# Waitlist → Google Sheets setup

The waitlist form posts to `/api/waitlist` (a Next.js route handler), which forwards
the submission to a Google Apps Script Web App that appends a row to your Google Sheet.

## 1. Create the Google Sheet

1. Go to <https://sheets.google.com> and create a new spreadsheet (e.g. "Sentraea Waitlist").
2. Optionally add a header row in row 1: `Timestamp | Name | Email | Company | MRR Band | Decision`.
   (The script below creates it automatically if the sheet is empty.)

## 2. Add the Apps Script

1. In the sheet, open **Extensions → Apps Script**.
2. Delete any boilerplate and paste the script below.
3. Click **Save**.

```javascript
var HEADERS = ["Timestamp", "Name", "Email", "Company", "MRR Band", "Decision"];

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}

// POST — append a signup row.
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // avoid race conditions on concurrent submits
  try {
    var sheet = getSheet();

    // Create a header row if the sheet is empty.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.company || "",
      data.mrrBand || "",
      data.decision || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// GET — return the live signup count (rows minus the header).
function doGet() {
  var lastRow = getSheet().getLastRow();
  var count = Math.max(lastRow - 1, 0);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, count: count }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon → **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, authorize when prompted (accept the Google warning — it's your own script).
5. Copy the **Web app URL** — it ends in `/exec`.

## 4. Wire it into the app

1. Open `.env.local` in the project root.
2. Paste the URL:

   ```
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXXXXXX/exec
   ```

3. Restart the dev server (`npm run dev`) so the env var is picked up.

> **Already deployed an older version of the script?** After pasting the new
> script, go to **Deploy → Manage deployments → ✏️ Edit → Version: New version →
> Deploy**. The `/exec` URL stays the same, so no env-var change is needed.

## 5. Test

Fill out the waitlist form and submit. A new row should appear in your Google Sheet.

The live counter reads the same Web App via `GET /api/waitlist`, which returns
`{ count }` (number of data rows in the sheet). The count is cached for 60
seconds on the server, so new signups can take up to a minute to reflect for
other visitors.

> When you deploy to production (Vercel, etc.), add the same
> `GOOGLE_SHEETS_WEBHOOK_URL` environment variable in the hosting dashboard.
