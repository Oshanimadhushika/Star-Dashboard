import React from 'react';
import { X, Trash2 } from 'lucide-react';

export default function NotificationsPopover({ onClose }) {
    const notifications = [
        {
            id: 1,
            title: 'New Video Submitted',
            description: 'CreatorPro submitted "Amazing Dance Performance" to Summer Vibes Campaign',
            time: 'Dec 1, 10:51 PM',
            read: true,
        },
        {
            id: 2,
            title: 'New Creator Application',
            description: 'Sarah Johnson has applied to become a creator on the platform',
            time: 'Dec 1, 10:51 PM',
            read: false,
        },
        {
            id: 3,
            title: 'New Creator Application',
            description: 'Sarah Johnson has applied to become a creator on the platform',
            time: 'Dec 1, 10:51 PM',
            read: true,
        },
        {
            id: 4,
            title: 'New Creator Application',
            description: 'Sarah Johnson has applied to become a creator on the platform',
            time: 'Dec 1, 10:51 PM',
            read: false,
        },
    ];

    return (
        <div className="w-[400px] font-sans">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div>
                    <h3 className="text-lg font-bold text-[#1e1e2d] m-0">Notifications</h3>
                    <p className="text-gray-500 text-xs m-0">All 29 Notifications</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="text-green-500 text-xs font-semibold hover:text-green-600">
                        Mark All Read
                    </button>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={18} />
                    </button>
                </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={`p-4 border-b border-gray-100 flex justify-between items-start gap-3 group hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-[#e0f7fa]' : 'bg-white'
                            }`}
                    >
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-[#1e1e2d] mb-1">{notif.title}</h4>
                            <p className="text-gray-600 text-sm mb-2 leading-snug">
                                {notif.description}
                            </p>
                            <p className="text-gray-400 text-xs">{notif.time}</p>
                        </div>
                        <button className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="p-3 text-center border-t border-gray-100 bg-gray-50">
                <button className="text-gray-600 font-bold text-sm hover:text-gray-800">
                    Show Less
                </button>
            </div>
        </div>
    );
}
