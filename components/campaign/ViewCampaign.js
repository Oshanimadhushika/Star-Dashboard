import React from 'react';
import { Modal, Table } from 'antd';
import { Trophy, X } from 'lucide-react';

export default function ViewCampaign({ open, onCancel, campaign }) {
    return (
        <Modal
            title={<div className="text-white flex items-center gap-2"><Trophy size={18} /> {campaign?.title} - Leaderboard</div>}
            open={open}
            onCancel={onCancel}
            footer={null}
            width={800}
            styles={{ mask: { backdropFilter: 'blur(5px)' } }}
            closeIcon={<X className="text-white" />}
        >
            <Table
                dataSource={campaign ? [campaign] : []}
                rowKey="id"
                columns={[
                    {
                        title: 'Title',
                        dataIndex: 'title',
                        key: 'title',
                        render: (t) => <span className="text-white font-medium" title={t}>{t?.length > 20 ? `${t.slice(0, 20)}...` : t}</span>
                    },
                    {
                        title: 'Participants',
                        dataIndex: 'enrolledCount',
                        key: 'enrolledCount',
                        render: (count) => <span className="text-gray-400">{count || 0}</span>
                    },
                    {
                        title: 'Votes',
                        dataIndex: 'votesCount',
                        key: 'votesCount',
                        render: (count) => <span className="text-pink-500 font-bold">{count || 0}</span>
                    },
                    {
                        title: 'Videos',
                        dataIndex: 'videoCount',
                        key: 'videoCount',
                        render: (count) => <span className="text-purple-500 font-bold">{count || 0}</span>
                    },
                ]}
                pagination={(campaign ? [campaign] : []).length > 10 ? { pageSize: 10 } : false}
                className="custom-table mt-4"
            />
            <style jsx global>{`
                .custom-table .ant-table { background: transparent; }
                .custom-table .ant-table-thead > tr > th { background: #2a2a40; color: #a1a1aa; border-bottom: 1px solid #333; }
                .custom-table .ant-table-tbody > tr > td { border-bottom: 1px solid #333; }
                .custom-table .ant-table-tbody > tr:hover > td { background: #2a2a40 !important; }
            `}</style>
        </Modal>
    );
}
