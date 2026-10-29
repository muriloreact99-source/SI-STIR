import React from 'react';

export const SignatureBand: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`w-full grid grid-cols-4 h-2.5 rounded-full overflow-hidden border-2 border-[#12383A] dark:border-[#8AD6D1] ${className}`}
      aria-label="Pita motif empat warna SI STIR"
    >
      <div className="bg-[#8AD6D1]" title="Warna Mint" />
      <div className="bg-[#359FA0]" title="Warna Teal" />
      <div className="bg-[#FFF0C5]" title="Warna Cream" />
      <div className="bg-[#FF8C52]" title="Warna Orange" />
    </div>
  );
};
