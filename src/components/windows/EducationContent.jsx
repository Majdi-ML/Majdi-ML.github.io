import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { education } from '../../data/profile';

const degreeIcons = {
  'Master': { color: 'from-amber-500/20 to-yellow-500/10', border: 'border-amber-500/20', dot: 'bg-amber-400' },
  'Engineering': { color: 'from-blue-500/20 to-cyan-500/10', border: 'border-blue-500/20', dot: 'bg-blue-400' },
  'Baccalaureate': { color: 'from-green-500/20 to-emerald-500/10', border: 'border-green-500/20', dot: 'bg-green-400' },
};

function getDegreeStyle(degree) {
  for (const [key, style] of Object.entries(degreeIcons)) {
    if (degree.includes(key)) return style;
  }
  return degreeIcons['Baccalaureate'];
}

export default function EducationContent() {
  return (
    <div className="window-content-shell">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="window-hero-card"
      >
        <h3 className="text-lg font-bold text-white/90 mb-2 flex items-center gap-2">
          <GraduationCap size={20} className="text-purple-400" />
          Education
        </h3>
        <p className="text-sm text-white/50">
          Academic background in IT Engineering & Business Intelligence
        </p>
      </motion.div>

      {/* Education Cards */}
      <div className="space-y-4">
        {education.map((edu, i) => {
          const style = getDegreeStyle(edu.degree);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 200 }}
              className="window-item-card p-5 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Degree Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.color} border ${style.border}
                                flex items-center justify-center shrink-0`}>
                  <GraduationCap size={22} className="text-white/70" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Degree */}
                  <h4 className="text-sm font-semibold text-white/90 mb-1">
                    {edu.degree}
                  </h4>

                  {/* School */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin size={12} className="text-white/30 shrink-0" />
                    <span className="text-sm text-white/55">{edu.school}</span>
                  </div>

                  {/* Period */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg
                                   bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400">
                    <Calendar size={11} />
                    {edu.period}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Certifications / Extra */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="window-section-card"
      >
        <h3 className="text-sm font-semibold text-white/90 mb-3 flex items-center gap-2">
          <Award size={15} className="text-amber-400" />
          Highlights
        </h3>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5 text-sm text-white/55">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
            Engineering Degree with BI Major — ESPRIT, Tunisia
          </div>
          <div className="flex items-center gap-2.5 text-sm text-white/55">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            Master 1 MDSI — ESPRIT Business School
          </div>
          <div className="flex items-center gap-2.5 text-sm text-white/55">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
            Baccalaureate in Mathematics — June 2020
          </div>
        </div>
      </motion.div>
    </div>
  );
}
