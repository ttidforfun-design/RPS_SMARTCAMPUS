
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import OwnerPanel from './panels/OwnerPanel';
import PrincipalPanel from './panels/PrincipalPanel';
import TeacherPanel from './panels/TeacherPanel';
import StudentPanel from './panels/StudentPanel';
import SportsPanel from './panels/SportsPanel';
import { ApiProvider } from './contexts/ApiContext';

const AppRoutes = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }

    // Redirect based on role after login
    const HomeRedirect = () => {
        switch (user.role) {
            case 'owner': return <Navigate to="/owner" />;
            case 'principal': return <Navigate to="/principal" />;
            case 'teacher': return <Navigate to="/teacher" />;
            case 'student': return <Navigate to="/student" />;
            case 'sports': return <Navigate to="/sports" />;
            default: return <Navigate to="/login" />;
        }
    };

    return (
        <Routes>
            <Route path="/owner/*" element={user.role === 'owner' ? <OwnerPanel /> : <Navigate to="/" />} />
            <Route path="/principal/*" element={user.role === 'principal' ? <PrincipalPanel /> : <Navigate to="/" />} />
            <Route path="/teacher/*" element={user.role === 'teacher' ? <TeacherPanel /> : <Navigate to="/" />} />
            <Route path="/student/*" element={user.role === 'student' ? <StudentPanel /> : <Navigate to="/" />} />
            <Route path="/sports/*" element={user.role === 'sports' ? <SportsPanel /> : <Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/" element={<HomeRedirect />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <ApiProvider>
                <HashRouter>
                    <AppRoutes />
                </HashRouter>
            </ApiProvider>
        </AuthProvider>
    );
};

export default App;
