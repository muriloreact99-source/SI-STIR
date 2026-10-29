import React, { useState } from 'react';
import {
  ParentReflection,
  CommunicationMessage,
  UserRole,
  StudentTask,
} from '../types/index.ts';
import { RoleGateCard } from '../components/RoleGateCard.tsx';

interface RuangOrangTuaViewProps {
  currentRole: UserRole;
  onOpenLogin: () => void;
  reflections: ParentReflection[];
  onAddReflection: (studentName: string, className: string, content: string) => void;
  messages: CommunicationMessage[];
  onSendMessage: (senderName: string, text: string) => void;
  tasks: StudentTask[];
  showToast: (msg: string) => void;
}

export const RuangOrangTuaView: React.FC<RuangOrangTuaViewProps> = ({
  currentRole,
  onOpenLogin,
  reflections,
  onAddReflection,
  messages,
  onSendMessage,
  tasks,
  showToast,
}) => {
  // Gate check: only orangtua and kepalasekolah can access
  if (currentRole !== 'orangtua' && currentRole !== 'kepalasekolah') {
    return (
      <RoleGateCard
        roomName="Ruang Orang Tua"
        allowedRoleLabel="Orang Tua Murid dan Kepala Sekolah"
        onOpenLogin={onOpenLogin}
      />
    );
  }

  const [selectedChild, setSelectedChild] = useState<'Aisyah' | 'Fajar'>('Aisyah');
  const [reflectionText, setReflectionText] = useState<string>('');
  const [reflectionError, setReflectionError] = useState<string>('');
  const [chatInput, setChatInput] = useState<string>('');
  const [chatError, setChatError] = useState<string>('');

  const currentClass = selectedChild === 'Aisyah' ? 'Kelas 1' : 'Kelas 2';
  const currentTeacher = selectedChild === 'Aisyah' ? 'Ibu Darmiati, S.Pd' : 'Ibu Fadilatul Jannah Samsuru, S.Pd';

  const childTasks = tasks.filter((t) => t.studentName === selectedChild);
  const childReflections = reflections.filter((r) => r.studentName === selectedChild);

  const handleReflectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) {
      setReflectionError('Kolom ini belum diisi.');
      return;
    }
    onAddReflection('Ibu Rina', selectedChild, reflectionText);
    showToast('Refleksi harian Anda berhasil dikirimkan ke guru');
    setReflectionText('');
    setReflectionError('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) {
      setChatError('Kolom ini belum diisi.');
      return;
    }
    onSendMessage('Ibu Rina (Orang Tua Murid)', chatInput);
    showToast('Pesan Anda telah terkirim kepada wali kelas');
    setChatInput('');
    setChatError('');
  };

  return (
    <div className="space-y-10">
      {/* Calm Hero Card */}
      <section className="card-tactile rounded-[28px] bg-[#FFFAE6] dark:bg-[#163A3D] p-6 sm:p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8AD6D1] text-[#12383A] border-2 border-[#12383A] text-[13px] font-extrabold uppercase tracking-wider">
              <span>🏡</span>
              <span>Tumbuh Bersama</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#12383A] dark:text-[#FFF0C5] leading-tight">
              Selamat Datang, Ibu Rina
            </h1>

            <p className="text-[17px] font-medium text-[#12383A]/85 dark:text-[#FFF0C5]/85 leading-relaxed">
              Ruang pemantauan belajar putra putri Anda di SDN 03 Wonosari. Kemitraan keluarga dan sekolah adalah kunci tumbuhnya karakter anak.
            </p>
          </div>

          {/* Child Switcher Pill */}
          <div className="p-3 rounded-[24px] bg-[#FFFFFF] dark:bg-[#1F5254] border-2 border-[#12383A] dark:border-[#8AD6D1] shadow-[3px_3px_0_#12383A] dark:shadow-[3px_3px_0_#04171A] w-full md:w-auto">
            <div className="text-[12px] font-extrabold uppercase text-[#9E430B] dark:text-[#8AD6D1] px-2 mb-1.5">
              Pilih Profil Anak
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedChild('Aisyah')}
                className={`px-4 py-2 rounded-full font-extrabold text-[15px] border-2 border-[#12383A] dark:border-[#8AD6D1] cursor-pointer transition-all ${
                  selectedChild === 'Aisyah'
                    ? 'bg-[#FF8C52] text-[#12383A] shadow-[2px_2px_0_#12383A]'
                    : 'bg-[#FFFAE6] dark:bg-[#163A3D] text-[#12383A] dark:text-[#FFF0C5]'
                }`}
              >
                Aisyah (Kelas 1)
              </button>
              <button
                type="button"
                onClick={() => setSelectedChild('Fajar')}
                className={`px-4 py-2 rounded-full font-extrabold text-[15px] border-2 border-[#12383A] dark:border-[#8AD6D1] cursor-pointer transition-all ${
                  selectedChild === 'Fajar'
                    ? 'bg-[#FF8C52] text-[#12383A] shadow-[2px_2px_0_#12383A]'
                    : 'bg-[#FFFAE6] dark:bg-[#163A3D] text-[#12383A] dark:text-[#FFF0C5]'
                }`}
              >
                Fajar (Kelas 2)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Four Summary Cards on Top */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-extrabold uppercase tracking-wider text-[#9E430B] dark:text-[#8AD6D1]">
            Ringkasan Perkembangan {selectedChild}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#FFF0C5] text-[#12383A] border-2 border-[#12383A] text-[12px] font-bold">
            Data contoh
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Kehadiran */}
          <div className="card-tactile rounded-[24px] bg-[#CFEFEC] dark:bg-[#163A3D] p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border-2 border-[#12383A] flex items-center justify-center text-xl">
                📅
              </div>
              <div className="text-[12px] font-extrabold uppercase text-[#12383A]/70 dark:text-[#FFF0C5]/70">
                Kehadiran Hari Ini
              </div>
              <div className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                Hadir Tepat Waktu
              </div>
              <p className="text-[14px] text-[#12383A]/80 dark:text-[#FFF0C5]/80">
                Tercatat di gerbang sekolah pukul 06.45 WITA.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#12383A]/20 text-[12px] font-bold text-[#174D1F]">
              Disiplin kehadiran 100%
            </div>
          </div>

          {/* Card 2: 7 Kebiasaan */}
          <div className="card-tactile rounded-[24px] bg-[#8AD6D1] dark:bg-[#1F5254] p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border-2 border-[#12383A] flex items-center justify-center text-xl">
                ⭐
              </div>
              <div className="text-[12px] font-extrabold uppercase text-[#12383A]/70 dark:text-[#FFF0C5]/70">
                7 Kebiasaan Hebat
              </div>
              <div className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                3 Dari 7 Selesai
              </div>
              <p className="text-[14px] text-[#12383A]/80 dark:text-[#FFF0C5]/80">
                Bangun pagi, beribadah, dan olahraga sudah dicentang.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#12383A]/20 text-[12px] font-bold text-[#12383A] dark:text-[#FFF0C5]">
              Perlu pendampingan sore
            </div>
          </div>

          {/* Card 3: Tugas Terkini */}
          <div className="card-tactile rounded-[24px] bg-[#FFF0C5] dark:bg-[#163A3D] p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border-2 border-[#12383A] flex items-center justify-center text-xl">
                📝
              </div>
              <div className="text-[12px] font-extrabold uppercase text-[#12383A]/70 dark:text-[#FFF0C5]/70">
                Tugas Terkini
              </div>
              <div className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                {childTasks.length} Tugas Terdata
              </div>
              <p className="text-[14px] text-[#12383A]/80 dark:text-[#FFF0C5]/80">
                {selectedChild === 'Aisyah'
                  ? 'Tugas Bahasa Indonesia sudah diperiksa Ibu Darmiati.'
                  : 'Tugas Matematika sedang diperiksa Ibu Fadilatul.'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#12383A]/20 text-[12px] font-bold text-[#9E430B] dark:text-[#8AD6D1]">
              Wali Kelas: {currentTeacher}
            </div>
          </div>

          {/* Card 4: Catatan Ibu Guru */}
          <div className="card-tactile rounded-[24px] bg-[#FFD9C2] dark:bg-[#1F5254] p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border-2 border-[#12383A] flex items-center justify-center text-xl">
                💬
              </div>
              <div className="text-[12px] font-extrabold uppercase text-[#7A2E00] dark:text-[#FFF0C5]/70">
                Catatan Ibu Guru
              </div>
              <div className="text-xl font-extrabold text-[#7A2E00] dark:text-[#FFF0C5]">
                Sangat Aktif
              </div>
              <p className="text-[14px] text-[#7A2E00] dark:text-[#FFF0C5]/80">
                {selectedChild === 'Aisyah'
                  ? 'Aisyah sangat ceria bernyanyi lagu vokal di depan kelas.'
                  : 'Fajar teliti saat menghitung benda benda di sekitar.'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#7A2E00]/20 text-[12px] font-bold text-[#7A2E00] dark:text-[#FFF0C5]">
              Catatan tanggal 28 Oktober
            </div>
          </div>
        </div>
      </section>

      {/* Form Refleksi Orang Tua */}
      <section className="card-tactile rounded-[28px] bg-[#FFFAE6] dark:bg-[#163A3D] p-6 sm:p-8 space-y-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#CFEFEC] text-[#12383A] border-2 border-[#12383A] text-[13px] font-extrabold uppercase tracking-wider">
            Refleksi Rumah
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12383A] dark:text-[#FFF0C5] mt-2">
            Cerita Pembelajaran dari Rumah
          </h2>
          <p className="text-[16px] text-[#12383A]/80 dark:text-[#FFF0C5]/80 mt-1 max-w-2xl">
            Bagikan pengamatan Anda tentang kebiasaan belajar dan sikap {selectedChild} saat berada di rumah.
          </p>
        </div>

        <form onSubmit={handleReflectionSubmit} className="space-y-4">
          <div>
            <label className="block text-[15px] font-bold text-[#12383A] dark:text-[#FFF0C5] mb-1">
              Catatan Refleksi untuk {selectedChild} ({currentClass})
            </label>
            <div className="text-[13px] text-[#12383A]/70 dark:text-[#FFF0C5]/70 mb-2">
              Contoh: kemandirian membaca buku, waktu tidur, atau pertanyaan yang sering diajukan anak.
            </div>
            <textarea
              rows={4}
              value={reflectionText}
              onChange={(e) => {
                setReflectionText(e.target.value);
                if (reflectionError) setReflectionError('');
              }}
              placeholder="Tuliskan cerita perkembangan anak Anda di sini..."
              className="w-full p-4 rounded-[16px] border-2 border-[#12383A] dark:border-[#8AD6D1] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] text-[16px] font-medium outline-hidden"
            />
            {reflectionError && (
              <p className="text-[13px] font-bold text-[#BA1A1A] mt-1">
                {reflectionError}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-tactile px-8 py-3 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[16px] flex items-center gap-2 cursor-pointer"
            >
              <span>Kirim Refleksi</span>
              <span>📮</span>
            </button>
          </div>
        </form>

        {/* Previous Reflections */}
        <div className="pt-6 border-t-2 border-[#12383A]/15 dark:border-[#8AD6D1]/20 space-y-4">
          <h3 className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
            Riwayat Refleksi Rumah
          </h3>

          <div className="space-y-4">
            {childReflections.map((refl) => (
              <div
                key={refl.id}
                className="p-5 rounded-[20px] bg-[#FFFFFF] dark:bg-[#1F5254] border-2 border-[#12383A] dark:border-[#8AD6D1] shadow-[3px_3px_0_#12383A] space-y-3"
              >
                <div className="flex items-center justify-between text-[13px] font-bold text-[#9E430B] dark:text-[#8AD6D1]">
                  <span>Oleh: {refl.parentName}</span>
                  <span>{refl.date}</span>
                </div>
                <p className="text-[15px] text-[#12383A] dark:text-[#FFF0C5] leading-relaxed">
                  {refl.content}
                </p>

                {refl.teacherResponse && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-[#CFEFEC] text-[#12383A] border-2 border-[#12383A] text-[14px] ml-4">
                    <div className="font-extrabold text-[12px] uppercase text-[#12383A]/70 mb-1">
                      Tanggapan {currentTeacher}:
                    </div>
                    <div>{refl.teacherResponse}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ruang Penghubung: Message Thread */}
      <section className="card-tactile rounded-[28px] bg-[#FFFAE6] dark:bg-[#163A3D] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#8AD6D1] text-[#12383A] border-2 border-[#12383A] text-[13px] font-extrabold uppercase tracking-wider mb-2">
              Ruang Penghubung
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              Percakapan dengan {currentTeacher}
            </h2>
            <p className="text-[16px] text-[#12383A]/80 dark:text-[#FFF0C5]/80 mt-1">
              Saluran komunikasi langsung antara orang tua dan wali kelas {currentClass}.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#CFEFEC] text-[#12383A] border-2 border-[#12383A] text-[12px] font-bold">
            Pesan Terbuka
          </span>
        </div>

        {/* Message Thread Container */}
        <div className="p-4 sm:p-6 rounded-[24px] bg-[#FFF0C5] dark:bg-[#0E2A2C] border-2 border-[#12383A] dark:border-[#8AD6D1] space-y-4 max-h-[420px] overflow-y-auto">
          {messages.map((msg) => {
            const isParent = msg.senderRole === 'orangtua';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isParent ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-[20px] border-2 border-[#12383A] dark:border-[#8AD6D1] shadow-[3px_3px_0_#12383A] ${
                    isParent
                      ? 'bg-[#FFFAE6] text-[#12383A]'
                      : 'bg-[#CFEFEC] text-[#12383A] ml-6'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 text-[12px] font-extrabold mb-1.5 opacity-80">
                    <span>{msg.senderName}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="text-[15px] font-medium leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Send message form */}
        <form onSubmit={handleSendMessage} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => {
                setChatInput(e.target.value);
                if (chatError) setChatError('');
              }}
              placeholder={`Tulis pesan Anda untuk ${currentTeacher}...`}
              className="input-tactile flex-1 px-4 text-[16px] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] outline-hidden"
            />
            <button
              type="submit"
              className="btn-tactile px-8 py-3 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[16px] flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Kirim Pesan</span>
              <span>💬</span>
            </button>
          </div>
          {chatError && (
            <p className="text-[13px] font-bold text-[#BA1A1A]">
              {chatError}
            </p>
          )}
        </form>
      </section>
    </div>
  );
};
