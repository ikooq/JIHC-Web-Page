import { useMemo } from "react";
import { useGoogleSheetsData } from "@/hooks/useGoogleSheetsData";
import { CopyData } from "@/lib/googleSheetsCMS";
import { defaultCopy } from "@/data/defaultCopy";
import { useLanguage } from "@/hooks/useLanguage";

/**
 * Хук для получения текстов сайта из листа "Copy" в Google Sheets.
 * Любое слово/фразу на сайте можно менять через этот лист.
 *
 * @returns get(key) — возвращает текст по ключу (из Google Sheets или defaultCopy)
 */
export function useCopy() {
  const { language } = useLanguage();
  const { data: copyRows } = useGoogleSheetsData<CopyData>({ sheetName: "Copy" });

  const copy = useMemo(() => {
    // 1. Сначала подготавливаем мапу из локального defaultCopy для выбранного языка
    const map: Record<string, string> = {};

    // Заполняем дефолтными значениями
    Object.entries(defaultCopy).forEach(([key, values]) => {
      // Приоритет: текущий язык -> английский
      map[key] = values[language] || values.en || "";
    });

    // 2. Накладываем данные из Google Sheets (если они есть)
    if (copyRows && copyRows.length > 0) {
      for (const row of copyRows) {
        const k = row?.key != null ? String(row.key).trim() : "";
        if (!k) continue;

        // Ищем значение для текущего языка в Google Sheets
        const langValue = (row as any)?.[language] != null ? String((row as any)[language]) : "";
        const enValue = (row as any)?.en != null ? String((row as any).en) : "";
        const legacyValue = row?.value != null ? String(row.value) : "";

        // Приоритет в Google Sheets: текущий язык -> английский -> legacy "value"
        const v = (langValue.trim() || enValue.trim() || legacyValue.trim());

        if (v) {
          map[k] = v;
        }
      }
    }
    return map;
  }, [copyRows, language]);

  /**
   * Получает текст по ключу.
   * Если ключа нет ни в Google Sheets, ни в defaultCopy, возвращает сам ключ.
   */
  const get = (key: string): string => {
    return copy[key] ?? key;
  };

  return { get, copy };
}
