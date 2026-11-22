import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Calendar, Building2, ExternalLink, FileText } from 'lucide-react';
import { certificationsPdf } from '../../data/profile';

/**
 * Small Windows-style dialog showing one certificate.
 * Rendered in a portal on <body> so it is not clipped / offset by the
 * transformed (draggable) parent window.
 */
export default function CertificateModal({ cert, onClose }) {
  useEffect(() => {
    if (!cert) return;
    // Capture phase + stopPropagation so Escape closes only this dialog,
    // not the window behind it.
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [cert, onClose]);

  return createPortal(
    <AnimatePresence>
      {cert && (
        <motion.div
          key="cert-backdrop"
          className="fixed inset-0 z-[10050] flex items-center justify-center p-4 pb-16 bg-black/55 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={cert.title}
            className="relative w-full max-w-[560px] max-h-full flex flex-col overflow-hidden rounded-lg
                       bg-[#1c1c2e]/95 backdrop-blur-3xl border border-white/[0.1]
                       shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.7 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between pl-3 h-[40px] shrink-0 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 min-w-0">
                <Award size={13} className="text-amber-400 shrink-0" />
                <span className="text-[13px] font-medium text-white/85 truncate">Certificate</span>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="w-[46px] h-[40px] flex items-center justify-center hover:bg-[#c42b1c]
                           active:bg-[#c42b1c] transition-colors group cursor-pointer"
              >
                <X size={15} className="text-white/70 group-hover:text-white" />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain custom-scrollbar p-4 sm:p-5 space-y-4">
              {/* Certificate preview */}
              {cert.image ? (
                <a href={cert.image} target="_blank" rel="noopener noreferrer" title="Open full size">
                  <img
                    src={cert.image}
                    alt={`Certificate — ${cert.title}`}
                    className="w-full rounded-md border border-white/10 bg-white shadow-lg shadow-black/30"
                  />
                </a>
              ) : (
                <div className="flex items-center justify-center h-32 rounded-md border border-dashed border-white/15">
                  <Award size={40} className="text-amber-400/60" />
                </div>
              )}

              {/* Details */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white/95 leading-snug">{cert.title}</h3>
                {cert.category && (
                  <div className="text-xs uppercase tracking-wider text-amber-300/70 mt-1">{cert.category}</div>
                )}
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60">
                <span className="flex items-center gap-1.5">
                  <Building2 size={14} className="text-white/35" /> {cert.issuer}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-white/35" /> {cert.date}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                               bg-amber-500/15 border border-amber-500/30 text-sm font-medium text-amber-300
                               hover:bg-amber-500/25 transition-colors"
                  >
                    <ExternalLink size={14} /> Verify credential
                  </a>
                )}
                <a
                  href={cert.page ? `${certificationsPdf}#page=${cert.page}` : certificationsPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                             bg-white/[0.05] border border-white/10 text-sm font-medium text-white/70
                             hover:bg-white/[0.1] transition-colors"
                >
                  <FileText size={14} /> Open in PDF
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
