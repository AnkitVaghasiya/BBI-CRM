import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Users, 
  Mail, 
  Phone, 
  Plus, 
  Edit2, 
  Trash2, 
  Shield, 
  Film, 
  Bot, 
  Target, 
  Camera,
  Building2,
  History,
  Tag,
  Wrench,
  CheckCircle2,
  Clock,
  Search,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { PartnerAgencyModal, AuditLogModal } from './ActionModals';

export const TeamDirectory = ({ onNewMember, onEditMember }) => {
  const { 
    teamMembers, 
    deleteTeamMember, 
    partnerAgencies, 
    deletePartnerAgency,
    auditLogs,
    tasks, 
    clients 
  } = useAgency();

  const [activeMainTab, setActiveMainTab] = useState('internal'); // 'internal', 'partners', 'audit'
  const [selectedDept, setSelectedDept] = useState('All');
  const [search, setSearch] = useState('');

  // Modals state for Partner Agency and Audit Log
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [agencyToEdit, setAgencyToEdit] = useState(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const departments = [
    'All',
    'Management',
    'Video Editing',
    'AI Content',
    'Meta Ads & SMM',
    'Shooting Team'
  ];

  const filteredMembers = (teamMembers || []).filter(m => {
    const matchesDept = selectedDept === 'All' || m.department === selectedDept;
    const matchesSearch = 
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      (m.currentDuties && m.currentDuties.toLowerCase().includes(search.toLowerCase())) ||
      (m.assignedScope && m.assignedScope.toLowerCase().includes(search.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  const filteredPartners = (partnerAgencies || []).filter(a => {
    return (
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.type.toLowerCase().includes(search.toLowerCase()) ||
      (a.currentScope && a.currentScope.toLowerCase().includes(search.toLowerCase())) ||
      (a.upcomingTasks && a.upcomingTasks.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const getDeptIcon = (dept) => {
    switch (dept) {
      case 'Management': return <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'Video Editing': return <Film className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'AI Content': return <Bot className="w-4 h-4 text-pink-600 dark:text-pink-400" />;
      case 'Meta Ads & SMM': return <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'Shooting Team': return <Camera className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      default: return <Users className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleOpenNewPartner = () => {
    setAgencyToEdit(null);
    setIsPartnerModalOpen(true);
  };

  const handleEditPartner = (agency) => {
    setAgencyToEdit(agency);
    setIsPartnerModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Workforce Directory, Partner Agencies & Role Matrix
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              {teamMembers.length} Staff • {partnerAgencies?.length || 0} External Agencies
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Edit editors, staff, partner vendors, current responsibilities ("kon kya karta he"), future scopes ("kon kya karega"), and audit change reasons.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsAuditModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 transition shrink-0"
          >
            <History className="w-4 h-4 text-blue-600" />
            <span>Audit Trail & Reasons ({auditLogs?.length || 0})</span>
          </button>

          <button
            onClick={handleOpenNewPartner}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-sm transition shrink-0"
          >
            <Building2 className="w-4 h-4" />
            <span>Contract Partner Agency</span>
          </button>

          <button
            onClick={onNewMember}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-sm transition shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff Member</span>
          </button>
        </div>
      </div>

      {/* Main Mode Toggle: Internal Team vs Partner Agencies vs Audit History */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-1.5 shadow-sm overflow-x-auto text-xs font-bold gap-1">
        <button
          onClick={() => setActiveMainTab('internal')}
          className={`flex-1 min-w-[200px] py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${
            activeMainTab === 'internal'
              ? 'bg-blue-600 text-white shadow-sm font-extrabold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Internal Agency Team ({teamMembers.length} Specialists)</span>
        </button>

        <button
          onClick={() => setActiveMainTab('partners')}
          className={`flex-1 min-w-[200px] py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${
            activeMainTab === 'partners'
              ? 'bg-purple-600 text-white shadow-sm font-extrabold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Partner Agencies & External Vendors ({partnerAgencies?.length || 0} Studios)</span>
        </button>

        <button
          onClick={() => setActiveMainTab('audit')}
          className={`flex-1 min-w-[200px] py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${
            activeMainTab === 'audit'
              ? 'bg-slate-800 text-white shadow-sm font-extrabold dark:bg-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Edit Reasons & Change Audit Trail</span>
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            activeMainTab === 'internal' 
              ? "Search editors and staff by name, duties, future scope, or tool..." 
              : activeMainTab === 'partners' 
                ? "Search partner agencies by name, domain, current duties, or contracted deliverables..."
                : "Search audit log..."
          }
          className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm transition"
        />
      </div>

      {/* 1. INTERNAL TEAM VIEW */}
      {activeMainTab === 'internal' && (
        <div className="space-y-4">
          {/* Department Filter Tabs */}
          <div className="flex flex-wrap gap-2 pb-1">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  selectedDept === dept 
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' 
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                {dept !== 'All' && getDeptIcon(dept)}
                <span>{dept}</span>
                <span className="px-1.5 py-0.2 bg-black/10 dark:bg-black/30 rounded text-[10px]">
                  {dept === 'All' ? teamMembers.length : teamMembers.filter(m => m.department === dept).length}
                </span>
              </button>
            ))}
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map(member => {
              const assignedCount = tasks.filter(t => t.assignedTo === member.id).length;

              return (
                <div 
                  key={member.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3.5 hover:border-slate-300 dark:hover:border-slate-700 transition shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Header with Avatar & Department */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl p-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                          {member.avatar || '👤'}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                            {member.name}
                          </h3>
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{member.role}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{member.id}</span>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
                        {member.department}
                      </span>
                    </div>

                    {/* CURRENT RESPONSIBILITIES ("kon kya karta he") */}
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        Current Duties ("kon kya karta he"):
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 text-xs leading-relaxed font-medium">
                        {member.currentDuties || 'Standard deliverable production & editing.'}
                      </p>
                    </div>

                    {/* UPCOMING SCOPE ("kon kya karega") */}
                    <div className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/30 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-500" />
                        Upcoming Scope ("kon kya karega"):
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 text-xs leading-relaxed font-medium">
                        {member.assignedScope || 'Meet scheduled quotas and resolve revisions.'}
                      </p>
                    </div>

                    {/* Toolstack */}
                    {member.toolstack && member.toolstack.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                          <Wrench className="w-3 h-3 text-slate-400" />
                          Primary Toolstack:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {member.toolstack.map((tool, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact Info */}
                    <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 pt-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate text-[11px]">{member.email || 'No email set'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="text-[11px]">{member.phone || 'No phone set'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Workload, Reason Badge, and Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    {/* Reason Tag */}
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 font-bold truncate max-w-[200px]" title={member.lastChangeReason}>
                        🏷️ {member.lastChangeReason || 'Initial Onboarding'}
                      </span>
                      <span className="text-slate-400">{member.lastUpdated || 'Today'}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <span>Workload:</span>
                        <span className="font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px]">
                          {assignedCount} Tasks
                        </span>
                        <span className="text-[10px] text-blue-600 font-semibold">({member.dailyTarget || 2}/day)</span>
                      </div>

                      {/* Edit with Reason & Delete Buttons */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onEditMember(member)}
                          className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-lg border border-blue-200 dark:border-blue-500/30 flex items-center gap-1 transition"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit Scope & Reason</span>
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete team member ${member.name}?`)) {
                              deleteTeamMember(member.id);
                            }
                          }}
                          title="Delete Member"
                          className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. PARTNER AGENCIES & EXTERNAL VENDORS VIEW ("other agencies") */}
      {activeMainTab === 'partners' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-purple-900 dark:text-purple-200 text-sm block">
                External Agencies & Vendor Network Ecosystem
              </span>
              <p className="text-purple-700 dark:text-purple-300 text-xs mt-0.5">
                Manage 3D/VFX studios, multilingual dubbing houses, and white-label media buying agencies with contracted deliverables and SLAs.
              </p>
            </div>
            <button
              onClick={handleOpenNewPartner}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-sm transition flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Contract New Partner Agency</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPartners.map(agency => (
              <div 
                key={agency.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-500/30 space-y-3.5 shadow-sm hover:shadow transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-purple-600 shrink-0" />
                        <h3 className="font-black text-slate-900 dark:text-white text-sm">{agency.name}</h3>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 mt-1 inline-block">
                        {agency.type}
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                      {agency.status}
                    </span>
                  </div>

                  {/* CURRENT CONTRACTED DUTIES ("kon kya karta he") */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      Contracted Scope ("kon kya karta he"):
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 text-xs leading-relaxed font-medium">
                      {agency.currentScope || 'Contracted deliverables production.'}
                    </p>
                  </div>

                  {/* UPCOMING CONTRACTED TASKS ("kon kya karega") */}
                  <div className="p-2.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/30 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-purple-500" />
                      Upcoming Tasks ("kon kya karega"):
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 text-xs leading-relaxed font-medium">
                      {agency.upcomingTasks || 'Deliver upcoming scheduled batch.'}
                    </p>
                  </div>

                  {/* Deliverables & SLA */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50">
                      <span className="text-[10px] text-slate-400 block font-semibold">Monthly Deliverables</span>
                      <strong className="text-slate-900 dark:text-white text-xs">{agency.contractedDeliverables || 'N/A'}</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50">
                      <span className="text-[10px] text-slate-400 block font-semibold">SLA Turnaround</span>
                      <strong className="text-blue-600 dark:text-blue-400 text-xs">{agency.slaHours} Hours</strong>
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <div className="flex items-center justify-between">
                      <span>Lead: <strong>{agency.contactPerson}</strong></span>
                      <span className="font-bold text-slate-900 dark:text-white">₹{agency.monthlyRetainer?.toLocaleString('en-IN')}/mo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span className="truncate text-[11px]">{agency.email}</span>
                    </div>
                  </div>
                </div>

                {/* Footer with reason tag & actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 font-bold truncate max-w-[200px]">
                      🏷️ {agency.lastChangeReason || 'Vendor Agreement'}
                    </span>
                    <span className="text-slate-400">{agency.lastUpdated || 'Today'}</span>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => handleEditPartner(agency)}
                      className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 dark:bg-purple-500/10 dark:hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-lg border border-purple-200 dark:border-purple-500/30 flex items-center gap-1 transition"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit Scope with Reason</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Terminate partner agreement with "${agency.name}"?`)) {
                          deletePartnerAgency(agency.id);
                        }
                      }}
                      title="Terminate Vendor"
                      className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 rounded-lg transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. AUDIT TRAIL & EDIT REASONS LOG */}
      {activeMainTab === 'audit' && (
        <div className="space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base flex items-center gap-2">
                <History className="w-4 h-4 text-blue-600" />
                <span>Central System Audit Trail: Historical Changes & Reasons</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Every edit made to employees, editors, clients, or partner agencies is permanently tracked with reason justification.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              {auditLogs?.length || 0} Total Change Records
            </span>
          </div>

          <div className="space-y-3">
            {(auditLogs || []).map(log => (
              <div 
                key={log.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                      {log.entityType}
                    </span>
                    <strong className="text-slate-900 dark:text-white text-xs">{log.entityName}</strong>
                    <span className="text-slate-400 text-[11px]">• {log.action}</span>
                  </div>
                  <span className="text-slate-400 text-[10px] font-mono">{log.timestamp}</span>
                </div>

                <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" /> Reason: {log.changeReason}
                  </span>
                  <span className="text-slate-500 text-[11px]">Changed by: <strong className="text-slate-800 dark:text-slate-200">{log.changedBy}</strong></span>
                </div>

                {log.changeNotes && (
                  <p className="text-slate-700 dark:text-slate-300 italic text-[11px] bg-white dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200 dark:border-slate-700/50">
                    "{log.changeNotes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Partner Agency Modal */}
      <PartnerAgencyModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        agencyToEdit={agencyToEdit}
      />

      {/* Audit Log Explorer Modal */}
      <AuditLogModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
    </div>
  );
};
