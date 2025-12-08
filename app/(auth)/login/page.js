'use client';

import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const clientReady = true;

    const onFinish = async (values) => {
        setLoading(true);
        setTimeout(() => {
            if (values.phoneNumber === '0000000000') {
                message.error('Invalid phone number or password.');
                setLoading(false);
            } else {
                message.success('Login successful!');
                router.push('/');
            }
        }, 1000);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div
            className="w-full max-w-[400px] p-8 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md bg-white/10 "
        >
            <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center mb-2 shadow-lg">
                    <AudioOutlined className="text-white text-xl" />
                </div>
                <h1 className="text-white text-xl font-bold">Voice Star</h1>
                <p className="text-white/60 text-sm">Admin Portal</p>
            </div>

            <Form
                form={form}
                name="login"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="auth-form"
            >
                <Form.Item
                    label={<span className="text-white font-medium">Phone Number</span>}
                    name="phoneNumber"
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                        { required: true, message: 'Phone number is required.' },
                        { pattern: /^[0-9]+$/, message: 'Enter a valid phone number.' },
                        { len: 10, message: 'Enter a valid phone number.' }
                    ]}
                >
                    <Input
                        maxLength={10}
                        placeholder="0000000000"
                        className="h-10 !bg-white/20 !border-white/30 text-white placeholder-white/50 hover:bg-white/30 !focus:bg-white/30 !focus:border-white/50"
                        style={{ color: 'white' }}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label={<span className="text-white font-medium">Password</span>}
                    name="password"
                    rules={[{ required: true, message: 'Password is required.' }]}
                >
                    <Input.Password
                        maxLength={30}
                        placeholder="*******"
                        className="h-10 !bg-white/20 !border-white/30 text-white placeholder-white/50 hover:bg-white/30 !focus:bg-white/30 !focus:border-white/50"
                        style={{ color: 'white' }}
                    />
                </Form.Item>

                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            htmlType="submit"
                            block
                            loading={loading}
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length ||
                                !form.getFieldValue('phoneNumber') ||
                                !form.getFieldValue('password')
                            }
                            className="h-10 w-full !bg-[#FF00DD] !border-none hover:bg-[#d900ad] font-semibold !text-white shadow-lg"
                        >
                            Sign In
                        </Button>
                    )}
                </Form.Item>



                <div className="text-center text-white mt-4">
                    Don&apos;t have an account?
                    <Link href="/register" className="ml-2 !text-blue-300 !hover:text-white text-sm">
                        Sign Up
                    </Link>
                </div>
            </Form>


        </div>
    );
}
