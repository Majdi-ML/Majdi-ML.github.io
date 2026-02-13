import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WindowManagerProvider, useWindowManager } from './context/WindowManager';
import wallpaper from './assets/windows11wallpapper.png';
import { Desktop, Taskbar } from './components/Desktop';
import Window from './components/Window';
import BootScreen from './components/BootScreen';
import AboutContent from './components/windows/AboutContent';
import ProjectsContent from './components/windows/ProjectsContent';
import SkillsContent from './components/windows/SkillsContent';
import ExperienceContent from './components/windows/ExperienceContent';
import ContactContent from './components/windows/ContactContent';
import CvContent from './components/windows/CvContent';
import ProfileHighlight from './components/windows/ProfileHighlight';
import {
  User,
  FolderKanban,
  Briefcase,
  BarChart3,
  Mail,
  FileText,
  Sparkles,
} from 'lucide-react';

function DesktopContent() {
  const { openWindow } = useWindowManager();

  useEffect(() => {
    // Ouvrir la fenêtre profile automatiquement au démarrage
    const timer = setTimeout(() => {
      openWindow('profile');
    }, 500);
    return () => clearTimeout(timer);
  }, [openWindow]);

  return (
    <>
      {/* Desktop Background */}
      <div className="fixed inset-0 bg-[#0a0a1a] overflow-hidden select-none">
        {/* Windows 11 Wallpaper */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${wallpaper})` }}
        />
        {/* Slight vignette overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />

        {/* Desktop Icons */}
        <Desktop />

        {/* Windows */}
        <Window id="profile" title="Featured Profile" icon={Sparkles}>
          <ProfileHighlight />
        </Window>
        <Window id="about" title="About Me" icon={User}>
          <AboutContent />
        </Window>
        <Window id="projects" title="Projects" icon={FolderKanban}>
          <ProjectsContent />
        </Window>
        <Window id="skills" title="Skills & Analytics" icon={BarChart3}>
          <SkillsContent />
        </Window>
        <Window id="experience" title="Experience" icon={Briefcase}>
          <ExperienceContent />
        </Window>
        <Window id="contact" title="Contact" icon={Mail}>
          <ContactContent />
        </Window>
        <Window id="cv" title="Curriculum Vitae" icon={FileText}>
          <CvContent />
        </Window>

        {/* Taskbar */}
        <Taskbar />
      </div>
    </>
  );
}

function App() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      <WindowManagerProvider>
        <DesktopContent />
      </WindowManagerProvider>
    </>
  );
}

export default App;
