
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PanelLayout from '../components/layout/PanelLayout';
import { ICONS } from '../constants';
import { useApi } from '../contexts/ApiContext';
import { Request } from '../types';
import RequestCard from '../components/shared/RequestCard';
import Card from '../components/ui/Card';

const TeacherDashboard: React.FC = () => {
    const { getRequests } = useApi();
    const [myRequests, setMyRequests] = useState<Request[]>([]);

    const fetchRequests = async () => {
        const data = await getRequests();
        setMyRequests(data);
    };

    useEffect(() => {
        fetchRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Card title="My Sent Requests">
                {myRequests.length > 0 ? (
                    myRequests.map(req => (
                        <RequestCard key={req.id} request={req} canApprove={false} onUpdate={fetchRequests} />
                    ))
                ) : (
                    <p className="text-gray-500">You haven't sent any requests yet.</p>
                )}
            </Card>
        </div>
    );
};


const TeacherPanel: React.FC = () => {
    const location = useLocation();
    const getHeaderTitle = () => 'Teacher Dashboard';

    const navItems = [
        { path: '/teacher', label: 'Dashboard', icon: ICONS.dashboard },
        { path: '/teacher/chat', label: 'Chat', icon: ICONS.chat },
        { path: '/teacher/leaderboard', label: 'Leaderboard', icon: ICONS.leaderboard },
    ];

    return (
        <PanelLayout navItems={navItems} headerTitle={getHeaderTitle()}>
            <Routes>
                <Route index element={<TeacherDashboard />} />
            </Routes>
        </PanelLayout>
    );
};

export default TeacherPanel;
