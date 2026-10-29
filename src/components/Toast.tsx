import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div className="px-6 py-3 rounded-full bg-[#12383A] text-[#FFF0C5] border-2 border-[#8AD6D1] shadow-[4px_4px_0_#04171A] font-bold text-[16px] flex items-center gap-2">
        <span>✨</span>
        <span>{message}</span>
      </div>
    </div>
  );
};
