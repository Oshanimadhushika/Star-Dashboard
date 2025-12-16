import React, { useState, useEffect } from 'react';
import { Input, Button, Modal, Upload, Select, DatePicker, Steps, InputNumber, Form } from 'antd';
import { Edit, Plus, UploadCloud, X, Check, CheckCircle } from 'lucide-react';
import { createCampaign, uploadCampaignImage } from '@/app/services/campaignService';
import useLazyFetch from '@/app/hooks/useLazyFetch';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

export default function CreateCampaign({ open, onCancel, onSuccess }) {
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [isStepValid, setIsStepValid] = useState(false);
    const [newRule, setNewRule] = useState('');

    const { trigger: triggerCreate, loading: createLoading } = useLazyFetch(createCampaign);
    const { trigger: triggerUpload, loading: uploadLoading } = useLazyFetch(uploadCampaignImage);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        pricePool: '',
        campaignImageUrl: null,
        enrollStartTime: null,
        completeTime: null,
        votingStartTime: null,
        reviewStartTime: null,
        maxParticipants: '',
        maxAgeLimit: '',
        minAgeLimit: 18,
        rules: [],
    });

    const stepFields = {
        0: ["title", "description", "pricePool"],
        1: [
            "enrollStartTime", "completeTime", "votingStartTime",
            "reviewStartTime",
            "maxParticipants", "maxAgeLimit"
        ],
        2: [],
        3: []
    };

    const validateCurrentStep = () => {
        if (!open) return;
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
        if (open) validateCurrentStep();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep]);

    useEffect(() => {
        if (open) {
            form.setFieldsValue(formData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep, form, open]);

    const onFormValuesChange = (allValues) => {
        setFormData(prev => ({ ...prev, ...allValues }));
        validateCurrentStep();
    };

    const handleNext = async () => {
        try {
            await form.validateFields(stepFields[currentStep]);
            setCurrentStep((prev) => prev + 1);
        } catch { }
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

    const handleReset = () => {
        setCurrentStep(0);
        form.resetFields();
        setImageUrl('');
        setFormData({
            title: '',
            description: '',
            pricePool: '',
            campaignImageUrl: null,
            enrollStartTime: null,
            completeTime: null,
            votingStartTime: null,
            reviewStartTime: null,
            maxParticipants: '',
            maxAgeLimit: '',
            minAgeLimit: 18,
            rules: [],
        });
        setNewRule('');
    };

    const handleModalCancel = () => {
        onCancel();
        handleReset();
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
                            disabled={uploadLoading}
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
                            {uploadLoading ? (
                                <div className="flex flex-col items-center justify-center py-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-2"></div>
                                    <p className="text-gray-400">Uploading...</p>
                                </div>
                            ) : (
                                <>
                                    <p className="ant-upload-drag-icon">
                                        <UploadCloud className="text-gray-400 mx-auto" />
                                    </p>
                                    <p className="text-gray-400">Click or drag file to upload</p>
                                </>
                            )}
                        </Upload.Dragger>
                    </Form.Item>
                    {imageUrl && (
                        <div className="mt-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
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

    return (
        <Modal
            title={<div className="text-white flex items-center gap-2"><Edit size={18} className="text-white" /> Create Campaign</div>}
            open={open}
            onCancel={handleModalCancel}
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
                                    maxParticipants: formValues.maxParticipants,
                                    maxAgeLimit: formValues.maxAgeLimit,
                                    minAgeLimit: formValues.minAgeLimit || 18,
                                    campaignRules: formValues.rules || [],
                                };

                                const res = await triggerCreate(payload, {
                                    successMsg: true,
                                    errorMsg: true
                                });

                                if (res?.data?.success) {
                                    handleReset();
                                    onSuccess();
                                    onCancel();
                                }
                            } catch (error) {
                                console.error("Error creating campaign:", error);
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
    );
}
