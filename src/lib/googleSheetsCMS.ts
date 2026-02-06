/**
 * Google Sheets CMS - Утилиты для работы с контентом из Google Sheets
 */

import { getGoogleSheetsBaseUrl } from './googleSheetsApiUrl';

/**
 * Загрузить данные из листа Google Sheets
 */
export async function fetchSheetData<T = any>(
  sheetName: string,
  filter?: Record<string, string>
): Promise<T[]> {
  const baseUrl = getGoogleSheetsBaseUrl();
  if (!baseUrl) {
    console.warn(`Google Script URL not configured. Sheet: ${sheetName}`);
    return [];
  }

  try {
    let url = `${baseUrl}?path=/api/${sheetName}`;
    
    if (filter) {
      const params = new URLSearchParams(filter);
      url += `&${params.toString()}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }

    return result.rows || [];
  } catch (error) {
    console.error(`Error fetching ${sheetName}:`, error);
    return [];
  }
}

/**
 * Загрузить одну запись по ID
 */
export async function fetchSheetItem<T = any>(
  sheetName: string,
  rowId: number | string
): Promise<T | null> {
  const baseUrl = getGoogleSheetsBaseUrl();
  if (!baseUrl) {
    console.warn(`Google Script URL not configured. Sheet: ${sheetName}, ID: ${rowId}`);
    return null;
  }

  try {
    const url = `${baseUrl}?path=/api/${sheetName}/${rowId}`;

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    console.error(`Error fetching ${sheetName}/${rowId}:`, error);
    return null;
  }
}

/**
 * Загрузить данные по полю field
 */
export async function fetchSheetByField<T = any>(
  sheetName: string,
  fieldValue: string
): Promise<T | null> {
  const data = await fetchSheetData<T>(sheetName, { field: fieldValue });
  return data.length > 0 ? data[0] : null;
}

/**
 * Типы данных для разных листов
 */

export interface HeroData {
  field: string;
  title: string;
  subtitle: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
  badge_text: string;
  stats_value_1: string;
  stats_label_1: string;
  stats_value_2: string;
  stats_label_2: string;
  stats_value_3: string;
  stats_label_3: string;
}

export interface ServiceData {
  id: string;
  category: 'fintech' | 'healthcare';
  title: string;
  description: string;
  feature_1: string;
  feature_2: string;
  feature_3: string;
  feature_4: string;
  icon: string;
}

export interface TestimonialData {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  active: string; // "TRUE" or "FALSE"
}

export interface CaseData {
  id: string;
  title: string;
  category: string;
  description: string;
  tag_1: string;
  tag_2: string;
  tag_3: string;
  tag_4: string;
  color: 'fintech' | 'healthcare';
  image_url?: string;
}

export interface OfferingData {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: string;
}

export interface WhyUsData {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: string;
}

export interface StatData {
  id: string;
  value: string;
  label: string;
  icon?: string;
  order: string;
}

export interface ContactData {
  field: string;
  value: string;
}

export interface SEOData {
  field: string;
  value: string;
}

export interface CopyData {
  key: string;
  // Backward-compatible: раньше была только колонка value
  value?: string;
  // Рекомендуемый формат для мульти-языка:
  en?: string;
  ru?: string;
  kk?: string;
  description?: string;
}
