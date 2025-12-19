import React from 'react';
import { Modal, Avatar } from 'antd';
import { X, Trophy, Eye, Heart } from 'lucide-react';

export default function WinnersModal({ open, onCancel, data }) {
    if (!data) return null;

    const { title, endedDate, participants, prize, winners, otherParticipants } = data;

    // Destructure top 3 winners for podium
    const [first, second, third] = winners;

    // Helper to handle avatar src safely
    const getAvatarSrc = (src) => (src && src.trim() !== "" ? src : null);

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            closeIcon={<X className="text-gray-500 hover:text-gray-800 transition-colors" size={20} />} // Updated to match simple X in top right
            width={800}
            centered
            className="winner-modal"
            styles={{
                content: { padding: 0, borderRadius: '16px', overflow: 'hidden', border: 'none' }, // Rounded 16px to match
                body: { padding: 0 },
                mask: { backdropFilter: 'blur(2px)' }
            }}
        >
            <div className="bg-[#ecfdf5] p-6 relative">
                {/* <div className="absolute top-4 right-12 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={onCancel}>
                </div> */}

                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-[#af00af] flex items-center justify-center text-white font-bold text-2xl shadow-sm shrink-0">
                        {title.charAt(0)}
                    </div>

                    <h2 className="text-2xl font-bold text-black mb-1.5">{title}</h2>


                </div>

                <div className='pt-3'>
                    <div className="flex items-center gap-3 text-sm text-[#64748b] font-medium">
                        <span>Ended: {endedDate}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#94a3b8]"></span>
                        <span>{participants.toLocaleString()} Participants</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#94a3b8]"></span>
                        <span className="text-[#eab308] font-semibold">Prize: {prize}</span>
                    </div>
                </div>
            </div>

            <div className="pt-3 bg-white">
                <div className="flex justify-center items-end gap-6 pt-10 pb-12 mb-4 mx-6">

                    <div className="flex flex-col items-center relative z-10 w-44">
                        <div className="relative mb-3">
                            <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-[#9ca3af]">
                                <Avatar size={72} src={getAvatarSrc(second.avatar)} className="bg-[#9ca3af] text-xl font-bold">{second.name ? second.name.substring(0, 2).toUpperCase() : "SJ"}</Avatar>
                            </div>
                            <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-8 h-8 rounded-full bg-[#64748b] border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-sm z-20">
                                2
                            </div>
                        </div>

                        <div className="text-center w-full">
                            <h3 className="font-bold text-lg text-black leading-tight mb-1">{second.name}</h3>
                            <p className="text-[#94a3b8] text-xs mb-4 font-medium px-2 truncate w-full">{second.song}</p>

                            <div className="bg-[#64748b] text-white rounded-2xl py-5 px-2 shadow-sm text-center w-full relative h-[120px] flex flex-col justify-center items-center mb-3">
                                <Trophy className="w-6 h-6 text-gray-300 mb-2" strokeWidth={1.5} />
                                <div className="text-2xl font-bold leading-none mb-1 text-white">{second.votes.toLocaleString()}</div>
                                <div className="text-[10px] text-gray-300 font-medium tracking-wide">Votes</div>
                            </div>

                            <div className="bg-white border border-gray-100 rounded-lg py-2 px-3 shadow-sm flex items-center justify-center gap-2 w-full">
                                <Eye className="w-4 h-4 text-[#8b5cf6]" />
                                <span className="text-black font-bold text-sm">{second.views.toLocaleString()}</span>
                                <span className="text-[10px] text-gray-400 font-medium">Views</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center relative z-20 w-52 -mt-10">
                        <div className="relative mb-3">
                            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-[#fbbf24]">
                                <Avatar size={88} src={getAvatarSrc(first.avatar)} className="bg-[#fbbf24] text-3xl font-bold text-white">{first.name ? first.name.substring(0, 2).toUpperCase() : "SJ"}</Avatar>
                            </div>
                            <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-10 h-10 rounded-full bg-[#fbbf24] border-2 border-white flex items-center justify-center text-white shadow-sm z-20">
                                <Trophy size={18} fill="white" strokeWidth={0} />
                            </div>
                        </div>

                        <div className="text-center w-full">
                            <h3 className="font-bold text-xl text-black leading-tight mb-1">{first.name}</h3>
                            <div className="flex justify-center mb-1">
                                <span className="border border-[#fbbf24] text-[#d97706] text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide bg-orange-50 flex items-center gap-1">
                                    <Trophy size={10} strokeWidth={2} /> Champion
                                </span>
                            </div>
                            <p className="text-[#94a3b8] text-sm mb-4 font-medium px-2 truncate w-full">{first.song}</p>

                            <div className="bg-[#fbbf24] text-white rounded-2xl py-6 px-2 shadow-lg shadow-orange-200 text-center w-full relative h-[140px] flex flex-col justify-center items-center mb-3">
                                <Trophy className="w-8 h-8 text-white mb-2" strokeWidth={1.5} />
                                <div className="text-4xl font-bold leading-none mb-1 text-white">{first.votes.toLocaleString()}</div>
                                <div className="text-xs text-orange-50 font-medium tracking-wide">Votes</div>
                            </div>

                            <div className="bg-white border border-gray-100 rounded-lg py-2 px-3 shadow-sm flex items-center justify-center gap-2 w-full">
                                <Eye className="w-4 h-4 text-[#8b5cf6]" />
                                <span className="text-black font-bold text-sm">{first.views.toLocaleString()}</span>
                                <span className="text-[10px] text-gray-400 font-medium">Views</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center relative z-10 w-44">
                        <div className="relative mb-3">
                            <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-[#ef4444]">
                                <Avatar size={72} src={getAvatarSrc(third.avatar)} className="bg-[#ef4444] text-xl font-bold text-white">{third.name ? third.name.substring(0, 2).toUpperCase() : "SJ"}</Avatar>
                            </div>
                            <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-8 h-8 rounded-full bg-[#ef4444] border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-sm z-20">
                                3
                            </div>
                        </div>

                        <div className="text-center w-full">
                            <h3 className="font-bold text-lg text-black leading-tight mb-1">{third.name}</h3>
                            <p className="text-[#94a3b8] text-xs mb-4 font-medium px-2 truncate w-full">{third.song}</p>

                            <div className="bg-[#ff0000] text-white rounded-2xl py-5 px-2 shadow-sm text-center w-full relative h-[120px] flex flex-col justify-center items-center mb-3">
                                <Trophy className="w-6 h-6 text-red-200 mb-2" strokeWidth={1.5} />
                                <div className="text-2xl font-bold leading-none mb-1 text-white">{third.votes.toLocaleString()}</div>
                                <div className="text-[10px] text-red-100 font-medium tracking-wide">Votes</div>
                            </div>

                            <div className="bg-white border border-gray-100 rounded-lg py-2 px-3 shadow-sm flex items-center justify-center gap-2 w-full">
                                <Eye className="w-4 h-4 text-[#8b5cf6]" />
                                <span className="text-black font-bold text-sm">{third.views.toLocaleString()}</span>
                                <span className="text-[10px] text-gray-400 font-medium">Views</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                    <h4 className="text-[#64748b] text-sm font-medium mb-4">Other Participants</h4>
                    <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                        {otherParticipants && otherParticipants.length > 0 ? otherParticipants.map((p, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#f1f5f9] text-[#94a3b8] rounded-xl flex items-center justify-center font-bold text-sm">
                                        #{p.rank}
                                    </div>
                                    <Avatar src={getAvatarSrc(p.avatar)} size={42} className="bg-[#ec4899] text-white text-lg font-bold">{p.name ? p.name.substring(0, 2).toUpperCase() : "AA"}</Avatar>
                                    <div>
                                        <div className="font-bold text-black text-base">{p.name}</div>
                                        <div className="text-[#94a3b8] text-xs mt-0.5">{p.song}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 pr-2">
                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center gap-2">
                                            <Eye size={16} className="text-[#8b5cf6]" />
                                            <span className="text-sm font-bold text-black leading-none">{p.views.toLocaleString()}</span>
                                        </div>
                                        <span className="text-[10px] text-gray-400 font-medium mt-0.5">Views</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center gap-2">
                                            <Heart size={16} className="text-[#ec4899]" fill="#ec4899" />
                                            <span className="text-sm font-bold text-black leading-none">{p.votes.toLocaleString()}</span>
                                        </div>
                                        <span className="text-[10px] text-gray-400 font-medium mt-0.5">Votes</span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center text-gray-400 py-4">No other participants found</div>
                        )}
                    </div>
                </div>
            </div>
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                .winner-modal .ant-modal-content {
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }
            `}</style>
        </Modal>
    );
}
