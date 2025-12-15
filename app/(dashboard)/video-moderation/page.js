"use client";
import React, { useState } from "react";
import { Tabs, Input, Button, Tag, Modal, ConfigProvider } from "antd";
import { Search, Flag, Check, X, Trash2, Play, Eye, TrendingUp, Calendar, Award, XCircle } from "lucide-react";
import CustomTable from "@/components/CustomTable";
import CustomPagination from "@/components/CustomPagination";

const { TabPane } = Tabs;

export default function VideoModerationPage() {
    const [activeTab, setActiveTab] = useState("1");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const dummyData = Array.from({ length: 12 }).map((_, i) => {
        const statuses = ["Approved", "Pending", "Flagged", "Rejected"];
        const status = statuses[i % 4];
        return {
            id: i + 1,
            title: "Amazing Cover - Shape of You",
            creator: "sarah_johnson",
            competitor: "Sarah Johnson",
            campaign: "Summer Idol 2025",
            views: "1,234",
            votes: "24",
            status: status,
            submittedDate: "Nov 07",
            totalVideos: 10,
            totalUserViews: "1,879",
            totalUserVotes: 539,
            thumbnail: "",
        };
    });

    const handleRowClick = (record) => {
        setSelectedVideo(record);
        setIsModalOpen(true);
    };

    const handleAction = (e, action, record) => {
        e.stopPropagation();
        console.log(`Action: ${action} on video ${record.id}`);
    };

    const getStatusBadge = (status) => {
        let styles = "";
        switch (status) {
            case "Approved":
                styles = "bg-green-100 text-green-600 border-green-200";
                break;
            case "Pending":
                styles = "bg-orange-100 text-orange-600 border-orange-200";
                break;
            case "Flagged":
                styles = "bg-pink-100 text-pink-600 border-pink-200";
                break;
            case "Rejected":
                styles = "bg-red-100 text-red-600 border-red-200";
                break;
            default:
                styles = "bg-gray-100 text-gray-600 border-gray-200";
        }
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles}`}>
                {status}
            </span>
        );
    };

    const columns = [
        {
            title: "User",
            dataIndex: "title",
            key: "title",
            render: (text, record) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                        <Play size={20} fill="currentColor" />
                    </div>
                    <span className="font-medium text-gray-700">{text}</span>
                </div>
            ),
        },
        {
            title: "Competitor",
            dataIndex: "competitor",
            key: "competitor",
            render: (text) => (
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    <span className="text-gray-500">{text}</span>
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
            render: (status) => getStatusBadge(status),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <button onClick={(e) => handleAction(e, "flag", record)} className="text-yellow-500 hover:bg-yellow-50 p-1 rounded">
                        <Flag size={16} />
                    </button>
                    <button onClick={(e) => handleAction(e, "delete", record)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Video Moderation</h1>
                <p className="text-slate-500">Review and moderate video submissions</p>
            </div>

            <div className="flex flex-col gap-4 mb-6">
                <Tabs
                    defaultActiveKey="1"
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    className="custom-tabs gap-1"
                    items={[
                        { key: '1', label: 'All' },
                        { key: '2', label: 'Pending' },
                        { key: '3', label: 'Approved' },
                        { key: '4', label: 'Rejected' },
                    ]}
                />

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
                    className: "cursor-pointer hover:bg-gray-50",
                })}
            />

            <CustomPagination
                current={currentPage}
                total={dummyData.length * 5}
                pageSize={10}
                onChange={(page) => setCurrentPage(page)}
            />

            {/* Video Detail Modal */}
            <Modal
                title={null}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={800}
                destroyOnClose
                centered
                closeIcon={<X size={20} className="text-gray-500" />}
                className="custom-modal"
                styles={{
                    content: { padding: 0, borderRadius: '16px', overflow: 'hidden' }
                }}
            >
                {selectedVideo && (
                    <div className="p-0">
                        {/* Header Section */}
                        <div className={`p-6 ${selectedVideo.status === 'Approved' ? 'bg-[#F0FDF4]' : 'bg-gray-50'} border-b border-gray-100`}>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    V
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 m-0">{selectedVideo.title}</h2>
                            </div>

                            <div className="flex items-center gap-4">
                                {getStatusBadge(selectedVideo.status)}
                                <div className="flex items-center gap-2 text-gray-600">
                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                        <Play size={12} className="text-gray-500" />
                                    </div>
                                    <span className="text-sm font-medium">{selectedVideo.creator}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-sm">
                                    <Eye className="text-blue-500 mb-2" size={24} />
                                    <div className="text-gray-500 text-sm mb-1">Total Views</div>
                                    <div className="text-xl font-bold text-gray-900">{selectedVideo.totalUserViews}</div>
                                </div>
                                <div className="border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-sm">
                                    <TrendingUp className="text-orange-500 mb-2" size={24} />
                                    <div className="text-gray-500 text-sm mb-1">Total Votes</div>
                                    <div className="text-xl font-bold text-gray-900">{selectedVideo.totalUserVotes}</div>
                                </div>
                                <div className="border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-sm">
                                    <Calendar className="text-gray-500 mb-2" size={24} />
                                    <div className="text-gray-500 text-sm mb-1">Submitted</div>
                                    <div className="text-xl font-bold text-gray-900">{selectedVideo.submittedDate}</div>
                                </div>
                                <div className="border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-sm">
                                    <Award className="text-purple-500 mb-2" size={24} />
                                    <div className="text-gray-500 text-sm mb-1">Campaign</div>
                                    <div className="text-xl font-bold text-gray-900">Voice</div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Video Preview (Left) */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Video Preview</h3>
                                    <div className="aspect-[3/4] bg-gray-700 rounded-lg flex flex-col items-center justify-center text-white cursor-pointer relative group overflow-hidden">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all"></div>
                                        <Play size={48} className="mb-2 relative z-10" fill="white" />
                                        <span className="relative z-10 font-medium">Video Preview</span>
                                        <span className="relative z-10 text-sm opacity-80">Click to play</span>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="flex-1 flex flex-col gap-8">
                                    {/* Creator Info */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Creator Information</h3>
                                        <div className="flex justify-between items-center text-center">
                                            <div>
                                                <div className="text-xl font-bold text-gray-900">{selectedVideo.totalVideos}</div>
                                                <div className="text-gray-500 text-sm">Total Videos</div>
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold text-gray-900">{selectedVideo.totalUserViews}</div>
                                                <div className="text-gray-500 text-sm">Total Views</div>
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold text-gray-900">{selectedVideo.totalUserVotes}</div>
                                                <div className="text-gray-500 text-sm">Total Votes</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Moderation Actions */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Moderation Actions</h3>
                                        <div className="flex flex-col gap-3">
                                            <Button
                                                danger
                                                size="large"
                                                className="w-full flex items-center justify-center gap-2 !bg-[#C03539] !text-white hover:!bg-[#a02c30] !border-none !h-12 !text-base"
                                            >
                                                <XCircle size={20} /> Reject Video
                                            </Button>
                                            <Button
                                                size="large"
                                                className="w-full flex items-center justify-center gap-2 !bg-[#659E75] !text-white hover:!bg-[#558b65] !border-none !h-12 !text-base"
                                            >
                                                <Flag size={20} /> Remove Flag
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <a href="#" className="flex items-center gap-2 !text-green-500 hover:text-green-600 font-medium">
                                    Open The Video in a new Tab <TrendingUp size={16} className="rotate-45" />
                                </a>
                            </div>

                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
