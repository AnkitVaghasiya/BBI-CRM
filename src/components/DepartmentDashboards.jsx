import React, { useState, useMemo } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Film, 
  Image, 
  FileText, 
  Camera, 
  Target, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Search, 
  Filter, 
  ExternalLink, 
  TrendingUp, 
  BarChart3, 
  Layers, 
  Users, 
  UserCheck, 
  RotateCcw,
  Sparkles,
  Calendar
} from 'lucide-react';

export const DepartmentDashboards = () => {
  const { 
    tasks, 
    saveTask, 
    dailyLogs, 
    addDailyLog, 
    deleteDailyLog, 
    clients, 
    teamMembers, 
    revisionReasons, 
    deliverableTypes, 
    currentUser 
  } = useAgency();

  // Selected Department
  const [selectedDept, setSelectedDept] = useState(() => {
    if (currentUser.role === 'video-editing') return 'Video Editing';
    if (currentUser.role === 'ai-content') return 'Scriptwriting & AI Content';
    if (currentUser.role === 'shooting-team') return 'Shooting & Production';
    if (currentUser.role === 'meta-ads') return 'Meta Ads & Growth';
    return 'Video Editing';
  });

  // Department Sub-Tabs: 'worklog' | 'pipeline' | 'revisions' | 'capacity'
  const [activeSubTab, setActiveSubTab] = useState('worklog');

  // Quick Log Modal State
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [newLog, setNewLog] = useState({
    memberId: '',
    clientId: 'client-1',
    taskTitle: '',
    assetType: 'Video Reel',
    activity: 'Assembly & Rough Cut',
    version: 'v1',
    durationMinutes: 60,
    status: 'Ready for Review',
    notes: ''
  });

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCreatorFilter, setSelectedCreatorFilter] = useState('All');

  // Department Staff members
  const deptStaff = useMemo(() => {
    if (selectedDept === 'Video Editing') return teamMembers.filter(m => m.department === 'Video Editing');
    if (selectedDept === 'Graphics & Design') return teamMembers.filter(m => m.department === 'AI Content' || m.department === 'Video Editing');
    if (selectedDept === 'Scriptwriting & AI Content') return teamMembers.filter(m => m.department === 'AI Content');
    if (selectedDept === 'Shooting & Production') return teamMembers.filter(m => m.department === 'Shooting Team');
    if (selectedDept === 'Meta Ads & Growth') return teamMembers.filter(m => m.department === 'Meta Ads & SMM');
    return teamMembers;
  }, [teamMembers, selectedDept]);

  // Tasks mapped to this department
  const deptTasks = useMemo(() => {
    return tasks.filter(t => {
      if (selectedDept === 'Video Editing') return t.service === 'video-editing';
      if (selectedDept === 'Graphics & Design') return t.service === 'photos' || t.deliverableType === 'Social Graphic' || t.deliverableType === 'Carousel Post';
      if (selectedDept === 'Scriptwriting & AI Content') return t.service === 'ai-posts' || t.service === 'scripts' || t.deliverableType === 'Script / Concept';
      if (selectedDept === 'Shooting & Production') return t.service === 'video-shooting';
      if (selectedDept === 'Meta Ads & Growth') return t.service === 'meta-ads' || t.deliverableType === 'Meta Ad Creative';
      return true;
    });
  }, [tasks, selectedDept]);

  // Worklogs mapped to this department
  const deptLogs = useMemo(() => {
    return dailyLogs.filter(l => {
      const staffMember = teamMembers.find(m => m.id === l.memberId);
      if (selectedDept === 'Video Editing') return l.department === 'Video Editing' || staffMember?.department === 'Video Editing';
      if (selectedDept === 'Graphics & Design') return l.assetType === 'Social Graphic' || l.assetType === 'Carousel Post';
      if (selectedDept === 'Scriptwriting & AI Content') return l.department === 'AI Content' || l.assetType === 'Script / Concept';
      if (selectedDept === 'Shooting & Production') return l.department === 'Shooting Team';
      if (selectedDept === 'Meta Ads & Growth') return l.department === 'Meta Ads & SMM';
      return true;
    });
  }, [dailyLogs, teamMembers, selectedDept]);

  // Department KPI calculations
  const totalQueue = deptTasks.filter(t => t.status !== 'Approved' && t.status !== 'Posted').length;
  const totalApproved = deptTasks.filter(t => t.status === 'Approved' || t.status === 'Posted').length;
  const totalRevisions = deptTasks.reduce((sum, t) => sum + (t.revisionsCount || 0), 0);
  const revisionRate = deptTasks.length > 0 ? Math.round((totalRevisions / deptTasks.length) * 100) : 0;
  const firstPassApprovalRate = 100 - Math.min(100, revisionRate);

  // Reason breakdown for revisions
  const revisionReasonCounts = useMemo(() => {
    const counts = {};
    revisionReasons.forEach(r => { counts[r] = 0; });
    deptTasks.forEach(t => {
      if (t.revisionsHistory) {
        t.revisionsHistory.forEach(h => {
          if (counts[h.reasonCategory] !== undefined) {
            counts[h.reasonCategory] += 1;
          } else {
            counts[h.reasonCategory] = (counts[h.reasonCategory] || 0) + 1;
          }
        });
      }
    });
    return counts;
  }, [deptTasks, revisionReasons]);

  const handleOpenLogModal = () => {
    const defaultStaff = deptStaff[0];
    setNewLog({
      memberId: defaultStaff ? defaultStaff.id : 'tm-6',
      clientId: clients[0]?.id || 'client-1',
      taskTitle: '',
      assetType: selectedDept === 'Video Editing' ? 'Video Reel' : selectedDept === 'Graphics & Design' ? 'Social Graphic' : 'Script / Concept',
      activity: 'Full Creative Edit & Export',
      version: 'v1',
      durationMinutes: 75,
      status: 'Ready for Review',
      notes: ''
    });
    setIsLogModalOpen(true);
  };

  const handleSaveLog = (e) => {
    e.preventDefault();
    const staff = teamMembers.find(m => m.id === newLog.memberId);
    const client = clients.find(c => c.id === newLog.clientId);
    if (!newLog.taskTitle.trim()) {
      alert('Please enter a deliverable title');
      return;
    }

    addDailyLog({
      ...newLog,
      memberName: staff ? staff.name : 'Creator',
      department: staff ? staff.department : selectedDept,
      clientName: client ? client.name : 'Client'
    });
    setIsLogModalOpen(false);
  };

  const departmentTabs = [
    { id: 'Video Editing', label: 'Video Editing', icon: Film, count: deptTasks.length },
    { id: 'Graphics & Design', label: 'Graphics & Design', icon: Image, count: 18 },
    { id: 'Scriptwriting & AI Content', label: 'Scripts & AI Content', icon: FileText, count: 24 },
    { id: 'Shooting & Production', label: 'Shooting & Field Crew', icon: Camera, count: 12 },
    { id: 'Meta Ads & Growth', label: 'Meta Ads & Media Buying', icon: Target, count: 16 }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Department Operations & Creator Tracking
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              {selectedDept}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Department-specific dashboards, creator daily output tracking, revision reason analytics, and capacity matrix.
          </p>
        </div>

        <button
          onClick={handleOpenLogModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-sm shadow-blue-500/20 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Log Creator Daily Output</span>
        </button>
      </div>

      {/* Primary Department Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {departmentTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = selectedDept === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedDept(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Department KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Active Queue</p>
          <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1">{totalQueue}</p>
          <span className="text-[10px] text-slate-400">In production</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Approved Month</p>
          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{totalApproved}</p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Deliverables</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Total Revisions</p>
          <p className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">{totalRevisions}</p>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">{revisionRate}% rate</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">First-Pass Pass Rate</p>
          <p className="text-xl font-black text-purple-600 dark:text-purple-400 mt-1">{firstPassApprovalRate}%</p>
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">v1 Acceptance</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Team Strength</p>
          <p className="text-xl font-black text-slate-900 dark:text-white mt-1">{deptStaff.length}</p>
          <span className="text-[10px] text-slate-400">Specialists</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Avg Turnaround</p>
          <p className="text-xl font-black text-cyan-600 dark:text-cyan-400 mt-1">24.5h</p>
          <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">Speed SLA</span>
        </div>
      </div>

      {/* Department Sub-Tabs Toolbar */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('worklog')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition ${
            activeSubTab === 'worklog'
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Daily Creator Output Worklogs ({deptLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('pipeline')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition ${
            activeSubTab === 'pipeline'
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Department Deliverables Pipeline ({deptTasks.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('revisions')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition ${
            activeSubTab === 'revisions'
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Revision Analytics & Reasons</span>
        </button>

        <button
          onClick={() => setActiveSubTab('capacity')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition ${
            activeSubTab === 'capacity'
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Staff Capacity & Monthly Output Matrix</span>
        </button>
      </div>

      {/* Sub-Tab 1: Daily Creator Output Worklog Table */}
      {activeSubTab === 'worklog' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950/40">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-900 dark:text-white">Daily Output Log Matrix</span>
                <span className="text-[11px] text-slate-500">Track exact edits, time spent, and client outputs per day</span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedCreatorFilter}
                  onChange={(e) => setSelectedCreatorFilter(e.target.value)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-white focus:outline-none"
                >
                  <option value="All">All Department Creators</option>
                  {deptStaff.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Creator / Editor</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Deliverable Title</th>
                    <th className="py-3 px-4">Asset Type</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Version</th>
                    <th className="py-3 px-4">Output Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {deptLogs
                    .filter(l => selectedCreatorFilter === 'All' || l.memberId === selectedCreatorFilter)
                    .map(log => (
                      <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                          {log.timestamp || log.date}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 dark:text-white block">{log.memberName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{log.memberId}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-blue-600 dark:text-blue-400 text-xs">{log.clientName}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 dark:text-white block">{log.taskTitle}</span>
                          {log.notes && <p className="text-[11px] text-slate-500 italic mt-0.5">{log.notes}</p>}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold text-[10px]">
                            {log.assetType}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                          {log.durationMinutes} mins
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                            {log.version}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                            {log.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              if (window.confirm('Delete this daily log entry?')) {
                                deleteDailyLog(log.id);
                              }
                            }}
                            className="text-slate-400 hover:text-red-500 text-[11px] font-semibold transition"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  {deptLogs.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-slate-400 text-xs">
                        No worklogs recorded yet for this department. Click "Log Creator Daily Output" above to add today's deliverables!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Department Deliverables Pipeline */}
      {activeSubTab === 'pipeline' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Deliverable Title & Client</th>
                  <th className="py-3 px-4">Asset Type</th>
                  <th className="py-3 px-4">Assigned Creator</th>
                  <th className="py-3 px-4">Scheduled Release</th>
                  <th className="py-3 px-4">Version & Iterations</th>
                  <th className="py-3 px-4">Review Output</th>
                  <th className="py-3 px-4">Current Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {deptTasks.map(task => {
                  const creator = teamMembers.find(m => m.id === task.assignedTo);
                  return (
                    <tr key={task.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 dark:text-white text-sm block">{task.title}</span>
                        <span className="text-blue-600 dark:text-blue-400 text-xs font-semibold">{task.clientName}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold text-[10px]">
                          {task.deliverableType || 'Video Reel'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                        {creator ? creator.name : 'Unassigned'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        {task.scheduledDate || 'Flexible'} {task.scheduledTime ? `(${task.scheduledTime})` : ''}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700">
                            {task.version || 'v1'}
                          </span>
                          {(task.revisionsCount || 0) > 0 && (
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                              {task.revisionsCount} revisions
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {task.outputUrl ? (
                          <a
                            href={task.outputUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                          >
                            <span>Inspect ↗</span>
                          </a>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Drafting</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                          task.status === 'Approved'
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30'
                            : task.status === 'Client Approval Pending'
                              ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-500/30'
                              : task.status === 'Revision Requested'
                                ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-300 dark:border-rose-500/30'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Revision Analytics & Reason Breakdown */}
      {activeSubTab === 'revisions' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reason Distribution Bars */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4 lg:col-span-1">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-500" />
                <span>Revision Reason Distribution</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Identifies why clients requested changes in {selectedDept} deliverables
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {revisionReasons.map(reason => {
                const count = revisionReasonCounts[reason] || 0;
                const pct = totalRevisions > 0 ? Math.round((count / totalRevisions) * 100) : 0;
                return (
                  <div key={reason} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">{reason}</span>
                      <span className="text-slate-900 dark:text-white font-mono font-bold">{count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(5, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deliverables with Revisions List */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4 lg:col-span-2">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>High-Revision Deliverables & Feedback History</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Inspect specific client revision notes, authors, and timestamps
              </p>
            </div>

            <div className="space-y-3">
              {deptTasks.filter(t => (t.revisionsCount || 0) > 0).map(task => (
                <div key={task.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-xs">{task.title}</span>
                      <span className="text-[11px] text-blue-600 dark:text-blue-400 block font-semibold">{task.clientName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20">
                        {task.revisionsCount} Iterations
                      </span>
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white">
                        {task.version}
                      </span>
                    </div>
                  </div>

                  {/* History Timeline */}
                  <div className="space-y-2 border-t border-slate-200 dark:border-slate-700/60 pt-2 text-xs">
                    {task.revisionsHistory?.map((h, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                            <span>Iteration #{h.iteration}:</span>
                            <span className="px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                              {h.reasonCategory}
                            </span>
                          </span>
                          <span className="text-slate-400 text-[10px]">{h.date}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 italic text-[11px]">"{h.feedback}"</p>
                        <p className="text-[10px] text-slate-400">Feedback by: {h.author}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {deptTasks.filter(t => (t.revisionsCount || 0) > 0).length === 0 && (
                <div className="p-8 text-center text-slate-400 text-xs">
                  Zero revisions logged for {selectedDept}. First-pass approval rate is 100%!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Staff Workload & Capacity Matrix */}
      {activeSubTab === 'capacity' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deptStaff.map(member => {
            const memberTasks = tasks.filter(t => t.assignedTo === member.id);
            const todayLogs = dailyLogs.filter(l => l.memberId === member.id && l.date === new Date().toISOString().split('T')[0]);
            const completedCount = memberTasks.filter(t => t.status === 'Approved' || t.status === 'Posted').length;
            const inProgressCount = memberTasks.filter(t => t.status !== 'Approved' && t.status !== 'Posted').length;

            return (
              <div 
                key={member.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl p-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                      {member.avatar || '👤'}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{member.name}</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{member.role}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{member.id}</span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    inProgressCount > 6 
                      ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20' 
                      : inProgressCount > 3
                        ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                  }`}>
                    {inProgressCount > 6 ? 'Heavy Load' : inProgressCount > 3 ? 'Optimal Load' : 'Available'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">Today Edited</span>
                    <span className="text-base font-black text-slate-900 dark:text-white">{todayLogs.length}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">Active Queue</span>
                    <span className="text-base font-black text-blue-600 dark:text-blue-400">{inProgressCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">Month Total</span>
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400">{member.monthlyDelivered || completedCount}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <p className="text-[11px] font-semibold text-slate-500">Currently Editing For:</p>
                  <div className="flex flex-wrap gap-1">
                    {Array.from(new Set(memberTasks.map(t => t.clientName))).slice(0, 3).map((cName, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 font-semibold truncate max-w-[150px]">
                        {cName}
                      </span>
                    ))}
                    {memberTasks.length === 0 && <span className="text-slate-400 text-[10px]">No active assignments</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Creator Log Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transition-colors">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Log Creator Daily Output</span>
              </h2>
              <button onClick={() => setIsLogModalOpen(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveLog} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Creator / Specialist *</label>
                  <select
                    value={newLog.memberId}
                    onChange={(e) => setNewLog({ ...newLog, memberId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-semibold focus:outline-none"
                  >
                    {deptStaff.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Client *</label>
                  <select
                    value={newLog.clientId}
                    onChange={(e) => setNewLog({ ...newLog, clientId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-semibold focus:outline-none"
                  >
                    {clients.slice(0, 30).map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Deliverable Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fastrack Festive Edition Left Cut Reel #02"
                  value={newLog.taskTitle}
                  onChange={(e) => setNewLog({ ...newLog, taskTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Asset Type</label>
                  <select
                    value={newLog.assetType}
                    onChange={(e) => setNewLog({ ...newLog, assetType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  >
                    {deliverableTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Version</label>
                  <select
                    value={newLog.version}
                    onChange={(e) => setNewLog({ ...newLog, version: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="v1">v1 (First Cut)</option>
                    <option value="v2">v2 (Revision)</option>
                    <option value="v3">v3 (Revision)</option>
                    <option value="Final Master">Final Master</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Minutes Spent</label>
                  <input
                    type="number"
                    min="10"
                    step="5"
                    value={newLog.durationMinutes}
                    onChange={(e) => setNewLog({ ...newLog, durationMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Activity & Action Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Assembled 4K footage, synced SFX risers, color graded under 3500K warm LUT..."
                  value={newLog.notes}
                  onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-sm transition"
                >
                  Record Worklog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
