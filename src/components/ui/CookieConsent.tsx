import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/useCopy";

const COOKIE_CONSENT_KEY = "auxility_cookie_consent";

export const CookieConsent = () => {
    const { get } = useCopy();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!consent) {
            // Delay showing banner for better UX
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50"
                >
                    <div className="bg-card border border-border rounded-2xl shadow-2xl p-5 backdrop-blur-xl">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Cookie className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-foreground mb-1">
                                    {get("cookie_title") || "We use cookies"}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {get("cookie_description") || "We use cookies to enhance your experience. By continuing, you agree to our cookie policy."}
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        onClick={handleAccept}
                                        className="flex-1"
                                    >
                                        {get("cookie_accept") || "Accept"}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleDecline}
                                        className="flex-1"
                                    >
                                        {get("cookie_decline") || "Decline"}
                                    </Button>
                                </div>
                            </div>
                            <button
                                onClick={handleDecline}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
