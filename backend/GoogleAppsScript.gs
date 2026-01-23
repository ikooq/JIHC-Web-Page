/**
 * Google Apps Script REST API Backend
 * 
 * This script provides a REST API for Google Sheets where:
 * - Each sheet acts as a database table
 * - First row contains column names
 * - Supports GET, POST, PUT, PATCH, DELETE operations
 * 
 * API Endpoints:
 * GET    /api/{sheetName}           - Get all rows or filter by query params
 * GET    /api/{sheetName}/{rowId}   - Get specific row by ID
 * POST   /api/{sheetName}           - Add new row
 * PUT    /api/{sheetName}/{rowId}   - Update entire row
 * PATCH  /api/{sheetName}/{rowId}   - Partially update row
 * DELETE /api/{sheetName}/{rowId}   - Delete row
 */

/**
 * Main entry point - handles all HTTP requests
 * Note: Google Apps Script only supports doGet and doPost
 * For PUT, PATCH, DELETE, we use POST with _method parameter
 */
function doGet(e) {
  return handleRequest(e, 'GET');
}

function doPost(e) {
  // Parse request body to check for _method override
  let method = 'POST';
  let body = null;
  
  if (e.postData && e.postData.contents) {
    try {
      body = JSON.parse(e.postData.contents);
      // Check if method override is in body
      if (body._method) {
        method = body._method.toUpperCase();
        delete body._method; // Remove from body
      }
    } catch (err) {
      // If not JSON, check query parameter
      method = e.parameter._method ? e.parameter._method.toUpperCase() : 'POST';
    }
  } else {
    // Check query parameter for method override
    method = e.parameter._method ? e.parameter._method.toUpperCase() : 'POST';
  }
  
  return handleRequest(e, method, body);
}

/**
 * Handle all HTTP methods
 */
function handleRequest(e, method, parsedBody = null) {
  try {
    // Enable CORS
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    
    // Parse the path
    const path = e.parameter.path || '';
    const pathParts = path.split('/').filter(p => p);
    
    // Route: /api/{sheetName} or /api/{sheetName}/{rowId}
    if (pathParts.length === 0 || pathParts[0] !== 'api') {
      return sendResponse(output, { 
        error: 'Invalid endpoint. Use /api/{sheetName} or /api/{sheetName}/{rowId}' 
      }, 400);
    }
    
    const sheetName = pathParts[1];
    const rowId = pathParts.length > 2 ? parseInt(pathParts[2]) : null;
    
    if (!sheetName) {
      return sendResponse(output, { error: 'Sheet name is required' }, 400);
    }
    
    // Get the spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      return sendResponse(output, { error: `Sheet "${sheetName}" not found` }, 404);
    }
    
    // Parse request body for POST, PUT, PATCH
    let body = parsedBody;
    if (!body && e.postData && e.postData.contents) {
      try {
        body = JSON.parse(e.postData.contents);
        // Remove _method if present
        if (body._method) {
          delete body._method;
        }
      } catch (err) {
        return sendResponse(output, { error: 'Invalid JSON in request body' }, 400);
      }
    }
    
    // Route to appropriate handler
    let result;
    switch (method) {
      case 'GET':
        result = handleGet(sheet, rowId, e.parameter);
        break;
      case 'POST':
        result = handlePost(sheet, body);
        break;
      case 'PUT':
        if (!rowId) {
          return sendResponse(output, { error: 'Row ID is required for PUT' }, 400);
        }
        result = handlePut(sheet, rowId, body);
        break;
      case 'PATCH':
        if (!rowId) {
          return sendResponse(output, { error: 'Row ID is required for PATCH' }, 400);
        }
        result = handlePatch(sheet, rowId, body);
        break;
      case 'DELETE':
        if (!rowId) {
          return sendResponse(output, { error: 'Row ID is required for DELETE' }, 400);
        }
        result = handleDelete(sheet, rowId);
        break;
      default:
        return sendResponse(output, { error: 'Method not allowed' }, 405);
    }
    
    return sendResponse(output, result.data, result.status);
    
  } catch (error) {
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    return sendResponse(output, { 
      error: error.toString(),
      message: error.message || 'Internal server error'
    }, 500);
  }
}

/**
 * GET - Read rows
 * GET /api/{sheetName} - Get all rows (with optional filtering)
 * GET /api/{sheetName}/{rowId} - Get specific row
 */
function handleGet(sheet, rowId, params) {
  const headers = getHeaders(sheet);
  
  if (rowId) {
    // Get specific row
    const rowData = getRowById(sheet, rowId, headers);
    if (!rowData) {
      return { data: { error: 'Row not found' }, status: 404 };
    }
    return { data: rowData, status: 200 };
  } else {
    // Get all rows with optional filtering
    const rows = getAllRows(sheet, headers, params);
    return { data: { rows: rows, count: rows.length }, status: 200 };
  }
}

/**
 * POST - Add new row
 * POST /api/{sheetName}
 */
function handlePost(sheet, body) {
  if (!body || typeof body !== 'object') {
    return { data: { error: 'Request body is required' }, status: 400 };
  }
  
  const headers = getHeaders(sheet);
  const newRow = [];
  
  // Build row data matching column order
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    newRow.push(body[header] !== undefined ? body[header] : '');
  }
  
  // Append row (adds after header row, so row number is data.length + 1)
  sheet.appendRow(newRow);
  
  // Get the newly added row ID (row number in sheet)
  const lastRow = sheet.getLastRow();
  const rowData = rowToObject(sheet.getRange(lastRow, 1, 1, headers.length).getValues()[0], headers);
  rowData.id = lastRow;
  
  return { data: { success: true, row: rowData }, status: 201 };
}

/**
 * PUT - Update entire row
 * PUT /api/{sheetName}/{rowId}
 */
function handlePut(sheet, rowId, body) {
  if (!body || typeof body !== 'object') {
    return { data: { error: 'Request body is required' }, status: 400 };
  }
  
  const headers = getHeaders(sheet);
  
  // Check if row exists
  if (rowId <= 1 || rowId > sheet.getLastRow()) {
    return { data: { error: 'Row not found' }, status: 404 };
  }
  
  const newRow = [];
  
  // Build row data matching column order
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    newRow.push(body[header] !== undefined ? body[header] : '');
  }
  
  // Update the row (rowId is 1-based, but row 1 is headers, so data starts at row 2)
  sheet.getRange(rowId, 1, 1, headers.length).setValues([newRow]);
  
  const rowData = rowToObject(newRow, headers);
  rowData.id = rowId;
  
  return { data: { success: true, row: rowData }, status: 200 };
}

/**
 * PATCH - Partially update row
 * PATCH /api/{sheetName}/{rowId}
 */
function handlePatch(sheet, rowId, body) {
  if (!body || typeof body !== 'object') {
    return { data: { error: 'Request body is required' }, status: 400 };
  }
  
  const headers = getHeaders(sheet);
  
  // Check if row exists
  if (rowId <= 1 || rowId > sheet.getLastRow()) {
    return { data: { error: 'Row not found' }, status: 404 };
  }
  
  // Get existing row
  const existingRow = sheet.getRange(rowId, 1, 1, headers.length).getValues()[0];
  const existingData = rowToObject(existingRow, headers);
  
  // Merge with new data
  const updatedData = { ...existingData, ...body };
  
  // Build new row
  const newRow = [];
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    newRow.push(updatedData[header] !== undefined ? updatedData[header] : '');
  }
  
  // Update the row
  sheet.getRange(rowId, 1, 1, headers.length).setValues([newRow]);
  
  const rowData = rowToObject(newRow, headers);
  rowData.id = rowId;
  
  return { data: { success: true, row: rowData }, status: 200 };
}

/**
 * DELETE - Delete row
 * DELETE /api/{sheetName}/{rowId}
 */
function handleDelete(sheet, rowId) {
  // Check if row exists
  if (rowId <= 1 || rowId > sheet.getLastRow()) {
    return { data: { error: 'Row not found' }, status: 404 };
  }
  
  // Delete the row
  sheet.deleteRow(rowId);
  
  return { data: { success: true, message: 'Row deleted successfully' }, status: 200 };
}

/**
 * Helper: Get headers from first row
 */
function getHeaders(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  return headerRange.getValues()[0].map(h => String(h).trim());
}

/**
 * Helper: Get all rows with optional filtering
 */
function getAllRows(sheet, headers, params) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return []; // No data rows
  }
  
  const dataRange = sheet.getRange(2, 1, lastRow - 1, headers.length);
  const values = dataRange.getValues();
  const rows = values.map((row, index) => {
    const rowObj = rowToObject(row, headers);
    rowObj.id = index + 2; // Row number in sheet (2 = first data row)
    return rowObj;
  });
  
  // Apply filters if provided
  if (params && Object.keys(params).length > 0) {
    return rows.filter(row => {
      return Object.keys(params).every(key => {
        if (key === 'path') return true; // Skip path parameter
        const value = String(row[key] || '').toLowerCase();
        const filterValue = String(params[key] || '').toLowerCase();
        return value.includes(filterValue);
      });
    });
  }
  
  return rows;
}

/**
 * Helper: Get row by ID
 */
function getRowById(sheet, rowId, headers) {
  if (rowId <= 1 || rowId > sheet.getLastRow()) {
    return null;
  }
  
  const rowData = sheet.getRange(rowId, 1, 1, headers.length).getValues()[0];
  const rowObj = rowToObject(rowData, headers);
  rowObj.id = rowId;
  return rowObj;
}

/**
 * Helper: Convert row array to object using headers
 */
function rowToObject(row, headers) {
  const obj = {};
  for (let i = 0; i < headers.length; i++) {
    obj[headers[i]] = row[i] !== undefined ? row[i] : '';
  }
  return obj;
}

/**
 * Helper: Send JSON response with CORS headers
 * Note: Google Apps Script automatically handles CORS when "Who has access" is set to "Anyone"
 */
function sendResponse(output, data, statusCode) {
  // Set content type
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Set JSON content
  output.setContent(JSON.stringify(data));
  
  return output;
}

/**
 * Handle OPTIONS request for CORS preflight
 * Note: Google Apps Script automatically handles CORS preflight when "Who has access" is set to "Anyone"
 */
function doOptions() {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}
