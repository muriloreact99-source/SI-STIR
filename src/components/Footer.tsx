import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-[#FFFAE6] dark:bg-[#163A3D] border-t-2 border-[#12383A] dark:border-[#8AD6D1] py-10 px-4 sm:px-6">
      <div className="max-w-[1120px] mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8AD6D1] text-[#12383A] border-2 border-[#12383A] text-[13px] font-extrabold uppercase tracking-wider">
          <span>🌱</span>
          <span>Tumbuh Bersama</span>
        </div>

        <p className="text-[18px] font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
          SI STIR, tumbuh bersama setiap hari.
        </p>

        <p className="text-[16px] font-bold text-[#12383A]/90 dark:text-[#FFF0C5]/90">
          SDN 03 Wonosari | NPSN 40500185
        </p>

        <p className="text-[15px] text-[#12383A]/75 dark:text-[#FFF0C5]/75 max-w-xl mx-auto">
          Jln. Lingkar, Makmur, Wonosari, Kabupaten Boalemo, Gorontalo 96262
        </p>

        <p className="text-[14px] text-[#12383A]/70 dark:text-[#8AD6D1]">
          Kontak sdn03wonosari@boalemokab.go.id | Telepon 0435 821990
        </p>

        <div className="pt-4 border-t border-[#12383A]/15 dark:border-[#8AD6D1]/20 flex flex-wrap justify-center items-center gap-4 text-[13px] font-bold text-[#12383A]/60 dark:text-[#FFF0C5]/60">
          <span>Kepala Sekolah Ibu Khoyum Supardi, S.Pd.SD, M.Pd.</span>
          <span>•</span>
          <span className="px-2 py-0.5 rounded-md bg-[#FFF0C5] text-[#12383A] border border-[#12383A] text-[11px]">
            Data contoh
          </span>
        </div>
      </div>
    </footer>
  );
};
