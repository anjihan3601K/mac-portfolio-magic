import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Bot, X, Send, Loader2, Sparkles } from 'lucide-react';
import { useAIStore } from '@/stores/aiStore';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

type Msg = { role: 'user' | 'assistant'; content: string };

const QUICK_ACTIONS = [
  { emoji: '🚀', label: 'Projects', prompt: 'Give me a quick overview of your top projects.' },
  { emoji: '💼', label: 'Experience', prompt: 'Walk me through your internships and experience.' },
  { emoji: '🛠', label: 'Skills', prompt: 'What are your strongest technical skills?' },
  { emoji: '🏆', label: 'Achievements', prompt: 'Highlight your key achievements and certifications.' },
  { emoji: '📄', label: 'Resume', prompt: 'Summarize your resume in 4-5 bullet points.' },
  { emoji: '📧', label: 'Contact', prompt: 'How can a recruiter reach you?' },
];

const STORAGE_KEY = 'recruiter_chat_history_v1';

export const RecruiterChat = () => {
  const { chatOpen, toggleChat, closeChat, introCompleted } = useAIStore();
  const [messages, setMessages] = useState<Msg[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch {}
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (chatOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [chatOpen]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Msg[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('recruiter-chat', {
        body: { messages: next },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setMessages([...next, { role: 'assistant', content: data.reply || '...' }]);
    } catch (e: any) {
      toast({ title: 'Chat error', description: e?.message || 'Failed to reach assistant', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (!introCompleted) return null;

  return createPortal(
    <>
      {/* Floating Button */}
      {!chatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-[9990] group flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-105 transition-all"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
          <span className="text-sm font-semibold">Recruiter Assistant</span>
          <Sparkles className="w-4 h-4 opacity-80" />
        </button>
      )}

      {/* Chat panel */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-[9991] w-[min(92vw,400px)] h-[min(calc(100vh-80px),600px)] flex flex-col rounded-2xl overflow-hidden backdrop-blur-2xl bg-white/85 dark:bg-zinc-900/90 border border-white/30 shadow-2xl animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold leading-tight">Recruiter Assistant</div>
                  <div className="text-[10px] opacity-80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Anjani's AI Twin · Online
                  </div>
                </div>
              </div>
              <button onClick={closeChat} className="p-1.5 rounded-full hover:bg-white/20">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="px-3 py-2 border-b border-black/5 dark:border-white/10 flex flex-wrap gap-1.5">
              {QUICK_ACTIONS.map((a) => (
                <button
                  key={a.label}
                  onClick={() => send(a.prompt)}
                  disabled={loading}
                  className="text-[11px] px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-zinc-700 dark:text-zinc-200 disabled:opacity-50 transition"
                >
                  <span className="mr-0.5">{a.emoji}</span> {a.label}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
              {messages.length === 0 && (
                <div className="text-zinc-500 dark:text-zinc-400 text-center py-8 px-2">
                  👋 Hi! I'm Anjani's AI twin. Ask me about my projects, experience, skills, or anything you'd like to know.
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-2xl whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-sm'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center gap-2 text-zinc-500">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="p-3 border-t border-black/5 dark:border-white/10 flex items-center gap-2 bg-white/60 dark:bg-zinc-900/60"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills, experience..."
                className="flex-1 px-3 py-2 text-sm rounded-full bg-zinc-100 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 hover:scale-105 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
      )}
    </>,
    document.body
  );
};
