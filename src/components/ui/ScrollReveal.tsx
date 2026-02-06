import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeUpVariants, viewportSettings } from "@/lib/animations";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    width?: "fit-content" | "100%";
}

export const ScrollReveal = ({
    children,
    className,
    delay = 0,
    width = "100%"
}: ScrollRevealProps) => {
    return (
        <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className={className}
            style={{ width }}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
};
