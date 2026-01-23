// Google Sheets integration for contact form
// To set up:
// 1. Create a Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Paste the following code and deploy as web app:
/*
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.message
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
*/

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const submitToGoogleSheets = async (data: ContactFormData): Promise<{ success: boolean; error?: string }> => {
  // If no Google Script URL is configured, simulate success for demo
  if (!GOOGLE_SCRIPT_URL) {
    console.log("Contact form submission (demo mode):", data);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true };
  }

  try {
    // Use REST API format: /api/{sheetName}
    // Assuming sheet name is "Contacts" - change if different
    const sheetName = "Contacts";
    const url = `${GOOGLE_SCRIPT_URL}?path=/api/${sheetName}`;
    
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
      error: error instanceof Error ? error.message : "Failed to submit form" 
    };
  }
};
