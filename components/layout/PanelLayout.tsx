
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface NavItem {
    path: string;
    label: string;
    icon: ReactNode;
}

interface PanelLayoutProps {
    navItems: NavItem[];
    headerTitle: string;
    children: ReactNode;
}

const PanelLayout: React.FC<PanelLayoutProps> = ({ navItems, headerTitle, children }) => {
    return (
        <div className="flex">
            <Sidebar navItems={navItems} />
            <div className="flex-1 flex flex-col">
                <Header title={headerTitle} />
                <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default PanelLayout;
