import { motion } from "motion/react";
import { useState, useEffect } from "react";
import couplePhoto1 from "figma:asset/Screenshot 2026-02-06 224202.png";
import couplePhoto2 from "figma:asset/Screenshot 2026-02-06 224202.png";

export function RotatingPhotoDisplay() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto h-[400px] flex items-center justify-center perspective-1000">
      <div className="relative w-80 h-80">
        {/* Rotating container with 3D effect */}
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
          }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20"
            style={{
              backfaceVisibility: "hidden",
              transform: "translateZ(100px)",
            }}
          >
            <img
              src={couplePhoto1}
              alt="Couple"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent" />
          </div>

          {/* Back face */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20"
            style={{
              backfaceVisibility: "hidden",
              transform: "translateZ(100px) rotateY(180deg)",
            }}
          >
            <img
              src={couplePhoto2}
              alt="Couple"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-8 -left-8 w-24 h-24 border-2 border-accent rounded-full opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-8 -right-8 w-32 h-32 border-2 border-primary rounded-full opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
