import { motion } from 'framer-motion';
import { MapPin, Mail, Github, Linkedin, Phone, Database, BarChart3, Code2, Server, Brain, Award } from 'lucide-react';
import { profile, languages, softSkills, activities } from '../../data/profile';
import majdiPhoto from '../../assets/majdi.png';

const highlights = [
  { icon: Database, label: 'Data Engineering', desc: 'ETL, Talend, Pipelines' },
  { icon: BarChart3, label: 'Business Intelligence', desc: 'Power BI, Tableau, KPIs' },
  { icon: Code2, label: 'Full-Stack Dev', desc: 'Laravel, Vue.js, Angular' },
  { icon: Server, label: 'Databases', desc: 'MySQL, PostgreSQL, Oracle' },
  { icon: Brain, label: 'ML & AI', desc: 'Scikit-learn, TensorFlow' },
  { icon: Award, label: 'Agile/Scrum', desc: 'User Stories, Backlog' },
];

export default function AboutContent() {
  return (
    <div className="window-content-shell">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-start gap-6"
      >
        <img
          src={majdiPhoto}
          alt="Majdi Melliti"
          className="w-24 h-24 rounded-2xl object-cover shrink-0 border-2 border-blue-500/30
                     shadow-lg shadow-blue-500/20"
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-3xl font-bold text-white mb-1.5">{profile.name}</h2>
          <p className="text-blue-400 font-medium text-lg mb-2">{profile.title}</p>
          <p className="text-base text-white/60 leading-relaxed">{profile.tagline}</p>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <span className="flex items-center gap-2 text-sm text-white/50">
              <MapPin size={14} /> {profile.location}
            </span>
            <span className="flex items-center gap-2 text-sm text-white/50">
              <Mail size={14} /> {profile.email}
            </span>
            <span className="flex items-center gap-2 text-sm text-white/50">
              <Phone size={14} /> {profile.phone}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="window-section-card"
      >
        <h3 className="text-base font-semibold text-white/90 mb-3">Profile</h3>
        <p className="text-base text-white/60 leading-relaxed">{profile.bio}</p>
      </motion.div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {highlights.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.06 }}
            className="group p-5 window-item-card
                       hover:bg-white/[0.06] hover:border-blue-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center
                              group-hover:bg-blue-500/20 transition-colors shrink-0">
                <item.icon size={18} className="text-blue-400" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-white/90 truncate">{item.label}</div>
                <div className="text-xs text-white/40 truncate">{item.desc}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Languages & Soft Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="window-section-card"
        >
          <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Languages</h4>
          <div className="space-y-2.5">
            {languages.map((l) => (
              <div key={l.name} className="flex justify-between text-sm">
                <span className="text-white/70">{l.name}</span>
                <span className="text-white/40">{l.level}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="window-section-card"
        >
          <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Activities</h4>
          <div className="space-y-2">
            {activities.map((a) => (
              <div key={a} className="text-sm text-white/55">• {a}</div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-wrap gap-3 pt-1"
      >
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20
                     text-sm text-blue-400 hover:bg-blue-500/20 transition-colors"
        >
          <Linkedin size={14} /> LinkedIn
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10
                     text-sm text-white/70 hover:bg-white/10 transition-colors"
        >
          <Github size={14} /> GitHub
        </a>
      </motion.div>
    </div>
  );
}
