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
  FolderGit2
} from 'lucide-react';

export const Sidebar = ({ onOpenSettings }) => {
  const { activeTab, setActiveTab, currentUser, tasks, shoots, ads, clients } = useAgency();

  // Pending counts
  const pendingApprovalsCount = tasks.filter(t => t.status === 'Client Approval Pending').length;
  const revisionsCount = tasks.filter(t => t.status === 'Revision Requested').length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['management', 'video-editing', 'shooting-team', 'ai-content', 'meta-ads'],
      badge: null
    },
    {
      id: 'clients',
      label: 'Client CRM (200+)',
      icon: Users,
      roles: ['management', 'meta-ads'],
      badge: `${clients.length}`
    },
    {
      id: 'production',
      label: 'Production Tracker',
      icon: Film,
      roles: ['management', 'video-editing', 'ai-content'],
      badge: tasks.length
    },
    {
      id: 'shoots',
      label: 'Video Shoots',
      icon: Camera,
      roles: ['management', 'shooting-team'],
      badge: shoots.length
    },
    {
      id: 'ads',
      label: 'Meta Ads & SMM',
      icon: Target,
      roles: ['management', 'meta-ads'],
      badge: ads.length
    },
    {
      id: 'calendar',
      label: 'Posting Calendar',
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
      label: '25-Member Team',
      icon: Briefcase,
      roles: ['management'],
      badge: '25'
    }
  ];

  // Filter nav items based on current role
  const visibleNav = navItems.filter(item => item.roles.includes(currentUser.role));

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="space-y-6">
        {/* Role banner if client */}
        {currentUser.role === 'client' && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
            <p className="font-bold">Client Portal Active</p>
            <p className="text-[11px] text-emerald-400/80 mt-0.5">Showing your brand deliverables, approval queue & dedicated chat.</p>
          </div>
        )}

        <div>
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Operations Menu
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
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : item.badgeColor === 'amber'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
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

      {/* Bottom Setup & Integration Links */}
      <div className="pt-4 border-t border-slate-800 space-y-1">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Cloud & GitHub Setup</span>
          </div>
          <span className="text-[10px] bg-slate-800 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">
            Git / FB
          </span>
        </button>

        <div className="px-3 pt-2 text-[11px] text-slate-500 flex items-center justify-between">
          <span>v1.0.0 Production</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online
          </span>
        </div>
      </div>
    </aside>
  );
};
