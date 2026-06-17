import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, Target, Trophy, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/schedule', label: '赛程', icon: Calendar },
  { path: '/predict', label: '预测', icon: Target },
  { path: '/leaderboard', label: '排行榜', icon: Trophy },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-wc-dark font-body">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[220px] flex-col bg-gradient-to-b from-wc-dark to-wc-mid border-r border-wc-border z-30">
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-wc-border">
          <span className="text-2xl">⚽</span>
          <span className="font-heading text-2xl font-bold tracking-wider text-wc-accent glow-text">
            WC2026
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-wc-accent/15 text-wc-accent border-l-2 border-wc-accent'
                    : 'text-wc-muted hover:text-white hover:bg-wc-surface'
                )}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="px-5 py-4 border-t border-wc-border">
          <p className="text-xs text-wc-muted">2026 FIFA 世界杯预测</p>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'md:hidden fixed left-0 top-0 bottom-0 w-[260px] flex flex-col bg-gradient-to-b from-wc-dark to-wc-mid border-r border-wc-border z-50 transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-wc-border">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚽</span>
            <span className="font-heading text-2xl font-bold tracking-wider text-wc-accent glow-text">
              WC2026
            </span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-wc-muted hover:text-white">
            <X size={22} />
          </button>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-wc-accent/15 text-wc-accent border-l-2 border-wc-accent'
                    : 'text-wc-muted hover:text-white hover:bg-wc-surface'
                )}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main area */}
      <div className="md:ml-[220px] min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-6 h-14 bg-wc-dark/90 backdrop-blur-md border-b border-wc-border">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-wc-muted hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <span className="md:hidden font-heading text-lg font-bold tracking-wider text-wc-accent">
              ⚽ WC2026
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-wc-surface border border-wc-border flex items-center justify-center text-sm">
              👤
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 grid-bg p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around h-16 bg-wc-dark/95 backdrop-blur-md border-t border-wc-border">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1 transition-colors',
                active ? 'text-wc-accent' : 'text-wc-muted'
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
