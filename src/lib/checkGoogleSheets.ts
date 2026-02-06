/**
 * Утилита для проверки и диагностики Google Sheets подключения
 */

import { getGoogleSheetsBaseUrl } from './googleSheetsApiUrl';

export async function checkGoogleSheetsSetup() {
  const baseUrl = getGoogleSheetsBaseUrl();
  const results: Array<{ sheet: string; status: 'success' | 'error' | 'empty'; message: string; data?: any }> = [];

  console.log('🔍 Проверка подключения к Google Sheets...');
  console.log('📋 Base URL:', baseUrl ? '✅ Настроен' : '❌ Не настроен');
  
  if (!baseUrl) {
    console.error('❌ VITE_GOOGLE_SCRIPT_URL не настроен в .env файле');
    return results;
  }

  const testSheets = [
    { name: 'Hero', filter: { field: 'main' } },
    { name: 'Services', filter: undefined },
    { name: 'Testimonials', filter: undefined },
    { name: 'Cases', filter: undefined },
    { name: 'Stats', filter: undefined },
    { name: 'Offerings', filter: undefined },
    { name: 'WhyUs', filter: undefined },
    { name: 'Contact', filter: undefined },
    { name: 'Copy', filter: undefined },
  ];

  for (const { name, filter } of testSheets) {
    try {
      let url = `${baseUrl}?path=/api/${name}`;
      
      if (filter) {
        const params = new URLSearchParams(filter as any);
        url += `&${params.toString()}`;
      }

      console.log(`\n📊 Проверка листа "${name}"...`);
      console.log(`   URL: ${url}`);

      // GET без Content-Type, иначе CORS preflight и блокировка со стороны Google
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
      });

      console.log(`   HTTP Status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const text = await response.text();
        console.error(`   ❌ HTTP Error: ${text}`);
        results.push({
          sheet: name,
          status: 'error',
          message: `HTTP ${response.status}: ${response.statusText}`,
        });
        continue;
      }

      const result = await response.json();
      console.log(`   📦 Response:`, result);

      if (result.error) {
        console.error(`   ❌ API Error: ${result.error}`);
        results.push({
          sheet: name,
          status: 'error',
          message: result.error,
        });
        continue;
      }

      const rows = result.rows || [];
      console.log(`   📝 Найдено строк: ${rows.length}`);

      if (rows.length === 0) {
        console.warn(`   ⚠️ Лист "${name}" пустой`);
        results.push({
          sheet: name,
          status: 'empty',
          message: 'Лист пустой или не содержит данных',
        });
      } else {
        console.log(`   ✅ Успешно загружено ${rows.length} строк`);
        console.log(`   📄 Первая строка:`, rows[0]);
        results.push({
          sheet: name,
          status: 'success',
          message: `Загружено ${rows.length} строк`,
          data: rows,
        });
      }
    } catch (error) {
      console.error(`   ❌ Exception:`, error);
      results.push({
        sheet: name,
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  console.log('\n📊 Итоги проверки:');
  results.forEach(r => {
    const icon = r.status === 'success' ? '✅' : r.status === 'empty' ? '⚠️' : '❌';
    console.log(`   ${icon} ${r.sheet}: ${r.message}`);
  });

  return results;
}

// Добавить в window для доступа из консоли
if (typeof window !== 'undefined') {
  (window as any).checkGoogleSheets = checkGoogleSheetsSetup;
  console.log('💡 Вызовите checkGoogleSheets() в консоли для проверки подключения');
}
