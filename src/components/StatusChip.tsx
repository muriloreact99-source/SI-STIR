import React from 'react';
import { TaskStatus, ModulStatus } from '../types/index.ts';

interface StatusChipProps {
  status: TaskStatus | ModulStatus | string;
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, className = '' }) => {
  let bg = '#EADFB8';
  let text = '#4B4524';

  if (status === 'Draf' || status === 'Belum dikerjakan') {
    bg = '#EADFB8';
    text = '#4B4524';
  } else if (status === 'Diajukan' || status === 'Sudah dikirim') {
    bg = '#CFEFEC';
    text = '#12383A';
  } else if (status === 'Disetujui' || status === 'Sudah diperiksa') {
    bg = '#CDEFD0';
    text = '#174D1F';
  } else if (status === 'Perlu revisi' || status === 'Perlu diperbaiki') {
    bg = '#FFD9C2';
    text = '#7A2E00';
  }

  return (
    <span
      style={{ backgroundColor: bg, color: text }}
      className={`inline-flex items-center px-3.5 py-1 rounded-full border-2 border-[#12383A] dark:border-[#8AD6D1] text-[14px] font-bold tracking-tight shadow-[2px_2px_0_#12383A] dark:shadow-[2px_2px_0_#04171A] ${className}`}
    >
      {status}
    </span>
  );
};
