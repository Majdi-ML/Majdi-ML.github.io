import { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import majdiPhoto from '../assets/majdiii.webp';

// Three.js galaxy in its own chunk: the UI shows first, the galaxy fades in
const BootGalaxy = lazy(() => import('./BootGalaxy'));

// ─── Glitch Text Effect ───
function GlitchText({ text, className }) {
  return (
    <span className={`boot-glitch ${className || ''}`} data-text={text}>
      {text}
    </span>
  );
}

// ─── Main BootScreen ───
export default function BootScreen({ onComplete }) {
  const [isEntering, setIsEntering] = useState(false);
  const [warp, setWarp] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  const handleEnter = useCallback(() => {
    if (isEntering) return;
    setIsEntering(true);
    setWarp(true);
    timeoutRef.current = setTimeout(() => onComplete(), 2000);
  }, [isEntering, onComplete]);

  // Staggered content reveal
  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Cursor glow + cleanup
  useEffect(() => {
    const onMove = (e) => {
      const glow = containerRef.current?.querySelector('.boot-cursor-glow');
      if (glow) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="boot-root fixed inset-0 z-[99999] bg-[#010008] flex flex-col items-center justify-center overflow-hidden cursor-none"
    >
      <div className="boot-cursor-glow" />

      {/* 3D Galaxy Canvas — its centre follows --boot-center (see .boot-canvas) */}
      <div className="boot-canvas absolute inset-x-0">
        <Suspense fallback={null}>
          <BootGalaxy warp={warp} />
        </Suspense>
      </div>

      {/* Chromatic aberration overlay */}
      <div className="boot-chromatic" />

      {/* Content */}
      <AnimatePresence>
        {showContent && (
          <>
            {/* Photo — absolute center of screen (galaxy core) */}
            <div className="boot-photo-layer absolute z-10 inset-x-0 flex justify-center" style={{ pointerEvents: 'none' }}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isEntering
                ? { scale: [1, 0.8, 3], opacity: [1, 1, 0], rotate: [0, 0, 180] }
                : { scale: 1, opacity: 1 }
              }
              transition={isEntering
                ? { duration: 1.5, ease: 'easeIn' }
                : { duration: 1, type: 'spring', stiffness: 100 }
              }
              className="relative"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="boot-holo-wrapper">
                <div className="boot-holo-frame" />
                <img
                  src={majdiPhoto}
                  alt="Majdi Melliti"
                  className="boot-holo-photo"
                  draggable={false}
                />
              </div>

              {/* Orbiting dots */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="boot-orbit-dot"
                  style={{ '--orbit-delay': `${i * -1.5}s`, '--orbit-size': `calc(var(--boot-photo-size) * ${(1.14 + i * 0.127).toFixed(3)})` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
                />
              ))}

              {/* Expanding rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`ring-${i}`}
                  animate={{ scale: [1, 2 + i * 0.4], opacity: [0.25, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full"
                  style={{ border: '1px solid rgba(99, 102, 241, 0.2)' }}
                />
              ))}
            </motion.div>
            </div>

            {/* Text + Button — below the photo */}
            <div className="boot-text-layer absolute z-10 inset-x-0 flex flex-col items-center px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isEntering
                  ? { opacity: 0, scale: 0, y: -100 }
                  : { opacity: 1, y: 0 }
                }
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-col items-center gap-4"
              >
                <h1 className="boot-title">
                  <GlitchText text="Majdi Melliti" />
                </h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isEntering ? 0 : 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                  className="boot-separator"
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isEntering ? 0 : 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="boot-subtitle"
                >
                  Data & BI Analyst
                </motion.p>
              </motion.div>

              {/* Square Enter button */}
              {!isEntering ? (
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleEnter}
                  className="boot-enter-btn mt-8"
                >
                  <span className="boot-enter-border" />
                  <span className="boot-enter-text">ENTER</span>
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0, scale: 3 }}
                  transition={{ duration: 1.5 }}
                  className="mt-8 flex items-center gap-3"
                >
                  <span className="text-sm text-cyan-300/60 tracking-[0.5em] uppercase font-light">
                    Initialisation...
                  </span>
                </motion.div>
              )}

              {/* Hint */}
              {!isEntering && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 2.5, duration: 1.5 }}
                  className="hidden md:block text-[11px] text-white/20 mt-4 tracking-[0.4em] uppercase font-light"
                >
                  Deplacez la souris pour deformer le champ gravitationnel
                </motion.p>
              )}
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Vignette */}
      <div className="boot-vignette" />

      {/* Warp flash */}
      {isEntering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 0] }}
          transition={{ duration: 2, times: [0, 0.6, 0.8, 1] }}
          className="absolute inset-0 bg-white z-50 pointer-events-none"
        />
      )}
    </motion.div>
  );
}
