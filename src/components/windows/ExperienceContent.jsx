import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Building2, TrendingUp, ChevronDown, Zap } from 'lucide-react';
import { experiences } from '../../data/profile';
import { TechBadge, techNameToIcon } from '../ui/TechIcon';

const typeConfig = {
  'full-time': {
    label: 'Full-time',
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'shadow-blue-500/20',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/15',
    accent: 'bg-blue-400',
    accentBorder: 'border-l-blue-500',
  },
  'graduation project': {
    label: 'Graduation Project',
    gradient: 'from-purple-500 to-pink-400',
    glow: 'shadow-purple-500/20',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/15',
    accent: 'bg-purple-400',
    accentBorder: 'border-l-purple-500',
  },
  internship: {
    label: 'Internship',
    gradient: 'from-emerald-500 to-teal-400',
    glow: 'shadow-emerald-500/20',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/15',
    accent: 'bg-emerald-400',
    accentBorder: 'border-l-emerald-500',
  },
};

function StatCard({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 250 }}
      className="flex-1 text-center py-3"
    >
      <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-[11px] text-white/35 mt-1.5 uppercase tracking-wider font-medium">{label}</div>
    </motion.div>
  );
}

function ExperienceCard({ exp, index, isExpanded, onToggle }) {
  const config = typeConfig[exp.type] || typeConfig.internship;
  const isFirst = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.08, type: 'spring', stiffness: 200, damping: 24 }}
    >
      <div
        onClick={onToggle}
        className={`group relative rounded-2xl border-l-[3px] overflow-hidden
                    transition-all duration-400 ease-out cursor-pointer
                    ${config.accentBorder}
                    ${isExpanded
                      ? 'bg-white/[0.06] border border-white/[0.1] shadow-2xl ' + config.glow
                      : 'bg-white/[0.025] border border-white/[0.06] hover:bg-white/[0.05] hover:shadow-xl hover:border-white/[0.1] hover:-translate-y-0.5'
                    }`}
      >
        {/* Main content */}
        <div className="px-7 pt-7 pb-6">
          {/* Top: Icon + Meta + Chevron */}
          <div className="flex items-start gap-5">
            {/* Company icon */}
            <div className="relative shrink-0">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${config.gradient}
                              flex items-center justify-center shadow-lg ${config.glow}`}>
                <Building2 size={22} className="text-white" />
              </div>
              {isFirst && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.accent} opacity-50`} />
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${config.accent}`} />
                </span>
              )}
            </div>

            {/* Title + Company */}
            <div className="flex-1 min-w-0 pt-0.5">
              <h4 className="text-lg font-semibold text-white/95 leading-normal">
                {exp.role}
              </h4>
              <div className="flex items-center gap-2 mt-2 text-sm text-white/45">
                <MapPin size={13} className="shrink-0" />
                <span className="truncate">{exp.company} — {exp.location}</span>
              </div>
            </div>

            {/* Chevron */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="shrink-0 mt-2 opacity-30 group-hover:opacity-50 transition-opacity"
            >
              <ChevronDown size={18} />
            </motion.div>
          </div>

          {/* Period + Type */}
          <div className="flex items-center gap-3 mt-6 flex-wrap">
            <span className="inline-flex items-center gap-2 text-sm text-white/45 font-medium
                             bg-white/[0.04] px-3.5 py-2 rounded-lg">
              <Calendar size={14} className="text-white/30" />
              {exp.period}
            </span>
            <span className={`text-[11px] font-bold uppercase tracking-[0.12em] px-3.5 py-2 rounded-lg
                             ${config.bg} ${config.text} border ${config.border}`}>
              {config.label}
            </span>
          </div>

          {/* Highlights */}
          {exp.highlights && (
            <div className="flex flex-wrap gap-2.5 mt-6">
              {exp.highlights.map((h) => (
                <span key={h} className={`inline-flex items-center gap-1.5 text-[12px] font-medium
                                          px-3.5 py-2 rounded-lg
                                          ${config.bg} ${config.text} border ${config.border}
                                          transition-colors duration-200`}>
                  <Zap size={11} className="opacity-70" /> {h}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Expandable description + tech */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="mx-7 mb-7 pt-6 border-t border-white/[0.06]">
                <p className="text-sm text-white/55 leading-[1.9]">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2.5 mt-6">
                  {exp.tech.map((t) => (
                    <TechBadge key={t} name={t} iconKey={techNameToIcon[t]} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ExperienceContent() {
  const [expandedId, setExpandedId] = useState(experiences[0]?.id ?? null);
  const totalCompanies = new Set(experiences.map((e) => e.company)).size;

  return (
    <div className="window-content-shell">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="window-hero-card p-6"
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500
                          flex items-center justify-center shadow-xl shadow-blue-500/25">
            <TrendingUp size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white/95">Professional Experience</h3>
            <p className="text-sm text-white/45 mt-1">Data Analytics, BI & Full-Stack Development</p>
          </div>
        </div>

        <div className="flex items-center pt-4 border-t border-white/[0.06]">
          <StatCard value={experiences.length} label="Positions" delay={0.1} />
          <div className="w-px h-9 bg-white/[0.06] shrink-0" />
          <StatCard value={totalCompanies} label="Companies" delay={0.2} />
          <div className="w-px h-9 bg-white/[0.06] shrink-0" />
          <StatCard value="1+" label="Years" delay={0.3} />
          <div className="w-px h-9 bg-white/[0.06] shrink-0" />
          <StatCard value="8+" label="Dashboards" delay={0.4} />
        </div>
      </motion.div>

      {/* Experience Cards */}
      <div className="flex flex-col gap-7">
        {experiences.map((exp, i) => (
          <ExperienceCard
            key={exp.id}
            exp={exp}
            index={i}
            isExpanded={expandedId === exp.id}
            onToggle={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
          />
        ))}
      </div>
    </div>
  );
}
  