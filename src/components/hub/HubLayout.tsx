import React, { useState } from 'react';
import HubHeader from './HubHeader';
import HubSidebar from './HubSidebar';

interface HubLayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
  userName?: string;
  motivationalMessage?: string;
}

const HubLayout = ({ 
  children, 
  isAdmin = false, 
  userName = "Usuário",
  motivationalMessage 
}: HubLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <HubSidebar 
        isAdmin={isAdmin} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <HubHeader 
          userName={userName}
          motivationalMessage={motivationalMessage}
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default HubLayout;
