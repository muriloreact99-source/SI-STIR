import React from 'react';
import { UserRole } from '../types/index.ts';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  currentRole: UserRole;
  onOpenRoleModal: () => void;
  onLogout: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  currentRole,
  onOpenRoleModal,
  onLogout,
  isDark,
  onToggleDark,
}) => {
  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'murid', label: 'Murid' },
    { id: 'orangtua', label: 'Orang Tua' },
    { id: 'guru', label: 'Guru' },
    { id: 'kepalasekolah', label: 'Kepala Sekolah' },
    { id: 'bantuan', label: 'Bantuan' },
  ];

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case 'kepalasekolah':
        return 'Ibu Khoyum Supardi';
      case 'guru':
        return 'Ibu Darmiati';
      case 'orangtua':
        return 'Ibu Rina';
      case 'murid':
        return 'Aisyah';
      default:
        return 'Tamu Publik';
    }
  };

  const getRoleEmoji = (role: UserRole) => {
    switch (role) {
      case 'kepalasekolah':
        return '🏛️';
      case 'guru':
        return '👩‍🏫';
      case 'orangtua':
        return '🏡';
      case 'murid':
        return '🎒';
      default:
        return '👀';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF0C5]/95 dark:bg-[#0E2A2C]/95 backdrop-blur-md border-b-2 border-[#12383A] dark:border-[#8AD6D1]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Logo and small label */}
        <button
          type="button"
          onClick={() => onNavigate('beranda')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-12 h-12 rounded-[16px] bg-[#8AD6D1] border-2 border-[#12383A] dark:border-[#8AD6D1] shadow-[3px_3px_0_#12383A] dark:shadow-[3px_3px_0_#04171A] flex items-center justify-center text-2xl group-hover:translate-x-[1px] group-hover:translate-y-[1px]">
            🌱
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-[#12383A] dark:text-[#FFF0C5]">
                SI STIR
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#FF8C52] text-[#12383A] border border-[#12383A]">
                Tumbuh Bersama
              </span>
            </div>
            <div className="text-[12px] font-bold text-[#12383A]/70 dark:text-[#8AD6D1]">
              SDN 03 Wonosari Boalemo
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Menu Utama">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-full font-bold text-[15px] transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#12383A] text-[#FFF0C5] border-2 border-[#12383A] shadow-[2px_2px_0_#FF8C52]'
                    : 'text-[#12383A] dark:text-[#FFF0C5] hover:bg-[#8AD6D1]/40 border-2 border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Role Badge & Auth Buttons & Dark Mode */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDark}
            className="w-10 h-10 rounded-full border-2 border-[#12383A] dark:border-[#8AD6D1] bg-[#FFFAE6] dark:bg-[#163A3D] text-[#12383A] dark:text-[#FFF0C5] flex items-center justify-center font-bold shadow-[2px_2px_0_#12383A] active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
            title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            aria-label={isDark ? 'Mode Terang' : 'Mode Gelap'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Role badge button to switch easily */}
          <button
            type="button"
            onClick={onOpenRoleModal}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#CFEFEC] dark:bg-[#1F5254] border-2 border-[#12383A] dark:border-[#8AD6D1] text-[#12383A] dark:text-[#FFF0C5] text-[13px] font-bold shadow-[2px_2px_0_#12383A] hover:bg-[#8AD6D1] cursor-pointer"
            title="Klik untuk memilih peran lain"
          >
            <span>{getRoleEmoji(currentRole)}</span>
            <span className="truncate max-w-[120px]">{getRoleDisplayName(currentRole)}</span>
            <span className="text-[11px] bg-[#FFFFFF] dark:bg-[#12383A] px-1.5 py-0.2 rounded-full border border-[#12383A] text-[#12383A] dark:text-[#FFF0C5]">
              Ganti
            </span>
          </button>

          {/* Primary Action Button: Masuk or Keluar */}
          {currentRole === 'tamu' ? (
            <button
              type="button"
              onClick={onOpenRoleModal}
              className="btn-tactile px-5 py-2.5 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[16px] flex items-center gap-1.5 cursor-pointer"
            >
              <span>Masuk</span>
              <span aria-hidden="true">→</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onLogout}
              className="btn-tactile px-4 py-2.5 rounded-full bg-[#FFFAE6] dark:bg-[#163A3D] text-[#12383A] dark:text-[#FFF0C5] font-bold text-[15px] cursor-pointer"
              title="Keluar dari akun saat ini"
            >
              Keluar
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
