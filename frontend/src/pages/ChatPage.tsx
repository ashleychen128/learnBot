
import React from 'react';
import { useParams } from 'react-router-dom';
import ChatWindow from '../components/ChatWindow';

const ChatPage = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  
  return <ChatWindow chatId={chatId} />;
};

export default ChatPage;
