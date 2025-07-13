import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  MessageCircle,
  Minimize2,
  AlertCircle,
  User,
  Bot,
  Sparkles,
  ExternalLink,
  Github,
  Mail,
  Coffee,
  Clock,
  Zap,
  Copy,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';

import {
  Button,
  Card,
  Input,
  ScrollArea,
  Badge,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui';
import { chatService } from '@/lib/api';

/* -------------------------------------------------------------------------- */
/* Utilities                                                                  */
/* -------------------------------------------------------------------------- */

const TZ = 'Asia/Kolkata';

const getIST = () => new Date().toISOString();

const fmtIST = (
  stamp: string,
  opts: { date?: boolean; secs?: boolean; rel?: boolean; compact?: boolean } = {},
) => {
  const d = new Date(stamp);
  const now = new Date();
  const { date, secs, rel = true, compact } = opts;

  /* relative ---------------------------------------------------------------- */
  if (rel) {
    const diff = (now.getTime() - d.getTime()) / 60000;
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff | 0} m ago`;
    if (diff < 1440) return `${(diff / 60) | 0} h ago`;
    if (diff < 10080) return `${(diff / 1440) | 0} d ago`;
  }

  /* absolute ---------------------------------------------------------------- */
  const same = d.toDateString() === now.toDateString();
  const yest = (() => {
    const y = new Date(now);
    y.setDate(y.getDate() - 1);
    return y.toDateString() === d.toDateString();
  })();

  const opt: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: TZ,
  };
  if (secs) opt.second = '2-digit';

  const time = d.toLocaleTimeString('en-IN', opt);

  if (compact) {
    if (same) return `${time} IST`;
    if (yest) return 'Yesterday';
    return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', timeZone: TZ });
  }

  if (same) return date ? `Today, ${time} IST` : `${time} IST`;
  if (yest) return `Yesterday, ${time} IST`;
  return `${d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', timeZone: TZ })}, ${time} IST`;
};

const copy = async (t: string) => {
  try {
    await navigator.clipboard.writeText(t);
    return true;
  } catch {
    return false;
  }
};

const playDing = () => {
  const a = new Audio(
    'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYAAB9AAACABAAgAZGF0YQAAAAA=',
  );
  a.volume = 0.25;
  a.play().catch(() => void 0);
};

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface Msg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  error?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
}

/* -------------------------------------------------------------------------- */
/* Markdown                                                                   */
/* -------------------------------------------------------------------------- */

const MD = {
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-1 rounded">
      {children}
    </strong>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center space-x-1"
    >
      {children}
      <ExternalLink className="w-3 h-3" />
    </a>
  ),
};

/* -------------------------------------------------------------------------- */
/* Quick-action Buttons                                                       */
/* -------------------------------------------------------------------------- */

const Quick = memo(({ send }: { send: (m: string) => void }) => {
  const A = [
    ['About', User, "Tell me about Arkaprabha's background and experience"],
    ['Projects', Zap, "What are Arkaprabha's most impressive projects?"],
    ['Skills', Coffee, 'What technical skills does Arkaprabha have?'],
    ['GitHub', Github, "Show me Arkaprabha's GitHub profile and repositories"],
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {A.map(([l, I, m], i) => (
        <motion.button
          key={l}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => send(m)}
          className="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg border text-sm hover:scale-105 transition"
        >
          <I className="w-4 h-4 inline mr-1" />
          {l}
        </motion.button>
      ))}
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* Message Bubble                                                             */
/* -------------------------------------------------------------------------- */

const Bubble = memo(
  ({ m }: { m: Msg }) => (
    <div
      className={`max-w-[90%] px-4 py-3 rounded-2xl shadow ${
        m.role === 'user'
          ? 'bg-blue-600 text-white ml-auto'
          : m.error
          ? 'bg-red-100 text-red-900 dark:bg-red-900/40 dark:text-red-200'
          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
      }`}
    >
      <ReactMarkdown components={MD}>{m.content}</ReactMarkdown>
      <div className="text-xs opacity-70 mt-2 flex items-center space-x-1">
        <Clock className="w-3 h-3" />
        <span>{fmtIST(m.timestamp, { compact: true })}</span>
      </div>
    </div>
  ),
);

/* -------------------------------------------------------------------------- */
/* Main Chatbot                                                               */
/* -------------------------------------------------------------------------- */

const Chatbot = ({ isOpen, onClose, onMinimize, isMinimized }: Props) => {
  /* ---------------------------- state / refs ----------------------------- */
  const [msg, setMsg] = useState('');
  const [list, setList] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  /* ---------------------------- helpers ---------------------------------- */
  const add = useCallback((m: Msg) => setList((p) => [...p, m]), []);

  const send = useCallback(async () => {
    if (!msg.trim() || busy) return;
    const u: Msg = { id: crypto.randomUUID(), role: 'user', content: msg, timestamp: getIST() };
    add(u);
    setMsg('');
    setBusy(true);
    setTyping(true);

    try {
      const { response } = await chatService.sendMessage(u.content, list);
      add({ id: crypto.randomUUID(), role: 'assistant', content: response, timestamp: getIST() });
      playDing();
    } catch {
      add({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: getIST(),
        error: true,
      });
    } finally {
      setTyping(false);
      setBusy(false);
    }
  }, [msg, busy, list, add]);

  /* --------------------------- side-effects ------------------------------ */
  useEffect(() => {
    if (isOpen && !list.length) {
      add({
        id: 'welcome',
        role: 'assistant',
        content: "Hey! I'm **Arka's AI Assistant**. How can I help you today?",
        timestamp: getIST(),
      });
    }
  }, [isOpen, list.length, add]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [list, typing]);

  /* ------------------------------ render --------------------------------- */
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`fixed bottom-4 right-4 z-50 ${
          isMinimized ? 'w-16 h-16' : 'w-[380px] h-[560px]'
        }`}
      >
        <Card className="w-full h-full flex flex-col overflow-hidden">
          {/* header */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              {!isMinimized && <span className="font-semibold text-sm">Arka AI</span>}
            </div>
            {!isMinimized && (
              <div className="space-x-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white"
                  onClick={onMinimize}
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* body */}
          {!isMinimized && (
            <>
              <ScrollArea className="flex-1 p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                {list.map((m) => (
                  <Bubble key={m.id} m={m} />
                ))}
                {typing && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1"
                      style={{ animationDelay: '100ms' }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '200ms' }}
                    />
                  </motion.div>
                )}
                <div ref={endRef} />
              </ScrollArea>

              {/* quick actions */}
              {!list.length && <Quick send={add} />}

              {/* input */}
              <div className="p-3 border-t flex space-x-2 bg-white dark:bg-gray-800">
                <Input
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Type your question…"
                  disabled={busy}
                />
                <Button onClick={send} disabled={!msg.trim() || busy} className="shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}

          {/* minimized */}
          {isMinimized && (
            <button
              onClick={onMinimize}
              className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white"
            >
              <MessageCircle className="w-7 h-7" />
            </button>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Chatbot);
