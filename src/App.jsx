import React, { useState } from 'react';
import { AgencyProvider, useAgency } from './context/AgencyContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ClientsView } from './components/ClientsView';
import { ProductionTracker } from './components/ProductionTracker';
import { ShootingTracker } from './components/ShootingTracker';
import { MetaAdsView } from './components/MetaAdsView';
import { CalendarView } from './components/CalendarView';
import { ApprovalsCenter } from './components/ApprovalsCenter';
import { ChatSystem } from './components/ChatSystem';
import { TeamDirectory } from './components/TeamDirectory';
import { BackupSettingsModal } from './components/BackupSettingsModal';
import { ClientModal, TaskModal, ShootModal, AdModal, TeamMemberModal } from './components/ActionModals';

const MainApp = () => {
  const { activeTab, currentUser } = useAgency();

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Client Modal
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);

  // Task Modal
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Shoot Modal
  const [isShootModalOpen, setIsShootModalOpen] = useState(false);
  const [shootToEdit, setShootToEdit] = useState(null);

  // Ad Modal
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [adToEdit, setAdToEdit] = useState(null);

  // Team Member Modal
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);

  // Handlers
  const handleOpenNewClient = () => {
    setClientToEdit(null);
    setIsClientModalOpen(true);
  };

  const handleEditClient = (client) => {
    setClientToEdit(client);
    setIsClientModalOpen(true);
  };

  const handleOpenNewTask = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleOpenNewShoot = () => {
    setShootToEdit(null);
    setIsShootModalOpen(true);
  };

  const handleEditShoot = (shoot) => {
    setShootToEdit(shoot);
    setIsShootModalOpen(true);
  };

  const handleOpenNewAd = () => {
    setAdToEdit(null);
    setIsAdModalOpen(true);
  };

  const handleEditAd = (ad) => {
    setAdToEdit(ad);
    setIsAdModalOpen(true);
  };

  const handleOpenNewMember = () => {
    setMemberToEdit(null);
    setIsMemberModalOpen(true);
  };

  const handleEditMember = (member) => {
    setMemberToEdit(member);
    setIsMemberModalOpen(true);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            onNewClient={handleOpenNewClient}
            onNewTask={handleOpenNewTask}
            onNewShoot={handleOpenNewShoot}
          />
        );
      case 'clients':
        return (
          <ClientsView 
            onEditClient={handleEditClient}
            onNewClient={handleOpenNewClient}
          />
        );
      case 'production':
        return (
          <ProductionTracker 
            onNewTask={handleOpenNewTask}
            onEditTask={handleEditTask}
          />
        );
      case 'shoots':
        return (
          <ShootingTracker 
            onNewShoot={handleOpenNewShoot}
            onEditShoot={handleEditShoot}
          />
        );
      case 'ads':
        return (
          <MetaAdsView 
            onNewAd={handleOpenNewAd}
            onEditAd={handleEditAd}
          />
        );
      case 'calendar':
        return <CalendarView />;
      case 'approvals':
        return <ApprovalsCenter />;
      case 'chat':
        return <ChatSystem />;
      case 'team':
        return (
          <TeamDirectory 
            onNewMember={handleOpenNewMember}
            onEditMember={handleEditMember}
          />
        );
      default:
        return (
          <Dashboard 
            onNewClient={handleOpenNewClient}
            onNewTask={handleOpenNewTask}
            onNewShoot={handleOpenNewShoot}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors">
      {/* Top Navbar */}
      <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar onOpenSettings={() => setIsSettingsOpen(true)} />

        {/* Dynamic Content View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-950/95 transition-colors">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Action Modals */}
      <BackupSettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <ClientModal 
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        clientToEdit={clientToEdit}
      />

      <TaskModal 
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        taskToEdit={taskToEdit}
      />

      <ShootModal 
        isOpen={isShootModalOpen}
        onClose={() => setIsShootModalOpen(false)}
        shootToEdit={shootToEdit}
      />

      <AdModal 
        isOpen={isAdModalOpen}
        onClose={() => setIsAdModalOpen(false)}
        adToEdit={adToEdit}
      />

      <TeamMemberModal 
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        memberToEdit={memberToEdit}
      />
    </div>
  );
};

export default function App() {
  return (
    <AgencyProvider>
      <MainApp />
    </AgencyProvider>
  );
}
