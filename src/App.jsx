import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WindowManagerProvider, useWindowManager } from './context/WindowManager';
import wallpaper from './assets/windows11wallpapper.webp';
import { Desktop, Taskbar } from './components/Desktop';
import Window from './components/Window';
import {
  User,
  FolderKanban,
  Briefcase,
  BarChart3,
  Mail,
  FileText,
  Sparkles,
  GraduationCap,
} from 'lucide-react';

// Lazy load BootScreen (heavy Three.js dependency) and window contents
const BootScreen = lazy(() => import('./components/BootScreen'));
const ProfileHighlight = lazy(() => import('./components/windows/ProfileHighlight'));
const AboutContent = lazy(() => import('./components/windows/AboutContent'));
const ProjectsContent = lazy(() => import('./components/windows/ProjectsContent'));
const SkillsContent = lazy(() => import('./components/windows/SkillsContent'));
const ExperienceContent = lazy(() => import('./components/windows/ExperienceContent'));
const ContactContent = lazy(() => import('./components/windows/ContactContent'));
const CvContent = lazy(() => import('./components/windows/CvContent'));
const EducationContent = lazy(() => import('./components/windows/EducationContent'));

function DesktopContent() {
  const { openWindow } = useWindowManager();

  useEffect(() => {
    const timer = setTimeout(() => {
      openWindow('profile');
    }, 600);
    return () => clearTimeout(timer);
  }, [openWindow]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Desktop Background */}
      <div className="fixed inset-0 bg-[#0a0a1a] overflow-hidden select-none">
        {/* Windows 11 Wallpaper */}
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${wallpaper})` }}
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/15" />

        {/* Desktop Icons */}
        <Desktop />

        {/* Windows */}
        <Window id="profile" title="Featured Profile" icon={Sparkles}>
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="animate-spin w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full" /></div>}>
            <ProfileHighlight />
          </Suspense>
        </Window>
        <Window id="about" title="About Me" icon={User}>
          <Suspense fallback={null}>
            <AboutContent />
          </Suspense>
        </Window>
        <Window id="projects" title="Projects" icon={FolderKanban}>
          <Suspense fallback={null}>
            <ProjectsContent />
          </Suspense>
        </Window>
        <Window id="skills" title="Skills & Analytics" icon={BarChart3}>
          <Suspense fallback={null}>
            <SkillsContent />
          </Suspense>
        </Window>
        <Window id="experience" title="Experience" icon={Briefcase}>
          <Suspense fallback={null}>
            <ExperienceContent />
          </Suspense>
        </Window>
        <Window id="contact" title="Contact" icon={Mail}>
          <Suspense fallback={null}>
            <ContactContent />
          </Suspense>
        </Window>
        <Window id="education" title="Education" icon={GraduationCap}>
          <Suspense fallback={null}>
            <EducationContent />
          </Suspense>
        </Window>
        <Window id="cv" title="Curriculum Vitae" icon={FileText}>
          <Suspense fallback={null}>
            <CvContent />
          </Suspense>
        </Window>

        {/* Taskbar */}
        <Taskbar />
      </div>
    </motion.div>
  );
}

function App() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <Suspense fallback={null}>
        <AnimatePresence>
          {!booted && <BootScreen onComplete={() => setBooted(true)} />}
        </AnimatePresence>
      </Suspense>

      <WindowManagerProvider>
        <DesktopContent />
      </WindowManagerProvider>
    </>
  );
}

export default App;
