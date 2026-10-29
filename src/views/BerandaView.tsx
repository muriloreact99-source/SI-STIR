import React from 'react';
import { SignatureBand } from '../components/SignatureBand.tsx';
import { UserRole } from '../types/index.ts';

interface BerandaViewProps {
  onNavigate: (tab: string) => void;
  onSelectRole: (role: UserRole) => void;
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  onNavigate,
  onSelectRole,
}) => {
  const roleCards = [
    {
      id: 'murid',
      role: 'murid' as UserRole,
      title: 'Ruang Murid',
      subtitle: 'Semangat belajar dan catat kebiasaan hebat setiap hari.',
      emoji: '🎒',
      buttonText: 'Buka Ruang Murid',
      color: '#8AD6D1',
      actionLabel: 'Masuk Sebagai Murid',
    },
    {
      id: 'orangtua',
      role: 'orangtua' as UserRole,
      title: 'Ruang Orang Tua',
      subtitle: 'Pantau perkembangan anak dan sampaikan refleksi rumah.',
      emoji: '🏡',
      buttonText: 'Buka Ruang Orang Tua',
      color: '#8AD6D1',
      actionLabel: 'Masuk Sebagai Orang Tua',
    },
    {
      id: 'guru',
      role: 'guru' as UserRole,
      title: 'Ruang Guru',
      subtitle: 'Kelola modul ajar dan periksa kemajuan belajar murid.',
      emoji: '👩‍🏫',
      buttonText: 'Buka Ruang Guru',
      color: '#8AD6D1',
      actionLabel: 'Masuk Sebagai Guru',
    },
    {
      id: 'kepalasekolah',
      role: 'kepalasekolah' as UserRole,
      title: 'Ruang Kepala Sekolah',
      subtitle: 'Supervisi terintegrasi dan validasi dokumen sekolah.',
      emoji: '🏛️',
      buttonText: 'Buka Ruang Kepala Sekolah',
      color: '#8AD6D1',
      actionLabel: 'Masuk Sebagai Kepala Sekolah',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#359FA0] border-2 border-[#12383A] dark:border-[#8AD6D1] shadow-[5px_5px_0_#12383A] dark:shadow-[5px_5px_0_#04171A] p-6 sm:p-10 text-[#12383A]">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF0C5] text-[#12383A] border-2 border-[#12383A] text-[13px] font-extrabold uppercase tracking-wider">
            <span>🌱</span>
            <span>Tumbuh Bersama</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#12383A] leading-tight">
            Sistem Informasi Supervisi Terintegrasi SDN 03 Wonosari
          </h1>

          <p className="text-[17px] sm:text-[18px] font-medium text-[#12383A] leading-relaxed max-w-2xl">
            SI STIR menghubungkan ruang guru, ruang murid, dan ruang orang tua dalam satu langkah supervisi yang ramah dan rapi.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('murid')}
              className="btn-tactile px-6 py-3.5 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[16px] flex items-center gap-2 cursor-pointer"
            >
              <span>Jelajahi Ruang Belajar</span>
              <span>🎒</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('bantuan')}
              className="btn-tactile px-6 py-3.5 rounded-full bg-[#FFFAE6] text-[#12383A] font-bold text-[16px] cursor-pointer"
            >
              Baca Panduan Lengkap
            </button>
          </div>
        </div>

        {/* Small badge top right */}
        <div className="hidden md:flex absolute top-6 right-6 flex-col items-end">
          <div className="px-3.5 py-1.5 rounded-2xl bg-[#FFF0C5] border-2 border-[#12383A] text-right shadow-[3px_3px_0_#12383A]">
            <div className="text-[12px] font-extrabold uppercase tracking-wide text-[#9E430B]">
              Kepala Sekolah
            </div>
            <div className="text-[14px] font-extrabold text-[#12383A]">
              Ibu Khoyum Supardi, S.Pd.SD, M.Pd.
            </div>
          </div>
        </div>
      </section>

      {/* Signature Motif: Four Equal Stripes Band */}
      <SignatureBand />

      {/* 4 Role Cards Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[13px] font-extrabold uppercase tracking-wider text-[#9E430B] dark:text-[#8AD6D1]">
              Pintu Masuk Ruang
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              Empat Ruang Pembelajaran Terpadu
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#FFF0C5] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] border-2 border-[#12383A] dark:border-[#8AD6D1] text-[12px] font-bold">
            Data contoh
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {roleCards.map((card) => (
            <div
              key={card.id}
              className="card-tactile rounded-[24px] bg-[#8AD6D1] p-6 flex flex-col justify-between transition-transform hover:-translate-y-1"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFFFFF] border-2 border-[#12383A] flex items-center justify-center text-3xl mb-4 shadow-[3px_3px_0_#12383A]">
                  {card.emoji}
                </div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#12383A] opacity-80 mb-1">
                  Tumbuh Bersama
                </div>
                <h3 className="text-xl font-extrabold text-[#12383A] mb-2">
                  {card.title}
                </h3>
                <p className="text-[15px] font-medium text-[#12383A] leading-snug mb-6">
                  {card.subtitle}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#12383A]/20">
                <button
                  type="button"
                  onClick={() => {
                    onSelectRole(card.role);
                    onNavigate(card.id);
                  }}
                  className="btn-tactile w-full py-3 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[15px] text-center block cursor-pointer"
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* School Highlights & 7 Kebiasaan Banner */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kebiasaan Hebat Card */}
        <div className="lg:col-span-2 card-tactile rounded-[28px] bg-[#FFFAE6] dark:bg-[#163A3D] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full bg-[#CFEFEC] text-[#12383A] border-2 border-[#12383A] text-[13px] font-extrabold uppercase tracking-wider">
              Program Unggulan
            </span>
            <span className="text-[13px] font-bold text-[#12383A]/70 dark:text-[#FFF0C5]/70">
              Gerakan Karakter
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-[#12383A] dark:text-[#FFF0C5] mb-2">
            7 Kebiasaan Anak Indonesia Hebat
          </h3>
          <p className="text-[16px] text-[#12383A]/85 dark:text-[#FFF0C5]/85 mb-6 leading-relaxed">
            Murid SDN 03 Wonosari membiasakan disiplin dan kebaikan sejak bangun pagi hingga tidur tepat waktu.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { num: '1', title: 'Bangun pagi', desc: 'Sebelum subuh dan rapi tempat tidur' },
              { num: '2', title: 'Beribadah', desc: 'Ibadah bersama keluarga di rumah' },
              { num: '3', title: 'Berolahraga', desc: 'Gerak badan lima belas menit' },
              { num: '4', title: 'Makan sehat dan bergizi', desc: 'Sarapan bernutrisi dan sayuran' },
              { num: '5', title: 'Gemar belajar', desc: 'Membaca buku pengetahuan dan cerita' },
              { num: '6', title: 'Bermasyarakat', desc: 'Saling menyapa dan tolong menolong' },
              { num: '7', title: 'Tidur cepat', desc: 'Istirahat sebelum pukul sembilan malam' },
            ].map((item) => (
              <div
                key={item.num}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#1F5254] border-2 border-[#12383A] dark:border-[#8AD6D1]"
              >
                <div className="w-8 h-8 rounded-full bg-[#FF8C52] text-[#12383A] font-extrabold flex items-center justify-center text-[15px] shrink-0 border border-[#12383A]">
                  {item.num}
                </div>
                <div>
                  <div className="font-bold text-[15px] text-[#12383A] dark:text-[#FFF0C5]">
                    {item.title}
                  </div>
                  <div className="text-[13px] text-[#12383A]/70 dark:text-[#8AD6D1]">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t-2 border-[#12383A]/15 dark:border-[#8AD6D1]/20 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigate('murid')}
              className="btn-tactile px-6 py-2.5 rounded-full bg-[#8AD6D1] text-[#12383A] font-bold text-[15px] cursor-pointer"
            >
              Lihat Jurnal Pembiasaan
            </button>
          </div>
        </div>

        {/* Informasi Sekolah SDN 03 Wonosari */}
        <div className="card-tactile rounded-[28px] bg-[#CFEFEC] dark:bg-[#163A3D] p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0C5] border-2 border-[#12383A] flex items-center justify-center text-2xl shadow-[2px_2px_0_#12383A]">
              📍
            </div>
            <h3 className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              Profil Sekolah
            </h3>
            <div className="space-y-2 text-[15px] text-[#12383A] dark:text-[#FFF0C5]">
              <div className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#1F5254] border-2 border-[#12383A] dark:border-[#8AD6D1]">
                <div className="text-[12px] font-extrabold uppercase text-[#9E430B] dark:text-[#8AD6D1]">
                  Nama Satuan
                </div>
                <div className="font-bold text-[16px]">SDN 03 Wonosari</div>
                <div className="text-[13px] text-[#12383A]/75 dark:text-[#FFF0C5]/75">
                  NPSN 40500185
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#1F5254] border-2 border-[#12383A] dark:border-[#8AD6D1]">
                <div className="text-[12px] font-extrabold uppercase text-[#9E430B] dark:text-[#8AD6D1]">
                  Kepemimpinan
                </div>
                <div className="font-bold text-[15px]">
                  Ibu Khoyum Supardi, S.Pd.SD, M.Pd.
                </div>
                <div className="text-[13px] text-[#12383A]/75 dark:text-[#FFF0C5]/75">
                  Kepala Sekolah Penggerak
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#1F5254] border-2 border-[#12383A] dark:border-[#8AD6D1]">
                <div className="text-[12px] font-extrabold uppercase text-[#9E430B] dark:text-[#8AD6D1]">
                  Wilayah Kerja
                </div>
                <div className="text-[14px] leading-snug">
                  Desa Makmur, Kecamatan Wonosari, Boalemo, Gorontalo
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-[#12383A]/15 dark:border-[#8AD6D1]/20">
            <button
              type="button"
              onClick={() => onNavigate('bantuan')}
              className="btn-tactile w-full py-3 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[15px] text-center block cursor-pointer"
            >
              Lihat Kontak Sekolah
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
