export type Language = "en" | "ru" | "kk";

export const DEFAULT_LANGUAGE: Language = "en";
export const LANGUAGE_STORAGE_KEY = "auxility_language";

export const LANGUAGE_OPTIONS: Array<{ value: Language; label: string }> = [
  { value: "ru", label: "Рус" },
  { value: "kk", label: "Қаз" },
  { value: "en", label: "Eng" },
];

export function isLanguage(value: unknown): value is Language {
  return value === "en" || value === "ru" || value === "kk";
}

/**
 * Берёт локализованное значение из строки Google Sheets.
 * Поддерживает колонки вида `${base}_${lang}` (например, title_ru) и fallback на base.
 */
export function pickLocalized(
  row: Record<string, any> | null | undefined,
  base: string,
  lang: Language,
  fallback: string = ""
): string {
  if (!row) return fallback;
  const key = `${base}_${lang}`;
  const v = row[key] ?? row[base];
  if (v == null) return fallback;
  const s = String(v);
  return s.length ? s : fallback;
}

