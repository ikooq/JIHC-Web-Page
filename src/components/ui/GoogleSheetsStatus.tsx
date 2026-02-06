import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface GoogleSheetsStatusProps {
  sheetName: string;
  data: any;
  loading: boolean;
  error: string | null;
}

export const GoogleSheetsStatus = ({ sheetName, data, loading, error }: GoogleSheetsStatusProps) => {
  const [showStatus, setShowStatus] = useState(true);

  useEffect(() => {
    // Скрыть статус через 5 секунд если все ОК
    if (!loading && !error && data) {
      const timer = setTimeout(() => setShowStatus(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [loading, error, data]);

  if (!showStatus && !error) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-card border border-border rounded-lg shadow-lg p-3 max-w-sm">
      <div className="flex items-center gap-2">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">
              Загрузка {sheetName}...
            </span>
          </>
        ) : error ? (
          <>
            <AlertCircle className="w-4 h-4 text-destructive" />
            <div className="flex-1">
              <div className="text-sm font-medium text-destructive">
                Ошибка загрузки {sheetName}
              </div>
              <div className="text-xs text-muted-foreground">
                {error.length > 50 ? error.substring(0, 50) + '...' : error}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Используются данные по умолчанию
              </div>
            </div>
            <button
              onClick={() => setShowStatus(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </>
        ) : data && (Array.isArray(data) ? data.length > 0 : true) ? (
          <>
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-muted-foreground">
              {sheetName} загружен из Google Sheets ✅
            </span>
            <button
              onClick={() => setShowStatus(false)}
              className="text-muted-foreground hover:text-foreground ml-2"
            >
              ×
            </button>
          </>
        ) : (
          <>
            <AlertCircle className="w-4 h-4 text-yellow-500" />
            <div className="flex-1">
              <div className="text-sm font-medium text-yellow-600">
                {sheetName} не найден
              </div>
              <div className="text-xs text-muted-foreground">
                Используются данные по умолчанию
              </div>
            </div>
            <button
              onClick={() => setShowStatus(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </>
        )}
      </div>
    </div>
  );
};
