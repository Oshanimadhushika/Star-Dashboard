"use client";
import React from "react";
import { Pagination, ConfigProvider } from "antd";

const CustomPagination = ({ current, total, pageSize, onChange, className = "" }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#EC4899", // pink-500
                },
            }}
        >
            <div className={`flex justify-end py-4 ${className}`}>
                <Pagination
                    current={current}
                    total={total}
                    pageSize={pageSize}
                    onChange={onChange}
                    showSizeChanger={false}
                    className="custom-pagination"
                />
                <style jsx global>{`
            .custom-pagination .ant-pagination-item {
                border-radius: 8px;
                background: #f9fafb; /* gray-50 */
                border-color: #e5e7eb; /* gray-200 */
            }
             .custom-pagination .ant-pagination-item-active {
                background: #EC4899;
                border-color: #EC4899;
            }
             .custom-pagination .ant-pagination-item-active a {
                color: white !important;
            }
        `}</style>
            </div>
        </ConfigProvider>
    );
};

export default CustomPagination;
