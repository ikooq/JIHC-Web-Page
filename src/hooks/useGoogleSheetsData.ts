import { useState, useEffect } from 'react';
import { getGoogleSheetsBaseUrl } from '@/lib/googleSheetsApiUrl';

const getBaseUrl = () => getGoogleSheetsBaseUrl();
const GOOGLE_SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID || '';

interface UseGoogleSheetsDataOptions {
  sheetName: string;
  enabled?: boolean;
  filter?: Record<string, string>;
}

/**
 * Хук для загрузки данных из Google Sheets
 */
export function useGoogleSheetsData<T = any>({
  sheetName,
  enabled = true,
  filter,
}: UseGoogleSheetsDataOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const baseUrl = getBaseUrl();
    if (!enabled || !baseUrl || !sheetName) {
      console.warn(`[Google Sheets] Skipping ${sheetName}:`, {
        enabled,
        hasScriptUrl: !!baseUrl,
        sheetName,
      });
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Построить URL с параметрами
        let url = `${baseUrl}?path=/api/${sheetName}`;
        
        // Добавить фильтры если есть
        if (filter) {
          const params = new URLSearchParams(filter);
          url += `&${params.toString()}`;
        }

        console.log(`[Google Sheets] Fetching ${sheetName} from:`, url);

        // GET без Content-Type — иначе браузер шлёт OPTIONS (CORS preflight), а Google Apps Script его не обрабатывает
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const result = await response.json();
        
        console.log(`[Google Sheets] Response for ${sheetName}:`, result);
        
        if (result.error) {
          throw new Error(result.error);
        }

        // Если есть поле rows, используем его, иначе используем сам результат
        const rows = result.rows || (Array.isArray(result) ? result : [result]);
        console.log(`[Google Sheets] Loaded ${rows.length} rows from ${sheetName}:`, rows);
        setData(rows);
      } catch (err) {
        console.error(`[Google Sheets] Error fetching ${sheetName}:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sheetName, enabled, JSON.stringify(filter)]);

  return { data, loading, error };
}

/**
 * Хук для загрузки одной записи по ID
 */
export function useGoogleSheetsItem<T = any>(sheetName: string, rowId: number | string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getBaseUrl() || !sheetName || !rowId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${getBaseUrl()}?path=/api/${sheetName}/${rowId}`;

        // GET без кастомных заголовков, чтобы не вызывать CORS preflight
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const result = await response.json();
        
        if (result.error) {
          throw new Error(result.error);
        }

        setData(result);
      } catch (err) {
        console.error(`Error fetching ${sheetName}/${rowId}:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sheetName, rowId]);

  return { data, loading, error };
}

/**
 * Хук для загрузки данных по полю field (для Hero, Contact, SEO)
 */
export function useGoogleSheetsByField<T = any>(sheetName: string, fieldValue: string) {
  const { data, loading, error } = useGoogleSheetsData<T>({
    sheetName,
    filter: { field: fieldValue },
  });

  return {
    data: data.length > 0 ? data[0] : null,
    loading,
    error,
  };
}
