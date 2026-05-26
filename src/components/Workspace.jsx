import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FeatherLogo, SparklesIcon, DownloadIcon, AspectIcon, PaletteIcon, 
  AlignLeftIcon, AlignCenterIcon, TextSizeIcon, WandIcon, 
  RotateCcwIcon, ToggleIcon, CheckCircleIcon, ChevronDownIcon 
} from './Icons';
import { fixGrammar, parseStreamText } from '../services/ai';
import { toPng } from 'html-to-image';

// Stylized theme configurations (Obsidian Vault Archetype)
// Stylized theme configurations (Obsidian Vault Archetype)
const PRESETS = {
  ethereal: {
    name: 'Ethereal Clinical',
    cardBg: 'bg-[#F1F5F9]', // Clean, cool gray-slate clinical background
    border: 'border border-[#CBD5E1]', // Clean slate border
    titleColor: 'text-[#0F172A]', // Deep slate-black title
    bodyColor: 'text-[#475569]', // Crisp steel-slate body
    badgeBg: 'bg-[#0F172A]/5',
    badgeText: 'text-[#0F172A]',
    metaColor: 'text-[#64748B]',
    avatarBg: 'bg-[#0F172A]',
    avatarText: 'text-white',
    usernameColor: 'text-[#0F172A]'
  },
  obsidian: {
    name: 'Obsidian Black',
    cardBg: 'bg-[#0D0D11]',
    border: 'border border-[#E2C29B]/20',
    titleColor: 'text-[#E2C29B] text-glow',
    bodyColor: 'text-white/95',
    badgeBg: 'bg-[#E2C29B]/10',
    badgeText: 'text-[#E2C29B]',
    metaColor: 'text-[#8E8E9F]',
    avatarBg: 'bg-[#E2C29B]',
    avatarText: 'text-[#0D0D11]',
    usernameColor: 'text-white'
  },
  parchment: {
    name: 'Parchment Oat',
    cardBg: 'bg-[#FAF6F0]', // Cozy warm creamy parchment background
    border: 'border border-[#D4CBBF]/80', // Warm sand frame
    titleColor: 'text-[#3A2E2B] font-semibold', // Warm mahogany title
    bodyColor: 'text-[#4A3E3B]', // Warm espresso chocolate body copy
    badgeBg: 'bg-[#3A2E2B]/10',
    badgeText: 'text-[#3A2E2B]',
    metaColor: 'text-[#8A7B76]',
    avatarBg: 'bg-[#3A2E2B]',
    avatarText: 'text-[#FAF6F0]',
    usernameColor: 'text-[#3A2E2B]'
  },
  clay: {
    name: 'Organic Clay',
    cardBg: 'bg-[#E2725B]',
    border: 'border border-[#FFFDD0]/25',
    titleColor: 'text-[#FFFDD0]',
    bodyColor: 'text-[#FFFDD0]/95',
    badgeBg: 'bg-[#FFFDD0]/10',
    badgeText: 'text-[#FFFDD0]',
    metaColor: 'text-[#FFFDD0]/70',
    avatarBg: 'bg-[#FFFDD0]',
    avatarText: 'text-[#E2725B]',
    usernameColor: 'text-[#FFFDD0]'
  }
};

// Premium typography collections supported on the image canvas
const FONTS = {
  sans: { name: 'Inter (Sans)', family: 'font-sans' },
  exo2: { name: 'Exo 2 (Tech)', family: 'font-heading' },
  mono: { name: 'JetBrains (Mono)', family: 'font-mono' },
  serif: { name: 'Fraunces (Serif)', family: 'font-serif' },
  newsreader: { name: 'Newsreader (Italic)', family: 'font-serif italic' },
  playfair: { name: 'Playfair (Classic)', family: 'font-serif italic font-semibold' }
};

const DEFAULT_TEXT = "Social content on X shouldn't be constrained by a simple character count. When you have deep, insights, condensing them into a raw tweet strips away their true authority.\n\nBeyond280 fixes this by instantly formatting, polishing, and packing your long thoughts into ultra-premium typographic cards that command visual space. Action breeds clarity.";

export default function Workspace() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [headline, setHeadline] = useState("Scale Your Thoughts");
  const [username, setUsername] = useState("@creator");
  
  const [theme, setTheme] = useState('ethereal');
  const [aspect, setAspect] = useState('16:9'); // 16:9, 4:3, 1:1
  const [cardFont, setCardFont] = useState('sans');
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  
  const [align, setAlign] = useState('left');
  const [fontSize, setFontSize] = useState('medium');
  const [grammarFix, setGrammarFix] = useState(false);
  
  // AI state controls
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [aiHeadline, setAiHeadline] = useState("Scale Your Thoughts");
  const [aiBody, setAiBody] = useState(DEFAULT_TEXT);
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  
  // Premium AI Engine Controls
  const [aiMode, setAiMode] = useState(null); // 'grammar'
  const [errorMsg, setErrorMsg] = useState(null);
  const [isAiApplied, setIsAiApplied] = useState(false);
  
  // Telemetry estimations
  const [readingTime, setReadingTime] = useState("12s read");
  const [readability, setReadability] = useState("Clear & Engaging");
  const [engagement, setEngagement] = useState("+42%");
  
  // Toast and Export triggers
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  
  const canvasRef = useRef(null);
  const fontDropdownRef = useRef(null);

  // Close custom dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (fontDropdownRef.current && !fontDropdownRef.current.contains(event.target)) {
        setFontDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync editor fields with live preview card in real-time (only when AI is not applied to preview)
  useEffect(() => {
    if (!isStreaming) {
      const words = text.trim().split(/\s+/).filter(Boolean).length;
      const calcSec = Math.ceil(words / 3.3);
      setReadingTime(`${calcSec}s read`);
      setReadability(words > 25 ? "Clear & Engaging" : "Simple");
      
      // Sync only if AI optimization is not currently applying bespoke copy
      if (!isAiApplied) {
        setAiBody(text);
        setAiHeadline(headline);
      }
    }
  }, [text, headline, isStreaming, isAiApplied]);


  // Dedicated Grammar Fix API calling `/api/ai/grammar`
  const handleGrammarFixAPI = async () => {
    if (!text.trim()) return;
    setIsOptimizing(true);
    setErrorMsg(null);
    setStreamingText("");
    setIsStreaming(true);
    setAiMode('grammar');

    try {
      const result = await fixGrammar(text, (chunk) => {
        setStreamingText(chunk);
      });
      
      // Update preview card only; left inputs are untouched
      setAiBody(result);
      setAiHeadline(headline);
      setIsAiApplied(true); // decouple card preview from input editor

    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to connect to the grammar correction engine.");
    } finally {
      setIsOptimizing(false);
      setIsStreaming(false);
      setAiMode(null);
    }
  };



  const handleReset = () => {
    setText(DEFAULT_TEXT);
    setHeadline("Scale Your Thoughts");
    setAiHeadline("Scale Your Thoughts");
    setAiBody(DEFAULT_TEXT);
    setUsername("@creator");
    setStreamingText("");
    setIsStreaming(false);
    setTheme('ethereal');
    setAspect('16:9');
    setCardFont('sans');
    setAlign('left');
    setFontSize('medium');
    setGrammarFix(false);
    setEngagement("+42%");
    setAiMode(null);
    setErrorMsg(null);
    setIsAiApplied(false);
  };

  // Compile Retina Attachment PNG
  const handleExportPNG = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);

    try {
      await document.fonts.ready;
      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 3, // Premium 3x retina scale
        style: {
          transform: 'scale(1)',
          boxShadow: 'none',
        }
      });

      const link = document.createElement('a');
      link.download = `${username.replace('@', '') || 'Beyond280'}-card-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // Dynamic layout dimension bindings (Fully fluid and responsive for mobile)
  // Card width is aspect-aware, but height is always content-driven (no forced aspect ratios)
  const getAspectClass = () => {
    if (aspect === '1:1') return 'w-full max-w-[390px]';
    if (aspect === '16:9') return 'w-full max-w-full lg:max-w-[580px]';
    return 'w-full max-w-[450px]'; // 4:3 standard
  };

  // Dynamically calculate grid columns based on active aspect ratio for auto-adjusting flexible relation
  const getGridCols = () => {
    if (aspect === '1:1') {
      return { left: 'lg:col-span-6', right: 'lg:col-span-6' };
    }
    if (aspect === '16:9') {
      return { left: 'lg:col-span-4', right: 'lg:col-span-8' };
    }
    return { left: 'lg:col-span-5', right: 'lg:col-span-7' }; // 4:3 default
  };

  // Dynamically calculate max-width of the right column container to align exactly with the card canvas
  const getAspectWidthClass = () => {
    if (aspect === '1:1') return 'max-w-[390px]';
    if (aspect === '16:9') return 'max-w-full lg:max-w-[580px]';
    return 'max-w-[450px]'; // 4:3 standard
  };

  // Dynamic card padding that scales with text length — tight for short posts, roomier for essays
  const getCardPadding = () => {
    const len = (activeContent?.body || text).length;
    if (len < 100) return 'p-5 md:p-6';
    if (len < 250) return 'p-6 md:p-7';
    return 'p-7 md:p-8';
  };

  // Dynamic body gap that scales with content
  const getBodyMargin = () => {
    const len = (activeContent?.body || text).length;
    if (len < 100) return 'my-3';
    if (len < 250) return 'my-4';
    return 'my-5';
  };

  const getFontSizeClass = () => {
    if (fontSize === 'small') return 'text-[11px] sm:text-xs md:text-sm leading-relaxed';
    if (fontSize === 'large') return 'text-sm sm:text-base md:text-lg leading-relaxed';
    return 'text-xs sm:text-sm md:text-base leading-relaxed';
  };

  // Extract initials from custom username handles
  const getUserInitials = () => {
    const raw = username.replace('@', '').trim();
    if (!raw) return 'C';
    return raw.substring(0, 1).toUpperCase();
  };

  const currentCharCount = text.length;
  const isOverflowing = currentCharCount > 280;
  const currentTheme = PRESETS[theme];
  const activeFontFamily = FONTS[cardFont].family;
  const gridCols = getGridCols();

  // Handle streaming text updates dynamically depending on the active AI mode
  const getStreamingState = () => {
    if (!isStreaming) return { headline: aiHeadline, body: aiBody };
    
    if (aiMode === 'grammar') {
      return { headline: headline, body: streamingText };
    }
    
    const parsed = parseStreamText(streamingText);
    return {
      headline: parsed.headline || headline,
      body: parsed.body || (streamingText.includes('[BODY]') ? '' : streamingText)
    };
  };

  const activeContent = getStreamingState();

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Immersive Glass Workspace Panel */}
      <div className="w-full bg-[#08080B]/90 border border-white/10 rounded-2xl flex flex-col overflow-hidden backdrop-blur-xl shadow-2xl">
        
        {/* Unified Premium Toolbar (Highly Visible Customizers) */}
        <div className="w-full border-b border-white/10 p-5 bg-[#0B0B0E]/60 flex flex-wrap gap-4 items-center justify-between font-sans text-xs">
          
          {/* Action Modifiers Group */}
          <div className="flex flex-wrap items-center gap-3 grow w-full lg:w-auto">
            
            {/* Highly Visible Aspect Ratio Selector (Unified in Toolbar) */}
            <div className="flex items-center gap-1.5 bg-[#0C0C10] border border-white/15 rounded-lg p-1 h-10 grow sm:grow-0 justify-center">
              {['16:9', '4:3', '1:1'].map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspect(ratio)}
                  className={`h-7 flex items-center justify-center px-3.5 rounded-md font-mono text-[10px] font-extrabold transition-all duration-200 grow sm:grow-0 ${
                    aspect === ratio 
                      ? 'bg-white text-obsidian-bg font-extrabold shadow-lg' 
                      : 'text-obsidian-muted hover:text-white'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>

            {/* Premium Custom Font Dropdown (Unified in Toolbar - Mobile Fluid) */}
            <div className="relative w-full sm:w-[150px] grow sm:grow-0" ref={fontDropdownRef}>
              <button
                onClick={() => setFontDropdownOpen(!fontDropdownOpen)}
                className="w-full h-10 flex items-center justify-between px-3.5 bg-[#0C0C10] border border-white/15 rounded-lg text-white hover:border-[#E2C29B]/30 hover:bg-[#13131A] transition-all text-[10px] font-extrabold shadow-sm"
              >
                <span className="truncate text-obsidian-accent">{FONTS[cardFont].name}</span>
                <ChevronDownIcon className="w-3.5 h-3.5 text-obsidian-muted transition-transform duration-200" style={{ transform: fontDropdownOpen ? 'rotate(180deg)' : 'none' }} />
              </button>

              <AnimatePresence>
                {fontDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-1.5 left-0 w-full sm:w-[190px] bg-[#0C0C10] border border-white/15 rounded-xl shadow-2xl p-1 z-50 flex flex-col gap-0.5"
                  >
                    {Object.keys(FONTS).map((fontKey) => (
                      <button
                        key={fontKey}
                        onClick={() => {
                          setCardFont(fontKey);
                          setFontDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-[10px] transition-all ${
                          cardFont === fontKey 
                            ? 'bg-obsidian-accentMuted text-[#E2C29B] font-extrabold' 
                            : 'text-obsidian-muted hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{FONTS[fontKey].name}</span>
                        {cardFont === fontKey && <CheckCircleIcon className="w-3.5 h-3.5 text-obsidian-accent" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <span className="w-[1px] h-4 bg-white/10 hidden xl:inline-block mx-1"></span>

            {/* Alignment / Sizes */}
            <div className="flex items-center gap-1.5 bg-[#0C0C10] border border-white/15 rounded-lg p-1 h-10 grow sm:grow-0 justify-center">
              <button 
                onClick={() => setAlign('left')}
                className={`h-7 w-7 flex items-center justify-center rounded-md transition-all ${align === 'left' ? 'bg-white/15 text-white shadow-sm' : 'text-obsidian-muted hover:text-white'}`}
              >
                <AlignLeftIcon className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setAlign('center')}
                className={`h-7 w-7 flex items-center justify-center rounded-md transition-all ${align === 'center' ? 'bg-white/15 text-white shadow-sm' : 'text-obsidian-muted hover:text-white'}`}
              >
                <AlignCenterIcon className="w-3.5 h-3.5" />
              </button>
              <span className="w-[1px] h-3 bg-white/10 mx-1"></span>
              
              <div className="flex items-center gap-0.5">
                {['small', 'medium', 'large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`h-7 px-3 flex items-center justify-center rounded text-[10px] uppercase font-extrabold tracking-wider transition-all ${
                      fontSize === size ? 'bg-white/15 text-white shadow-sm' : 'text-obsidian-muted hover:text-white'
                    }`}
                  >
                    {size[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Grammar Polisher */}
            <button
              onClick={handleGrammarFixAPI}
              disabled={isOptimizing}
              className={`h-10 px-4 rounded-lg border flex items-center justify-center gap-2 font-bold transition-all grow sm:grow-0 ${
                aiMode === 'grammar' 
                  ? 'bg-obsidian-aiMuted border-obsidian-ai/40 text-white shadow-lg shadow-obsidian-aiGlow' 
                  : 'bg-[#0C0C10] border-white/15 text-obsidian-muted hover:text-white hover:border-[#6366F1]/30'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <WandIcon className={`w-3.5 h-3.5 ${aiMode === 'grammar' ? 'text-obsidian-ai text-glow-ai' : ''}`} />
              <span>{aiMode === 'grammar' ? 'Correcting...' : 'Fix Grammar'}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${aiMode === 'grammar' ? 'bg-obsidian-success' : 'bg-white/20'}`}></span>
            </button>

          </div>

          {/* Export Button Group */}
          <div className="flex flex-wrap items-center gap-3 grow w-full lg:w-auto justify-end mt-2 lg:mt-0">

            <button
              onClick={handleExportPNG}
              disabled={isExporting}
              className="interactive-scale h-10 px-4.5 bg-gradient-to-r from-[#E2C29B] to-[#C49B74] hover:brightness-110 text-obsidian-bg font-extrabold rounded-lg shadow-lg shadow-obsidian-accentMuted flex items-center justify-center gap-2 grow sm:grow-0"
            >
              <DownloadIcon className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Exporting...' : 'Export Card'}</span>
            </button>
          </div>

        </div>

        {/* Centerpiece Content Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Panel: Markdown Writer (Inputs area) */}
          <div className={`${gridCols.left} border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col p-6 bg-[#060608]/50 gap-5 transition-all duration-500 ease-in-out`}>
            
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span className="font-mono text-[9px] text-obsidian-muted uppercase tracking-widest font-bold">
                WRITING STUDIO
              </span>
              <button 
                onClick={handleReset}
                className="interactive-scale flex items-center gap-1.5 text-obsidian-muted hover:text-white transition-colors"
              >
                <RotateCcwIcon className="w-3 h-3" />
                <span className="font-mono text-[8px] uppercase tracking-wider">Reset</span>
              </button>
            </div>

            {/* Custom Handle and Headline in a gorgeous, balanced 2-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Handle */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-[#C4C4D6] uppercase tracking-widest font-extrabold">
                  Handle / Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@creator"
                  aria-label="X Creator Handle"
                  className="w-full bg-[#09090C]/60 border border-white/15 focus:border-[#E2C29B]/70 focus:ring-2 focus:ring-[#E2C29B]/15 rounded-xl px-4 py-2.5 font-mono text-[13.5px] text-white focus:outline-none placeholder:text-white/20 transition-all duration-300"
                />
              </div>

              {/* Headline */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-[#C4C4D6] uppercase tracking-widest font-extrabold">
                  Card Headline <span className="text-[8px] text-white/40 lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Enter card title..."
                  aria-label="Optional Card Headline"
                  className="w-full bg-[#09090C]/60 border border-white/15 focus:border-[#E2C29B]/70 focus:ring-2 focus:ring-[#E2C29B]/15 rounded-xl px-4 py-2.5 font-mono text-[13.5px] text-white focus:outline-none placeholder:text-white/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Main Textarea */}
            <div className="flex flex-col flex-grow gap-2">
              <label className="font-mono text-[9px] text-[#C4C4D6] uppercase tracking-widest font-extrabold">
                Core Thoughts / Body
              </label>
              <div className="relative flex-grow flex flex-col">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  disabled={isOptimizing}
                  placeholder="Write your long thoughts here..."
                  aria-label="Core Card Thoughts"
                  className="w-full flex-grow bg-[#09090C]/40 border border-white/15 focus:border-[#E2C29B]/60 focus:ring-2 focus:ring-[#E2C29B]/15 rounded-xl p-4 font-mono text-[13.5px] leading-relaxed text-white/90 focus:outline-none resize-none min-h-[220px] transition-all duration-300"
                />
                
                {/* Character counting bar */}
                <div className="flex justify-between items-center pt-2.5 mt-1 text-[9px] font-mono text-obsidian-muted border-t border-white/10">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isOverflowing ? 'bg-obsidian-accent' : 'bg-white/20'}`}></span>
                    {isOverflowing ? 'OVER 280 CHARACTER LIMIT' : 'STANDARD SINGLE POST'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={isOverflowing ? 'text-obsidian-accent font-bold' : 'text-white/60'}>
                      {currentCharCount}
                    </span>
                    <span className="opacity-30">/</span>
                    <span>280</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Elegant Error Alert */}
            {errorMsg && (
              <div className="bg-[#EF4444]/15 border border-[#EF4444]/25 text-[#F87171] rounded-xl p-3 text-xs font-sans flex items-start gap-2.5">
                <span className="text-sm mt-0.5">⚠️</span>
                <div className="flex-grow">
                  <div className="font-bold text-[10px] tracking-wide uppercase font-mono">AI Engine Alert</div>
                  <div className="opacity-90 mt-0.5 text-[10px] font-mono">{errorMsg}</div>
                </div>
                <button onClick={() => setErrorMsg(null)} className="text-white/40 hover:text-white text-xs font-bold font-mono">×</button>
              </div>
            )}



          </div>

          {/* Right Panel: Immersive Live Preview Card Canvas */}
          <div className={`${gridCols.right} p-5 flex flex-col items-center bg-[#040406]/35 relative gap-4 transition-all duration-500 ease-in-out`}>
            
            {/* Soft backdrop glow to give three-dimensional float depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-obsidian-aiGlow to-obsidian-accentMuted/5 blur-3xl rounded-full opacity-40 pointer-events-none" />

            {/* A dynamic width-locked container that keeps the theme selector, canvas card, and stats panel perfectly aligned to the exact same width */}
            <div className={`w-full flex flex-col gap-4 mx-auto transition-all duration-500 ease-in-out ${getAspectWidthClass()}`}>

              {/* Right Panel Header (Matching WRITING STUDIO on the left for symmetric elegance) */}
              <div className="flex justify-between items-center pb-2 border-b border-white/10 w-full">
                <span className="font-mono text-[9px] text-obsidian-muted uppercase tracking-widest font-bold">
                  LIVE RETINA PREVIEW
                </span>
                
              </div>

              {/* Theme Preset Selector Button Row (Symmetric to Left Inputs Row) */}
              <div className="w-full flex flex-col gap-1.5 shrink-0">
                <span className="text-obsidian-muted font-mono text-[9px] uppercase tracking-widest font-extrabold flex items-center gap-1">
                  <PaletteIcon className="w-3.5 h-3.5" /> Preset Theme
                </span>
                <div className="flex flex-wrap gap-1.5 w-full">
                  {Object.keys(PRESETS).map((key) => (
                    <button
                      key={key}
                      onClick={() => setTheme(key)}
                      className={`flex-grow flex-shrink basis-[calc(50%-4px)] sm:basis-0 px-3 py-2.5 rounded-lg border text-center font-extrabold transition-all duration-200 text-[10px] ${
                        theme === key 
                          ? 'bg-obsidian-accentMuted border-obsidian-accent text-white shadow-md' 
                          : 'bg-[#0C0C10] border-white/15 text-[#C4C4D6] hover:border-[#E2C29B]/35 hover:text-white'
                      }`}
                    >
                      {PRESETS[key].name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect-controlled Card Canvas */}
              <div className="w-full flex items-center justify-center relative z-10">
                <div 
                  ref={canvasRef}
                  className={`w-full transition-all duration-500 ease-in-out flex flex-col justify-between ${getCardPadding()} rounded-2xl border ${currentTheme.cardBg} ${activeFontFamily} ${currentTheme.border} ${getAspectClass()} ${
                    isStreaming 
                      ? 'border-[#6366F1]/50 shadow-[0_0_30px_rgba(99,102,241,0.2)] animate-pulse-slow' 
                      : 'shadow-2xl'
                  }`}
                >
                  {/* Card Header (Pure Simple Profile Brand) */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs uppercase border border-black/5 ${currentTheme.avatarBg} ${currentTheme.avatarText} font-extrabold`}>
                        {getUserInitials()}
                      </div>
                      <div>
                        <div className={`font-semibold text-xs tracking-tight ${currentTheme.usernameColor}`}>
                          {username.replace('@', '').trim() || 'Creator'}
                        </div>
                        <div className={`text-[9px] font-mono tracking-wider ${currentTheme.metaColor}`}>
                          {username.startsWith('@') ? username : `@${username}` || '@creator'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className={`flex-grow flex flex-col justify-center ${getBodyMargin()} ${align === 'center' ? 'text-center' : 'text-left'}`}>
                    <div className="flex flex-col gap-3">
                      {activeContent.headline && (
                        <h3 className={`font-bold text-base md:text-lg leading-snug tracking-tight ${currentTheme.titleColor} ${isStreaming && aiMode !== 'grammar' ? 'animate-pulse' : ''}`}>
                          {activeContent.headline}
                        </h3>
                      )}
                      <p className={`whitespace-pre-wrap ${getFontSizeClass()} ${currentTheme.bodyColor} ${isStreaming ? 'text-glow-ai font-semibold' : ''}`}>
                        {activeContent.body || (isStreaming ? "✦ drafting..." : "")}
                      </p>
                    </div>
                  </div>

                  {/* Single Elegant Spacer dot (Excess credits, AI indicators, and footer lines removed completely) */}
                  <div className="flex justify-center items-center font-mono text-[10px] text-obsidian-muted/40 tracking-widest pt-2">
                    <span>✦</span>
                  </div>
                </div>
              </div>

              {/* Understated Analytics stats panel inside right layout */}
              <div className="w-full flex justify-between items-center px-4 font-mono text-[9px] text-[#C4C4D6] bg-[#08080A]/60 border border-white/10 rounded-xl py-2.5 shadow-sm">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-obsidian-accent"></span>Reading time: <strong className="text-white font-bold">{readingTime}</strong></span>
                <span className="text-white/15">|</span>
                <span className="flex items-center gap-1">Readability: <strong className="text-white font-bold">{readability}</strong></span>
                <span className="text-white/15">|</span>
                <span>Attention: <strong className="text-obsidian-accent text-glow font-bold">{engagement}</strong></span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Export success toast */}
      <AnimatePresence>
        {exportSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0B0B0E] border border-[#E2C29B]/30 rounded-xl p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="w-8 h-8 rounded-full bg-obsidian-accent/15 border border-[#E2C29B]/30 flex items-center justify-center text-[#E2C29B]">
              <CheckCircleIcon className="w-4 h-4" />
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
