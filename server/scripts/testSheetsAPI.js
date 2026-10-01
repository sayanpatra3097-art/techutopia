import { google } from 'googleapis';

async function testAuth() {
  try {
    const auth = await google.auth.getClient({
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });
    console.log("ADC Auth Success!");
    
    const sheets = google.sheets({ version: 'v4', auth });
    const meta = await sheets.spreadsheets.get({
      spreadsheetId: '1p2WP3foWUSvGdOJcGJE1YAN4X69fu22xaYtHSHf3W9g',
    });
    console.log("Meta success! Sheet: " + meta.data.sheets[0].properties.title);
  } catch (err) {
    console.error("ADC Auth Failed:", err.message);
  }
}
testAuth();
