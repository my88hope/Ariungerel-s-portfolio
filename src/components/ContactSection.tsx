import React, { useState } from 'react';
import { Mail, Send, Check, Sparkles, MessageSquare, ExternalLink } from 'lucide-react';
import { USER_PROFILE } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', message: '' });
  const [sentSuccess, setSentSuccess] = useState(false);

  const contactEmail = 'My88hope@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.message.trim()) return;
    setSentSuccess(true);
  };

  return (
    <section id="contact" className="py-28 px-5 sm:px-8 md:px-10 bg-[#0E0E10] relative overflow-hidden border-t border-white/5">
      {/* Decorative gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-purple-900/20 via-pink-900/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Header */}
        <FadeIn delay={0.1} y={20}>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
            <Mail className="w-3.5 h-3.5" />
            Get In Touch
          </span>
        </FadeIn>

        <FadeIn delay={0.15} y={25}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Let's Connect & Build Together
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={30}>
          <p className="text-neutral-400 max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-10">
            Have advice for a young developer, feedback on my web projects, or just want to say hi? I would love to hear from you!
          </p>
        </FadeIn>

        {/* Contact Container */}
        <FadeIn delay={0.25} y={30}>
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border-white/10 text-left max-w-2xl mx-auto shadow-2xl">
            {/* Direct Email quick action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase block">Email Address</span>
                  <span className="text-sm sm:text-base font-semibold text-white font-mono break-all">
                    {contactEmail}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>

                <a
                  href={`mailto:${contactEmail}?subject=Hello%20Ariungerel`}
                  className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-purple-600 hover:bg-purple-500 text-white transition-all duration-200 no-underline inline-flex items-center gap-1.5"
                >
                  <span>Open Mail</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Quick Note Form */}
            {sentSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Thank you for your message!</h4>
                <p className="text-xs text-neutral-300">
                  Your message was noted. You can also write directly to <span className="text-purple-300 font-mono">{contactEmail}</span>.
                </p>
                <button
                  onClick={() => {
                    setSentSuccess(false);
                    setFormState({ name: '', message: '' });
                  }}
                  className="mt-4 text-xs font-semibold text-neutral-400 hover:text-white underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alex"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Message or Coding Tip
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Leave a message, feedback on my creations, or tips for my software developer journey..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gradient-pill-btn rounded-full py-3.5 text-white font-medium uppercase tracking-widest text-xs sm:text-sm inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
