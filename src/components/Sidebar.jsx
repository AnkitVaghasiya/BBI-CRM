import React from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  LayoutDashboard, 
  Users, 
  Film, 
  Camera, 
  Target, 
  CalendarClock, 
  CheckCircle2, 
  MessageSquare, 
  Briefcase, 
  Settings,
  Bot,
  Network,
  BarChart3,
  Share2,
  Clock,
  ShieldCheck,
  X
} from 'lucide-react';

export const Sidebar = ({ onOpenSettings, isMobileOpen, onCloseMobile, onOpenSecurity, onOpenAuth }) => {
  const { 
    activeTab, 
    setActiveTab, 
    currentUser, 
    tasks, 
    shoots, 
    ads, 
    clients, 
    teamMembers,
    isFreshWorkspace,
    clearAllDummyData,
    loadDemoData
  } = useAgency();

  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const safeShoots = Array.isArray(shoots) ? shoots : [];
  const safeAds = Array.isArray(ads) ? ads : [];
  const safeClients = Array.isArray(clients) ? clients : [];
  const safeTeam = Array.isArray(teamMembers) ? teamMembers : [];
  const userRole = (!currentUser?.role || currentUser.role === 'admin') ? 'management' : currentUser.role;

  const pendingApprovalsCount = safeTasks.filter(t => t && t.status === 'Client Approval Pending').length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Executive Overview',
      icon: LayoutDashboard,
      roles: ['management', 'video-editing', 'shooting-team', 'ai-content', 'meta-ads'],
      badge: null
    },
    {
      id: 'departments',
      label: 'Department Dashboards',
      icon: BarChart3,
      roles: ['management', 'video-editing', 'shooting-team', 'ai-content', 'meta-ads'],
      badge: '5 Hubs',
      badgeColor: 'blue'
    },
    {
      id: 'hrms',
      label: 'Employee HR & Attendance',
      icon: Clock,
      roles: ['management', 'video-editing', 'shooting-team', 'ai-content', 'meta-ads'],
      badge: 'HRMS',
      badgeColor: 'purple'
    },
    {
      id: 'clients',
      label: 'Client CRM & Services',
      icon: Users,
      roles: ['management', 'meta-ads'],
      badge: `${safeClients.length}`
    },
    {
      id: 'channels',
      label: 'Client Social & Meta Ads',
      icon: Share2,
      roles: ['management', 'meta-ads', 'video-editing', 'ai-content'],
      badge: 'Channels',
      badgeColor: 'emerald'
    },
    {
      id: 'production',
      label: 'Master Production',
      icon: Film,
      roles: ['management', 'video-editing', 'ai-content'],
      badge: `${safeTasks.length}`
    },
    {
      id: 'ai-studio',
      label: 'AI Creative Studio',
      icon: Bot,
      roles: ['management', 'ai-content', 'video-editing', 'meta-ads'],
      badge: 'GenAI',
      badgeColor: 'purple'
    },
    {
      id: 'shoots',
      label: 'Shooting Schedule',
      icon: Camera,
      roles: ['management', 'shooting-team'],
      badge: `${safeShoots.length}`
    },
    {
      id: 'ads',
      label: 'Meta Ads & Growth',
      icon: Target,
      roles: ['management', 'meta-ads'],
      badge: `${safeAds.length}`
    },
    {
      id: 'calendar',
      label: 'Publishing Calendar',
      icon: CalendarClock,
      roles: ['management', 'meta-ads', 'video-editing', 'client'],
      badge: null
    },
    {
      id: 'approvals',
      label: 'Client Approvals',
      icon: CheckCircle2,
      roles: ['management', 'client', 'video-editing'],
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} Pending` : null,
      badgeColor: 'amber'
    },
    {
      id: 'chat',
      label: 'Team & Client Chat',
      icon: MessageSquare,
      roles: ['management', 'video-editing', 'shooting-team', 'ai-content', 'meta-ads', 'client', 'vendor'],
      badge: 'Live'
    },
    {
      id: 'team',
      label: 'Team & Partner Vendors',
      icon: Briefcase,
      roles: ['management'],
      badge: `${safeTeam.length}`
    },
    {
      id: 'integrations',
      label: 'APIs & Integrations',
      icon: Network,
      roles: ['management', 'meta-ads'],
      badge: 'Active'
    }
  ];

  const visibleNav = navItems.filter(item => item.roles.includes(userRole));

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-4 overflow-y-auto">
      <div className="space-y-4">
        {/* Mobile Header with close button */}
        <div className="flex items-center justify-between lg:hidden pb-3 border-b border-slate-200 dark:border-slate-800">
          <span className="font-extrabold text-sm text-slate-900 dark:text-white">
            Navigation Menu
          </span>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role banner if client */}
        {userRole === 'client' && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs">
            <p className="font-bold">🏢 Client Portal Active</p>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400/80 mt-0.5">
              Review deliverables, approve reels, request revisions & chat with your team.
            </p>
          </div>
        )}

        <div>
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Navigation
          </p>
          <nav className="space-y-1">
            {visibleNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 font-bold' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : item.badgeColor === 'amber'
                          ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30'
                          : item.badgeColor === 'purple'
                            ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30'
                            : item.badgeColor === 'emerald'
                              ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Workspace Mode Controls */}
        <div className="pt-2 px-1">
          {isFreshWorkspace ? (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-[11px] space-y-2">
              <p className="font-bold text-amber-800 dark:text-amber-300">Clean Slate Active</p>
              <p className="text-[10px] text-amber-700 dark:text-amber-400">Zero dummy data. Ready for your real clients & team.</p>
              <button
                onClick={loadDemoData}
                className="w-full py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px] transition"
              >
                Load Sample Demo Data
              </button>
            </div>
          ) : (
            <button
              onClick={clearAllDummyData}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-slate-600 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 text-[11px] font-bold transition text-left flex items-center justify-between"
            >
              <span>Purge All Dummy Data</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400">Fresh</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Setup & Security Tools */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
        {onOpenSecurity && (
          <button
            onClick={() => { onOpenSecurity(); if (onCloseMobile) onCloseMobile(); }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Security Diagnostics</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono">
              0 Vulns
            </span>
          </button>
        )}

        <button
          onClick={() => { onOpenSettings(); if (onCloseMobile) onCloseMobile(); }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Settings & Backups</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-mono">
            Setup
          </span>
        </button>

        <div className="px-3 pt-2 text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between">
          <span>OmniAgency OS v3.0</span>
          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shrink-0 h-[calc(100vh-4rem)] transition-colors">
        {sidebarContent}
      </aside>

      {/* Mobile & Tablet Slide-Over Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
          />
          <div className="relative w-72 max-w-[85vw] bg-white dark:bg-slate-900 h-full shadow-2xl z-10 animate-slide-right flex flex-col">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
