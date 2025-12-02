'use client';

import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const { Content } = Layout;

export default function DashboardLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className="min-h-screen">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout
                style={{
                    marginLeft: collapsed ? 80 : 260,
                    transition: 'all 0.2s',
                    minHeight: '100vh'
                }}
            >
                <Header collapsed={collapsed} />
                <Content
                    className="p-6 bg-white  text-black "
                    style={{
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
