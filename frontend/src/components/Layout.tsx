
import React from 'react';
import AppSidebar from './AppSidebar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/';
  
  if (isAuthPage) {
    return <>{children}</>;
  }
  
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
};

export default Layout;
