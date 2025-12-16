import React, { useState, useEffect } from 'react';
import { Input, Button, Modal, Form, DatePicker, InputNumber } from 'antd';
import { Edit, Plus, X } from 'lucide-react';
import { updateCampaign } from '@/app/services/campaignService';
import useLazyFetch from '@/app/hooks/useLazyFetch';
import dayjs from 'dayjs';
const { TextArea } = Input;

export default function EditCampaign({ open, onCancel, onSuccess, campaign }) {
    const [editForm] = Form.useForm();
    const [isEditDirty, setIsEditDirty] = useState(false);
    const [initialFormValues, setInitialFormValues] = useState({});

    const { trigger: triggerUpdate, loading: updateLoading } = useLazyFetch(updateCampaign);

    useEffect(() => {
        if (campaign && open) {
            const values = {
                title: campaign.title,
                description: campaign.description,
                pricePool: campaign.pricePool,
                enrollStartTime: campaign.enrollStartTime ? dayjs(campaign.enrollStartTime) : null,
                reviewStartTime: campaign.reviewStartTime ? dayjs(campaign.reviewStartTime) : null,
                votingStartTime: campaign.votingStartTime ? dayjs(campaign.votingStartTime) : null,
                completeTime: campaign.completeTime ? dayjs(campaign.completeTime) : null,
                maxParticipants: campaign.maxParticipants,
                maxAgeLimit: campaign.maxAgeLimit,
                minAgeLimit: campaign.minAgeLimit,
                rules: campaign.campaignRules || [],
                status: campaign.status || 'Upcoming',
            };
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setInitialFormValues(values);
            editForm.setFieldsValue(values);
            setIsEditDirty(false);
        }
    }, [campaign, open, editForm]);

    useEffect(() => {
        if (campaign && !campaign.campaignRules) {
            editForm.setFieldValue('rules', []);
        }
    }, [campaign, editForm]);

    return (
        <Modal
            title={<div className="text-white flex items-center gap-2"><Edit size={18} /> Edit Campaign</div>}
            open={open}
            onCancel={onCancel}
            footer={null}
            styles={{ mask: { backdropFilter: 'blur(5px)' } }}
            closeIcon={<X className="text-white" />}
            width={700}
        >
            <Form
                form={editForm}
                layout="vertical"
                onValuesChange={(_, allValues) => {
                    if (!campaign) return;

                    const standardize = (val) => {
                        if (Array.isArray(val)) return JSON.stringify(val);
                        if (dayjs.isDayjs(val)) return val.toISOString();
                        if (val === null || val === undefined) return '';
                        return String(val).trim();
                    };

                    const isModified = Object.keys(initialFormValues).some(key => {

                        if (!Object.prototype.hasOwnProperty.call(allValues, key)) return false;
                        return standardize(allValues[key]) !== standardize(initialFormValues[key]);
                    });

                    setIsEditDirty(isModified);
                }}
                onFinish={async (values) => {
                    try {
                        const formatDate = (date) => date ? dayjs(date).toISOString() : null;

                        const payload = {
                            id: campaign.id,
                            title: values.title,
                            description: values.description,
                            pricePool: values.pricePool,
                            campaignImageUrl: campaign.campaignImageUrl,
                            enrollStartTime: formatDate(values.enrollStartTime),
                            reviewStartTime: formatDate(values.reviewStartTime),
                            votingStartTime: formatDate(values.votingStartTime),
                            completeTime: formatDate(values.completeTime),
                            maxParticipants: values.maxParticipants,
                            maxAgeLimit: values.maxAgeLimit,
                            minAgeLimit: values.minAgeLimit,
                            campaignRules: values.rules || []
                        };

                        const res = await triggerUpdate(payload, {
                            successMsg: true,
                            errorMsg: true
                        });

                        if (res?.data?.success) {
                            onSuccess();
                            onCancel();
                        }
                    } catch (error) {
                        console.error("Error updating campaign:", error);
                    }
                }}
            >
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        name="title"
                        label={<span className="text-white">Campaign Title</span>}
                        rules={[
                            { required: true, message: 'Please enter campaign title' },
                            { min: 5, max: 50, message: 'Title must be between 5 and 50 characters' }
                        ]}
                    >
                        <Input className="!bg-[#2e2e48] !border-[#444] !text-white" />
                    </Form.Item>
                    <Form.Item
                        name="pricePool"
                        label={<span className="text-white">Price Pool</span>}
                        rules={[{ required: true, message: 'Please enter price amount' }]}
                    >
                        <InputNumber
                            className="!w-full !bg-[#2e2e48] !border-[#444] !text-white input-number-dark"
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value?.replace(/\D/g, '')}
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    name="description"
                    label={<span className="text-white">Description</span>}
                    rules={[
                        { required: true, message: 'Please enter description' },
                        { min: 20, max: 300, message: 'Description must be between 20 and 300 characters' }
                    ]}
                >
                    <TextArea rows={3} className="!bg-[#2e2e48] !border-[#444] !text-white" />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="enrollStartTime" label={<span className="text-white">Enroll Start</span>} rules={[{ required: true, message: 'Required' }]}>
                        <DatePicker
                            className="w-full !bg-[#2e2e48] !border-[#444] !text-white disabled:!text-gray-500 disabled:!bg-[#28283d]"
                            disabled={campaign?.enrollStartTime && !dayjs(campaign.enrollStartTime).isAfter(dayjs(), 'day')}
                        />
                    </Form.Item>
                    <Form.Item name="reviewStartTime" label={<span className="text-white">Review Start</span>} rules={[{ required: true, message: 'Required' }]}>
                        <DatePicker
                            className="w-full !bg-[#2e2e48] !border-[#444] !text-white disabled:!text-gray-500 disabled:!bg-[#28283d]"
                            disabled={campaign?.reviewStartTime && !dayjs(campaign.reviewStartTime).isAfter(dayjs(), 'day')}
                        />
                    </Form.Item>
                    <Form.Item name="votingStartTime" label={<span className="text-white">Voting Start</span>} rules={[{ required: true, message: 'Required' }]}>
                        <DatePicker
                            className="w-full !bg-[#2e2e48] !border-[#444] !text-white disabled:!text-gray-500 disabled:!bg-[#28283d]"
                            disabled={campaign?.votingStartTime && !dayjs(campaign.votingStartTime).isAfter(dayjs(), 'day')}
                        />
                    </Form.Item>
                    <Form.Item name="completeTime" label={<span className="text-white">End Date</span>} rules={[{ required: true, message: 'Required' }]}>
                        <DatePicker
                            className="w-full !bg-[#2e2e48] !border-[#444] !text-white disabled:!text-gray-500 disabled:!bg-[#28283d]"
                            disabled={campaign?.completeTime && !dayjs(campaign.completeTime).isAfter(dayjs(), 'day')}
                        />
                    </Form.Item>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <Form.Item name="maxParticipants" label={<span className="text-white">Max Participants</span>} rules={[{ required: true, message: 'Required' }]}>
                        <Input type="number" className="!bg-[#2e2e48] !border-[#444] !text-white" />
                    </Form.Item>
                    <Form.Item name="minAgeLimit" label={<span className="text-white">Min Age</span>}>
                        <Input type="number" className="!bg-[#2e2e48] !border-[#444] !text-white" />
                    </Form.Item>
                    <Form.Item name="maxAgeLimit" label={<span className="text-white">Max Age</span>} rules={[{ required: true, message: 'Required' }]}>
                        <Input type="number" className="!bg-[#2e2e48] !border-[#444] !text-white" />
                    </Form.Item>
                </div>

                <Form.List name="rules">
                    {(fields, { add, remove }) => (
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-white">Campaign Rules</span>
                                <Button type="dashed" onClick={() => add()} size="small" icon={<Plus size={14} />} className="!text-white !border-[#444] !bg-black p-2">
                                    Add Rule
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {fields.map(({ key, ...restField }, index) => (
                                    <div key={key} className="flex gap-2">
                                        <Form.Item
                                            {...restField}
                                            noStyle
                                        >
                                            <Input className="!bg-[#2e2e48] !border-[#444] !text-white" placeholder="Rule" />
                                        </Form.Item>
                                        <Button
                                            type="text"
                                            onClick={() => remove(field.name)}
                                            className="!text-red-500 hover:!bg-red-500/10"
                                            icon={<X size={16} />}
                                        />
                                    </div>
                                ))}
                                {fields.length === 0 && <div className="text-gray-500 text-sm">No rules defined</div>}
                            </div>
                        </div>
                    )}
                </Form.List>

                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#333]">
                    <Button onClick={onCancel} className="!bg-transparent !border-[#444] !text-white">
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" loading={updateLoading} disabled={!isEditDirty} className="!bg-pink-600 !border-none px-6 shadow-lg shadow-pink-600/20">
                        Save Changes
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}
