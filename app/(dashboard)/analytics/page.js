"use client";
import React, { useState } from "react";
import { Select, ConfigProvider, Progress } from "antd";
import {
    Users,
    UserCheck,
    Video,
    DollarSign,
    Calendar,
    ChevronDown,
} from "lucide-react";
import CustomTable from "@/components/CustomTable";
import CustomPagination from "@/components/CustomPagination";

const AnalyticsPage = () => {
    const [dateRange, setDateRange] = useState("30");
    const [currentPage, setCurrentPage] = useState(1);

    // Mock Data based on the user's description and "2nd image has all content" requirement
    const stats = [
        {
            title: "Total Signups",
            value: "20",
            icon: <Users className="w-6 h-6 text-white" />,
            bgColor: "bg-blue-600",
        },
        {
            title: "Active Users",
            value: "50",
            icon: <UserCheck className="w-6 h-6 text-white" />,
            bgColor: "bg-green-600",
        },
        {
            title: "Videos Uploaded",
            value: "30",
            icon: <Video className="w-6 h-6 text-white" />,
            bgColor: "bg-purple-600",
        },
        {
            title: "Total Revenue",
            value: "$199.60",
            icon: <DollarSign className="w-6 h-6 text-white" />,
            bgColor: "bg-orange-500",
        },
    ];

    const signupTrends = [
        { date: "Nov 26", value: 24, percent: 30 },
        { date: "Nov 25", value: 54, percent: 60 },
        { date: "Nov 24", value: 77, percent: 85 },
        { date: "Nov 23", value: 33, percent: 40 },
        { date: "Nov 22", value: 60, percent: 70 },
        { date: "Nov 21", value: 50, percent: 55 },
        { date: "Nov 20", value: 20, percent: 25 },
        { date: "Nov 19", value: 24, percent: 30 },
        { date: "Nov 18", value: 15, percent: 20 },
        { date: "Nov 17", value: 10, percent: 15 },
    ];

    const revenueTrends = [
        { date: "Nov 26", value: "$197", percent: 45 },
        { date: "Nov 25", value: "$200", percent: 50 },
        { date: "Nov 24", value: "$250", percent: 65 },
        { date: "Nov 23", value: "$198", percent: 46 },
        { date: "Nov 22", value: "$210", percent: 52 },
        { date: "Nov 21", value: "$199", percent: 48 },
        { date: "Nov 20", value: "$168", percent: 40 },
        { date: "Nov 19", value: "$130", percent: 30 },
        { date: "Nov 18", value: "$120", percent: 28 },
        { date: "Nov 17", value: "$100", percent: 25 },
    ];

    const tableData = [
        {
            id: 1,
            date: "11/26/2025",
            signups: 23,
            activeUsers: 23,
            videos: 11,
            votes: 100,
            revenue: "$190.20",
        },
        {
            id: 2,
            date: "11/26/2025",
            signups: 22,
            activeUsers: 23,
            videos: 10,
            votes: 120,
            revenue: "$190.20",
        },
        {
            id: 3,
            date: "11/26/2025",
            signups: 11,
            activeUsers: 23,
            videos: 7,
            votes: 80,
            revenue: "$190.20",
        },
        {
            id: 4,
            date: "11/26/2025",
            signups: 10,
            activeUsers: 23,
            videos: 8,
            votes: 29,
            revenue: "$190.20",
        },
        {
            id: 5,
            date: "11/26/2025",
            signups: 14,
            activeUsers: 23,
            videos: 20,
            votes: 200,
            revenue: "$190.20",
        },
        {
            id: 6,
            date: "11/26/2025",
            signups: 12,
            activeUsers: 23,
            videos: 21,
            votes: 299,
            revenue: "$190.20",
        },
        {
            id: 7,
            date: "11/26/2025",
            signups: 20,
            activeUsers: 23,
            videos: 16,
            votes: 176,
            revenue: "$190.20",
        },
    ];

    const tableColumns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (text) => <span className="text-gray-500">{text}</span>,
        },
        {
            title: "SignUps",
            dataIndex: "signups",
            key: "signups",
            render: (text) => <span className="text-gray-500">{text}</span>,
        },
        {
            title: "Active Users",
            dataIndex: "activeUsers",
            key: "activeUsers",
            render: (text) => <span className="text-gray-500">{text}</span>,
        },
        {
            title: "Videos",
            dataIndex: "videos",
            key: "videos",
            render: (text) => <span className="text-gray-500">{text}</span>,
        },
        {
            title: "Votes",
            dataIndex: "votes",
            key: "votes",
            render: (text) => <span className="text-gray-500">{text}</span>,
        },
        {
            title: "Revenue",
            dataIndex: "revenue",
            key: "revenue",
            render: (text) => <span className="text-green-500 font-medium">{text}</span>,
        },
    ];

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#EC4899",
                    borderRadius: 8,
                },
            }}
        >
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Reports & Analytics
                        </h1>
                        <p className="text-gray-500">Platform performance insights</p>
                    </div>
                    <Select
                        defaultValue="30"
                        className="w-40"
                        onChange={(val) => setDateRange(val)}
                        suffixIcon={<ChevronDown className="w-4 h-4 text-gray-400" />}
                        options={[
                            { value: "7", label: "Last 7 Days" },
                            { value: "30", label: "Last 30 Days" },
                            { value: "90", label: "Last 3 Months" },
                        ]}
                    />
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between"
                        >
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">{stat.title}</span>
                                <span className="text-2xl font-bold mt-1 text-gray-900">
                                    {stat.value}
                                </span>
                            </div>
                            <div
                                className={`${stat.bgColor} p-3 rounded-lg shadow-sm flex items-center justify-center`}
                            >
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trends Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Signup Trends */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-6 text-gray-900">
                            Daily Signup Trends
                        </h3>
                        <div className="space-y-4">
                            {signupTrends.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 w-24 min-w-[6rem] text-gray-500 text-sm">
                                        <Calendar className="w-4 h-4" />
                                        <span>{item.date}</span>
                                    </div>
                                    <div className="flex-1 w-full relative h-8 bg-gray-50 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 rounded-full flex items-center justify-end px-3 text-white text-xs font-medium relative z-10"
                                            style={{ width: `${item.percent}%` }}
                                        >
                                            {item.value}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Revenue Trends */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-6 text-gray-900">
                            Daily Revenue Trend
                        </h3>
                        <div className="space-y-4">
                            {revenueTrends.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 w-24 min-w-[6rem] text-gray-500 text-sm">
                                        <Calendar className="w-4 h-4" />
                                        <span>{item.date}</span>
                                    </div>
                                    <div className="flex-1 w-full relative h-8 bg-gray-50 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-500 rounded-full flex items-center justify-end px-3 text-white text-xs font-medium relative z-10"
                                            style={{ width: `${item.percent}%` }}
                                        >
                                            {item.value}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Detailed Table */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg text-gray-900 px-1">
                        Detailed Analytics Table
                    </h3>
                    <CustomTable
                        columns={tableColumns}
                        dataSource={tableData}
                        loading={false}
                        rowKey="id"
                    />
                    <CustomPagination
                        current={currentPage}
                        total={50} // Mock total
                        pageSize={10}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </ConfigProvider>
    );
};

export default AnalyticsPage;
