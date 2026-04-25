import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { useThemeStore, applyTheme } from '@/stores/useThemeStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { GridScan } from '@/components/GridScan';
import { darkPalette, lightPalette, gridScanLightAccent } from '@/shared/colors';

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
  const palette = isDark ? darkPalette : lightPalette;

  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  return (
    <BrowserRouter>
      {/* Persistent background — one WebGL context shared across all pages */}
      <div
        className="fixed inset-0 z-0"
        style={{ backgroundColor: palette.background }}
      >
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor={palette.surface}
          gridScale={0.1}
          scanColor={isDark ? palette.accent : gridScanLightAccent}
          scanOpacity={isDark ? 0.4 : 0.35}
          enablePost
          bloomIntensity={isDark ? 0.6 : 0.3}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10">
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
