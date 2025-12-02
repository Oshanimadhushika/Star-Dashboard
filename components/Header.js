'use client';

import React from 'react';
import { Layout, Avatar, Badge } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';

const { Header: AntHeader } = Layout;

export default function Header({ collapsed }) {
    const pathname = usePathname();

    const getTitle = () => {
        switch (pathname) {
            case '/':
                return 'Dashboard Overview';
            case '/user-management':
                return 'User Management';
            case '/creator-management':
                return 'Creator Management';
            case '/campaign-management':
                return 'Campaign Management';
            case '/video-moderation':
                return 'Video Moderation';
            case '/subscriptions':
                return 'Subscriptions';
            case '/analytics':
                return 'Analytics';
            case '/winners':
                return 'Winners';
            case '/settings':
                return 'Settings';
            default:
                return 'Dashboard';
        }
    };

    return (
        <AntHeader
            className="flex items-center justify-between px-6 bg-white dark:bg-black border-b border-gray-200 sticky top-0 z-50"
            style={{
                padding: '0 24px',
                // background: 'white', // Ensure white background
                height: '80px',
            }}
        >
            <div>
                <h2 className="text-xl font-bold text-black dark:text-white  m-0">
                    {getTitle()}
                </h2>
                <p className="text-gray-500 dark:text-gray-300  text-sm m-0 hidden sm:block">
                    Welcome back! Here's what's happening with Voice Star today.
                </p>
            </div>

            <div className="flex items-center gap-4">
                <Badge count={2} size="small">
                    <BellOutlined className="text-xl text-gray-600 dark:text-gray-300 cursor-pointer" />
                </Badge>
                <Avatar icon={<UserOutlined />} className="bg-gradient-to-r from-purple-500 to-pink-500 cursor-pointer" />
            </div>
        </AntHeader>
    );
}
