import React, { useState, useMemo } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Film, 
  Search, 
  Plus, 
  ExternalLink, 
  HardDrive, 
  Clock, 
  Calendar,
  Edit2,
  Trash2,
  HelpCircle
} from 'lucide-react';

export const ProductionTracker = ({ onNewTask, onEditTask }) => {
  const { tasks, saveTask, deleteTask, clients, teamMembers, serviceCategories } = useAgency();

  const [serviceFilter, setServiceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [clientFilter, setClientFilter] = useState('All');
  const [search, setSearch] = useState('');

  const statusOptions = [
    'Raw Data Ingest',
    'In Progress',
    'Internal QC',
    'Client Approval Pending',
    'Revision Requested',
    'Approved',
    'Scheduled',
    'Posted'
  ];

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.clientName.toLowerCase().includes(search.toLowerCase());
      const matchesService = serviceFilter === 'All' || task.service === serviceFilter;
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
      const matchesClient = clientFilter === 'All' || task.clientId === clientFilter;

      return matchesSearch && matchesService && matchesStatus && matchesClient;
    });
  }, [tasks, search, serviceFilter, statusFilter, clientFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
      case 'Posted':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Client Approval Pending':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse';
      case 'Revision Requested':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'Internal QC':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Scheduled':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const handleQuickStatusChange = (taskId, newStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      saveTask({ ...task, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white">प्रोडक्शन व वीडियो एडिटिंग ट्रैकर (Production Pipeline)</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {tasks.length} एक्टिव टास्क
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            वीडियो एडिटिंग, रील्स, AI पोस्ट्स, रॉ डेटा और क्लाइंट अप्रूवल की पूरी लाइव पाइपलाइन।
          </p>
        </div>

        <button
          onClick={onNewTask}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>नया वीडियो टास्क जोड़ें (New Deliverable)</span>
        </button>
      </div>

      {/* Beginner Tips */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
        <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white block">💡 नए यूजर के लिए आसान गाइड (Pipeline Guide):</span>
          <p className="text-slate-400 mt-0.5">
            1. आप सीधे स्टेटस ड्रॉपडाउन से स्थिति बदल सकते हैं (उदा. जब एडिटर रील बना ले तो <span className="text-amber-400 font-semibold">"Client Approval Pending"</span> सेट करें)।<br />
            2. किसी भी टास्क के आगे <span className="text-blue-400 font-semibold">"एडिट (Edit)"</span> बटन दबाकर आप तारीख, टाइम स्लॉट, असाइन्ड एडिटर या लिंक कभी भी बदल सकते हैं।
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="टास्क या क्लाइंट के नाम से खोजें..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Service Filter */}
        <div>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
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
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">सभी स्टेटस (All Statuses)</option>
            {statusOptions.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        {/* Client Filter */}
        <div>
          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">सभी क्लाइंट्स (All Clients)</option>
            {clients.slice(0, 50).map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Deliverables List Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">टास्क व क्लाइंट (Deliverable & Client)</th>
                <th className="py-3.5 px-4">सर्विस</th>
                <th className="py-3.5 px-4">तारीख व टाइम स्लॉट (Date & Time)</th>
                <th className="py-3.5 px-4">रॉ डेटा लिंक</th>
                <th className="py-3.5 px-4">रिव्यू आउटपुट लिंक</th>
                <th className="py-3.5 px-4">करंट स्टेटस</th>
                <th className="py-3.5 px-4">वर्ज़न</th>
                <th className="py-3.5 px-4 text-right">एक्शन (Edit / Delete)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTasks.map(task => {
                const assignee = teamMembers.find(t => t.id === task.assignedTo);
                return (
                  <tr key={task.id} className="hover:bg-slate-800/30 transition">
                    {/* Title & Client */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-white text-sm block">{task.title}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-blue-400 font-semibold">{task.clientName}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400">असाइन: {assignee ? assignee.name : 'Unassigned'}</span>
                        </div>
                        {task.clientFeedback && (
                          <div className="mt-1.5 p-2 bg-slate-950/70 border border-amber-500/20 rounded-lg text-amber-200/90 text-[11px]">
                            <span className="font-bold text-amber-400">क्लाइंट फीडबैक:</span> "{task.clientFeedback}"
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Service */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                        {task.service?.replace('-', ' ')}
                      </span>
                    </td>

                    {/* Date Wise Multiple Options with Time */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-blue-400" />
                          <span>{task.scheduledDate || 'तारीख तय नहीं'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>स्लॉट: {task.scheduledTime || 'Flexible'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Raw Data Link */}
                    <td className="py-3.5 px-4">
                      {task.rawMediaUrl ? (
                        <a 
                          href={task.rawMediaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg font-semibold text-[11px] transition"
                        >
                          <HardDrive className="w-3 h-3" />
                          <span>रॉ फुटेज</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="text-slate-500 text-[11px]">लिंक नहीं है</span>
                      )}
                    </td>

                    {/* Review Output Link */}
                    <td className="py-3.5 px-4">
                      {task.outputUrl ? (
                        <a 
                          href={task.outputUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg font-semibold text-[11px] transition"
                        >
                          <Film className="w-3 h-3" />
                          <span>वीडियो देखें</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="text-slate-500 text-[11px]">रेंडरिंग बाकी</span>
                      )}
                    </td>

                    {/* Quick Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={task.status}
                        onChange={(e) => handleQuickStatusChange(task.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border focus:outline-none cursor-pointer ${getStatusBadge(task.status)}`}
                      >
                        {statusOptions.map(st => (
                          <option key={st} value={st} className="bg-slate-900 text-white font-normal">
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Version & Revisions */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-mono font-bold">
                          {task.version || 'v1'}
                        </span>
                        <p className="text-[10px] text-slate-500">
                          {task.revisionsCount || 0} रिविज़न्स
                        </p>
                      </div>
                    </td>

                    {/* Edit & Delete Action Buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onEditTask(task)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 flex items-center gap-1 transition"
                        >
                          <Edit2 className="w-3 h-3 text-blue-400" />
                          <span>एडिट</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`क्या आप सच में "${task.title}" को हटाना चाहते हैं?`)) {
                              deleteTask(task.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              इस फ़िल्टर से कोई टास्क नहीं मिला। नया टास्क जोड़ने के लिए "नया वीडियो टास्क जोड़ें" पर क्लिक करें।
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
