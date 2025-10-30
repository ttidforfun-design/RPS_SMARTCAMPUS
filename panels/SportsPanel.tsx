import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PanelLayout from '../components/layout/PanelLayout';
import { ICONS } from '../constants';
import { useApi } from '../contexts/ApiContext';
// FIX: Import useAuth to resolve 'Cannot find name useAuth' error on line 15.
import { useAuth } from '../contexts/AuthContext';
// FIX: Import Request interface and RequestType enum separately to resolve conflict.
// The alias 'Request as RequestType' was shadowing the 'RequestType' enum, causing an error on line 27.
import { Request, User, Role, RequestType } from '../types';
import RequestCard from '../components/shared/RequestCard';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';


const CreateRequestForm: React.FC<{onClose: () => void, onUpdate: () => void}> = ({onClose, onUpdate}) => {
    const { users, createRequest } = useApi();
    const { user: currentUser } = useAuth();
    const [studentId, setStudentId] = useState('');
    const [description, setDescription] = useState('');

    const students = users.filter(u => u.role === Role.Student);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!currentUser) return;
        await createRequest({
            requester_id: currentUser.id,
            target_id: parseInt(studentId),
            type: RequestType.UpdatePoints,
            description,
        });
        onUpdate();
        onClose();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Student</label>
                <select value={studentId} onChange={e => setStudentId(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Select a student</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.social_id})</option>)}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description (e.g., "Add 20 points for...")</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <div className="flex justify-end">
                <button type="submit" className="bg-brand-blue text-white px-4 py-2 rounded-md">Submit Request</button>
            </div>
        </form>
    );
}

const SportsDashboard: React.FC = () => {
    const { getRequests, users } = useApi();
    // FIX: Use the 'Request' interface directly instead of the conflicting alias.
    const [myRequests, setMyRequests] = useState<Request[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchRequests = async () => {
        const data = await getRequests();
        setMyRequests(data);
    };

    useEffect(() => {
        fetchRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sportsLeaderboard = [...users]
        .filter(u => u.role === Role.Student)
        .sort((a, b) => b.sports_points - a.sports_points)
        .slice(0, 10);

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={() => setIsModalOpen(true)} className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                    Propose Score Update
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="My Sent Requests">
                    {myRequests.map(req => (
                        <RequestCard key={req.id} request={req} canApprove={false} onUpdate={fetchRequests} />
                    ))}
                </Card>
                <Card title="Sports Leaderboard">
                    <ul className="space-y-2">
                        {sportsLeaderboard.map((student, index) => (
                            <li key={student.id} className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                                <span>{index + 1}. {student.name}</span>
                                <span className="font-bold text-brand-blue">{student.sports_points} pts</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Propose Sports Point Update">
                <CreateRequestForm onClose={() => setIsModalOpen(false)} onUpdate={fetchRequests}/>
            </Modal>
        </div>
    );
};

const SportsPanel: React.FC = () => {
    const location = useLocation();
    const getHeaderTitle = () => 'Sports Department';

    const navItems = [
        { path: '/sports', label: 'Dashboard', icon: ICONS.dashboard },
        { path: '/sports/leaderboard', label: 'Leaderboard', icon: ICONS.leaderboard },
    ];

    return (
        <PanelLayout navItems={navItems} headerTitle={getHeaderTitle()}>
            <Routes>
                <Route index element={<SportsDashboard />} />
            </Routes>
        </PanelLayout>
    );
};

export default SportsPanel;