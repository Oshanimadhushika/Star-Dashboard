"use client";
import React, { useState } from "react";
import { Tabs, Input, Button, Avatar, Modal, ConfigProvider } from "antd";
import { Search, Eye, Trash2, Check, X, Video, TrendingUp, Award, Calendar, Phone, CheckCircle, XCircle } from "lucide-react";
import CustomTable from "@/components/CustomTable";
import CustomPagination from "@/components/CustomPagination";
import { UserOutlined } from "@ant-design/icons";

const StatCard = ({ icon: Icon, value, label, colorClass }) => (
    <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm bg-white">
        <Icon className={`${colorClass} mb-2`} size={24} />
        <div className="text-gray-500 text-xs mb-1">{label}</div>
        <div className="text-xl font-bold text-gray-900">{value}</div>
    </div>
);

const ReadOnlyInput = ({ label, value }) => (
    <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">{label}</label>
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 font-medium">
            {value}
        </div>
    </div>
);

export default function CreatorManagementPage() {
    const [activeTab, setActiveTab] = useState("1");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCreator, setSelectedCreator] = useState(null);

    // Dummy Data
    const dummyData = Array.from({ length: 12 }).map((_, i) => ({
        id: i + 1,
        name: "Sarah Johnson",
        username: "@sarah_johnson",
        avatar: null,
        totalVideos: 10,
        totalViews: "1,879",
        totalVotes: 539,
        approvalRate: "NaN%",
        joined: "Nov 2025",
        status: i % 3 === 0 ? "Approved" : i % 3 === 1 ? "Pending" : "Rejected",
        mobile: "0768888888",
        subscription: "Gold",
        lastActive: "11/25/2025",
        videos: Array.from({ length: 4 }).map((_, j) => ({
            id: j,
            title: "Amazing Cover - Shape of You",
            views: "5,777",
            votes: "255",
            status: "approved",
            date: "11/26/2025",
            thumbnail: ""
        }))
    }));

    const handleRowClick = (record) => {
        setSelectedCreator(record);
        setIsModalOpen(true);
    };

    const columns = [
        {
            title: "Creator",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <div className="flex items-center gap-3">
                    <Avatar size="large" icon={<UserOutlined />} src={record.avatar || null} className="bg-gray-200" />
                    <div>
                        <div className="font-medium text-gray-900">{text}</div>
                        <div className="text-xs text-gray-500">{record.username}</div>
                    </div>
                </div>
            ),
        },
        {
            title: "Total Videos",
            dataIndex: "totalVideos",
            key: "totalVideos",
            render: (text) => <span className="text-gray-600">{text}</span>,
        },
        {
            title: "Total Views",
            dataIndex: "totalViews",
            key: "totalViews",
            render: (text) => <span className="text-gray-600">{text}</span>,
        },
        {
            title: "Total Votes",
            dataIndex: "totalVotes",
            key: "totalVotes",
            render: (text) => <span className="text-gray-600">{text}</span>,
        },
        {
            title: "Joined",
            dataIndex: "joined",
            key: "joined",
            render: (text) => <span className="text-gray-500">{text}</span>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let styles = "";
                if (status === "Approved") styles = "bg-green-100 text-green-600 border-green-200";
                else if (status === "Pending") styles = "bg-orange-100 text-orange-600 border-orange-200";
                else if (status === "Rejected") styles = "bg-red-100 text-red-600 border-red-200";

                return (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <button className="text-purple-500 hover:bg-purple-50 p-1 rounded"><Eye size={18} /></button>
                    <button className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18} /></button>
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Creator Management</h1>
                <p className="text-slate-500">Manage content creators and their accounts</p>
            </div>

            <div className="flex flex-col gap-4 mb-6">
                <Tabs
                    defaultActiveKey="1"
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    className="custom-tabs gap-1"
                    items={[
                        { key: '1', label: 'All Creators' },
                        { key: '2', label: 'Pending' },
                        { key: '3', label: 'Approved' },
                        { key: '4', label: 'Rejected' },
                    ]}
                />

                <Input
                    prefix={<Search className="text-gray-400" size={18} />}
                    placeholder="Search by username or email"
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
                    className: "cursor-pointer hover:bg-gray-50",
                })}
            />

            <CustomPagination
                current={currentPage}
                total={dummyData.length * 5}
                pageSize={10}
                onChange={(page) => setCurrentPage(page)}
            />

            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            titleFontSize: 20,
                        },
                        Tabs: {
                            itemColor: '#64748b',
                            itemSelectedColor: '#10b981', // green-500
                            itemHoverColor: '#10b981',
                            inkBarColor: '#10b981',
                        }
                    }
                }}
            >
                <Modal
                    title={null}
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                    width={800}
                    centered
                    destroyOnClose
                    closeIcon={<X size={20} className="text-gray-500" />}
                    className="custom-modal"
                    styles={{
                        content: { padding: 0, borderRadius: '16px', overflow: 'hidden' }
                    }}
                >
                    {selectedCreator && (
                        <div>
                            {/* Header */}
                            <div className="p-6 bg-[#F0FDF4] border-b border-green-100">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                                        {selectedCreator.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-900 m-0">{selectedCreator.name}</h2>
                                        <div className="text-gray-500 text-sm mb-2">{selectedCreator.username}</div>
                                        <div className="flex items-center gap-3">
                                            <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-medium border border-green-200">
                                                Approved
                                            </span>
                                            <span className="text-gray-400 text-xs">Member since {selectedCreator.joined}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Stats Row */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    <StatCard icon={Video} label="Total Videos" value={selectedCreator.totalVideos} colorClass="text-purple-500" />
                                    <StatCard icon={Eye} label="Total Views" value={selectedCreator.totalViews} colorClass="text-blue-500" />
                                    <StatCard icon={TrendingUp} label="Total Votes" value={selectedCreator.totalVotes} colorClass="text-orange-500" />
                                    <StatCard icon={Award} label="Approval Rate" value={selectedCreator.approvalRate} colorClass="text-purple-500" />
                                </div>

                                <Tabs
                                    defaultActiveKey="1"
                                    className="mb-6"
                                    items={[
                                        {
                                            key: '1',
                                            label: 'Profile',
                                            children: (
                                                <div className="flex flex-col gap-8 mt-2">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Account Information</h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <ReadOnlyInput label="Mobile Number" value={selectedCreator.mobile} />
                                                            <ReadOnlyInput label="User Name" value={selectedCreator.username} />
                                                            <ReadOnlyInput label="Subscription Tier" value={selectedCreator.subscription} />
                                                            <ReadOnlyInput label="Last active" value={selectedCreator.lastActive} />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Creator Status</h3>
                                                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                                            <div className="text-sm font-medium text-gray-500 mb-4">
                                                                Current Status : <span className="text-gray-900 font-bold">Pending</span>
                                                            </div>
                                                            <div className="flex gap-4">
                                                                <Button
                                                                    size="large"
                                                                    className="flex-1 !bg-[#22c55e] !text-white hover:!bg-[#16a34a] !border-none !h-11 font-medium flex items-center justify-center gap-2"
                                                                >
                                                                    <CheckCircle size={18} /> Approve Creator
                                                                </Button>
                                                                <Button
                                                                    danger
                                                                    size="large"
                                                                    className="flex-1 !bg-[#ef4444] !text-white hover:!bg-[#dc2626] !border-none !h-11 font-medium flex items-center justify-center gap-2"
                                                                >
                                                                    <XCircle size={18} /> Reject Creator
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            <div className="border border-gray-100 rounded-xl p-4 text-center">
                                                                <div className="text-2xl font-bold text-gray-900">331</div>
                                                                <div className="text-xs text-gray-500">Avg. Views per Video</div>
                                                            </div>
                                                            <div className="border border-gray-100 rounded-xl p-4 text-center">
                                                                <div className="text-2xl font-bold text-gray-900">24</div>
                                                                <div className="text-xs text-gray-500">Avg. Votes per Video</div>
                                                            </div>
                                                            <div className="border border-gray-100 rounded-xl p-4 text-center">
                                                                <div className="text-2xl font-bold text-gray-900">NaN%</div>
                                                                <div className="text-xs text-gray-500">Content Approval Rate</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            key: '2',
                                            label: 'Videos',
                                            children: (
                                                <div className="flex flex-col gap-3 mt-2 max-h-[500px] overflow-y-auto pr-2">
                                                    {selectedCreator.videos.map((video) => (
                                                        <div key={video.id} className="flex gap-4 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                                            <div className="w-24 h-24 bg-gray-900 rounded-lg shrink-0 overflow-hidden relative group cursor-pointer">
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                <img
                                                                    src="https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop"
                                                                    alt="video thumbnail"
                                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                                        <Video size={14} className="text-white" fill="white" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                                <div className="flex justify-between items-start">
                                                                    <h4 className="font-medium text-gray-900 line-clamp-1">{video.title}</h4>
                                                                    <span className="text-xs text-gray-400">{video.date}</span>
                                                                </div>

                                                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                                                    <div className="flex items-center gap-1">
                                                                        <Eye size={14} /> {video.views}
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <TrendingUp size={14} /> {video.votes}
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider border border-green-200">
                                                                        {video.status}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                    )}
                </Modal>
            </ConfigProvider>
        </div>
    );
}
