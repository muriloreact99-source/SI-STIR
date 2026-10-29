import React, { useState } from 'react';
import {
  ModulAjar,
  ArchiveDocument,
  TeacherProfile,
  UserRole,
  ArchiveCategory,
} from '../types/index.ts';
import { StatusChip } from '../components/StatusChip.tsx';
import { RoleGateCard } from '../components/RoleGateCard.tsx';

interface RuangKepalaSekolahViewProps {
  currentRole: UserRole;
  onOpenLogin: () => void;
  modulList: ModulAjar[];
  onApproveModul: (id: string, note?: string) => void;
  onRequestModulRevision: (id: string, note: string) => void;
  archiveDocs: ArchiveDocument[];
  onAddArchiveDoc: (title: string, category: ArchiveCategory, year: string, fileSize: string) => void;
  teachers: TeacherProfile[];
  onUpdateSupervisionNote: (teacherName: string, note: string) => void;
  showToast: (msg: string) => void;
}

export const RuangKepalaSekolahView: React.FC<RuangKepalaSekolahViewProps> = ({
  currentRole,
  onOpenLogin,
  modulList,
  onApproveModul,
  onRequestModulRevision,
  archiveDocs,
  onAddArchiveDoc,
  teachers,
  onUpdateSupervisionNote,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<'supervisi' | 'arsip' | 'guru' | 'rekap'>('supervisi');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedYear, setSelectedYear] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isAddingDoc, setIsAddingDoc] = useState<boolean>(false);
  const [newDocTitle, setNewDocTitle] = useState<string>('');
  const [newDocCategory, setNewDocCategory] = useState<ArchiveCategory>('KSP');
  const [newDocYear, setNewDocYear] = useState<string>('2026');
  const [docError, setDocError] = useState<string>('');

  const [revisingModul, setRevisingModul] = useState<ModulAjar | null>(null);
  const [revisionNote, setRevisionNote] = useState<string>('');

  const [supervisingTeacher, setSupervisingTeacher] = useState<TeacherProfile | null>(null);
  const [teacherNoteInput, setTeacherNoteInput] = useState<string>('');

  // Gate check: only kepalasekolah can access
  if (currentRole !== 'kepalasekolah') {
    return (
      <RoleGateCard
        roomName="Ruang Kepala Sekolah"
        allowedRoleLabel="Ibu Kepala Sekolah (Ibu Khoyum Supardi, S.Pd.SD, M.Pd.)"
        onOpenLogin={onOpenLogin}
      />
    );
  }

  // Filter archive docs
  const filteredDocs = archiveDocs.filter((doc) => {
    const matchCat = selectedCategory === 'Semua' || doc.category === selectedCategory;
    const matchYear = selectedYear === 'Semua' || doc.year === selectedYear;
    const matchSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchYear && matchSearch;
  });

  const handleApprove = (modul: ModulAjar) => {
    onApproveModul(modul.id, 'Disetujui untuk diimplementasikan dalam pembelajaran.');
    showToast(`Modul ${modul.title} telah disetujui`);
  };

  const handleSendRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionNote.trim()) {
      showToast('Tuliskan catatan perbaikan untuk guru');
      return;
    }
    if (revisingModul) {
      onRequestModulRevision(revisingModul.id, revisionNote);
      showToast('Catatan perbaikan modul telah dikirimkan ke guru');
      setRevisingModul(null);
      setRevisionNote('');
    }
  };

  const handleCreateDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) {
      setDocError('Kolom ini belum diisi.');
      return;
    }
    onAddArchiveDoc(newDocTitle, newDocCategory, newDocYear, '2.1 MB');
    showToast('Dokumen arsip resmi sekolah berhasil disimpan');
    setIsAddingDoc(false);
    setNewDocTitle('');
    setDocError('');
  };

  const handleSaveTeacherSupervision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherNoteInput.trim()) {
      showToast('Tuliskan catatan supervisi');
      return;
    }
    if (supervisingTeacher) {
      onUpdateSupervisionNote(supervisingTeacher.name, teacherNoteInput);
      showToast(`Catatan supervisi untuk ${supervisingTeacher.name} telah disimpan`);
      setSupervisingTeacher(null);
      setTeacherNoteInput('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Calm & Tidy Hero Card */}
      <section className="card-tactile rounded-[28px] bg-[#FFFAE6] dark:bg-[#163A3D] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8AD6D1] text-[#12383A] border-2 border-[#12383A] text-[13px] font-extrabold uppercase tracking-wider">
              <span>🏛️</span>
              <span>Tumbuh Bersama</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              Ruang Kepala Sekolah: Ibu Khoyum Supardi
            </h1>
            <p className="text-[16px] text-[#12383A]/85 dark:text-[#FFF0C5]/85">
              Ibu Khoyum Supardi, S.Pd.SD, M.Pd. • Pemantauan mutu pembelajaran, validasi modul ajar enam kelas, dan tata kelola arsip SDN 03 Wonosari.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-[#CFEFEC] text-[#12383A] border-2 border-[#12383A] font-extrabold text-[14px] shadow-[2px_2px_0_#12383A]">
              Hak Akses Semua Ruang
            </div>
          </div>
        </div>
      </section>

      {/* Pill Tabs with active deep teal + cream text */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2" role="tablist">
        {[
          { id: 'supervisi', label: 'Supervisi Modul Ajar', count: modulList.length },
          { id: 'arsip', label: 'Arsip Dokumen Sekolah', count: archiveDocs.length },
          { id: 'guru', label: 'Catatan Supervisi Guru', count: teachers.length },
          { id: 'rekap', label: 'Rekapitulasi Mutu' },
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

      {/* Tab 1: Supervisi Modul Ajar */}
      {activeTab === 'supervisi' && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                Supervisi Modul Ajar Guru Kelas 1 Sampai 6
              </h2>
              <p className="text-[15px] text-[#12383A]/80 dark:text-[#FFF0C5]/80">
                Lakukan penelaahan rancangan modul ajar guru untuk memastikan kesesuaian capaian pembelajaran kurikulum.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#FFF0C5] text-[#12383A] border-2 border-[#12383A] text-[12px] font-bold">
              Data contoh
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {modulList.map((modul) => (
              <div
                key={modul.id}
                className="card-tactile rounded-[24px] bg-[#FFFAE6] dark:bg-[#163A3D] p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[13px] font-extrabold text-[#9E430B] dark:text-[#8AD6D1] uppercase">
                      {modul.className} • {modul.subject}
                    </span>
                    <StatusChip status={modul.status} />
                  </div>

                  <h3 className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                    {modul.title}
                  </h3>

                  <div className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#1F5254] border border-[#12383A] space-y-1 text-[14px]">
                    <p>
                      <span className="font-bold text-[#12383A] dark:text-[#FFF0C5]">Penyusun:</span>{' '}
                      <span className="font-extrabold text-[#9E430B]">{modul.teacherName}</span>
                    </p>
                    <p>
                      <span className="font-bold text-[#12383A] dark:text-[#FFF0C5]">Tanggal Unggah:</span>{' '}
                      <span className="text-[#12383A]/85 dark:text-[#FFF0C5]/85">{modul.submittedDate}</span>
                    </p>
                    {modul.notes && (
                      <p>
                        <span className="font-bold text-[#12383A] dark:text-[#FFF0C5]">Ringkasan:</span>{' '}
                        <span className="text-[#12383A]/85 dark:text-[#FFF0C5]/85">{modul.notes}</span>
                      </p>
                    )}
                  </div>

                  {modul.supervisorNote && (
                    <div className="p-3 rounded-2xl bg-[#CFEFEC] text-[#12383A] border border-[#12383A] text-[14px]">
                      <span className="font-bold">Catatan Anda Sebelumnya:</span> {modul.supervisorNote}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t-2 border-[#12383A]/15 dark:border-[#8AD6D1]/20 flex items-center justify-end gap-2 flex-wrap">
                  {modul.status === 'Diajukan' && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setRevisingModul(modul);
                          setRevisionNote(modul.supervisorNote || '');
                        }}
                        className="btn-tactile px-4 py-2 rounded-full bg-[#FFD9C2] text-[#7A2E00] font-bold text-[14px] cursor-pointer"
                      >
                        Minta Revisi
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApprove(modul)}
                        className="btn-tactile px-5 py-2 rounded-full bg-[#CDEFD0] text-[#174D1F] font-bold text-[14px] cursor-pointer"
                      >
                        Setujui Modul
                      </button>
                    </>
                  )}

                  {modul.status === 'Perlu revisi' && (
                    <button
                      type="button"
                      onClick={() => {
                        setRevisingModul(modul);
                        setRevisionNote(modul.supervisorNote || '');
                      }}
                      className="btn-tactile px-5 py-2 rounded-full bg-[#FFFAE6] text-[#12383A] font-bold text-[14px] cursor-pointer"
                    >
                      Ubah Catatan Revisi
                    </button>
                  )}

                  {modul.status === 'Disetujui' && (
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-extrabold text-[#174D1F]">
                        ✓ Telah Disetujui
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setRevisingModul(modul);
                          setRevisionNote(modul.supervisorNote || '');
                        }}
                        className="btn-tactile px-4 py-1.5 rounded-full bg-[#FFFFFF] text-[#12383A] font-bold text-[13px] cursor-pointer"
                      >
                        Beri Masukan Tambahan
                      </button>
                    </div>
                  )}

                  {modul.status === 'Draf' && (
                    <span className="text-[13px] font-bold text-[#4B4524] italic">
                      Menunggu guru mengajukan
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab 2: Arsip Dokumen Sekolah (Archive toolbar: search field + year select + button Unggah Dokumen) */}
      {activeTab === 'arsip' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              Arsip Dokumen Sekolah SDN 03 Wonosari
            </h2>
            <p className="text-[15px] text-[#12383A]/80 dark:text-[#FFF0C5]/80">
              Pengelolaan dokumen resmi sekolah: KSP, RKT, RKAS khusus Kepala Sekolah, Kumpulan SK, dan Perjalanan Dinas.
            </p>
          </div>

          {/* Archive toolbar according to DESIGN.md */}
          <div className="p-4 sm:p-5 rounded-[24px] bg-[#CFEFEC] dark:bg-[#163A3D] border-2 border-[#12383A] dark:border-[#8AD6D1] shadow-[4px_4px_0_#12383A] flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search field */}
            <div className="flex-1 min-w-[220px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama dokumen arsip..."
                className="input-tactile w-full px-4 text-[15px] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] outline-hidden"
              />
            </div>

            {/* Year select */}
            <div className="w-full md:w-44">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="input-tactile w-full px-3 text-[15px] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] outline-hidden cursor-pointer"
              >
                <option value="Semua">Semua Tahun</option>
                <option value="2026">Tahun 2026</option>
                <option value="2025">Tahun 2025</option>
                <option value="2024">Tahun 2024</option>
              </select>
            </div>

            {/* Category filter select */}
            <div className="w-full md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-tactile w-full px-3 text-[15px] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] outline-hidden cursor-pointer"
              >
                <option value="Semua">Semua Kategori</option>
                <option value="KSP">KSP</option>
                <option value="RKT">RKT</option>
                <option value="RKAS">RKAS (Khusus Kepsek)</option>
                <option value="Kumpulan SK">Kumpulan SK</option>
                <option value="Perjalanan Dinas">Perjalanan Dinas</option>
              </select>
            </div>

            {/* Button Unggah Dokumen */}
            <button
              type="button"
              onClick={() => {
                setIsAddingDoc(true);
                setDocError('');
              }}
              className="btn-tactile px-6 py-3 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[15px] flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Unggah Dokumen</span>
              <span>📄</span>
            </button>
          </div>

          {/* Document list */}
          <div className="space-y-3">
            {filteredDocs.length === 0 ? (
              <div className="p-8 rounded-[24px] border-2 border-dashed border-[#12383A] text-center bg-[#FFFAE6]">
                <p className="font-bold text-[#12383A] text-[16px]">
                  Dokumen arsip yang Anda cari belum ditemukan.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Semua');
                    setSelectedYear('Semua');
                  }}
                  className="btn-tactile mt-3 px-5 py-2 rounded-full bg-[#8AD6D1] text-[#12383A] font-bold text-[14px]"
                >
                  Tampilkan Semua Dokumen
                </button>
              </div>
            ) : (
              filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="card-tactile rounded-[20px] bg-[#FFFAE6] dark:bg-[#163A3D] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#8AD6D1] border-2 border-[#12383A] flex items-center justify-center text-2xl shrink-0">
                      📁
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#CFEFEC] text-[#12383A] border border-[#12383A] text-[12px] font-extrabold uppercase">
                          {doc.category}
                        </span>
                        <span className="text-[13px] font-bold text-[#12383A]/70 dark:text-[#FFF0C5]/70">
                          Tahun {doc.year} • {doc.fileSize}
                        </span>
                        {doc.isRestricted && (
                          <span className="px-2 py-0.5 rounded-full bg-[#FFD9C2] text-[#7A2E00] border border-[#7A2E00] text-[11px] font-extrabold">
                            Khusus Kepala Sekolah
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-extrabold text-[#12383A] dark:text-[#FFF0C5] mt-1">
                        {doc.title}
                      </h4>
                      <p className="text-[13px] text-[#12383A]/70 dark:text-[#FFF0C5]/70">
                        Diunggah oleh: {doc.uploader} ({doc.uploadDate})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      type="button"
                      onClick={() => showToast(`Dokumen ${doc.title} dibuka dalam penampil PDF`)}
                      className="btn-tactile px-4 py-2 rounded-full bg-[#FFFFFF] text-[#12383A] font-bold text-[14px] cursor-pointer"
                    >
                      Buka Dokumen
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast(`Mengunduh berkas ${doc.title}`)}
                      className="btn-tactile px-4 py-2 rounded-full bg-[#8AD6D1] text-[#12383A] font-bold text-[14px] cursor-pointer"
                    >
                      Unduh Berkas
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {/* Tab 3: Catatan Supervisi Guru (All 6 teachers) */}
      {activeTab === 'guru' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              Daftar Dewan Guru SDN 03 Wonosari
            </h2>
            <p className="text-[15px] text-[#12383A]/80 dark:text-[#FFF0C5]/80">
              Evaluasi kinerja dan pendampingan profesional untuk enam wali kelas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {teachers.map((t) => (
              <div
                key={t.name}
                className="card-tactile rounded-[24px] bg-[#FFFAE6] dark:bg-[#163A3D] p-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#8AD6D1] text-[#12383A] border-2 border-[#12383A] text-[12px] font-extrabold">
                      {t.className}
                    </span>
                    <span className="text-[13px] font-bold text-[#12383A]/70 dark:text-[#FFF0C5]/70">
                      {t.studentsCount} Murid
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                    {t.name}
                  </h3>

                  <div className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#1F5254] border border-[#12383A] text-[13px] space-y-1">
                    <p>
                      <span className="font-bold">Modul Disetujui:</span> {t.approvedModulCount} dari {t.modulCount} modul
                    </p>
                    <p>
                      <span className="font-bold">Supervisi Terakhir:</span> {t.lastSupervisionDate}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#CFEFEC] text-[#12383A] border border-[#12383A] text-[13px]">
                    <div className="font-extrabold uppercase text-[11px] text-[#12383A]/70 mb-0.5">
                      Catatan Pembinaan:
                    </div>
                    <div>{t.supervisionNote}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-[#12383A]/15 dark:border-[#8AD6D1]/20">
                  <button
                    type="button"
                    onClick={() => {
                      setSupervisingTeacher(t);
                      setTeacherNoteInput(t.supervisionNote);
                    }}
                    className="btn-tactile w-full py-2.5 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[14px] text-center cursor-pointer"
                  >
                    Tambah Catatan Supervisi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab 4: Rekapitulasi Mutu */}
      {activeTab === 'rekap' && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-tactile rounded-[24px] bg-[#CFEFEC] dark:bg-[#163A3D] p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0C5] border-2 border-[#12383A] flex items-center justify-center text-2xl">
              🎓
            </div>
            <div className="text-[12px] font-extrabold uppercase text-[#12383A]/70 dark:text-[#FFF0C5]/70">
              Total Murid Aktif
            </div>
            <div className="text-3xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              147 Murid
            </div>
            <p className="text-[14px] text-[#12383A]/80 dark:text-[#FFF0C5]/80">
              Tersebar di enam rombongan belajar dengan tingkat kehadiran 98.4 persen.
            </p>
          </div>

          <div className="card-tactile rounded-[24px] bg-[#8AD6D1] dark:bg-[#1F5254] p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] border-2 border-[#12383A] flex items-center justify-center text-2xl">
              📚
            </div>
            <div className="text-[12px] font-extrabold uppercase text-[#12383A]/70 dark:text-[#FFF0C5]/70">
              Kesiapan Modul Ajar
            </div>
            <div className="text-3xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              22 Disetujui
            </div>
            <p className="text-[14px] text-[#12383A]/80 dark:text-[#FFF0C5]/80">
              Seluruh modul ajar telah memenuhi kriteria kurikulum merdeka daerah Boalemo.
            </p>
          </div>

          <div className="card-tactile rounded-[24px] bg-[#FFF0C5] dark:bg-[#163A3D] p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] border-2 border-[#12383A] flex items-center justify-center text-2xl">
              🤝
            </div>
            <div className="text-[12px] font-extrabold uppercase text-[#12383A]/70 dark:text-[#FFF0C5]/70">
              Kemitraan Orang Tua
            </div>
            <div className="text-3xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
              89 Persen
            </div>
            <p className="text-[14px] text-[#12383A]/80 dark:text-[#FFF0C5]/80">
              Orang tua aktif mengisi refleksi mingguan dan mendukung 7 kebiasaan di rumah.
            </p>
          </div>
        </section>
      )}

      {/* Modal Minta Revisi Modul */}
      {revisingModul && (
        <div className="fixed inset-0 z-50 bg-[#12383A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#FFFAE6] dark:bg-[#163A3D] rounded-[28px] border-2 border-[#12383A] dark:border-[#8AD6D1] shadow-[6px_6px_0_#12383A] dark:shadow-[6px_6px_0_#04171A] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4 border-b-2 border-[#12383A]/20 pb-3">
              <div>
                <span className="text-[12px] font-extrabold uppercase text-[#9E430B] dark:text-[#8AD6D1]">
                  Supervisi Modul Ajar
                </span>
                <h3 className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                  Catatan Pembinaan Kepala Sekolah
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRevisingModul(null)}
                className="w-9 h-9 rounded-full bg-[#FF8C52] text-[#12383A] font-bold border-2 border-[#12383A] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendRevision} className="space-y-4">
              <div>
                <div className="font-bold text-[15px] text-[#12383A] dark:text-[#FFF0C5] mb-1">
                  Modul: {revisingModul.title}
                </div>
                <div className="text-[13px] text-[#12383A]/70 dark:text-[#FFF0C5]/70 mb-2">
                  Guru Pengampu: {revisingModul.teacherName} ({revisingModul.className})
                </div>
                <textarea
                  rows={4}
                  value={revisionNote}
                  onChange={(e) => setRevisionNote(e.target.value)}
                  placeholder="Tuliskan arahan perbaikan rubrik asesmen atau langkah kegiatan..."
                  className="w-full p-3.5 rounded-[16px] border-2 border-[#12383A] dark:border-[#8AD6D1] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] text-[16px] font-medium outline-hidden"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setRevisingModul(null)}
                  className="btn-tactile px-5 py-2.5 rounded-full bg-[#FFFFFF] text-[#12383A] font-bold text-[15px] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-tactile px-6 py-2.5 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[15px] cursor-pointer"
                >
                  Kirim Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Unggah Dokumen Arsip */}
      {isAddingDoc && (
        <div className="fixed inset-0 z-50 bg-[#12383A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#FFFAE6] dark:bg-[#163A3D] rounded-[28px] border-2 border-[#12383A] dark:border-[#8AD6D1] shadow-[6px_6px_0_#12383A] dark:shadow-[6px_6px_0_#04171A] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4 border-b-2 border-[#12383A]/20 pb-3">
              <div>
                <span className="text-[12px] font-extrabold uppercase text-[#9E430B] dark:text-[#8AD6D1]">
                  Arsip Sekolah
                </span>
                <h3 className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                  Unggah Dokumen Baru
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingDoc(false)}
                className="w-9 h-9 rounded-full bg-[#FF8C52] text-[#12383A] font-bold border-2 border-[#12383A] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDoc} className="space-y-4">
              <div>
                <label className="block text-[15px] font-bold text-[#12383A] dark:text-[#FFF0C5] mb-1">
                  Kategori Dokumen
                </label>
                <select
                  value={newDocCategory}
                  onChange={(e) => setNewDocCategory(e.target.value as ArchiveCategory)}
                  className="input-tactile w-full px-4 text-[16px] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] outline-hidden cursor-pointer"
                >
                  <option value="KSP">KSP</option>
                  <option value="RKT">RKT</option>
                  <option value="RKAS">RKAS (Khusus Kepala Sekolah)</option>
                  <option value="Kumpulan SK">Kumpulan SK</option>
                  <option value="Perjalanan Dinas">Perjalanan Dinas</option>
                </select>
              </div>

              <div>
                <label className="block text-[15px] font-bold text-[#12383A] dark:text-[#FFF0C5] mb-1">
                  Tahun Anggaran / Terbit
                </label>
                <select
                  value={newDocYear}
                  onChange={(e) => setNewDocYear(e.target.value)}
                  className="input-tactile w-full px-4 text-[16px] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] outline-hidden cursor-pointer"
                >
                  <option value="2026">Tahun 2026</option>
                  <option value="2025">Tahun 2025</option>
                  <option value="2024">Tahun 2024</option>
                </select>
              </div>

              <div>
                <label className="block text-[15px] font-bold text-[#12383A] dark:text-[#FFF0C5] mb-1">
                  Nama Dokumen Resmi
                </label>
                <input
                  type="text"
                  value={newDocTitle}
                  onChange={(e) => {
                    setNewDocTitle(e.target.value);
                    if (docError) setDocError('');
                  }}
                  placeholder="Contoh: Surat Keputusan Tim Pencegahan Kekerasan Sekolah"
                  className="input-tactile w-full px-4 text-[16px] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] outline-hidden"
                />
                {docError && (
                  <p className="text-[13px] font-bold text-[#BA1A1A] mt-1">
                    {docError}
                  </p>
                )}
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingDoc(false)}
                  className="btn-tactile px-5 py-2.5 rounded-full bg-[#FFFFFF] text-[#12383A] font-bold text-[15px] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-tactile px-6 py-2.5 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[15px] cursor-pointer"
                >
                  Simpan ke Arsip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Supervisi Guru */}
      {supervisingTeacher && (
        <div className="fixed inset-0 z-50 bg-[#12383A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#FFFAE6] dark:bg-[#163A3D] rounded-[28px] border-2 border-[#12383A] dark:border-[#8AD6D1] shadow-[6px_6px_0_#12383A] dark:shadow-[6px_6px_0_#04171A] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4 border-b-2 border-[#12383A]/20 pb-3">
              <div>
                <span className="text-[12px] font-extrabold uppercase text-[#9E430B] dark:text-[#8AD6D1]">
                  Supervisi Akademik
                </span>
                <h3 className="text-xl font-extrabold text-[#12383A] dark:text-[#FFF0C5]">
                  Catatan untuk {supervisingTeacher.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSupervisingTeacher(null)}
                className="w-9 h-9 rounded-full bg-[#FF8C52] text-[#12383A] font-bold border-2 border-[#12383A] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTeacherSupervision} className="space-y-4">
              <div>
                <label className="block text-[15px] font-bold text-[#12383A] dark:text-[#FFF0C5] mb-1">
                  Catatan Pembinaan Guru {supervisingTeacher.className}
                </label>
                <textarea
                  rows={4}
                  value={teacherNoteInput}
                  onChange={(e) => setTeacherNoteInput(e.target.value)}
                  placeholder="Tuliskan catatan hasil observasi kelas dan pembinaan profesional..."
                  className="w-full p-3.5 rounded-[16px] border-2 border-[#12383A] dark:border-[#8AD6D1] bg-[#FFFFFF] dark:bg-[#1F5254] text-[#12383A] dark:text-[#FFF0C5] text-[16px] font-medium outline-hidden"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSupervisingTeacher(null)}
                  className="btn-tactile px-5 py-2.5 rounded-full bg-[#FFFFFF] text-[#12383A] font-bold text-[15px] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-tactile px-6 py-2.5 rounded-full bg-[#FF8C52] text-[#12383A] font-bold text-[15px] cursor-pointer"
                >
                  Simpan Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
