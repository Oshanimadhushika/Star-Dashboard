'use client';

import React, { useState } from 'react';
import { Input, Button, Modal, Tabs, Upload, Select, DatePicker, Switch, Steps, InputNumber, message, ConfigProvider } from 'antd';
import { Search, Trophy, Calendar, Users, Video, Award, Eye, Edit, Plus, Info, UploadCloud, X, Check, CheckCircle } from 'lucide-react';

const { TextArea } = Input;
const { Option } = Select;

export default function CampaignManagementPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        price: '',
        image: null,
        campaignDates: [],
        votingDates: [],
        reviewDates: [],
        maxParticipants: '',
        ageRestriction: '',
        featured: false,
        requiresApproval: false,
        publicVoting: false,
        rules: [],
    });
    const [newRule, setNewRule] = useState('');

    // Dummy Data matching the design
    const campaigns = [
        { id: 1, title: "Summer Idol 2025", status: "In Review", statusColor: "text-green-600 bg-green-100", duration: "2025-06-01 - 2025-08-31", participants: 342, videos: 1200, votes: "45,890", iconColor: "bg-pink-100 text-pink-500", hasWinner: false },
        { id: 2, title: "Voice-Teen", status: "Completed", statusColor: "text-purple-600 bg-purple-100", duration: "2025-09-01 - 2025-10-31", participants: 467, videos: 188, votes: "76,987", iconColor: "bg-pink-100 text-pink-500", hasWinner: true, winner: { name: "Sally Wilz", song: "Shape of u (Cover)", votes: "15.5k Votes", image: "https://i.pravatar.cc/150?u=a042581f4e29026024d" } },
        { id: 3, title: "Rising Star", status: "Voting Started", statusColor: "text-orange-500 bg-orange-100", duration: "2025-09-01 - 2025-10-31", participants: 120, videos: 450, votes: "12,300", iconColor: "bg-pink-100 text-pink-500", hasWinner: false },
        { id: 4, title: "Rising Star", status: "Voting Started", statusColor: "text-orange-500 bg-orange-100", duration: "2025-09-01 - 2025-10-31", participants: 120, videos: 450, votes: "12,300", iconColor: "bg-pink-100 text-pink-500", hasWinner: false }
    ];

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => { setIsModalOpen(false); setCurrentStep(0); };

    const handleNext = () => setCurrentStep(prev => prev + 1);
    const handleBack = () => setCurrentStep(prev => prev - 1);

    const handleAddRule = () => {
        if (newRule.trim()) {
            setFormData({ ...formData, rules: [...formData.rules, newRule] });
            setNewRule('');
        }
    };

    const handleRemoveRule = (index) => {
        const newRules = [...formData.rules];
        newRules.splice(index, 1);
        setFormData({ ...formData, rules: newRules });
    };

    // Modal Content Steps
    const steps = [
        {
            title: 'Basic Information',
            content: (
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-white mb-1">Campaign Title *</label>
                        <Input placeholder="Enter Campaign Title" className="!bg-[#2e2e48] !border-[#444] !text-white placeholder-gray-500" />
                    </div>
                    <div>
                        <label className="block text-white mb-1">Category *</label>
                        <Select placeholder="Select Category" className="w-full custom-select !bg-[#2e2e48]" dropdownStyle={{ backgroundColor: '#2e2e48', color: 'white' }}>
                            <Option value="music">Music</Option>
                            <Option value="dance">Dance</Option>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-white mb-1">Description *</label>
                        <TextArea rows={3} placeholder="Description" className="!bg-[#2e2e48] !border-[#444] !text-white placeholder-gray-500" />
                    </div>
                    <div>
                        <label className="block text-white mb-1">Price amount *</label>
                        <InputNumber placeholder="Price" className="w-full !bg-[#2e2e48] !border-[#444] !text-white placeholder-gray-500 input-number-dark" />
                    </div>
                    <div>
                        <label className="block text-white mb-1">Campaign image(Optional) *</label>
                        <Upload.Dragger className="!bg-[#2e2e48] !border-[#444] !border-dashed hover:!border-purple-500">
                            <p className="ant-upload-drag-icon"><UploadCloud className="text-gray-400 mx-auto" /></p>
                            <p className="text-gray-400">Upload an Image</p>
                        </Upload.Dragger>
                    </div>
                </div>
            )
        },
        {
            title: 'Campaign Timeline',
            content: (
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white mb-1">Campaign Start Date *</label>
                            <DatePicker className="w-full !bg-[#2e2e48] !border-[#444] !text-white" />
                        </div>
                        <div>
                            <label className="block text-white mb-1">Campaign End Date *</label>
                            <DatePicker className="w-full !bg-[#2e2e48] !border-[#444] !text-white" />
                        </div>
                        <div>
                            <label className="block text-white mb-1">Voting Start Date *</label>
                            <DatePicker className="w-full !bg-[#2e2e48] !border-[#444] !text-white" />
                        </div>
                        <div>
                            <label className="block text-white mb-1">Voting End Date *</label>
                            <DatePicker className="w-full !bg-[#2e2e48] !border-[#444] !text-white" />
                        </div>
                        <div>
                            <label className="block text-white mb-1">Review Start *</label>
                            <DatePicker className="w-full !bg-[#2e2e48] !border-[#444] !text-white" />
                        </div>
                        <div>
                            <label className="block text-white mb-1">Review End *</label>
                            <DatePicker className="w-full !bg-[#2e2e48] !border-[#444] !text-white" />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-3">Campaign Settings</h4>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-white mb-1">Max Participants *</label>
                                <Input placeholder="Leave empty for unlimited" className="!bg-[#2e2e48] !border-[#444] !text-white" />
                            </div>
                            <div>
                                <label className="block text-white mb-1">Age Restriction *</label>
                                <Input placeholder="No restriction" className="!bg-[#2e2e48] !border-[#444] !text-white" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="bg-[#2e2e48] p-3 rounded-lg flex justify-between items-center">
                                <div>
                                    <div className="text-white font-medium">Featured Campaign</div>
                                    <div className="text-gray-400 text-xs">Show in featured section with special highlighting</div>
                                </div>
                                <Switch />
                            </div>
                            <div className="bg-[#2e2e48] p-3 rounded-lg flex justify-between items-center">
                                <div>
                                    <div className="text-white font-medium">Requires Approval</div>
                                    <div className="text-gray-400 text-xs">Manually approve participants before they can compete</div>
                                </div>
                                <Switch />
                            </div>
                            <div className="bg-[#2e2e48] p-3 rounded-lg flex justify-between items-center">
                                <div>
                                    <div className="text-white font-medium">Public Voting</div>
                                    <div className="text-gray-400 text-xs">Allow Public to vote on submission</div>
                                </div>
                                <Switch />
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: 'Rules',
            content: (
                <div>
                    <label className="block text-white mb-2">Campaign Rules</label>
                    <div className="flex flex-col gap-3 mb-4">
                        {formData.rules.map((rule, index) => (
                            <div key={index} className="flex items-center gap-2 bg-[#2e2e48] p-3 rounded-lg border border-[#444]">
                                <div className="w-6 h-6 rounded-full bg-[#5b43d6] flex items-center justify-center text-white text-xs font-bold shrink-0">{index + 1}</div>
                                <span className="text-white flex-1">{rule}</span>
                                <button onClick={() => handleRemoveRule(index)} className="text-red-500 hover:text-red-400"><X size={16} /></button>
                            </div>
                        ))}
                        {formData.rules.length === 0 && <div className="text-gray-500 text-center py-4">No rules added yet</div>}
                    </div>

                    <div className="flex gap-2 mb-4">
                        <Input
                            value={newRule}
                            onChange={(e) => setNewRule(e.target.value)}
                            placeholder="Type a rule..."
                            className="!bg-[#2e2e48] !border-[#444] !text-white"
                            onPressEnter={handleAddRule}
                        />
                    </div>
                    <Button type="primary" block onClick={handleAddRule} className="!bg-[#5b43d6] !h-10">+ Add Rule</Button>
                </div>
            )
        },
        {
            title: 'Review',
            content: (
                <div className="text-white">
                    <h3 className="text-lg font-bold mb-4">Review Your Campaign</h3>

                    <div className="grid grid-cols-2 gap-y-4 text-sm mb-6">
                        <div className="text-gray-400">Title</div>
                        <div className="text-right font-medium">Hiru</div>

                        <div className="text-gray-400">Category</div>
                        <div className="text-right font-medium">Rock</div>

                        <div className="text-gray-400">Prize</div>
                        <div className="text-right font-medium">$10000</div>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-semibold mb-2">Schedule & Settings</h4>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div className="text-gray-400">Campaign Start - End</div>
                            <div className="text-right">mm/dd/yy - mm/dd/yy</div>
                            <div className="text-gray-400">Voting Start - End</div>
                            <div className="text-right">mm/dd/yy - mm/dd/yy</div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Rules({formData.rules.length})</h4>
                        <ul className="list-decimal list-inside text-gray-300 space-y-1">
                            {formData.rules.map((rule, i) => <li key={i}>{rule}</li>)}
                            {formData.rules.length === 0 && <li>No rules defined</li>}
                        </ul>
                    </div>
                </div>
            )
        }
    ];

    // Campaign Card Component
    const CampaignCard = ({ data }) => (
        <div className="bg-[#f2f2f2] p-6 rounded-xl flex flex-col justify-between h-full">
            <div>
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${data.iconColor}`}>
                            <Trophy size={20} />
                        </div>
                        <h3 className="font-semibold text-lg">{data.title}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${data.statusColor}`}>
                        {data.status}
                    </span>
                </div>

                <div className="mb-6">
                    <p className="text-gray-400 text-xs mb-1">Duration</p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <Calendar size={16} />
                        <span>{data.duration}</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 flex justify-between items-center mb-6">
                    <div className="text-center">
                        <div className="text-pink-500 flex justify-center mb-1"><Users size={18} /></div>
                        <div className="font-bold text-lg">{data.participants}</div>
                        <div className="text-xs text-gray-400">Participants</div>
                    </div>
                    <div className="text-center">
                        <div className="text-purple-500 flex justify-center mb-1"><Video size={18} /></div>
                        <div className="font-bold text-lg">{data.videos}</div>
                        <div className="text-xs text-gray-400">Videos</div>
                    </div>
                    <div className="text-center">
                        <div className="text-orange-500 flex justify-center mb-1"><Award size={18} /></div>
                        <div className="font-bold text-lg">{data.votes}</div>
                        <div className="text-xs text-gray-400">Votes</div>
                    </div>
                </div>

                {data.hasWinner && data.winner && (
                    <div className="bg-[#fcf8e3] border border-[#faebcc] p-3 rounded-lg flex items-center gap-3 mb-6">
                        <img src={data.winner.image} alt={data.winner.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                            <div className="text-sm font-bold flex items-center gap-1">
                                <span className="text-yellow-500">♛</span> Winner : {data.winner.name}
                            </div>
                            <div className="text-xs text-gray-500">
                                {data.winner.song} • {data.winner.votes}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-3 mt-auto">
                <Button className="flex-1 bg-[#333] text-white hover:!bg-[#444] border-none h-10 flex items-center justify-center gap-2">
                    <Eye size={16} /> LeaderBoard
                </Button>
                <Button className="bg-[#b30000] text-white hover:!bg-[#cc0000] border-none h-10 px-6 font-medium">
                    Edit
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Campaign Management</h1>
                    <p className="text-slate-500">Create and manage campaigns</p>
                </div>
                <Button type="primary" icon={<Plus size={18} />} onClick={showModal} className="!bg-gradient-to-r !from-purple-500 !to-pink-500 !border-none !h-10 !px-6 !font-medium">
                    Create Campaigns
                </Button>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4 mb-6">
                <Tabs
                    defaultActiveKey="1"
                    className="custom-tabs"
                    items={[
                        { key: '1', label: <span className="px-4 py-1 bg-pink-500 text-white rounded-md">All Campaigns</span> },
                        { key: '2', label: 'Active' },
                        { key: '3', label: 'Upcoming' },
                        { key: '4', label: 'Past' },
                    ]}
                />
                <Input prefix={<Search className="text-gray-400" size={18} />} placeholder="Search by Campaign" className="!bg-[#f5f5f5] !border-none !h-12 !text-base !rounded-lg" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {campaigns.map(campaign => <CampaignCard key={campaign.id} data={campaign} />)}
            </div>

            {/* Custom Dark Theme Modal */}
            <ConfigProvider
                theme={{
                    token: {
                        colorBgElevated: '#151529',
                        colorText: 'white',
                        colorIcon: 'white',
                        colorIconHover: '#ccc',
                        colorTextHeading: 'white',
                    },
                    components: {
                        Modal: {
                            headerBg: '#151529',
                            contentBg: '#151529',
                            titleColor: 'white',
                        },
                        Select: {
                            selectorBg: '#2e2e48',
                            optionSelectedBg: '#3b3b58',
                            colorBorder: '#444',
                            colorTextPlaceholder: '#888',
                        },
                        Input: {
                            colorBgContainer: '#2e2e48',
                            colorBorder: '#444',
                            colorTextPlaceholder: '#888',
                        },
                        DatePicker: {
                            colorBgContainer: '#2e2e48',
                            colorBorder: '#444',
                            colorTextPlaceholder: '#888',
                        },
                        InputNumber: {
                            colorBgContainer: '#2e2e48',
                            colorBorder: '#444',
                            colorTextPlaceholder: '#888',
                        }
                    }
                }}
            >
                <Modal
                    title={<div className="text-white flex items-center gap-2"><Trophy size={18} className="text-white" /> Create Campaign</div>}
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                    width={600}
                    styles={{
                        mask: { backdropFilter: 'blur(5px)' }
                    }}
                    closeIcon={<X className="text-white" />}
                >
                    <div className="mb-6 mt-5 w-1/2 mx-auto justify-center items-center">
                        <Steps
                            current={currentStep}
                            size="small"
                            className="custom-steps "
                            items={steps.map((_, i) => ({
                                title: '',
                                icon: i === currentStep ?
                                    <div className="!w-10 !h-10 !min-w-[40px] !min-h-[40px] rounded-full bg-transparent border-2 border-purple-500 text-purple-500 flex items-center justify-center"><Edit size={16} /></div> :
                                    (i < currentStep ? <CheckCircle size={32} className="text-green-500" /> : <div className="!w-8 !h-8 !min-w-[32px] !min-h-[32px] rounded-full bg-[#2e2e48] flex items-center justify-center text-gray-500"><Check size={14} /></div>)
                            }))}
                        />
                    </div>

                    <div className="bg-black text-white px-1 py-2 rounded-md mb-6 text-center font-medium">
                        Step {currentStep + 1}: {steps[currentStep].title}
                    </div>

                    <div className="min-h-[300px]">
                        {steps[currentStep].content}
                    </div>

                    <div className="flex gap-4 mt-8 pt-4 border-t border-[#333]">
                        {currentStep > 0 && (
                            <Button
                                onClick={handleBack}
                                className="flex-1 !bg-black !border-[#444] !text-white !h-11 font-medium hover:!border-gray-500"
                            >
                                Back
                            </Button>
                        )}
                        {currentStep < steps.length - 1 ? (
                            <Button
                                type="primary"
                                onClick={handleNext}
                                className="flex-1 !bg-[#0000aa] !border-none !h-11 font-medium hover:!bg-[#0000cc]"
                            >
                                Next
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                onClick={handleCancel}
                                className="flex-1 !bg-[#0000aa] !border-none !h-11 font-medium hover:!bg-[#0000cc]"
                            >
                                Done
                            </Button>
                        )}
                    </div>
                </Modal>
            </ConfigProvider>

            {/* Global style override for Select dropdowns only as they are portals */}
            <style jsx global>{`
                .custom-select .ant-select-selector { background-color: #2e2e48 !important; border-color: #444 !important; color: white !important; }
                .custom-select .ant-select-arrow { color: white !important; }
                .input-number-dark .ant-input-number-handler-wrap { background-color: #444 !important; }
            `}</style>
        </div>
    );
}
