"use client";
import React, { useState } from "react";
import { Tabs, Input, Button, Avatar, Tag, ConfigProvider } from "antd";
import { Search, Ban } from "lucide-react";
import CustomTable from "@/components/CustomTable";
import CustomPagination from "@/components/CustomPagination";
import UserDetailsModal from "@/components/UserDetailsModal";
import { UserOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

export default function UserManagementPage() {
    const [activeTab, setActiveTab] = useState("1");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dummyData = Array.from({ length: 12 }).map((_, i) => ({
        id: i + 1,
        name: "Sarah Johnson",
        avatar: "",
        subscription: i % 3 === 0 ? "Gold" : i % 3 === 1 ? "Silver" : "Platinum",
        subscriptionColor: i % 3 === 0 ? "#EAB308" : i % 3 === 1 ? "#94A3B8" : "#A855F7",
        status: i === 4 ? "Suspended" : "Active",
        joined: "11/25/2025",
        lastActive: "11/25/2025",
        mobile: "0768888888"
    }));

    const handleBan = (e, record) => {
        e.stopPropagation();
        console.log("Ban user:", record);
    };

    const handleRowClick = (record) => {
        setSelectedUser(record);
        setIsModalOpen(true);
    };

    const columns = [
        {
            title: "User",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <div className="flex items-center gap-3">
                    <Avatar size="large" icon={<UserOutlined />} src={record.avatar || null} className="bg-gray-200" />
                    <span className="font-medium text-gray-700">{text}</span>
                </div>
            ),
        },
        {
            title: "Subscription",
            dataIndex: "subscription",
            key: "subscription",
            render: (text, record) => (
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: record.subscriptionColor }}></span>
                    <span className="text-gray-600">{text}</span>
                </div>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const isActive = status === "Active";
                return (
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${isActive
                            ? "bg-green-100 text-green-600 border-green-200"
                            : "bg-red-100 text-red-600 border-red-200"
                            }`}
                    >
                        {status}
                    </span>
                );
            },
        },
        {
            title: "Joined",
            dataIndex: "joined",
            key: "joined",
            render: (text) => <span className="text-gray-500">{text}</span>,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Button
                    danger
                    size="small"
                    className="flex items-center gap-1 !bg-red-50 hover:!bg-red-100 border-red-200 text-red-500"
                    onClick={(e) => handleBan(e, record)}
                >
                    <Ban size={14} /> Ban
                </Button>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
                <p className="text-slate-500">Manage platform users and their accounts</p>
            </div>

            <div className="flex flex-col gap-4 mb-6">
                <Tabs
                    defaultActiveKey="1"
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    className="custom-tabs gap-1"
                    items={[
                        { key: '1', label: 'All Users (97)' },
                        { key: '2', label: 'Banned (4)' },
                        { key: '3', label: 'Reported (7)' },
                    ]}
                />

                {/* Search */}
                <Input
                    prefix={<Search className="text-gray-400" size={18} />}
                    placeholder="Search by email username"
                    className="!bg-[#f9fafb] !border-none !h-12 !text-base !rounded-lg"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            <CustomTable
                columns={columns}
                dataSource={dummyData}
                loading={false}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                    style: { cursor: 'pointer' }
                })}
            />

            <CustomPagination
                current={currentPage}
                total={dummyData.length * 3}
                pageSize={10}
                onChange={(page) => setCurrentPage(page)}
            />

            <UserDetailsModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={selectedUser}
            />
        </div>
    );
}
