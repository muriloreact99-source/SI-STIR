import React from 'react';
import { UserRole } from '../types/index.ts';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export const RoleModal: React.FC<RoleModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole,
}) => {
  if (!isOpen) return null;

  const roleOptions: {
    role: UserRole;
    title: string;
    personName: string;
    desc: string;
    emoji: string;
    bg: string;
  }[] = [
    {
      role: 'kepalasekolah',
      title: 'Kepala Sekolah',
      personName: 'Ibu Khoyum Supardi, S.Pd.SD, M.Pd.',
      desc: 'Dapat membuka semua ruang, memvalidasi modul ajar, memeriksa arsip RKAS, dan supervisi guru.',
      emoji: '🏛️',
      bg: '#8AD6D1',
    },
    {
      role: 'guru',
      title: 'Guru Kelas 1',
      personName: 'Ibu Darmiati, S.Pd',
      desc: 'Mengunggah modul ajar, memeriksa tugas murid, mencatat jurnal kelas, dan membalas pesan orang tua.',
      emoji: '👩‍🏫',
      bg: '#FFFAE6',
    },
    {
      role: 'orangtua',
      title: 'Orang Tua Murid',
      personName: 'Ibu Rina (Ibu dari Aisyah dan Fajar)',
      desc: 'Melihat kehadiran, memantau tugas anak, mengirim refleksi harian, dan berkirim pesan dengan guru.',
      emoji: '🏡',
      bg: '#CFEFEC',
    },
    {
      role: 'murid',
      title: 'Murid Kelas 1',
      personName: 'Aisyah',
      desc: 'Mencentang 7 kebiasaan hebat, mengisi absen mandiri, melihat tugas, dan mengumpulkan karya.',
      emoji: '🎒',
      bg: '#FFF0C5',
    },
    {
      role: 'tamu',
      title: 'Tamu Publik',
      personName: 'Pengunjung SDN 03 Wonosari',
      desc: 'Melihat profil sekolah, visi misi, jadwal kegiatan, dan halaman bantuan terbuka.',
      emoji: '👀',
      bg: '#FFFFFF',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#12383A]/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#FFFAE6] dark:bg-[#163A3D] rounded-[28px] border-2 border-[#12383A] dark:border-[#8AD6D1] shadow-[6px_6px_0_#12383A] dark:shadow-[6px_6px_0_#04171A] p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 border-b-2 border-[#12383A]/20 pb-4">
          <div>
            <span className="inline-block px-3 py-0.5 rounded-full bg-[#8AD6D1] text-[#12383A] border-2 border-[#12383A] text-[12px] font-extrabold uppercase tracking-wider mb-1">
              Tumbuh Bersama
            </span>
            <h3 className="text-2xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              Pilih Akun Pengguna
            </h3>
            <p className="text-[14px] text-[#12383A]/70 dark:text-[#FFF0C5]/70">
              Pilih peran untuk menguji setiap ruang supervisi di SDN 03 Wonosari.
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-10 h-10 rounded-full border-2 border-[#12383A] dark:border-[#8AD6D1] bg-[#FF8C52] text-[#12383A] font-extrabold flex items-center justify-center shadow-[2px_2px_0_#12383A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
            aria-label="Tutup Jendela"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 my-4">
          {roleOptions.map((opt) => {
            const isSelected = currentRole === opt.role;
            return (
              <div
                key={opt.role}
                onClick={() => {
                  onSelectRole(opt.role);
                  onClose();
                }}
                className={`p-4 rounded-[20px] border-2 border-[#12383A] dark:border-[#8AD6D1] cursor-pointer transition-all ${
                  isSelected
                    ? 'ring-3 ring-[#FF8C52] shadow-[4px_4px_0_#FF8C52]'
                    : 'shadow-[3px_3px_0_#12383A] dark:shadow-[3px_3px_0_#04171A] hover:translate-x-[1px] hover:translate-y-[1px]'
                }`}
                style={{ backgroundColor: opt.bg }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] border-2 border-[#12383A] flex items-center justify-center text-2xl shrink-0 shadow-[2px_2px_0_#12383A]">
                    {opt.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="font-extrabold text-[17px] text-[#12383A]">
                        {opt.title}
                      </div>
                      {isSelected && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#CDEFD0] text-[#174D1F] border-2 border-[#12383A] text-[12px] font-bold">
                          Sedang Aktif
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-[14px] text-[#9E430B]">
                      {opt.personName}
                    </div>
                    <p className="text-[13px] text-[#12383A]/85 mt-1 leading-snug">
                      {opt.desc}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRole(opt.role);
                      onClose();
                    }}
                    className="btn-tactile self-center hidden sm:flex px-4 py-2 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[14px] items-center shrink-0"
                  >
                    Masuk Sebagai
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-3 border-t-2 border-[#12383A]/20">
          <button
            onClick={onClose}
            type="button"
            className="btn-tactile px-6 py-2.5 rounded-full bg-[#FFFFFF] text-[#12383A] font-bold text-[15px]"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
};
