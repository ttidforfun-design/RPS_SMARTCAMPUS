
import React, { ReactNode } from 'react';

interface CardProps {
    title?: string;
    children: ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
            {title && <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>}
            {children}
        </div>
    );
};

export default Card;
