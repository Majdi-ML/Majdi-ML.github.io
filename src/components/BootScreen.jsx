import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import majdiPhoto from '../assets/majdi.png';

export default function BootScreen({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[99999] bg-[#0a0a1a] flex flex-col items-center justify-center"
    >
      {/* Photo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="mb-8"
      >
        <img
          src={majdiPhoto}
          alt="Majdi Melliti"
          className="w-24 h-24 rounded-full object-cover border-3 border-blue-500/40
                     shadow-2xl shadow-blue-500/30"
        />
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-2xl font-bold text-white/90 mb-1"
      >
        Majdi Melliti
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-sm text-blue-400/80 mb-12"
      >
        Data Analytics & BI Engineer
      </motion.p>

      {/* Bouton Entrer */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="group relative px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                   rounded-lg font-semibold text-white shadow-lg shadow-blue-500/30
                   hover:shadow-blue-500/50 transition-all duration-300
                   flex items-center gap-2"
      >
        <span>Entrer</span>
        <ArrowRight 
          size={18} 
          className="group-hover:translate-x-1 transition-transform duration-300" 
        />
      </motion.button>

      {/* Text hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="text-xs text-white/40 mt-6"
      >
        Cliquez pour accéder au portfolio
      </motion.p>
    </motion.div>
  );
}
