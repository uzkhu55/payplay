"use client";
import { useEffect, useRef, useState } from "react";

export const Body = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.muted = true;
      video.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
    }
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <div className="flex flex-col h-[100%] bg-black justify-center items-center ">
      <video
        ref={videoRef}
        className="w-full h-[680px]"
        src="/unitel.mp4"
        loop
        playsInline
        autoPlay
      ></video>
      <button
        onClick={toggleMute}
        className="absolute bottom-[200px] bg-transparent z-40 bg-gray-800  text-transparent hover:text-gray-400 p-3 rounded-md border-2"
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
};
