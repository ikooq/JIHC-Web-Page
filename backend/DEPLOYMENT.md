# Google Apps Script Backend - Deployment Guide

## Prerequisites

1. A Google account
2. Access to the Google Sheet: https://docs.google.com/spreadsheets/d/1YbuS3E8P9085Y38oIyYzgXTirusj6JHtkq8xMPyZJgs/edit

## Step-by-Step Deployment

### 1. Open Google Apps Script Editor

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1YbuS3E8P9085Y38oIyYzgXTirusj6JHtkq8xMPyZJgs/edit
2. Click on **Extensions** → **Apps Script** in the menu bar
3. This will open the Apps Script editor in a new tab

### 2. Replace Default Code

1. In the Apps Script editor, you'll see a default `myFunction()` code
2. Delete all existing code
3. Copy the entire contents of `GoogleAppsScript.gs` file
4. Paste it into the Apps Script editor
5. Click **Save** (💾 icon) or press `Ctrl+S` / `Cmd+S`
6. Give your project a name (e.g., "Auxility API Backend")

### 3. Set Up Your Sheets

Make sure your Google Sheet has:
- **First row contains column names** (headers)
- Each sheet you want to use as a table should follow this format

Example sheet structure:
```
| Name      | Email              | Message           |
|-----------|--------------------|-------------------|
| John Doe  | john@example.com   | Hello world       |
| Jane Doe  | jane@example.com   | Test message      |
```

### 4. Deploy as Web App

1. Click on **Deploy** → **New deployment** in the Apps Script editor
2. Click the **Select type** dropdown and choose **Web app**
3. Configure the deployment:
   - **Description**: "REST API Backend" (optional)
   - **Execute as**: Select **Me** (your email)
   - **Who has access**: Select **Anyone** (important for CORS to work)
4. Click **Deploy**
5. **Authorize the script**:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow** to grant permissions
6. Copy the **Web app URL** - this is your API endpoint!

### 5. Update Frontend Configuration

1. Copy the Web app URL you received
2. The URL will look like: `https://script.google.com/macros/s/AKfycby.../exec`
3. Add it to your frontend `.env` file or environment variables:

Create or update `.env` file in your project root:
```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbx9yMY-RXxDggfnbs46vTgm2eth114QXQhKdBKO6yfHyPnD2HSaqydx-OHSVBUdblFC-Q/exec
```

**Важно:** Если вы получили ошибку `output.setHeaders is not a function`, обновите код в Google Apps Script:
1. Откройте редактор Apps Script
2. Замените функции `sendResponse()` и `doOptions()` на исправленные версии из файла `GoogleAppsScript.gs`
3. Сохраните и создайте новую версию deployment (Deploy → Manage deployments → Edit → New version)

Or if you're using a different environment variable name, update `src/lib/googleSheets.ts` accordingly.

### 6. Test the API

You can test the API using the example requests provided in `API_EXAMPLES.md` or use a tool like Postman.

## API Endpoint Structure

Your deployed API will be accessible at:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

All API calls should use the format:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?path=/api/{sheetName}
```

## Important Notes

1. **First Deployment**: The first time you deploy, you'll need to authorize the script
2. **Updates**: When you update the code, you need to create a **New deployment** or update the existing one
3. **Permissions**: Make sure "Who has access" is set to **Anyone** for CORS to work properly
4. **Row IDs**: Row IDs are 1-based and correspond to the row number in the sheet. Row 1 is headers, so data starts at row 2
5. **Sheet Names**: Use exact sheet names as they appear in your Google Sheet (case-sensitive)

## Troubleshooting

### CORS Errors
- Make sure "Who has access" is set to **Anyone**
- Check that CORS headers are being set in the response

### 404 Errors
- Verify the sheet name matches exactly (case-sensitive)
- Make sure the sheet exists in your Google Sheet

### 400 Errors
- Check that your JSON payload is valid
- Ensure required fields are included
- Verify column names match the headers in your sheet

### Authorization Issues
- Re-authorize the script if you see permission errors
- Make sure you're executing as the correct user

## Security Considerations

⚠️ **Important**: This setup allows public access to your API. For production use, consider:
- Adding authentication/authorization
- Implementing rate limiting
- Validating and sanitizing all inputs
- Using Google Apps Script's built-in authentication features
