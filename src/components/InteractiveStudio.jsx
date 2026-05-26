import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Download, RotateCcw, AlignLeft, AlignCenter, 
  Layout, Type, Sliders, CheckCircle2, AlertCircle
} from 'lucide-react';
import { optimizeCreatorText } from '../services/ai';
import { toPng } from 'html-to-image';

// Stylized theme palettes
const PRESETS = {
  obsidian: {
    name: 'Obsidian Black',
    cardBg: 'bg-[#0D0D11]',
    border: 'border border-[#E2C29B]/30',
    titleColor: 'text-[#E2C29B]',
    bodyColor: 'text-white/90',
    badgeBg: 'bg-[#E2C29B]/10',
    badgeText: 'text-[#E2C29B]',
    fontFamily: 'font-sans',
    headingFont: 'font-heading',
    metaColor: 'text-[#8E8E9F]'
  },
  ethereal: {
    name: 'Ethereal Clinical',
    cardBg: 'bg-[#F8F9FA]',
    border: 'border border-[#4A5568]/15',
    titleColor: 'text-[#2D3748]',
    bodyColor: 'text-[#4A5568]',
    badgeBg: 'bg-[#4A5568]/10',
    badgeText: 'text-[#4A5568]',
    fontFamily: 'font-sans',
    headingFont: 'font-serif italic',
    metaColor: 'text-[#718096]'
  },
  cyberpunk: {
    name: 'Synthetic Neon',
    cardBg: 'bg-[#000000]',
    border: 'border border-[#00F0FF]/40',
    titleColor: 'text-[#00F0FF] text-glow-ai',
    bodyColor: 'text-[#CCCCCC]',
    badgeBg: 'bg-[#00F0FF]/15',
    badgeText: 'text-[#00F0FF]',
    fontFamily: 'font-mono',
    headingFont: 'font-mono font-bold uppercase',
    metaColor: 'text-[#00F0FF]/70'
  },
  clay: {
    name: 'Organic Clay',
    cardBg: 'bg-[#E2725B]',
    border: 'border border-[#FFFDD0]/30',
    titleColor: 'text-[#FFFDD0]',
    bodyColor: 'text-[#FFFDD0]/95',
    badgeBg: 'bg-[#FFFDD0]/15',
    badgeText: 'text-[#FFFDD0]',
    fontFamily: 'font-serif',
    headingFont: 'font-serif italic font-semibold',
    metaColor: 'text-[#FFFDD0]/75'
  }
};

const DEFAULT_TEXT = "Social content on X shouldn't be constrained by a simple character count. When you have deep, nuanced insights, condensing them into a raw tweet strips away their true authority.\n\nBeyond280 fixes this by instantly formatting, polishing, and packing your long-form thoughts into ultra-premium typographic cards that command visual space and force high stop-rates. Action breeds clarity.";

export default function InteractiveStudio() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [theme, setTheme] = useState('obsidian');
  const [align, setAlign] = useState('left');
  const [padding, setPadding] = useState('medium');
  const [fontSize, setFontSize] = useState('medium');
  
  // AI related state
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [aiHeadline, setAiHeadline] = useState("Scale Your Thoughts");
  const [aiBody, setAiBody] = useState(DEFAULT_TEXT);
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  
  // Stats telemetry
  const [readingTime, setReadingTime] = useState("12s read");
  const [readability, setReadability] = useState("Clear & Engaging");
  const [engagement, setEngagement] = useState("+42%");
  
  // UI states
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  
  const canvasRef = useRef(null);

  // Update statistics dynamically when raw text changes (non-AI path)
  useEffect(() => {
    if (!isStreaming) {
      const words = text.trim().split(/\s+/).filter(Boolean).length;
      const calcSec = Math.ceil(words / 3.3);
      setReadingTime(`${calcSec}s read`);
      setReadability(words > 25 ? "Clear & Engaging" : "Simple");
      
      // Keep canvas updated with edited raw text when not streaming
      setAiBody(text);
      if (text.length > 0) {
        const firstLine = text.split('\n')[0];
        setAiHeadline(firstLine.substring(0, 50) + (firstLine.length > 50 ? '...' : ''));
      }
    }
  }, [text, isStreaming]);

  // Handle AI Optimization Action
  const handleAIOptimize = async () => {
    if (!text.trim()) return;
    setIsOptimizing(true);
    setStreamingText("");
    setIsStreaming(true);

    try {
      const response = await optimizeCreatorText(text, (chunk) => {
        setStreamingText(chunk);
      });

      setAiHeadline(response.headline);
      setAiBody(response.optimizedBody);
      setReadingTime(response.readingTime);
      setReadability(response.readability);
      setEngagement(response.engagementBoost);
    } catch (e) {
      console.error(e);
    } finally {
      setIsOptimizing(false);
      setIsStreaming(false);
    }
  };

  // Reset Editor to initial template
  const handleReset = () => {
    setText(DEFAULT_TEXT);
    setStreamingText("");
    setIsStreaming(false);
    setTheme('obsidian');
    setAlign('left');
    setPadding('medium');
    setFontSize('medium');
    setEngagement("+42%");
  };

  // Genuinely Functional PNG Download Engine using html-to-image
  const handleExportPNG = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);

    // Give visual time to breathe, then export
    try {
      // Ensure all custom fonts (Newsreader, Fraunces) have loaded
      await document.fonts.ready;

      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 3, // Premium 3x Ultra-Retina scale
        style: {
          transform: 'scale(1)',
          boxShadow: 'none',
        }
      });

      const link = document.createElement('a');
      link.download = `Beyond280-Post-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
      // Trigger elegant toast success
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const currentCharCount = text.length;
  const isOverflowing = currentCharCount > 280;

  // Compute layout styles based on selections
  const getPaddingClass = () => {
    if (padding === 'tight') return 'p-6 md:p-8';
    if (padding === 'large') return 'p-12 md:p-16';
    return 'p-8 md:p-12';
  };

  const getFontSizeClass = () => {
    if (fontSize === 'small') return 'text-sm md:text-base leading-relaxed';
    if (fontSize === 'large') return 'text-lg md:text-xl leading-relaxed';
    return 'text-base md:text-lg leading-relaxed';
  };

  const currentTheme = PRESETS[theme];

  return (
    <div id="creator-workspace" className="flex flex-col gap-8 scroll-mt-8">
      {/* Visual Workspace Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-border pb-6">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white">Interactive Studio</h2>
          <p className="text-xs text-obsidian-muted font-mono mt-1 uppercase tracking-wider">
            V1.0 ENGINE // ACCELERATED CREATION
          </p>
        </div>
        <button 
          onClick={handleReset}
          className="self-start sm:self-center interactive-scale flex items-center gap-1.5 px-3 py-1.5 rounded bg-obsidian-card hover:bg-obsidian-cardHover border border-obsidian-border text-xs text-obsidian-muted hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset workspace</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: Writing Workspace */}
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs text-white/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-obsidian-accent"></span>
              EDITOR
            </span>
            <div className="font-mono text-xs flex items-center gap-3">
              <span className={isOverflowing ? 'text-obsidian-accent' : 'text-obsidian-muted'}>
                {currentCharCount}
              </span>
              <span className="text-white/20">/</span>
              <span className="text-white/40">280 CHARS</span>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isOptimizing}
              placeholder="Paste or type your long thoughts here..."
              className="w-full h-80 bg-obsidian-card border border-obsidian-border hover:border-white/10 focus:border-obsidian-accent/30 rounded-xl p-5 font-mono text-sm leading-relaxed text-white/90 focus:outline-none focus:ring-0 resize-none transition-colors"
            />
            {isOverflowing && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded bg-obsidian-accentMuted border border-obsidian-accent/20 font-mono text-[10px] text-obsidian-accent"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>LIMIT EXCEEDED (IMAGE EXPORT ACTIVE)</span>
              </motion.div>
            )}
          </div>

          {/* AI Refiner Trigger */}
          <button
            onClick={handleAIOptimize}
            disabled={isOptimizing || !text.trim()}
            className={`interactive-scale w-full py-4 rounded-xl flex items-center justify-center gap-2.5 font-sans font-semibold text-sm border transition-all duration-300 ${
              isOptimizing 
                ? 'bg-obsidian-card border-obsidian-ai/40 text-obsidian-ai animate-pulse-slow' 
                : 'bg-obsidian-card hover:bg-obsidian-cardHover border-obsidian-border text-white hover:border-obsidian-accent/30'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${isOptimizing ? 'text-obsidian-ai text-glow-ai' : 'text-obsidian-accent'}`} />
            <span>{isOptimizing ? 'Optimizing with Beyond AI...' : 'Refine & Format with AI'}</span>
          </button>

          {/* Telemetry Metrics */}
          <div className="grid grid-cols-3 gap-4 bg-[#07070A] border border-obsidian-border rounded-xl p-4 font-mono text-xs">
            <div className="flex flex-col gap-1.5">
              <span className="text-obsidian-muted uppercase text-[9px] tracking-wider">Reading Time</span>
              <span className="text-white font-medium">{readingTime}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-obsidian-muted uppercase text-[9px] tracking-wider">Readability</span>
              <span className="text-white font-medium">{readability}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-obsidian-muted uppercase text-[9px] tracking-wider">Attention Lift</span>
              <span className="text-obsidian-accent font-semibold text-glow">{engagement}</span>
            </div>
          </div>
        </div>

        {/* Right Side: The Preview Canvas & Preset Controls */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs text-white/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-obsidian-success"></span>
              LIVE PREVIEW CANVAS
            </span>
          </div>

          {/* Live Render Canvas - This element is exported directly */}
          <div className="w-full bg-[#050505] rounded-2xl overflow-hidden border border-obsidian-border accent-glow-card">
            <div 
              ref={canvasRef}
              className={`w-full aspect-[4/3] flex flex-col justify-between transition-all duration-300 ${currentTheme.cardBg} ${currentTheme.fontFamily} ${getPaddingClass()}`}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs uppercase ${
                    theme === 'ethereal' ? 'bg-[#2D3748] text-white' : 'bg-[#E2C29B] text-obsidian-bg'
                  }`}>
                    B
                  </div>
                  <div>
                    <div className={`font-semibold text-xs tracking-tight ${theme === 'ethereal' ? 'text-[#2D3748]' : 'text-white'}`}>
                      Beyond280
                    </div>
                    <div className={`text-[10px] font-mono tracking-wider ${currentTheme.metaColor}`}>
                      @beyond280
                    </div>
                  </div>
                </div>

                <div className={`px-2 py-0.5 rounded font-mono text-[9px] tracking-wider uppercase font-semibold border ${
                  theme === 'cyberpunk' ? 'border-[#00F0FF]/30' : 'border-white/10'
                } ${currentTheme.badgeBg} ${currentTheme.badgeText}`}>
                  AI Synthesized
                </div>
              </div>

              {/* Card Body */}
              <div className={`flex-grow flex flex-col justify-center my-6 ${align === 'center' ? 'text-center' : 'text-left'}`}>
                {isStreaming ? (
                  /* Typwriter Streaming AI Output */
                  <div className="flex flex-col gap-3 font-mono text-xs text-obsidian-ai">
                    <span className="font-semibold text-sm uppercase tracking-wide">STREAMING CORRECTION //</span>
                    <p className="whitespace-pre-wrap leading-relaxed max-h-[160px] overflow-y-auto pr-1">
                      {streamingText}
                    </p>
                  </div>
                ) : (
                  /* Completed Formatted Output */
                  <div className="flex flex-col gap-3">
                    <h3 className={`font-bold text-lg md:text-xl leading-snug tracking-tight ${currentTheme.headingFont} ${currentTheme.titleColor}`}>
                      {aiHeadline}
                    </h3>
                    <p className={`whitespace-pre-wrap ${getFontSizeClass()} ${currentTheme.bodyColor}`}>
                      {aiBody}
                    </p>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-white/5 font-mono text-[9px] text-obsidian-muted">
                <span className={currentTheme.metaColor}>PUBLISHED BY BEYOND280.COM</span>
                <span className={`tracking-widest ${currentTheme.metaColor}`}>✦ ✦ ✦</span>
              </div>
            </div>
          </div>

          {/* Preset Customizers (Apple-level restraint) */}
          <div className="glass-panel rounded-xl p-5 flex flex-col gap-4 font-sans text-xs">
            {/* Presets Grid */}
            <div className="flex flex-col gap-2">
              <span className="text-obsidian-muted font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5" /> Presets
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.keys(PRESETS).map((key) => (
                  <button
                    key={key}
                    onClick={() => setTheme(key)}
                    className={`px-3 py-2 rounded-lg border text-center transition-all duration-200 ${
                      theme === key 
                        ? 'bg-obsidian-accentMuted border-obsidian-accent text-white font-medium' 
                        : 'bg-obsidian-card hover:bg-obsidian-cardHover border-obsidian-border text-obsidian-muted hover:text-white'
                    }`}
                  >
                    {PRESETS[key].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Micro Layout Modifiers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-obsidian-border/50">
              
              {/* Alignment */}
              <div className="flex flex-col gap-1.5">
                <span className="text-obsidian-muted font-mono text-[9px] uppercase tracking-wider flex items-center gap-1">
                  <AlignLeft className="w-3 h-3" /> Alignment
                </span>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setAlign('left')}
                    className={`flex-1 py-1 px-2 rounded border text-center font-medium ${
                      align === 'left' 
                        ? 'bg-white/10 border-white/20 text-white' 
                        : 'bg-transparent border-obsidian-border text-obsidian-muted hover:text-white'
                    }`}
                  >
                    Left
                  </button>
                  <button 
                    onClick={() => setAlign('center')}
                    className={`flex-1 py-1 px-2 rounded border text-center font-medium ${
                      align === 'center' 
                        ? 'bg-white/10 border-white/20 text-white' 
                        : 'bg-transparent border-obsidian-border text-obsidian-muted hover:text-white'
                    }`}
                  >
                    Center
                  </button>
                </div>
              </div>

              {/* Padding */}
              <div className="flex flex-col gap-1.5">
                <span className="text-obsidian-muted font-mono text-[9px] uppercase tracking-wider flex items-center gap-1">
                  <Sliders className="w-3 h-3" /> Padding
                </span>
                <div className="flex gap-1">
                  {['tight', 'medium', 'large'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPadding(p)}
                      className={`flex-1 py-1 px-1.5 rounded border text-center text-[10px] font-medium capitalize ${
                        padding === p 
                          ? 'bg-white/10 border-white/20 text-white' 
                          : 'bg-transparent border-obsidian-border text-obsidian-muted hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="flex flex-col gap-1.5">
                <span className="text-obsidian-muted font-mono text-[9px] uppercase tracking-wider flex items-center gap-1">
                  <Type className="w-3 h-3" /> Font Size
                </span>
                <div className="flex gap-1">
                  {['small', 'medium', 'large'].map((fs) => (
                    <button
                      key={fs}
                      onClick={() => setFontSize(fs)}
                      className={`flex-1 py-1 px-1.5 rounded border text-center text-[10px] font-medium capitalize ${
                        fontSize === fs 
                          ? 'bg-white/10 border-white/20 text-white' 
                          : 'bg-transparent border-obsidian-border text-obsidian-muted hover:text-white'
                      }`}
                    >
                      {fs}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Genuine PNG Export Trigger */}
          <button
            onClick={handleExportPNG}
            disabled={isExporting}
            className={`interactive-scale w-full py-4 rounded-xl flex items-center justify-center gap-2 font-sans font-semibold text-sm transition-all duration-300 ${
              isExporting 
                ? 'bg-[#E2C29B]/25 text-[#E2C29B] border border-[#E2C29B]/30' 
                : 'bg-gradient-to-r from-[#E2C29B] to-[#C49B74] hover:brightness-110 text-obsidian-bg shadow-lg shadow-obsidian-accentMuted'
            }`}
          >
            <Download className={`w-4 h-4 ${isExporting ? 'animate-bounce' : ''}`} />
            <span>{isExporting ? 'Compiling Ultra-Res PNG...' : 'Export Post Design'}</span>
          </button>
        </div>

      </div>

      {/* Modern Feedback Toast Notification */}
      <AnimatePresence>
        {exportSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-obsidian-card border border-obsidian-accent/30 rounded-xl p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="w-8 h-8 rounded-full bg-obsidian-success/15 border border-obsidian-success/30 flex items-center justify-center text-obsidian-success">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white text-sm font-semibold">Post Design Exported!</div>
              <div className="text-obsidian-muted text-[11px] font-mono mt-0.5">HIGH-RES PNG DOWNLOAD COMPLETE</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
