# API Examples - Frontend Fetch Requests

This document provides example fetch requests for interacting with the Google Apps Script REST API from your frontend.

## Base URL

Replace `YOUR_SCRIPT_URL` with your deployed Web App URL:
```javascript
const API_BASE_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

## Helper Function

Create a helper function to handle API calls:

```typescript
// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  params?: Record<string, string>;
}

async function apiCall<T>(
  sheetName: string, 
  rowId?: number, 
  options: ApiOptions = {}
): Promise<T> {
  const { method = 'GET', body, params } = options;
  
  // Build URL
  let url = `${API_BASE_URL}?path=/api/${sheetName}`;
  if (rowId) {
    url += `/${rowId}`;
  }
  
  // Add query parameters for GET requests
  if (method === 'GET' && params) {
    const queryString = new URLSearchParams(params).toString();
    url += `&${queryString}`;
  }
  
  // Build fetch options
  // Note: Google Apps Script only supports GET and POST
  // For PUT, PATCH, DELETE, we use POST with _method override
  const actualMethod = ['PUT', 'PATCH', 'DELETE'].includes(method) ? 'POST' : method;
  const fetchOptions: RequestInit = {
    method: actualMethod,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  // Add body for POST, PUT, PATCH
  if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
    // Add _method override for PUT, PATCH, DELETE
    if (['PUT', 'PATCH', 'DELETE'].includes(method)) {
      body = { ...body, _method: method };
    }
    fetchOptions.body = JSON.stringify(body);
  } else if (method === 'DELETE') {
    // For DELETE, add _method as query param or in body
    url += `&_method=DELETE`;
  }
  
  try {
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    
    if (!response.ok || data.error) {
      throw new Error(data.error || 'API request failed');
    }
    
    return data as T;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

## API Examples

### 1. GET - Read All Rows

Get all rows from a sheet:

```typescript
// Get all rows
const response = await apiCall('Contacts');
console.log(response.rows); // Array of all rows
console.log(response.count); // Number of rows

// With filtering (query parameters)
const filtered = await apiCall('Contacts', undefined, {
  method: 'GET',
  params: {
    email: 'example.com', // Filter rows where email contains 'example.com'
    name: 'John' // AND name contains 'John'
  }
});
```

**Direct fetch example:**
```typescript
const sheetName = 'Contacts';
const url = `${API_BASE_URL}?path=/api/${sheetName}`;

const response = await fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});

const data = await response.json();
console.log(data.rows); // Array of row objects
```

### 2. GET - Read Single Row

Get a specific row by ID:

```typescript
const rowId = 2; // Row number in the sheet
const response = await apiCall('Contacts', rowId);
console.log(response); // Single row object with id property
```

**Direct fetch example:**
```typescript
const sheetName = 'Contacts';
const rowId = 2;
const url = `${API_BASE_URL}?path=/api/${sheetName}/${rowId}`;

const response = await fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});

const data = await response.json();
console.log(data); // { id: 2, name: '...', email: '...', ... }
```

### 3. POST - Add New Row

Add a new row to a sheet:

```typescript
const newRow = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello from the frontend!'
};

const response = await apiCall('Contacts', undefined, {
  method: 'POST',
  body: newRow
});

console.log(response.success); // true
console.log(response.row); // The newly created row with id
```

**Direct fetch example:**
```typescript
const sheetName = 'Contacts';
const url = `${API_BASE_URL}?path=/api/${sheetName}`;

const newRow = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello from the frontend!'
};

const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newRow),
});

const data = await response.json();
console.log(data); // { success: true, row: { id: 3, ... } }
```

### 4. PUT - Update Entire Row

Replace an entire row:

```typescript
const rowId = 2;
const updatedRow = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  message: 'Updated message'
};

const response = await apiCall('Contacts', rowId, {
  method: 'PUT',
  body: updatedRow
});

console.log(response.success); // true
console.log(response.row); // The updated row
```

**Direct fetch example:**
```typescript
const sheetName = 'Contacts';
const rowId = 2;
const url = `${API_BASE_URL}?path=/api/${sheetName}/${rowId}`;

const updatedRow = {
  _method: 'PUT', // Method override for Google Apps Script
  name: 'Jane Doe',
  email: 'jane@example.com',
  message: 'Updated message'
};

const response = await fetch(url, {
  method: 'POST', // Google Apps Script only supports POST
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updatedRow),
});

const data = await response.json();
```

### 5. PATCH - Partially Update Row

Update only specific fields:

```typescript
const rowId = 2;
const partialUpdate = {
  email: 'newemail@example.com'
  // Only email will be updated, other fields remain unchanged
};

const response = await apiCall('Contacts', rowId, {
  method: 'PATCH',
  body: partialUpdate
});

console.log(response.success); // true
console.log(response.row); // The updated row
```

**Direct fetch example:**
```typescript
const sheetName = 'Contacts';
const rowId = 2;
const url = `${API_BASE_URL}?path=/api/${sheetName}/${rowId}`;

const partialUpdate = {
  _method: 'PATCH', // Method override for Google Apps Script
  email: 'newemail@example.com'
};

const response = await fetch(url, {
  method: 'POST', // Google Apps Script only supports POST
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(partialUpdate),
});

const data = await response.json();
```

### 6. DELETE - Delete Row

Delete a row:

```typescript
const rowId = 2;
const response = await apiCall('Contacts', rowId, {
  method: 'DELETE'
});

console.log(response.success); // true
console.log(response.message); // 'Row deleted successfully'
```

**Direct fetch example:**
```typescript
const sheetName = 'Contacts';
const rowId = 2;
const url = `${API_BASE_URL}?path=/api/${sheetName}/${rowId}&_method=DELETE`;

const response = await fetch(url, {
  method: 'POST', // Google Apps Script only supports POST
  headers: {
    'Content-Type': 'application/json',
  },
});

const data = await response.json();
console.log(data); // { success: true, message: 'Row deleted successfully' }
```

**Alternative DELETE using body:**
```typescript
const sheetName = 'Contacts';
const rowId = 2;
const url = `${API_BASE_URL}?path=/api/${sheetName}/${rowId}`;

const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ _method: 'DELETE' }),
});

const data = await response.json();
```

## Complete Example: Contact Form Integration

Update your existing `googleSheets.ts` to use the new API:

```typescript
// src/lib/googleSheets.ts
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Using the new REST API
export const submitToGoogleSheets = async (
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> => {
  if (!GOOGLE_SCRIPT_URL) {
    console.log("Contact form submission (demo mode):", data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true };
  }

  try {
    const url = `${GOOGLE_SCRIPT_URL}?path=/api/Contacts`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }

    return { success: result.success || true };
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit form",
    };
  }
};

// Get all contacts
export const getContacts = async () => {
  if (!GOOGLE_SCRIPT_URL) {
    return { rows: [], count: 0 };
  }

  try {
    const url = `${GOOGLE_SCRIPT_URL}?path=/api/Contacts`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return { rows: [], count: 0 };
  }
};
```

## Error Handling

Always handle errors properly:

```typescript
try {
  const response = await apiCall('Contacts', undefined, {
    method: 'POST',
    body: formData
  });
  
  if (response.success) {
    // Handle success
    console.log('Data saved successfully');
  }
} catch (error) {
  // Handle error
  console.error('Failed to save data:', error);
  // Show user-friendly error message
}
```

## Response Format

### Success Responses

**GET (all rows):**
```json
{
  "rows": [
    { "id": 2, "name": "John", "email": "john@example.com", ... },
    { "id": 3, "name": "Jane", "email": "jane@example.com", ... }
  ],
  "count": 2
}
```

**GET (single row):**
```json
{
  "id": 2,
  "name": "John",
  "email": "john@example.com",
  "message": "Hello"
}
```

**POST/PUT/PATCH:**
```json
{
  "success": true,
  "row": {
    "id": 2,
    "name": "John",
    "email": "john@example.com",
    "message": "Hello"
  }
}
```

**DELETE:**
```json
{
  "success": true,
  "message": "Row deleted successfully"
}
```

### Error Responses

```json
{
  "error": "Error message here",
  "message": "Detailed error message"
}
```

## Notes

1. **Row IDs**: Row IDs are 1-based and correspond to the actual row number in the sheet. Row 1 is headers, so data starts at row 2.

2. **Column Names**: Make sure the keys in your request body match the column names in the first row of your sheet exactly (case-sensitive).

3. **CORS**: The API has CORS enabled, so you can make requests directly from your frontend without CORS issues.

4. **Sheet Names**: Use the exact sheet name as it appears in your Google Sheet (case-sensitive).

5. **Filtering**: GET requests support simple filtering via query parameters. The filter checks if the column value contains the filter value (case-insensitive).

6. **HTTP Methods**: Google Apps Script only natively supports GET and POST. For PUT, PATCH, and DELETE operations, use POST with a `_method` parameter in the request body or as a query parameter. The helper function above handles this automatically.
