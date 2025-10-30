
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PanelLayout from '../components/layout/PanelLayout';
import { ICONS } from '../constants';
import { Role, Request as RequestType } from '../types';
import AddUserModal from '../components/shared/AddUserModal';
import { useApi } from '../contexts/ApiContext';
import RequestCard from '../components/shared/RequestCard';

const PrincipalDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { getRequests } = useApi();
    const [requests, setRequests] = useState<RequestType[]>([]);

    const fetchRequests = async () => {
        const data = await getRequests();
        setRequests(data);
    };

    useEffect(() => {
        fetchRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const pendingRequests = requests.filter(r => r.status === 'pending');
    
    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={() => setIsModalOpen(true)} className="flex items-center bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-lightblue transition">
                    {ICONS.addUser}
                    Add Account
                </button>
            </div>

            <h2 className="text-xl font-semibold mb-4">Pending Requests ({pendingRequests.length})</h2>
            {pendingRequests.length > 0 ? (
                pendingRequests.map(req => (
                    <RequestCard key={req.id} request={req} canApprove={true} onUpdate={fetchRequests}/>
                ))
            ) : (
                <p className="text-gray-500">No pending requests.</p>
            )}

             <h2 className="text-xl font-semibold my-4">Completed Requests</h2>
             {requests.filter(r => r.status !== 'pending').slice(0, 5).map(req => (
                <RequestCard key={req.id} request={req} canApprove={false} onUpdate={fetchRequests}/>
            ))}

            <AddUserModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                allowedRoles={[Role.Teacher, Role.Student, Role.Sports]}
            />
        </div>
    );
};

const PrincipalPanel: React.FC = () => {
    const location = useLocation();
    const getHeaderTitle = () => {
        const path = location.pathname.split('/').pop();
        // This can be expanded for more pages
        return 'Principal Dashboard';
    };
    
    const navItems = [
        { path: '/principal', label: 'Dashboard', icon: ICONS.dashboard },
        { path: '/principal/requests', label: 'All Requests', icon: ICONS.requests },
        // Add more routes
    ];

    return (
        <PanelLayout navItems={navItems} headerTitle={getHeaderTitle()}>
            <Routes>
                <Route index element={<PrincipalDashboard />} />
            </Routes>
        </PanelLayout>
    );
};

export default PrincipalPanel;
