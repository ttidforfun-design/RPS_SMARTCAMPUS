
export enum Role {
    Owner = 'owner',
    Principal = 'principal',
    Teacher = 'teacher',
    Student = 'student',
    Sports = 'sports',
}

export interface User {
    id: number;
    name: string;
    role: Role;
    class?: string;
    social_id: string;
    password?: string; // Hashed on backend, not sent to frontend
    email?: string;
    profile_photo: string;
    class_points: number;
    sports_points: number;
}

export interface Mark {
    id: number;
    student_id: number;
    subject: string;
    chapter: string;
    marks: number;
    max_marks: number;
}

export enum RequestType {
    UpdateMark = 'update_mark',
    UpdatePoints = 'update_points',
    UpdateNotebook = 'update_notebook',
    // Add other types as needed
}

export enum RequestStatus {
    Pending = 'pending',
    Approved = 'approved',
    Rejected = 'rejected',
}

export interface Request {
    id: number;
    requester_id: number;
    target_id: number; // e.g., student_id
    type: RequestType;
    description: string;
    status: RequestStatus;
    reason?: string; // For rejection
    timestamp: string;
}

export interface ChatMessage {
    id: number;
    sender_id: number;
    receiver_id: number | string; // Can be user_id or group_id
    message: string;
    timestamp: string;
}

export interface Notebook {
    id: number;
    student_id: number;
    subject: string;
    file_path: string;
    status: 'pending' | 'checked' | 'rejected';
}

export interface FinanceEntry {
    id: number;
    type: 'revenue' | 'due' | 'late_payment';
    amount: number;
    date: string;
    status: string;
}

export interface ClassAssignment {
    teacher_id: number;
    class: string;
}

export interface Log {
    id: number;
    user_id: number;
    action: string;
    timestamp: string;
}

export interface Notification {
    id: number;
    user_id: number;
    message: string;
    read_status: boolean;
    timestamp: string;
}
