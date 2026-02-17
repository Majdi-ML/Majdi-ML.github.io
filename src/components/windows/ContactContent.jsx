import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { profile } from '../../data/profile';

export default function ContactContent() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Portfolio Contact - ${form.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href = `mailto:majdi.melliti@esprit.tn?subject=${subject}&body=${body}`;

    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  const contacts = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'majdi-melliti', href: profile.linkedin },
    { icon: Github, label: 'GitHub', value: 'Majdi-ML', href: profile.github },
    { icon: MapPin, label: 'Location', value: profile.location, href: null },
  ];

  return (
    <div className="window-content-shell">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-bold text-white/90 mb-2">Get in Touch</h3>
        <p className="text-base text-white/50">
          Open to opportunities in Data Engineering, BI, and Full-Stack Development
        </p>
      </motion.div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            target={c.href?.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="group flex items-center gap-3 p-4 window-item-card
                       border border-white/[0.06] hover:bg-white/[0.06]
                       hover:border-blue-500/20 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center
                            group-hover:bg-blue-500/20 transition-colors">
              <c.icon size={18} className="text-blue-400" />
            </div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-wider">{c.label}</div>
              <div className="text-base text-white/80">{c.value}</div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="form-card1"
      >
        <div className="form-card2">
          <form className="form" onSubmit={handleSubmit}>
            <p className="form-heading">Send a Message</p>

            <div className="form-field">
              <input
                required
                type="text"
                className="input-field"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="form-field">
              <Mail size={16} className="text-cyan-300/80" />
              <input
                required
                type="email"
                className="input-field"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="form-field">
              <textarea
                required
                rows={4}
                className="input-field"
                placeholder="Your message..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <button type="submit" className="sendMessage-btn flex items-center justify-center gap-2">
              {sent ? (
                <>
                  <CheckCircle size={14} /> Sent!
                </>
              ) : (
                <>
                  <Send size={14} /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
