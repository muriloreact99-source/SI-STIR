import React from 'react';

interface RoleGateCardProps {
  roomName: string;
  allowedRoleLabel: string;
  onOpenLogin: () => void;
}

export const RoleGateCard: React.FC<RoleGateCardProps> = ({
  roomName,
  allowedRoleLabel,
  onOpenLogin,
}) => {
  return (
    <div className="max-w-xl mx-auto my-12 p-8 md:p-10 rounded-[28px] bg-[#FFFAE6] dark:bg-[#163A3D] border-2 border-[#12383A] dark:border-[#8AD6D1] shadow-[5px_5px_0_#12383A] dark:shadow-[5px_5px_0_#04171A] text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFF0C5] dark:bg-[#1F5254] border-2 border-[#12383A] dark:border-[#8AD6D1] flex items-center justify-center text-3xl shadow-[3px_3px_0_#12383A] dark:shadow-[3px_3px_0_#04171A]">
        🔒
      </div>
      <div className="inline-block px-3 py-1 rounded-full bg-[#CFEFEC] text-[#12383A] border-2 border-[#12383A] text-[13px] font-extrabold uppercase tracking-wider mb-3">
        Tumbuh Bersama
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#12383A] dark:text-[#FFF0C5] mb-3">
        Ruang ini perlu akun
      </h2>
      <p className="text-[16px] text-[#12383A]/80 dark:text-[#FFF0C5]/80 mb-6 leading-relaxed max-w-md mx-auto">
        Anda sedang mencoba membuka {roomName}. Ruang ini khusus untuk {allowedRoleLabel}. Silakan masuk dengan akun yang sesuai untuk melanjutkan aktivitas supervisi dan pembelajaran.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <button
          onClick={onOpenLogin}
          type="button"
          className="btn-tactile w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[16px] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Masuk ke SI STIR</span>
          <span aria-hidden="true">🔑</span>
        </button>
      </div>
    </div>
  );
};
