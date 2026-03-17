import { useState, useEffect } from 'react';
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
} from 'lucide-react';

const desktopIcons = [
  { id: 'about', label: 'About Me', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: BarChart3 },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'cv', label: 'My CV', icon: FileText },
];

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

function DesktopIcon({ id, label, index }) {
  const { openWindow } = useWindowManager();
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.08, type: 'spring', stiffness: 300 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => openWindow(id)}
      onDoubleClick={() => openWindow(id)}
      className="desktop-icon-btn flex flex-col items-center gap-1.5 p-3 rounded-md w-[76px] cursor-pointer
                 hover:bg-white/[0.06] active:bg-white/[0.1] transition-colors duration-150 group"
    >
      <div className="w-11 h-11 rounded-lg bg-gradient-to-b from-amber-200/90 to-amber-400/90
                      border border-amber-200/60 flex items-center justify-center
                      group-hover:from-amber-100 group-hover:to-amber-300
                      group-hover:shadow-lg group-hover:shadow-amber-400/25
                      transition-all duration-200 shadow-md shadow-black/20">
        <Folder size={22} className="text-amber-900/80 group-hover:text-amber-950 transition-colors" />
      </div>
      <span className="text-[11px] text-white/90 font-normal text-center leading-tight
                       drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-2">
        {label}
      </span>
    </motion.button>
  );
}

export function Desktop() {
  return (
    <div className="absolute inset-0 p-4 pb-16">
      <div className="flex flex-col gap-0.5 items-start">
        {desktopIcons.map((item, i) => (
          <DesktopIcon key={item.id} {...item} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ─── Taskbar pinned apps (visual only, like real Win11) ─── */
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

export function Taskbar() {
  const { windows, openWindow, restoreWindow, minimizeWindow, isWindowOpen, isWindowMinimized, focusWindow, activeWindow } =
    useWindowManager();
  const [startOpen, setStartOpen] = useState(false);

  const openWindows = Object.entries(windows).filter(([, w]) => w.isOpen);

  const handleTaskbarClick = (id) => {
    if (isWindowMinimized(id)) {
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

  return (
    <>
      {/* Start Menu Overlay */}
      <AnimatePresence>
        {startOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-14 left-1/2 -translate-x-1/2 z-[9998]
                       w-[540px] max-w-[92vw] rounded-xl
                       bg-[#202032]/95 backdrop-blur-3xl border border-white/[0.1]
                       shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_1px_rgba(255,255,255,0.1)_inset] overflow-hidden"
          >
            {/* Search */}
            <div className="p-5 pb-0">
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Rechercher des applications, paramètres..."
                  className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg pl-10 pr-4 py-2.5
                             text-sm text-white placeholder:text-white/25 outline-none
                             focus:border-blue-500/40 focus:bg-white/[0.08] transition-all duration-200"
                />
              </div>
            </div>

            {/* Pinned */}
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-white/80">Pinned</span>
                <span className="text-[11px] text-white/30 px-2 py-0.5 rounded bg-white/[0.05]">All apps &gt;</span>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {desktopIcons.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        openWindow(item.id);
                        setStartOpen(false);
                      }}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-lg
                                 hover:bg-white/[0.08] transition-colors cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/25 to-purple-500/20
                                      flex items-center justify-center border border-white/[0.08]">
                        <Icon size={18} className="text-blue-300" />
                      </div>
                      <span className="text-[11px] text-white/70 leading-tight text-center">{item.label}</span>
                    </button>
                  );
                })}
                {/* External Pinned Apps */}
                <button className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-white/[0.08] transition-colors cursor-pointer">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/20 flex items-center justify-center border border-purple-500/15">
                    <Sparkles size={18} className="text-purple-300" />
                  </div>
                  <span className="text-[11px] text-white/70">Copilot</span>
                </button>
                <button className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-white/[0.08] transition-colors cursor-pointer">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/30 to-yellow-500/20 flex items-center justify-center border border-amber-500/15">
                    <BarChart3 size={18} className="text-amber-300" />
                  </div>
                  <span className="text-[11px] text-white/70">Power BI</span>
                </button>
                <button className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-white/[0.08] transition-colors cursor-pointer">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500/30 to-blue-600/20 flex items-center justify-center border border-sky-500/15">
                    <Code2 size={18} className="text-sky-300" />
                  </div>
                  <span className="text-[11px] text-white/70">VS Code</span>
                </button>
              </div>
            </div>

            {/* Profile Footer */}
            <div className="bg-white/[0.03] border-t border-white/[0.06] px-5 py-3 flex items-center gap-3">
              <img src={majdiPhoto} alt="Majdi" className="w-8 h-8 rounded-full object-cover border border-white/10" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white/80">Majdi Melliti</div>
                <div className="text-[11px] text-white/35">Data Analytics & BI Engineer</div>
              </div>
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
          {/* ─── Left: Weather Widget ─── */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer">
            <CloudSun size={18} className="text-amber-300" />
            <div className="text-[11px] leading-tight">
              <div className="text-white/80 font-medium">22°C</div>
              <div className="text-white/45">Ensoleillé</div>
            </div>
          </div>

          {/* ─── Center: Start + Search + Pinned Apps + Open Windows ─── */}
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
            {openWindows.length > 0 && <div className="w-px h-5 bg-white/[0.08] mx-1" />}

            {/* Open Window Buttons */}
            {openWindows.map(([id]) => {
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
                               ${isActive
                                 ? 'w-4 bg-blue-400'
                                 : isMin
                                   ? 'w-1 bg-white/25'
                                   : 'w-2 bg-white/35'}`}
                  />
                </button>
              );
            })}
          </div>

          {/* ─── Right: System Tray ─── */}
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
        <div
          className="fixed inset-0 z-[9997]"
          onClick={() => setStartOpen(false)}
        />
      )}
    </>
  );
}
