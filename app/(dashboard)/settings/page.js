'use client';
import React, { useState } from 'react';
import { User, Lock, Bell, CheckSquare, Square } from 'lucide-react';
import { Input, Button, Checkbox } from 'antd';

export default function SettingsPage() {
    const [notifications, setNotifications] = useState({
        email: true,
        video: false,
        campaign: false,
        reports: false
    });

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-white p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#1e1e2d] mb-1">Settings</h1>
                <p className="text-gray-500">Manage your account preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Profile Information */}
                <div className="border border-gray-100 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <User className="text-green-500" size={24} />
                        <h2 className="text-xl font-bold text-[#1e1e2d]">Profile Information</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <Input
                                placeholder="Full Name"
                                defaultValue="Supun perera"
                                className="!bg-[#f9fafb] !border-gray-200 !h-12 !text-base !rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <Input
                                placeholder="Email Address"
                                defaultValue="admin@voiceadmin.com"
                                className="!bg-[#f9fafb] !border-gray-200 !h-12 !text-base !rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <div className="w-full h-12 flex items-center px-3 bg-[#eef8ff] rounded-lg text-[#1e1e2d] font-medium border border-transparent">
                                Super Admin
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="border border-gray-100 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <Lock className="text-green-500" size={24} />
                        <h2 className="text-xl font-bold text-[#1e1e2d]">Security</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current password</label>
                            <Input.Password
                                placeholder="********"
                                className="!bg-[#f9fafb] !border-gray-200 !h-12 !text-base !rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <Input.Password
                                placeholder="********"
                                className="!bg-[#f9fafb] !border-gray-200 !h-12 !text-base !rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <Input.Password
                                placeholder="********"
                                className="!bg-[#f9fafb] !border-gray-200 !h-12 !text-base !rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification Preferences */}
            <div className="border border-gray-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                    <Bell className="text-green-500" size={24} />
                    <h2 className="text-xl font-bold text-[#1e1e2d]">Notification Preferences</h2>
                </div>

                <div className="space-y-6">
                    <NotificationItem
                        title="Email Notifications"
                        description="Receive email updates about platform activity"
                        checked={notifications.email}
                        onChange={() => toggleNotification('email')}
                    />
                    <NotificationItem
                        title="Video Moderation Alerts"
                        description="Get notified when videos need review"
                        checked={notifications.video}
                        onChange={() => toggleNotification('video')}
                    />
                    <NotificationItem
                        title="Campaign Reminders"
                        description="Reminders about upcoming campaigns"
                        checked={notifications.campaign}
                        onChange={() => toggleNotification('campaign')}
                    />
                    <NotificationItem
                        title="Weekly Reports"
                        description="Weekly summary of platform analytics"
                        checked={notifications.reports}
                        onChange={() => toggleNotification('reports')}
                    />
                </div>
            </div>
        </div>
    );
}

function NotificationItem({ title, description, checked, onChange }) {
    return (
        <div className="flex items-start gap-3 cursor-pointer" onClick={onChange}>
            <div className={`mt-1 w-6 h-6 rounded border flex items-center justify-center transition-colors ${checked ? 'bg-[#0000aa] border-[#0000aa]' : 'bg-white border-gray-300'}`}>
                {checked && <CheckSquare size={16} className="text-white" />}
                {!checked && <span className="opacity-0"><Square size={16} /></span>}
            </div>
            <div>
                <h3 className="font-bold text-[#1e1e2d]">{title}</h3>
                <p className="text-gray-500 text-sm">{description}</p>
            </div>
        </div>
    );
}

