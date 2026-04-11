import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import { useThemeStore, applyTheme } from '@/stores/useThemeStore';

export default function App() {
  const isDark = useThemeStore((s) => s.isDark);

  // Keep <html> class in sync with the persisted theme at all times
  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
