
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, MessageSquare, Plus } from "lucide-react";

type Conversation = {
  id: string;
  title: string;
  timestamp: Date;
};

const AppSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: '1', title: 'Getting Started with AI', timestamp: new Date() },
    { id: '2', title: 'Machine Learning Basics', timestamp: new Date(Date.now() - 86400000) },
    { id: '3', title: 'Neural Networks Explained', timestamp: new Date(Date.now() - 172800000) },
  ]);

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: `New Conversation ${conversations.length + 1}`,
      timestamp: new Date(),
    };
    setConversations([newChat, ...conversations]);
  };

  return (
    <div
      className={`bg-sidebar text-sidebar-foreground h-screen relative transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && <h1 className="text-xl font-bold">AI Agent</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-muted hover:text-sidebar-foreground"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </div>
        
        <div className="p-4">
          <Button
            className="w-full bg-sidebar-accent hover:bg-sidebar-accent/90 text-sidebar-accent-foreground"
            onClick={createNewChat}
          >
            <Plus className="mr-2" size={18} />
            {!isCollapsed && <span>New Chat</span>}
          </Button>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          <div className="p-2">
            {!isCollapsed && <h2 className="text-sm uppercase text-sidebar-muted-foreground mb-2">Recent Chats</h2>}
            {conversations.map((convo) => (
              <Link
                key={convo.id}
                to={`/chat/${convo.id}`}
                className="flex items-center px-2 py-2 rounded-md hover:bg-sidebar-muted mb-1 transition-colors"
              >
                <MessageSquare size={18} className="flex-shrink-0" />
                {!isCollapsed && (
                  <div className="ml-3 overflow-hidden">
                    <p className="text-sm font-medium truncate">{convo.title}</p>
                    <p className="text-xs text-sidebar-muted-foreground">
                      {convo.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
        
        {!isCollapsed && (
          <div className="p-4 border-t border-sidebar-muted">
            <Link to="/profile" className="flex items-center text-sidebar-foreground hover:text-sidebar-accent-foreground">
              <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                <span className="font-medium">U</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">User</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppSidebar;
