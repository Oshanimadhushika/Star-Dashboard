'use client';

import React from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';

export default function RegisterPage() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div
            className="w-full max-w-[400px] p-8 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md bg-white/10"
        >
            <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center mb-2 shadow-lg">
                    <UserOutlined className="text-white text-xl" />
                </div>
                <h1 className="text-white text-xl font-bold">Voice Star</h1>
                <p className="text-white/60 text-sm">Create Account</p>
            </div>

            <Form
                name="register"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="auth-form"
            >
                <Form.Item
                    label={<span className="text-white font-medium">Full Name</span>}
                    name="name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input
                        placeholder="John Doe"
                        className="h-10 bg-white/20 border-white/30 text-white placeholder-white/50 hover:bg-white/30 focus:bg-white/30 focus:border-white/50"
                        style={{ color: 'white' }}
                    />
                </Form.Item>

                <Form.Item
                    label={<span className="text-white font-medium">Email</span>}
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input
                        placeholder="john@example.com"
                        className="h-10 bg-white/20 border-white/30 text-white placeholder-white/50 hover:bg-white/30 focus:bg-white/30 focus:border-white/50"
                        style={{ color: 'white' }}
                    />
                </Form.Item>

                <Form.Item
                    label={<span className="text-white font-medium">Password</span>}
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        placeholder="*******"
                        className="h-10 bg-white/20 border-white/30 text-white placeholder-white/50 hover:bg-white/30 focus:bg-white/30 focus:border-white/50"
                        style={{ color: 'white' }}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className="h-10 bg-[#ff00cc] border-none hover:bg-[#d900ad] font-semibold text-white shadow-lg"
                    >
                        Sign Up
                    </Button>
                </Form.Item>

                <div className="text-center mt-4">
                    <Link href="/login" className="text-white/80 hover:text-white text-sm">
                        Already have an account? Sign In
                    </Link>
                </div>
            </Form>

            <style jsx global>{`
        .auth-form .ant-input-password .ant-input {
          background: transparent !important;
          color: white !important;
        }
        .auth-form .ant-input-password-icon {
          color: rgba(255, 255, 255, 0.7) !important;
        }
        .auth-form .ant-input::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }
      `}</style>
        </div>
    );
}
