
import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { Role } from '../../types';
import { useApi } from '../../contexts/ApiContext';

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    allowedRoles: Role[];
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, allowedRoles }) => {
    const { addUser } = useApi();
    const [socialId, setSocialId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<Role>(allowedRoles[0]);
    const [userClass, setUserClass] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await addUser({
                name,
                role,
                class: (role === Role.Student || role === Role.Teacher) ? userClass : undefined,
                social_id: socialId,
                password, // This would be sent to the backend to be hashed
                email,
                profile_photo: `https://picsum.photos/seed/${Math.random()}/200`,
                class_points: 0,
                sports_points: 0,
            });
            onClose();
            // Reset form
            setSocialId(''); setPassword(''); setName(''); setUserClass(''); setEmail('');
        } catch (error) {
            console.error("Failed to add user", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Account">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select value={role} onChange={e => setRole(e.target.value as Role)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            {allowedRoles.map(r => <option key={r} value={r} className="capitalize">{r}</option>)}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Social ID (#0000)</label>
                        <input type="text" value={socialId} onChange={e => setSocialId(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    {(role === Role.Student || role === Role.Teacher) && (
                         <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Class</label>
                            <input type="text" value={userClass} onChange={e => setUserClass(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email (Optional)</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2">Cancel</button>
                    <button type="submit" disabled={isLoading} className="bg-brand-blue text-white px-4 py-2 rounded-md disabled:bg-blue-300">{isLoading ? 'Creating...' : 'Create Account'}</button>
                </div>
            </form>
        </Modal>
    );
};

export default AddUserModal;
