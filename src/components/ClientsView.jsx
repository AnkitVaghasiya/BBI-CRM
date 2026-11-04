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
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

export const ClientsView = ({ onEditClient, onNewClient }) => {
  const { clients, deleteClient, teamMembers, serviceCategories, setSelectedClientId, switchRole } = useAgency();

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
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white">क्लाइंट डायरेक्टरी व सर्विस ट्रैकर (Client CRM)</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {clients.length} कुल क्लाइंट्स
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            200+ क्लाइंट्स का पूरा डेटाबेस • कौन-सी सर्विस ले रखी है, किसे असाइन किया गया है और रॉ डेटा ड्राइव लिंक।
          </p>
        </div>

        <button
          onClick={onNewClient}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>नया क्लाइंट जोड़ें (Add Client)</span>
        </button>
      </div>

      {/* Beginner Tips */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
        <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white block">💡 क्लाइंट मैनेजमेंट आसान गाइड (Beginner Guide):</span>
          <p className="text-slate-400 mt-0.5">
            1. किसी भी क्लाइंट के आगे <span className="text-blue-400 font-semibold">"एडिट (Edit)"</span> बटन दबाकर आप उनकी सर्विस, रिटेनर फीस, असाइन्ड एडिटर/मार्केटर बदल सकते हैं।<br />
            2. <span className="text-emerald-400 font-semibold">"क्लाइंट पोर्टल"</span> पर क्लिक करके आप देख सकते हैं कि उस क्लाइंट को अपनी स्क्रीन पर क्या-क्या दिखता है।
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
        {/* Search */}
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="200+ क्लाइंट्स में खोजें (नाम, ब्रांड, ईमेल)..."
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
              <option key={ind} value={ind}>{ind === 'All' ? 'सभी इंडस्ट्रीज (All Industries)' : ind}</option>
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
            <option value="All">सभी सर्विसेज़ (All Services)</option>
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
            <option value="All">सभी स्टेटस (All Status)</option>
            <option value="Active">Active (सक्रिय)</option>
            <option value="Onboarding">Onboarding</option>
            <option value="Paused">Paused</option>
          </select>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">क्लाइंट व ब्रांड (Client & Brand)</th>
                <th className="py-3.5 px-4">ली हुई सर्विसेज़ (Subscribed Services)</th>
                <th className="py-3.5 px-4">असाइन्ड टीम (Assigned Team)</th>
                <th className="py-3.5 px-4">रॉ डेटा ड्राइव लिंक</th>
                <th className="py-3.5 px-4">मासिक रिटेनर</th>
                <th className="py-3.5 px-4">स्टेटस</th>
                <th className="py-3.5 px-4 text-right">एक्शन (Actions)</th>
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
                        <p><span className="text-slate-500">एडिटर:</span> {getMemberName(client.assignees.videoEditing)}</p>
                      )}
                      {client.assignees?.shooting && (
                        <p><span className="text-slate-500">कैमरा:</span> {getMemberName(client.assignees.shooting)}</p>
                      )}
                      {client.assignees?.smm && (
                        <p><span className="text-slate-500">ऐड्स/SMM:</span> {getMemberName(client.assignees.smm)}</p>
                      )}
                      {client.assignees?.ai && (
                        <p><span className="text-slate-500">एआई:</span> {getMemberName(client.assignees.ai)}</p>
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
                        <span>ड्राइव खोलें</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ) : (
                      <span className="text-slate-500 text-[11px]">लिंक नहीं है</span>
                    )}
                  </td>

                  {/* Monthly Retainer */}
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white text-xs">
                      ₹{client.monthlyRetainer ? client.monthlyRetainer.toLocaleString('en-IN') : '0'}
                    </span>
                    <span className="text-slate-500 text-[10px] block">/ महीना</span>
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
                        क्लाइंट पोर्टल
                      </button>

                      <button
                        onClick={() => onEditClient(client)}
                        title="Edit Client"
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 flex items-center gap-1 transition"
                      >
                        <Edit3 className="w-3 h-3 text-blue-400" />
                        <span>एडिट</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`क्या आप सच में क्लाइंट "${client.name}" को हटाना चाहते हैं?`)) {
                            deleteClient(client.id);
                          }
                        }}
                        title="Delete Client"
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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
            दिखाए जा रहे हैं: <span className="font-bold text-white">{filteredClients.length > 0 ? (page - 1) * pageSize + 1 : 0}</span> से{' '}
            <span className="font-bold text-white">{Math.min(page * pageSize, filteredClients.length)}</span> (कुल{' '}
            <span className="font-bold text-white">{filteredClients.length}</span> क्लाइंट्स)
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-white font-medium">पेज {page} of {totalPages}</span>
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
