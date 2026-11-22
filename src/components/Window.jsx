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

const TASKBAR_H = 48;
const MOBILE_BREAKPOINT = 768;
const MARGIN = 16;

function useViewport() {
  const read = () => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  const [vp, setVp] = useState(read);
  useEffect(() => {
    const onResize = () => setVp(read());
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);
  return vp;
}

const clamp = (v, min, max) => Math.min(Math.max(v, min), Math.max(min, max));

export default function Window({ id, title, icon: Icon, children }) {
  const { isWindowOpen, isWindowMinimized, closeWindow, minimizeWindow, focusWindow, activeWindow, getZIndex } =
    useWindowManager();
  const nodeRef = useRef(null);
  const viewport = useViewport();
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const isOpen = isWindowOpen(id);
  const isMinimized = isWindowMinimized(id);
  const isActive = activeWindow === id;
  const isMobile = viewport.width < MOBILE_BREAKPOINT;
  const fullscreen = isMobile || isMaximized;

  const usableHeight = viewport.height - TASKBAR_H;
  const baseSize = windowSizes[id] || { width: 700, height: 500 };
  const size = {
    width: Math.min(baseSize.width, viewport.width - MARGIN * 2),
    height: Math.min(baseSize.height, usableHeight - MARGIN * 2),
  };

  // Center (with a small cascade offset) each time the window is opened
  useEffect(() => {
    if (!isOpen) return;
    const offsetX = Math.random() * 80 - 40;
    const offsetY = Math.random() * 50 - 25;
    setPosition({
      x: clamp((viewport.width - size.width) / 2 + offsetX, MARGIN / 2, viewport.width - size.width - MARGIN / 2),
      y: clamp((usableHeight - size.height) / 2 + offsetY, MARGIN / 2, usableHeight - size.height - MARGIN / 2),
    });
    setIsMaximized(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Keep the window inside the screen when the viewport changes
  useEffect(() => {
    setPosition((p) => ({
      x: clamp(p.x, 0, viewport.width - size.width),
      y: clamp(p.y, 0, usableHeight - size.height),
    }));
  }, [viewport.width, viewport.height, size.width, size.height, usableHeight]);

  // Escape closes the active window
  useEffect(() => {
    if (!isActive || !isOpen || isMinimized) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeWindow(id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isActive, isOpen, isMinimized, closeWindow, id]);

  const zIndex = getZIndex(id);
  const titleBarHeight = isMobile ? 44 : 38;
  const btnWidth = isMobile ? 48 : 46;
  const frame = fullscreen
    ? { width: viewport.width, height: usableHeight }
    : size;

  // Keep at least part of the title bar reachable while dragging
  const bounds = {
    left: -(size.width - 120),
    right: viewport.width - 120,
    top: 0,
    bottom: usableHeight - titleBarHeight,
  };

  return (
    <AnimatePresence>
      {isOpen && !isMinimized && (
        <Draggable
          nodeRef={nodeRef}
          handle=".window-handle"
          cancel=".window-btn"
          disabled={fullscreen}
          bounds={bounds}
          position={fullscreen ? { x: 0, y: 0 } : position}
          onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
          onStart={() => focusWindow(id)}
        >
          <div
            ref={nodeRef}
            style={{ position: 'fixed', top: 0, left: 0, zIndex }}
            className="will-change-transform"
            onPointerDownCapture={() => focusWindow(id)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 32, mass: 0.7 }}
              className={`relative overflow-hidden flex flex-col
                ${fullscreen ? '' : 'rounded-lg'}
                ${isActive ? 'win-window-active' : 'win-window-inactive'}`}
              style={frame}
              role="dialog"
              aria-label={title}
            >
              {/* Mica-like background */}
              <div className={`absolute inset-0 ${isActive ? 'bg-[#1c1c2e]/92' : 'bg-[#1a1a28]/88'} backdrop-blur-3xl`} />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02]" />
              {isActive && !fullscreen && (
                <div className="absolute top-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
              )}

              {/* Title Bar */}
              <div
                className={`window-handle relative shrink-0 flex items-center justify-between pl-3 select-none
                            ${fullscreen ? '' : 'cursor-move'}
                            ${isActive ? 'border-b border-white/[0.08]' : 'border-b border-white/[0.05]'}`}
                style={{ height: titleBarHeight }}
                onDoubleClick={() => !isMobile && setIsMaximized((m) => !m)}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {Icon && (
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                      <Icon size={13} className={isActive ? 'text-blue-400' : 'text-white/30'} />
                    </div>
                  )}
                  <span className={`text-[13px] font-medium truncate ${isActive ? 'text-white/85' : 'text-white/40'}`}>
                    {title}
                  </span>
                </div>
                <div className="flex items-center shrink-0">
                  <button
                    type="button"
                    aria-label="Minimize"
                    onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                    className="window-btn flex items-center justify-center
                               hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors duration-150 cursor-pointer"
                    style={{ height: titleBarHeight, width: btnWidth }}
                  >
                    <Minus size={14} className="text-white/60" />
                  </button>
                  {!isMobile && (
                    <button
                      type="button"
                      aria-label={isMaximized ? 'Restore' : 'Maximize'}
                      onClick={(e) => { e.stopPropagation(); setIsMaximized((m) => !m); }}
                      className="window-btn flex items-center justify-center
                                 hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors duration-150 cursor-pointer"
                      style={{ height: titleBarHeight, width: btnWidth }}
                    >
                      {isMaximized ? (
                        <Minimize2 size={12} className="text-white/60" />
                      ) : (
                        <Maximize2 size={12} className="text-white/60" />
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                    className="window-btn flex items-center justify-center
                               hover:bg-[#c42b1c] active:bg-[#c42b1c] transition-colors duration-150 group cursor-pointer"
                    style={{ height: titleBarHeight, width: btnWidth }}
                  >
                    <X size={15} className="text-white/70 group-hover:text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain custom-scrollbar">
                {children}
              </div>
            </motion.div>
          </div>
        </Draggable>
      )}
    </AnimatePresence>
  );
}
