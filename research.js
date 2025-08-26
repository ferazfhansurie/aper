// research_server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import OpenAI from 'openai';
import { Parser } from 'json2csv';
import fs from 'fs';
import path from 'path';
// Import the firebase.js functions instead of sheets.js
import { getPastResults, saveResult } from './server/firebase.mjs';
import { getFormFieldsConfig } from './server/firebase.mjs';

const app = express();
const PORT = 3000;

// Setup logging
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}



const logFile = path.join(logDir, `app-${new Date().toISOString().split('T')[0]}.log`);

function logMessage(level, message, data = null) {
  const timestamp = new Date().toISOString();
  let logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  
  if (data) {
    // If data is an error object, extract message and stack
    if (data instanceof Error) {
      logEntry += `\nError: ${data.message}\nStack: ${data.stack}`;
    } else {
      // For other objects, stringify them (limit size for large objects)
      const dataStr = JSON.stringify(data, null, 2);
      logEntry += `\nData: ${dataStr.length > 1000 ? dataStr.substring(0, 1000) + '...(truncated)' : dataStr}`;
    }
  }
  
  logEntry += '\n\n';
  
  // Log to console
  console.log(logEntry);
  
  // Log to file
  fs.appendFileSync(logFile, logEntry);
  
  return logEntry;
}

// Log levels
const log = {
  info: (message, data) => logMessage('info', message, data),
  warn: (message, data) => logMessage('warn', message, data),
  error: (message, data) => logMessage('error', message, data),
  debug: (message, data) => logMessage('debug', message, data)
};

log.info('Server starting up');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

if (!process.env.OPENAI_API_KEY) {
  log.error('OPENAI_API_KEY is not set in environment variables');
  process.exit(1);
}

if (!process.env.SERPER_API_KEY) {
  log.error('SERPER_API_KEY is not set in environment variables');
  process.exit(1);
}

const RESEARCH_ASSISTANT_ID = "asst_3tDqM46rNYKqg2sNRGZ4K6hi"; // Replace with your actual assistant ID
log.info(`Using Research Assistant ID: ${RESEARCH_ASSISTANT_ID}`);

// CORS config
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://storeguru.com.my',
      'https://web.jutasoftware.co',
      'https://dmaimedia.vercel.app',
      'https://zakat-selangor.vercel.app',
      'https://app.omniyal.com',
      'https://www.zahintravel.chat',
      'http://localhost:3000',
      'http://localhost:5173',
      'https://addbigspace.com',
      'https://addbigspace.com/',
      'https://www.addbigspace.com/',
      'https://theshipguru.com',
      'https://theshipguru.com/',
      'https://www.theshipguru.com/'
    ];

    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.includes('.ngrok.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  log.info(`${req.method} ${req.url} started`, { 
    headers: req.headers,
    body: req.method !== 'GET' ? req.body : undefined
  });
  
  // Capture response
  const originalSend = res.send;
  res.send = function(body) {
    const duration = Date.now() - start;
    log.info(`${req.method} ${req.url} completed in ${duration}ms with status ${res.statusCode}`, {
      responseSize: body ? body.length : 0
    });
    return originalSend.call(this, body);
  };
  
  next();
});

// Enhanced search: dynamic pagination and site-specific sweeps
// Site discovery tool: finds all relevant domains for a specific deal
const discoverRelevantSites = async (companyNames, dealTerms, articleTitle) => {
  const headers = {
    'X-API-KEY': process.env.SERPER_API_KEY,
    'Content-Type': 'application/json'
  };
  
  log.info(`Starting site discovery for companies: ${companyNames.join(', ')}`);
  
  // Base trusted financial and business news sites
  const baseTrustedSites = [
    'streetinsider.com',
    'businesswire.com',
    'prnewswire.com', 
    'globenewswire.com',
    'crunchbase.com',
    'linkedin.com',
    'bloomberg.com',
    'reuters.com',
    'wsj.com',
    'ft.com',
    'techcrunch.com',
    'venturebeat.com',
    'pitchbook.com',
    'sec.gov',
    'yahoo.com',
    'finance.yahoo.com',
    'marketwatch.com',
    'cnbc.com',
    'investors.com',
    'seekingalpha.com',
    'fool.com',
    'barrons.com',
    'investopedia.com',
    'morningstar.com'
  ];
  
  // Sites we've discovered that have relevant information
  const discoveredSites = new Set();
  
  // Add base trusted sites to our discovered sites
  baseTrustedSites.forEach(site => discoveredSites.add(site));
  
  // Search queries to find relevant sites
  const discoveryQueries = [];
  
  // Add exact article title as a query (most likely to find syndicated versions)
  if (articleTitle) {
    discoveryQueries.push(`"${articleTitle.replace(/"/g, '')}"`);
  }
  
  // Add company name + deal term queries
  companyNames.forEach(company => {
    dealTerms.forEach(term => {
      discoveryQueries.push(`"${company}" "${term}"`);
    });
    
    // Also search for company name + common financial terms
    discoveryQueries.push(`"${company}" acquisition`);
    discoveryQueries.push(`"${company}" investor`);
    discoveryQueries.push(`"${company}" funding`);
    discoveryQueries.push(`"${company}" financial`);
  });
  
  // Execute each discovery query
  for (const query of discoveryQueries) {
    try {
      log.debug(`Executing site discovery query: "${query}"`);
      
      const searchBody = { 
        q: query, 
        num: 100,  // Get a large number of results to find many domains
        type: 'web' 
      };
      
      const searchResp = await axios.post('https://google.serper.dev/search', searchBody, { 
        headers,
        timeout: 15000 
      });
      
      const searchItems = searchResp.data.organic || [];
      
      if (searchItems && searchItems.length) {
        log.debug(`Found ${searchItems.length} results for discovery query: "${query}"`);
        
        // Extract domains from search results
        searchItems.forEach(item => {
          try {
            const domain = new URL(item.link).hostname;
            discoveredSites.add(domain);
          } catch (e) {
            // Skip invalid URLs
          }
        });
      }
      
      // Add a short delay between searches to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (err) {
      log.warn(`Error executing discovery query "${query}": ${err.message}`);
    }
  }
  
  // Convert Set to Array and sort by domain priority
  const allDiscoveredSites = [...discoveredSites];
  
  // Prioritize domains: trusted financial sites first, then others
  const prioritizedSites = allDiscoveredSites.sort((a, b) => {
    const aIsTrusted = baseTrustedSites.includes(a);
    const bIsTrusted = baseTrustedSites.includes(b);
    
    if (aIsTrusted && !bIsTrusted) return -1;
    if (!aIsTrusted && bIsTrusted) return 1;
    return 0;
  });
  
  log.info(`Site discovery complete. Found ${prioritizedSites.length} relevant domains`);
  return prioritizedSites;
};

const searchMultipleSources = async (query, numResults = 300, specificUrl = null) => {
  const results = [];
  const headers = {
    'X-API-KEY': process.env.SERPER_API_KEY,
    'Content-Type': 'application/json'
  };
  
  // Step 1: If a specific URL is provided, analyze it first
  if (specificUrl) {
    log.info(`Starting with analysis of specific URL: ${specificUrl}`);
    try {
      // Extract domain from URL for targeted search
      const urlObj = new URL(specificUrl);
      const domain = urlObj.hostname;
      
      // First, fetch the actual content from the URL to extract key information
      log.debug(`Fetching content from URL: ${specificUrl}`);
      let companyNames = [];
      let articleTitle = '';
      let keyPhrases = [];
      
      try {
        const urlResponse = await axios.get(specificUrl, { 
          timeout: 15000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
          }
        });
        
        // Use regex to extract potential company names (capitalized phrases)
        const htmlContent = urlResponse.data;
        
        // Extract title from HTML
        const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
        if (titleMatch && titleMatch[1]) {
          articleTitle = titleMatch[1].trim();
          log.info(`Extracted article title: ${articleTitle}`);
        }
        
        // Extract potential company names (sequences of capitalized words)
        const companyRegex = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/g;
        const potentialCompanies = [...new Set(htmlContent.match(companyRegex) || [])];
        
        // Filter out common phrases that aren't likely company names
        const commonPhrases = ['United States', 'New York', 'Hong Kong', 'San Francisco', 'Los Angeles'];
        companyNames = potentialCompanies
          .filter(name => !commonPhrases.includes(name))
          .slice(0, 5); // Take top 5 potential company names
        
        log.info(`Extracted potential company names: ${companyNames.join(', ')}`);
        
        // Extract funding amounts using regex
        const fundingRegex = /(\$\s*\d+(?:\.\d+)?\s*(?:million|billion|m|b|M|B))/g;
        const fundingAmounts = [...new Set(htmlContent.match(fundingRegex) || [])];
        if (fundingAmounts.length) {
          log.info(`Extracted funding amounts: ${fundingAmounts.join(', ')}`);
          keyPhrases = [...keyPhrases, ...fundingAmounts];
        }
        
        // Extract dates using regex
        const dateRegex = /(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4}/g;
        const dates = [...new Set(htmlContent.match(dateRegex) || [])];
        if (dates.length) {
          log.info(`Extracted dates: ${dates.join(', ')}`);
          keyPhrases = [...keyPhrases, ...dates];
        }
        
      } catch (fetchErr) {
        log.warn(`Could not fetch URL content directly: ${fetchErr.message}`);
        // Continue with domain-based search if direct fetch fails
      }
      
      // Define common deal terms for site discovery
      const dealTerms = ['acquisition', 'merger', 'investment', 'funding', 'deal', 'partnership'];
      
      // Discover all relevant sites for these companies and deal
      const relevantSites = await discoverRelevantSites(companyNames, dealTerms, articleTitle);
      log.info(`Discovered ${relevantSites.length} relevant sites to search`);
      
      // Generate search queries based on extracted information
      const searchQueries = [];
      
      // Add company name queries
      companyNames.forEach(company => {
        searchQueries.push(`${company} investment`);
        searchQueries.push(`${company} funding`);
        searchQueries.push(`${company} acquisition`);
      });
      
      // Add article title query
      if (articleTitle) {
        // Clean the title to remove site name and other common elements
        const cleanTitle = articleTitle
          .replace(/\s*\|\s*.*$/, '')  // Remove pipe and everything after
          .replace(/\s*-\s*.*$/, '')   // Remove dash and everything after
          .replace(/\s*:\s*.*$/, '');  // Remove colon and everything after
        
        searchQueries.push(cleanTitle);
      }
      
      // Add key phrases
      keyPhrases.forEach(phrase => {
        searchQueries.push(`${phrase} investment deal`);
      });
      
      // If we couldn't extract good information, fall back to domain-based search
      if (searchQueries.length === 0) {
        log.warn(`Could not extract specific information from URL, falling back to domain search`);
        searchQueries.push(`site:${domain} ${query}`);
      }
      
      // Execute each search query and collect results
      log.info(`Generated ${searchQueries.length} search queries from URL analysis`);
      
      for (const searchQuery of searchQueries) {
        try {
          log.debug(`Executing search query: "${searchQuery}"`);
          const searchBody = { 
            q: searchQuery, 
            num: 10, 
            type: 'web' 
          };
          
          const searchResp = await axios.post('https://google.serper.dev/search', searchBody, { 
            headers,
            timeout: 15000 
          });
          
          const searchItems = searchResp.data.organic || [];
          if (searchItems && searchItems.length) {
            log.debug(`Found ${searchItems.length} results for query: "${searchQuery}"`);
            
            searchItems.forEach(item => results.push({
              title:   item.title,
              snippet: item.snippet,
              link:    item.link,
              date:    item.date || null,
              source:  new URL(item.link).hostname,
              type:    'url_extracted_info'
            }));
          }
          
          // Add a short delay between searches
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (searchErr) {
          log.warn(`Error executing search query "${searchQuery}": ${searchErr.message}`);
        }
      }
      
      // Extract key terms from the collected results for expanded search
      const keyTerms = extractKeyTerms(results);
      log.info(`Extracted key terms from URL-based searches: ${keyTerms.join(', ')}`);
      
      // Enhance the original query with extracted key terms
      if (keyTerms.length > 0) {
        query = `${query} ${keyTerms.slice(0, 3).join(' ')}`;
        log.info(`Enhanced query with key terms: "${query}"`);
      }
      
      // Add a short delay before continuing to other searches
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (urlErr) {
      log.warn(`Error analyzing specific URL: ${specificUrl}`, urlErr);
      // Continue with regular search even if URL analysis fails
    }
  }
  
  // Step 2: Perform main search with enhanced query
  const perPage = 100;
  const pages = Math.ceil(numResults / perPage);
  const types = ['news', 'web', 'images'];
  
  log.info(`Performing main search with query: "${query}" and max results: ${numResults}`);
  
  try {
    // Main sweep across web, news & images
    for (const type of types) {
      for (let page = 0; page < pages; page++) {
        const start = page * perPage;
        const body = { q: query, num: perPage, type, start };
        log.debug(`Searching ${type} page ${page+1}/${pages} (start: ${start})`);
        
        const resp = await axios.post('https://google.serper.dev/search', body, { headers });
        let items = [];
        
        if (type === 'news') {
          items = resp.data.news || [];
        } else if (type === 'web') {
          items = resp.data.organic || [];
        } else if (type === 'images' && resp.data.images) {
          // Extract links from image results
          items = (resp.data.images || []).map(img => ({
            title: img.title || 'Image result',
            snippet: img.imageWebSearchUrl || img.title || 'Image search result',
            link: img.imageWebSearchUrl || img.link,
            source: img.source,
            type: 'image'
          }));
        }
        
        if (items && items.length) {
          log.debug(`Found ${items.length} ${type} results`);
          items.forEach(item => results.push({
            title:   item.title,
            snippet: item.snippet,
            link:    item.link,
            date:    item.date || null,
            source:  item.source || null,
            type:    type === 'images' ? 'image' : type
          }));
        } else {
          log.warn(`No ${type} items found for query: "${query}" page ${page+1}`);
        }
        
        // Avoid rate limiting
        if (page < pages - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
    }

    // Step 3: Use the discovered sites for individual site searches
    // Extract additional domains from initial results to create a more comprehensive search
    const additionalDomains = extractDomainsFromResults(results.slice(0, 50));
    log.info(`Extracted ${additionalDomains.length} additional domains from initial results`);
    
    // If we have a specific URL, use the relevant sites discovered earlier
    let allSitesToSearch = [];
    if (specificUrl) {
      // Get the company names and deal terms again
      const companyNames = extractCompanyNamesFromResults(results.slice(0, 30));
      const dealTerms = ['acquisition', 'merger', 'investment', 'funding', 'deal', 'partnership'];
      
      // Get article title from results if we have it
      let articleTitle = '';
      const titleResults = results.filter(r => r.type === 'url_extracted_info' && r.title);
      if (titleResults.length > 0) {
        articleTitle = titleResults[0].title;
      }
      
      // Discover relevant sites
      const relevantSites = await discoverRelevantSites(companyNames, dealTerms, articleTitle);
      allSitesToSearch = relevantSites;
    } else {
      // Base trusted sites if we don't have a specific URL
      const trustedSites = [
        'streetinsider.com',
        'businesswire.com',
        'prnewswire.com', 
        'globenewswire.com',
        'crunchbase.com',
        'linkedin.com',
        'bloomberg.com',
        'reuters.com',
        'wsj.com',
        'ft.com',
        'techcrunch.com',
        'venturebeat.com',
        'pitchbook.com',
        'sec.gov'
      ];
      
      // Add industry-specific sites based on query content
      if (query.toLowerCase().includes('startup') || query.toLowerCase().includes('funding')) {
        trustedSites.push('crunchbase.com', 'techcrunch.com', 'venturebeat.com', 'pitchbook.com');
      }
      
      if (query.toLowerCase().includes('finance') || query.toLowerCase().includes('investment')) {
        trustedSites.push('bloomberg.com', 'reuters.com', 'wsj.com', 'ft.com', 'seekingalpha.com');
      }
      
      // Combine trusted sites with discovered domains, removing duplicates
      allSitesToSearch = [...new Set([...trustedSites, ...additionalDomains.slice(0, 10)])];
    }
    
    log.info(`Will search ${allSitesToSearch.length} individual sites: ${allSitesToSearch.join(', ')}`);
    
    // Step 4: Search each site individually
    for (const site of allSitesToSearch) {
      for (let page = 0; page < Math.min(2, pages); page++) {
        const start = page * perPage;
        const body = { q: `site:${site} ${query}`, num: perPage, type: 'web', start };
        log.debug(`Searching site ${site} page ${page+1}`);
        
        try {
          // Add a timeout to the request
          const resp = await axios.post('https://google.serper.dev/search', body, { 
            headers,
            timeout: 10000 // 10 second timeout
          });
          const items = resp.data.organic;
          if (items && items.length) {
            log.debug(`Found ${items.length} results from ${site}`);
            items.forEach(item => results.push({
              title:   item.title,
              snippet: item.snippet,
              link:    item.link,
              date:    item.date || null,
              source:  site,
              type:    'site_specific'
            }));
          }
          
          // Avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (siteErr) {
          log.warn(`Error searching ${site}:`, siteErr);
          // Add a longer delay after an error to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
          // Continue with other sites even if one fails
        }
      }
    }
    
    // Step 5: Try alternative query formulations based on extracted information
    const keyTermsFromResults = extractKeyTermsFromResults(results.slice(0, 30));
    const alternativeQueries = [
      `${query} investment details`,
      `${query} funding round`,
      `${query} company information`,
      `${query} financial news`,
      // Add queries with extracted key terms
      ...keyTermsFromResults.map(term => `${query} ${term}`)
    ];
    
    log.info(`Generated ${alternativeQueries.length} alternative queries`);
    
    for (const altQuery of alternativeQueries) {
      log.debug(`Trying alternative query: "${altQuery}"`);
      const body = { q: altQuery, num: perPage, type: 'web' };
      
      try {
        const resp = await axios.post('https://google.serper.dev/search', body, { headers });
        const items = resp.data.organic;
        if (items && items.length) {
          log.debug(`Found ${items.length} results from alternative query`);
          items.forEach(item => results.push({
            title:   item.title,
            snippet: item.snippet,
            link:    item.link,
            date:    item.date || null,
            source:  item.source || null,
            type:    'alternative'
          }));
        }
        
        // Avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (altErr) {
        log.warn(`Error with alternative query "${altQuery}":`, altErr);
      }
    }

    // Count results by domain
    const domainCounts = {};
    results.forEach(result => {
      try {
        const domain = new URL(result.link).hostname;
        domainCounts[domain] = (domainCounts[domain] || 0) + 1;
      } catch (e) {
        // Skip invalid URLs
      }
    });

    // Log domain distribution
    const domainDistribution = Object.entries(domainCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([domain, count]) => `${domain}: ${count}`);

    log.info(`Source distribution: ${domainDistribution.join(', ')}`);

    // Check if results are too concentrated on one domain
    const topDomain = Object.entries(domainCounts).sort((a, b) => b[1] - a[1])[0];
    if (topDomain && topDomain[1] > results.length * 0.5) {
      log.warn(`Results heavily concentrated on ${topDomain[0]} (${topDomain[1]}/${results.length} results)`);
      
      // Force additional searches on other domains if results are too concentrated
      const forcedDomainSearches = [
        'yahoo.com',
        'reuters.com',
        'bloomberg.com',
        'streetinsider.com',
        'crunchbase.com'
      ].filter(domain => !domainCounts[domain] || domainCounts[domain] < 5);
      
      log.info(`Forcing additional searches on underrepresented domains: ${forcedDomainSearches.join(', ')}`);
      
      // Perform forced searches on underrepresented domains
      for (const domain of forcedDomainSearches) {
        const forcedQuery = `site:${domain} ${query}`;
        log.debug(`Forced domain search: "${forcedQuery}"`);
        
        try {
          const resp = await axios.post('https://google.serper.dev/search', 
            { q: forcedQuery, num: 20, type: 'web' }, 
            { headers, timeout: 10000 }
          );
          
          const items = resp.data.organic || [];
          if (items && items.length) {
            log.debug(`Found ${items.length} results from forced search on ${domain}`);
            items.forEach(item => results.push({
              title:   item.title,
              snippet: item.snippet,
              link:    item.link,
              date:    item.date || null,
              source:  domain,
              type:    'forced_domain_search'
            }));
          }
          
          // Avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (err) {
          log.warn(`Error in forced domain search for ${domain}:`, err);
        }
      }
    }

    // Deduplicate by link
    const unique = {};
    results.forEach(r => { unique[r.link] = r; });
    const uniqueResults = Object.values(unique);
    log.info(`Search completed with ${results.length} total results, ${uniqueResults.length} unique results`);
    return uniqueResults;
  } catch (err) {
    log.error('Error searching sources:', err);
    return results;
  }
};

// Helper function to extract company names from search results
function extractCompanyNamesFromResults(results) {
  // Extract potential company names from titles and snippets
  const text = results.map(r => `${r.title} ${r.snippet}`).join(' ');
  
  // Look for capitalized phrases that might be company names
  const companyRegex = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/g;
  const potentialCompanies = [...new Set(text.match(companyRegex) || [])];
  
  // Filter out common phrases that aren't likely company names
  const commonPhrases = ['United States', 'New York', 'Hong Kong', 'San Francisco', 'Los Angeles'];
  const filteredCompanies = potentialCompanies
    .filter(name => !commonPhrases.includes(name))
    .slice(0, 5); // Take top 5 potential company names
  
  log.info(`Extracted company names for searches: ${filteredCompanies.join(', ')}`);
  return filteredCompanies;
}
// Helper function to extract key terms from URL results
function extractKeyTerms(items) {
  // Combine all titles and snippets
  const text = items.map(item => `${item.title} ${item.snippet}`).join(' ');
  
  // Remove common words and punctuation
  const cleanText = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ');
  
  // Split into words and count frequency
  const words = cleanText.split(' ');
  const wordCounts = {};
  
  words.forEach(word => {
    // Skip short words and common stop words
    if (word.length < 4 || ['the', 'and', 'that', 'have', 'for', 'not', 'with'].includes(word)) {
      return;
    }
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });
  
  // Sort by frequency and return top terms
  return Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(entry => entry[0]);
}

// Helper function to extract domains from search results
function extractDomainsFromResults(results) {
  const domains = [];
  
  results.forEach(result => {
    if (result.link) {
      try {
        const url = new URL(result.link);
        domains.push(url.hostname);
      } catch (e) {
        // Skip invalid URLs
      }
    }
  });
  
  // Remove duplicates and return
  return [...new Set(domains)];
}

// Helper function to extract key terms from search results
function extractKeyTermsFromResults(results) {
  // Combine titles from results
  const text = results.map(item => item.title).join(' ');
  
  // Extract 2-3 word phrases that might be significant
  const phrases = [];
  const words = text.split(' ');
  
  for (let i = 0; i < words.length - 1; i++) {
    if (words[i].length > 3 && words[i+1].length > 3) {
      phrases.push(`${words[i]} ${words[i+1]}`);
    }
  }
  
  // Count phrase frequency
  const phraseCounts = {};
  phrases.forEach(phrase => {
    phraseCounts[phrase] = (phraseCounts[phrase] || 0) + 1;
  });
  
  // Return top phrases
  return Object.entries(phraseCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(entry => entry[0]);
}
export async function processResearchQuery(url) {
  log.info(`Processing research query for URL: ${url}`);
  
  try {
    log.debug('Creating OpenAI thread');
    const thread = await openai.beta.threads.create();
    log.info(`Thread created with ID: ${thread.id}`);
    
    log.debug('Creating message in thread');
    // Clean the URL by removing any backticks or extra whitespace
    const cleanUrl = url.replace(/`/g, '').trim();
    
    // Modified prompt to explicitly instruct the AI to search multiple sources
    await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: `Analyze this URL and provide a comprehensive investment deal report: ${cleanUrl}\n` +
    `CRITICAL INSTRUCTION: The URL is ONLY a starting point. You MUST search extensively across MULTIPLE SOURCES including prnewswire.com, streetinsider.com, businesswire.com, globenewswire.com, crunchbase.com, bloomberg.com, reuters.com, wsj.com, ft.com, techcrunch.com, and others.\n` +
    `SEARCH STRATEGY: First extract company names, deal terms, and key information from the URL. Then use these as search terms across ALL trusted sources - DO NOT limit your research to the original URL's domain.\n` +
    `For EACH piece of information in your report, cite sources from AT LEAST 2-3 DIFFERENT DOMAINS whenever possible.\n` +
    `(Use search tool to fetch up to 300 results across news and web; explicitly search each trusted domain individually; cite every fact; flag any conflicts)`
    });
    
    log.debug(`Starting assistant run with assistant ID: ${RESEARCH_ASSISTANT_ID}`);
    let run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: RESEARCH_ASSISTANT_ID
    });
    log.info(`Run created with ID: ${run.id}, initial status: ${run.status}`);

    while (run.status !== 'completed') {
      // poll for status
      await new Promise(resolve => setTimeout(resolve, 1000));
      run = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      log.debug(`Run status updated: ${run.status}`);

      if (run.status === 'requires_action') {
        log.info('Run requires action, processing tool calls');
        const calls = run.required_action.submit_tool_outputs.tool_calls;
        log.debug(`Received ${calls.length} tool calls`);
        
        const outputs = [];
        for (const call of calls) {
          if (call.function.name === 'search_sources') {
            const args = JSON.parse(call.function.arguments);
            log.info(`Executing search_sources with query: "${args.query}"`);
            
            // Pass the URL to the search function
            const results = await searchMultipleSources(args.query, args.numResults || 200, cleanUrl);
            log.debug(`Search returned ${results.length} results`);
            
            outputs.push({ tool_call_id: call.id, output: JSON.stringify(results) });
          } else {
            log.warn(`Unknown function call: ${call.function.name}`);
          }
        }
        
        if (outputs.length) {
          log.info(`Submitting ${outputs.length} tool outputs`);
          run = await openai.beta.threads.runs.submitToolOutputs(thread.id, run.id, {
            tool_outputs: outputs
          });
          log.debug(`Run status after tool submission: ${run.status}`);
        }
      } else if (run.status === 'failed') {
        const errorMsg = `Assistant run failed: ${run.last_error?.code} - ${run.last_error?.message}`;
        log.error(errorMsg);
        throw new Error(errorMsg);
      }
    }

    log.info('Run completed, retrieving messages');
    const msgs = await openai.beta.threads.messages.list(thread.id);
    
    if (msgs.data.length === 0) {
      log.error('No messages found in thread after completion');
      throw new Error('No messages returned from assistant');
    }
    
    const report = msgs.data[0].content[0].text.value;
    log.debug(`Report length: ${report.length} characters`);
    log.debug(`Report content: ${report.substring(0, 100)}...`); // Log the beginning of the report
    
    // Check if the response starts with phrases indicating it's an error message
    if (report.startsWith("I'm unable") || 
        report.startsWith("I cannot") || 
        report.startsWith("I don't") ||
        report.startsWith("I currently")) {
      log.warn('Assistant returned an error message instead of a report', { message: report });
      return { 
        error: true,
        message: report,
        report: `The assistant was unable to analyze this URL. ${report}`
      };
    }
    
    try {
      log.debug('Attempting to parse report as JSON');
      // First check if the response looks like JSON (starts with { or [)
      if (report.trim().startsWith('{') || report.trim().startsWith('[')) {
        return JSON.parse(report);
      } else {
        log.info('Report appears to be plain text, not attempting JSON parsing');
        return { report };
      }
    } catch (parseErr) {
      log.warn('Failed to parse report as JSON, returning as plain text', parseErr);
      // Still return the report as is, but don't treat it as an error
      return { report };
    }
  } catch (err) {
    log.error('Error in processResearchQuery:', err);
    return { error: true, message: err.message };
  }
}

// Add Firebase API endpoints
app.get('/api/sheets/results', async (req, res) => {
  try {
    // Get limit from query params or use default
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 1000;
    const results = await getPastResults(limit);
    res.json(results);
  } catch (error) {
    console.error('Error getting past results from Firebase:', error);
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/fields', async (req, res) => {
  try {
    const fields = await getFormFieldsConfig();
    res.json(fields);
  } catch (error) {
    log.error('Fields config error', error);
    res.status(500).json({ error: 'Failed to load field configuration' });
  }
});
app.post('/api/sheets/save', async (req, res) => {
  try {
    // Extract only the necessary data from the request body
    const essentialData = {
      // Add specific fields you want to save
      url: req.body.url,
      timestamp: new Date().toISOString(),
      // Add any other fields from req.body that you need
      ...req.body
    };
    
    // Save the essential data to Firebase
    const docId = await saveResult(essentialData);
    
    res.json({ success: true, id: docId });
  } catch (error) {
    console.error('Error saving to Firebase:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add chat functionality
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context, history = [] } = req.body;
    log.info('Chat request received', { messageLength: message?.length, hasContext: !!context });
    
    // Create a new thread or use existing one if provided
    const threadId = req.body.threadId || (await openai.beta.threads.create()).id;
    log.info(`Using thread ID: ${threadId} (${req.body.threadId ? 'existing' : 'new'})`);
    
    // Add user message to thread
    log.debug('Adding user message to thread');
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message
    });
    
    // Prepare system instructions based on context
    let systemInstructions = "You are a helpful research assistant.";
    if (context) {
      log.debug(`Adding context to instructions (${context.length} characters)`);
      systemInstructions += " Use the following research context to inform your responses:\n\n" + context;
    }
    
    // Run the assistant
    log.debug('Starting assistant run for chat');
    let run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: RESEARCH_ASSISTANT_ID,
      instructions: systemInstructions
    });
    log.info(`Chat run created with ID: ${run.id}, initial status: ${run.status}`);
    
    // Poll for completion
    while (run.status !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      run = await openai.beta.threads.runs.retrieve(threadId, run.id);
      log.debug(`Chat run status updated: ${run.status}`);
      
      if (run.status === 'requires_action') {
        log.info('Chat run requires action, processing tool calls');
        const calls = run.required_action.submit_tool_outputs.tool_calls;
        log.debug(`Received ${calls.length} tool calls for chat`);
        
        const outputs = [];
        
        for (const call of calls) {
          if (call.function.name === 'search_sources') {
            const args = JSON.parse(call.function.arguments);
            log.info(`Executing search_sources for chat with query: "${args.query}"`);
            
            const results = await searchMultipleSources(args.query, args.numResults || 200);
            log.debug(`Chat search returned ${results.length} results`);
            
            outputs.push({ tool_call_id: call.id, output: JSON.stringify(results) });
upd          } else if (call.function.name === 'firebase_crud') {
            // Handle Firebase CRUD operations
            const args = JSON.parse(call.function.arguments);
            log.info(`Executing firebase_crud operation: ${args.operation}`, { args });
            
            let result;
            try {
              // Perform the requested Firebase operation
              switch (args.operation) {
                case 'get':
                  // Get data from Firebase
                  result = await getPastResults(args.collection, args.id);
                  log.debug(`Firebase get operation completed for ${args.collection}/${args.id}`);
                  break;
                case 'save':
                  // Save data to Firebase
                  result = await saveResult(args.collection, args.data, args.id);
                  log.debug(`Firebase save operation completed for ${args.collection}`);
                  break;
                case 'update':
                  // Update data in Firebase
                  result = await updateResult(args.collection, args.id, args.data);
                  log.debug(`Firebase update operation completed for ${args.collection}/${args.id}`);
                  break;
                case 'delete':
                  // Delete data from Firebase
                  result = await deleteResult(args.collection, args.id);
                  log.debug(`Firebase delete operation completed for ${args.collection}/${args.id}`);
                  break;
                case 'getConfig':
                  // Get form fields configuration
                  result = await getFormFieldsConfig(args.formType);
                  log.debug(`Firebase getConfig operation completed for ${args.formType}`);
                  break;
                default:
                  throw new Error(`Unsupported Firebase operation: ${args.operation}`);
              }
              
              outputs.push({ tool_call_id: call.id, output: JSON.stringify(result) });
            } catch (firebaseError) {
              log.error(`Firebase operation error:`, firebaseError);
              outputs.push({ 
                tool_call_id: call.id, 
                output: JSON.stringify({ 
                  error: true, 
                  message: firebaseError.message 
                }) 
              });
            }
          } else {
            log.warn(`Unknown function call in chat: ${call.function.name}`);
          }
        }
        
        if (outputs.length) {
          log.info(`Submitting ${outputs.length} tool outputs for chat`);
          run = await openai.beta.threads.runs.submitToolOutputs(threadId, run.id, {
            tool_outputs: outputs
          });
          log.debug(`Chat run status after tool submission: ${run.status}`);
        }
      } else if (run.status === 'failed') {
        const errorMsg = `Chat assistant run failed: ${run.last_error?.code} - ${run.last_error?.message}`;
        log.error(errorMsg);
        throw new Error(errorMsg);
      }
    }
    
    // Get the assistant's response
    log.info('Chat run completed, retrieving messages');
    const messages = await openai.beta.threads.messages.list(threadId);
    
    const assistantMessage = messages.data.find(msg => 
      msg.role === 'assistant' && 
      msg.run_id === run.id
    );
    
    if (!assistantMessage) {
      log.error('No assistant response found in chat');
      throw new Error('No assistant response found');
    }
    
    // Extract URLs if any were mentioned in the response
    const responseText = assistantMessage.content[0].text.value;
    log.debug(`Chat response length: ${responseText.length} characters`);
    
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const additionalUrls = responseText.match(urlRegex) || [];
    if (additionalUrls.length > 0) {
      log.info(`Found ${additionalUrls.length} URLs in chat response`);
    }
    
    // Return the response along with thread ID for continuation
    log.info('Sending chat response to client');
    res.json({
      response: responseText,
      threadId: threadId,
      additionalUrls
    });
  } catch (err) {
    log.error('Chat API error:', err);
    res.status(500).json({ error: err.message });
  }
});

// HTTP endpoints
app.post('/api/research', async (req, res) => {
  try {
    const { url } = req.body;
    log.info(`Research request received for URL: ${url}`);
    
    const data = await processResearchQuery(url);
    
    if (data.error) {
      log.error(`Research failed for URL: ${url}`, { error: data.error });
    } else {
      log.info(`Research completed successfully for URL: ${url}`, { 
        reportLength: data.report ? data.report.length : 'N/A' 
      });
    }
    
    res.json(data);
  } catch (err) {
    log.error(`Research API error for URL: ${req.body?.url}`, err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  log.info('Root endpoint accessed');
  res.json({ status: 'Server is running' });
});

app.post('/api/export-csv', async (req, res) => {
  try {
    const { report } = req.body;
    log.info('Export to CSV requested', { reportLength: report?.length });
    
    // For demonstration, just wrap the report in an object
    const data = [{ report }];
    const parser = new Parser();
    const csv = parser.parse(data);
    
    log.debug(`CSV generated with size: ${csv.length} bytes`);

    res.header('Content-Type', 'text/csv');
    res.attachment('report.csv');
    log.info('CSV file sent to client');
    return res.send(csv);
  } catch (err) {
    log.error('Export to CSV failed', err);
    res.status(500).json({ error: err.message });
  }
});

const server = app.listen(PORT, () => {
  log.info(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  log.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    log.info('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  log.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    log.info('HTTP server closed');
    process.exit(0);
  });
});

// Uncaught exception handler
process.on('uncaughtException', (err) => {
  log.error('Uncaught exception', err);
  // Keep the process running but log the error
});

// Unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
  log.error('Unhandled promise rejection', { reason });
  // Keep the process running but log the error
});
// Site discovery tool: finds all relevant domains for a specific deal


// Inside searchMultipleSources function, after defining trustedSites
// Extract deal ID or relevant search terms from URL if provided
let searchQuery = query;
try {
  // Check if query is a URL
  if (query.includes('://') || query.includes('.com') || query.includes('.org')) {
    const urlObj = new URL(query.startsWith('http') ? query : `https://${query}`);
    
    // Extract potential deal ID from URL path
    const pathParts = urlObj.pathname.split('/');
    const potentialDealId = pathParts.find(part => /^\d+$/.test(part));
    
    // If we found a numeric ID in the path, use it in our search
    if (potentialDealId) {
      log.info(`Extracted potential deal ID from URL: ${potentialDealId}`);
      searchQuery = potentialDealId;
    } else {
      // Otherwise, try to extract company name or other relevant info from path
      const relevantParts = pathParts.filter(part => 
        part.length > 3 && 
        !['news', 'home', 'en', 'com', 'org', 'net'].includes(part.toLowerCase())
      );
      
      if (relevantParts.length > 0) {
        // Convert kebab-case or snake_case to spaces
        const cleanedParts = relevantParts.map(part => 
          part.replace(/[-_]/g, ' ')
        );
        searchQuery = cleanedParts.join(' ');
        log.info(`Extracted search terms from URL: "${searchQuery}"`);
      }
    }
  }
} catch (e) {
  // Not a valid URL or couldn't parse, just continue with original query
  log.debug('Could not parse URL for better search terms:', e);
}
// Add the domain from the query URL if it's not already in the trusted sites
try {
  const urlObj = new URL(query);
  const domain = urlObj.hostname.replace('www.', '');
  if (!trustedSites.includes(domain) && domain.includes('.')) {
    log.info(`Adding query URL domain to trusted sites: ${domain}`);
    trustedSites.push(domain);
  }
} catch (e) {
  // Not a valid URL, just continue
  log.debug('Query is not a valid URL, not adding to trusted sites');
}
// After extracting search terms, ensure we search all trusted sites
log.info(`Will search across all ${trustedSites.length} trusted sites for: "${searchQuery}"`);

// Ensure the domain from the URL doesn't override other searches
let domainFromUrl = '';
try {
  const urlObj = new URL(query.startsWith('http') ? query : `https://${query}`);
  domainFromUrl = urlObj.hostname.replace('www.', '');
} catch (e) {
  // Not a URL, ignore
}
// Add this after the deduplication step in searchMultipleSources
// Count results by domain
const domainCounts = {};
uniqueResults.forEach(result => {
  try {
    const domain = new URL(result.link).hostname;
    domainCounts[domain] = (domainCounts[domain] || 0) + 1;
  } catch (e) {
    // Skip invalid URLs
  }
});

// Log domain distribution
const domainDistribution = Object.entries(domainCounts)
  .sort((a, b) => b[1] - a[1])
  .map(([domain, count]) => `${domain}: ${count}`);

log.info(`Source distribution: ${domainDistribution.join(', ')}`);

// Check if results are too concentrated on one domain
const topDomain = Object.entries(domainCounts).sort((a, b) => b[1] - a[1])[0];
if (topDomain && topDomain[1] > uniqueResults.length * 0.5) {
  log.warn(`Results heavily concentrated on ${topDomain[0]} (${topDomain[1]}/${uniqueResults.length} results)`);
  // Could trigger additional searches on underrepresented domains here
}
// Site discovery tool: finds all relevant domains for a specific deal

