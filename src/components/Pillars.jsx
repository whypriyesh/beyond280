import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Image, Zap, Sparkles, Check, Download } from 'lucide-react';

export default function Pillars() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="mt-20 lg:mt-28 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs tracking-widest text-obsidian-accent uppercase font-semibold">
          Platform Architecture
        </span>
        <h2 className="font-heading font-extrabold text-2xl lg:text-3xl tracking-tight text-white">
          Engineered for Modern Thinkers
        </h2>
        <p className="text-sm text-obsidian-muted font-sans max-w-lg leading-relaxed">
          Crafted to optimize content formatting, visual pacing, and creation efficiency. Every detail is focused on making your ideas stand out.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Pillar 1: AI-Assisted Writing */}
        <motion.div 
          variants={itemVariants}
          className="glass-panel rounded-xl p-6 lg:p-8 flex flex-col justify-between gap-8 hover:border-white/10 transition-all duration-300 group"
        >
          <div className="flex flex-col gap-4">
            <div className="w-10 h-10 rounded-lg bg-obsidian-card border border-obsidian-border flex items-center justify-center text-obsidian-accent group-hover:border-obsidian-accent/30 transition-colors">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">AI-Assisted Writing</h3>
              <p className="text-sm text-obsidian-muted leading-relaxed font-sans">
                Intelligent flow enhancement, text structural optimization, and creator-focused rewriting that elevates readability while perfectly preserving your voice.
              </p>
            </div>
          </div>

          {/* Interactive Micro-UI */}
          <div className="w-full bg-[#07070A] border border-obsidian-border rounded-lg p-4 font-mono text-[11px]">
            <div className="flex justify-between items-center pb-2 border-b border-obsidian-border/50 mb-2.5 text-obsidian-muted">
              <span>REWRITE CORE</span>
              <span className="text-obsidian-accent flex items-center gap-1"><Sparkles className="w-3 h-3" /> ACTIVE</span>
            </div>
            <div className="space-y-2">
              <div className="text-white/40 line-through decoration-red-500/50">
                "I think marketing on X is mostly about just writing super long text..."
              </div>
              <div className="text-obsidian-accent flex items-start gap-1">
                <Check className="w-3.5 h-3.5 text-obsidian-success shrink-0 mt-0.5" />
                <span className="text-white">"Social formatting is leverage. Structure long-form content to optimize mobile reading speed."</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pillar 2: Visual Storytelling */}
        <motion.div 
          variants={itemVariants}
          className="glass-panel rounded-xl p-6 lg:p-8 flex flex-col justify-between gap-8 hover:border-white/10 transition-all duration-300 group"
        >
          <div className="flex flex-col gap-4">
            <div className="w-10 h-10 rounded-lg bg-obsidian-card border border-obsidian-border flex items-center justify-center text-obsidian-accent group-hover:border-obsidian-accent/30 transition-colors">
              <Image className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">Visual Storytelling</h3>
              <p className="text-sm text-obsidian-muted leading-relaxed font-sans">
                Transform paragraphs into clean, custom-designed typographic cards. Fully optimized color contrasts and spacing designed for high scroll stop-rates.
              </p>
            </div>
          </div>

          {/* Interactive Micro-UI */}
          <div className="w-full grid grid-cols-3 gap-2">
            <div className="aspect-[4/3] rounded border border-obsidian-border bg-[#0D0D11] flex flex-col p-2 gap-1.5 opacity-90 justify-center">
              <div className="w-6 h-1 bg-obsidian-accent rounded"></div>
              <div className="w-10 h-0.5 bg-white/30 rounded"></div>
              <div className="w-8 h-0.5 bg-white/30 rounded"></div>
            </div>
            <div className="aspect-[4/3] rounded border border-obsidian-accent/40 bg-obsidian-card flex flex-col p-2 gap-1.5 justify-center shadow-lg shadow-obsidian-accentMuted">
              <div className="w-4 h-1 bg-obsidian-accent rounded"></div>
              <div className="w-12 h-0.5 bg-white/60 rounded"></div>
              <div className="w-10 h-0.5 bg-white/60 rounded"></div>
            </div>
            <div className="aspect-[4/3] rounded border border-obsidian-border bg-[#0D0D11] flex flex-col p-2 gap-1.5 opacity-90 justify-center">
              <div className="w-8 h-1 bg-obsidian-accent rounded"></div>
              <div className="w-7 h-0.5 bg-white/30 rounded"></div>
              <div className="w-5 h-0.5 bg-white/30 rounded"></div>
            </div>
          </div>
        </motion.div>

        {/* Pillar 3: Creator Workflow Speed */}
        <motion.div 
          variants={itemVariants}
          className="glass-panel rounded-xl p-6 lg:p-8 flex flex-col justify-between gap-8 hover:border-white/10 transition-all duration-300 group md:col-span-2"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col gap-4 max-w-md">
              <div className="w-10 h-10 rounded-lg bg-obsidian-card border border-obsidian-border flex items-center justify-center text-obsidian-accent group-hover:border-obsidian-accent/30 transition-colors">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white mb-2">Creator Workflow Speed</h3>
                <p className="text-sm text-obsidian-muted leading-relaxed font-sans">
                  Zero setup overhead. Instant live canvas updates, swift keyboard shortcuts, adaptive templates, and one-click high-resolution PNG rendering.
                </p>
              </div>
            </div>

            {/* Interactive Micro-UI */}
            <div className="w-full md:w-auto bg-[#07070A] border border-obsidian-border rounded-lg p-4 font-mono text-[10px] space-y-2 shrink-0 md:min-w-[200px]">
              <div className="flex justify-between items-center gap-8 text-obsidian-muted">
                <span>OPTIMIZE TEXT</span>
                <kbd className="px-1.5 py-0.5 rounded bg-obsidian-card border border-obsidian-border text-white">⌘K</kbd>
              </div>
              <div className="flex justify-between items-center gap-8 text-obsidian-muted">
                <span>EXPORT DESIGN</span>
                <kbd className="px-1.5 py-0.5 rounded bg-obsidian-card border border-obsidian-border text-white">⌘E</kbd>
              </div>
              <div className="flex justify-between items-center gap-8 text-obsidian-muted">
                <span>TOGGLE PRESENTS</span>
                <kbd className="px-1.5 py-0.5 rounded bg-obsidian-card border border-obsidian-border text-white">Tab</kbd>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
