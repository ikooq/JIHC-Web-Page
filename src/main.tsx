import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LanguageProvider } from "./hooks/useLanguage";
import "./index.css";

// Импортировать тестовую утилиту для проверки подключения к Google Sheets
if (import.meta.env.DEV) {
  import("./lib/testGoogleSheets");
  import("./lib/checkGoogleSheets");
}

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </LanguageProvider>
);
