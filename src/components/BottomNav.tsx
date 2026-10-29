import React from 'react';

interface BottomNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onNavigate }) => {
  const items = [
    { id: 'beranda', label: 'Beranda', icon: '🏠' },
    { id: 'murid', label: 'Murid', icon: '🎒' },
    { id: 'orangtua', label: 'Orang Tua', icon: '🏡' },
    { id: 'guru', label: 'Guru', icon: '👩‍🏫' },
    { id: 'kepalasekolah', label: 'Kepsek', icon: '🏛️' },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFF0C5] dark:bg-[#0E2A2C] border-t-2 border-[#12383A] dark:border-[#8AD6D1] px-2 py-1.5 shadow-[0_-4px_6px_rgba(0,0,0,0.05)]"
      aria-label="Navigasi Bawah Layar Sentuh"
    >
      <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
        {items.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex-1 py-1.5 px-1 rounded-2xl flex flex-col items-center justify-center transition-all min-h-[52px] ${
                isActive
                  ? 'bg-[#12383A] text-[#FFF0C5] border-2 border-[#12383A] shadow-[2px_2px_0_#FF8C52]'
                  : 'text-[#12383A] dark:text-[#FFF0C5] hover:bg-[#8AD6D1]/30'
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-[11px] font-bold mt-1 tracking-tight truncate max-w-[64px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
