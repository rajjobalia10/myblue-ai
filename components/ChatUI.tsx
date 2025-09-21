'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type ChatRole = 'user' | 'assistant';

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
}

function generateId(prefix: string = 'msg'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

const AssistantTyping: React.FC = () => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">AI</div>
    <div className="px-4 py-3 rounded-2xl bg-gray-100 text-gray-600 text-sm">
      <span className="inline-flex gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
      </span>
    </div>
  </div>
);

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div className={`flex items-start gap-3 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full ${isUser ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'} flex items-center justify-center text-xs font-medium`}>{isUser ? 'You' : 'AI'}</div>
        <div className={`${isUser ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'} px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap`}>{message.content}</div>
      </div>
    </div>
  );
};

const ChatUI: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isThinking, [input, isThinking]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isThinking]);

  function handleSend(): void {
    if (!canSend) return;
    const userMessage: ChatMessage = {
      id: generateId('user'),
      role: 'user',
      content: input.trim(),
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    mockAssistantReply(userMessage.content);
  }

  function mockAssistantReply(prompt: string): void {
    setIsThinking(true);
    // Simple mock logic that returns a professional response
    const base = `Here are a few directions for: "${prompt}"\n\n- Clarify the goal and constraints\n- Break the task into steps\n- Prioritize a quick prototype, then iterate\n- Measure results and refine`;
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: generateId('ai'),
        role: 'assistant',
        content: base,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsThinking(false);
    }, 900);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-['Instrument_Serif'] text-2xl">blueocean chat</h1>
            <p className="text-xs text-gray-500">Ask anything. Get clear, structured answers.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">New chat</button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-20">
              <div className="text-3xl font-['Instrument_Serif'] mb-2">What do you want to create?</div>
              <div className="text-sm">Start by describing your idea below.</div>
            </div>
          )}
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          {isThinking && <AssistantTyping />}
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Describe your idea"
              className="w-full h-28 resize-none rounded-xl border border-gray-300 bg-white p-4 pr-24 text-sm leading-relaxed outline-none transition focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/5"
            />
            <div className="absolute bottom-3 right-3 flex gap-2">
              <button
                type="button"
                disabled={!canSend}
                onClick={handleSend}
                className={`w-10 h-10 rounded-lg border ${canSend ? 'bg-black text-white border-black hover:bg-gray-800' : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'} flex items-center justify-center`}
                aria-label="Send message"
                title="Send"
              >
                ↑
              </button>
            </div>
          </div>
          <div className="mt-2 text-[11px] text-gray-400">
            By sending a message, you agree to our <a className="underline">Terms of Use</a> and <a className="underline">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;


