import React, { useState } from 'react';
import { 
  Users, 
  Film, 
  Camera, 
  Target, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Search, 
  Filter, 
  X, 
  Edit3, 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  Sparkles, 
  Layers, 
  Briefcase, 
  UserCheck, 
  Check, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useAgency } from '../context/AgencyContext';

export const ClientDeliverablesTracker = () => {
  const { 
    clients, 
    teamMembers, 
    updateClientQuota, 
    assignEmployeeToClient, 
    unassignEmployeeFromClient, 
    logDeliverableProgress, 
    updateClientFullQuotas, 
    changeReasons,
    currentUser
  } = useAgency();

  const [activeTab, setActiveTab] = useState('quotas'); // 'quotas' | 'matrix' | 'workload' | 'milestones'
  const [selectedMonth, setSelectedMonth] = useState('November 2026');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Quota Edit Modal state
  const [isQuotaModalOpen, setIsQuotaModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [quotaForm, setQuotaForm] = useState({
    videos: 16,
    graphics: 12,
    posts: 20,
    scripts: 20,
    shoots: 2,
    metaCampaigns: 4,
    changeReason: 'Monthly Quota & Target Adjustment',
    changeNotes: ''
  });

  // Reassignment Modal state
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assigningClient, setAssigningClient] = useState(null);
  const [selectedRoleKey, setSelectedRoleKey] = useState('videoEditing');
  const [selectedMemberId, setSelectedMemberId] = useState('');

  const safeClients = Array.isArray(clients) ? clients : [];
  const safeTeam = Array.isArray(teamMembers) ? teamMembers : [];

  // Filtered clients list
  const filteredClients = safeClients.filter(c => {
    if (!c) return false;
    const matchesSearch = (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.brand || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.industry || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Global Deliverables Metrics
  let totalCommitted = 0;
  let totalCompleted = 0;
  let totalInProgress = 0;

  safeClients.forEach(c => {
    if (c?.quotas) {
      Object.values(c.quotas).forEach(q => {
        if (q) {
          totalCommitted += Number(q.target) || 0;
          totalCompleted += Number(q.completed) || 0;
          totalInProgress += Number(q.inProgress) || 0;
        }
      });
    }
  });

  const overallPercent = totalCommitted > 0 ? Math.round((totalCompleted / totalCommitted) * 100) : 0;

  // Handlers
  const handleOpenEditQuotas = (client) => {
    setEditingClient(client);
    const q = client.quotas || {};
    setQuotaForm({
      videos: q.videos?.target || 16,
      graphics: q.graphics?.target || 12,
      posts: q.posts?.target || 20,
      scripts: q.scripts?.target || 20,
      shoots: q.shoots?.target || 2,
      metaCampaigns: q.metaCampaigns?.target || 4,
      changeReason: 'Monthly Quota & Target Adjustment',
      changeNotes: ''
    });
    setIsQuotaModalOpen(true);
  };

  const handleSaveQuotas = (e) => {
    e.preventDefault();
    if (!editingClient) return;

    const currentQ = editingClient.quotas || {};
    const newQuotas = {
      videos: { target: Number(quotaForm.videos), completed: currentQ.videos?.completed || 0, inProgress: currentQ.videos?.inProgress || 0 },
      graphics: { target: Number(quotaForm.graphics), completed: currentQ.graphics?.completed || 0, inProgress: currentQ.graphics?.inProgress || 0 },
      posts: { target: Number(quotaForm.posts), completed: currentQ.posts?.completed || 0, inProgress: currentQ.posts?.inProgress || 0 },
      scripts: { target: Number(quotaForm.scripts), completed: currentQ.scripts?.completed || 0, inProgress: currentQ.scripts?.inProgress || 0 },
      shoots: { target: Number(quotaForm.shoots), completed: currentQ.shoots?.completed || 0, inProgress: currentQ.shoots?.inProgress || 0 },
      metaCampaigns: { target: Number(quotaForm.metaCampaigns), completed: currentQ.metaCampaigns?.completed || 0, inProgress: currentQ.metaCampaigns?.inProgress || 0 }
    };

    updateClientFullQuotas(editingClient.id, newQuotas, quotaForm.changeReason, quotaForm.changeNotes);
    setIsQuotaModalOpen(false);
  };

  const handleOpenAssignModal = (client, roleKey = 'videoEditing') => {
    setAssigningClient(client);
    setSelectedRoleKey(roleKey);
    setSelectedMemberId(client.assignees?.[roleKey] || '');
    setIsAssignModalOpen(true);
  };

  const handleSaveAssignment = (e) => {
    e.preventDefault();
    if (!assigningClient || !selectedMemberId) return;
    assignEmployeeToClient(assigningClient.id, selectedRoleKey, selectedMemberId);
    setIsAssignModalOpen(false);
  };

  // Helper to get Member Object by ID
  const getMember = (id) => safeTeam.find(m => m.id === id);

  return (
    <div className="space-y-6">
      {/* Top Banner & Month Selector */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/20">
              Deliverables & Allocation Engine
            </span>
            <span className="text-xs text-blue-200">
              {safeClients.length} Active Accounts
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            Monthly Deliverables & Team Allocation Tracker
          </h1>
          <p className="text-xs text-blue-100/80 max-w-2xl">
            Track monthly content quotas, batch deliveries, employee client assignments, and specialist workloads.
          </p>
        </div>

        {/* Month Selector & Quick Export */}
        <div className="flex items-center gap-2.5 shrink-0 bg-white/10 p-2.5 rounded-2xl border border-white/20 backdrop-blur-md">
          <Calendar className="w-4 h-4 text-blue-200" />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer pr-2"
          >
            <option value="November 2026" className="bg-slate-900 text-white">November 2026 (Current)</option>
            <option value="December 2026" className="bg-slate-900 text-white">December 2026 (Upcoming)</option>
            <option value="October 2026" className="bg-slate-900 text-white">October 2026 (Previous)</option>
          </select>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Total Committed Quota</p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">{totalCommitted.toLocaleString()} Items</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Across all client retainers</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Delivered & Approved</p>
          <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{totalCompleted.toLocaleString()} Items</p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">{overallPercent}% Fulfillment Rate</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">In Production Pipeline</p>
          <p className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{totalInProgress.toLocaleString()} Items</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Active editing & design</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Specialists Deployed</p>
          <p className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">{safeTeam.length} Staff</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Zero unassigned specialists</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'quotas', label: 'Monthly Deliverables Matrix', icon: BarChart3, badge: `${safeClients.length} Clients` },
          { id: 'matrix', label: 'Client ➔ Staff Mapping', icon: Users, badge: 'Assignments' },
          { id: 'workload', label: 'Staff Workload & Capacity', icon: Briefcase, badge: `${safeTeam.length} Creators` },
          { id: 'milestones', label: 'Weekly Drop Milestones', icon: Calendar, badge: '4 Weeks' }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search client brand, name, or industry..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white cursor-pointer"
          >
            <option value="all">All Client Statuses</option>
            <option value="Active">Active Accounts</option>
            <option value="Pending">Pending Setup</option>
          </select>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: MONTHLY DELIVERABLES & QUOTAS MATRIX */}
      {/* ============================================================== */}
      {activeTab === 'quotas' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredClients.map((client) => {
              const q = client.quotas || {};
              const vids = q.videos || { target: 16, completed: 0, inProgress: 0 };
              const graphs = q.graphics || { target: 12, completed: 0, inProgress: 0 };
              const scripts = q.scripts || { target: 20, completed: 0, inProgress: 0 };
              const shoots = q.shoots || { target: 2, completed: 0, inProgress: 0 };
              const ads = q.metaCampaigns || { target: 4, completed: 0, inProgress: 0 };

              const clientTotalTarget = vids.target + graphs.target + scripts.target + shoots.target + ads.target;
              const clientTotalDelivered = vids.completed + graphs.completed + scripts.completed + shoots.completed + ads.completed;
              const clientPct = clientTotalTarget > 0 ? Math.round((clientTotalDelivered / clientTotalTarget) * 100) : 0;

              // Lead Assignee names
              const editor = getMember(client.assignees?.videoEditing);
              const designer = getMember(client.assignees?.shooting) || getMember(client.assignees?.ai);
              const accountManager = getMember(client.assignees?.management);

              return (
                <div 
                  key={client.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-blue-500/30 transition"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                          {client.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                          {client.industry || 'Business'}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                          ₹{(Number(client.monthlyRetainer) || 0).toLocaleString()}/mo
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex flex-wrap gap-2">
                        <span>Lead Editor: <strong className="text-slate-800 dark:text-slate-200">{editor ? editor.name : 'Unassigned'}</strong></span>
                        <span>•</span>
                        <span>Account Mgr: <strong className="text-slate-800 dark:text-slate-200">{accountManager ? accountManager.name : 'Neha Gupta'}</strong></span>
                      </p>
                    </div>

                    {/* Progress Badge & Action */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className={`px-2.5 py-1 rounded-xl text-xs font-black ${
                          clientPct >= 80 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400' 
                            : clientPct >= 40 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400' 
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400'
                        }`}>
                          {clientPct}% Done ({clientTotalDelivered}/{clientTotalTarget})
                        </span>
                      </div>

                      <button
                        onClick={() => handleOpenEditQuotas(client)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Adjust Targets</span>
                      </button>
                    </div>
                  </div>

                  {/* Deliverables Breakdown Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {/* 1. Videos & Reels */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <Film className="w-3.5 h-3.5 text-blue-600" />
                          <span>Reels / Short Videos</span>
                        </span>
                        <button
                          onClick={() => logDeliverableProgress(client.id, 'videos', 1)}
                          title="Log 1 reel delivered"
                          className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 font-bold text-[10px] hover:bg-blue-200 transition"
                        >
                          +1 Done
                        </button>
                      </div>
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-base font-black text-blue-600 dark:text-blue-400">
                          {vids.completed} <span className="text-xs text-slate-400">/ {vids.target}</span>
                        </span>
                        <span className="text-[10px] text-slate-400">{vids.inProgress} in edit</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full transition-all"
                          style={{ width: `${vids.target > 0 ? Math.min(100, Math.round((vids.completed / vids.target) * 100)) : 0}%` }}
                        />
                      </div>
                    </div>

                    {/* 2. Graphics & Carousels */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-pink-600" />
                          <span>Graphics / Posts</span>
                        </span>
                        <button
                          onClick={() => logDeliverableProgress(client.id, 'graphics', 1)}
                          title="Log 1 graphic delivered"
                          className="px-1.5 py-0.5 rounded bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-400 font-bold text-[10px] hover:bg-pink-200 transition"
                        >
                          +1 Done
                        </button>
                      </div>
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-base font-black text-pink-600 dark:text-pink-400">
                          {graphs.completed} <span className="text-xs text-slate-400">/ {graphs.target}</span>
                        </span>
                        <span className="text-[10px] text-slate-400">{graphs.inProgress} design</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-pink-600 h-full rounded-full transition-all"
                          style={{ width: `${graphs.target > 0 ? Math.min(100, Math.round((graphs.completed / graphs.target) * 100)) : 0}%` }}
                        />
                      </div>
                    </div>

                    {/* 3. Scripts & AI Hooks */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                          <span>Scripts & Hooks</span>
                        </span>
                        <button
                          onClick={() => logDeliverableProgress(client.id, 'scripts', 1)}
                          title="Log 1 script delivered"
                          className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 font-bold text-[10px] hover:bg-purple-200 transition"
                        >
                          +1 Done
                        </button>
                      </div>
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-base font-black text-purple-600 dark:text-purple-400">
                          {scripts.completed} <span className="text-xs text-slate-400">/ {scripts.target}</span>
                        </span>
                        <span className="text-[10px] text-slate-400">{scripts.inProgress} drafting</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-purple-600 h-full rounded-full transition-all"
                          style={{ width: `${scripts.target > 0 ? Math.min(100, Math.round((scripts.completed / scripts.target) * 100)) : 0}%` }}
                        />
                      </div>
                    </div>

                    {/* 4. Production Shoots */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5 text-amber-600" />
                          <span>Video Shoots</span>
                        </span>
                        <button
                          onClick={() => logDeliverableProgress(client.id, 'shoots', 1)}
                          title="Log 1 shoot completed"
                          className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold text-[10px] hover:bg-amber-200 transition"
                        >
                          +1 Done
                        </button>
                      </div>
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-base font-black text-amber-600 dark:text-amber-400">
                          {shoots.completed} <span className="text-xs text-slate-400">/ {shoots.target}</span>
                        </span>
                        <span className="text-[10px] text-slate-400">Monthly On-Site</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-amber-600 h-full rounded-full transition-all"
                          style={{ width: `${shoots.target > 0 ? Math.min(100, Math.round((shoots.completed / shoots.target) * 100)) : 0}%` }}
                        />
                      </div>
                    </div>

                    {/* 5. Meta Ads Campaigns */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Meta Ad Sets</span>
                        </span>
                        <button
                          onClick={() => logDeliverableProgress(client.id, 'metaCampaigns', 1)}
                          title="Log 1 ad set launched"
                          className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-[10px] hover:bg-emerald-200 transition"
                        >
                          +1 Done
                        </button>
                      </div>
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                          {ads.completed} <span className="text-xs text-slate-400">/ {ads.target}</span>
                        </span>
                        <span className="text-[10px] text-slate-400">Live ROAS Tracking</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-600 h-full rounded-full transition-all"
                          style={{ width: `${ads.target > 0 ? Math.min(100, Math.round((ads.completed / ads.target) * 100)) : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: CLIENT-TO-STAFF ALLOCATION MATRIX */}
      {/* ============================================================== */}
      {activeTab === 'matrix' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Client & Specialist Assignment Matrix
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  See exact departmental creators assigned to each client brand
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {safeClients.length} Mappings Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Client Brand</th>
                    <th className="py-3 px-4">🎬 Video Editor</th>
                    <th className="py-3 px-4">🎨 Graphic Designer</th>
                    <th className="py-3 px-4">🤖 AI & Copywriting</th>
                    <th className="py-3 px-4">🎥 Cinematographer</th>
                    <th className="py-3 px-4">📊 Meta Media Buyer</th>
                    <th className="py-3 px-4 text-right">Reassign</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredClients.map((c) => {
                    const editor = getMember(c.assignees?.videoEditing);
                    const designer = getMember(c.assignees?.shooting) || getMember(c.assignees?.ai);
                    const copywriter = getMember(c.assignees?.ai);
                    const dop = getMember(c.assignees?.shooting);
                    const adsLead = getMember(c.assignees?.smm);

                    return (
                      <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                          <div>
                            <p className="font-extrabold">{c.name}</p>
                            <p className="text-[10px] text-slate-400 font-normal">{c.industry || 'Business'}</p>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-semibold inline-flex items-center gap-1.5">
                            <Film className="w-3 h-3" />
                            {editor ? editor.name : 'Unassigned'}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-xl bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-400 font-semibold inline-flex items-center gap-1.5">
                            <Layers className="w-3 h-3" />
                            {designer ? designer.name : 'Rohan Sharma'}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 font-semibold inline-flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3" />
                            {copywriter ? copywriter.name : 'Sneha Rao'}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold inline-flex items-center gap-1.5">
                            <Camera className="w-3 h-3" />
                            {dop ? dop.name : 'Kabir Khan'}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold inline-flex items-center gap-1.5">
                            <Target className="w-3 h-3" />
                            {adsLead ? adsLead.name : 'Aryan Malhotra'}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleOpenAssignModal(c, 'videoEditing')}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition inline-flex items-center gap-1"
                          >
                            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                            <span>Switch</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: STAFF WORKLOAD & CAPACITY ROSTER */}
      {/* ============================================================== */}
      {activeTab === 'workload' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {safeTeam.map((member) => {
              const assignedClientsList = safeClients.filter(c => {
                if (!c) return false;
                const inMemberArray = Array.isArray(member.assignedClientIds) && member.assignedClientIds.includes(c.id);
                const inClientAssignees = c.assignees && Object.values(c.assignees).includes(member.id);
                return inMemberArray || inClientAssignees;
              });

              const clientCount = assignedClientsList.length;
              const isHeavy = clientCount >= 5;
              const isOptimal = clientCount >= 1 && clientCount <= 4;

              // Total monthly reels burden
              let monthlyReelsBurden = 0;
              assignedClientsList.forEach(c => {
                monthlyReelsBurden += Number(c.quotas?.videos?.target) || 0;
              });

              return (
                <div 
                  key={member.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-blue-500/40 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                          {member.name}
                        </h4>
                        <p className="text-[11px] text-slate-500">{member.role}</p>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isHeavy 
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-300' 
                        : isOptimal 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400' 
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {clientCount === 0 ? 'Available' : isHeavy ? 'Heavy Load' : 'Optimal Capacity'}
                    </span>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Assigned Clients</p>
                      <p className="text-base font-black text-blue-600 dark:text-blue-400 mt-0.5">
                        {clientCount} Brands
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Daily Output</p>
                      <p className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {member.dailyTarget || '3 Reels/d'}
                      </p>
                    </div>
                  </div>

                  {/* Active Client Tags */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Assigned Brand Accounts ({clientCount}):
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {assignedClientsList.length === 0 ? (
                        <span className="text-[11px] text-slate-400 italic">No assigned clients currently</span>
                      ) : (
                        assignedClientsList.map(c => (
                          <span 
                            key={c.id}
                            className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                          >
                            {c.name.split(' ')[0]}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: WEEKLY MILESTONE DROPS TRACKER */}
      {/* ============================================================== */}
      {activeTab === 'milestones' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Weekly Deliverable Drop Milestones — {selectedMonth}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Client batches scheduled in 4 weekly drops per month
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['Week 1 (1st - 7th)', 'Week 2 (8th - 14th)', 'Week 3 (15th - 21st)', 'Week 4 (22nd - 30th)'].map((wk, idx) => {
                const isPassed = idx <= 1; // Assuming current date is Week 2
                return (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-slate-900 dark:text-white">{wk}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isPassed 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400'
                      }`}>
                        {isPassed ? 'Completed' : 'Active Batch'}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <p className="font-bold text-slate-800 dark:text-slate-200">Reels Target</p>
                        <p className="text-sm font-black text-blue-600 dark:text-blue-400 mt-0.5">
                          {Math.round(totalCommitted * 0.25)} Deliverables
                        </p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <p className="font-bold text-slate-800 dark:text-slate-200">Scheduled Shoots</p>
                        <p className="text-sm font-black text-amber-600 dark:text-amber-400 mt-0.5">
                          {idx === 0 ? '8 Shoots Done' : idx === 1 ? '6 Shoots Active' : '5 Shoots Planned'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 1: ADJUST MONTHLY DELIVERABLES QUOTAS */}
      {/* ============================================================== */}
      {isQuotaModalOpen && editingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl p-6 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Adjust Monthly Deliverables Quotas
                </h3>
                <p className="text-xs text-slate-500">{editingClient.name}</p>
              </div>
              <button onClick={() => setIsQuotaModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveQuotas} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Reels / Videos Target</label>
                  <input
                    type="number"
                    min="0"
                    value={quotaForm.videos}
                    onChange={(e) => setQuotaForm({ ...quotaForm, videos: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Graphics / Posts Target</label>
                  <input
                    type="number"
                    min="0"
                    value={quotaForm.graphics}
                    onChange={(e) => setQuotaForm({ ...quotaForm, graphics: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Scripts & Copy Target</label>
                  <input
                    type="number"
                    min="0"
                    value={quotaForm.scripts}
                    onChange={(e) => setQuotaForm({ ...quotaForm, scripts: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Video Shoots Target</label>
                  <input
                    type="number"
                    min="0"
                    value={quotaForm.shoots}
                    onChange={(e) => setQuotaForm({ ...quotaForm, shoots: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Meta Ad Campaigns Target</label>
                <input
                  type="number"
                  min="0"
                  value={quotaForm.metaCampaigns}
                  onChange={(e) => setQuotaForm({ ...quotaForm, metaCampaigns: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold"
                />
              </div>

              {/* Mandatory Reason for Change */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div>
                  <label className="block font-bold mb-1 text-slate-800 dark:text-slate-200">
                    Mandatory Reason for Quota Change *
                  </label>
                  <select
                    value={quotaForm.changeReason}
                    onChange={(e) => setQuotaForm({ ...quotaForm, changeReason: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
                  >
                    {changeReasons.map((r, i) => (
                      <option key={i} value={r.category}>{r.category} — {r.description}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Detailed Justification Notes</label>
                  <textarea
                    rows="2"
                    value={quotaForm.changeNotes}
                    onChange={(e) => setQuotaForm({ ...quotaForm, changeNotes: e.target.value })}
                    placeholder="Explain why this deliverable quota was adjusted..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
              >
                Save Quotas & Update Audit Trail
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: REASSIGN TEAM MEMBER TO CLIENT */}
      {/* ============================================================== */}
      {isAssignModalOpen && assigningClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Assign Specialist to Client
                </h3>
                <p className="text-xs text-slate-500">{assigningClient.name}</p>
              </div>
              <button onClick={() => setIsAssignModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveAssignment} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Department Role</label>
                <select
                  value={selectedRoleKey}
                  onChange={(e) => setSelectedRoleKey(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
                >
                  <option value="videoEditing">🎬 Video Editing Lead</option>
                  <option value="shooting">🎥 Cinematography & DoP Lead</option>
                  <option value="ai">🤖 AI Prompt & Copywriting Lead</option>
                  <option value="smm">📊 Meta Ads & Media Buyer Lead</option>
                  <option value="management">👔 Account Operations Manager</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Select Specialist</label>
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
                >
                  <option value="">-- Choose Team Member --</option>
                  {safeTeam.map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
              >
                Confirm Assignment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
