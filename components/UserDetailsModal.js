"use client";
import React from "react";
import { Modal, Tabs, Button, Avatar, Input, Tag } from "antd";
import { UserOutlined, WarningOutlined, StopOutlined } from "@ant-design/icons";

const UserDetailsModal = ({ open, onClose, user }) => {
    if (!user) return null;

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={700}
            title={null}
            closeIcon={null}
            className="user-details-modal !p-0"
            centered
        >
            {/* Header */}
            <div className="flex items-start justify-between relative !bg-[#E7FFEB] p-6">
                <div className="flex items-center gap-4">
                    <Avatar
                        size={64}
                        icon={<UserOutlined />}
                        src={user.avatar || null}
                        className="bg-[#C00F75]"
                        style={{ backgroundColor: '#C00F75' }} // Matching the pink/purple color in image
                    />
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 m-0">{user.name}</h2>
                        <p className="text-gray-500 m-0">@{user.name.toLowerCase().replace(/\s/g, '_')}</p>
                        <div className="mt-2">
                            <Tag color="gold" className="border-none px-3 py-0.5 rounded-md text-yellow-700 bg-yellow-100 font-medium">
                                👑 {user.subscription || "Gold"}
                            </Tag>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 absolute top-4 right-4 p-2 font-bold"
                >
                    ✕
                </button>
            </div>

            {/* Tabs */}
            <Tabs
                defaultActiveKey="profile"
                items={[
                    {
                        key: 'profile',
                        label: 'Profile',
                        children: (
                            <div className="py-4">
                                <h3 className="text-lg font-bold mb-4">Account Information</h3>

                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Mobile Number</label>
                                        <div className="bg-gray-50 p-3 rounded-lg text-gray-700 font-medium">
                                            {user.mobile || "0768888888"}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">User Name</label>
                                        <div className="bg-gray-50 p-3 rounded-lg text-gray-700 font-medium">
                                            @{user.name.toLowerCase().replace(/\s/g, '_')}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Member Since</label>
                                        <div className="bg-gray-50 p-3 rounded-lg text-gray-700 font-medium">
                                            {user.joined || "November 25, 2025"}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Last active</label>
                                        <div className="bg-gray-50 p-3 rounded-lg text-gray-700 font-medium">
                                            {user.lastActive || "11/25/2025"}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-lg font-bold mb-4">Subscription Tier</h3>
                                    <div className="grid grid-cols-4 gap-4">
                                        {['Free', 'Silver', 'Gold', 'Platinum'].map((tier) => {
                                            const isActive = (user.subscription || "Gold") === tier;
                                            return (
                                                <div
                                                    key={tier}
                                                    className={`
                            text-center py-3 rounded-lg font-medium border
                            ${isActive
                                                            ? 'border-purple-200 text-purple-700 bg-purple-50'
                                                            : 'border-gray-100 text-gray-600 bg-white'}
                          `}
                                                >
                                                    {tier}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold mb-4">Account Actions</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button
                                            className="!h-12 !bg-amber-100 !text-amber-700 !border-none hover:!bg-amber-200 flex items-center justify-center gap-2 font-medium"
                                            block
                                        >
                                            <WarningOutlined /> Approve Creator
                                        </Button>
                                        <Button
                                            className="!h-12 !bg-red-400 !text-white !border-none hover:!bg-red-500 flex items-center justify-center gap-2 font-medium"
                                            block
                                            danger // keeping danger prop for semantics, though style is overridden
                                        >
                                            <StopOutlined /> Ban User
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ),
                    },
                    {
                        key: 'activity',
                        label: 'Activity',
                        children: (
                            <div className="py-8 text-center text-gray-500">
                                <p>Activity content loading...</p>
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                    <p>Recent logins, page views, and interactions will be listed here.</p>
                                </div>
                            </div>
                        ),
                    },
                    {
                        key: 'subscription',
                        label: 'Subscription',
                        children: (
                            <div className="py-8 text-center text-gray-500">
                                <p>Subscription history loading...</p>
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                    <p>Invoices, payment methods, and billing history.</p>
                                </div>
                            </div>
                        ),
                    },
                ]}
            />

            <style jsx global>{`
        .user-details-modal .ant-modal-content {
          border-radius: 16px;
          padding: 0;
          overflow: hidden;
        }
        .user-details-modal .ant-tabs-nav {
          margin-bottom: 0;
          border-bottom: 1px solid #f0f0f0;
          padding: 0 24px;
        }
        .user-details-modal .ant-tabs-content {
          padding: 0 24px 24px;
        }
        .user-details-modal .ant-tabs-tab {
          padding: 12px 16px;
          font-size: 16px;
          color: #6B7280;
        }
        .user-details-modal .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #10B981 !important; /* Green active tab color */
          font-weight: 500;
        }
        .user-details-modal .ant-tabs-ink-bar {
          background: #10B981 !important;
        }
        /* Custom close button in header overrides default */
        .user-details-modal .ant-modal-close {
          display: none;
        }
      `}</style>
        </Modal>
    );
};

export default UserDetailsModal;
