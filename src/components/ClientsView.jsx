import React, { useState, useMemo } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Search, 
  Plus, 
  ExternalLink, 
  HardDrive, 
  Trash2, 
  Edit3,
  ChevronLeft,
  ChevronRight,
  Film,
  Image as ImageIcon,
  FileText,
  Share2,
  SlidersHorizontal,
  X,
  Check,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const ClientsView = ({ onEditClient, onNewClient }) => {
  const { clients, saveClient, deleteClient, teamMembers, serviceCategories, setSelectedClientId, switchRole, setActiveTab } = useAgency();

  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [channelFilter, setChannelFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Manage Quota Modal State
  const [quotaClient, setQuotaClient] = useState(null);
  const [quotaForm, setQuotaForm] = useState(null);

  const openQuotaModal = (client) => {
    setQuotaClient(client);
    setQuotaForm(client.quotas || {
      videos: { target: 16, completed: 0, inProgress: 0 },
      graphics: { target: 12, completed: 0, inProgress: 0 },
      posts: { target: 20, completed: 0, inProgress: 0 },
      scripts: { target: 20, completed: 0, inProgress: 0 },
      shoots: { target: 2, completed: 0, inProgress: 0 },
      metaCampaigns: { target: 4, completed: 0, inProgress: 0 }
    });
  };

  const handleSaveQuotas = (e) => {
    e.preventDefault();
    if (!quotaClient) return;
    saveClient({
      ...quotaClient,
      quotas: quotaForm
    });
    setQuotaClient(null);
  };

  // Aggregate Quotas across all clients
  const quotaTotals = useMemo(() => {
    return clients.reduce((acc, c) => {
      const q = c.quotas || {};
      acc.videosTarget += q.videos?.target || 0;
      acc.videosCompleted += q.videos?.completed || 0;
      acc.graphicsTarget += q.graphics?.target || 0;
      acc.graphicsCompleted += q.graphics?.completed || 0;
      acc.scriptsTarget += q.scripts?.target || 0;
      acc.scriptsCompleted += q.scripts?.completed || 0;
      acc.postsTarget += q.posts?.target || 0;
      acc.postsCompleted += q.posts?.completed || 0;
      return acc;
    }, {
      videosTarget: 0, videosCompleted: 0,
      graphicsTarget: 0, graphicsCompleted: 0,
      scriptsTarget: 0, scriptsCompleted: 0,
      postsTarget: 0, postsCompleted: 0
    });
  }, [clients]);

  // Filter clients
  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = 
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.brand.toLowerCase().includes(search.toLowerCase()) ||
        client.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase()) ||
        (client.socialChannels?.meta?.adAccountId && client.socialChannels.meta.adAccountId.toLowerCase().includes(search.toLowerCase())) ||
        (client.socialChannels?.instagram?.handle && client.socialChannels.instagram.handle.toLowerCase().includes(search.toLowerCase()));

      const matchesIndustry = industryFilter === 'All' || client.industry === industryFilter;
      const matchesService = serviceFilter === 'All' || (client.services && client.services.includes(serviceFilter));
      const matchesStatus = statusFilter === 'All' || client.status === statusFilter;

      let matchesChannel = true;
      if (channelFilter !== 'All') {
        const sc = client.socialChannels || {};
        if (channelFilter === 'meta') matchesChannel = sc.meta?.active === true;
        else if (channelFilter === 'instagram') matchesChannel = sc.instagram?.active === true;
        else if (channelFilter === 'youtube') matchesChannel = sc.youtube?.active === true;
        else if (channelFilter === 'snapchat') matchesChannel = sc.snapchat?.active === true;
        else if (channelFilter === 'pinterest') matchesChannel = sc.pinterest?.active === true;
      }

      return matchesSearch && matchesIndustry && matchesService && matchesStatus && matchesChannel;
    });
  }, [clients, search, industryFilter, serviceFilter, channelFilter, statusFilter]);

  const totalPages = Math.ceil(filteredClients.length / pageSize) || 1;
  const paginatedClients = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredClients.slice(start, start + pageSize);
  }, [filteredClients, page, pageSize]);

  const allIndustries = useMemo(() => {
    const set = new Set(clients.map(c => c.industry));
    return ['All', ...Array.from(set)];
  }, [clients]);

  const getMemberName = (id) => {
    const m = teamMembers.find(t => t.id === id);
    return m ? m.name : 'Unassigned';
  };

  const getServiceBadgeColor = (serviceId) => {
    switch (serviceId) {
      case 'video-editing': return 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
      case 'video-shooting': return 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
      case 'social-media-posting': return 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20';
      case 'meta-ads': return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
      case 'ai-posts': return 'bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-500/20';
      case 'photos': return 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20';
      case 'raw-data': return 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/20';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Client CRM Directory & Deliverables Quotas
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              {clients.length} Active Accounts
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage client retainers, monthly deliverables quotas (videos, graphics, scripts, posts), department assignees, and cloud vaults.
          </p>
        </div>

        <button
          onClick={onNewClient}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-sm shadow-blue-500/20 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard New Client</span>
        </button>
      </div>

      {/* Deliverable Quota Top Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200/80 dark:border-blue-500/20 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-blue-500" />
              Monthly Videos
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400">
              {Math.round((quotaTotals.videosCompleted / (quotaTotals.videosTarget || 1)) * 100)}%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{quotaTotals.videosCompleted}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">/ {quotaTotals.videosTarget} target</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all" 
              style={{ width: `${Math.min(100, (quotaTotals.videosCompleted / (quotaTotals.videosTarget || 1)) * 100)}%` }} 
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200/80 dark:border-purple-500/20 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-purple-500" />
              Monthly Graphics
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400">
              {Math.round((quotaTotals.graphicsCompleted / (quotaTotals.graphicsTarget || 1)) * 100)}%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{quotaTotals.graphicsCompleted}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">/ {quotaTotals.graphicsTarget} target</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-purple-600 h-full rounded-full transition-all" 
              style={{ width: `${Math.min(100, (quotaTotals.graphicsCompleted / (quotaTotals.graphicsTarget || 1)) * 100)}%` }} 
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-500/20 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              Scripts & Concepts
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400">
              {Math.round((quotaTotals.scriptsCompleted / (quotaTotals.scriptsTarget || 1)) * 100)}%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{quotaTotals.scriptsCompleted}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">/ {quotaTotals.scriptsTarget} target</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all" 
              style={{ width: `${Math.min(100, (quotaTotals.scriptsCompleted / (quotaTotals.scriptsTarget || 1)) * 100)}%` }} 
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-500/20 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-emerald-500" />
              Social Media Posts
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
              {Math.round((quotaTotals.postsCompleted / (quotaTotals.postsTarget || 1)) * 100)}%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{quotaTotals.postsCompleted}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">/ {quotaTotals.postsTarget} target</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all" 
              style={{ width: `${Math.min(100, (quotaTotals.postsCompleted / (quotaTotals.postsTarget || 1)) * 100)}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3 transition-colors">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by client name, brand, contact person, or email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Industry Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold shrink-0">Industry:</span>
            <select
              value={industryFilter}
              onChange={(e) => { setIndustryFilter(e.target.value); setPage(1); }}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none cursor-pointer"
            >
              {allIndustries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* Service Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold shrink-0">Service:</span>
            <select
              value={serviceFilter}
              onChange={(e) => { setServiceFilter(e.target.value); setPage(1); }}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Services</option>
              {serviceCategories.map(sc => (
                <option key={sc.id} value={sc.id}>{sc.name}</option>
              ))}
            </select>
          </div>

          {/* Social Media Channel Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold shrink-0">Channel:</span>
            <select
              value={channelFilter}
              onChange={(e) => { setChannelFilter(e.target.value); setPage(1); }}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Channels</option>
              <option value="meta">Meta Ads (Active)</option>
              <option value="instagram">Instagram (Active)</option>
              <option value="youtube">YouTube (Active)</option>
              <option value="snapchat">Snapchat (Active)</option>
              <option value="pinterest">Pinterest (Active)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold shrink-0">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Review">Review</option>
            </select>
          </div>
        </div>

        {/* Counter Info */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <span>Showing {filteredClients.length} of {clients.length} clients</span>
          <span>Page {page} of {totalPages}</span>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Client & Brand</th>
                <th className="py-3.5 px-4">Monthly Quotas & Deliverables</th>
                <th className="py-3.5 px-4">Assigned Leads</th>
                <th className="py-3.5 px-4">Raw Media Drive</th>
                <th className="py-3.5 px-4">Retainer</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {paginatedClients.map(client => {
                const quotas = client.quotas || {
                  videos: { target: 16, completed: 0 },
                  graphics: { target: 12, completed: 0 },
                  scripts: { target: 20, completed: 0 },
                  posts: { target: 20, completed: 0 }
                };

                return (
                  <tr key={client.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                    {/* Client Info */}
                    <td className="py-3.5 px-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-sm">{client.name}</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                            {client.id}
                          </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px]">{client.contactPerson} • {client.phone}</p>
                        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{client.industry}</span>

                        {/* Social Channel Management Indicators */}
                        <div className="flex items-center gap-1 mt-1 flex-wrap">
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${client.socialChannels?.meta?.active ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                            Meta {client.socialChannels?.meta?.active ? '✓' : '—'}
                          </span>
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${client.socialChannels?.instagram?.active ? 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                            IG {client.socialChannels?.instagram?.active ? '✓' : '—'}
                          </span>
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${client.socialChannels?.youtube?.active ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                            YT {client.socialChannels?.youtube?.active ? '✓' : '—'}
                          </span>
                          {client.socialChannels?.snapchat?.active && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                              Snap ✓
                            </span>
                          )}
                          {client.socialChannels?.pinterest?.active && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300">
                              Pin ✓
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Deliverables Quota Pills */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1.5 max-w-xs">
                        <div className="flex items-center gap-2">
                          {/* Videos */}
                          <div className="flex-1 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 px-2 py-1 rounded-lg">
                            <div className="flex items-center justify-between text-[10px] font-bold">
                              <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                <Film className="w-2.5 h-2.5" /> Videos
                              </span>
                              <span className="text-slate-700 dark:text-slate-300">
                                {quotas.videos?.completed || 0}/{quotas.videos?.target || 0}
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full mt-1 overflow-hidden">
                              <div 
                                className="bg-blue-500 h-full rounded-full" 
                                style={{ width: `${Math.min(100, ((quotas.videos?.completed || 0) / (quotas.videos?.target || 1)) * 100)}%` }} 
                              />
                            </div>
                          </div>

                          {/* Graphics */}
                          <div className="flex-1 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 px-2 py-1 rounded-lg">
                            <div className="flex items-center justify-between text-[10px] font-bold">
                              <span className="text-purple-600 dark:text-purple-400 flex items-center gap-1">
                                <ImageIcon className="w-2.5 h-2.5" /> Graphics
                              </span>
                              <span className="text-slate-700 dark:text-slate-300">
                                {quotas.graphics?.completed || 0}/{quotas.graphics?.target || 0}
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full mt-1 overflow-hidden">
                              <div 
                                className="bg-purple-500 h-full rounded-full" 
                                style={{ width: `${Math.min(100, ((quotas.graphics?.completed || 0) / (quotas.graphics?.target || 1)) * 100)}%` }} 
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Scripts */}
                          <div className="flex-1 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 px-2 py-1 rounded-lg">
                            <div className="flex items-center justify-between text-[10px] font-bold">
                              <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                <FileText className="w-2.5 h-2.5" /> Scripts
                              </span>
                              <span className="text-slate-700 dark:text-slate-300">
                                {quotas.scripts?.completed || 0}/{quotas.scripts?.target || 0}
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full mt-1 overflow-hidden">
                              <div 
                                className="bg-amber-500 h-full rounded-full" 
                                style={{ width: `${Math.min(100, ((quotas.scripts?.completed || 0) / (quotas.scripts?.target || 1)) * 100)}%` }} 
                              />
                            </div>
                          </div>

                          {/* Posts */}
                          <div className="flex-1 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 px-2 py-1 rounded-lg">
                            <div className="flex items-center justify-between text-[10px] font-bold">
                              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <Share2 className="w-2.5 h-2.5" /> Posts
                              </span>
                              <span className="text-slate-700 dark:text-slate-300">
                                {quotas.posts?.completed || 0}/{quotas.posts?.target || 0}
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full mt-1 overflow-hidden">
                              <div 
                                className="bg-emerald-500 h-full rounded-full" 
                                style={{ width: `${Math.min(100, ((quotas.posts?.completed || 0) / (quotas.posts?.target || 1)) * 100)}%` }} 
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => openQuotaModal(client)}
                          className="w-full text-center text-[10px] font-bold py-1 bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-md border border-blue-200 dark:border-blue-500/20 transition flex items-center justify-center gap-1"
                        >
                          <SlidersHorizontal className="w-2.5 h-2.5" />
                          <span>Adjust Deliverables Quota</span>
                        </button>
                      </div>
                    </td>

                    {/* Assigned Team */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5 text-[11px] text-slate-700 dark:text-slate-300">
                        {client.assignees?.videoEditing && (
                          <p><span className="text-slate-400">Editor:</span> {getMemberName(client.assignees.videoEditing)}</p>
                        )}
                        {client.assignees?.shooting && (
                          <p><span className="text-slate-400">Camera:</span> {getMemberName(client.assignees.shooting)}</p>
                        )}
                        {client.assignees?.smm && (
                          <p><span className="text-slate-400">Ads/SMM:</span> {getMemberName(client.assignees.smm)}</p>
                        )}
                      </div>
                    </td>

                    {/* Raw Data Link */}
                    <td className="py-3.5 px-4">
                      {client.rawDriveUrl ? (
                        <a 
                          href={client.rawDriveUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-50 dark:bg-cyan-500/10 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 rounded-lg text-[11px] font-semibold transition"
                        >
                          <HardDrive className="w-3.5 h-3.5" />
                          <span>Cloud Drive</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[11px]">No Link</span>
                      )}
                    </td>

                    {/* Monthly Retainer */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 dark:text-white text-xs">
                        ₹{client.monthlyRetainer ? client.monthlyRetainer.toLocaleString('en-IN') : '0'}
                      </span>
                      <span className="text-slate-400 text-[10px] block">/ month</span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        client.status === 'Active' 
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30' 
                          : client.status === 'Onboarding'
                            ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30'
                            : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
                      }`}>
                        {client.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedClientId(client.id);
                            setActiveTab('channels');
                          }}
                          title="Manage Social Media Channels & Meta Ads"
                          className="px-2 py-1 text-[11px] font-bold bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 rounded-lg transition flex items-center gap-1"
                        >
                          <Share2 className="w-3 h-3" />
                          <span>Channels</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedClientId(client.id);
                            switchRole('client', client);
                          }}
                          title="Simulate Client View"
                          className="px-2 py-1 text-[11px] font-semibold bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 rounded-lg transition"
                        >
                          Portal
                        </button>

                        <button
                          onClick={() => onEditClient(client)}
                          title="Edit Client"
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete client "${client.name}" and associated tasks?`)) {
                              deleteClient(client.id);
                            }
                          }}
                          title="Delete Client"
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, filteredClients.length)} of {filteredClients.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quota Management Modal */}
      {quotaClient && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transition-colors">
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>🎯 Monthly Deliverables Quotas</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Update deliverable target and delivered counts for {quotaClient.name}.
                </p>
              </div>
              <button 
                onClick={() => setQuotaClient(null)} 
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuotas} className="p-5 space-y-4 text-xs">
              <div className="space-y-3">
                {/* Videos */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Film className="w-4 h-4 text-blue-500" />
                      Videos / Reels Quota
                    </span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">
                      {Math.round(((quotaForm?.videos?.completed || 0) / (quotaForm?.videos?.target || 1)) * 100)}% Fulfilled
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-500 dark:text-slate-400 text-[11px] block mb-1">Delivered (Done):</label>
                      <input 
                        type="number"
                        min="0"
                        value={quotaForm?.videos?.completed || 0}
                        onChange={(e) => setQuotaForm({
                          ...quotaForm,
                          videos: { ...quotaForm.videos, completed: Number(e.target.value) }
                        })}
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-slate-500 dark:text-slate-400 text-[11px] block mb-1">Monthly Target:</label>
                      <input 
                        type="number"
                        min="1"
                        value={quotaForm?.videos?.target || 0}
                        onChange={(e) => setQuotaForm({
                          ...quotaForm,
                          videos: { ...quotaForm.videos, target: Number(e.target.value) }
                        })}
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Graphics */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-purple-500" />
                      Graphics / Posters Quota
                    </span>
                    <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">
                      {Math.round(((quotaForm?.graphics?.completed || 0) / (quotaForm?.graphics?.target || 1)) * 100)}% Fulfilled
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-500 dark:text-slate-400 text-[11px] block mb-1">Delivered (Done):</label>
                      <input 
                        type="number"
                        min="0"
                        value={quotaForm?.graphics?.completed || 0}
                        onChange={(e) => setQuotaForm({
                          ...quotaForm,
                          graphics: { ...quotaForm.graphics, completed: Number(e.target.value) }
                        })}
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-slate-500 dark:text-slate-400 text-[11px] block mb-1">Monthly Target:</label>
                      <input 
                        type="number"
                        min="1"
                        value={quotaForm?.graphics?.target || 0}
                        onChange={(e) => setQuotaForm({
                          ...quotaForm,
                          graphics: { ...quotaForm.graphics, target: Number(e.target.value) }
                        })}
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Scripts */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-amber-500" />
                      Scripts & Content Concepts
                    </span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                      {Math.round(((quotaForm?.scripts?.completed || 0) / (quotaForm?.scripts?.target || 1)) * 100)}% Fulfilled
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-500 dark:text-slate-400 text-[11px] block mb-1">Delivered (Done):</label>
                      <input 
                        type="number"
                        min="0"
                        value={quotaForm?.scripts?.completed || 0}
                        onChange={(e) => setQuotaForm({
                          ...quotaForm,
                          scripts: { ...quotaForm.scripts, completed: Number(e.target.value) }
                        })}
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-slate-500 dark:text-slate-400 text-[11px] block mb-1">Monthly Target:</label>
                      <input 
                        type="number"
                        min="1"
                        value={quotaForm?.scripts?.target || 0}
                        onChange={(e) => setQuotaForm({
                          ...quotaForm,
                          scripts: { ...quotaForm.scripts, target: Number(e.target.value) }
                        })}
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Posts */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Share2 className="w-4 h-4 text-emerald-500" />
                      Social Posts & Carousels
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      {Math.round(((quotaForm?.posts?.completed || 0) / (quotaForm?.posts?.target || 1)) * 100)}% Fulfilled
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-500 dark:text-slate-400 text-[11px] block mb-1">Delivered (Done):</label>
                      <input 
                        type="number"
                        min="0"
                        value={quotaForm?.posts?.completed || 0}
                        onChange={(e) => setQuotaForm({
                          ...quotaForm,
                          posts: { ...quotaForm.posts, completed: Number(e.target.value) }
                        })}
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-slate-500 dark:text-slate-400 text-[11px] block mb-1">Monthly Target:</label>
                      <input 
                        type="number"
                        min="1"
                        value={quotaForm?.posts?.target || 0}
                        onChange={(e) => setQuotaForm({
                          ...quotaForm,
                          posts: { ...quotaForm.posts, target: Number(e.target.value) }
                        })}
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setQuotaClient(null)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Quotas</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
