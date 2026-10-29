import React, { useState } from 'react';

interface BantuanViewProps {
  showToast: (msg: string) => void;
}

export const BantuanView: React.FC<BantuanViewProps> = ({ showToast }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      q: 'Apa itu aplikasi SI STIR di SDN 03 Wonosari?',
      a: 'SI STIR adalah singkatan dari Sistem Informasi Supervisi Terintegrasi Ruang Guru, Ruang Murid, Ruang Orang Tua. Aplikasi ini dirancang agar aktivitas belajar, pemantauan karakter, dan supervisi sekolah berjalan terpadu dan transparan.',
    },
    {
      q: 'Bagaimana cara murid mencatat 7 kebiasaan hebat setiap hari?',
      a: 'Murid membuka Ruang Murid lalu mencentang kotak kebiasaan yang telah dilakukan, seperti bangun pagi atau beribadah. Setiap centang akan menaikkan persentase capaian pada bilah kemajuan.',
    },
    {
      q: 'Apakah orang tua dapat melihat nilai dan catatan dari Ibu Guru?',
      a: 'Ya, orang tua dapat membuka Ruang Orang Tua untuk melihat ringkasan kehadiran anak, status tugas harian, dan berkirim pesan langsung melalui Ruang Penghubung.',
    },
    {
      q: 'Bagaimana mekanisme supervisi modul ajar oleh Ibu Kepala Sekolah?',
      a: 'Ibu Guru mengunggah modul ajar pada Ruang Guru. Ibu Kepala Sekolah kemudian memeriksa, memberikan catatan pembinaan, dan menyetujui modul agar siap diterapkan di kelas.',
    },
    {
      q: 'Siapa yang memiliki kewenangan melihat dokumen anggaran RKAS?',
      a: 'Dokumen RKAS bersifat terbatas dan hanya dapat dikelola secara penuh oleh Ibu Kepala Sekolah demi akuntabilitas tata kelola satuan pendidikan.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <section className="card-tactile rounded-[28px] bg-[#CFEFEC] dark:bg-[#163A3D] p-6 sm:p-10">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0C5] text-[#12383A] border-2 border-[#12383A] text-[13px] font-extrabold uppercase tracking-wider">
            <span>💡</span>
            <span>Tumbuh Bersama</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#12383A] dark:text-[#FFF0C5] leading-tight">
            Pusat Bantuan dan Informasi SI STIR
          </h1>

          <p className="text-[17px] font-medium text-[#12383A]/85 dark:text-[#FFF0C5]/85 leading-relaxed">
            Panduan lengkap penggunaan sistem informasi supervisi terpadu untuk warga sekolah SDN 03 Wonosari Kabupaten Boalemo.
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="card-tactile rounded-[28px] bg-[#FFFAE6] dark:bg-[#163A3D] p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-[13px] font-extrabold uppercase tracking-wider text-[#9E430B] dark:text-[#8AD6D1]">
            Pertanyaan Sering Diajukan
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12383A] dark:text-[#FFF0C5] mt-1">
            Tanya Jawab Seputar SI STIR
          </h2>
          <p className="text-[15px] text-[#12383A]/75 dark:text-[#FFF0C5]/75 mt-1">
            Klik pada pertanyaan untuk membaca jawaban secara lengkap.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.q}
                className="rounded-[20px] border-2 border-[#12383A] dark:border-[#8AD6D1] bg-[#FFFFFF] dark:bg-[#1F5254] overflow-hidden shadow-[3px_3px_0_#12383A]"
              >
                {/* 52px tall summary according to DESIGN.md */}
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full min-h-[52px] px-5 py-3 flex items-center justify-between gap-4 text-left font-extrabold text-[16px] text-[#12383A] dark:text-[#FFF0C5] cursor-pointer"
                >
                  <span>{item.q}</span>
                  <span className="w-8 h-8 rounded-full bg-[#FFF0C5] dark:bg-[#163A3D] border-2 border-[#12383A] dark:border-[#8AD6D1] flex items-center justify-center text-lg shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-[15px] text-[#12383A]/85 dark:text-[#FFF0C5]/85 border-t border-[#12383A]/15 dark:border-[#8AD6D1]/20 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* School Contact Card */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-tactile rounded-[24px] bg-[#8AD6D1] p-6 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] border-2 border-[#12383A] flex items-center justify-center text-2xl">
            🏫
          </div>
          <h3 className="text-xl font-extrabold text-[#12383A]">
            Kontak dan Lokasi Sekolah
          </h3>
          <div className="space-y-2 text-[15px] text-[#12383A]">
            <p>
              <span className="font-bold">Satuan Pendidikan:</span> SDN 03 Wonosari
            </p>
            <p>
              <span className="font-bold">Nomor Pokok Sekolah:</span> NPSN 40500185
            </p>
            <p>
              <span className="font-bold">Alamat Resmi:</span> Jln. Lingkar, Makmur, Wonosari, Kabupaten Boalemo, Gorontalo 96262
            </p>
            <p>
              <span className="font-bold">Surel:</span> sdn03wonosari@boalemokab.go.id
            </p>
            <p>
              <span className="font-bold">Telepon Kantor:</span> 0435 821990
            </p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => showToast('Kontak sekolah berhasil disalin')}
              className="btn-tactile px-5 py-2.5 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[14px] cursor-pointer"
            >
              Salin Alamat Surel Sekolah
            </button>
          </div>
        </div>

        <div className="card-tactile rounded-[24px] bg-[#FFF0C5] dark:bg-[#163A3D] p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] dark:bg-[#1F5254] border-2 border-[#12383A] dark:border-[#8AD6D1] flex items-center justify-center text-2xl">
              🕒
            </div>
            <h3 className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              Jam Operasional dan Pembelajaran
            </h3>
            <div className="space-y-2 text-[15px] text-[#12383A] dark:text-[#FFF0C5]">
              <p>
                <span className="font-bold">Hari Belajar:</span> Senin sampai Jumat
              </p>
              <p>
                <span className="font-bold">Jam Masuk Sekolah:</span> Pukul 06.45 WITA
              </p>
              <p>
                <span className="font-bold">Jam Pulang Sekolah:</span> Pukul 12.00 WITA
              </p>
              <p>
                <span className="font-bold">Layanan Supervisi:</span> Setiap hari kerja jam kantor
              </p>
            </div>
          </div>

          <div className="pt-3 border-t-2 border-[#12383A]/15 dark:border-[#8AD6D1]/20">
            <div className="text-[13px] font-bold text-[#12383A]/70 dark:text-[#FFF0C5]/70">
              Prinsip Layanan: Ramah, Disiplin, dan Bersahaja
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
