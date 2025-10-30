
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
    user: User | null;
    login: (socialId: string, password: string) => Promise<User | null>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock initial user data
const mockUsers: User[] = [
    { id: 1, name: 'Ayush Dubey', role: Role.Owner, social_id: 'name2231', profile_photo: 'https://picsum.photos/seed/1/200', class_points: 0, sports_points: 0 },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (socialId: string, password: string): Promise<User | null> => {
        // This is a mock login. In a real app, this would be an API call.
        if (socialId === 'name2231' && password === 'AyushDubey') {
            const ownerUser = mockUsers.find(u => u.social_id === 'name2231');
            if(ownerUser) {
                setUser(ownerUser);
                return ownerUser;
            }
        }
        // Add more mock users for testing different roles
        const mockPrincipal = { id: 2, name: 'Dr. Evelyn Reed', role: Role.Principal, social_id: '#1001', profile_photo: 'https://picsum.photos/seed/2/200', class_points: 0, sports_points: 0 };
        if (socialId === '#1001' && password === 'principal123') {
            setUser(mockPrincipal);
            return mockPrincipal;
        }

        const mockTeacher = { id: 3, name: 'Mr. Alan Grant', role: Role.Teacher, social_id: '#2001', class: '10A', profile_photo: 'https://picsum.photos/seed/3/200', class_points: 0, sports_points: 0 };
        if (socialId === '#2001' && password === 'teacher123') {
            setUser(mockTeacher);
            return mockTeacher;
        }

        const mockStudent = { id: 4, name: 'Sarah Connor', role: Role.Student, social_id: '#3001', class: '10A', profile_photo: 'https://picsum.photos/seed/4/200', class_points: 150, sports_points: 85 };
         if (socialId === '#3001' && password === 'student123') {
            setUser(mockStudent);
            return mockStudent;
        }

        const mockSports = { id: 5, name: 'Coach Carter', role: Role.Sports, social_id: '#4001', profile_photo: 'https://picsum.photos/seed/5/200', class_points: 0, sports_points: 0 };
         if (socialId === '#4001' && password === 'sports123') {
            setUser(mockSports);
            return mockSports;
        }

        return null;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
