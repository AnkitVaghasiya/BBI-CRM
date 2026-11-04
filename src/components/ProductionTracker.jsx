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
  Trash2
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
        return 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/40';
      case 'Client Approval Pending':
        return 'bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/40';
      case 'Revision Requested':
        return 'bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/40';
      case 'Internal QC':
        return 'bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/40';
      case 'In Progress':
        return 'bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/40';
      case 'Scheduled':
        return 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/40';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-700';
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
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">प्रोडक्शन व टास्क ट्रैकर (Work Pipeline)</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              {tasks.length} एक्टिव टास्क
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            वीडियो एडिटिंग, रील्स, AI पोस्ट्स और अप्रूवल की सरल पाइपलाइन।
          </p>
        </div>

        <button
          onClick={onNewTask}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-sm shadow-blue-500/20 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>नया टास्क जोड़ें (Add Task)</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-colors">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="टास्क या क्लाइंट खोजें..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Service Filter */}
        <div>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">सभी सर्विसेज़</option>
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
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">सभी स्टेटस</option>
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
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">सभी क्लाइंट्स</option>
            {clients.slice(0, 50).map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Deliverables List Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">टास्क व क्लाइंट</th>
                <th className="py-3.5 px-4">सर्विस</th>
                <th className="py-3.5 px-4">तारीख व समय</th>
                <th className="py-3.5 px-4">रॉ डेटा</th>
                <th className="py-3.5 px-4">रिव्यू लिंक</th>
                <th className="py-3.5 px-4">करंट स्टेटस</th>
                <th className="py-3.5 px-4">वर्ज़न</th>
                <th className="py-3.5 px-4 text-right">एक्शन</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredTasks.map(task => {
                const assignee = teamMembers.find(t => t.id === task.assignedTo);
                return (
                  <tr key={task.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                    {/* Title & Client */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm block">{task.title}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-blue-600 dark:text-blue-400 font-semibold">{task.clientName}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500 dark:text-slate-400">असाइन: {assignee ? assignee.name : 'Unassigned'}</span>
                        </div>
                        {task.clientFeedback && (
                          <div className="mt-1.5 p-2 bg-slate-50 dark:bg-slate-950/70 border border-amber-200 dark:border-amber-500/20 rounded-lg text-amber-800 dark:text-amber-200 text-[11px]">
                            <span className="font-bold text-amber-700 dark:text-amber-400">फीडबैक:</span> "{task.clientFeedback}"
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Service */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 capitalize">
                        {task.service?.replace('-', ' ')}
                      </span>
                    </td>

                    {/* Date & Time */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>{task.scheduledDate || 'तय नहीं'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
                          <Clock className="w-3 h-3 text-slate-400" />
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
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-50 dark:bg-cyan-500/10 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 rounded-lg font-semibold text-[11px] transition"
                        >
                          <HardDrive className="w-3 h-3" />
                          <span>फुटेज लिंक</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[11px]">लिंक नहीं है</span>
                      )}
                    </td>

                    {/* Review Output Link */}
                    <td className="py-3.5 px-4">
                      {task.outputUrl ? (
                        <a 
                          href={task.outputUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 rounded-lg font-semibold text-[11px] transition"
                        >
                          <Film className="w-3 h-3" />
                          <span>वीडियो देखें</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[11px]">रेंडरिंग बाकी</span>
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
                          <option key={st} value={st} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-normal">
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Version & Revisions */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[10px] font-mono font-bold">
                          {task.version || 'v1'}
                        </span>
                        <p className="text-[10px] text-slate-400">
                          {task.revisionsCount || 0} रिविज़न्स
                        </p>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onEditTask(task)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1 transition"
                        >
                          <Edit2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          <span>एडिट</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`क्या आप सच में "${task.title}" को हटाना चाहते हैं?`)) {
                              deleteTask(task.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition"
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
            <div className="text-center py-12 text-slate-400 text-xs">
              कोई टास्क नहीं मिला। "नया टास्क जोड़ें" पर क्लिक करके नया काम असाइन करें।
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
