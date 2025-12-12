'use client';

import React, { useEffect, useState } from 'react';
import { Input, Button, Modal, Tabs, Upload, Select, DatePicker, Switch, Steps, InputNumber, message, ConfigProvider, Form, Table, Tag } from 'antd';
import { Search, Trophy, Calendar, Users, Video, Award, Eye, Edit, Plus, Info, UploadCloud, X, Check, CheckCircle, Save } from 'lucide-react';
import { createCampaign, uploadCampaignImage, getAllCampaigns } from '@/app/services/campaignService';
import CustomPagination from "@/components/CustomPagination";
import useLazyFetch from '@/app/hooks/useLazyFetch';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

export default function CampaignManagementPage() {
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
    const [isEditDirty, setIsEditDirty] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const [selectedCampaign, setSelectedCampaign] = useState(null);


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        campaignImageUrl: null,
        enrollStartTime: null,
        completeTime: null,
        votingStartTime: null,
        // votingEndTime: null,
        reviewStartTime: null,
        // reviewEndTime: null,
        maxParticipants: '',
        maxAgeLimit: '',
        minAgeLimit: 18,
        pricePool: '',
        // featured: false,
        // requiresApproval: false,
        // publicVoting: false,
        rules: [],
    });
    const [imageUrl, setImageUrl] = useState('');
    const [isStepValid, setIsStepValid] = useState(false);


    const { trigger: triggerCreate, loading: createLoading } = useLazyFetch(createCampaign);
    const { trigger: triggerFetch, loading: fetchLoading } = useLazyFetch(getAllCampaigns);
    const { trigger: triggerUpload, loading: uploadLoading } = useLazyFetch(uploadCampaignImage);

    const [fetchedCampaigns, setFetchedCampaigns] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [newRule, setNewRule] = useState('');
    const [activeTab, setActiveTab] = useState('1');


    const fetchCampaigns = async () => {
        let status = '';
        switch (activeTab) {
            case '2': status = 'active'; break;
            case '3': status = 'upcoming'; break;
            case '4': status = 'completed'; break;
            default: status = ''; break;
        }

        const params = {
            page: pagination.current,
            perPage: pagination.pageSize,
            search: searchQuery,
            campaignStatus: status
        };

        const res = await triggerFetch(params);
        if (res?.data?.success) {
            const { data, total, page, perPage } = res.data.data;

            setFetchedCampaigns(data);
            setPagination(prev => ({ ...prev, current: page, total, pageSize: perPage }));
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, [pagination.current, pagination.pageSize, searchQuery, activeTab]);


    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => { setIsModalOpen(false); setCurrentStep(0); };




    const stepFields = {
        0: ["title", "description", "pricePool"],
        1: [
            "enrollStartTime", "completeTime", "votingStartTime", // "votingEndTime",
            "reviewStartTime", // "reviewEndTime", 
            "maxParticipants", "maxAgeLimit"
        ],
        2: [],
        3: []
    };

    const validateCurrentStep = () => {
        if (!isModalOpen) return;
        const fieldsToValidate = stepFields[currentStep];

        const errors = form.getFieldsError(fieldsToValidate);
        const hasError = errors.some((field) => field.errors.length > 0);

        const values = form.getFieldsValue(fieldsToValidate);
        const hasEmptyFields = fieldsToValidate.some(field => {
            const value = values[field];
            return value === undefined || value === null || value === '';
        });


        setIsStepValid(!hasError && !hasEmptyFields);
    };

    useEffect(() => {
        validateCurrentStep();
    }, [currentStep, form]);

    useEffect(() => {
        if (isModalOpen) {
            form.setFieldsValue(formData);
        }
    }, [currentStep, form, isModalOpen]);


    const onFormValuesChange = (allValues) => {
        setFormData(prev => ({ ...prev, ...allValues }));
        validateCurrentStep();
    };


    const handleNext = async () => {
        try {
            await form.validateFields(stepFields[currentStep]);
            setCurrentStep((prev) => prev + 1);
        } catch {

        }
    };


    const handleBack = () => setCurrentStep(prev => prev - 1);

    const handleAddRule = () => {
        if (newRule.trim()) {
            const currentRules = form.getFieldValue('rules') || [];
            const updatedRules = [...currentRules, newRule];
            form.setFieldsValue({ rules: updatedRules });
            setFormData({ ...formData, rules: updatedRules });
            setNewRule('');
        }
    };

    const handleRemoveRule = (index) => {
        const currentRules = form.getFieldValue('rules') || [];
        const updatedRules = [...currentRules];
        updatedRules.splice(index, 1);
        form.setFieldsValue({ rules: updatedRules });
        setFormData({ ...formData, rules: updatedRules });
    };



    const steps = [
        {
            title: 'Basic Information',
            content: (
                <div className="flex flex-col gap-4">
                    <Form.Item
                        name="title"
                        label={<span className="text-white">Campaign Title *</span>}
                        rules={[
                            { required: true, message: 'Please enter campaign title' },
                            { min: 5, max: 50, message: 'Title must be between 5 and 50 characters' }
                        ]}
                    >
                        <Input

                            placeholder="Enter Campaign Title"
                            className="!bg-[#2e2e48] !border-[#444] !text-white placeholder-gray-500"
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label={<span className="text-white">Description *</span>}
                        rules={[
                            { required: true, message: 'Please enter description' },
                            { min: 20, max: 300, message: 'Description must be between 20 and 300 characters' }
                        ]}
                    >
                        <TextArea
                            rows={3}
                            placeholder="Description"
                            className="!bg-[#2e2e48] !border-[#444] !text-white placeholder-gray-500"
                        />
                    </Form.Item>
                    <Form.Item
                        name="pricePool"
                        label={<span className="text-white">Price amount *</span>}
                        rules={[{ required: true, message: 'Please enter price amount' }]}
                    >
                        <InputNumber
                            placeholder="Price"
                            className="!w-full !bg-[#2e2e48] !border-[#444] !text-white placeholder-gray-500 input-number-dark"
                            min={0}

                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value?.replace(/\D/g, '')}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="campaignImageUrl"
                        rules={[{ required: false, message: 'Please upload an image' }]}
                        style={{ display: 'none' }}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label={<span className="text-white">Campaign image(Optional)</span>}>
                        <Upload.Dragger
                            className="!bg-[#2e2e48] !border-[#444] !border-dashed hover:!border-purple-500"
                            accept="image/*"
                            showUploadList={true}
                            beforeUpload={async (file) => {
                                try {
                                    const imgForm = new FormData();
                                    imgForm.append("image", file);

                                    const res = await triggerUpload(imgForm, { successMsg: true, errorMsg: true });

                                    if (res?.data?.success) {

                                        const url = res.data.data.campaignImageUrl;

                                        setImageUrl(url);

                                        setFormData((prev) => ({
                                            ...prev,
                                            campaignImageUrl: url,
                                        }));

                                        form.setFieldValue("campaignImageUrl", url);
                                        onFormValuesChange({}, { ...form.getFieldsValue(), campaignImageUrl: url });
                                    }
                                } catch (err) {
                                    console.error("Upload failed", err);
                                }

                                return false;
                            }}
                        >
                            <>
                                <p className="ant-upload-drag-icon">
                                    <UploadCloud className="text-gray-400 mx-auto" />
                                </p>
                                <p className="text-gray-400">Click or drag file to upload</p>
                            </>
                        </Upload.Dragger>
                    </Form.Item>
                    {imageUrl && (
                        <div className="mt-3">
                            <img
                                src={imageUrl}
                                alt="Uploaded preview"
                                className="w-full h-40 object-cover rounded-md border border-[#444]"
                            />
                        </div>
                    )}
                </div >
            )
        },
        {
            title: 'Campaign Timeline',
            content: (
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item name="enrollStartTime" label={<span className="text-white">Enroll Start Date *</span>} rules={[{ required: true, message: 'Required' }]}>
                            <DatePicker
                                className="w-full !bg-[#2e2e48] !border-[#444] !text-white"
                                disabledDate={(current) => {
                                    return current && current < dayjs().startOf('day');
                                }}
                            />
                        </Form.Item>
                        <Form.Item name="reviewStartTime" label={<span className="text-white">Review Start Date*</span>} rules={[{ required: true, message: 'Required' }]}>
                            <DatePicker
                                className="w-full !bg-[#2e2e48] !border-[#444] !text-white"
                                disabledDate={(current) => {
                                    const enrollStart = form.getFieldValue('enrollStartTime');
                                    if (!enrollStart) return current && current < dayjs().startOf('day');
                                    return current && current < dayjs(enrollStart).endOf('day');
                                }}
                            />
                        </Form.Item>
                        <Form.Item name="votingStartTime" label={<span className="text-white">Voting Start Date *</span>} rules={[{ required: true, message: 'Required' }]}>
                            <DatePicker
                                className="w-full !bg-[#2e2e48] !border-[#444] !text-white"
                                disabledDate={(current) => {
                                    const reviewStart = form.getFieldValue('reviewStartTime');
                                    if (!reviewStart) return current && current < dayjs().startOf('day');
                                    return current && current < dayjs(reviewStart).endOf('day');
                                }}
                            />
                        </Form.Item>
                        <Form.Item name="completeTime" label={<span className="text-white">Complete Date *</span>} rules={[{ required: true, message: 'Required' }]}>
                            <DatePicker
                                className="w-full !bg-[#2e2e48] !border-[#444] !text-white"
                                disabledDate={(current) => {
                                    const votingStart = form.getFieldValue('votingStartTime');
                                    if (!votingStart) return false;
                                    return current && current <= dayjs(votingStart).endOf('day');
                                }}
                            />
                        </Form.Item>
                        {/* <Form.Item name="votingEndTime" label={<span className="text-white">Voting End Date *</span>} rules={[{ required: true, message: 'Required' }]}>
                            <DatePicker className="w-full !bg-[#2e2e48] !border-[#444] !text-white" />
                        </Form.Item> */}
                        {/* <Form.Item name="reviewEndTime" label={<span className="text-white">Review End *</span>} rules={[{ required: true, message: 'Required' }]}>
                            <DatePicker className="w-full !bg-[#2e2e48] !border-[#444] !text-white" />
                        </Form.Item> */}
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-3">Campaign Settings</h4>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <Form.Item name="maxParticipants" label={<span className="text-white">Max Participants *</span>} rules={[{ required: true, message: 'Required' }]}>
                                <Input placeholder="Leave empty for unlimited" className="!bg-[#2e2e48] !border-[#444] !text-white" type="number" />
                            </Form.Item>
                            <Form.Item name="maxAgeLimit" label={<span className="text-white">Max Age Restriction *</span>} rules={[{ required: true, message: 'Required' }]}>
                                <Input placeholder="No restriction" className="!bg-[#2e2e48] !border-[#444] !text-white" type="number" />
                            </Form.Item>
                        </div>

                        {/* <div className="flex flex-col gap-3">
                            <Form.Item name="featured" valuePropName="checked">
                                <div className="bg-[#2e2e48] p-3 rounded-lg flex justify-between items-center">
                                    <div>
                                        <div className="text-white font-medium">Featured Campaign</div>
                                        <div className="text-gray-400 text-xs">Show in featured section</div>
                                    </div>
                                    <Switch />
                                </div>
                            </Form.Item>
                            <div className="bg-[#2e2e48] p-3 rounded-lg flex justify-between items-center">
                                <div>
                                    <div className="text-white font-medium">Requires Approval</div>
                                    <div className="text-gray-400 text-xs">Manually approve participants before they can compete</div>
                                </div>
                                <Form.Item name="requiresApproval" valuePropName="checked" noStyle><Switch /></Form.Item>
                            </div>
                            <div className="bg-[#2e2e48] p-3 rounded-lg flex justify-between items-center">
                                <div>
                                    <div className="text-white font-medium">Public Voting</div>
                                    <div className="text-gray-400 text-xs">Allow Public to vote on submission</div>
                                </div>
                                <Form.Item name="publicVoting" valuePropName="checked" noStyle><Switch /></Form.Item>
                            </div>
                        </div> */}
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
                        <div className="text-right font-medium">{formData.title}</div>



                        <div className="text-gray-400">Prize</div>
                        <div className="text-right font-medium">{formData.pricePool}</div>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-semibold mb-2">Schedule & Settings</h4>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div className="text-gray-400">Campaign Start - End</div>
                            <div className="text-right">
                                {formData.enrollStartTime ? dayjs(formData.enrollStartTime).format('YYYY-MM-DD') : 'Not set'} -
                                {formData.completeTime ? dayjs(formData.completeTime).format('YYYY-MM-DD') : 'Not set'}
                            </div>                            <div className="text-gray-400">Voting Start - End</div>
                            <div className="text-right">
                                {formData.votingStartTime ? dayjs(formData.votingStartTime).format('YYYY-MM-DD') : 'Not set'} -
                                {formData.votingEndTime ? dayjs(formData.votingEndTime).format('YYYY-MM-DD') : 'Not set'}
                            </div>
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

    const handleEdit = (campaign) => {
        setSelectedCampaign(campaign);
        editForm.setFieldsValue({
            title: campaign.title,
            enrollStartTime: campaign.enrollStartTime ? dayjs(campaign.enrollStartTime) : null,
            completeTime: campaign.completeTime ? dayjs(campaign.completeTime) : null,
            status: campaign.status || 'Active',
        });
        setIsEditDirty(false);
        setIsEditModalOpen(true);
    };

    const handleLeaderboard = (campaign) => {
        setSelectedCampaign(campaign);
        setIsLeaderboardOpen(true);
    };

    const CampaignCard = ({ data }) => (
        <div className="bg-[#f2f2f2] p-6 rounded-xl flex flex-col justify-between h-full">
            <div>
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        {/* Use img tag for campaign image if available, else generic icon */}
                        {data.campaignImageUrl ? (
                            <img src={data.campaignImageUrl} alt={data.title} className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${data.iconColor}`}>
                                <Trophy size={20} />
                            </div>
                        )}
                        <h3 className="font-semibold text-lg line-clamp-1" title={data.title}>{data.title}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${data.statusColor}`}>
                        {data.status}
                    </span>
                </div>

                <div className="mb-6">
                    <p className="text-gray-400 text-xs mb-1">Duration</p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <Calendar size={16} />
                        <span>{data.enrollStartTime ? dayjs(data.enrollStartTime).format('YYYY-MM-DD') : 'N/A'} - {data.completeTime ? dayjs(data.completeTime).format('YYYY-MM-DD') : 'N/A'}</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 flex justify-between items-center mb-6">
                    <div className="text-center">
                        <div className="text-pink-500 flex justify-center mb-1"><Users size={18} /></div>
                        <div className="font-bold text-lg">{data.maxParticipants || "∞"}</div>
                        <div className="text-xs text-gray-400">Participants</div>
                    </div>
                    <div className="text-center">
                        <div className="text-purple-500 flex justify-center mb-1"><Video size={18} /></div>
                        <div className="font-bold text-lg">0</div>
                        <div className="text-xs text-gray-400">Videos</div>
                    </div>
                    <div className="text-center">
                        <div className="text-orange-500 flex justify-center mb-1"><Award size={18} /></div>
                        <div className="font-bold text-lg">0</div>
                        <div className="text-xs text-gray-400">Votes</div>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-auto">
                <Button
                    onClick={() => handleLeaderboard(data)}
                    className="flex-1 !bg-[#333] !text-white hover:!bg-[#444] !border-none h-10 flex items-center justify-center gap-2"
                >
                    <Eye size={16} /> LeaderBoard
                </Button>
                <Button
                    onClick={() => handleEdit(data)}
                    className="!bg-[#b30000] !text-white hover:!bg-[#cc0000] !border-none h-10 px-6 font-medium"
                >
                    Edit
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Campaign Management</h1>
                    <p className="text-slate-500">Create and manage campaigns</p>
                </div>
                <Button type="primary" icon={<Plus size={18} />} onClick={showModal} className="!bg-gradient-to-r !from-purple-500 !to-pink-500 !border-none !h-10 !px-6 !font-medium">
                    Create Campaigns
                </Button>
            </div>

            <div className="flex flex-col gap-2 mb-6">
                <Tabs
                    defaultActiveKey="1"
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    className="custom-tabs gap-1"
                    items={[
                        { key: '1', label: 'All Campaigns' },
                        { key: '2', label: 'Active' },
                        { key: '3', label: 'Upcoming' },
                        { key: '4', label: 'Past' },
                    ]}
                />
                <Input
                    prefix={<Search className="text-gray-400" size={18} />}
                    placeholder="Search by Campaign"
                    className="!bg-[#f5f5f5] !border-none !h-12 !text-base !rounded-lg"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setPagination(prev => ({ ...prev, current: 1 })); // Reset to page 1 on search
                    }}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {fetchedCampaigns.map(campaign => {
                    let statusColor = 'text-gray-600 bg-gray-100';
                    switch (campaign.status) {
                        case 'Active': statusColor = 'text-green-600 bg-green-100'; break;
                        case 'Upcoming': statusColor = 'text-blue-600 bg-blue-100'; break;
                        case 'Completed': statusColor = 'text-gray-600 bg-gray-100'; break;
                    }
                    return (
                        <CampaignCard
                            key={campaign.id}
                            data={{
                                ...campaign,
                                statusColor,
                                iconColor: 'bg-purple-100 text-purple-500'
                            }}
                        />
                    );
                })}
            </div>

            <CustomPagination
                current={pagination.current}
                total={pagination.total}
                pageSize={pagination.pageSize}
                onChange={(page) => setPagination(prev => ({ ...prev, current: page }))}
            />

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
                            colorTextDisabled: '#666',
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
                        <Form
                            form={form}
                            layout="vertical"
                            onValuesChange={onFormValuesChange}
                            initialValues={{
                                minAgeLimit: 18,
                            }}
                            requiredMark={false}
                        >
                            {steps[currentStep].content}
                        </Form>
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
                                disabled={!isStepValid}
                                className="flex-1 !bg-[#0000aa] !border-none !h-11 font-medium hover:!bg-[#0000cc] disabled:!bg-gray-600 disabled:!text-gray-400"
                            >
                                Next
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                onClick={async () => {
                                    try {

                                        const formValues = formData;

                                        console.log("formValues", formValues);


                                        const formatDate = (date) => {
                                            if (!date) return null;
                                            return dayjs(date).toISOString();
                                        };

                                        const payload = {
                                            title: formValues.title,
                                            description: formValues.description,
                                            pricePool: formValues.pricePool,
                                            campaignImageUrl: formValues.campaignImageUrl || imageUrl,
                                            enrollStartTime: formatDate(formValues.enrollStartTime),
                                            reviewStartTime: formatDate(formValues.reviewStartTime),
                                            votingStartTime: formatDate(formValues.votingStartTime),
                                            completeTime: formatDate(formValues.completeTime),
                                            // votingEndTime: formatDate(formValues.votingEndTime),
                                            // reviewEndTime: formatDate(formValues.reviewEndTime),
                                            maxParticipants: formValues.maxParticipants,
                                            maxAgeLimit: formValues.maxAgeLimit,
                                            minAgeLimit: formValues.minAgeLimit || 18,
                                            // featured: formValues.featured || false,
                                            // requiresApproval: formValues.requiresApproval || false,
                                            // publicVoting: formValues.publicVoting || false,
                                            campaignRules: formValues.rules || [],
                                        };


                                        const res = await triggerCreate(payload, {
                                            successMsg: true,
                                            errorMsg: true
                                        });

                                        if (res?.data?.success) {
                                            setIsModalOpen(false);
                                            setCurrentStep(0);
                                            form.resetFields();
                                            setImageUrl('');
                                            setFormData({
                                                title: '',
                                                description: '',
                                                price: '',
                                                campaignImageUrl: null,
                                                enrollStartTime: null,
                                                completeTime: null,
                                                votingStartTime: null,
                                                // votingEndTime: null,
                                                reviewStartTime: null,
                                                // reviewEndTime: null,
                                                maxParticipants: '',
                                                maxAgeLimit: '',
                                                minAgeLimit: 18,
                                                pricePool: '',
                                                // featured: false,
                                                // requiresApproval: false,
                                                // publicVoting: false,
                                                rules: [],
                                            });
                                            fetchCampaigns();
                                        }
                                    } catch (error) {
                                        console.error("Error creating campaign:", error);
                                        message.error("Failed to create campaign. Please check all fields.");
                                    }
                                }}


                                loading={createLoading}
                                className="flex-1 !bg-[#0000aa] !border-none !h-11 font-medium hover:!bg-[#0000cc]"
                            >
                                Done
                            </Button>
                        )}
                    </div>
                </Modal>



                <Modal
                    title={<div className="text-white flex items-center gap-2"><Edit size={18} /> Edit Campaign</div>}
                    open={isEditModalOpen}
                    onCancel={() => setIsEditModalOpen(false)}
                    footer={null}
                    styles={{ mask: { backdropFilter: 'blur(5px)' } }}
                    closeIcon={<X className="text-white" />}
                >
                    <Form form={editForm} layout="vertical" onValuesChange={() => setIsEditDirty(true)} onFinish={(values) => {
                        console.log("Updated Values:", values);
                        message.success("Campaign updated successfully (Mock)");
                        setIsEditModalOpen(false);
                    }}>
                        <Form.Item name="title" label={<span className="text-white">Campaign Title</span>} rules={[{ required: true }]}>
                            <Input className="!bg-[#2e2e48] !border-[#444] !text-white" />
                        </Form.Item>
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item name="enrollStartTime" label={<span className="text-white">Enroll Start</span>}>
                                <DatePicker className="w-full !bg-[#2e2e48] !border-[#444] !text-white" />
                            </Form.Item>
                            <Form.Item name="completeTime" label={<span className="text-white">End Date</span>}>
                                <DatePicker className="w-full !bg-[#2e2e48] !border-[#444] !text-white" />
                            </Form.Item>
                        </div>
                        <Form.Item name="status" label={<span className="text-white">Status</span>}>
                            <Select className="!bg-[#2e2e48]" classNames={{ popup: '!bg-[#2e2e48]' }} >
                                <Option value="Active">Active</Option>
                                <Option value="Upcoming">Upcoming</Option>
                                <Option value="Completed">Completed</Option>
                            </Select>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" disabled={!isEditDirty} className="w-full !bg-pink-600 !border-none h-10 disabled:!bg-gray-600 disabled:!text-gray-400">
                            Save Changes
                        </Button>
                    </Form>
                </Modal>

                <Modal
                    title={<div className="text-white flex items-center gap-2"><Trophy size={18} /> {selectedCampaign?.title} - Leaderboard</div>}
                    open={isLeaderboardOpen}
                    onCancel={() => setIsLeaderboardOpen(false)}
                    footer={null}
                    width={800}
                    styles={{ mask: { backdropFilter: 'blur(5px)' } }}
                    closeIcon={<X className="text-white" />}
                >
                    <Table
                        dataSource={[
                            { key: 1, rank: 1, name: 'Sarah J', song: 'Shape of You', votes: 1240 },
                            { key: 2, rank: 2, name: 'Mike T', song: 'Perfect', votes: 980 },
                            { key: 3, rank: 3, name: 'Jessica L', song: 'Halo', votes: 850 },
                        ]}
                        columns={[
                            { title: 'Rank', dataIndex: 'rank', key: 'rank', render: (r) => <div className="w-6 h-6 rounded-full bg-yellow-500 text-black font-bold flex items-center justify-center">{r}</div> },
                            { title: 'Participant', dataIndex: 'name', key: 'name', render: (t) => <span className="text-white font-medium">{t}</span> },
                            { title: 'Song', dataIndex: 'song', key: 'song', render: (t) => <span className="text-gray-400">{t}</span> },
                            { title: 'Votes', dataIndex: 'votes', key: 'votes', render: (v) => <span className="text-pink-500 font-bold">{v}</span> },
                        ]}
                        pagination={false}
                        className="custom-table mt-4"
                    />
                    <style jsx global>{`
                        .custom-table .ant-table { background: transparent; }
                        .custom-table .ant-table-thead > tr > th { background: #2a2a40; color: #a1a1aa; border-bottom: 1px solid #333; }
                        .custom-table .ant-table-tbody > tr > td { border-bottom: 1px solid #333; }
                        .custom-table .ant-table-tbody > tr:hover > td { background: #2a2a40 !important; }
                    `}</style>
                </Modal>

            </ConfigProvider>

        </div>
    );
}
