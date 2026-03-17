import { useState, useEffect, useRef, useCallback } from 'react';
import { useWindowManager } from '../context/WindowManager';
import { motion, AnimatePresence } from 'framer-motion';
import majdiPhoto from '../assets/majdi.webp';
import {
  User,
  Folder,
  FolderKanban,
  Briefcase,
  BarChart3,
  Mail,
  FileText,
  Wifi,
  Battery,
  Volume2,
  ChevronUp,
  Search,
  Sparkles,
  Code2,
  Music,
  CloudSun,
  Monitor,
  Chrome,
  AppWindow,
  MessageSquare,
  Store,
  GraduationCap,
  Power,
} from 'lucide-react';

/* ─── Desktop icon definitions ─── */
const desktopIcons = [
  { id: 'about', label: 'About Me', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: BarChart3 },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'cv', label: 'My CV', icon: FileText },
];

/* ─── Grid-snapping constants ─── */
const CELL_W = 90;
const CELL_H = 95;
const GRID_PAD = 12;

function getGridPos(col, row) {
  return { x: GRID_PAD + col * CELL_W, y: GRID_PAD + row * CELL_H };
}

function snapToGrid(x, y) {
  const col = Math.max(0, Math.round((x - GRID_PAD) / CELL_W));
  const row = Math.max(0, Math.round((y - GRID_PAD) / CELL_H));
  return { col, row, ...getGridPos(col, row) };
}

/* ─── Draggable Desktop Icon ─── */
function DraggableIcon({ id, label, icon: Icon, position, onDragEnd, onOpen, index }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState(position);
  const [selected, setSelected] = useState(false);
  const clickTimer = useRef(null);

  useEffect(() => { setPos(position); }, [position.x, position.y]);

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    setSelected(true);
    const startX = e.clientX;
    const startY = e.clientY;
    let moved = false;

    const handleMouseMove = (e2) => {
      const dx = e2.clientX - startX;
      const dy = e2.clientY - startY;
      if (!moved && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
      moved = true;
      if (!dragging) setDragging(true);
      setPos({ x: position.x + dx, y: position.y + dy });
    };

    const handleMouseUp = (e2) => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (moved) {
        setDragging(false);
        const dx = e2.clientX - startX;
        const dy = e2.clientY - startY;
        const snapped = snapToGrid(position.x + dx, position.y + dy);
        setPos({ x: snapped.x, y: snapped.y });
        onDragEnd(id, snapped);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [position, id, onDragEnd, dragging]);

  const handleDoubleClick = () => {
    onOpen(id);
  };

  // Deselect when clicking elsewhere
  useEffect(() => {
    const deselect = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setSelected(false);
    };
    window.addEventListener('mousedown', deselect);
    return () => window.removeEventListener('mousedown', deselect);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, x: pos.x, y: pos.y }}
      transition={dragging ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 25, delay: index * 0.05 }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      className={`absolute top-0 left-0 flex flex-col items-center gap-1 p-2 rounded-lg w-[80px] cursor-default select-none
                  transition-colors duration-100
                  ${selected ? 'bg-white/[0.1] ring-1 ring-blue-400/40' : 'hover:bg-white/[0.06]'}
                  ${dragging ? 'opacity-80 z-50' : ''}`}
      style={{ willChange: 'transform' }}
    >
      <div className="w-11 h-11 rounded-lg bg-gradient-to-b from-amber-200/90 to-amber-400/90
                      border border-amber-200/60 flex items-center justify-center
                      shadow-md shadow-black/20">
        <Folder size={22} className="text-amber-900/80" />
      </div>
      <span className="text-[11px] text-white/90 font-normal text-center leading-tight
                       drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-2 w-full">
        {label}
      </span>
    </motion.div>
  );
}

/* ─── Desktop ─── */
export function Desktop() {
  const { openWindow } = useWindowManager();
  const [positions, setPositions] = useState(() => {
    const saved = localStorage.getItem('desktop-icon-positions');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    // Default: vertical column layout
    const pos = {};
    desktopIcons.forEach((item, i) => {
      const { x, y } = getGridPos(0, i);
      pos[item.id] = { x, y, col: 0, row: i };
    });
    return pos;
  });

  const handleDragEnd = useCallback((id, snapped) => {
    setPositions((prev) => {
      // Check if another icon occupies this cell
      const occupied = Object.entries(prev).find(
        ([otherId, p]) => otherId !== id && p.col === snapped.col && p.row === snapped.row
      );
      let next;
      if (occupied) {
        // Swap positions
        const [otherId, otherPos] = occupied;
        next = {
          ...prev,
          [id]: { x: snapped.x, y: snapped.y, col: snapped.col, row: snapped.row },
          [otherId]: { x: prev[id].x, y: prev[id].y, col: prev[id].col, row: prev[id].row },
        };
      } else {
        next = {
          ...prev,
          [id]: { x: snapped.x, y: snapped.y, col: snapped.col, row: snapped.row },
        };
      }
      localStorage.setItem('desktop-icon-positions', JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <div className="absolute inset-0 pb-14">
      {desktopIcons.map((item, i) => (
        <DraggableIcon
          key={item.id}
          {...item}
          index={i}
          position={positions[item.id] || getGridPos(0, i)}
          onDragEnd={handleDragEnd}
          onOpen={openWindow}
        />
      ))}
    </div>
  );
}

/* ─── Clock ─── */
function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const day = time.getDate().toString().padStart(2, '0');
  const month = (time.getMonth() + 1).toString().padStart(2, '0');
  const year = time.getFullYear();
  return (
    <div className="text-center text-[11px] leading-tight px-1">
      <div className="font-medium text-white/90">{hours}:{minutes}</div>
      <div className="text-white/55">{day}/{month}/{year}</div>
    </div>
  );
}

/* ─── Taskbar pinned apps ─── */
const pinnedApps = [
  { icon: Monitor, color: '#4cc2ff', title: 'File Explorer' },
  { icon: Chrome, color: '#4285f4', title: 'Edge' },
  { icon: AppWindow, color: '#f25022', title: 'Chrome' },
  { icon: Code2, color: '#23a9f2', title: 'VS Code' },
  { icon: BarChart3, color: '#f2c811', title: 'Power BI' },
  { icon: MessageSquare, color: '#7b83eb', title: 'Teams' },
  { icon: Store, color: '#0078d4', title: 'Store' },
  { icon: Music, color: '#1db954', title: 'Spotify' },
];

/* ─── Start Menu pinned app config ─── */
const startMenuApps = [
  ...desktopIcons,
  { id: 'profile', label: 'Profile', icon: Sparkles },
];

/* ─── Taskbar ─── */
export function Taskbar() {
  const { windows, openWindow, restoreWindow, minimizeWindow, isWindowOpen, isWindowMinimized, focusWindow, activeWindow } =
    useWindowManager();
  const [startOpen, setStartOpen] = useState(false);

  const openWindows = Object.entries(windows).filter(([, w]) => w.isOpen);

  const handleTaskbarClick = (id) => {
    if (!isWindowOpen(id)) {
      openWindow(id);
    } else if (isWindowMinimized(id)) {
      restoreWindow(id);
    } else if (activeWindow === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const iconMap = {
    profile: Sparkles,
    about: User,
    projects: FolderKanban,
    experience: Briefcase,
    skills: BarChart3,
    contact: Mail,
    education: GraduationCap,
    cv: FileText,
  };

  const labelMap = {
    profile: 'Featured Profile',
    about: 'About Me',
    projects: 'Projects',
    experience: 'Experience',
    skills: 'Skills',
    contact: 'Contact',
    education: 'Education',
    cv: 'My CV',
  };

  // Profile is always shown in taskbar as pinned
  const profileOpen = isWindowOpen('profile');
  const profileActive = activeWindow === 'profile' && !isWindowMinimized('profile');
  const profileMin = isWindowMinimized('profile');

  return (
    <>
      {/* Start Menu */}
      <AnimatePresence>
        {startOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-14 left-1/2 -translate-x-1/2 z-[9998]
                       w-[580px] max-w-[94vw] rounded-2xl
                       bg-[#1e1e32]/95 backdrop-blur-3xl border border-white/[0.08]
                       shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Search */}
            <div className="px-6 pt-5 pb-3">
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="text"
                  placeholder="Search apps, settings, documents..."
                  className="w-full bg-white/[0.05] border border-white/[0.07] rounded-xl pl-10 pr-4 py-2.5
                             text-sm text-white placeholder:text-white/20 outline-none
                             focus:border-blue-500/30 focus:bg-white/[0.07] transition-all duration-200"
                />
              </div>
            </div>

            {/* Pinned Section */}
            <div className="px-6 pb-2">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[13px] font-semibold text-white/70">Pinned</span>
                <button className="text-[11px] text-white/30 px-2.5 py-1 rounded-md bg-white/[0.04]
                                   hover:bg-white/[0.08] transition-colors cursor-pointer">
                  All apps &gt;
                </button>
              </div>
              <div className="grid grid-cols-6 gap-0.5">
                {startMenuApps.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { openWindow(item.id); setStartOpen(false); }}
                      className="flex flex-col items-center gap-2 py-3 px-1 rounded-xl
                                 hover:bg-white/[0.07] transition-colors cursor-pointer group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/15
                                      flex items-center justify-center border border-white/[0.06]
                                      group-hover:border-white/[0.12] group-hover:from-blue-500/30 group-hover:to-purple-500/25
                                      transition-all duration-200">
                        <Icon size={20} className="text-blue-300" />
                      </div>
                      <span className="text-[11px] text-white/60 leading-tight text-center group-hover:text-white/80
                                       transition-colors">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recommended / Quick actions */}
            <div className="px-6 py-3 border-t border-white/[0.05]">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[13px] font-semibold text-white/70">Recommended</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { label: 'Featured Profile', icon: Sparkles, id: 'profile', desc: 'Pinned' },
                  { label: 'My CV', icon: FileText, id: 'cv', desc: 'Document' },
                  { label: 'Projects', icon: FolderKanban, id: 'projects', desc: 'Portfolio' },
                  { label: 'Contact', icon: Mail, id: 'contact', desc: 'Get in touch' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { openWindow(item.id); setStartOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                               hover:bg-white/[0.06] transition-colors cursor-pointer group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0
                                    group-hover:bg-white/[0.08] transition-colors">
                      <item.icon size={16} className="text-white/40 group-hover:text-white/60" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12px] text-white/65 font-medium truncate group-hover:text-white/80">{item.label}</div>
                      <div className="text-[10px] text-white/25">{item.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Footer */}
            <div className="bg-white/[0.02] border-t border-white/[0.05] px-6 py-3 flex items-center gap-3">
              <img src={majdiPhoto} alt="Majdi" className="w-9 h-9 rounded-full object-cover border border-white/10" />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-white/75">Majdi Melliti</div>
                <div className="text-[11px] text-white/30">Data Analytics & BI Engineer</div>
              </div>
              <button className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer" title="Power">
                <Power size={16} className="text-white/30" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999]">
        <motion.div
          initial={{ y: 52 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 250, damping: 28 }}
          className="taskbar-main grid grid-cols-[auto_1fr_auto] items-center h-[48px] px-2
                     bg-[#1c1c2e]/80 backdrop-blur-3xl border-t border-white/[0.06]
                     shadow-[0_-4px_30px_rgba(0,0,0,0.3)]"
        >
          {/* Left: Weather */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer">
            <CloudSun size={18} className="text-amber-300" />
            <div className="text-[11px] leading-tight">
              <div className="text-white/80 font-medium">22°C</div>
              <div className="text-white/45">Ensoleillé</div>
            </div>
          </div>

          {/* Center: Start + Search + Profile (pinned) + Pinned Apps + Open Windows */}
          <div className="flex items-center justify-center gap-0.5">
            {/* Start Button */}
            <button
              onClick={() => setStartOpen(!startOpen)}
              className="w-10 h-10 rounded-md flex items-center justify-center
                         hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <rect x="1" y="1" width="8" height="8" rx="1.5" fill="#60A5FA" />
                <rect x="11" y="1" width="8" height="8" rx="1.5" fill="#60A5FA" />
                <rect x="1" y="11" width="8" height="8" rx="1.5" fill="#60A5FA" />
                <rect x="11" y="11" width="8" height="8" rx="1.5" fill="#60A5FA" />
              </svg>
            </button>

            {/* Search Bar */}
            <div className="flex items-center gap-2 w-[200px] h-[32px] px-3 rounded-full
                            bg-white/[0.06] border border-white/[0.08] cursor-text
                            hover:bg-white/[0.09] transition-colors mx-1">
              <Search size={14} className="text-white/40 shrink-0" />
              <span className="text-[12px] text-white/30 truncate">Rechercher</span>
            </div>

            {/* Profile — always pinned in taskbar */}
            <button
              onClick={() => handleTaskbarClick('profile')}
              className={`relative w-10 h-10 rounded-md flex items-center justify-center
                         transition-all duration-150 cursor-pointer
                         ${profileActive ? 'bg-white/[0.12]' : 'hover:bg-white/[0.08]'}`}
              title="Featured Profile"
            >
              <Sparkles size={18} className={profileActive ? 'text-blue-300' : 'text-purple-400'} />
              {profileOpen && (
                <div className={`absolute bottom-[3px] left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-200
                               ${profileActive ? 'w-4 bg-blue-400' : profileMin ? 'w-1 bg-white/25' : 'w-2 bg-white/35'}`} />
              )}
            </button>

            {/* Separator */}
            <div className="w-px h-5 bg-white/[0.06] mx-0.5" />

            {/* Pinned Taskbar Apps */}
            {pinnedApps.map((app) => (
              <button
                key={app.title}
                className="relative w-10 h-10 rounded-md flex items-center justify-center
                           hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors cursor-pointer"
                title={app.title}
              >
                <app.icon size={18} style={{ color: app.color }} />
              </button>
            ))}

            {/* Separator before open windows */}
            {openWindows.filter(([id]) => id !== 'profile').length > 0 && (
              <div className="w-px h-5 bg-white/[0.08] mx-1" />
            )}

            {/* Open Window Buttons (excluding profile since it's pinned) */}
            {openWindows.filter(([id]) => id !== 'profile').map(([id]) => {
              const Icon = iconMap[id] || FolderKanban;
              const isActive = activeWindow === id && !isWindowMinimized(id);
              const isMin = isWindowMinimized(id);
              return (
                <button
                  key={id}
                  onClick={() => handleTaskbarClick(id)}
                  className={`relative w-10 h-10 rounded-md flex items-center justify-center
                             transition-all duration-150 cursor-pointer
                             ${isActive ? 'bg-white/[0.12]' : 'hover:bg-white/[0.08]'}`}
                  title={labelMap[id]}
                >
                  <Icon size={18} className={isActive ? 'text-blue-300' : 'text-white/55'} />
                  <div
                    className={`absolute bottom-[3px] left-1/2 -translate-x-1/2 h-[2px] rounded-full
                               transition-all duration-200
                               ${isActive ? 'w-4 bg-blue-400' : isMin ? 'w-1 bg-white/25' : 'w-2 bg-white/35'}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: System Tray */}
          <div className="flex items-center justify-end">
            <button className="p-1.5 rounded-md hover:bg-white/[0.06] transition-colors cursor-pointer">
              <ChevronUp size={13} className="text-white/35" />
            </button>
            <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md hover:bg-white/[0.06] transition-colors cursor-pointer">
              <Wifi size={14} className="text-white/65" />
              <Volume2 size={14} className="text-white/65" />
              <Battery size={14} className="text-white/65" />
            </div>
            <div className="px-2.5 py-1 rounded-md hover:bg-white/[0.06] transition-colors cursor-pointer">
              <Clock />
            </div>
            <div className="w-[5px] h-full hover:bg-white/[0.15] transition-colors cursor-pointer" />
          </div>
        </motion.div>
      </div>

      {/* Click outside to close start menu */}
      {startOpen && (
        <div className="fixed inset-0 z-[9997]" onClick={() => setStartOpen(false)} />
      )}
    </>
  );
}
