import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable from 'react-draggable';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { useWindowManager } from '../context/WindowManager';

const windowSizes = {
  profile: { width: 1100, height: 850 },
  about: { width: 780, height: 650 },
  projects: { width: 960, height: 700 },
  experience: { width: 900, height: 720 },
  skills: { width: 920, height: 700 },
  contact: { width: 680, height: 600 },
  cv: { width: 840, height: 680 },
};

export default function Window({ id, title, icon: Icon, children }) {
  const { isWindowOpen, isWindowMinimized, closeWindow, minimizeWindow, focusWindow, activeWindow, zCounter } =
    useWindowManager();
  const nodeRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const isOpen = isWindowOpen(id);
  const isMinimized = isWindowMinimized(id);
  const isActive = activeWindow === id;

  const baseSize = windowSizes[id] || { width: 700, height: 500 };

  // Responsive window sizing
  useEffect(() => {
    const updateSize = () => {
      if (typeof window === 'undefined') return;
      
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      let scaleFactor = 1;
      
      // Adjust scale factor based on screen size
      if (screenWidth < 480) {
        scaleFactor = 0.9; // Mobile: 90% of viewport
      } else if (screenWidth < 768) {
        scaleFactor = 0.85; // Tablet: 85%
      } else if (screenWidth < 1024) {
        scaleFactor = 0.8; // Small laptop: 80%
      }
      
      const maxWidth = screenWidth * scaleFactor;
      const maxHeight = screenHeight * scaleFactor;
      
      const width = Math.min(baseSize.width, maxWidth);
      const height = Math.min(baseSize.height, maxHeight);
      
      setWindowSize({ width, height });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [baseSize.width, baseSize.height]);

  const size = windowSize.width > 0 ? windowSize : baseSize;

  useEffect(() => {
    if (typeof window !== 'undefined' && size.width > 0) {
      const offsetX = Math.random() * 100 - 50;
      const offsetY = Math.random() * 60 - 30;
      setPosition({
        x: Math.max(20, (window.innerWidth - size.width) / 2 + offsetX),
        y: Math.max(20, (window.innerHeight - size.height) / 2 + offsetY - 30),
      });
    }
  }, [size.width, size.height]);

  const zIndex = isActive ? zCounter : (zCounter - 10);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {!isMinimized && (
        <Draggable
          nodeRef={nodeRef}
          handle=".window-handle"
          disabled={isMaximized}
          defaultPosition={position}
          onStart={() => focusWindow(id)}
        >
          <div ref={nodeRef} style={{ position: 'fixed', zIndex }} className="will-change-transform">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 30 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30, mass: 0.8 }}
              onClick={() => focusWindow(id)}
              className={`
                rounded-xl overflow-hidden border
                shadow-2xl
                ${isActive
                  ? 'border-white/15 shadow-black/50'
                  : 'border-white/8 shadow-black/30'}
                ${isMaximized
                  ? 'fixed inset-2 bottom-16 !w-auto !h-auto'
                  : ''}
              `}
              style={
                isMaximized
                  ? { position: 'fixed', inset: '8px 8px 60px', width: 'auto', height: 'auto' }
                  : { width: size.width, height: size.height }
              }
            >
              {/* Glass Background */}
              <div className="absolute inset-0 bg-[#0d1117]/85 backdrop-blur-2xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

              {/* Title Bar */}
              <div
                className="window-handle relative flex items-center justify-between px-4 py-2.5
                           border-b border-white/8 cursor-move select-none"
              >
                <div className="flex items-center gap-2.5">
                  {Icon && (
                    <div className="w-5 h-5 flex items-center justify-center">
                      <Icon size={14} className="text-blue-400" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-white/90">{title}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      minimizeWindow(id);
                    }}
                    className="w-8 h-7 flex items-center justify-center rounded-md
                               hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <Minus size={14} className="text-white/60" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMaximize();
                    }}
                    className="w-8 h-7 flex items-center justify-center rounded-md
                               hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {isMaximized ? (
                      <Minimize2 size={12} className="text-white/60" />
                    ) : (
                      <Maximize2 size={12} className="text-white/60" />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeWindow(id);
                    }}
                    className="w-8 h-7 flex items-center justify-center rounded-md
                               hover:bg-red-500/80 transition-colors group cursor-pointer"
                  >
                    <X size={14} className="text-white/60 group-hover:text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="relative overflow-y-auto custom-scrollbar"
                   style={{ height: isMaximized ? 'calc(100% - 44px)' : size.height - 44 }}>
                {children}
              </div>
            </motion.div>
          </div>
        </Draggable>
      )}
    </AnimatePresence>
  );
}
