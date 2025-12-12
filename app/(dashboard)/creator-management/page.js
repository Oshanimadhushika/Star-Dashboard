"use client";
import React, { useState } from "react";
import { Tabs, Input, Button, Avatar, Tag } from "antd";
import { Search, Eye, Trash2, Check, X } from "lucide-react";
import CustomTable from "@/components/CustomTable";
import CustomPagination from "@/components/CustomPagination";

export default function CreatorManagementPage() {
    const [activeTab, setActiveTab] = useState("1");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Dummy Data based on screenshot
    const dummyData = Array.from({ length: 8 }).map((_, i) => ({
        id: i + 1,
        creator: "Amazing Cover - Shape of You",
        competitor: "Sarah Johnson",
        campaign: "Summer Idol 2025",
        views: i === 6 ? "8.7k" : i === 7 ? "150000" : "1,234",
        votes: i === 6 ? "98" : i === 7 ? "134" : "24",
        status: i === 4 ? "Pending" : i === 7 ? "Rejected" : "Approved",
    }));

    const columns = [
        {
            title: "Creator",
            dataIndex: "creator",
            key: "creator",
            render: (text) => <span className="text-gray-600 font-medium">{text}</span>,
        },
        {
            title: "Competitor",
            dataIndex: "competitor",
            key: "competitor",
            render: (text) => (
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    <span className="text-gray-600">{text}</span>
                </div>
            ),
        },
        {
            title: "Campaign",
            dataIndex: "campaign",
            key: "campaign",
            render: (text) => <span className="text-gray-500">{text}</span>,
        },
        {
            title: "Views",
            dataIndex: "views",
            key: "views",
            render: (text) => <span className="text-gray-500">{text}</span>,
        },
        {
            title: "Votes",
            dataIndex: "votes",
            key: "votes",
            render: (text) => <span className="text-gray-500">{text}</span>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let styles = "";
                if (status === "Approved") styles = "bg-green-100 text-green-600 border-green-200";
                else if (status === "Pending") styles = "bg-orange-100 text-orange-400 border-orange-200";
                else if (status === "Rejected") styles = "bg-red-100 text-red-600 border-red-200";

                return (
                    <span className={`px-3 py-1 rounded-md text-xs font-medium border ${styles}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => {
                if (record.status === "Pending") {
                    return (
                        <div className="flex gap-2">
                            <button className="text-purple-500 hover:text-purple-600"><Eye size={18} /></button>
                            <button className="text-green-500 hover:text-green-600"><Check size={18} /></button>
                            <button className="text-red-500 hover:text-red-600"><X size={18} /></button>
                        </div>
                    );
                }
                return (
                    <div className="flex gap-3">
                        <button className="text-purple-500 hover:text-purple-600"><Eye size={18} /></button>
                        <button className="text-red-500 hover:text-red-600"><Trash2 size={18} /></button>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                        <Tabs
                            defaultActiveKey="1"
                            activeKey={activeTab}
                            onChange={setActiveTab}
                            className="custom-tabs gap-1"
                            items={[
                                { key: '1', label: <span className="bg-pink-500 text-white px-3 py-1 rounded-md">All Creators (97)</span> },
                                { key: '2', label: 'Pending (4)' },
                                { key: '3', label: 'Approved (7)' },
                                { key: '4', label: 'Rejected (7)' },
                            ]}
                        />
                    </div>
                </div>

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
            />

            <CustomPagination
                current={currentPage}
                total={97}
                pageSize={10}
                onChange={(page) => setCurrentPage(page)}
            />
            <style jsx global>{`
                .custom-tabs .ant-tabs-nav::before { border-bottom: none !important; }
                .custom-tabs .ant-tabs-tab { 
                    background: transparent; 
                    border: 1px solid #e5e7eb; 
                    border-radius: 6px; 
                    padding: 8px 16px;
                    margin-right: 8px;
                }
                .custom-tabs .ant-tabs-tab-active { 
                    border-color: #d1d5db; 
                    background: #f3f4f6;
                }
                .custom-tabs .ant-tabs-ink-bar { display: none; }
            `}</style>
        </div>
    );
}
