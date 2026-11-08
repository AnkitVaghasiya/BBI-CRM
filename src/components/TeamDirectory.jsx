import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { Users, Mail, Phone, Plus, Edit2, Trash2, Shield, Film, Bot, Target, Camera } from 'lucide-react';

export const TeamDirectory = ({ onNewMember, onEditMember }) => {
  const { teamMembers, deleteTeamMember, tasks } = useAgency();

  const [selectedDept, setSelectedDept] = useState('All');

  const departments = [
    'All',
    'Management',
    'Video Editing',
    'AI Content',
    'Meta Ads & SMM',
    'Shooting Team'
  ];

  const filteredMembers = selectedDept === 'All' 
    ? teamMembers 
    : teamMembers.filter(m => m.department === selectedDept);

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

  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Team Directory & Workforce Capacity
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              {teamMembers.length} Staff Members
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            25-member cross-functional roster across Management, Video Editing, AI, Meta Ads, and Production.
          </p>
        </div>

        <button
          onClick={onNewMember}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-sm shadow-blue-500/20 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Department Tabs */}
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
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition shadow-sm"
            >
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

              <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{member.email || 'No email set'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{member.phone || 'No phone set'}</span>
                </div>
              </div>

              {/* Workload and Edit Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <span>Workload:</span>
                  <span className="font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px]">
                    {assignedCount} Tasks Active
                  </span>
                </div>

                {/* Edit & Delete Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEditMember(member)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1 transition"
                  >
                    <Edit2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    <span>Edit</span>
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
          );
        })}
      </div>
    </div>
  );
};
