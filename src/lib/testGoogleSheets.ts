/**
 * Утилита для тестирования подключения к Google Sheets
 */

import { getGoogleSheetsBaseUrl } from './googleSheetsApiUrl';

export async function testGoogleSheetsConnection() {
  const baseUrl = getGoogleSheetsBaseUrl();
  console.log('🔍 Testing Google Sheets connection...');
  console.log('📋 Base URL:', baseUrl);
  
  if (!baseUrl) {
    console.error('❌ VITE_GOOGLE_SCRIPT_URL не настроен в .env файле');
    return false;
  }

  const testSheets = ['Hero', 'Services', 'Testimonials', 'Cases', 'Stats', 'Offerings', 'WhyUs', 'Contact', 'Copy'];
  
  for (const sheetName of testSheets) {
    try {
      const url = `${baseUrl}?path=/api/${sheetName}`;
      console.log(`\n📊 Testing ${sheetName}...`);
      console.log(`   URL: ${url}`);
      
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
      });

      console.log(`   Status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const text = await response.text();
        console.error(`   ❌ Error: ${text}`);
        continue;
      }

      const result = await response.json();
      console.log(`   ✅ Response:`, result);
      
      if (result.error) {
        console.error(`   ❌ API Error: ${result.error}`);
      } else {
        const rows = result.rows || [];
        console.log(`   ✅ Found ${rows.length} rows`);
        if (rows.length > 0) {
          console.log(`   📝 First row:`, rows[0]);
        } else {
          console.warn(`   ⚠️ Sheet "${sheetName}" is empty`);
        }
      }
    } catch (error) {
      console.error(`   ❌ Exception:`, error);
    }
  }
  
  console.log('\n✅ Connection test completed');
}

// Автоматически запустить тест при импорте в development режиме
if (import.meta.env.DEV) {
  // Запустить через небольшую задержку, чтобы консоль была готова
  setTimeout(() => {
    console.log('\n🚀 Running Google Sheets connection test...\n');
    testGoogleSheetsConnection();
  }, 1000);
}
