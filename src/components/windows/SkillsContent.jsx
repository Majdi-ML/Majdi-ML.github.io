import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills, kpis } from '../../data/profile';
import KpiCard from '../ui/KpiCard';
import TechIcon from '../ui/TechIcon';

const categoryColors = {
  'Data & BI': { bg: 'bg-blue-500/10', text: 'text-blue-400', bar: 'from-blue-500 to-cyan-400' },
  'Programming': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', bar: 'from-emerald-500 to-green-400' },
  'Web': { bg: 'bg-purple-500/10', text: 'text-purple-400', bar: 'from-purple-500 to-pink-400' },
  'Databases': { bg: 'bg-amber-500/10', text: 'text-amber-400', bar: 'from-amber-500 to-orange-400' },
  'ML & AI': { bg: 'bg-rose-500/10', text: 'text-rose-400', bar: 'from-rose-500 to-red-400' },
  'DevOps': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', bar: 'from-cyan-500 to-sky-400' },
};

const categories = [...new Set(skills.map((s) => s.category))];

export default function SkillsContent() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All' ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <div className="window-content-shell">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.label} kpi={kpi} index={i} />
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
                       ${activeCategory === cat
                         ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                         : 'bg-white/5 text-white/50 border border-white/8 hover:bg-white/10'
                       }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Icons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((skill, i) => {
          const colors = categoryColors[skill.category] || categoryColors['DevOps'];
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="group p-3 window-item-card hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                  <TechIcon iconKey={skill.icon} size={20} />
                </div>
                <span className="text-sm font-medium text-white/90 leading-tight">{skill.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-md ${colors.bg} ${colors.text}`}>
                  {skill.category}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
