export type UserRole = 'tamu' | 'murid' | 'orangtua' | 'guru' | 'kepalasekolah';

export type TaskStatus = 'Belum dikerjakan' | 'Sudah dikirim' | 'Sudah diperiksa' | 'Perlu diperbaiki';

export type ModulStatus = 'Draf' | 'Diajukan' | 'Disetujui' | 'Perlu revisi';

export type ArchiveCategory = 'KSP' | 'RKT' | 'RKAS' | 'Kumpulan SK' | 'Perjalanan Dinas';

export interface HabitItem {
  id: string;
  title: string;
  helper: string;
  completed: boolean;
}

export interface StudentTask {
  id: string;
  studentName: string;
  className: string;
  subject: string;
  title: string;
  status: TaskStatus;
  dueDate: string;
  teacherName: string;
  submissionNote?: string;
  teacherFeedback?: string;
  submittedAt?: string;
}

export interface StudentArtwork {
  id: string;
  studentName: string;
  className: string;
  title: string;
  category: string;
  emoji: string;
  description: string;
  date: string;
  likes: number;
}

export interface ModulAjar {
  id: string;
  teacherName: string;
  className: string;
  subject: string;
  title: string;
  status: ModulStatus;
  submittedDate: string;
  notes?: string;
  supervisorNote?: string;
}

export interface ArchiveDocument {
  id: string;
  title: string;
  category: ArchiveCategory;
  year: string;
  uploadDate: string;
  fileSize: string;
  uploader: string;
  isRestricted?: boolean;
}

export interface ParentReflection {
  id: string;
  parentName: string;
  studentName: string;
  className: string;
  date: string;
  content: string;
  teacherResponse?: string;
}

export interface CommunicationMessage {
  id: string;
  senderRole: 'orangtua' | 'guru';
  senderName: string;
  text: string;
  time: string;
}

export interface TeacherProfile {
  name: string;
  className: string;
  studentsCount: number;
  modulCount: number;
  approvedModulCount: number;
  lastSupervisionDate: string;
  supervisionNote: string;
}
