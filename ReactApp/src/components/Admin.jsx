import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Admin = ({ onClose }) => {
    const [pendingRecycles, setPendingRecycles] = useState([]);

    useEffect(() => {
        const fetchPendingRecycles = async () => {
            try {
                const { data } = await axios.get('/admin/pending-recycles');
                if (data.success) {
                    setPendingRecycles(data.users);
                }
            } catch (error) {
                console.error('Error fetching pending recycles:', error);
            }
        };
        fetchPendingRecycles();
    }, []);

    const handleConfirm = async (userId, requestId) => {
        try {
            const { data } = await axios.post('/admin/confirm-recycle', { userId, requestId });
            if (data.success) {
                toast.success('Recycle request confirmed!');
                setPendingRecycles((prev) =>
                    prev.map((user) =>
                        user._id === userId
                            ? { ...user, pendingRecycle: user.pendingRecycle.filter((req) => req._id !== requestId) }
                            : user
                    )
                );
            }
        } catch (error) {
            console.error('Error confirming recycle request:', error);
            toast.error('Failed to confirm request.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="store-container bg-white p-6 rounded-xl shadow-lg w-[600px] relative">
                <span onClick={onClose} className="close-button right-5 text-xl">X</span>
                <h1 className="text-center text-4xl mb-4">Admin Panel</h1>
                {pendingRecycles.map((user) => (
                    <div key={user._id} className="mb-4">
                        <h3 className="font-bold">{user.name}</h3>
                        <ul>
                            {user.pendingRecycle.map((request) => (
                                <li key={request._id} className="flex justify-between items-center">
                                    <span>
                                        {request.type} - {request.weight}g - {request.pointsEarned} points
                                    </span>
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleConfirm(user._id, request._id)}
                                    >
                                        Confirm
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;