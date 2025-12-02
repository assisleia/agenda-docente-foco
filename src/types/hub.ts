export type UserRole = 
  | 'professor'
  | 'professor_regente'
  | 'mediador_pedagogico'
  | 'professor_conteudista'
  | 'reitor'
  | 'pro_reitor'
  | 'coordenador_polo'
  | 'coordenador_curso'
  | 'gestor_academico'
  | 'lideranca'
  | 'atendimento_suporte';

export type EventType = 'formacao' | 'reuniao' | 'academico' | 'outro';

export type IncidentCategory = 
  | 'suporte_tecnico'
  | 'academico'
  | 'administrativo'
  | 'infraestrutura'
  | 'outro';

export type IncidentStatus = 'aberto' | 'em_atendimento' | 'resolvido';

export type IncidentScope = 'nacional' | 'local';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution?: string;
  polo?: string;
  campus?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  type: EventType;
  startDate: Date;
  endDate?: Date;
  targetProfiles: UserRole[];
  notifyByEmail: boolean;
  notifyByHub: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  startDate?: Date;
  targetProfiles: UserRole[];
  isCompleted: boolean;
  source: 'manual' | 'calendario_academico' | 'importado';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  targetProfiles: UserRole[] | 'all';
  createdAt: Date;
  validUntil?: Date;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  category: IncidentCategory;
  status: IncidentStatus;
  scope: IncidentScope;
  institution?: string;
  polo?: string;
  campus?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  assignedTo?: string[];
}

export interface IncidentConfig {
  category: IncidentCategory;
  responsibleUsers: string[];
}

export interface Material {
  id: string;
  title: string;
  description?: string;
  type: 'roteiro' | 'guia' | 'tutorial' | 'cronograma' | 'orientacao' | 'outro';
  url?: string;
  fileUrl?: string;
  createdAt: Date;
}

export interface Indicator {
  id: string;
  name: string;
  value: number;
  previousValue?: number;
  unit?: string;
  type: 'nps' | 'avaliacao' | 'retencao' | 'acessos';
  institution?: string;
  campus?: string;
  period: string;
}
