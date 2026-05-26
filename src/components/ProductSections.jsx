import React from 'react';
import { motion } from 'framer-motion';
import { FeatherLogo } from './Icons';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function ProductSections({ onFocusWorkspace }) {
  return (
    <div className="w-full flex flex-col mt-10 md:mt-16 gap-0">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: THE ORIGIN STORY — "Why I built this"
          Personal, emotional, authentic. NOT marketing copy.
      ═══════════════════════════════════════════════════════════════ */}
      <section id="story" className="py-12 md:py-16 border-t border-white/5 scroll-mt-20">
        <div className="max-w-2xl mx-auto flex flex-col gap-5">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="flex flex-col gap-2"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-obsidian-accent uppercase font-bold">
              The backstory
            </span>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
              I built this because I was frustrated.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col gap-6 text-sm md:text-[15px] text-[#A0A0B8] font-sans leading-[1.85]"
          >
            <motion.p variants={fadeUp} custom={0}>
              I kept running into the same wall. I'd have a thought — not a hot take, not a meme — just something honest I wanted to share. A lesson I learned the hard way. A perspective that needed more than a sentence. Something that deserved breathing room.
            </motion.p>

            <motion.p variants={fadeUp} custom={1}>
              But X gave me 280 characters. So I'd start cutting words, simplifying ideas, losing nuance. By the time it fit, the meaning was gone. The thing I originally wanted to say? Buried under compromises.
            </motion.p>

            <motion.p variants={fadeUp} custom={2}>
              I tried threads — but threads feel scattered. I tried screenshots of Notes app — but they look terrible and nobody trusts them. I tried Canva, Figma, even manual CSS — but spending 20 minutes designing a card for one post felt absurd.
            </motion.p>

            <motion.p variants={fadeUp} custom={3}>
              I just wanted to <span className="text-white font-medium">write my thought, pick a vibe, and get a beautiful image</span> — in under a minute. Something that looked like I spent hours on it, even though I didn't. Something that stopped the scroll because the typography was genuinely good, not because it was loud or clickbaity.
            </motion.p>

            <motion.p variants={fadeUp} custom={4} className="text-white/80">
              So I built Beyond280. Not for startups. Not for agencies. For anyone who's ever typed a thought, hit the character limit, and thought — <em className="text-obsidian-accent font-medium not-italic">"this deserves better."</em>
            </motion.p>
          </motion.div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: WHY VISUAL STORYTELLING MATTERS
          Emotional reasoning, not feature listing
      ═══════════════════════════════════════════════════════════════ */}
      <section id="why-visual" className="py-12 md:py-16 border-t border-white/5 scroll-mt-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-5"
          >
            <motion.span variants={fadeUp} className="font-mono text-[10px] tracking-[0.2em] text-obsidian-accent uppercase font-bold">
              Why visual posts win
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading font-extrabold text-2xl md:text-3xl text-white tracking-tight leading-tight">
              Text gets scrolled past.<br />
              <span className="text-obsidian-accent">Images get read.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-sm text-[#A0A0B8] font-sans leading-relaxed">
              Think about the posts that actually stop you mid-scroll. They're almost never plain text. They're typographic cards, clean quotes, or designed statements that stand out because they look intentional. When your thoughts look premium, people give them premium attention.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-5"
          >
            <motion.div variants={fadeUp} custom={0} className="bg-[#0C0C10] border border-white/5 rounded-xl p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[10px] font-mono text-obsidian-muted uppercase tracking-wider font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
                Plain text post
              </div>
              <p className="text-xs text-white/40 font-sans leading-relaxed">
                "I think the best career advice I ever got was to stop optimizing for the next job and start optimizing for the work that makes you lose track of time. Most people chase titles. The ones who win chase craft."
              </p>
              <span className="text-[9px] text-white/20 font-mono">12 likes · lost in the timeline</span>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="bg-[#0D0D11] border border-[#E2C29B]/20 rounded-xl p-6 flex flex-col gap-3 shadow-lg shadow-[#E2C29B]/5">
              <div className="flex items-center gap-2 text-[10px] font-mono text-obsidian-accent uppercase tracking-wider font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-obsidian-accent"></span>
                Beyond280 visual card
              </div>
              <div className="bg-[#0D0D11] border border-[#E2C29B]/15 rounded-lg p-4">
                <p className="text-xs text-white font-sans leading-relaxed font-medium">
                  "Stop optimizing for the next job title. Start optimizing for the work that makes you lose track of time."
                </p>
                <p className="text-[10px] text-white/50 mt-2 font-sans">The ones who win chase craft, not credentials.</p>
              </div>
              <span className="text-[9px] text-obsidian-accent font-mono font-bold">847 likes · 12 reposts · bookmarked 200+ times</span>
            </motion.div>
          </motion.div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: HOW IT ACTUALLY WORKS — The workflow, not specs
          Human language explaining the process
      ═══════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-12 md:py-16 border-t border-white/5 scroll-mt-20">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            className="text-center flex flex-col gap-3 max-w-xl mx-auto"
          >
            <motion.span variants={fadeUp} className="font-mono text-[10px] tracking-[0.2em] text-obsidian-accent uppercase font-bold">
              How it works
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading font-extrabold text-2xl md:text-3xl text-white tracking-tight leading-tight">
              Write it. Style it. Post it.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-sm text-[#A0A0B8] font-sans leading-relaxed">
              No accounts. No onboarding. No "upgrade to pro" walls. Just open the studio and start.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                step: '01',
                title: 'Dump your thoughts',
                body: "Write whatever's on your mind. Don't worry about length, structure, or grammar. Just get it out. The editor is your thinking space."
              },
              {
                step: '02',
                title: 'Pick a look',
                body: "Choose a theme that fits the mood. Dark and authoritative? Light and clean? Warm and personal? Adjust fonts, layout, aspect ratio — all in real-time."
              },
              {
                step: '03',
                title: 'Export and post',
                body: "One click. High-resolution PNG. Drag it into your tweet, LinkedIn post, or Instagram story. Your thought now looks like it was designed by a professional."
              }
            ].map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                custom={i}
                className="flex flex-col gap-3 p-5 rounded-xl border border-white/5 bg-[#0A0A0E]/60 hover:border-white/10 transition-all duration-300"
              >
                <span className="font-mono text-[10px] text-obsidian-accent font-bold tracking-wider">{item.step}</span>
                <h3 className="text-white font-bold text-sm">{item.title}</h3>
                <p className="text-[12px] text-[#A0A0B8] font-sans leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: WHY SIMPLICITY MATTERS — Philosophy, not features
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <motion.span variants={fadeUp} className="font-mono text-[10px] tracking-[0.2em] text-obsidian-accent uppercase font-bold">
              Design philosophy
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading font-extrabold text-2xl md:text-3xl text-white tracking-tight leading-tight">
              I didn't build another Canva.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-sm text-[#A0A0B8] font-sans leading-relaxed">
              Most design tools try to do everything. Beyond280 does one thing and does it well. You write text, you get a beautiful card. No layers. No drag-and-drop. No 47 toolbar icons. Just typographic precision and speed.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              {
                label: 'Speed over complexity',
                detail: "From thought to exportable image in under 60 seconds. That's the benchmark."
              },
              {
                label: 'Typography over decoration',
                detail: "Great type doesn't need gradients, icons, or stock photos. Clean text on a well-chosen background is timeless."
              },
              {
                label: 'Creator intent preserved',
                detail: "AI grammar tools fix your mistakes without changing your voice. Your words, your style — just polished."
              },
              {
                label: 'No accounts, no data',
                detail: "Open the site. Make your card. Download it. That's it. No sign-ups, no tracking, no upsells."
              }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                custom={i}
                className="p-5 rounded-xl border border-white/5 bg-[#0A0A0E]/60 hover:border-white/10 transition-all duration-300 flex flex-col gap-2"
              >
                <h4 className="text-white text-xs font-bold">{item.label}</h4>
                <p className="text-[11px] text-[#A0A0B8] font-sans leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: VISUAL THEMES PREVIEW
          Kept elegant, but with human copy
      ═══════════════════════════════════════════════════════════════ */}
      <section id="themes" className="py-12 md:py-16 border-t border-white/5 scroll-mt-20">
        <div className="max-w-5xl mx-auto flex flex-col gap-7">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            className="text-center flex flex-col gap-3 max-w-xl mx-auto"
          >
            <motion.span variants={fadeUp} className="font-mono text-[10px] tracking-[0.2em] text-obsidian-accent uppercase font-bold">
              Four moods, one click
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading font-extrabold text-2xl md:text-3xl text-white tracking-tight leading-tight">
              Your words. Your aesthetic.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-sm text-[#A0A0B8] font-sans leading-relaxed">
              Every theme was designed to feel intentional — not templated. Pick the one that matches the energy of what you're saying.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Obsidian */}
            <motion.div variants={fadeUp} custom={0} className="p-6 rounded-xl border border-white/5 bg-[#0D0D11] hover:border-[#E2C29B]/30 transition-all duration-300 flex flex-col justify-between aspect-[4/3] group">
              <span className="font-mono text-[9px] text-[#E2C29B] tracking-wider uppercase font-bold">Obsidian</span>
              <div className="my-2">
                <h4 className="font-heading font-extrabold text-white text-sm mb-1">Bold & authoritative</h4>
                <p className="text-[11px] text-obsidian-muted font-sans leading-relaxed">
                  For posts that need to feel like a mic drop. Dark, premium, undeniable.
                </p>
              </div>
              <div className="w-8 h-0.5 bg-[#E2C29B] rounded"></div>
            </motion.div>

            {/* Ethereal */}
            <motion.div variants={fadeUp} custom={1} className="p-6 rounded-xl border border-white/5 bg-[#F1F5F9] hover:border-[#CBD5E1]/50 transition-all duration-300 flex flex-col justify-between aspect-[4/3] group">
              <span className="font-mono text-[9px] text-[#64748B] tracking-wider uppercase font-bold">Ethereal</span>
              <div className="my-2">
                <h4 className="font-serif italic font-semibold text-[#0F172A] text-sm mb-1">Clean & thoughtful</h4>
                <p className="text-[11px] text-[#475569] font-sans leading-relaxed">
                  When you want your words to breathe. Light, crisp, editorial.
                </p>
              </div>
              <div className="w-8 h-0.5 bg-[#0F172A] rounded"></div>
            </motion.div>

            {/* Parchment */}
            <motion.div variants={fadeUp} custom={2} className="p-6 rounded-xl border border-white/5 bg-[#FAF6F0] hover:border-[#D4CBBF]/50 transition-all duration-300 flex flex-col justify-between aspect-[4/3] group">
              <span className="font-mono text-[9px] text-[#8A7B76] tracking-wider uppercase font-bold">Parchment</span>
              <div className="my-2">
                <h4 className="font-serif italic font-semibold text-[#3A2E2B] text-sm mb-1">Warm & personal</h4>
                <p className="text-[11px] text-[#4A3E3B] font-sans leading-relaxed">
                  Feels like a handwritten note. Cozy, intimate, human.
                </p>
              </div>
              <div className="w-8 h-0.5 bg-[#3A2E2B] rounded"></div>
            </motion.div>

            {/* Clay */}
            <motion.div variants={fadeUp} custom={3} className="p-6 rounded-xl border border-white/5 bg-[#E2725B] hover:border-white/20 transition-all duration-300 flex flex-col justify-between aspect-[4/3] group">
              <span className="font-mono text-[9px] text-[#FFFDD0] tracking-wider uppercase font-bold">Clay</span>
              <div className="my-2">
                <h4 className="font-serif italic font-semibold text-[#FFFDD0] text-sm mb-1">Earthy & grounded</h4>
                <p className="text-[11px] text-[#FFFDD0]/90 font-sans leading-relaxed">
                  For when you want to feel organic and real. Earthy, alive, warm.
                </p>
              </div>
              <div className="w-8 h-0.5 bg-[#FFFDD0] rounded"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6: FINAL CTA — Emotional, not salesy
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="font-heading font-extrabold text-3xl md:text-4xl text-white tracking-tight leading-tight"
          >
            Your next thought deserves<br />
            <span className="bg-gradient-to-r from-[#E2C29B] to-[#C49B74] bg-clip-text text-transparent">more than 280 characters.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs md:text-sm text-[#A0A0B8] leading-relaxed font-sans max-w-md mx-auto"
          >
            No sign-up. No paywall. Just open the studio and turn your raw thinking into something people actually stop scrolling for.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            onClick={onFocusWorkspace}
            className="interactive-scale px-7 py-3.5 bg-gradient-to-r from-[#E2C29B] to-[#C49B74] hover:brightness-110 text-obsidian-bg font-sans font-extrabold text-sm rounded-full shadow-lg shadow-obsidian-accentMuted transition-all duration-300 active:scale-[0.97]"
          >
            Open the Studio
          </motion.button>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7: CREATOR NOTE + FOLLOW
          Personal, warm, not self-promotional
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-14 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="max-w-md mx-auto flex flex-col items-center text-center gap-5"
        >
          {/* Small branded icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-obsidian-accent/20 to-[#C49B74]/10 border border-[#E2C29B]/20 flex items-center justify-center">
            <FeatherLogo className="w-4.5 h-4.5 text-obsidian-accent" />
          </div>

          <p className="text-sm text-[#A0A0B8] font-sans leading-relaxed">
            Built by <span className="text-white font-medium">a creator who needed this tool</span> and couldn't find it anywhere. If Beyond280 helped you share something meaningful, that's all I wanted.
          </p>

          {/* Follow CTA */}
          <a
            href="https://x.com/priyeshkumar04"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 hover:border-obsidian-accent/30 bg-[#0A0A0E]/80 transition-all duration-300"
          >
            {/* X/Twitter icon */}
            <svg className="w-3.5 h-3.5 text-[#A0A0B8] group-hover:text-obsidian-accent transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="text-xs text-[#A0A0B8] group-hover:text-white font-medium transition-colors duration-200">
              Follow @priyeshkumar04
            </span>
          </a>

          <p className="text-[10px] text-white/25 font-mono uppercase tracking-widest mt-2">
            Built by a creator, for creators.
          </p>

        </motion.div>
      </section>

    </div>
  );
}
