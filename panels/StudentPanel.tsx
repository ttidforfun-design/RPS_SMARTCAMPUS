
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PanelLayout from '../components/layout/PanelLayout';
import { ICONS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    if (!user) return null;

    const marksData = [
        { subject: 'Physics', marks: 85, chapter: 'Ch1' },
        { subject: 'Physics', marks: 92, chapter: 'Ch2' },
        { subject: 'Chemistry', marks: 78, chapter: 'Ch1' },
        { subject: 'Math', marks: 95, chapter: 'Ch1' },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <Card>
                    <div className="flex flex-col items-center">
                        <img src={user.profile_photo} alt="profile" className="w-32 h-32 rounded-full mb-4" />
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <p className="text-gray-500">{user.social_id}</p>
                        <p className="text-lg font-semibold mt-2">Class: {user.class}</p>
                        <div className="flex gap-6 mt-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-brand-blue">{user.class_points}</p>
                                <p className="text-sm text-gray-500">Class Points</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-500">{user.sports_points}</p>
                                <p className="text-sm text-gray-500">Sports Points</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="lg:col-span-2">
                <Card title="My Marks">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={marksData}>
                            <XAxis dataKey="subject" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="marks" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                <Card title="Notebook Submission" className="mt-6">
                     <div className="flex flex-col items-center">
                        <p className="text-gray-600 mb-4">Upload your notebook files (PDF or Image).</p>
                        <input type="file" className="text-sm text-grey-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-brand-blue
                            hover:file:bg-blue-100" 
                        />
                        <div className="w-full mt-4">
                            <h4 className="font-semibold mb-2">Submission Status:</h4>
                            <ul>
                                <li className="flex justify-between py-1"><span>Physics Ch.1:</span> <span className="font-semibold text-green-600">Checked</span></li>
                                <li className="flex justify-between py-1"><span>Chemistry Ch.1:</span> <span className="font-semibold text-red-600">Rejected</span></li>
                                <li className="flex justify-between py-1"><span>Math Ch.1:</span> <span className="font-semibold text-yellow-600">Pending</span></li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const StudentPanel: React.FC = () => {
    const location = useLocation();
    const getHeaderTitle = () => "Student Dashboard";

    const navItems = [
        { path: '/student', label: 'Dashboard', icon: ICONS.dashboard },
        { path: '/student/chat', label: 'Chat', icon: ICONS.chat },
        { path: '/student/contacts', label: 'Contacts', icon: ICONS.contacts },
        { path: '/student/leaderboard', label: 'Leaderboard', icon: ICONS.leaderboard },
        { path: '/student/notebooks', label: 'Notebooks', icon: ICONS.notebook },
    ];

    return (
        <PanelLayout navItems={navItems} headerTitle={getHeaderTitle()}>
            <Routes>
                <Route index element={<StudentDashboard />} />
            </Routes>
        </PanelLayout>
    );
};

export default StudentPanel;
