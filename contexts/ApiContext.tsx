
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { User, Role, Request, RequestStatus, RequestType, Mark, ChatMessage, FinanceEntry, Log, Notebook } from '../types';
import { useAuth } from './AuthContext';

// --- MOCK DATA ---
const initialUsers: User[] = [
    { id: 1, name: 'Ayush Dubey', role: Role.Owner, social_id: 'name2231', profile_photo: 'https://picsum.photos/seed/1/200', class_points: 0, sports_points: 0 },
    { id: 2, name: 'Dr. Evelyn Reed', role: Role.Principal, social_id: '#1001', profile_photo: 'https://picsum.photos/seed/2/200', class_points: 0, sports_points: 0 },
    { id: 3, name: 'Mr. Alan Grant', role: Role.Teacher, class: '10A', social_id: '#2001', profile_photo: 'https://picsum.photos/seed/3/200', class_points: 0, sports_points: 0 },
    { id: 4, name: 'Sarah Connor', role: Role.Student, class: '10A', social_id: '#3001', profile_photo: 'https://picsum.photos/seed/4/200', class_points: 150, sports_points: 85 },
    { id: 5, name: 'Coach Carter', role: Role.Sports, social_id: '#4001', profile_photo: 'https://picsum.photos/seed/5/200', class_points: 0, sports_points: 0 },
    { id: 6, name: 'John Wick', role: Role.Student, class: '10A', social_id: '#3002', profile_photo: 'https://picsum.photos/seed/6/200', class_points: 120, sports_points: 110 },
    { id: 7, name: 'Ellen Ripley', role: Role.Teacher, class: '10B', social_id: '#2002', profile_photo: 'https://picsum.photos/seed/7/200', class_points: 0, sports_points: 0 },
];

const initialRequests: Request[] = [
    { id: 1, requester_id: 3, target_id: 4, type: RequestType.UpdateMark, description: 'Update marks for Chapter 3 Physics test.', status: RequestStatus.Pending, timestamp: new Date().toISOString() },
    { id: 2, requester_id: 5, target_id: 6, type: RequestType.UpdatePoints, description: 'Add 20 points for winning inter-school marathon.', status: RequestStatus.Approved, timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: 3, requester_id: 3, target_id: 6, type: RequestType.UpdateNotebook, description: 'Chemistry notebook submission review.', status: RequestStatus.Rejected, reason: 'Incomplete diagrams.', timestamp: new Date(Date.now() - 172800000).toISOString() },
];

// --- API CONTEXT ---

interface ApiContextType {
    // Users
    users: User[];
    getUserById: (id: number) => User | undefined;
    addUser: (user: Omit<User, 'id'>) => Promise<User>;
    // Requests
    requests: Request[];
    getRequests: () => Promise<Request[]>;
    createRequest: (req: Omit<Request, 'id' | 'timestamp' | 'status'>) => Promise<Request>;
    updateRequestStatus: (id: number, status: RequestStatus, reason?: string) => Promise<Request | undefined>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [requests, setRequests] =useState<Request[]>(initialRequests);
    
    const getUserById = (id: number) => users.find(u => u.id === id);

    const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newUser: User = { ...user, id: users.length + 1 };
                setUsers(prev => [...prev, newUser]);
                resolve(newUser);
            }, 500);
        });
    };

    const getRequests = async (): Promise<Request[]> => {
        // Filter based on user role
        if (!currentUser) return [];
        return new Promise((resolve) => {
            setTimeout(() => {
                if (currentUser.role === Role.Principal || currentUser.role === Role.Owner) {
                    resolve(requests);
                } else if (currentUser.role === Role.Teacher || currentUser.role === Role.Sports) {
                    resolve(requests.filter(r => r.requester_id === currentUser.id));
                } else {
                    resolve([]);
                }
            }, 300);
        });
    };

    const createRequest = async (req: Omit<Request, 'id' | 'timestamp' | 'status'>): Promise<Request> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newRequest: Request = {
                    ...req,
                    id: requests.length + 1,
                    timestamp: new Date().toISOString(),
                    status: RequestStatus.Pending,
                };
                setRequests(prev => [newRequest, ...prev]);
                resolve(newRequest);
            }, 500);
        });
    };

    const updateRequestStatus = async (id: number, status: RequestStatus, reason?: string): Promise<Request | undefined> => {
         return new Promise((resolve) => {
            setTimeout(() => {
                let updatedRequest: Request | undefined;
                setRequests(prev => prev.map(r => {
                    if (r.id === id) {
                        updatedRequest = { ...r, status, reason: reason || r.reason };
                        return updatedRequest;
                    }
                    return r;
                }));
                // In a real app, you would apply the change here (e.g., update marks)
                resolve(updatedRequest);
            }, 500);
        });
    }

    const value = {
        users,
        getUserById,
        addUser,
        requests,
        getRequests,
        createRequest,
        updateRequestStatus,
    };

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export const useApi = () => {
    const context = useContext(ApiContext);
    if (context === undefined) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
}
