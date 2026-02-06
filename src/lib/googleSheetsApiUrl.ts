/**
 * Базовый URL для запросов к Google Sheets API.
 * В режиме разработки используется прокси Vite (/api-google), чтобы избежать CORS.
 */
export function getGoogleSheetsBaseUrl(): string {
  if (import.meta.env.DEV) {
    return "/api-google";
  }
  return import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";
}
