'use client';

import React from 'react';
import { Form, Input, Button } from 'antd';
import { AudioOutlined, MailOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { loginUser, authAdmin } from '@/app/services/authService';
import useLazyFetch from '@/app/hooks/useLazyFetch';
import { getCookie, setCookie, setLocalStorageData } from '@/app/helpers/storageHelper';

export default function LoginPage() {
    const router = useRouter();
    const [form] = Form.useForm();

    const { trigger: triggerLogin, loading: loginLoading } = useLazyFetch(loginUser);
    const { trigger: triggerAuth, loading: authLoading } = useLazyFetch(authAdmin);

    const onFinish = async (values) => {
        const response = await triggerLogin(values, {
            successMsg: true,
            errorMsg: true
        });


        if (response?.data.success) {
            setCookie('auth-token', response?.data?.data, 1);

            const authResponse = await triggerAuth(null, {
                successMsg: false,
                errorMsg: false
            });


            if (authResponse?.data?.success) {
                const userInfo = authResponse.data.data;
                if (userInfo) {
                    setLocalStorageData("userData", userInfo);
                }
                router.push('/');
            }
        }
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
                autoComplete="off"
                className="auth-form"
            >
                <Form.Item
                    label={<span className="text-white font-medium">Email</span>}
                    name="userName"
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                        { required: true, message: 'Email is required.' },
                        { type: 'email', message: 'Enter a valid email address.' }
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className="text-white/50" />}
                        placeholder="admin@example.com"
                        className="h-10 !bg-white/20 !border-white/30 text-white placeholder-white/50 hover:bg-white/30 !focus:bg-white/30 !focus:border-white/50"
                        style={{ color: 'white' }}
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
                            loading={loginLoading || authLoading}
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length ||
                                !form.getFieldValue('userName') ||
                                !form.getFieldValue('password')
                            }
                            className="h-10 w-full !bg-[#FF00DD] !border-none hover:bg-[#d900ad] font-semibold !text-white shadow-lg disabled:!bg-white/20 disabled:!text-white/50 disabled:!cursor-not-allowed"
                        >
                            Sign In
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </div>
    );
}
