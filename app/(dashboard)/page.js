'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLocalStoragedata } from '@/app/helpers/storageHelper';
import { Users, UserPlus, Activity, Video, Clock, Trophy, ThumbsUp, DollarSign } from 'lucide-react';

export default function DashboardOverview() {
    const router = useRouter();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const userData = getLocalStoragedata("userData");
        if (!userData || !userData.isActive) {
            router.push('/login');
        } else if (!isChecked) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsChecked(true);
        }
    }, [router, isChecked]);

    if (!isChecked) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white text-gray-800 p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-[#1e1e2d] mb-1">Super Admin Dashboard</h1>
            <p className="text-gray-500 mb-8">Welcome back! Here&apos;s what&apos;s happening with Voice Star today.</p>

            {/* Stats Grid - Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard
                    title="Total Users"
                    value="42,211"
                    subtext="+12.5% from last month"
                    subtextColor="text-green-500"
                    icon={<Users size={20} className="text-white" />}
                    iconBg="bg-[#00a3ff]"
                />
                <StatCard
                    title="New Signups Today"
                    value="0"
                    icon={<UserPlus size={20} className="text-white" />}
                    iconBg="bg-[#00d024]"
                />
                <StatCard
                    title="Active Users Today"
                    value="0"
                    icon={<Activity size={20} className="text-white" />}
                    iconBg="bg-[#3dd598]"
                />
                <StatCard
                    title="Total Creators"
                    value="56"
                    icon={<Users size={20} className="text-white" />}
                    iconBg="bg-[#00a3ff]"
                />
            </div>

            {/* Stats Grid - Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Videos"
                    value="42,211"
                    icon={<Video size={20} className="text-white" />}
                    iconBg="bg-[#d500f9]"
                />
                <StatCard
                    title="Pending Moderation"
                    value="40"
                    subtext="Need Attention"
                    subtextColor="text-orange-500"
                    icon={<Clock size={20} className="text-white" />}
                    iconBg="bg-[#ffab00]"
                />
                <StatCard
                    title="Active Campaigns"
                    value="7"
                    icon={<Trophy size={20} className="text-white" />}
                    iconBg="bg-[#00a3ff]"
                />
                <StatCard
                    title="Total Votes Today"
                    value="0"
                    icon={<ThumbsUp size={20} className="text-white" />}
                    iconBg="bg-[#00a3ff]"
                />
            </div>

            {/* Middle Section: Subscription & Revenue */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Subscription Summary */}
                <div className="bg-[#e4e5e7] rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="text-emerald-500"><DollarSign size={20} /></div>
                        <h3 className="font-bold text-lg text-[#1e1e2d]">Subscription Simmary</h3>
                    </div>

                    <div className="space-y-3">
                        <SubscriptionBar label="Free" count="37" />
                        <SubscriptionBar label="Silver" count="37" />
                        <SubscriptionBar label="Gold" count="37" highlight />
                        <SubscriptionBar label="Gold" count="37" color="purple" />
                    </div>
                </div>

                {/* Revenue Overview */}
                <div className="bg-[#e4e5e7] rounded-xl p-6 relative">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="text-emerald-500"><DollarSign size={20} /></div>
                        <h3 className="font-bold text-lg text-[#1e1e2d]">Revenue Overview</h3>
                    </div>

                    <div className="mb-12">
                        <p className="text-gray-500 text-sm mb-1">Today&apos;s Revenue</p>
                        <p className="text-3xl font-bold text-emerald-500">$0.00</p>
                    </div>

                    <div className="flex justify-between items-end mt-auto">
                        <div>
                            <p className="text-gray-500 text-sm">Weekly</p>
                            <p className="text-xl font-bold text-[#1e1e2d]">$0.00</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500 text-sm">Monthly(Est.)</p>
                            <p className="text-xl font-bold text-[#1e1e2d]">$0.00</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Activity & Trending */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Platform Activity Feed */}
                <div className="bg-[#e4e5e7] rounded-xl p-6">
                    <h3 className="font-bold text-lg text-[#1e1e2d] mb-6">Platform Activity Feed</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="bg-[#f0f1f3] p-4 rounded-lg flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-gray-500 mt-2 shrink-0"></div>
                                <div>
                                    <p className="text-[#1e1e2d] font-medium text-sm">Campaign updated: Audiobook Narration Contest</p>
                                    <p className="text-gray-400 text-xs">11/26/2025, 3:36:09 PM</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trending Videos */}
                <div className="bg-[#e4e5e7] rounded-xl p-6">
                    <h3 className="font-bold text-lg text-[#1e1e2d] mb-6">Trending Videos</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((rank) => (
                            <div key={rank} className="bg-[#f0f1f3] p-4 rounded-lg flex items-center gap-4">
                                <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center text-white font-bold ${rank === 1 ? 'bg-emerald-600' : (rank === 2 ? 'bg-emerald-600' : (rank === 3 ? 'bg-emerald-600' : 'bg-emerald-600'))}`}>
                                    {rank}
                                </div>
                                <div>
                                    <p className="text-[#1e1e2d] font-bold text-sm">Training Video Voice: 47</p>
                                    <p className="text-gray-400 text-xs">25,232 views • 1004 votes</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, subtext, subtextColor, icon, iconBg }) {
    return (
        <div className="bg-[#e4e5e7] rounded-xl p-5 flex justify-between items-start h-full">
            <div className="flex flex-col justify-between h-full">
                <div>
                    <p className="text-gray-500 text-sm mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-[#1e1e2d]">{value}</h3>
                </div>
                {subtext && <p className={`text-xs mt-2 ${subtextColor}`}>{subtext}</p>}
            </div>
            <div className={`${iconBg} p-2 rounded-lg`}>
                {icon}
            </div>
        </div>
    );
}

function SubscriptionBar({ label, count, highlight, color }) {
    let bgClass = "bg-[#f0f1f3]"; // Default gray
    if (highlight) bgClass = "bg-[#fff3cd]"; // Light yellow
    if (color === "purple") bgClass = "bg-[#e2d9f3]"; // Light purple

    let textColor = "text-gray-600";
    if (highlight) textColor = "text-orange-400";
    if (color === "purple") textColor = "text-purple-600";

    // For specific styling
    let labelColor = "text-[#1e1e2d]";
    if (highlight) labelColor = "text-orange-500";
    if (color === "purple") labelColor = "text-purple-600";

    return (
        <div className={`${bgClass} rounded-lg p-3 flex justify-between items-center`}>
            <span className={`font-medium ${labelColor} ml-2`}>{label}</span>
            <span className="text-gray-500 font-medium mr-2">{count}</span>
        </div>
    );
}
