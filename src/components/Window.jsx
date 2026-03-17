import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable from 'react-draggable';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { useWindowManager } from '../context/WindowManager';

const windowSizes = {
  profile: { width: 1100, height: 850 },
  about: { width: 800, height: 680 },
  projects: { width: 980, height: 720 },
  experience: { width: 960, height: 800 },
  skills: { width: 940, height: 720 },
  contact: { width: 700, height: 620 },
  education: { width: 750, height: 650 },
  cv: { width: 860, height: 700 },
};

export default function Window({ id, title, icon: Icon, children }) {
  const { isWindowOpen, isWindowMinimized, closeWindow, minimizeWindow, focusWindow, activeWindow, zCounter } =
    useWindowManager();
  const nodeRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [savedPosition, setSavedPosition] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const isOpen = isWindowOpen(id);
  const isMinimized = isWindowMinimized(id);
  const isActive = activeWindow === id;

  const baseSize = windowSizes[id] || { width: 700, height: 500 };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (typeof window === 'undefined') return;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let scaleFactor = 1;
      if (screenWidth < 480) scaleFactor = 0.92;
      else if (screenWidth < 768) scaleFactor = 0.88;
      else if (screenWidth < 1024) scaleFactor = 0.82;

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
      const offsetX = Math.random() * 80 - 40;
      const offsetY = Math.random() * 50 - 25;
      const newPos = {
        x: Math.max(20, (window.innerWidth - size.width) / 2 + offsetX),
        y: Math.max(20, (window.innerHeight - size.height) / 2 + offsetY - 30),
      };
      setPosition(newPos);
      setSavedPosition(newPos);
    }
  }, [size.width, size.height]);

  const zIndex = isActive ? zCounter : (zCounter - 10);

  const maximizedWidth = Math.max(320, viewport.width);
  const maximizedHeight = Math.max(240, viewport.height - 52);

  const toggleMaximize = () => {
    if (!isMaximized) {
      setSavedPosition(position);
    } else {
      setPosition(savedPosition);
    }
    setIsMaximized(!isMaximized);
  };

  if (!isOpen) return null;

  const titleBarHeight = 38;

  return (
    <AnimatePresence>
      {!isMinimized && (
        <Draggable
          nodeRef={nodeRef}
          handle=".window-handle"
          disabled={isMaximized}
          position={isMaximized ? { x: 0, y: 0 } : position}
          onDrag={(e, data) => {
            if (!isMaximized) {
              setPosition({ x: data.x, y: data.y });
            }
          }}
          onStart={() => focusWindow(id)}
        >
          <div ref={nodeRef} style={{ position: 'fixed', zIndex }} className="will-change-transform">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 32, mass: 0.7 }}
              onClick={() => focusWindow(id)}
              className={`
                overflow-hidden
                ${isMaximized ? '' : 'rounded-lg'}
                ${isActive
                  ? 'win-window-active'
                  : 'win-window-inactive'}
              `}
              style={
                isMaximized
                  ? { width: maximizedWidth, height: maximizedHeight }
                  : { width: size.width, height: size.height }
              }
            >
              {/* Mica-like background */}
              <div className={`absolute inset-0 ${isActive ? 'bg-[#1c1c2e]/92' : 'bg-[#1a1a28]/88'} backdrop-blur-3xl`} />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02]" />
              {/* Top highlight line */}
              {isActive && !isMaximized && (
                <div className="absolute top-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
              )}

              {/* Title Bar */}
              <div
                className={`window-handle relative flex items-center justify-between px-3 cursor-move select-none
                            ${isActive ? 'border-b border-white/[0.08]' : 'border-b border-white/[0.05]'}`}
                style={{ height: titleBarHeight }}
                onDoubleClick={toggleMaximize}
              >
                <div className="flex items-center gap-2">
                  {Icon && (
                    <div className="w-4 h-4 flex items-center justify-center">
                      <Icon size={13} className={isActive ? 'text-blue-400' : 'text-white/30'} />
                    </div>
                  )}
                  <span className={`text-[13px] font-medium ${isActive ? 'text-white/85' : 'text-white/40'}`}>
                    {title}
                  </span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                    className="w-[46px] flex items-center justify-center rounded-sm
                               hover:bg-white/[0.08] transition-colors duration-150 cursor-pointer"
                    style={{ height: titleBarHeight }}
                  >
                    <Minus size={14} className="text-white/50" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
                    className="w-[46px] flex items-center justify-center rounded-sm
                               hover:bg-white/[0.08] transition-colors duration-150 cursor-pointer"
                    style={{ height: titleBarHeight }}
                  >
                    {isMaximized ? (
                      <Minimize2 size={12} className="text-white/50" />
                    ) : (
                      <Maximize2 size={12} className="text-white/50" />
                    )}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                    className="w-[46px] flex items-center justify-center rounded-sm
                               hover:bg-[#c42b1c] transition-colors duration-150 group cursor-pointer"
                    style={{ height: titleBarHeight }}
                  >
                    <X size={14} className="text-white/50 group-hover:text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="relative overflow-y-auto custom-scrollbar"
                   style={{ height: (isMaximized ? maximizedHeight : size.height) - titleBarHeight }}>
                {children}
              </div>
            </motion.div>
          </div>
        </Draggable>
      )}
    </AnimatePresence>
  );
}
