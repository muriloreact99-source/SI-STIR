import React, { useState } from 'react';
import {
  ModulAjar,
  StudentTask,
  CommunicationMessage,
  UserRole,
} from '../types/index.ts';
import { StatusChip } from '../components/StatusChip.tsx';
import { RoleGateCard } from '../components/RoleGateCard.tsx';

interface RuangGuruViewProps {
  currentRole: UserRole;
  onOpenLogin: () => void;
  modulList: ModulAjar[];
  onAddModul: (title: string, subject: string, notes: string) => void;
  onSubmitModulForReview: (id: string) => void;
  tasks: StudentTask[];
  onReviewTask: (id: string, status: 'Sudah diperiksa' | 'Perlu diperbaiki', feedback: string) => void;
  messages: CommunicationMessage[];
  onSendMessage: (senderName: string, text: string) => void;
  showToast: (msg: string) => void;
}

export const RuangGuruView: React.FC<RuangGuruViewProps> = ({
  currentRole,
  onOpenLogin,
  modulList,
  onAddModul,
  onSubmitModulForReview,
  tasks,
  onReviewTask,
  messages,
  onSendMessage,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<'modul' | 'tugas' | 'jurnal' | 'pesan'>('modul');
  const [isAddingModul, setIsAddingModul] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newSubject, setNewSubject] = useState<string>('Bahasa Indonesia');
  const [newNotes, setNewNotes] = useState<string>('');
  const [modulError, setModulError] = useState<string>('');

  const [reviewingTask, setReviewingTask] = useState<StudentTask | null>(null);
  const [reviewFeedback, setReviewFeedback] = useState<string>('');
  const [reviewStatus, setReviewStatus] = useState<'Sudah diperiksa' | 'Perlu diperbaiki'>('Sudah diperiksa');

  const [journalContent, setJournalContent] = useState<string>('Hari ini murid kelas 1 belajar melafalkan huruf vokal dengan irama lagu daerah. Semua 24 murid aktif berlatih dan suasana kelas sangat kondusif.');
  const [teacherChatInput, setTeacherChatInput] = useState<string>('');

  // Gate check: only guru and kepalasekolah can access
  if (currentRole !== 'guru' && currentRole !== 'kepalasekolah') {
    return (
      <RoleGateCard
        roomName="Ruang Guru"
        allowedRoleLabel="Ibu Guru SDN 03 Wonosari dan Kepala Sekolah"
        onOpenLogin={onOpenLogin}
      />
    );
  }

  const teacherModul = modulList.filter((m) => m.teacherName === 'Ibu Darmiati, S.Pd');

  const handleCreateModul = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setModulError('Kolom ini belum diisi.');
      return;
    }
    onAddModul(newTitle, newSubject, newNotes);
    showToast('Modul ajar baru berhasil disimpan dalam status Draf');
    setIsAddingModul(false);
    setNewTitle('');
    setNewNotes('');
    setModulError('');
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewFeedback.trim()) {
      showToast('Mohon berikan catatan untuk murid');
      return;
    }
    if (reviewingTask) {
      onReviewTask(reviewingTask.id, reviewStatus, reviewFeedback);
      showToast('Pemeriksaan tugas murid berhasil diperbarui');
      setReviewingTask(null);
      setReviewFeedback('');
    }
  };

  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Jurnal harian kelas berhasil disimpan ke buku catatan sekolah');
  };

  const handleSendTeacherMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherChatInput.trim()) return;
    onSendMessage('Ibu Darmiati, S.Pd (Wali Kelas 1)', teacherChatInput);
    showToast('Balasan Anda telah terkirim kepada orang tua');
    setTeacherChatInput('');
  };

  return (
    <div className="space-y-8">
      {/* Calmer Tidier Hero Card */}
      <section className="card-tactile rounded-[28px] bg-[#FFFAE6] dark:bg-[#163A3D] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8AD6D1] text-[#12383A] border-2 border-[#12383A] text-[13px] font-extrabold uppercase tracking-wider">
              <span>👩‍🏫</span>
              <span>Tumbuh Bersama</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              Ruang Guru: Ibu Darmiati, S.Pd
            </h1>
            <p className="text-[16px] text-[#12383A]/85 dark:text-[#FFF0C5]/85">
              Wali Kelas 1 SDN 03 Wonosari. Kelola perencanaan modul ajar, periksa tugas murid, dan jalin komunikasi dengan orang tua.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-[#CFEFEC] text-[#12383A] border-2 border-[#12383A] font-extrabold text-[14px] shadow-[2px_2px_0_#12383A]">
              24 Murid Kelas 1
            </div>
          </div>
        </div>
      </section>

      {/* Pill Tabs with active deep teal + cream text */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2" role="tablist">
        {[
          { id: 'modul', label: 'Modul Ajar', count: teacherModul.length },
          { id: 'tugas', label: 'Periksa Tugas Murid', count: tasks.length },
          { id: 'jurnal', label: 'Jurnal Kelas dan Absen' },
          { id: 'pesan', label: 'Ruang Penghubung', count: messages.length },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-2.5 rounded-full font-bold text-[15px] border-2 border-[#12383A] dark:border-[#8AD6D1] flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
                isActive
                  ? 'bg-[#12383A] text-[#FFF0C5] shadow-[3px_3px_0_#FF8C52]'
                  : 'bg-[#FFFAE6] dark:bg-[#163A3D] text-[#12383A] dark:text-[#FFF0C5] hover:bg-[#8AD6D1]/40'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[12px] font-extrabold border ${
                    isActive
                      ? 'bg-[#FF8C52] text-[#12383A] border-[#12383A]'
                      : 'bg-[#CFEFEC] text-[#12383A] border-[#12383A]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content 1: Modul Ajar */}
      {activeTab === 'modul' && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                Daftar Modul Ajar Kelas 1
              </h2>
              <p className="text-[15px] text-[#12383A]/80 dark:text-[#FFF0C5]/80">
                Ajukan modul ajar kepada Kepala Sekolah untuk proses supervisi dan validasi berkala.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsAddingModul(true);
                setModulError('');
              }}
              className="btn-tactile px-6 py-3 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[15px] flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Unggah Modul Baru</span>
              <span>➕</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {teacherModul.map((modul) => (
              <div
                key={modul.id}
                className="card-tactile rounded-[24px] bg-[#FFFAE6] dark:bg-[#163A3D] p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[13px] font-extrabold text-[#9E430B] dark:text-[#8AD6D1] uppercase">
                      {modul.subject}
                    </span>
                    <StatusChip status={modul.status} />
                  </div>

                  <h3 className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                    {modul.title}
                  </h3>

                  <div className="text-[14px] text-[#12383A]/80 dark:text-[#FFF0C5]/80">
                    <p>
                      <span className="font-bold">Tanggal unggah:</span> {modul.submittedDate}
                    </p>
                    {modul.notes && (
                      <p className="mt-1">
                        <span className="font-bold">Keterangan:</span> {modul.notes}
                      </p>
                    )}
                  </div>

                  {modul.supervisorNote && (
                    <div className="p-3 rounded-2xl bg-[#CDEFD0] text-[#174D1F] border border-[#12383A] text-[14px]">
                      <div className="font-extrabold text-[12px] uppercase">
                        Catatan Kepala Sekolah (Ibu Khoyum Supardi):
                      </div>
                      <div className="mt-0.5">{modul.supervisorNote}</div>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t-2 border-[#12383A]/15 dark:border-[#8AD6D1]/20 flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[12px] font-bold text-[#12383A]/60 dark:text-[#FFF0C5]/60">
                    SDN 03 Wonosari
                  </span>

                  {modul.status === 'Draf' && (
                    <button
                      type="button"
                      onClick={() => {
                        onSubmitModulForReview(modul.id);
                        showToast('Modul berhasil diajukan kepada Ibu Kepala Sekolah');
                      }}
                      className="btn-tactile px-5 py-2 rounded-full bg-[#CFEFEC] text-[#12383A] font-bold text-[14px] cursor-pointer"
                    >
                      Ajukan ke Kepala Sekolah
                    </button>
                  )}

                  {modul.status === 'Perlu revisi' && (
                    <button
                      type="button"
                      onClick={() => {
                        onSubmitModulForReview(modul.id);
                        showToast('Revisi modul telah diajukan kembali ke Kepala Sekolah');
                      }}
                      className="btn-tactile px-5 py-2 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[14px] cursor-pointer"
                    >
                      Kirim Perbaikan
                    </button>
                  )}

                  {modul.status === 'Disetujui' && (
                    <span className="text-[13px] font-bold text-[#174D1F]">
                      Siap Dipakai Mengajar
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab Content 2: Periksa Tugas Murid */}
      {activeTab === 'tugas' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              Periksa Hasil Kerja Murid
            </h2>
            <p className="text-[15px] text-[#12383A]/80 dark:text-[#FFF0C5]/80">
              Berikan catatan apresiasi atau panduan perbaikan untuk setiap tugas yang diserahkan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="card-tactile rounded-[24px] bg-[#FFFAE6] dark:bg-[#163A3D] p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[13px] font-extrabold text-[#9E430B] dark:text-[#8AD6D1] uppercase">
                      {task.className} • {task.subject}
                    </span>
                    <StatusChip status={task.status} />
                  </div>

                  <h3 className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                    {task.title}
                  </h3>

                  <div className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#1F5254] border border-[#12383A] space-y-1 text-[14px]">
                    <p>
                      <span className="font-bold text-[#12383A] dark:text-[#FFF0C5]">Nama Murid:</span>{' '}
                      <span className="text-[#9E430B] font-extrabold">{task.studentName}</span>
                    </p>
                    <p>
                      <span className="font-bold text-[#12383A] dark:text-[#FFF0C5]">Keterangan:</span>{' '}
                      <span className="text-[#12383A]/85 dark:text-[#FFF0C5]/85">
                        {task.submissionNote || 'Belum ada catatan murid'}
                      </span>
                    </p>
                  </div>

                  {task.teacherFeedback && (
                    <div className="p-3 rounded-2xl bg-[#CFEFEC] text-[#12383A] border border-[#12383A] text-[14px]">
                      <span className="font-bold">Masukan Guru:</span> {task.teacherFeedback}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t-2 border-[#12383A]/15 dark:border-[#8AD6D1]/20 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setReviewingTask(task);
                      setReviewFeedback(task.teacherFeedback || '');
                      setReviewStatus(task.status === 'Perlu diperbaiki' ? 'Perlu diperbaiki' : 'Sudah diperiksa');
                    }}
                    className="btn-tactile px-5 py-2.5 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[14px] flex items-center gap-2 cursor-pointer"
                  >
                    <span>Periksa dan Beri Nilai</span>
                    <span>✍️</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab Content 3: Jurnal Kelas dan Absen */}
      {activeTab === 'jurnal' && (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card-tactile rounded-[28px] bg-[#FFFAE6] dark:bg-[#163A3D] p-6 sm:p-8 space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#CFEFEC] text-[#12383A] border-2 border-[#12383A] text-[13px] font-extrabold uppercase tracking-wider">
                Buku Jurnal
              </span>
              <h2 className="text-2xl font-extrabold text-[#12383A] dark:text-[#FFF0C5] mt-2">
                Catatan Harian Mengajar Kelas 1
              </h2>
              <p className="text-[15px] text-[#12383A]/80 dark:text-[#FFF0C5]/80 mt-1">
                Dokumentasikan suasana pembelajaran dan materi ajar untuk supervisi Kepala Sekolah.
              </p>
            </div>

            <form onSubmit={handleSaveJournal} className="space-y-4">
              <div>
                <label className="block text-[15px] font-bold text-[#12383A] dark:text-[#FFF0C5] mb-1">
                  Isi Jurnal Pembelajaran Hari Ini
                </label>
                <textarea
                  rows={5}
                  value={journalContent}
                  onChange={(e) => setJournalContent(e.target.value)}
                  className="w-full p-4 rounded-[16px] border-2 border-[#12383A] dark:border-[#8AD6D1] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] text-[16px] font-medium outline-hidden"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn-tactile px-8 py-3 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[16px] cursor-pointer"
                >
                  Simpan Jurnal Kelas
                </button>
              </div>
            </form>
          </div>

          {/* Rekap Absen Kelas 1 */}
          <div className="card-tactile rounded-[28px] bg-[#CFEFEC] dark:bg-[#163A3D] p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0C5] border-2 border-[#12383A] flex items-center justify-center text-xl">
              📊
            </div>
            <h3 className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              Rekap Kehadiran Kelas 1
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#1F5254] border-2 border-[#12383A] dark:border-[#8AD6D1] flex justify-between items-center">
                <span className="font-bold text-[#12383A] dark:text-[#FFF0C5]">Hadir Tepat Waktu</span>
                <span className="font-extrabold text-xl text-[#174D1F]">24 Murid</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#1F5254] border-2 border-[#12383A] dark:border-[#8AD6D1] flex justify-between items-center">
                <span className="font-bold text-[#12383A] dark:text-[#FFF0C5]">Izin atau Sakit</span>
                <span className="font-extrabold text-xl text-[#9E430B]">0 Murid</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#1F5254] border-2 border-[#12383A] dark:border-[#8AD6D1] flex justify-between items-center">
                <span className="font-bold text-[#12383A] dark:text-[#FFF0C5]">Persentase Kehadiran</span>
                <span className="font-extrabold text-xl text-[#12383A] dark:text-[#FFF0C5]">100%</span>
              </div>
            </div>
            <p className="text-[13px] text-[#12383A]/70 dark:text-[#FFF0C5]/70 pt-2">
              Absensi diverifikasi otomatis saat murid menekan tombol Aku Hadir atau dikonfirmasi orang tua.
            </p>
          </div>
        </section>
      )}

      {/* Tab Content 4: Ruang Penghubung */}
      {activeTab === 'pesan' && (
        <section className="card-tactile rounded-[28px] bg-[#FFFAE6] dark:bg-[#163A3D] p-6 sm:p-8 space-y-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-[#8AD6D1] text-[#12383A] border-2 border-[#12383A] text-[13px] font-extrabold uppercase tracking-wider">
              Ruang Penghubung
            </span>
            <h2 className="text-2xl font-extrabold text-[#12383A] dark:text-[#FFF0C5] mt-2">
              Pesan Masuk dari Orang Tua Murid
            </h2>
            <p className="text-[15px] text-[#12383A]/80 dark:text-[#FFF0C5]/80 mt-1">
              Menjaga keterbukaan informasi dan kemitraan mendalam bersama para orang tua di rumah.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-[24px] bg-[#FFF0C5] dark:bg-[#0E2A2C] border-2 border-[#12383A] dark:border-[#8AD6D1] space-y-4 max-h-[380px] overflow-y-auto">
            {messages.map((msg) => {
              const isTeacher = msg.senderRole === 'guru';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isTeacher ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-[20px] border-2 border-[#12383A] dark:border-[#8AD6D1] shadow-[3px_3px_0_#12383A] ${
                      isTeacher
                        ? 'bg-[#CFEFEC] text-[#12383A] ml-6'
                        : 'bg-[#FFFAE6] text-[#12383A]'
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

          <form onSubmit={handleSendTeacherMessage} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={teacherChatInput}
              onChange={(e) => setTeacherChatInput(e.target.value)}
              placeholder="Tulis balasan untuk Ibu Rina atau orang tua murid..."
              className="input-tactile flex-1 px-4 text-[16px] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] outline-hidden"
            />
            <button
              type="submit"
              className="btn-tactile px-8 py-3 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[16px] flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Kirim Balasan</span>
              <span>💬</span>
            </button>
          </form>
        </section>
      )}

      {/* Modal Unggah Modul Baru */}
      {isAddingModul && (
        <div className="fixed inset-0 z-50 bg-[#12383A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#FFFAE6] dark:bg-[#163A3D] rounded-[28px] border-2 border-[#12383A] dark:border-[#8AD6D1] shadow-[6px_6px_0_#12383A] dark:shadow-[6px_6px_0_#04171A] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4 border-b-2 border-[#12383A]/20 pb-3">
              <div>
                <span className="text-[12px] font-extrabold uppercase text-[#9E430B] dark:text-[#8AD6D1]">
                  Modul Ajar
                </span>
                <h3 className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                  Unggah Modul Baru
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingModul(false)}
                className="w-9 h-9 rounded-full bg-[#FF8C52] text-[#12383A] font-bold border-2 border-[#12383A] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateModul} className="space-y-4">
              <div>
                <label className="block text-[15px] font-bold text-[#12383A] dark:text-[#FFF0C5] mb-1">
                  Mata Pelajaran
                </label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="input-tactile w-full px-4 text-[16px] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] outline-hidden cursor-pointer"
                >
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Pendidikan Pancasila">Pendidikan Pancasila</option>
                  <option value="Seni Budaya">Seni Budaya</option>
                  <option value="Pendidikan Jasmani">Pendidikan Jasmani</option>
                </select>
              </div>

              <div>
                <label className="block text-[15px] font-bold text-[#12383A] dark:text-[#FFF0C5] mb-1">
                  Judul Modul Ajar
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                    if (modulError) setModulError('');
                  }}
                  placeholder="Contoh: Modul Ajar Membaca Suku Kata Terbuka"
                  className="input-tactile w-full px-4 text-[16px] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] outline-hidden"
                />
                {modulError && (
                  <p className="text-[13px] font-bold text-[#BA1A1A] mt-1">
                    {modulError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[15px] font-bold text-[#12383A] dark:text-[#FFF0C5] mb-1">
                  Ringkasan Alur dan Tujuan Pembelajaran
                </label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Jelaskan ringkas metode ajar dan tujuan pembelajaran..."
                  className="w-full p-3.5 rounded-[16px] border-2 border-[#12383A] dark:border-[#8AD6D1] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] text-[16px] font-medium outline-hidden"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingModul(false)}
                  className="btn-tactile px-5 py-2.5 rounded-full bg-[#FFFFFF] text-[#12383A] font-bold text-[15px] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-tactile px-6 py-2.5 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[15px] cursor-pointer"
                >
                  Simpan Modul
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Review Tugas */}
      {reviewingTask && (
        <div className="fixed inset-0 z-50 bg-[#12383A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#FFFAE6] dark:bg-[#163A3D] rounded-[28px] border-2 border-[#12383A] dark:border-[#8AD6D1] shadow-[6px_6px_0_#12383A] dark:shadow-[6px_6px_0_#04171A] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4 border-b-2 border-[#12383A]/20 pb-3">
              <div>
                <span className="text-[12px] font-extrabold uppercase text-[#9E430B] dark:text-[#8AD6D1]">
                  Pemeriksaan Tugas
                </span>
                <h3 className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                  {reviewingTask.studentName} • {reviewingTask.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setReviewingTask(null)}
                className="w-9 h-9 rounded-full bg-[#FF8C52] text-[#12383A] font-bold border-2 border-[#12383A] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4">
              <div>
                <label className="block text-[15px] font-bold text-[#12383A] dark:text-[#FFF0C5] mb-1">
                  Keputusan Penilaian
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setReviewStatus('Sudah diperiksa')}
                    className={`flex-1 py-2.5 rounded-full font-bold text-[14px] border-2 border-[#12383A] cursor-pointer ${
                      reviewStatus === 'Sudah diperiksa'
                        ? 'bg-[#CDEFD0] text-[#174D1F] shadow-[2px_2px_0_#12383A]'
                        : 'bg-[#FFFFFF] text-[#12383A]'
                    }`}
                  >
                    Sudah diperiksa
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewStatus('Perlu diperbaiki')}
                    className={`flex-1 py-2.5 rounded-full font-bold text-[14px] border-2 border-[#12383A] cursor-pointer ${
                      reviewStatus === 'Perlu diperbaiki'
                        ? 'bg-[#FFD9C2] text-[#7A2E00] shadow-[2px_2px_0_#12383A]'
                        : 'bg-[#FFFFFF] text-[#12383A]'
                    }`}
                  >
                    Perlu diperbaiki
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[15px] font-bold text-[#12383A] dark:text-[#FFF0C5] mb-1">
                  Catatan Umpan Balik Guru
                </label>
                <textarea
                  rows={4}
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                  placeholder="Berikan apresiasi atau arahan spesifik untuk anak..."
                  className="w-full p-3.5 rounded-[16px] border-2 border-[#12383A] dark:border-[#8AD6D1] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] text-[16px] font-medium outline-hidden"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setReviewingTask(null)}
                  className="btn-tactile px-5 py-2.5 rounded-full bg-[#FFFFFF] text-[#12383A] font-bold text-[15px] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-tactile px-6 py-2.5 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[15px] cursor-pointer"
                >
                  Simpan Nilai
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
