import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import couplePhoto1 from "@/assets/Screenshot 2026-02-06 224202.png";
import couplePhoto2 from "@/assets/Screenshot 2026-02-06 224202.png";

export function Interactive3DModel() {
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={ref}
      className="relative w-full h-[500px] flex items-center justify-center cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-[400px] h-[400px]"
      >
        {/* Front card */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "translateZ(80px)",
          }}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 p-1">
            <div className="w-full h-full rounded-3xl overflow-hidden">
              <img
                src={couplePhoto1}
                alt="Aishwarya & Akshay"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-pink-500/20" />
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="text-white text-2xl font-bold drop-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Aishwarya & Akshay
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back card */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "translateZ(80px) rotateY(180deg)",
          }}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-purple-200 via-pink-200 to-purple-300 p-1">
            <div className="w-full h-full rounded-3xl overflow-hidden">
              <img
                src={couplePhoto2}
                alt="Aishwarya & Akshay"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-purple-500/20" />
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="text-white text-xl italic drop-shadow-lg" style={{ fontFamily: "'Great Vibes', cursive" }}>
                  February 26, 2026
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Side decorative elements */}
        <motion.div
          className="absolute w-full h-full border-4 border-amber-400 rounded-3xl"
          style={{
            transform: "translateZ(40px)",
            opacity: 0.3,
          }}
        />
        <motion.div
          className="absolute w-full h-full border-4 border-pink-400 rounded-3xl"
          style={{
            transform: "translateZ(20px)",
            opacity: 0.2,
          }}
        />
      </motion.div>

      {/* Floating particles */}
      <motion.div
        className="absolute top-10 left-10 w-3 h-3 bg-amber-400 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-20 right-16 w-4 h-4 bg-pink-400 rounded-full"
        animate={{
          y: [0, -30, 0],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-2 h-2 bg-purple-400 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}
