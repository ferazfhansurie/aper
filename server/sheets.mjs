import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// For ES modules compatibility with __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to your service account key file
const CREDENTIALS_PATH = path.join(__dirname, '../service_account.json');
// You'll need to create a Google Sheet and put its ID here
const SHEET_ID = process.env.GOOGLE_SHEET_ID || '1pNlYGv0wKUTJAuvEBKdZy2tokrQnXVHhv8GkniSdDp8';

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
export const getPastResults = async (req, res) => {
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
export const saveResult = async (req, res) => {
  try {
    const sheets = initSheetsClient();
    const { url, date, report } = req.body;
    
    // Parse the report to extract structured data
    const reportData = parseReportToStructuredData(report);
    
    // Add basic metadata
    reportData.url = url;
    reportData.date = date;
    
    // Get the headers
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A1:Z1',
    });
    
    let headers = headerResponse.data.values?.[0] || [];
    
    // Create a new array of headers with "Deal ID" first (if it exists)
    const newHeaders = Object.keys(reportData);
    
    // Find the Deal ID field (if it exists)
    const dealIdField = newHeaders.find(header => 
      header.toLowerCase().includes('deal id') || 
      header.toLowerCase().includes('deal - id')
    );
    
    // Reorder headers to put Deal ID first
    let orderedHeaders = [];
    
    if (dealIdField) {
      // Add Deal ID first
      orderedHeaders.push(dealIdField);
      // Add all other headers
      orderedHeaders = [
        ...orderedHeaders,
        ...newHeaders.filter(header => header !== dealIdField)
      ];
    } else {
      orderedHeaders = newHeaders;
    }
    
    // Filter out headers that already exist
    const headersToAdd = orderedHeaders.filter(key => !headers.includes(key));
    
    if (headersToAdd.length > 0) {
      // If headers are empty, use the ordered headers directly
      if (headers.length === 0) {
        headers = orderedHeaders;
      } else {
        // Otherwise, add new headers to existing ones
        headers = [...headers, ...headersToAdd];
      }
      
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
    const rowData = headers.map(header => reportData[header] || '');
    
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

// Helper function to parse the report into a structured object
function parseReportToStructuredData(report) {
  const data = {};
  
  if (!report || typeof report !== 'string') {
    return data;
  }
  
  // Split the report into sections
  const sections = report.split(/\n\s*\n/); // Split by empty lines
  
  for (const section of sections) {
    const lines = section.split('\n').filter(line => line.trim());
    
    // Check if this is a section with a title
    if (lines.length > 0) {
      // Remove numbers and special characters from section title
      const sectionTitle = lines[0]
        .replace(/^[\d\.\s]+/, '') // Remove numbers and dots at the beginning
        .replace(/[:#\-*]/g, '')
        .trim();
      
      // Process each line in the section
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Check if line contains a key-value pair (contains a colon)
        if (line.includes(':')) {
          const [key, ...valueParts] = line.split(':');
          const value = valueParts.join(':').trim();
          
          // Clean the key - remove numbers at the beginning
          const cleanKey = key.trim().replace(/^[\d\.\s]+/, '');
          
          // Create a column name by combining section title and key
          const columnName = `${sectionTitle} - ${cleanKey}`;
          data[columnName] = value;
        }
        // Removed the "else if" block that was creating "item" entries
      }
    }
  }
  
  return data;
}