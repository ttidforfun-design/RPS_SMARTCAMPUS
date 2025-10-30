
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PanelLayout from '../components/layout/PanelLayout';
import { ICONS } from '../constants';
import { Role, Request as RequestType } from '../types';
import AddUserModal from '../components/shared/AddUserModal';
import { useApi } from '../contexts/ApiContext';
import RequestCard from '../components/shared/RequestCard';

const OwnerDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { requests, getRequests } = useApi();
    const [requestList, setRequestList] = useState<RequestType[]>([]);

    const fetchRequests = async () => {
        const data = await getRequests();
        setRequestList(data);
    };

    useEffect(() => {
        fetchRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={() => setIsModalOpen(true)} className="flex items-center bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-lightblue transition">
                    {ICONS.addUser}
                    Add Principal
                </button>
            </div>
            <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
            {requestList.filter(r => r.status === 'pending').map(req => (
                <RequestCard key={req.id} request={req} canApprove={true} onUpdate={fetchRequests} />
            ))}
             <h2 className="text-xl font-semibold my-4">Recent Activity</h2>
            {requestList.filter(r => r.status !== 'pending').slice(0, 5).map(req => (
                <RequestCard key={req.id} request={req} canApprove={false} onUpdate={fetchRequests} />
            ))}
            <AddUserModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                allowedRoles={[Role.Principal]}
            />
        </div>
    );
}

const OwnerPanel: React.FC = () => {
    const location = useLocation();
    const getHeaderTitle = () => {
        const path = location.pathname.split('/').pop();
        switch (path) {
            case 'owner': return 'Dashboard';
            case 'finance': return 'Finance';
            case 'logs': return 'System Logs';
            default: return 'Dashboard';
        }
    };
    
    const navItems = [
        { path: '/owner', label: 'Dashboard', icon: ICONS.dashboard },
        { path: '/owner/finance', label: 'Finance', icon: ICONS.finance },
        { path: '/owner/logs', label: 'Logs', icon: ICONS.logs },
    ];

    return (
        <PanelLayout navItems={navItems} headerTitle={getHeaderTitle()}>
            <Routes>
                <Route index element={<OwnerDashboard />} />
                {/* Add other routes for Finance, Logs etc. */}
            </Routes>
        </PanelLayout>
    );
};

export default OwnerPanel;
