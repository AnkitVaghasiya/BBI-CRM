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
import { IntegrationsHub } from './components/IntegrationsHub';
import { AIStudio } from './components/AIStudio';
import { DepartmentDashboards } from './components/DepartmentDashboards';
import { ClientChannelsHub } from './components/ClientChannelsHub';
import { EmployeeHRHub } from './components/EmployeeHRHub';
import { ClientDeliverablesTracker } from './components/ClientDeliverablesTracker';
import { SecurityAuditModal } from './components/SecurityAuditModal';
import { AuthModal } from './components/AuthModal';
import { SnapshotVaultModal } from './components/SnapshotVaultModal';
import { LiveNotificationToast } from './components/LiveNotificationToast';
import { BackupSettingsModal } from './components/BackupSettingsModal';
import { ClientModal, TaskModal, ShootModal, AdModal, TeamMemberModal } from './components/ActionModals';
import { 
  LayoutDashboard, 
  Film, 
  Clock, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';

const MainApp = () => {
  const { activeTab, setActiveTab, currentUser } = useAgency();

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSnapshotVaultOpen, setIsSnapshotVaultOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      case 'departments':
        return <DepartmentDashboards />;
      case 'hrms':
        return <EmployeeHRHub />;
      case 'clients':
        return (
          <ClientsView 
            onEditClient={handleEditClient}
            onNewClient={handleOpenNewClient}
          />
        );
      case 'deliverables':
        return <ClientDeliverablesTracker />;
      case 'channels':
        return <ClientChannelsHub onOpenClientModal={handleEditClient} />;
      case 'production':
        return (
          <ProductionTracker 
            onNewTask={handleOpenNewTask}
            onEditTask={handleEditTask}
          />
        );
      case 'ai-studio':
        return <AIStudio />;
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
      case 'integrations':
        return <IntegrationsHub />;
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
      <Navbar 
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenSecurity={() => setIsSecurityOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSnapshotVault={() => setIsSnapshotVaultOpen(true)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar (Desktop & Mobile Drawer) */}
        <Sidebar 
          onOpenSettings={() => setIsSettingsOpen(true)}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          onOpenSecurity={() => setIsSecurityOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        {/* Dynamic Content View */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 pb-20 sm:pb-8 bg-slate-50 dark:bg-slate-950/95 transition-colors">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Bottom Navigation Bar for Mobile Phones (Thumb-friendly navigation) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            activeTab === 'dashboard' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('production')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            activeTab === 'production' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
          }`}
        >
          <Film className="w-4 h-4 mb-0.5" />
          <span>Tasks</span>
        </button>

        <button
          onClick={() => setActiveTab('hrms')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            activeTab === 'hrms' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
          }`}
        >
          <Clock className="w-4 h-4 mb-0.5" />
          <span>Punch/HR</span>
        </button>

        <button
          onClick={() => setActiveTab('approvals')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            activeTab === 'approvals' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 mb-0.5" />
          <span>Approvals</span>
        </button>

        <button
          onClick={() => setIsAuthOpen(true)}
          className="flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold text-slate-500"
        >
          <Lock className="w-4 h-4 mb-0.5" />
          <span>Account</span>
        </button>
      </nav>

      {/* Live Sync Notification Toast */}
      <LiveNotificationToast />

      {/* Snapshot Rollback Vault Modal */}
      <SnapshotVaultModal 
        isOpen={isSnapshotVaultOpen}
        onClose={() => setIsSnapshotVaultOpen(false)}
      />

      {/* Security Diagnostics Modal */}
      <SecurityAuditModal 
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
      />

      {/* Authentication & Multi-Role Register/Login Modal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

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
