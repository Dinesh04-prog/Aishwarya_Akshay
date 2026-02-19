import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

export function TheaterCurtains({ onFinished }: { onFinished: () => void }) {
  const [isClicked, setIsClicked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const processFrame = () => {
      if (video.paused || video.ended) {
        return;
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;
      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        if (green > 90 && red < 90 && blue < 90) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(frame, 0, 0);
      animationFrameId = requestAnimationFrame(processFrame);
    };

    const startVideoProcessing = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Video play failed:", error);
        });
      }
      processFrame();
    };

    const handleMetadataLoaded = () => {
      startVideoProcessing();
    };

    video.addEventListener("loadedmetadata", handleMetadataLoaded);

    if (isClicked) {
      video.loop = false;
      video.currentTime = 0;
    } else {
      video.loop = true;
    }

    if (video.readyState >= 3) {
      handleMetadataLoaded();
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleMetadataLoaded);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isClicked]);

  const handleCurtainClick = () => {
    setIsClicked(true);
  };

  const handleVideoEnd = () => {
    onFinished();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="curtains"
        exit={{ opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed inset-0 z-50"
      >
        <video
          ref={videoRef}
          src="/curtain.mp4"
          muted
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: "none" }}
          crossOrigin="anonymous"
          playsInline
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {!isClicked && (
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={handleCurtainClick}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                className="text-white text-2xl"
                style={{ fontFamily: "'Monotype Corsiva', cursive" }}
              >
                Click to Enter
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
