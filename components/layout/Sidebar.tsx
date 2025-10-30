
import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ICONS } from '../../constants';

interface NavItem {
    path: string;
    label: string;
    icon: ReactNode;
}

interface SidebarProps {
    navItems: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ navItems }) => {
    const { logout } = useAuth();

    return (
        <div className="w-64 bg-brand-dark text-white flex flex-col min-h-screen">
            <div className="p-4 border-b border-gray-700">
                <h1 className="text-2xl font-bold text-center">Smart Campus Hub</h1>
                <p className="text-sm text-gray-400 text-center">Ramanujan Public School</p>
            </div>
            <nav className="flex-grow p-4">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                end
                                className={({ isActive }) =>
                                    `flex items-center p-3 my-2 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-brand-blue text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`
                                }
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={logout}
                    className="flex items-center w-full p-3 my-2 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
                >
                    <span className="mr-3">{ICONS.logout}</span>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
