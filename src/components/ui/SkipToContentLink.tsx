import { useCallback } from "react";

type SkipToContentLinkProps = {
  /** The id of the main content element to focus (e.g. "main-content"). */
  targetId?: string;
};

export default function SkipToContentLink({ targetId = "main-content" }: SkipToContentLinkProps) {
  const handleActivate = useCallback(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    // Ensure it's focusable for screen reader + keyboard users.
    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
    }

    // Focus then scroll into view for consistent behavior across browsers.
    (target as HTMLElement).focus({ preventScroll: true });
    target.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [targetId]);

  return (
    <a
      href={`#${targetId}`}
      onClick={(e) => {
        // Keep the hash update, but also force focus.
        handleActivate();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
      className={
        "sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-background focus:text-foreground focus:shadow-lg focus:shadow-primary/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      }
    >
      Skip to main content
    </a>
  );
}
