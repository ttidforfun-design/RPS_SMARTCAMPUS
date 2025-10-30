
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <div className="flex items-center">
                <div className="text-right mr-4">
                    <p className="font-semibold text-gray-700">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.social_id} ({user.role})</p>
                </div>
                <img
                    src={user.profile_photo}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                />
            </div>
        </header>
    );
};

export default Header;
