/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserRole, ArchiveCategory } from './types/index.ts';
import {
  initialHabits,
  initialTasks,
  initialArtworks,
  initialModulList,
  initialArchiveDocuments,
  initialParentReflections,
  initialMessages,
  teacherRoster,
} from './data/initialData.ts';
import { Header } from './components/Header.tsx';
import { BottomNav } from './components/BottomNav.tsx';
import { Footer } from './components/Footer.tsx';
import { Toast } from './components/Toast.tsx';
import { RoleModal } from './components/RoleModal.tsx';
import { BerandaView } from './views/BerandaView.tsx';
import { RuangMuridView } from './views/RuangMuridView.tsx';
import { RuangOrangTuaView } from './views/RuangOrangTuaView.tsx';
import { RuangGuruView } from './views/RuangGuruView.tsx';
import { RuangKepalaSekolahView } from './views/RuangKepalaSekolahView.tsx';
import { BantuanView } from './views/BantuanView.tsx';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('beranda');
  // Default to kepalasekolah so all rooms can be inspected immediately, with easy switching
  const [currentRole, setCurrentRole] = useState<UserRole>('kepalasekolah');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // App data state
  const [habits, setHabits] = useState(initialHabits);
  const [tasks, setTasks] = useState(initialTasks);
  const [artworks, setArtworks] = useState(initialArtworks);
  const [modulList, setModulList] = useState(initialModulList);
  const [archiveDocs, setArchiveDocs] = useState(initialArchiveDocuments);
  const [reflections, setReflections] = useState(initialParentReflections);
  const [messages, setMessages] = useState(initialMessages);
  const [teachers, setTeachers] = useState(teacherRoster);

  // Dark mode effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleLogout = () => {
    setCurrentRole('tamu');
    showToast('Anda telah keluar dari akun. Sekarang dalam mode Tamu');
  };

  const handleSelectRole = (role: UserRole) => {
    setCurrentRole(role);
    showToast(`Akun aktif berganti ke peran yang dipilih`);
  };

  // Habit toggling
  const handleToggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  // Task submission
  const handleTaskSubmit = (taskId: string, note: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: 'Sudah dikirim',
              submissionNote: note,
              submittedAt: '28 Oktober 2026',
            }
          : t
      )
    );
  };

  // Reviewing task
  const handleReviewTask = (
    id: string,
    status: 'Sudah diperiksa' | 'Perlu diperbaiki',
    feedback: string
  ) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status, teacherFeedback: feedback } : t
      )
    );
  };

  // Adding artwork
  const handleAddArtwork = (
    title: string,
    category: string,
    desc: string,
    emoji: string
  ) => {
    const newArt = {
      id: `art ${Date.now()}`,
      studentName: 'Aisyah',
      className: 'Kelas 1',
      title,
      category,
      emoji,
      description: desc,
      date: '28 Oktober 2026',
      likes: 1,
    };
    setArtworks((prev) => [newArt, ...prev]);
  };

  // Liking artwork
  const handleLikeArtwork = (id: string) => {
    setArtworks((prev) =>
      prev.map((a) => (a.id === id ? { ...a, likes: a.likes + 1 } : a))
    );
  };

  // Modul ajar actions
  const handleAddModul = (title: string, subject: string, notes: string) => {
    const newModul = {
      id: `modul ${Date.now()}`,
      teacherName: 'Ibu Darmiati, S.Pd',
      className: 'Kelas 1',
      subject,
      title,
      status: 'Draf' as const,
      submittedDate: '28 Oktober 2026',
      notes,
    };
    setModulList((prev) => [newModul, ...prev]);
  };

  const handleSubmitModulForReview = (id: string) => {
    setModulList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'Diajukan' as const } : m))
    );
  };

  const handleApproveModul = (id: string, note?: string) => {
    setModulList((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: 'Disetujui' as const,
              supervisorNote: note || 'Disetujui oleh Kepala Sekolah.',
            }
          : m
      )
    );
  };

  const handleRequestModulRevision = (id: string, note: string) => {
    setModulList((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: 'Perlu revisi' as const,
              supervisorNote: note,
            }
          : m
      )
    );
  };

  // Archive doc actions
  const handleAddArchiveDoc = (
    title: string,
    category: ArchiveCategory,
    year: string,
    fileSize: string
  ) => {
    const newDoc = {
      id: `doc ${Date.now()}`,
      title,
      category,
      year,
      uploadDate: '28 Oktober 2026',
      fileSize,
      uploader: 'Ibu Khoyum Supardi, S.Pd.SD, M.Pd.',
      isRestricted: category === 'RKAS',
    };
    setArchiveDocs((prev) => [newDoc, ...prev]);
  };

  // Reflection actions
  const handleAddReflection = (
    parentName: string,
    studentName: string,
    content: string
  ) => {
    const newRefl = {
      id: `refl ${Date.now()}`,
      parentName,
      studentName,
      className: studentName === 'Aisyah' ? 'Kelas 1' : 'Kelas 2',
      date: '28 Oktober 2026',
      content,
      teacherResponse: 'Terima kasih Ibu Rina atas catatan berharga ini. Kami akan perhatikan di kelas esok pagi.',
    };
    setReflections((prev) => [newRefl, ...prev]);
  };

  // Messages actions
  const handleSendMessage = (senderName: string, text: string) => {
    const isTeacher = senderName.includes('Guru');
    const newMsg = {
      id: `msg ${Date.now()}`,
      senderRole: (isTeacher ? 'guru' : 'orangtua') as 'guru' | 'orangtua',
      senderName,
      text,
      time: 'Baru saja',
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  // Teacher supervision note
  const handleUpdateSupervisionNote = (teacherName: string, note: string) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.name === teacherName
          ? {
              ...t,
              supervisionNote: note,
              lastSupervisionDate: '28 Oktober 2026',
            }
          : t
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF0C5] dark:bg-[#0E2A2C] text-[#12383A] dark:text-[#FFF0C5] pb-20 lg:pb-0">
      {/* Header */}
      <Header
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        currentRole={currentRole}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onLogout={handleLogout}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
      />

      {/* Main Container max width 1120px */}
      <main className="flex-1 max-w-[1120px] w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {currentTab === 'beranda' && (
          <BerandaView
            onNavigate={setCurrentTab}
            onSelectRole={(r) => {
              setCurrentRole(r);
              showToast(`Masuk sebagai ${r}`);
            }}
          />
        )}

        {currentTab === 'murid' && (
          <RuangMuridView
            currentRole={currentRole}
            onOpenLogin={() => setIsRoleModalOpen(true)}
            habits={habits}
            onToggleHabit={handleToggleHabit}
            tasks={tasks}
            onTaskSubmit={handleTaskSubmit}
            artworks={artworks}
            onAddArtwork={handleAddArtwork}
            onLikeArtwork={handleLikeArtwork}
            showToast={showToast}
          />
        )}

        {currentTab === 'orangtua' && (
          <RuangOrangTuaView
            currentRole={currentRole}
            onOpenLogin={() => setIsRoleModalOpen(true)}
            reflections={reflections}
            onAddReflection={handleAddReflection}
            messages={messages}
            onSendMessage={handleSendMessage}
            tasks={tasks}
            showToast={showToast}
          />
        )}

        {currentTab === 'guru' && (
          <RuangGuruView
            currentRole={currentRole}
            onOpenLogin={() => setIsRoleModalOpen(true)}
            modulList={modulList}
            onAddModul={handleAddModul}
            onSubmitModulForReview={handleSubmitModulForReview}
            tasks={tasks}
            onReviewTask={handleReviewTask}
            messages={messages}
            onSendMessage={handleSendMessage}
            showToast={showToast}
          />
        )}

        {currentTab === 'kepalasekolah' && (
          <RuangKepalaSekolahView
            currentRole={currentRole}
            onOpenLogin={() => setIsRoleModalOpen(true)}
            modulList={modulList}
            onApproveModul={handleApproveModul}
            onRequestModulRevision={handleRequestModulRevision}
            archiveDocs={archiveDocs}
            onAddArchiveDoc={handleAddArchiveDoc}
            teachers={teachers}
            onUpdateSupervisionNote={handleUpdateSupervisionNote}
            showToast={showToast}
          />
        )}

        {currentTab === 'bantuan' && (
          <BantuanView showToast={showToast} />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onNavigate={setCurrentTab}
      />

      {/* Role Picker Modal */}
      <RoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
