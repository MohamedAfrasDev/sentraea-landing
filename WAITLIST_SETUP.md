# Waitlist → Google Sheets setup

The waitlist form posts to `/api/waitlist` (a Next.js route handler), which forwards
the submission to a Google Apps Script Web App that appends a row to your Google Sheet.

## 1. Create the Google Sheet

1. Go to <https://sheets.google.com> and create a new spreadsheet (e.g. "Sentraea Waitlist").
2. Optionally add a header row in row 1: `Timestamp | Email | Stage | Message`.
   (The script below creates it automatically if the sheet is empty.)

## 2. Add the Apps Script

1. In the sheet, open **Extensions → Apps Script**.
2. Delete any boilerplate and paste the script below.
3. Click **Save**.

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // avoid race conditions on concurrent submits
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Create a header row if the sheet is empty.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Email", "Stage", "Message"]);
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.email || "",
      data.stage || "",
      data.message || "",
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

## 5. Test

Fill out the waitlist form and submit. A new row should appear in your Google Sheet.

> When you deploy to production (Vercel, etc.), add the same
> `GOOGLE_SHEETS_WEBHOOK_URL` environment variable in the hosting dashboard.
