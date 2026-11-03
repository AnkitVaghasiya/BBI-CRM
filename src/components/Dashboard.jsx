import React from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Users, 
  Film, 
  Camera, 
  Target, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Plus
} from 'lucide-react';

export const Dashboard = ({ onNewClient, onNewTask, onNewShoot }) => {
  const { clients, tasks, shoots, ads, setActiveTab, teamMembers } = useAgency();

  // Metrics calculation
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'Active').length;
  const totalRevenue = clients.reduce((acc, c) => acc + (c.monthlyRetainer || 0), 0);
  const pendingApprovals = tasks.filter(t => t.status === 'Client Approval Pending');
  const revisionRequests = tasks.filter(t => t.status === 'Revision Requested');
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress' || t.status === 'Internal QC');

  // Format currency in Indian Lakhs / Rupees
  const formatINR = (val) => {
    return '₹' + (val / 100000).toFixed(2) + ' Lakhs/mo';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-slate-900 border border-blue-500/20 p-5 rounded-2xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Agency Operations Command Center</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Managing <span className="text-blue-400 font-bold">{totalClients} Brands</span> across 25 Specialists & 5 Departments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onNewClient}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Client</span>
          </button>
          <button
            onClick={onNewTask}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition"
          >
            <Film className="w-4 h-4 text-blue-400" />
            <span>New Video / Deliverable</span>
          </button>
          <button
            onClick={onNewShoot}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition"
          >
            <Camera className="w-4 h-4 text-amber-400" />
            <span>Schedule Shoot</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Clients */}
        <div 
          onClick={() => setActiveTab('clients')}
          className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Clients</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{totalClients}</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              {activeClients} Active
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">200+ Scalable CRM Capacity</p>
        </div>

        {/* Retainer MRR */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Retainer MRR</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400">{formatINR(totalRevenue)}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Across Retainer Contracts</p>
        </div>

        {/* Pending Client Approvals */}
        <div 
          onClick={() => setActiveTab('approvals')}
          className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Approvals</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-400">{pendingApprovals.length}</span>
            <span className="text-xs text-amber-300 font-semibold">Awaiting Sign-off</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{revisionRequests.length} revisions currently requested</p>
        </div>

        {/* Active Production Queue */}
        <div 
          onClick={() => setActiveTab('production')}
          className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active In-Pipeline</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition">
              <Film className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-purple-300">{tasks.length}</span>
            <span className="text-xs text-purple-400 font-semibold">{shoots.length} Shoots Scheduled</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{ads.length} Live Meta Ad campaigns</p>
        </div>
      </div>

      {/* Grid: Production Pulse & Shoots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deliverables Needing Immediate Action */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Urgent Approvals & Revisions</h2>
            </div>
            <button 
              onClick={() => setActiveTab('approvals')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {[...pendingApprovals, ...revisionRequests].slice(0, 4).map(task => {
              const isRevision = task.status === 'Revision Requested';
              return (
                <div key={task.id} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{task.title}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isRevision 
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {task.status} ({task.version})
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Client: <span className="text-slate-200 font-medium">{task.clientName}</span> • Target: {task.scheduledDate} at {task.scheduledTime}
                    </p>
                    {task.clientFeedback && (
                      <p className="text-xs text-slate-300 bg-slate-900/70 p-2 rounded-lg border border-slate-800 italic mt-1">
                        "{task.clientFeedback}"
                      </p>
                    )}
                  </div>
                  <a 
                    href={task.outputUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="shrink-0 px-2.5 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-bold rounded-lg border border-blue-500/30 transition"
                  >
                    Open Link
                  </a>
                </div>
              );
            })}

            {[...pendingApprovals, ...revisionRequests].length === 0 && (
              <p className="text-xs text-slate-500 text-center py-6">All clear! No pending revisions or approval bottlenecks.</p>
            )}
          </div>
        </div>

        {/* Video Shoots Dispatch */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Upcoming Shoots & Call Sheets</h2>
            </div>
            <button 
              onClick={() => setActiveTab('shoots')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              Calendar <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {shoots.slice(0, 3).map(shoot => (
              <div key={shoot.id} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white">{shoot.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    {shoot.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>Client: <span className="text-slate-200 font-medium">{shoot.clientName}</span></p>
                  <p>📅 <span className="text-blue-300 font-semibold">{shoot.shootDate}</span> • Call: {shoot.callTime} - Wrap: {shoot.wrapTime}</p>
                  <p className="truncate">📍 {shoot.location}</p>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-700/50">
                  <span className="text-[11px] text-slate-400">Crew: {shoot.crew.length} Assigned</span>
                  <a 
                    href={shoot.briefUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-blue-400 hover:underline"
                  >
                    View Shot Brief ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 25-Team Department Status Bar */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">25-Member Team Department Allocation</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { dept: 'Management', count: 5, icon: '👑', lead: 'Neha Gupta', color: 'blue' },
            { dept: 'Video Editing', count: 5, icon: '🎬', lead: 'Rahul Sharma', color: 'indigo' },
            { dept: 'AI Content', count: 5, icon: '🤖', lead: 'Sameer Khan', color: 'pink' },
            { dept: 'Meta Ads & SMM', count: 5, icon: '📊', lead: 'Aryan Malhotra', color: 'emerald' },
            { dept: 'Shooting & DoP', count: 5, icon: '🎥', lead: 'Vikram Rathore', color: 'amber' },
          ].map(d => (
            <div key={d.dept} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <div className="flex items-center justify-between">
                <span className="text-lg">{d.icon}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {d.count} Members
                </span>
              </div>
              <h3 className="text-xs font-bold text-white mt-2">{d.dept}</h3>
              <p className="text-[11px] text-slate-400 truncate">Lead: {d.lead}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
