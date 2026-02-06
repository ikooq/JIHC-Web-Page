import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/hooks/useLanguage";

interface SeoHeadProps {
    title?: string;
    description?: string;
    image?: string;
    type?: "website" | "article";
}

export const SeoHead = ({
    title,
    description,
    image = "/og-image.png", // Путь к дефолтной картинке
    type = "website"
}: SeoHeadProps) => {
    const { language } = useLanguage();

    // Базовое название сайта
    const siteName = "Auxility";
    // Формируем полный заголовок: "Page Title | Auxility" или просто "Auxility"
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const currentUrl = window.location.href;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <html lang={language} />

            {/* Open Graph tags (Facebook, LinkedIn, etc.) */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Auxility",
                    "url": "https://auxility.com",
                    "logo": "https://auxility.com/logo.png",
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+1-555-0199",
                        "contactType": "customer service"
                    },
                    "sameAs": [
                        "https://www.linkedin.com/company/auxility",
                        "https://twitter.com/auxility"
                    ]
                })}
            </script>
        </Helmet>
    );
};
