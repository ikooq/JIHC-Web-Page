# Google Apps Script REST API Backend

A complete REST API backend for Google Sheets that treats each sheet as a database table.

## Features

- ✅ **REST API** - Full CRUD operations (Create, Read, Update, Delete)
- ✅ **JSON in/out** - All requests and responses use JSON
- ✅ **CORS enabled** - Works directly from frontend applications
- ✅ **Multiple sheets** - Each sheet acts as an independent table
- ✅ **Flexible filtering** - Filter GET requests by column values
- ✅ **Row IDs** - Automatic row ID management

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/{sheetName}` | Get all rows (with optional filtering) |
| GET | `/api/{sheetName}/{rowId}` | Get specific row by ID |
| POST | `/api/{sheetName}` | Add new row |
| PUT | `/api/{sheetName}/{rowId}` | Update entire row |
| PATCH | `/api/{sheetName}/{rowId}` | Partially update row |
| DELETE | `/api/{sheetName}/{rowId}` | Delete row |

## Quick Start

1. **Deploy the Script**
   - Open your Google Sheet
   - Go to Extensions → Apps Script
   - Copy and paste `GoogleAppsScript.gs`
   - Deploy as Web App (see [DEPLOYMENT.md](./DEPLOYMENT.md))

2. **Use the API**
   - See [API_EXAMPLES.md](./API_EXAMPLES.md) for frontend integration examples
   - Update your `.env` file with the Web App URL

## Files

- **`GoogleAppsScript.gs`** - Complete backend code to paste into Apps Script editor
- **`DEPLOYMENT.md`** - Step-by-step deployment instructions
- **`API_EXAMPLES.md`** - Frontend fetch request examples and integration guide

## Sheet Structure

Your Google Sheet should follow this format:

```
| Column1 | Column2 | Column3 |
|---------|---------|---------|
| Value1  | Value2  | Value3  |
| Value4  | Value5  | Value6  |
```

- **First row** = Column names (headers)
- **Subsequent rows** = Data

## Example Usage

```typescript
// Get all rows
const response = await fetch(`${API_URL}?path=/api/Contacts`);
const data = await response.json();
console.log(data.rows); // Array of all contacts

// Add new row
await fetch(`${API_URL}?path=/api/Contacts`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello!'
  })
});
```

## Important Notes

- **Row IDs**: Row 1 is headers, data starts at row 2. Row IDs match sheet row numbers.
- **Method Override**: Google Apps Script only supports GET and POST. PUT/PATCH/DELETE use POST with `_method` parameter.
- **CORS**: Set "Who has access" to "Anyone" when deploying for CORS to work.

## Documentation

- 📖 [Deployment Guide](./DEPLOYMENT.md) - How to deploy the backend
- 📖 [API Examples](./API_EXAMPLES.md) - Frontend integration examples
