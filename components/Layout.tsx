'use client';

import React, { useState } from 'react';
import Sidebar, { useChats, Chat } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { chats, isLoading } = useChats();
  const [currentChatId, setCurrentChatId] = useState<string | undefined>();

  const handleNewChat = () => {
    // TODO: Implement new chat creation
    console.log('Starting new chat...');
    setCurrentChatId(undefined);
  };

  const handleSelectChat = (chatId: string) => {
    // TODO: Load chat data from state management
    console.log('Loading chat:', chatId);
    setCurrentChatId(chatId);
  };

  const handleDeleteChat = (chatId: string) => {
    // TODO: Implement chat deletion
    console.log('Deleting chat:', chatId);
    if (currentChatId === chatId) {
      setCurrentChatId(undefined);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-[260px] transition-all duration-300">
        <div className="h-full overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
