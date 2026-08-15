import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Bot,
  Check,
  Download,
  FileImage,
  FileText,
  GitBranch,
  GraduationCap,
  Mail,
  Moon,
  Phone,
  RefreshCw,
  Send,
  Sparkles,
  Sun,
  UserRound,
} from 'lucide-react';
import {
  quickQuestions,
  resumeDocuments,
  type Attachment,
  type ChatReply,
  welcomeReply,
} from './data/resume';
import { createReply } from './lib/chat';

type Message =
  | { id: number; role: 'user'; text: string }
  | { id: number; role: 'assistant'; reply: ChatReply };

type ApiHistoryMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatApiResponse = {
  model: string;
  reply: ChatReply;
};

const initialMessages: Message[] = [
  { id: 1, role: 'assistant', reply: welcomeReply },
];

function toApiHistory(messages: Message[]): ApiHistoryMessage[] {
  return messages.slice(1).map((message) => {
    if (message.role === 'user') {
      return { role: 'user', content: message.text };
    }

    const { title, text, bullets } = message.reply;
    return {
      role: 'assistant',
      content: [title, text, bullets?.join('\n')].filter(Boolean).join('\n'),
    };
  });
}

function AttachmentCard({ attachment }: { attachment: Attachment }) {
  const Icon = attachment.kind === 'pdf' ? FileText : FileImage;

  return (
    <a
      className="attachment-card"
      href={attachment.path}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${attachment.name}`}
    >
      <span className="attachment-icon" aria-hidden="true">
        <Icon size={20} strokeWidth={1.8} />
      </span>
      <span className="attachment-copy">
        <strong>{attachment.name}</strong>
        <small>{attachment.meta}</small>
      </span>
      <ArrowUpRight className="attachment-arrow" size={18} aria-hidden="true" />
    </a>
  );
}

function AssistantMessage({ reply }: { reply: ChatReply }) {
  return (
    <article className="message-row assistant-row">
      <div className="message-avatar assistant-avatar" aria-hidden="true">
        <Bot size={17} />
      </div>
      <div className="assistant-content">
        <div className="assistant-bubble">
          {reply.eyebrow && <span className="message-eyebrow">{reply.eyebrow}</span>}
          {reply.title && <h2>{reply.title}</h2>}
          <p>{reply.text}</p>

          {reply.bullets && (
            <ul className="answer-list">
              {reply.bullets.map((bullet) => (
                <li key={bullet}>
                  <Check size={15} aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {reply.links && (
            <div className="link-grid">
              {reply.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                  <span>
                    <strong>{link.label}</strong>
                    {link.meta && <small>{link.meta}</small>}
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}

          {reply.attachments && (
            <div className="attachment-grid">
              {reply.attachments.map((attachment) => (
                <AttachmentCard key={attachment.path} attachment={attachment} />
              ))}
            </div>
          )}
        </div>

        {reply.note && (
          <div className="source-note">
            <Sparkles size={13} aria-hidden="true" />
            <span>{reply.note}</span>
          </div>
        )}
      </div>
    </article>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <article className="message-row user-row">
      <div className="user-bubble">{text}</div>
      <div className="message-avatar user-avatar" aria-hidden="true">
        <UserRound size={17} />
      </div>
    </article>
  );
}

function TypingIndicator() {
  return (
    <div className="message-row assistant-row" role="status" aria-label="Resume assistant is typing">
      <div className="message-avatar assistant-avatar" aria-hidden="true">
        <Bot size={17} />
      </div>
      <div className="typing-bubble" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function App() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  const suggestedQuestions = useMemo(
    () => (messages.length === 1 ? quickQuestions : quickQuestions.slice(0, 3)),
    [messages.length],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendQuestion = async (question: string) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || isTyping) return;

    const history = toApiHistory(messages);

    const userId = nextId.current++;
    setMessages((current) => [
      ...current,
      { id: userId, role: 'user', text: cleanQuestion },
    ]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: cleanQuestion, history }),
      });

      if (!response.ok) throw new Error(`Chat request failed with ${response.status}.`);

      const result = await response.json() as ChatApiResponse;
      if (!result.reply?.text) throw new Error('The chat response was incomplete.');

      const verifiedLocalReply = createReply(cleanQuestion);
      const assistantId = nextId.current++;
      setMessages((current) => [
        ...current,
        {
          id: assistantId,
          role: 'assistant',
          reply: {
            ...result.reply,
            links: verifiedLocalReply.links,
            attachments: verifiedLocalReply.attachments,
          },
        },
      ]);
    } catch {
      const assistantId = nextId.current++;
      const fallbackReply = createReply(cleanQuestion);
      setMessages((current) => [
        ...current,
        {
          id: assistantId,
          role: 'assistant',
          reply: {
            ...fallbackReply,
            note: fallbackReply.note
              ? `${fallbackReply.note} · Verified local answer.`
              : 'Groq is temporarily unavailable · Showing a verified local answer.',
          },
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendQuestion(input);
  };

  const resetChat = () => {
    setMessages(initialMessages);
    setInput('');
    setIsTyping(false);
    nextId.current = 2;
  };

  return (
    <main className="page-shell">
      <div className="app-frame">
        <aside className="profile-panel" aria-label="Candidate summary">
          <div className="profile-topline">
            <span className="brand-mark">CB<span>.</span></span>
            <span className="profile-index">PORTFOLIO / 26</span>
          </div>

          <div className="profile-main">
            <div className="monogram" aria-hidden="true">
              <span>ÇB</span>
              <svg viewBox="0 0 100 100" role="presentation">
                <circle cx="50" cy="50" r="47" />
              </svg>
            </div>

            <span className="availability"><i /> Profile source verified</span>
            <h1>Çağatay<br />Birgi</h1>
            <p className="profile-role">Computer Engineering<br />Undergraduate</p>

            <div className="profile-facts">
              <div>
                <GraduationCap size={18} aria-hidden="true" />
                <span><strong>İYTE</strong>Expected 2027</span>
              </div>
              <div>
                <Sparkles size={18} aria-hidden="true" />
                <span><strong>Focus</strong>Software · Networking</span>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <a className="primary-download" href={resumeDocuments[0].path} download>
              <Download size={18} aria-hidden="true" />
              Download résumé
            </a>
            <div className="social-links" aria-label="Contact links">
              <a href="mailto:cagataybirgi@gmail.com" aria-label="Email Çağatay">
                <Mail size={18} />
              </a>
              <a href="tel:+905457271177" aria-label="Call Çağatay">
                <Phone size={18} />
              </a>
              <a href="https://github.com/cagataybirgi" target="_blank" rel="noreferrer" aria-label="View Çağatay's GitHub profile">
                <GitBranch size={18} />
              </a>
            </div>
          </div>
        </aside>

        <section className="chat-panel" aria-label="Resume conversation">
          <header className="chat-header">
            <div className="assistant-identity">
              <span className="header-bot"><Bot size={19} /></span>
              <div>
                <strong>Resume assistant</strong>
                <span><i /> Grounded in verified sources</span>
              </div>
            </div>

            <div className="header-actions">
              <button
                type="button"
                onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <button type="button" onClick={resetChat} aria-label="Start a new conversation">
                <RefreshCw size={18} />
              </button>
            </div>
          </header>

          <div className="messages" ref={scrollRef} aria-live="polite">
            <div className="conversation-date"><span>START OF CONVERSATION</span></div>
            {messages.map((message) =>
              message.role === 'assistant' ? (
                <AssistantMessage key={message.id} reply={message.reply} />
              ) : (
                <UserMessage key={message.id} text={message.text} />
              ),
            )}
            {isTyping && <TypingIndicator />}
          </div>

          <footer className="composer-area">
            <div className="suggestion-row" aria-label="Suggested questions">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendQuestion(question)}
                  disabled={isTyping}
                >
                  {question}
                </button>
              ))}
            </div>

            <form className="composer" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="chat-input">Ask about Çağatay’s résumé</label>
              <input
                id="chat-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about projects, skills, experience…"
                autoComplete="off"
                disabled={isTyping}
              />
              <button type="submit" disabled={!input.trim() || isTyping} aria-label="Send question">
                <Send size={18} aria-hidden="true" />
              </button>
            </form>
            <p className="composer-note">Answers stay within the supplied résumé, certificates, and public project sources.</p>
          </footer>
        </section>
      </div>
    </main>
  );
}

export default App;
