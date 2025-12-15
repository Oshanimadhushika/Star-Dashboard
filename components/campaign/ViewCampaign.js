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
                dataSource={[
                    { key: 1, rank: 1, name: 'Sarah J', title: 'Shape of You', votes: 1240 },
                    { key: 2, rank: 2, name: 'Mike T', title: 'Perfect', votes: 980 },
                    { key: 3, rank: 3, name: 'Jessica L', title: 'Halo', votes: 850 },
                ]}
                columns={[
                    { title: 'Rank', dataIndex: 'rank', key: 'rank', render: (r) => <div className="w-6 h-6 rounded-full bg-yellow-500 text-black font-bold flex items-center justify-center">{r}</div> },
                    { title: 'Participant', dataIndex: 'name', key: 'name', render: (t) => <span className="text-white font-medium">{t}</span> },
                    { title: 'Title', dataIndex: 'title', key: 'title', render: (t) => <span className="text-gray-400">{t}</span> },
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
    );
}
