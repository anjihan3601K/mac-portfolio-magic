import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Volume2, VolumeX, SkipForward } from 'lucide-react';
import { useAIStore } from '@/stores/aiStore';
import { useWindowStore } from '@/stores/windowStore';
import defaultProfilePhoto from '@/assets/profile-photo.png';
import aiAvatar from '@/assets/ai-avatar.png';
import { useProfilePhotoUrl } from '@/components/admin/ProfilePhotoManager';

const SCRIPT = `Hi, I'm Anjani Kumar. I'm a final-year Artificial Intelligence and Data Science student passionate about building AI-powered solutions that solve real-world problems. Through internships and projects, I've worked on machine learning, computer vision, predictive analytics, and full-stack AI applications. Feel free to explore my work, skills, and achievements. If you have any questions, my AI assistant will be happy to help.`;

// Split into subtitle chunks (~ phrase level)
const CHUNKS = SCRIPT.split(/(?<=[.,])\s+/);

export const AIIntroModal = () => {
  const { introOpen, closeIntro, openChat } = useAIStore();
  const { openWindow } = useWindowStore();
  // AI-stylized avatar for the intro only; rest of portfolio uses the real photo
  const profilePhoto = aiAvatar;
  // keep hook call for future fallback compat
  useProfilePhotoUrl();
  void defaultProfilePhoto;

  const [muted, setMuted] = useState(false);
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const subtitleTimerRef = useRef<number | null>(null);

  const finish = (skipped = false) => {
    window.speechSynthesis?.cancel();
    if (subtitleTimerRef.current) window.clearInterval(subtitleTimerRef.current);
    closeIntro();
    // After intro: open About window + show chat hint
    setTimeout(() => {
      openWindow('about');
      if (!skipped) openChat();
    }, 350);
  };

  useEffect(() => {
    if (!introOpen) return;
    setSubtitleIdx(0);
    setSpeaking(true);

    // Subtitle pacing: advance chunks over ~15s
    const perChunk = 15000 / CHUNKS.length;
    subtitleTimerRef.current = window.setInterval(() => {
      setSubtitleIdx((i) => Math.min(i + 1, CHUNKS.length - 1));
    }, perChunk);

    if (!muted && 'speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(SCRIPT);
      u.rate = 1.0;
      u.pitch = 1.0;
      u.volume = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find((v) => /Google.*US|Samantha|Daniel|Alex/i.test(v.name)) || voices[0];
      if (preferred) u.voice = preferred;
      u.onend = () => finish(false);
      utteranceRef.current = u;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } else {
      // Fallback timer for muted/no-tts
      const t = window.setTimeout(() => finish(false), 15000);
      return () => window.clearTimeout(t);
    }

    return () => {
      window.speechSynthesis?.cancel();
      if (subtitleTimerRef.current) window.clearInterval(subtitleTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introOpen]);

  // Toggle mute mid-stream
  useEffect(() => {
    if (!introOpen) return;
    if (muted) window.speechSynthesis?.cancel();
  }, [muted, introOpen]);

  if (!introOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-xl animate-fade-in">
      {/* glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-500/30 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-500/30 blur-3xl animate-pulse" />
      </div>

      {/* Top-right controls */}
      <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
        <button
          onClick={() => setMuted((m) => !m)}
          className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5 text-sm transition"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          {muted ? 'Unmute' : 'Mute'}
        </button>
        <button
          onClick={() => finish(true)}
          className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5 text-sm transition"
        >
          <SkipForward className="w-4 h-4" /> Skip Intro
        </button>
        <button
          onClick={() => finish(true)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Card */}
      <div className="relative z-10 w-[min(92vw,560px)] flex flex-col items-center gap-8 px-8 py-10 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_80px_rgba(99,102,241,0.4)] animate-scale-in">
        {/* Avatar */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-60 animate-pulse" />
          <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl ai-avatar-breath">
            <img src={profilePhoto} alt="Anjani Kumar" className="w-full h-full object-cover ai-avatar-img" />
            {/* Mouth pulse overlay when speaking */}
            {speaking && !muted && (
              <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-white/40 ai-mouth-pulse" />
            )}
            {/* Blink overlay */}
            <div className="absolute inset-0 ai-blink pointer-events-none" />
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-blue-200/80 mb-2">AI Introduction</div>
          <h2 className="text-2xl font-bold text-white">Anjani Kumar Kanamarlapudi</h2>
          <p className="text-sm text-white/70">AI Developer & Data Scientist</p>
        </div>

        {/* Subtitles */}
        <div className="min-h-[60px] w-full text-center text-white text-base leading-relaxed px-2">
          <span className="px-3 py-2 inline-block rounded-lg bg-black/30 backdrop-blur-sm">
            {CHUNKS[subtitleIdx]}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300"
            style={{ width: `${((subtitleIdx + 1) / CHUNKS.length) * 100}%` }}
          />
        </div>
      </div>

      <style>{`
        @keyframes ai-breath { 0%,100% { transform: scale(1); } 50% { transform: scale(1.03); } }
        .ai-avatar-breath { animation: ai-breath 4s ease-in-out infinite; }
        @keyframes ai-blink { 0%, 92%, 100% { opacity: 0; } 95%, 97% { opacity: 0.25; background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.6) 55%, transparent 60%); } }
        .ai-blink { animation: ai-blink 5s infinite; }
        @keyframes ai-mouth { 0%,100% { transform: translateX(-50%) scaleY(0.5); } 50% { transform: translateX(-50%) scaleY(1.4); } }
        .ai-mouth-pulse { animation: ai-mouth 0.25s ease-in-out infinite; }
      `}</style>
    </div>,
    document.body
  );
};
