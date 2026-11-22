import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, ChevronRight, Download } from 'lucide-react';
import CertificateModal from '../ui/CertificateModal';
import { education, certifications, certificationsPdf } from '../../data/profile';

const degreeIcons = {
  'Master': { color: 'from-amber-500/20 to-yellow-500/10', border: 'border-amber-500/20', dot: 'bg-amber-400' },
  'Engineering': { color: 'from-blue-500/20 to-cyan-500/10', border: 'border-blue-500/20', dot: 'bg-blue-400' },
  'Diploma': { color: 'from-green-500/20 to-emerald-500/10', border: 'border-green-500/20', dot: 'bg-green-400' },
};

function getDegreeStyle(degree) {
  for (const [key, style] of Object.entries(degreeIcons)) {
    if (degree.includes(key)) return style;
  }
  return degreeIcons['Diploma'];
}

export default function EducationContent() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <div className="window-content-shell">
      <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />

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
          Academic background in Computer Engineering & Business Intelligence, plus professional certifications
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

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="window-section-card"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2">
            <Award size={15} className="text-amber-400" />
            Certifications
            <span className="text-xs font-normal text-white/40">
              ({certifications.reduce((n, c) => n + c.items.length, 0)})
            </span>
          </h3>
          <a
            href={certificationsPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10
                       border border-amber-500/25 text-xs font-medium text-amber-300
                       hover:bg-amber-500/20 transition-colors"
          >
            <Download size={12} />
            View all certificates (PDF)
          </a>
        </div>
        <div className="space-y-4">
          {certifications.map((group) => (
            <div key={group.category}>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                {group.category}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {group.items.map((c) => (
                  <button
                    type="button"
                    key={c.title}
                    onClick={() => setSelectedCert({ ...c, category: group.category })}
                    className="group window-item-card p-3 flex items-center gap-3 text-left w-full cursor-pointer
                               hover:bg-white/[0.06] hover:border-amber-500/25 active:scale-[0.99] transition-all"
                  >
                    {c.image ? (
                      <img
                        src={c.image}
                        alt=""
                        loading="lazy"
                        className="w-14 h-10 object-cover object-top rounded border border-white/10 bg-white shrink-0"
                      />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-white/85 leading-snug">{c.title}</div>
                      <div className="text-xs text-white/45 mt-0.5">
                        {c.issuer} · {c.date}
                      </div>
                    </div>
                    <ChevronRight size={15} className="text-white/25 group-hover:text-amber-300 transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
