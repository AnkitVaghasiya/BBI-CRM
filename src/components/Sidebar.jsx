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
  Share2
} from 'lucide-react';

export const Sidebar = ({ onOpenSettings }) => {
  const { activeTab, setActiveTab, currentUser, tasks, shoots, ads, clients, teamMembers } = useAgency();

  const pendingApprovalsCount = tasks.filter(t => t.status === 'Client Approval Pending').length;

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
      id: 'clients',
      label: 'Client CRM & Services',
      icon: Users,
      roles: ['management', 'meta-ads'],
      badge: `${clients.length}`
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
      badge: `${tasks.length}`
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
      badge: `${shoots.length}`
    },
    {
      id: 'ads',
      label: 'Meta Ads & Growth',
      icon: Target,
      roles: ['management', 'meta-ads'],
      badge: `${ads.length}`
    },
    {
      id: 'calendar',
      label: 'Publishing Calendar',
      icon: CalendarClock,
      roles: ['management', 'meta-ads', 'video-editing'],
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
      roles: ['management', 'video-editing', 'shooting-team', 'ai-content', 'meta-ads', 'client'],
      badge: 'Live'
    },
    {
      id: 'team',
      label: 'Team Directory',
      icon: Briefcase,
      roles: ['management'],
      badge: `${teamMembers.length}`
    },
    {
      id: 'integrations',
      label: 'APIs & Integrations',
      icon: Network,
      roles: ['management', 'meta-ads'],
      badge: 'Active'
    }
  ];

  const visibleNav = navItems.filter(item => item.roles.includes(currentUser.role));

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] overflow-y-auto transition-colors">
      <div className="space-y-4">
        {/* Role banner if client */}
        {currentUser.role === 'client' && (
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
                  onClick={() => setActiveTab(item.id)}
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
      </div>

      {/* Bottom Setup & Status */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
        <button
          onClick={onOpenSettings}
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
          <span>OmniAgency OS v2.0</span>
          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
          </span>
        </div>
      </div>
    </aside>
  );
};
