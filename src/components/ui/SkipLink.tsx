import { useCopy } from "@/hooks/useCopy";

/**
 * Skip to main content link for keyboard accessibility.
 * Appears on focus for keyboard users.
 */
export const SkipLink = () => {
    const { get } = useCopy();

    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
            {get("skip_to_content") || "Skip to main content"}
        </a>
    );
};
