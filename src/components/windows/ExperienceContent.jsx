import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, TrendingUp, GraduationCap } from 'lucide-react';
import { experiences, education } from '../../data/profile';
import { TechBadge, techNameToIcon } from '../ui/TechIcon';

const typeColors = {
  'full-time': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  'graduation project': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  'internship': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
};

export default function ExperienceContent() {
  return (
    <div className="window-content-shell">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="window-hero-card"
      >
        <h3 className="text-lg font-bold text-white/90 mb-2">Professional Experience</h3>
        <p className="text-sm text-white/50">
          1+ year of experience in Data Analytics, BI & Full-Stack Development
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent" />

        <div className="space-y-7">
          {experiences.map((exp, i) => {
            const typeStyle = typeColors[exp.type] || typeColors['internship'];
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 200 }}
                className="relative pl-14"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[17px] top-3 w-3.5 h-3.5 rounded-full border-2
                                border-blue-400 bg-[#0d1117] z-10">
                  <div className={`absolute inset-1 rounded-full bg-blue-400 ${i === 0 ? 'animate-pulse' : ''}`} />
                </div>

                {/* Connector */}
                <div className="absolute left-[23px] top-5 w-7 h-px bg-blue-500/30" />

                {/* Card */}
                <div className="group p-5 window-item-card
                               hover:bg-white/[0.06] hover:border-blue-500/20
                               transition-all duration-300">
                  {/* Period & Type Badges */}
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg
                                     bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400">
                      <Calendar size={12} />
                      {exp.period}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full ${typeStyle.bg} ${typeStyle.text} border ${typeStyle.border}`}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Role */}
                  <h4 className="text-sm font-semibold text-white/90 mb-1.5 flex items-center gap-2">
                    {exp.role}
                    <ChevronRight size={14} className="text-white/20 group-hover:text-blue-400 
                                                        group-hover:translate-x-1 transition-all" />
                  </h4>

                  {/* Company */}
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={12} className="text-white/30" />
                    <span className="text-sm text-white/50">{exp.company} — {exp.location}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  {exp.highlights && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.highlights.map((h) => (
                        <span key={h} className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 
                                                  rounded-md bg-blue-500/8 text-blue-300/80 border border-blue-500/15">
                          <TrendingUp size={10} /> {h}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <TechBadge key={t} name={t} iconKey={techNameToIcon[t]} />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="window-section-card"
      >
        <h3 className="text-sm font-semibold text-white/90 mb-4 flex items-center gap-2">
          <GraduationCap size={16} className="text-purple-400" />
          Education
        </h3>
        <div className="space-y-4">
          {education.map((edu, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1 rounded-full bg-gradient-to-b from-purple-500 to-pink-500 shrink-0 self-stretch" />
              <div>
                <div className="text-sm font-medium text-white/80">{edu.degree}</div>
                <div className="text-xs text-white/45">{edu.school}</div>
                <div className="text-xs text-white/30 mt-0.5">{edu.period}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
