"use client";
import React from "react";
import { Table, ConfigProvider } from "antd";

const CustomTable = ({ columns, dataSource, loading, onRow, rowKey = "id" }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: "transparent",
                        headerColor: "#6B7280", // gray-500
                        headerSplitColor: "transparent",
                        rowHoverBg: "#f9fafb", // gray-50
                        borderColor: "#f3f4f6", // gray-100
                        cellPaddingBlock: 16,
                    },
                },
            }}
        >
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    onRow={onRow}
                    rowKey={rowKey}
                    pagination={false}
                    className="custom-table"
                    scroll={{ x: true }}
                />
                <style jsx global>{`
          .custom-table .ant-table-thead > tr > th {
            font-weight: 600;
            font-size: 0.875rem;
          }
          .custom-table .ant-table-tbody > tr > td {
            font-size: 0.875rem;
            color: #374151; /* gray-700 */
          }
        `}</style>
            </div>
        </ConfigProvider>
    );
};

export default CustomTable;
