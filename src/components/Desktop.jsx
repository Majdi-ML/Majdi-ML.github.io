import { useState, useEffect } from 'react';
import { useWindowManager } from '../context/WindowManager';
import { motion, AnimatePresence } from 'framer-motion';
import majdiPhoto from '../assets/majdi.png';
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
} from 'lucide-react';

const desktopIcons = [
  { id: 'about', label: 'About Me', icon: User, col: 1, row: 1 },
  { id: 'projects', label: 'Projects', icon: FolderKanban, col: 1, row: 2 },
  { id: 'experience', label: 'Experience', icon: Briefcase, col: 1, row: 3 },
  { id: 'skills', label: 'Skills', icon: BarChart3, col: 1, row: 4 },
  { id: 'contact', label: 'Contact', icon: Mail, col: 1, row: 5 },
  { id: 'cv', label: 'My CV', icon: FileText, col: 1, row: 6 },
];

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const dateStr = time.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <div className="text-right text-xs leading-tight">
      <div className="font-medium">{hours}:{minutes}</div>
      <div className="opacity-70">{dateStr}</div>
    </div>
  );
}

function DesktopIcon({ id, label }) {
  const { openWindow } = useWindowManager();
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => openWindow(id)}
      onDoubleClick={() => openWindow(id)}
      className="flex flex-col items-center gap-2 p-4 rounded-lg w-24 cursor-pointer
                 hover:bg-white/10 transition-colors duration-200 group"
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-b from-amber-200/90 to-amber-400/90
                      border border-amber-100/80 flex items-center justify-center
                      group-hover:from-amber-100 group-hover:to-amber-300
                      group-hover:shadow-lg group-hover:shadow-amber-400/30
                      transition-all duration-300">
        <Folder size={28} className="text-amber-900/85 group-hover:text-amber-950 transition-colors" />
      </div>
      <span className="text-xs text-white font-medium text-center leading-tight
                       drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        {label}
      </span>
    </motion.button>
  );
}

export function Desktop() {
  return (
    <div className="absolute inset-0 p-8 pb-20">
      <div className="flex flex-col gap-2 items-start">
        {desktopIcons.map((item) => (
          <DesktopIcon key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export function Taskbar() {
  const { windows, openWindow, restoreWindow, isWindowOpen, isWindowMinimized, focusWindow } =
    useWindowManager();
  const [startOpen, setStartOpen] = useState(false);

  const openWindows = Object.entries(windows).filter(([, w]) => w.isOpen);

  const handleTaskbarClick = (id) => {
    if (isWindowMinimized(id)) {
      restoreWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const iconMap = {
    about: User,
    projects: FolderKanban,
    experience: Briefcase,
    skills: BarChart3,
    contact: Mail,
    cv: FileText,
  };

  const labelMap = {
    about: 'About Me',
    projects: 'Projects',
    experience: 'Experience',
    skills: 'Skills',
    contact: 'Contact',
    cv: 'My CV',
  };

  return (
    <>
      {/* Start Menu Overlay */}
      <AnimatePresence>
        {startOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[9998]
                       w-[540px] max-w-[92vw] rounded-2xl
                       bg-[#1a1a2e]/90 backdrop-blur-2xl border border-white/10
                       shadow-2xl shadow-black/40 p-6"
          >
            {/* Search */}
            <div className="relative mb-5">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search apps, settings, docs..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5
                           text-sm text-white placeholder:text-white/30 outline-none
                           focus:border-blue-500/50 transition-colors"
              />
            </div>

            {/* Pinned */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-base font-semibold text-white/90">Pinned</span>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {desktopIcons.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        openWindow(item.id);
                        setStartOpen(false);
                      }}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg
                                 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-500/30
                                      flex items-center justify-center border border-white/10">
                        <Icon size={20} className="text-blue-300" />
                      </div>
                      <span className="text-xs text-white/80">{item.label}</span>
                    </button>
                  );
                })}
                {/* External Pinned Apps */}
                <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/40 to-pink-500/30 flex items-center justify-center border border-purple-500/20">
                    <Sparkles size={20} className="text-purple-300" />
                  </div>
                  <span className="text-xs text-white/80">Copilot</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/40 to-yellow-500/30 flex items-center justify-center border border-amber-500/20">
                    <BarChart3 size={20} className="text-amber-300" />
                  </div>
                  <span className="text-xs text-white/80">Power BI</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500/40 to-blue-600/30 flex items-center justify-center border border-sky-500/20">
                    <Code2 size={20} className="text-sky-300" />
                  </div>
                  <span className="text-xs text-white/80">VS Code</span>
                </button>
              </div>
            </div>

            {/* Profile */}
            <div className="border-t border-white/10 pt-4 flex items-center gap-3">
              <img src={majdiPhoto} alt="Majdi" className="w-9 h-9 rounded-full object-cover border border-blue-500/20" />
              <div>
                <div className="text-base font-medium">Majdi Melliti</div>
                <div className="text-sm text-white/50">Data Analytics & BI Engineer</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999]">
        <motion.div
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 25 }}
          className="flex items-center justify-center gap-2 px-6 py-1.5 h-12
                     bg-[#1a1a2e]/85 backdrop-blur-2xl border-t border-white/[0.08]
                     shadow-2xl shadow-black/40"
        >
          {/* Start Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setStartOpen(!startOpen)}
            className="w-10 h-10 rounded-xl flex items-center justify-center
                       hover:bg-white/10 transition-colors cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="1" y="1" width="8" height="8" rx="1.5" fill="#60A5FA" />
              <rect x="11" y="1" width="8" height="8" rx="1.5" fill="#60A5FA" />
              <rect x="1" y="11" width="8" height="8" rx="1.5" fill="#60A5FA" />
              <rect x="11" y="11" width="8" height="8" rx="1.5" fill="#60A5FA" />
            </svg>
          </motion.button>

          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Pinned Apps */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center
                       hover:bg-white/10 transition-colors cursor-pointer"
            title="GitHub Copilot"
          >
            <Sparkles size={18} className="text-purple-400" />
            <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-0.5 rounded-full bg-white/40" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center
                       hover:bg-white/10 transition-colors cursor-pointer"
            title="Power BI"
          >
            <BarChart3 size={18} className="text-amber-400" />
            <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-0.5 rounded-full bg-white/40" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center
                       hover:bg-white/10 transition-colors cursor-pointer"
            title="VS Code"
          >
            <Code2 size={18} className="text-sky-400" />
            <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-0.5 rounded-full bg-white/40" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center
                       hover:bg-white/10 transition-colors cursor-pointer"
            title="Spotify"
          >
            <Music size={18} className="text-green-400" />
            <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-0.5 rounded-full bg-white/40" />
          </motion.button>

          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Open Window Buttons */}
          {openWindows.map(([id]) => {
            const Icon = iconMap[id] || FolderKanban;
            const isActive = !isWindowMinimized(id);
            return (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTaskbarClick(id)}
                className={`relative w-10 h-10 rounded-xl flex items-center justify-center
                           transition-colors cursor-pointer
                           ${isActive ? 'bg-white/15' : 'hover:bg-white/10'}`}
                title={labelMap[id]}
              >
                <Icon size={18} className="text-blue-300" />
                <div
                  className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full
                             transition-all duration-300
                             ${isActive ? 'w-4 bg-blue-400' : 'w-1.5 bg-white/40'}`}
                />
              </motion.button>
            );
          })}

          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* System Tray */}
          <div className="flex items-center gap-3 px-3">
            <ChevronUp size={14} className="text-white/40" />
            <Wifi size={14} className="text-white/70" />
            <Volume2 size={14} className="text-white/70" />
            <Battery size={14} className="text-white/70" />
            <Clock />
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
