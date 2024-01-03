const { google } = require('googleapis');
// change to src/traitlets-database-key.json for local testing
const serviceAccountKeyFile = "/etc/secrets/traitlets-database-key.json";
const sheetId = process.env.GOOGLE_SHEETS_ID;
const tabName = 'Orders';
const range = 'A:v';

async function getGoogleSheetClient() {
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: serviceAccountKeyFile,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      const authClient = await auth.getClient();
      return google.sheets({
        version: 'v4',
        auth: authClient,
      });
    } catch (error) {
      console.error("Error getting Google Sheets client:", error);
      throw new Error("Error getting Google Sheets client");
    }
  }

async function writeGoogleSheet(googleSheetClient, data) {
  console.log("Before writing to Google Sheets:", new Date().toISOString());
  try {
    console.log(sheetId)
    if(sheetId){
      console.log("sheet id", sheetId)
    }
    else{
      console.log("no sheet id")
    }
    await googleSheetClient.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${tabName}!${range}`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        "majorDimension": "ROWS",
        "values": [data],
      },
    });
    console.log("Write operation successful!");
  } catch (error) {
    console.error("Error appending data to Google Sheets:", error);
  }
  
  console.log("After writing to Google Sheets:", new Date().toISOString());
}

module.exports = { getGoogleSheetClient, writeGoogleSheet }
