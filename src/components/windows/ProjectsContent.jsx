import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FolderOpen, Database, BarChart3, Globe, Brain } from 'lucide-react';
import { projects, kpis } from '../../data/profile';
import KpiCard from '../ui/KpiCard';
import { TechBadge, techNameToIcon } from '../ui/TechIcon';

// Project category icons and colors
const categoryStyle = {
  'Data Engineering': { icon: Database, color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/20' },
  'BI': { icon: BarChart3, color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/20' },
  'Data Science': { icon: Brain, color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/20' },
  'Web App': { icon: Globe, color: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/20' },
};

const categories = ['All', ...new Set(projects.map((p) => p.category))];

export default function ProjectsContent() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="window-content-shell">
      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.label} kpi={kpi} index={i} />
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
                       ${active === cat
                         ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                         : 'bg-white/5 text-white/50 border border-white/8 hover:bg-white/10'
                       }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((project, i) => {
          const style = categoryStyle[project.category] || categoryStyle['Web App'];
          const CategoryIcon = style.icon;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group window-item-card rounded-xl
                         hover:bg-white/[0.06] hover:border-blue-500/20
                         transition-all duration-300 overflow-hidden"
            >
              {/* Project Header with gradient */}
              <div className={`h-20 bg-gradient-to-br ${style.color} relative flex items-center
                              justify-center border-b border-white/5`}>
                <CategoryIcon size={32} className="text-white/20" />
                <div className="absolute top-2 right-2">
                  <ExternalLink
                    size={14}
                    className="text-white/20 group-hover:text-white/50 transition-colors"
                  />
                </div>
                <span className="absolute bottom-2 left-3 text-[10px] text-white/40 bg-black/20 
                                 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <FolderOpen size={16} className="text-blue-400" />
                  <h4 className="text-base font-semibold text-white/90">{project.title}</h4>
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <TechBadge key={t} name={t} iconKey={techNameToIcon[t]} />
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
