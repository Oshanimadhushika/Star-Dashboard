import React, { useState, useEffect, useRef } from "react";
import { Modal } from "antd";
import { X, Play } from "lucide-react";

export default function CMSVideoModal({ open, onCancel, videoUrl, title }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        if (isPlaying && videoRef.current) {
            videoRef.current.play().catch((err) => console.error("Video play failed:", err));
        }
    }, [isPlaying]);

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            destroyOnHidden
            afterClose={() => setIsPlaying(false)}
            closeIcon={<X size={20} className="text-gray-500 hover:text-gray-800" />}
            width={600}
            className="video-modal"
            styles={{
                content: { padding: 0, borderRadius: "16px", overflow: "hidden" },
                body: { padding: 0 },
            }}
        >
            <div className="bg-white">
                {title && (
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 m-0 truncate" title={title}>
                            {title}
                        </h3>
                    </div>
                )}

                <div className="p-0 bg-black aspect-[9/16] md:aspect-video w-full flex items-center justify-center">
                    {videoUrl ? (
                        <div
                            className="relative w-full h-full group cursor-pointer"
                            onClick={() => setIsPlaying(true)}
                        >
                            {!isPlaying ? (
                                <>
                                    <video
                                        src={videoUrl}
                                        className="w-full h-full object-contain opacity-80"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 bg-black/30 hover:bg-black/40 transition-colors">
                                        <Play size={64} fill="white" className="mb-3 drop-shadow-lg scale-100 group-hover:scale-110 transition-transform duration-300" />
                                        <div className="font-bold text-xl drop-shadow-md">Video Preview</div>
                                        <div className="text-sm opacity-90 drop-shadow-md">Click to play</div>
                                    </div>
                                </>
                            ) : (
                                <video
                                    ref={videoRef}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain"
                                >
                                    <source src={videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    ) : (
                        <div className="text-white text-center p-8">
                            <p>No video URL available</p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}
