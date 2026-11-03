import React, { useState, useMemo } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Search, 
  Filter, 
  Plus, 
  ExternalLink, 
  HardDrive, 
  Scissors, 
  Camera, 
  Target, 
  Bot, 
  Image, 
  Calendar, 
  Check, 
  UserCheck, 
  Trash2, 
  Edit3,
  ChevronLeft,
  ChevronRight,
  FolderOpen
} from 'lucide-react';

export const ClientsView = ({ onEditClient, onNewClient }) => {
  const { clients, teamMembers, serviceCategories, setSelectedClientId, setActiveTab, switchRole } = useAgency();

  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Filter clients
  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = 
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.brand.toLowerCase().includes(search.toLowerCase()) ||
        client.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase());

      const matchesIndustry = industryFilter === 'All' || client.industry === industryFilter;
      const matchesService = serviceFilter === 'All' || (client.services && client.services.includes(serviceFilter));
      const matchesStatus = statusFilter === 'All' || client.status === statusFilter;

      return matchesSearch && matchesIndustry && matchesService && matchesStatus;
    });
  }, [clients, search, industryFilter, serviceFilter, statusFilter]);

  const totalPages = Math.ceil(filteredClients.length / pageSize) || 1;
  const paginatedClients = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredClients.slice(start, start + pageSize);
  }, [filteredClients, page, pageSize]);

  // Distinct industries
  const allIndustries = useMemo(() => {
    const set = new Set(clients.map(c => c.industry));
    return ['All', ...Array.from(set)];
  }, [clients]);

  // Helper get team member name
  const getMemberName = (id) => {
    const m = teamMembers.find(t => t.id === id);
    return m ? m.name : 'Unassigned';
  };

  const getServiceBadgeColor = (serviceId) => {
    switch (serviceId) {
      case 'video-editing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'video-shooting': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'meta-ads': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'ai-posts': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'photos': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'social-media-posting': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'raw-data': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">Client Directory & Services Hub</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Total <span className="text-blue-400 font-bold">{clients.length} Clients</span> in Database • Tracking Subscribed Services & Assignees
          </p>
        </div>

        <button
          onClick={onNewClient}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
        {/* Search */}
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search 200+ clients by name, brand, email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Industry Filter */}
        <div>
          <select
            value={industryFilter}
            onChange={(e) => { setIndustryFilter(e.target.value); setPage(1); }}
            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
          >
            {allIndustries.map(ind => (
              <option key={ind} value={ind}>{ind === 'All' ? 'All Industries' : ind}</option>
            ))}
          </select>
        </div>

        {/* Service Subscribed Filter */}
        <div>
          <select
            value={serviceFilter}
            onChange={(e) => { setServiceFilter(e.target.value); setPage(1); }}
            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Subscribed Services</option>
            {serviceCategories.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Onboarding">Onboarding</option>
            <option value="Paused">Paused</option>
          </select>
        </div>
      </div>

      {/* Clients Table / Cards */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Client & Brand</th>
                <th className="py-3.5 px-4">Enrolled Services</th>
                <th className="py-3.5 px-4">Assigned Team</th>
                <th className="py-3.5 px-4">Raw Data Link</th>
                <th className="py-3.5 px-4">Monthly Retainer</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedClients.map(client => (
                <tr key={client.id} className="hover:bg-slate-800/30 transition">
                  {/* Client Info */}
                  <td className="py-3.5 px-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{client.name}</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-mono">
                          {client.id}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px]">{client.contactPerson} • {client.phone}</p>
                      <span className="text-[10px] text-blue-400 font-semibold">{client.industry}</span>
                    </div>
                  </td>

                  {/* Services Badges */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {client.services && client.services.map(sId => {
                        const sObj = serviceCategories.find(sc => sc.id === sId);
                        return (
                          <span 
                            key={sId}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getServiceBadgeColor(sId)}`}
                          >
                            {sObj ? sObj.name : sId}
                          </span>
                        );
                      })}
                    </div>
                  </td>

                  {/* Assigned Team */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5 text-[11px] text-slate-300">
                      {client.assignees?.videoEditing && (
                        <p><span className="text-slate-500">Edit:</span> {getMemberName(client.assignees.videoEditing)}</p>
                      )}
                      {client.assignees?.shooting && (
                        <p><span className="text-slate-500">Shoot:</span> {getMemberName(client.assignees.shooting)}</p>
                      )}
                      {client.assignees?.smm && (
                        <p><span className="text-slate-500">Ads/SMM:</span> {getMemberName(client.assignees.smm)}</p>
                      )}
                      {client.assignees?.ai && (
                        <p><span className="text-slate-500">AI:</span> {getMemberName(client.assignees.ai)}</p>
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
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-[11px] font-semibold transition"
                      >
                        <HardDrive className="w-3.5 h-3.5" />
                        <span>Open Drive</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ) : (
                      <span className="text-slate-500 text-[11px]">No link</span>
                    )}
                  </td>

                  {/* Monthly Retainer */}
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white text-xs">
                      ₹{client.monthlyRetainer ? client.monthlyRetainer.toLocaleString('en-IN') : '0'}
                    </span>
                    <span className="text-slate-500 text-[10px] block">/ month</span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      client.status === 'Active' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : client.status === 'Onboarding'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
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
                          switchRole('client', client);
                        }}
                        title="Simulate Client View"
                        className="px-2 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-[11px] font-bold rounded-lg border border-emerald-500/30 transition"
                      >
                        Client Portal
                      </button>
                      <button
                        onClick={() => onEditClient(client)}
                        title="Edit Client"
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing <span className="font-bold text-white">{filteredClients.length > 0 ? (page - 1) * pageSize + 1 : 0}</span> to{' '}
            <span className="font-bold text-white">{Math.min(page * pageSize, filteredClients.length)}</span> of{' '}
            <span className="font-bold text-white">{filteredClients.length}</span> clients
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-white font-medium">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
