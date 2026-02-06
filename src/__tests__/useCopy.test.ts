import { renderHook } from '@testing-library/react';
import { useCopy } from '../hooks/useCopy';
import { expect, vi, describe, it, beforeEach } from 'vitest';
import * as useLanguageHook from '../hooks/useLanguage';
import * as useGoogleSheetsDataHook from '../hooks/useGoogleSheetsData';

// Mock dependencies
vi.mock('../hooks/useLanguage', () => ({
    useLanguage: vi.fn(),
}));

vi.mock('../hooks/useGoogleSheetsData', () => ({
    useGoogleSheetsData: vi.fn(),
}));

describe('useCopy', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return default copy when no Google Sheets data is available', () => {
        (useLanguageHook.useLanguage as any).mockReturnValue({ language: 'en' });
        (useGoogleSheetsDataHook.useGoogleSheetsData as any).mockReturnValue({ data: [] });

        const { result } = renderHook(() => useCopy());

        // Assuming defaultCopy has seo_index_title
        expect(result.current.get('seo_index_title')).toBeDefined();
    });

    it('should override default copy with Google Sheets data', () => {
        (useLanguageHook.useLanguage as any).mockReturnValue({ language: 'en' });
        (useGoogleSheetsDataHook.useGoogleSheetsData as any).mockReturnValue({
            data: [
                { key: 'seo_index_title', en: 'Overridden Title' }
            ]
        });

        const { result } = renderHook(() => useCopy());
        expect(result.current.get('seo_index_title')).toBe('Overridden Title');
    });

    it('should pick correctly by language from Google Sheets', () => {
        (useLanguageHook.useLanguage as any).mockReturnValue({ language: 'ru' });
        (useGoogleSheetsDataHook.useGoogleSheetsData as any).mockReturnValue({
            data: [
                { key: 'test_key', en: 'English', ru: 'Русский' }
            ]
        });

        const { result } = renderHook(() => useCopy());
        expect(result.current.get('test_key')).toBe('Русский');
    });

    it('should return the key if it does not exist anywhere', () => {
        (useLanguageHook.useLanguage as any).mockReturnValue({ language: 'en' });
        (useGoogleSheetsDataHook.useGoogleSheetsData as any).mockReturnValue({ data: [] });

        const { result } = renderHook(() => useCopy());
        expect(result.current.get('nonexistent_key')).toBe('nonexistent_key');
    });
});
