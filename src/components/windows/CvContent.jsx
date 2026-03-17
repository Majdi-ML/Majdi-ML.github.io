import { motion } from 'framer-motion';
import { Download, FileText, Briefcase, GraduationCap, Wrench, Globe, Award, MapPin, Mail, Phone } from 'lucide-react';
import { profile, skills, experiences, education, languages, activities } from '../../data/profile';
import majdiPhoto from '../../assets/majdi.webp';

function SectionTitle({ icon, label }) {
  return (
    <div className="flex items-center gap-2.5">
      {icon}
      <h3 className="text-xs font-bold text-white/55 uppercase tracking-widest">{label}</h3>
    </div>
  );
}

export default function CvContent() {
  const topSkills = skills.slice(0, 12);

  return (
    <div className="window-content-shell">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between gap-6"
      >
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <img
              src={majdiPhoto}
              alt="Majdi"
              className="w-20 h-20 rounded-2xl object-cover border border-white/10 shadow-lg shadow-black/40"
            />
            <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0d1117]" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-white leading-none">{profile.name}</h2>
            <p className="text-blue-400 text-sm font-semibold tracking-wide">{profile.title}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-0.5">
              <span className="flex items-center gap-1.5 text-xs text-white/40">
                <MapPin size={11} className="text-white/30" /> {profile.location}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/40">
                <Mail size={11} className="text-white/30" /> {profile.email}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/40">
                <Phone size={11} className="text-white/30" /> {profile.phone}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <a
            href="/CV_Majdi_Melliti_.pdf"
            download="CV_Majdi_Melliti_FR.pdf"
            className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl
                       bg-blue-500/15 border border-blue-500/30 text-sm font-semibold text-blue-400
                       hover:bg-blue-500/25 hover:border-blue-400/50 hover:text-blue-300
                       active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <Download size={15} />
            Download FR
          </a>
          <a
            href="/CV_Majdi_Melliti_EN.pdf"
            download="CV_Majdi_Melliti_EN.pdf"
            className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl
                       bg-purple-500/15 border border-purple-500/30 text-sm font-semibold text-purple-300
                       hover:bg-purple-500/25 hover:border-purple-400/50 hover:text-purple-200
                       active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <Download size={15} />
            Download EN
          </a>
        </div>
      </motion.div>

      {/* ── Summary ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        className="window-section-card space-y-3"
      >
        <SectionTitle icon={<FileText size={15} className="text-blue-400" />} label="Summary" />
        <p className="text-sm text-white/60 leading-relaxed">{profile.bio}</p>
      </motion.div>

      {/* ── Experience ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
        className="window-section-card space-y-4"
      >
        <SectionTitle icon={<Briefcase size={15} className="text-blue-400" />} label="Experience" />
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="flex gap-4">
              <div className="flex flex-col items-center pt-1 shrink-0">
                <div className="w-2 h-2 rounded-full bg-blue-400 ring-2 ring-blue-400/20" />
                <div className="w-px flex-1 mt-1 bg-gradient-to-b from-blue-500/40 to-purple-500/10" />
              </div>
              <div className="pb-2 space-y-1">
                <div className="text-sm font-semibold text-white/90">{exp.role}</div>
                <div className="text-xs text-white/45">
                  {exp.company}
                  <span className="mx-1.5 text-white/20">·</span>
                  <span className="text-white/30">{exp.period}</span>
                </div>
                {exp.description && (
                  <p className="text-xs text-white/40 leading-relaxed">{exp.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Education ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
        className="window-section-card space-y-4"
      >
        <SectionTitle icon={<GraduationCap size={15} className="text-purple-400" />} label="Education" />
        <div className="space-y-4">
          {education.map((edu, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center pt-1 shrink-0">
                <div className="w-2 h-2 rounded-full bg-purple-400 ring-2 ring-purple-400/20" />
                <div className="w-px flex-1 mt-1 bg-gradient-to-b from-purple-500/40 to-pink-500/10" />
              </div>
              <div className="pb-2 space-y-1">
                <div className="text-sm font-semibold text-white/90">{edu.degree}</div>
                <div className="text-xs text-white/45">
                  {edu.school}
                  <span className="mx-1.5 text-white/20">·</span>
                  <span className="text-white/30">{edu.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Skills + Languages ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
          className="window-section-card space-y-4"
        >
          <SectionTitle icon={<Wrench size={15} className="text-emerald-400" />} label="Skills" />
          <div className="flex flex-wrap gap-2">
            {topSkills.map((s) => (
              <span key={s.name}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.09]
                           text-xs font-medium text-white/65 hover:text-white/90
                           hover:bg-white/[0.10] hover:border-white/[0.15]
                           transition-all duration-150 cursor-default">
                {s.name}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}
          className="window-section-card space-y-5"
        >
          <div className="space-y-3">
            <SectionTitle icon={<Globe size={15} className="text-cyan-400" />} label="Languages" />
            <div className="space-y-3">
              {languages.map((l) => (
                <div key={l.name} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-white/70">{l.name}</span>
                    <span className="text-xs text-white/35">{l.level}</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{
                        width: l.level === 'Native' ? '100%' :
                               l.level === 'Fluent' || l.level === 'C2' ? '90%' :
                               l.level === 'Advanced' || l.level === 'C1' ? '75%' :
                               l.level === 'Intermediate' || l.level === 'B2' ? '55%' : '35%'
                      }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/[0.06]" />

          <div className="space-y-3">
            <SectionTitle icon={<Award size={15} className="text-amber-400" />} label="Activities" />
            <ul className="space-y-2">
              {activities.map((a) => (
                <li key={a} className="flex items-start gap-2 text-xs text-white/55">
                  <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-amber-400/60 shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

    </div>
  );
}