import React, { useState } from 'react';
import { HabitItem, StudentTask, StudentArtwork, UserRole } from '../types/index.ts';
import { StatusChip } from '../components/StatusChip.tsx';
import { RoleGateCard } from '../components/RoleGateCard.tsx';

interface RuangMuridViewProps {
  currentRole: UserRole;
  onOpenLogin: () => void;
  habits: HabitItem[];
  onToggleHabit: (id: string) => void;
  tasks: StudentTask[];
  onTaskSubmit: (taskId: string, note: string) => void;
  artworks: StudentArtwork[];
  onAddArtwork: (title: string, category: string, desc: string, emoji: string) => void;
  onLikeArtwork: (id: string) => void;
  showToast: (msg: string) => void;
}

export const RuangMuridView: React.FC<RuangMuridViewProps> = ({
  currentRole,
  onOpenLogin,
  habits,
  onToggleHabit,
  tasks,
  onTaskSubmit,
  artworks,
  onAddArtwork,
  onLikeArtwork,
  showToast,
}) => {
  // Gate check: only murid and kepalasekolah can access
  if (currentRole !== 'murid' && currentRole !== 'kepalasekolah') {
    return (
      <RoleGateCard
        roomName="Ruang Murid"
        allowedRoleLabel="Murid SDN 03 Wonosari dan Kepala Sekolah"
        onOpenLogin={onOpenLogin}
      />
    );
  }

  const [hasAttended, setHasAttended] = useState<boolean>(true);
  const [activeTaskFilter, setActiveTaskFilter] = useState<string>('Semua');
  const [submittingTask, setSubmittingTask] = useState<StudentTask | null>(null);
  const [submissionNote, setSubmissionNote] = useState<string>('');
  const [isAddingArtwork, setIsAddingArtwork] = useState<boolean>(false);
  const [newArtTitle, setNewArtTitle] = useState<string>('');
  const [newArtCategory, setNewArtCategory] = useState<string>('Gambar Crayon');
  const [newArtDesc, setNewArtDesc] = useState<string>('');
  const [newArtEmoji, setNewArtEmoji] = useState<string>('🎨');
  const [formError, setFormError] = useState<string>('');

  const completedCount = habits.filter((h) => h.completed).length;
  const progressPercent = Math.round((completedCount / habits.length) * 100);

  const getProgressMessage = (count: number) => {
    if (count === 7) return 'Luar biasa! Semua 7 kebiasaan hebat sudah kamu selesaikan.';
    if (count >= 5) return `${count} dari 7 selesai. Sedikit lagi!`;
    if (count >= 3) return `${count} dari 7 selesai. Ayo terus semangat!`;
    return `${count} dari 7 selesai. Awali hari dengan kebiasaan baik!`;
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeTaskFilter === 'Semua') return true;
    return t.status === activeTaskFilter;
  });

  const handleAttend = () => {
    setHasAttended(true);
    showToast('Kamu sudah hadir hari ini pukul 06.45 WITA');
  };

  const handleOpenSubmit = (task: StudentTask) => {
    setSubmittingTask(task);
    setSubmissionNote(task.submissionNote || '');
    setFormError('');
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionNote.trim()) {
      setFormError('Kolom ini belum diisi.');
      return;
    }
    if (submittingTask) {
      onTaskSubmit(submittingTask.id, submissionNote);
      showToast('Tugas berhasil kamu kumpulkan kepada Ibu Guru');
      setSubmittingTask(null);
      setSubmissionNote('');
    }
  };

  const handleConfirmArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtTitle.trim() || !newArtDesc.trim()) {
      setFormError('Kolom ini belum diisi.');
      return;
    }
    onAddArtwork(newArtTitle, newArtCategory, newArtDesc, newArtEmoji);
    showToast('Karya baru kamu sudah berhasil dipajang di galeri');
    setIsAddingArtwork(false);
    setNewArtTitle('');
    setNewArtDesc('');
  };

  return (
    <div className="space-y-10">
      {/* Cheerful Mint Hero Card */}
      <section className="card-tactile rounded-[28px] bg-[#8AD6D1] p-6 sm:p-10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF0C5] text-[#12383A] border-2 border-[#12383A] text-[13px] font-extrabold uppercase tracking-wider">
              <span>🎒</span>
              <span>Tumbuh Bersama</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#12383A] leading-tight">
              Halo, Aisyah! Selamat Datang di Ruang Murid
            </h1>

            <p className="text-[17px] font-medium text-[#12383A] leading-relaxed">
              Kamu murid Kelas 1 di SDN 03 Wonosari. Hari ini saat yang tepat untuk belajar hal baru dan merawat kebiasaan hebat.
            </p>
          </div>

          {/* Large Emoji Sticker (40px icon) & Absen Button */}
          <div className="p-4 rounded-[24px] bg-[#FFFAE6] border-2 border-[#12383A] shadow-[4px_4px_0_#12383A] text-center w-full md:w-auto shrink-0 space-y-3">
            <div className="text-[40px] leading-none" role="img" aria-label="Bintang Senyum">
              🌟
            </div>
            <div>
              <div className="text-[12px] font-extrabold uppercase text-[#9E430B]">
                Absen Mandiri
              </div>
              <div className="text-[14px] font-bold text-[#12383A]">
                {hasAttended ? 'Sudah Tercatat' : 'Belum Absen'}
              </div>
            </div>
            {hasAttended ? (
              <div className="px-4 py-2 rounded-full bg-[#CDEFD0] text-[#174D1F] border-2 border-[#12383A] text-[14px] font-bold flex items-center justify-center gap-1.5">
                <span>✓</span>
                <span>Kamu Sudah Hadir</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAttend}
                className="btn-tactile w-full min-h-[48px] px-6 py-2.5 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[16px] cursor-pointer"
              >
                Aku Hadir
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 7 Kebiasaan Anak Indonesia Hebat Section */}
      <section className="card-tactile rounded-[28px] bg-[#FFFAE6] dark:bg-[#163A3D] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#CFEFEC] text-[#12383A] border-2 border-[#12383A] text-[13px] font-extrabold uppercase tracking-wider mb-2">
              Jurnal Harian
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              7 Kebiasaan Anak Indonesia Hebat
            </h2>
            <p className="text-[16px] text-[#12383A]/80 dark:text-[#FFF0C5]/80 mt-1">
              Sentuh kotak untuk mencentang kebiasaan yang sudah kamu lakukan hari ini.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#FFF0C5] text-[#12383A] border-2 border-[#12383A] text-[12px] font-bold">
            Data contoh
          </span>
        </div>

        {/* Big Progress Bar: 16px tall pill, orange fill */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-[#FFFFFF] dark:bg-[#1F5254] rounded-full border-2 border-[#12383A] dark:border-[#8AD6D1] overflow-hidden p-0.5 shadow-[2px_2px_0_#12383A]">
            <div
              className="h-full bg-[#FF8C52] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between font-bold text-[15px] text-[#12383A] dark:text-[#FFF0C5]">
            <span>{getProgressMessage(completedCount)}</span>
            <span className="text-[#9E430B] dark:text-[#8AD6D1]">{progressPercent}%</span>
          </div>
        </div>

        {/* Checklist Rows: minimum 56px tall, large square checkbox, bold label with helper line */}
        <div className="space-y-3">
          {habits.map((habit) => {
            const isDone = habit.completed;
            return (
              <div
                key={habit.id}
                onClick={() => {
                  onToggleHabit(habit.id);
                  showToast(isDone ? 'Kebiasaan ditandai belum selesai' : 'Hebat! Satu kebiasaan berhasil dicapai');
                }}
                className={`min-h-[56px] p-4 rounded-[20px] border-2 border-[#12383A] dark:border-[#8AD6D1] flex items-center gap-4 cursor-pointer transition-all ${
                  isDone
                    ? 'bg-[#CDEFD0] dark:bg-[#174D1F]/50 shadow-[3px_3px_0_#12383A]'
                    : 'bg-[#FFFFFF] dark:bg-[#1F5254] shadow-[3px_3px_0_#12383A] hover:bg-[#FFF0C5]/40'
                }`}
              >
                {/* Large square checkbox */}
                <div
                  className={`w-8 h-8 rounded-lg border-2 border-[#12383A] dark:border-[#8AD6D1] flex items-center justify-center text-xl shrink-0 ${
                    isDone ? 'bg-[#FF8C52] text-[#12383A]' : 'bg-[#FFFFFF]'
                  }`}
                  aria-label={isDone ? 'Selesai' : 'Belum selesai'}
                >
                  {isDone ? '✓' : ''}
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className={`font-extrabold text-[17px] ${
                      isDone
                        ? 'text-[#174D1F] dark:text-[#CDEFD0]'
                        : 'text-[#12383A] dark:text-[#FFF0C5]'
                    }`}
                  >
                    {habit.title}
                  </div>
                  <div className="text-[14px] font-medium text-[#12383A]/75 dark:text-[#FFF0C5]/75 truncate">
                    {habit.helper}
                  </div>
                </div>

                <span className="text-xl">
                  {isDone ? '⭐' : '🌱'}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tugas Belajar Murid Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[13px] font-extrabold uppercase tracking-wider text-[#9E430B] dark:text-[#8AD6D1]">
              Aktivitas Kelas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              Daftar Tugas Belajar Kamu
            </h2>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {['Semua', 'Belum dikerjakan', 'Sudah dikirim', 'Sudah diperiksa', 'Perlu diperbaiki'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setActiveTaskFilter(st)}
                className={`px-3 py-1.5 rounded-full border-2 border-[#12383A] dark:border-[#8AD6D1] text-[13px] font-bold cursor-pointer transition-all ${
                  activeTaskFilter === st
                    ? 'bg-[#12383A] text-[#FFF0C5] shadow-[2px_2px_0_#FF8C52]'
                    : 'bg-[#FFFAE6] dark:bg-[#163A3D] text-[#12383A] dark:text-[#FFF0C5]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="card-tactile rounded-[24px] bg-[#FFFAE6] dark:bg-[#163A3D] p-6 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[13px] font-extrabold text-[#9E430B] uppercase">
                    {task.subject}
                  </span>
                  <StatusChip status={task.status} />
                </div>

                <h3 className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                  {task.title}
                </h3>

                <div className="space-y-1 text-[14px] text-[#12383A]/80 dark:text-[#FFF0C5]/80">
                  <p>
                    <span className="font-bold">Guru:</span> {task.teacherName}
                  </p>
                  <p>
                    <span className="font-bold">Batas waktu:</span> {task.dueDate}
                  </p>
                </div>

                {task.submissionNote && (
                  <div className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#1F5254] border border-[#12383A] text-[14px]">
                    <span className="font-bold text-[#12383A] dark:text-[#FFF0C5]">Catatan kamu:</span>{' '}
                    <span className="text-[#12383A]/85 dark:text-[#FFF0C5]/85">{task.submissionNote}</span>
                  </div>
                )}

                {task.teacherFeedback && (
                  <div className="p-3 rounded-2xl bg-[#CFEFEC] text-[#12383A] border border-[#12383A] text-[14px]">
                    <span className="font-bold">Umpan balik Ibu Guru:</span> {task.teacherFeedback}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t-2 border-[#12383A]/15 dark:border-[#8AD6D1]/20 flex justify-end">
                {task.status === 'Belum dikerjakan' || task.status === 'Perlu diperbaiki' ? (
                  <button
                    type="button"
                    onClick={() => handleOpenSubmit(task)}
                    className="btn-tactile px-5 py-2.5 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[15px] flex items-center gap-2 cursor-pointer"
                  >
                    <span>Kumpulkan Tugas</span>
                    <span>📝</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleOpenSubmit(task)}
                    className="btn-tactile px-5 py-2.5 rounded-full bg-[#FFFFFF] text-[#12383A] font-bold text-[14px] cursor-pointer"
                  >
                    Perbarui Jawaban
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Galeri Karya Murid */}
      <section className="card-tactile rounded-[28px] bg-[#CFEFEC] dark:bg-[#163A3D] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#FFF0C5] text-[#12383A] border-2 border-[#12383A] text-[13px] font-extrabold uppercase tracking-wider mb-2">
              Pojok Kreatif
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              Galeri Karya Murid Wonosari
            </h2>
            <p className="text-[16px] text-[#12383A]/80 dark:text-[#FFF0C5]/80 mt-1">
              Setiap goresan gambar dan hasil kerajinan tangan murid adalah prestasi.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsAddingArtwork(true);
              setFormError('');
            }}
            className="btn-tactile px-6 py-3 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[15px] flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Tambah Karya</span>
            <span>🎨</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {artworks.map((art) => (
            <div
              key={art.id}
              className="card-tactile rounded-[24px] bg-[#FFFAE6] dark:bg-[#1F5254] p-5 flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-[#FFFFFF] border-2 border-[#12383A] flex items-center justify-center text-4xl shadow-[2px_2px_0_#12383A]">
                  {art.emoji}
                </div>
                <div className="text-[12px] font-extrabold uppercase text-[#9E430B] dark:text-[#8AD6D1] text-center mb-1">
                  {art.category}
                </div>
                <h4 className="text-lg font-extrabold text-[#12383A] dark:text-[#FFF0C5] text-center mb-1">
                  {art.title}
                </h4>
                <div className="text-[13px] font-bold text-[#12383A]/70 dark:text-[#FFF0C5]/70 text-center mb-3">
                  {art.studentName} ({art.className})
                </div>
                <p className="text-[14px] text-[#12383A]/85 dark:text-[#FFF0C5]/85 leading-relaxed">
                  {art.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-[#12383A]/15 dark:border-[#8AD6D1]/20 flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#12383A]/60 dark:text-[#FFF0C5]/60">
                  {art.date}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onLikeArtwork(art.id);
                    showToast('Kamu memberi jempol bintang pada karya ini');
                  }}
                  className="btn-tactile px-3.5 py-1.5 rounded-full bg-[#FFF0C5] text-[#12383A] font-bold text-[13px] flex items-center gap-1.5 cursor-pointer"
                >
                  <span>⭐</span>
                  <span>{art.likes} Bintang</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Kumpulkan Tugas */}
      {submittingTask && (
        <div className="fixed inset-0 z-50 bg-[#12383A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#FFFAE6] dark:bg-[#163A3D] rounded-[28px] border-2 border-[#12383A] dark:border-[#8AD6D1] shadow-[6px_6px_0_#12383A] dark:shadow-[6px_6px_0_#04171A] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4 border-b-2 border-[#12383A]/20 pb-3">
              <div>
                <span className="text-[12px] font-extrabold uppercase text-[#9E430B] dark:text-[#8AD6D1]">
                  Kumpulkan Tugas Belajar
                </span>
                <h3 className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                  {submittingTask.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSubmittingTask(null)}
                className="w-9 h-9 rounded-full bg-[#FF8C52] text-[#12383A] font-bold border-2 border-[#12383A] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmSubmit} className="space-y-4">
              <div>
                <label className="block text-[15px] font-bold text-[#12383A] dark:text-[#FFF0C5] mb-1">
                  Catatan Pengumpulan Tugas
                </label>
                <div className="text-[13px] text-[#12383A]/70 dark:text-[#FFF0C5]/70 mb-2">
                  Ceritakan hasil pengerjaan tugas kamu kepada Ibu Guru.
                </div>
                <textarea
                  rows={4}
                  value={submissionNote}
                  onChange={(e) => {
                    setSubmissionNote(e.target.value);
                    if (formError) setFormError('');
                  }}
                  placeholder="Tuliskan jawaban atau keterangan tugas di sini..."
                  className="w-full p-3.5 rounded-[16px] border-2 border-[#12383A] dark:border-[#8AD6D1] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] text-[16px] font-medium outline-hidden"
                />
                {formError && (
                  <p className="text-[13px] font-bold text-[#BA1A1A] mt-1">
                    {formError}
                  </p>
                )}
              </div>

              <div className="p-3 rounded-2xl bg-[#CFEFEC] border border-[#12383A] text-[14px] text-[#12383A] flex items-center gap-2">
                <span>📎</span>
                <span>Foto buku latihan sudah terhubung dari ponsel orang tua</span>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSubmittingTask(null)}
                  className="btn-tactile px-5 py-2.5 rounded-full bg-[#FFFFFF] text-[#12383A] font-bold text-[15px] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-tactile px-6 py-2.5 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[15px] cursor-pointer"
                >
                  Kirim Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Karya */}
      {isAddingArtwork && (
        <div className="fixed inset-0 z-50 bg-[#12383A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#FFFAE6] dark:bg-[#163A3D] rounded-[28px] border-2 border-[#12383A] dark:border-[#8AD6D1] shadow-[6px_6px_0_#12383A] dark:shadow-[6px_6px_0_#04171A] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4 border-b-2 border-[#12383A]/20 pb-3">
              <div>
                <span className="text-[12px] font-extrabold uppercase text-[#9E430B] dark:text-[#8AD6D1]">
                  Pojok Kreatif
                </span>
                <h3 className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                  Pajang Karya Murid
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingArtwork(false)}
                className="w-9 h-9 rounded-full bg-[#FF8C52] text-[#12383A] font-bold border-2 border-[#12383A] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmArtwork} className="space-y-4">
              <div>
                <label className="block text-[15px] font-bold text-[#12383A] dark:text-[#FFF0C5] mb-1">
                  Judul Karya
                </label>
                <input
                  type="text"
                  value={newArtTitle}
                  onChange={(e) => {
                    setNewArtTitle(e.target.value);
                    if (formError) setFormError('');
                  }}
                  placeholder="Contoh: Bunga Matahari di Pagi Hari"
                  className="input-tactile w-full px-4 text-[16px] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[15px] font-bold text-[#12383A] dark:text-[#FFF0C5] mb-1">
                  Pilih Stiker Karya
                </label>
                <div className="flex gap-2 flex-wrap">
                  {['🎨', '🌻', '🦅', '🏡', '🌈', '⛵', '📚'].map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => setNewArtEmoji(em)}
                      className={`w-11 h-11 rounded-xl border-2 border-[#12383A] text-2xl flex items-center justify-center cursor-pointer ${
                        newArtEmoji === em ? 'bg-[#FF8C52]' : 'bg-[#FFFFFF]'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[15px] font-bold text-[#12383A] dark:text-[#FFF0C5] mb-1">
                  Kategori Karya
                </label>
                <select
                  value={newArtCategory}
                  onChange={(e) => setNewArtCategory(e.target.value)}
                  className="input-tactile w-full px-4 text-[16px] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] outline-hidden cursor-pointer"
                >
                  <option value="Gambar Crayon">Gambar Crayon</option>
                  <option value="Kriya Kertas">Kriya Kertas</option>
                  <option value="Gambar Pensil">Gambar Pensil</option>
                  <option value="Anyaman Sederhana">Anyaman Sederhana</option>
                </select>
              </div>

              <div>
                <label className="block text-[15px] font-bold text-[#12383A] dark:text-[#FFF0C5] mb-1">
                  Cerita Tentang Karya Ini
                </label>
                <textarea
                  rows={3}
                  value={newArtDesc}
                  onChange={(e) => {
                    setNewArtDesc(e.target.value);
                    if (formError) setFormError('');
                  }}
                  placeholder="Ceritakan proses pembuatannya..."
                  className="w-full p-3.5 rounded-[16px] border-2 border-[#12383A] dark:border-[#8AD6D1] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] text-[16px] font-medium outline-hidden"
                />
                {formError && (
                  <p className="text-[13px] font-bold text-[#BA1A1A] mt-1">
                    {formError}
                  </p>
                )}
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingArtwork(false)}
                  className="btn-tactile px-5 py-2.5 rounded-full bg-[#FFFFFF] text-[#12383A] font-bold text-[15px] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-tactile px-6 py-2.5 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[15px] cursor-pointer"
                >
                  Simpan Karya
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
