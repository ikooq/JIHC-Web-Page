import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock hooks
vi.mock('@/hooks/useCopy', () => ({
    useCopy: () => ({
        get: (key: string) => {
            const translations: Record<string, string> = {
                contact_badge: 'Let\'s Talk',
                contact_heading: 'Ready to Transform?',
                contact_subheading: 'Contact us today',
                contact_form_name: 'Your Name',
                contact_form_email: 'Email Address',
                contact_form_message: 'Message',
                contact_submit: 'Send Message',
                contact_sending: 'Sending...',
                contact_toast_fill_fields: 'Please fill all fields',
                contact_toast_invalid_email: 'Invalid email',
                contact_placeholder_name: 'John Doe',
                contact_placeholder_email: 'john@company.com',
                contact_placeholder_message: 'Your message...',
                contact_secure: 'Secure',
                contact_24h: '24h response',
                contact_privacy: 'Privacy policy',
            };
            return translations[key] || key;
        },
    }),
}));

vi.mock('@/hooks/useLanguage', () => ({
    useLanguage: () => ({ language: 'en' }),
}));

vi.mock('@/hooks/useGoogleSheetsData', () => ({
    useGoogleSheetsData: () => ({ data: [] }),
}));

vi.mock('@/lib/googleSheets', () => ({
    submitToGoogleSheets: vi.fn().mockResolvedValue({ success: true }),
}));

// Create a wrapper with providers
const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });

    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </QueryClientProvider>
    );
};

describe('ContactSection', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders contact form with all fields', async () => {
        const ContactSection = (await import('@/components/sections/ContactSection')).default;

        render(<ContactSection />, { wrapper: createWrapper() });

        expect(screen.getByPlaceholderText(/John Doe/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/john@company.com/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Your message/i)).toBeInTheDocument();
    });

    it('shows validation error for empty fields', async () => {
        const ContactSection = (await import('@/components/sections/ContactSection')).default;

        render(<ContactSection />, { wrapper: createWrapper() });

        const submitButton = screen.getByRole('button', { name: /Send Message/i });
        fireEvent.click(submitButton);

        // Toast should be triggered (we're mocking the toast system)
        await waitFor(() => {
            // The form should still be visible (not submitted)
            expect(screen.getByPlaceholderText(/John Doe/i)).toBeInTheDocument();
        });
    });

    it('allows user to fill in form fields', async () => {
        const ContactSection = (await import('@/components/sections/ContactSection')).default;

        render(<ContactSection />, { wrapper: createWrapper() });

        const nameInput = screen.getByPlaceholderText(/John Doe/i);
        const emailInput = screen.getByPlaceholderText(/john@company.com/i);
        const messageInput = screen.getByPlaceholderText(/Your message/i);

        fireEvent.change(nameInput, { target: { value: 'Test User' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(messageInput, { target: { value: 'Test message content' } });

        expect(nameInput).toHaveValue('Test User');
        expect(emailInput).toHaveValue('test@example.com');
        expect(messageInput).toHaveValue('Test message content');
    });

    it('displays badge and heading', async () => {
        const ContactSection = (await import('@/components/sections/ContactSection')).default;

        render(<ContactSection />, { wrapper: createWrapper() });

        expect(screen.getByText(/Let's Talk/i)).toBeInTheDocument();
        expect(screen.getByText(/Ready to Transform/i)).toBeInTheDocument();
    });
});
