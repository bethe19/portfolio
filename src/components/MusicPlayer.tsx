import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicPlayerProps {
  audioSrc: string;
  isDevMode?: boolean;
}

export const MusicPlayer = ({ audioSrc, isDevMode = false }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  if (!isDevMode) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        onEnded={() => setIsPlaying(false)}
      />

      {/* Integrated Music Player */}
      <motion.div
        className="relative mt-6 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {/* Stark Banner Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black border-2 border-slate-600"
          animate={isPlaying ? {
            boxShadow: [
              "0 0 20px rgba(59, 130, 246, 0.2)",
              "0 0 40px rgba(59, 130, 246, 0.4)",
              "0 0 20px rgba(59, 130, 246, 0.2)"
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Frost overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-950/20 via-transparent to-transparent"
          animate={{
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Content */}
        <div className="relative p-3 sm:p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Left: Direwolf Icon & Title */}
          <div className="flex items-center gap-3 md:gap-4 flex-1 w-full md:w-auto">
            <motion.div
              className="relative flex-shrink-0"
              animate={isPlaying ? { 
                rotate: [0, -5, 5, -5, 0],
                scale: [1, 1.05, 1]
              } : {}}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {/* Direwolf Silhouette */}
              <svg width="50" height="50" viewBox="0 0 100 100" className="sm:w-[60px] sm:h-[60px] text-slate-400">
                <motion.path
                  d="M50 20 L45 30 L40 35 L30 40 L25 50 L20 65 L25 75 L35 80 L45 82 L50 85 L55 82 L65 80 L75 75 L80 65 L75 50 L70 40 L60 35 L55 30 Z"
                  fill="currentColor"
                  animate={isPlaying ? {
                    fill: ["#94a3b8", "#60a5fa", "#94a3b8"]
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <circle cx="42" cy="45" r="3" fill="#1e293b" />
                <circle cx="58" cy="45" r="3" fill="#1e293b" />
              </svg>
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 blur-xl bg-blue-500/30"
                animate={isPlaying ? {
                  opacity: [0, 0.6, 0],
                  scale: [0.8, 1.2, 0.8]
                } : { opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <div className="flex flex-col flex-1">
              <motion.div 
                className="text-[10px] sm:text-xs font-mono text-slate-500 mb-0.5 sm:mb-1"
                animate={isPlaying ? {
                  color: ["#64748b", "#60a5fa", "#64748b"]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                [HOUSE STARK THEME]
              </motion.div>
              <motion.h3 
                className="text-sm sm:text-base md:text-lg font-bold font-serif tracking-wider text-slate-300"
                animate={isPlaying ? {
                  textShadow: [
                    "0 0 0px rgba(96, 165, 250, 0)",
                    "0 0 10px rgba(96, 165, 250, 0.6)",
                    "0 0 0px rgba(96, 165, 250, 0)"
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                WINTER IS COMING
              </motion.h3>
              <AnimatePresence>
                {isPlaying && (
                  <motion.div
                    className="text-[10px] sm:text-xs font-mono text-blue-400 mt-0.5 sm:mt-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    ♫ Now Playing...
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Center: Play Button */}
          <motion.button
            onClick={togglePlay}
            className="relative group w-full md:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Outer glow rings */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{ padding: "4px" }}
              animate={isPlaying ? {
                boxShadow: [
                  "0 0 0px rgba(59, 130, 246, 0)",
                  "0 0 30px rgba(59, 130, 246, 0.6)",
                  "0 0 0px rgba(59, 130, 246, 0)"
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <div className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 border-2 border-slate-500 font-mono text-base sm:text-lg font-bold text-slate-200 overflow-hidden">
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/30 to-blue-600/0"
                animate={isPlaying ? {
                  x: ["-100%", "100%"]
                } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isPlaying ? (
                  <>
                    <motion.span
                      animate={{ scale: [1, 0.8, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ⏸
                    </motion.span>
                    PAUSE
                  </>
                ) : (
                  <>
                    ▶ PLAY
                  </>
                )}
              </span>

              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-400" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blue-400" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-blue-400" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-400" />
            </div>
          </motion.button>

          {/* Right: Volume Control */}
          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
            <motion.button
              onClick={toggleMute}
              className="p-2 border-2 border-slate-600 bg-slate-800 text-slate-300 hover:text-blue-400 hover:border-blue-500 transition-colors flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </motion.button>
            
            <div className="flex flex-col gap-1 flex-1 md:min-w-[100px]">
              <div className="text-[10px] sm:text-xs font-mono text-slate-500">VOLUME</div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="text-[10px] sm:text-xs font-mono text-slate-400 text-right">
                {Math.round(volume * 100)}%
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stark motto */}
        <motion.div
          className="relative border-t-2 border-slate-700 bg-slate-950/50 px-3 sm:px-6 py-2 flex items-center justify-center gap-2 sm:gap-4 font-serif text-[10px] sm:text-xs tracking-wider sm:tracking-widest text-slate-500"
          animate={isPlaying ? {
            color: ["#64748b", "#94a3b8", "#64748b"]
          } : {}}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <span className="hidden sm:inline">⚔</span>
          <span>THE NORTH REMEMBERS</span>
          <span className="hidden sm:inline">⚔</span>
        </motion.div>

        {/* Floating snowflakes on hover */}
        <AnimatePresence>
          {isPlaying && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-200 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: "20%"
                  }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{
                    y: [0, 100],
                    x: [0, Math.random() * 20 - 10],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Stark-themed Background Effects when playing */}
      <AnimatePresence>
        {isPlaying && <StarkEffects />}
      </AnimatePresence>
    </>
  );
};

// Stark Winter Theme Effects
const StarkEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Dark vignette overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      />

      {/* Northern Lights effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-purple-900/5 to-transparent"
        initial={{ opacity: 0, y: -100 }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          y: [0, 50, 0]
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Snowflakes */}
      {[...Array(30)].map((_, i) => (
        <Snowflake key={i} delay={i * 0.2} />
      ))}

      {/* Frost particles */}
      {[...Array(15)].map((_, i) => (
        <FrostParticle key={i} delay={i * 0.3} />
      ))}

      {/* Direwolf shadow silhouette */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 text-slate-800/5"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0, 0.15, 0],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <svg width="400" height="400" viewBox="0 0 200 200" className="blur-sm">
          <path
            d="M100 50 L85 70 L80 85 L70 95 L60 110 L55 130 L60 150 L70 160 L85 165 L100 170 L115 165 L130 160 L140 150 L145 130 L140 110 L130 95 L120 85 L115 70 Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      {/* Winter is Coming text effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.2, 0], scale: [0.5, 1.5, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, repeatDelay: 4 }}
      >
        <div className="text-6xl font-bold text-blue-200/10 tracking-[0.5em] font-serif">
          WINTER
        </div>
        <div className="text-4xl font-bold text-blue-200/10 tracking-[0.3em] font-serif mt-2">
          IS COMING
        </div>
      </motion.div>

      {/* Ice crystals corners */}
      <IceCrystals position="top-left" />
      <IceCrystals position="top-right" />
      <IceCrystals position="bottom-left" />
      <IceCrystals position="bottom-right" />
    </div>
  );
};

const Snowflake = ({ delay }: { delay: number }) => {
  const startX = Math.random() * 100;
  const duration = 10 + Math.random() * 10;
  const size = 2 + Math.random() * 4;

  return (
    <motion.div
      className="absolute bg-white rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${startX}%`,
        top: '-20px',
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
      }}
      initial={{ y: -20, x: 0, opacity: 0 }}
      animate={{
        y: window.innerHeight + 20,
        x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
        opacity: [0, 1, 1, 0],
        rotate: 360,
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const FrostParticle = ({ delay }: { delay: number }) => {
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;
  const duration = 4 + Math.random() * 4;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
      }}
    >
      <div className="w-1 h-1 bg-blue-300 rounded-full blur-sm" />
    </motion.div>
  );
};

const IceCrystals = ({ position }: { position: string }) => {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180',
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position as keyof typeof positionClasses]} w-32 h-32`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1],
        scale: [0.8, 1, 0.8]
      }}
      transition={{ duration: 6, repeat: Infinity }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full text-blue-300/20">
        <path
          d="M50 0 L50 100 M0 50 L100 50 M15 15 L85 85 M85 15 L15 85"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    </motion.div>
  );
};

