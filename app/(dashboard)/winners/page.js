"use client";
import React, { useState } from 'react';
import { Input } from 'antd';
import { Search, Trophy } from 'lucide-react';
import WinnersModal from '@/components/winners/WinnersModal';

// Mock Data
const MOCK_CAMPAIGNS = [
    {
        id: 1,
        title: "Voice Teens",
        winner: "Sarah Johnson",
        votes: 67890,
        prize: "$4,000",
        endedDate: "2025-05-31",
        participants: 456,
        color: "bg-[#ec4899]",
        winners: [
            { name: "Sarah Johnson", song: "Shape of You - Amazing", votes: 52768, views: 1879, avatar: null },
            { name: "Mike T", song: "Perfect", votes: 45200, views: 1600, avatar: null },
            { name: "Jessica L", song: "Halo", votes: 41000, views: 1550, avatar: null }
        ],
        otherParticipants: [
            { rank: 4, name: "David M", song: "All of Me", votes: 38000, views: 1400, avatar: null },
            { rank: 5, name: "Emily R", song: "Rolling in the Deep", votes: 35000, views: 1350, avatar: null },
            { rank: 6, name: "Chris P", song: "Godzilla", votes: 32000, views: 1200, avatar: null }
        ]
    },
    {
        id: 2,
        title: "Winter Voice 2024",
        winner: "Michael Chen",
        votes: 45300,
        prize: "$4,000",
        endedDate: "2024-12-20",
        participants: 320,
        color: "bg-[#3b82f6]",
        winners: [
            { name: "Michael Chen", song: "Last Christmas", votes: 45300, views: 2100, avatar: null },
            { name: "Sarah W", song: "Jingle Bells", votes: 40000, views: 1900, avatar: null },
            { name: "John D", song: "Silent Night", votes: 35000, views: 1700, avatar: null }
        ],
        otherParticipants: []
    },
    {
        id: 3,
        title: "Rap Battle Royale",
        winner: "Alex Rivera",
        votes: 89000,
        prize: "$5,000",
        endedDate: "2024-11-15",
        participants: 500,
        color: "bg-[#9333ea]",
        winners: [
            { name: "Alex Rivera", song: "Lose Yourself", votes: 89000, views: 5000, avatar: null },
            { name: "Chris P", song: "Godzilla", votes: 80000, views: 4500, avatar: null },
            { name: "Tom H", song: "Stan", votes: 75000, views: 4000, avatar: null }
        ],
        otherParticipants: []
    }
];

export default function WinnersPage() {
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRowClick = (campaign) => {
        setSelectedCampaign(campaign);
        setIsModalOpen(true);
    };

    return (
        <div className="p-8 max-w-[1600px] mx-auto">
            <h1 className="text-[28px] font-bold mb-2 text-black">Winners</h1>
            <p className="text-gray-500 mb-8 text-base">Announce and celebrate the winning submissions.</p>

            <div className="bg-[#fff7ed] rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-center justify-between shadow-sm border border-[#ffedd5] gap-6">
                <div className="flex flex-col md:flex-row  items-center gap-6 w-full md:w-auto">
                    <div className="w-20 h-20 rounded-full bg-[#f97316] flex items-center justify-center text-white shadow-lg shadow-orange-200/50 relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600"></div>
                        <Trophy size={40} strokeWidth={1.5} className="relative z-10" />
                    </div>
                    <div>
                        <div className="flex flex-col md:flex-row  items-center gap-3 mb-1">
                            <h2 className="text-2xl font-bold text-black">Latest Winner</h2>
                            <span className="bg-[#F06E2336] text-[#f97316] text-xs px-2.5 py-0.5 rounded border border-[#fdba74] font-bold flex items-center gap-1.5 uppercase tracking-wide">
                                <Trophy size={11} fill="#f97316" /> Champion
                            </span>
                        </div>
                        <p className="text-gray-700 font-bold text-lg">Voice Srilanka</p>
                    </div>
                </div>
                <div className="text-left md:text-right w-full md:w-auto">
                    <p className="text-gray-500 text-sm mb-1 font-medium">Prize amount</p>
                    <p className="text-3xl font-extrabold text-gray-800">$4,000</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 h-full flex flex-col justify-between">
                    <p className="text-gray-500 text-sm mb-4 font-medium">Winner</p>
                    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#ec4899] flex items-center justify-center text-white font-bold text-sm md:text-lg">SJ</div>
                        <div>
                            <p className="font-bold text-black text-base">Sarah Johnson</p>
                            <p className="text-xs text-gray-400">Sarah@example.com</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 h-full flex flex-col justify-between">
                    <p className="text-gray-500 text-sm mb-2 font-medium">Total Votes</p>
                    <p className="text-2xl font-bold text-black">10,167</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 h-full flex flex-col justify-between">
                    <p className="text-gray-500 text-sm mb-2 font-medium">Total Views</p>
                    <p className="text-2xl font-bold text-black">101,687</p>
                </div>

                <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 h-full flex flex-col justify-between">
                    <p className="text-gray-500 text-sm mb-2 font-medium">Winning Video</p>
                    <p className="font-bold text-black text-lg">My Heart Will Go On - Cover</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 h-full flex flex-col justify-between">
                    <p className="text-gray-500 text-sm mb-2 font-medium">Participants</p>
                    <p className="text-2xl font-bold text-black">10,167</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 h-full flex flex-col justify-between">
                    <p className="text-gray-500 text-sm mb-2 font-medium">End Date</p>
                    <p className="font-bold text-black text-lg">2025-05-31</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 mb-10 flex flex-col gap-4">
                <div className="text-gray-500 text-sm font-medium">Top 3 Finalist</div>
                <div className="w-full flex flex-col md:flex-row items-center justify-between px-2 md:px-8 bg-gray-50/50 rounded-xl py-4 gap-4 md:gap-0">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="w-9 h-9 rounded-full bg-[#f97316] text-white flex items-center justify-center font-bold shadow-md shadow-orange-200 shrink-0">1</div>
                        <div>
                            <p className="font-bold text-base text-black">Sarah Johnson</p>
                            <p className="text-xs text-gray-500 font-medium">10,167</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="w-9 h-9 rounded-full bg-[#64748b] text-white flex items-center justify-center font-bold shadow-md shadow-slate-200 shrink-0">2</div>
                        <div>
                            <p className="font-bold text-base text-black">Sarah Wilz</p>
                            <p className="text-xs text-gray-500 font-medium">9,666</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="w-9 h-9 rounded-full bg-[#ec4899] text-white flex items-center justify-center font-bold shadow-md shadow-pink-200 shrink-0">3</div>
                        <div>
                            <p className="font-bold text-base text-black">Sarah Perera</p>
                            <p className="text-xs text-gray-500 font-medium">9,321</p>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="text-black font-bold mb-5 text-lg">All Campaign winners</h3>
            <div className="bg-gray-100 p-2.5 rounded-xl mb-6 max-w-full">
                <Input
                    prefix={<Search className="text-gray-400 mr-2" size={20} />}
                    placeholder="Search by email username"
                    className="!bg-transparent !border-none !shadow-none placeholder-gray-500 text-base py-1"
                />
            </div>

            <div className="flex flex-col gap-4 pb-10">
                {MOCK_CAMPAIGNS.map((campaign) => (
                    <div
                        key={campaign.id}
                        onClick={() => handleRowClick(campaign)}
                        className="bg-white p-5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col md:flex-row items-center justify-between cursor-pointer hover:shadow-lg hover:border-blue-100 transition-all group duration-300 gap-4"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                            <div className={`w-12 h-12 rounded-full ${campaign.color} flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                                {campaign.id}
                            </div>
                            <div>
                                <h4 className="font-bold text-black text-lg mb-1">{campaign.title}</h4>
                                <div className="text-gray-500 text-sm flex flex-wrap items-center gap-2 md:gap-3">
                                    <span className="font-medium whitespace-nowrap">Winner : <span className="text-black font-semibold">{campaign.winner}</span></span>
                                    <span className="hidden md:block w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span className="flex items-center gap-1.5 text-orange-500 font-bold bg-orange-50 px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                        {campaign.votes.toLocaleString()} votes
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-left md:text-right flex flex-col items-start md:items-end gap-1 w-full md:w-auto pl-0 md:pl-0 mt-2 md:mt-0">
                            <div className="bg-[#fff7ed] text-[#ea580c] px-3 py-1 rounded-lg text-sm font-bold border border-[#ffedd5] inline-block shadow-sm">
                                {campaign.prize}
                            </div>
                            <p className="text-gray-400 text-xs font-medium">{campaign.endedDate}</p>
                        </div>
                    </div>
                ))}
            </div>

            <WinnersModal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                data={selectedCampaign}
            />
        </div>
    );
}
