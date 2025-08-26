const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Path to your service account key file
const CREDENTIALS_PATH = path.join(__dirname, '../service_account.json');
// You'll need to create a Google Sheet and put its ID here
const SHEET_ID = process.env.GOOGLE_SHEET_ID || '1rutfMePOlLlJbRo5COLs3H6jNWQTphlr0tLUSfOChFg';

// Initialize the Google Sheets API
const initSheetsClient = () => {
  try {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error);
    throw error;
  }
};

// Get all past results from the sheet
const getPastResults = async (req, res) => {
  try {
    const sheets = initSheetsClient();
    
    // Get the data from the first sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A2:Z', // Assuming headers are in row 1
    });
    
    const rows = response.data.values || [];
    
    // Get the headers
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A1:Z1',
    });
    
    const headers = headerResponse.data.values?.[0] || [];
    
    // Convert rows to objects with headers as keys
    const results = rows.map((row, index) => {
      const result = { id: `result-${index}` };
      
      headers.forEach((header, i) => {
        if (i < row.length) {
          result[header] = row[i];
        }
      });
      
      return result;
    });
    
    res.json(results);
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Sheets' });
  }
};

// Save a new result to the sheet
const saveResult = async (req, res) => {
  try {
    const sheets = initSheetsClient();
    const data = req.body;
    
    // Get the headers
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A1:Z1',
    });
    
    let headers = headerResponse.data.values?.[0] || [];
    
    // Add any new headers that don't exist yet
    const newHeaders = Object.keys(data).filter(key => !headers.includes(key));
    
    if (newHeaders.length > 0) {
      headers = [...headers, ...newHeaders];
      
      // Update the headers row
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        resource: {
          values: [headers],
        },
      });
    }
    
    // Prepare the row data in the same order as headers
    const rowData = headers.map(header => data[header] || '');
    
    // Append the new row
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A2',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [rowData],
      },
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    res.status(500).json({ error: 'Failed to save data to Google Sheets' });
  }
};

module.exports = {
  getPastResults,
  saveResult,
};