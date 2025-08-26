// firebase.mjs
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serviceAccountPath = path.join(__dirname, '..', 'sa_firebase.json');

// Initialize Firebase
try {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  process.exit(1);
}

// Configure Firestore to ignore undefined properties
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });
const researchCollection = db.collection('research_results');

/**
 * Recursively clean an object to make it Firestore-compatible
 * Removes undefined values, functions, circular references, and unwanted symbols
 * @param {Object} obj - The object to clean
 * @param {Map} seen - Map to track already processed objects (for circular reference detection)
 * @returns {Object} - A cleaned copy of the object
 */
function cleanForFirestore(obj, seen = new Map()) {
  // Handle null or undefined
  if (obj === null || obj === undefined) {
    return null;
  }
  
  // Handle primitive types
  if (typeof obj !== 'object') {
    // Convert functions to null
    if (typeof obj === 'function') {
      return null;
    }
    
    // Clean string values by removing unwanted symbols
    if (typeof obj === 'string') {
      // Remove hyphens and other unwanted symbols
      return obj.replace(/-/g, '');
    }
    
    return obj;
  }
  
  // Check for circular references
  if (seen.has(obj)) {
    return null; // Break the circular reference by returning null
  }
  
  // Add this object to our "seen" map
  seen.set(obj, true);
  
  // Handle Date objects
  if (obj instanceof Date) {
    return admin.firestore.Timestamp.fromDate(obj);
  }
  
  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => cleanForFirestore(item, seen));
  }
  
  // Handle objects
  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    // Skip keys that start with underscore (often internal properties)
    if (key.startsWith('_')) continue;
    
    // Skip functions and undefined values
    if (typeof value === 'function' || value === undefined) continue;
    
    // Clean the key by removing hyphens
    const cleanedKey = key.replace(/-/g, '');
    
    cleaned[cleanedKey] = cleanForFirestore(value, seen);
  }
  
  return cleaned;
}

/**
 * Save a research result to Firebase
 * @param {Object} result - The research result to save
 * @returns {Promise<string>} - The ID of the saved document
 */
export async function saveResult(result) {
  try {
    // Clean the result object to make it Firestore-compatible
    const cleanedResult = cleanForFirestore(result);
    
    // Add timestamp
    const resultWithTimestamp = {
      ...cleanedResult,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const docRef = await researchCollection.add(resultWithTimestamp);
    console.log(`Result saved with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('Error saving result to Firebase:', error);
    throw error;
  }
}

/**
 * Get past research results from Firebase
 * @param {number} limit - Maximum number of results to return
 * @returns {Promise<Array>} - Array of research results
 */
export async function getPastResults(limit = 1000) {
  try {
    // Convert limit to integer to ensure it's a valid value
    const limitValue = parseInt(limit, 10) || 1000;
    
    const snapshot = await researchCollection
      .orderBy('timestamp', 'desc')
      .limit(limitValue)
      .get();
    
    const results = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      
      // Convert Firebase timestamps to readable strings
      const processedData = Object.entries(data).reduce((acc, [key, value]) => {
        // Check if the value is a Firebase timestamp
        if (value && typeof value === 'object' && value._seconds !== undefined) {
          // Convert to ISO string
          acc[key] = new Date(value._seconds * 1000).toISOString();
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});
      
      results.push({
        id: doc.id,
        ...processedData
      });
    });
    
    return results;
  } catch (error) {
    console.error('Error getting past results from Firebase:', error);
    throw error;
  }
}

export async function updateResult(id, updatedData) {
  try {
    const docRef = researchCollection.doc(id);
    await docRef.update(cleanForFirestore(updatedData));
    console.log(`Result ${id} updated successfully`);
    return true;
  } catch (error) {
    console.error('Error updating result:', error);
    throw error;
  }
}

export async function deleteResult(id) {
  try {
    const docRef = researchCollection.doc(id);
    await docRef.delete();
    console.log(`Result ${id} deleted successfully`);
    return true;
  } catch (error) {
    console.error('Error deleting result:', error);
    throw error;
  }
}

// Add to existing Firebase functions
export async function getFormFieldsConfig() {
  try {
    const snapshot = await admin.firestore().collection('formFields').get();
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error getting form fields:', error);
    throw error;
  }
}

async function getResultById(id) {
  try {
    const docRef = researchCollection.doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      throw new Error('Document not found');
    }

    const data = doc.data();
    // Convert Firebase timestamp to ISO string
    const processedData = {
      id: doc.id,
      ...data,
      timestamp: data.timestamp?.toDate().toISOString()
    };
    
    return processedData;
  } catch (error) {
    console.error('Error getting result by ID:', error);
    throw error;
  }
}

// Add to export list at bottom of file:
export { getResultById };