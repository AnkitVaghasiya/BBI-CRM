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
  History,
  Tag,
  X,
  AlertTriangle,
  Send,
  Layers,
  Sparkles
} from 'lucide-react';

export const ProductionTracker = ({ onNewTask, onEditTask }) => {
  const { tasks, saveTask, deleteTask, requestRevision, clients, teamMembers, serviceCategories, REVISION_REASONS } = useAgency();

  const [serviceFilter, setServiceFilter] = useState('All');
  const [deliverableFilter, setDeliverableFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [clientFilter, setClientFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Selected task for Revision History & Quick Revision modal
  const [activeTaskForRevisions, setActiveTaskForRevisions] = useState(null);
  const [newRevisionReason, setNewRevisionReason] = useState(REVISION_REASONS?.[0] || 'Pacing & Fast Cuts');
  const [newRevisionFeedback, setNewRevisionFeedback] = useState('');

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

  const deliverableTypesList = [
    'All',
    'Video Reel',
    'Long-Form Video',
    'Social Graphic',
    'Carousel Post',
    'Script / Concept',
    'Meta Ad Creative'
  ];

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.clientName.toLowerCase().includes(search.toLowerCase());
      const matchesService = serviceFilter === 'All' || task.service === serviceFilter;
      const matchesDeliverable = deliverableFilter === 'All' || task.deliverableType === deliverableFilter;
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
      const matchesClient = clientFilter === 'All' || task.clientId === clientFilter;

      return matchesSearch && matchesService && matchesDeliverable && matchesStatus && matchesClient;
    });
  }, [tasks, search, serviceFilter, deliverableFilter, statusFilter, clientFilter]);

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

  const handleLogInternalRevision = (e) => {
    e.preventDefault();
    if (!activeTaskForRevisions || !newRevisionFeedback.trim()) {
      alert('Please enter revision feedback notes.');
      return;
    }
    requestRevision(activeTaskForRevisions.id, newRevisionReason, newRevisionFeedback.trim(), 'Internal QC Lead');
    setNewRevisionFeedback('');
    // refresh active task
    const updated = tasks.find(t => t.id === activeTaskForRevisions.id);
    setActiveTaskForRevisions(updated || null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Master Production & Deliverables Pipeline
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              {tasks.length} Active Items
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            End-to-end workflow: Ingest, editing, reason-coded revisions, QC reviews, client sign-off, scheduling & publish sync.
          </p>
        </div>

        <button
          onClick={onNewTask}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-sm shadow-blue-500/20 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Deliverable Task</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3 transition-colors">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search deliverables by title, reel topic, or client name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Deliverable Type Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold shrink-0">Type:</span>
            <select
              value={deliverableFilter}
              onChange={(e) => setDeliverableFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none cursor-pointer"
            >
              {deliverableTypesList.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Service Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold shrink-0">Service:</span>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Services</option>
              {serviceCategories.map(sc => (
                <option key={sc.id} value={sc.id}>{sc.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold shrink-0">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              {statusOptions.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Client Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold shrink-0">Client:</span>
            <select
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none cursor-pointer max-w-[150px]"
            >
              <option value="All">All Clients</option>
              {clients.slice(0, 50).map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Deliverables List Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Task & Client</th>
                <th className="py-3.5 px-4">Deliverable Type</th>
                <th className="py-3.5 px-4">Schedule (Date & Time)</th>
                <th className="py-3.5 px-4">Raw Media</th>
                <th className="py-3.5 px-4">Review Link</th>
                <th className="py-3.5 px-4">Pipeline Status</th>
                <th className="py-3.5 px-4">Revisions</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredTasks.map(task => {
                const assignee = teamMembers.find(t => t.id === task.assignedTo);
                const revCount = task.revisionsCount || 0;

                return (
                  <tr key={task.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                    {/* Title & Client */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm block">{task.title}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs">{task.clientName}</span>
                          <span className="text-[10px] text-slate-400">• Assigned to: {assignee ? assignee.name : 'Unassigned'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Deliverable Type */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 font-semibold text-[11px]">
                        {task.deliverableType || 'Video Reel'}
                      </span>
                    </td>

                    {/* Schedule Date & Time */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5 text-[11px]">
                        <p className="font-semibold text-slate-800 dark:text-white flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{task.scheduledDate || 'Not set'}</span>
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{task.scheduledTime || 'Flexible'}</span>
                        </p>
                      </div>
                    </td>

                    {/* Raw Media Link */}
                    <td className="py-3.5 px-4">
                      {task.rawMediaUrl ? (
                        <a 
                          href={task.rawMediaUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-50 dark:bg-cyan-500/10 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 rounded-lg text-[11px] font-semibold transition"
                        >
                          <HardDrive className="w-3 h-3" />
                          <span>Raw Footage</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[11px]">No link</span>
                      )}
                    </td>

                    {/* Output Video Link */}
                    <td className="py-3.5 px-4">
                      {task.outputUrl ? (
                        <a 
                          href={task.outputUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 rounded-lg text-[11px] font-semibold transition"
                        >
                          <Film className="w-3 h-3" />
                          <span>Review ↗</span>
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Pending Edit</span>
                      )}
                    </td>

                    {/* Pipeline Status Select */}
                    <td className="py-3.5 px-4">
                      <select
                        value={task.status}
                        onChange={(e) => handleQuickStatusChange(task.id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${getStatusBadge(task.status)}`}
                      >
                        {statusOptions.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>

                    {/* Revisions & Version */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => setActiveTaskForRevisions(task)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg font-bold text-[11px] border transition ${
                          revCount > 0
                            ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30 hover:bg-amber-100'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                        title="View Revision History & Reason Tags"
                      >
                        <History className="w-3 h-3" />
                        <span>{task.version || 'v1'}</span>
                        <span className="text-[10px] font-normal">({revCount} rev{revCount === 1 ? '' : 's'})</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onEditTask(task)}
                          title="Edit Task"
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete deliverable "${task.title}"?`)) {
                              deleteTask(task.id);
                            }
                          }}
                          title="Delete Task"
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
      </div>

      {/* Revision History & Quick Revision Modal */}
      {activeTaskForRevisions && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transition-colors">
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <History className="w-4 h-4 text-blue-500" />
                  <span>Revision History & QC Feedback</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {activeTaskForRevisions.title} • {activeTaskForRevisions.clientName}
                </p>
              </div>
              <button 
                onClick={() => setActiveTaskForRevisions(null)} 
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {/* Deliverable Metadata */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Current Version</span>
                  <span className="font-extrabold text-slate-900 dark:text-white font-mono">{activeTaskForRevisions.version || 'v1'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Revisions</span>
                  <span className="font-extrabold text-amber-600 dark:text-amber-400">{activeTaskForRevisions.revisionsCount || 0} Iteration(s)</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Deliverable Type</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{activeTaskForRevisions.deliverableType || 'Video Reel'}</span>
                </div>
              </div>

              {/* Revision History Log */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-blue-500" />
                  <span>Iteration Log & Reason Tags</span>
                </h4>

                {(!activeTaskForRevisions.revisionsHistory || activeTaskForRevisions.revisionsHistory.length === 0) ? (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 text-center text-slate-400">
                    No revisions recorded yet. This deliverable is currently on initial cut.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {activeTaskForRevisions.revisionsHistory.map((rev, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white">Iteration #{rev.iteration}</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                              {rev.reasonCategory}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 italic">"{rev.feedback}"</p>
                        <span className="text-[10px] text-slate-400 block">Logged by: {rev.author}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form to Request New Revision (Internal QC / Client) */}
              <form onSubmit={handleLogInternalRevision} className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30 space-y-3">
                <h4 className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Log New Revision / QC Correction</span>
                </h4>

                <div>
                  <label className="text-slate-700 dark:text-slate-300 text-[11px] block font-semibold mb-1">
                    Primary Reason Category:
                  </label>
                  <select
                    value={newRevisionReason}
                    onChange={(e) => setNewRevisionReason(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  >
                    {(REVISION_REASONS || []).map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 dark:text-slate-300 text-[11px] block font-semibold mb-1">
                    Feedback Details & Timestamp Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={newRevisionFeedback}
                    onChange={(e) => setNewRevisionFeedback(e.target.value)}
                    placeholder="e.g. Cut clip at 0:14, fix spelling error in subheadline, increase volume on voiceover..."
                    className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition flex items-center gap-1 text-xs"
                  >
                    <Send className="w-3 h-3" />
                    <span>Apply Revision & Increment Version</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
