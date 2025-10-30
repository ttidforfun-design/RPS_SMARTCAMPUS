
import React, { useState } from 'react';
import { Request, RequestStatus } from '../../types';
import { useApi } from '../../contexts/ApiContext';
import Card from '../ui/Card';
import { ICONS } from '../../constants';

interface RequestCardProps {
    request: Request;
    canApprove: boolean;
    onUpdate: () => void;
}

const statusColors = {
    [RequestStatus.Pending]: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    [RequestStatus.Approved]: 'bg-green-100 border-green-400 text-green-700',
    [RequestStatus.Rejected]: 'bg-red-100 border-red-400 text-red-700',
};

const statusText = {
    [RequestStatus.Pending]: 'Pending',
    [RequestStatus.Approved]: 'Approved',
    [RequestStatus.Rejected]: 'Rejected',
}

const RequestCard: React.FC<RequestCardProps> = ({ request, canApprove, onUpdate }) => {
    const { getUserById, updateRequestStatus } = useApi();
    const [rejectionReason, setRejectionReason] = useState('');
    const [isRejecting, setIsRejecting] = useState(false);
    
    const requester = getUserById(request.requester_id);
    const target = getUserById(request.target_id);

    const handleApprove = async () => {
        await updateRequestStatus(request.id, RequestStatus.Approved);
        onUpdate();
    };

    const handleReject = async () => {
        if (!rejectionReason) {
            alert('Please provide a reason for rejection.');
            return;
        }
        await updateRequestStatus(request.id, RequestStatus.Rejected, rejectionReason);
        setIsRejecting(false);
        onUpdate();
    };

    return (
        <Card className="mb-4">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gray-500">
                        From: <span className="font-semibold">{requester?.name} ({requester?.social_id})</span>
                    </p>
                    <p className="text-sm text-gray-500">
                        For: <span className="font-semibold">{target?.name} ({target?.social_id})</span>
                    </p>
                    <p className="text-gray-800 mt-2">{request.description}</p>
                    {request.status === RequestStatus.Rejected && request.reason && (
                         <p className="text-sm text-red-600 mt-1">Reason: {request.reason}</p>
                    )}
                </div>
                <div className={`px-3 py-1 text-sm font-semibold rounded-full border ${statusColors[request.status]}`}>
                    {statusText[request.status]}
                </div>
            </div>
            {canApprove && request.status === RequestStatus.Pending && (
                <div className="mt-4 pt-4 border-t">
                    {isRejecting ? (
                        <div className="flex items-center gap-2">
                           <input 
                                type="text"
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                placeholder="Rejection reason..."
                                className="flex-grow border rounded px-2 py-1"
                           />
                           <button onClick={handleReject} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Confirm</button>
                           <button onClick={() => setIsRejecting(false)} className="bg-gray-200 px-3 py-1 rounded">Cancel</button>
                        </div>
                    ) : (
                        <div className="flex justify-end gap-3">
                            <button onClick={handleApprove} className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                                {ICONS.check} <span className="ml-2">Accept</span>
                            </button>
                            <button onClick={() => setIsRejecting(true)} className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                                {ICONS.cross} <span className="ml-2">Reject</span>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
};

export default RequestCard;
