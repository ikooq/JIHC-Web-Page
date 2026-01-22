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
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Google Apps Script requires no-cors
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // With no-cors, we can't read the response, so we assume success
    return { success: true };
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to submit form" 
    };
  }
};
