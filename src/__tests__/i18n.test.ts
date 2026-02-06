import { describe, it, expect } from 'vitest';
import { pickLocalized } from '../lib/i18n';

describe('pickLocalized', () => {
    const row = {
        title: 'Default Title',
        title_ru: 'Заголовок на русском',
        title_kk: 'Қазақша тақырып',
        description: 'Default Description',
    };

    it('should pick the Russian localized value', () => {
        expect(pickLocalized(row, 'title', 'ru')).toBe('Заголовок на русском');
    });

    it('should pick the Kazakh localized value', () => {
        expect(pickLocalized(row, 'title', 'kk')).toBe('Қазақша тақырып');
    });

    it('should pick the English localized value (fallback to base)', () => {
        expect(pickLocalized(row, 'title', 'en')).toBe('Default Title');
    });

    it('should fallback to base if localized version is missing', () => {
        expect(pickLocalized(row, 'description', 'ru')).toBe('Default Description');
    });

    it('should return fallback string if row is null', () => {
        expect(pickLocalized(null, 'title', 'en', 'Fallback')).toBe('Fallback');
    });

    it('should return fallback string if key is completely missing', () => {
        expect(pickLocalized(row, 'nonexistent', 'en', 'Fallback')).toBe('Fallback');
    });
});
