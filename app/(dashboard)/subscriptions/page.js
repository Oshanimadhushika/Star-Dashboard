'use client';
import React, { useState } from 'react';
import { DollarSign, Users, TrendingUp, CreditCard, Search, Bell } from 'lucide-react';
import CustomTable from '@/components/CustomTable';

export default function SubscriptionsPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchText, setSearchText] = useState('');

    const dataSource = [
        { id: 1, user: 'Sarah Johnson', tier: 'Platinum', amount: '$19.99', startDate: '11/25/2025', expireDate: '01/25/2026', status: 'Active' },
        { id: 2, user: 'Sarah Johnson', tier: 'Gold', amount: '$19.99', startDate: '11/25/2025', expireDate: '01/25/2026', status: 'Active' },
        { id: 3, user: 'Sarah Johnson', tier: 'Platinum', amount: '$19.99', startDate: '11/25/2025', expireDate: '01/25/2026', status: 'Active' },
        { id: 4, user: 'Sarah Johnson', tier: 'Platinum', amount: '$19.99', startDate: '11/25/2025', expireDate: '01/25/2026', status: 'Active' },
        { id: 5, user: 'Sarah Johnson', tier: 'Silver', amount: '$19.99', startDate: '11/25/2025', expireDate: '01/25/2026', status: 'Cancelled' },
        { id: 6, user: 'Sarah Johnson', tier: 'Platinum', amount: '$19.99', startDate: '11/25/2025', expireDate: '01/25/2026', status: 'Active' },
        { id: 7, user: 'Sarah Johnson', tier: 'Platinum', amount: '$19.99', startDate: '11/25/2025', expireDate: '01/25/2026', status: 'Expired' },
    ];

    const columns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: (text) => <span className="text-gray-600 font-medium">{text}</span>
        },
        {
            title: 'Tier',
            dataIndex: 'tier',
            key: 'tier',
            render: (tier) => <TierBadge tier={tier} />
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => (
                <span className="font-medium text-green-600">
                    {amount}<span className="text-gray-400 text-xs font-normal ml-1">per month</span>
                </span>
            )
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Expire',
            dataIndex: 'expireDate',
            key: 'expireDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <StatusBadge status={status} />
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <button className="bg-red-100 text-red-500 border border-red-500 px-4 py-1.5 rounded-md text-xs font-medium hover:bg-red-50 transition-colors">
                    Cancel
                </button>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-white p-6 lg:p-8">
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-lg font-bold text-gray-900">Subscription Management</h1>
                    <p className="text-gray-500 text-sm">Welcome back! Here&apos;s what&apos;s happening with Voice Star today.</p>
                </div>
                <div className="relative cursor-pointer">
                    <Bell className="text-gray-600" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">2</span>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#1e1e2d]">Subscription Management</h2>
                <p className="text-gray-500">Monitor and manage user subscriptions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Monthly Revenue"
                    value="$999.50"
                    icon={<DollarSign size={24} className="text-white" />}
                    iconBg="bg-green-500"
                />
                <StatCard
                    title="Active Subscriptions"
                    value="50"
                    icon={<Users size={24} className="text-white" />}
                    iconBg="bg-blue-600"
                />
                <StatCard
                    title="Growth Rate"
                    value="+12%"
                    icon={<TrendingUp size={24} className="text-white" />}
                    iconBg="bg-orange-500"
                />
                <StatCard
                    title="Churned"
                    value="4"
                    icon={<CreditCard size={24} className="text-white" />}
                    iconBg="bg-red-500"
                />
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
                <TabButton
                    label="All Subscriptions(10)"
                    isActive={activeTab === 'all'}
                    onClick={() => setActiveTab('all')}
                />
                <TabButton
                    label="Active(9)"
                    isActive={activeTab === 'active'}
                    variant="outline"
                    onClick={() => setActiveTab('active')}
                />
                <TabButton
                    label="Cancelled(1)"
                    isActive={activeTab === 'cancelled'}
                    variant="outline"
                    onClick={() => setActiveTab('cancelled')}
                />
                <TabButton
                    label="Expired(1)"
                    isActive={activeTab === 'expired'}
                    variant="outline"
                    onClick={() => setActiveTab('expired')}
                />
            </div>

            <div className="mb-6">
                <div className="bg-[#f9fafb] rounded-lg px-4 py-3 flex items-center border border-gray-100 max-w-md">
                    <Search className="text-gray-400 mr-3" size={20} />
                    <input
                        type="text"
                        placeholder="Search by email username"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400 text-sm"
                    />
                </div>
            </div>

            <div className="bg-white">
                <CustomTable
                    columns={columns}
                    dataSource={dataSource}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, iconBg }) {
    return (
        <div className="border border-gray-100 rounded-xl p-6 flex justify-between items-center bg-white shadow-sm">
            <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-[#1e1e2d]">{value}</h3>
            </div>
            <div className={`${iconBg} p-3 rounded-xl shadow-md`}>
                {icon}
            </div>
        </div>
    );
}

function TabButton({ label, isActive, onClick, variant = 'solid' }) {
    if (variant === 'solid' && isActive) {
        return (
            <button
                onClick={onClick}
                className="bg-[#ff4081] text-white px-6 py-2.5 rounded-lg font-medium text-sm shadow-md transition-colors"
            >
                {label}
            </button>
        );
    }
    return (
        <button
            onClick={onClick}
            className={`px-6 py-2.5 rounded-lg font-medium text-sm border transition-colors ${isActive ? 'border-gray-300 bg-gray-50 text-gray-900' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
        >
            {label}
        </button>
    );
}

function TierBadge({ tier }) {
    let styles = "bg-gray-100 text-gray-600";
    if (tier === 'Platinum') styles = "bg-[#a855f7] text-white border border-[#9333ea]";
    if (tier === 'Gold') styles = "bg-[#fbbf24] text-white border border-[#f59e0b]";
    if (tier === 'Silver') styles = "bg-[#9ca3af] text-white border border-[#6b7280]";

    return (
        <span className={`${styles} px-3 py-1 rounded-full text-xs font-medium inline-block min-w-[70px] text-center`}>
            {tier}
        </span>
    );
}

function StatusBadge({ status }) {
    let styles = "bg-gray-100 text-gray-600";
    if (status === 'Active') styles = "bg-green-100 text-green-600 border border-green-600";
    if (status === 'Cancelled') styles = "bg-red-100 text-red-500 border border-red-500";
    if (status === 'Expired') styles = "bg-gray-100 text-gray-500 border border-gray-500";

    return (
        <span className={`${styles} px-3 py-1 rounded-md text-xs font-medium inline-block min-w-[70px] text-center uppercase`}>
            {status}
        </span>
    );
}

