import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import { useThemeStore, applyTheme } from '@/stores/useThemeStore';
import { useAuthStore } from '@/stores/useAuthStore';

function HomePlaceholder() {
  const signOut = useAuthStore((s) => s.signOut);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 font-mono text-foreground">
      <span className="text-lg">Home — coming soon</span>
      <button
        onClick={signOut}
        className="text-xs text-primary/60 hover:text-primary underline transition-colors"
      >
        Sign out
      </button>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const session = useAuthStore((s) => s.session);
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const session = useAuthStore((s) => s.session);
  if (session) return <Navigate to="/home" replace />;
  return <>{children}</>;
}

export default function App() {
  const isDark = useThemeStore((s) => s.isDark);

  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePlaceholder />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
