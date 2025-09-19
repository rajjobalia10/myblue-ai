'use client';

import React, { useState } from 'react';

// Types for chat data
export interface Chat {
  id: string;
  title: string;
  preview: string;
  createdAt: Date;
}

// Props interface
interface SidebarProps {
  chats: Chat[];
  currentChatId?: string;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat?: (chatId: string) => void;
}

// Mock data hook with realistic AI search conversations
export const useChats = (): { chats: Chat[]; isLoading: boolean } => {
  const mockChats: Chat[] = [
    {
      id: '1',
      title: 'Climate change effects on agriculture',
      preview: 'Climate change effects on agriculture',
      createdAt: new Date(),
    },
    {
      id: '2', 
      title: 'Python machine learning basics',
      preview: 'Python machine learning basics',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    },
    {
      id: '3',
      title: 'Best restaurants in Tokyo 2025',
      preview: 'Best restaurants in Tokyo 2025',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      id: '4',
      title: 'How to invest in index funds',
      preview: 'How to invest in index funds',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
    {
      id: '5',
      title: 'Quantum computing explained simply',
      preview: 'Quantum computing explained simply',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    },
    {
      id: '6',
      title: 'Remote work productivity tips',
      preview: 'Remote work productivity tips',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    },
  ];

  return { chats: mockChats, isLoading: false };
};

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  currentChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const truncateText = (text: string, maxLength: number = 30) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-[#1a1b1e] text-white z-50 border-r border-[#2a2b2e]
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-[260px]'}
        lg:translate-x-0
        ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-[#2a2b2e]">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <h2 className="text-lg font-semibold text-white font-['Instrument_Serif']">blueocean</h2>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 hover:bg-[#2a2b2e] rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <button
              onClick={onNewChat}
              className={`
                w-full flex items-center gap-3 px-4 py-3
                bg-transparent hover:bg-[#2a2b2e] 
                rounded-lg transition-colors duration-200
                text-white font-medium text-sm
                ${isCollapsed ? 'justify-center px-2' : ''}
              `}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {!isCollapsed && <span>New Chat</span>}
            </button>
          </div>

          {/* Chats Section */}
          <div className="flex-1 overflow-hidden">
            <div className="px-4 pb-3">
              {!isCollapsed && (
                <h3 className="text-xs font-medium text-[#9ca3af] uppercase tracking-wide">
                  Chats
                </h3>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto px-4 pb-4 sidebar-scroll">
              <div className="space-y-1">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => onSelectChat(chat.id)}
                    className={`
                      group relative p-3 rounded-lg cursor-pointer
                      transition-all duration-200
                      ${currentChatId === chat.id 
                        ? 'bg-[#2a2b2e] border-l-2 border-blue-500' 
                        : 'hover:bg-[#2a2b2e]'
                      }
                      ${isCollapsed ? 'flex justify-center' : ''}
                    `}
                  >
                    {isCollapsed ? (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    ) : (
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-medium text-white truncate pr-2">
                            {truncateText(chat.title)}
                          </h4>
                          {onDeleteChat && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteChat(chat.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600 rounded transition-all duration-200"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                        <span className="text-xs text-[#9ca3af] mt-1">
                          {formatDate(chat.createdAt)}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#2a2b2e]">
            {!isCollapsed && (
              <div className="text-xs text-[#9ca3af] text-center">
                AI Search Assistant
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
