import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { Users, Mail, Phone, CheckCircle, Briefcase, Film, Camera, Bot, Target, Shield } from 'lucide-react';

export const TeamDirectory = () => {
  const { teamMembers, tasks, clients } = useAgency();

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
      case 'Management': return <Shield className="w-4 h-4 text-purple-400" />;
      case 'Video Editing': return <Film className="w-4 h-4 text-blue-400" />;
      case 'AI Content': return <Bot className="w-4 h-4 text-pink-400" />;
      case 'Meta Ads & SMM': return <Target className="w-4 h-4 text-emerald-400" />;
      case 'Shooting Team': return <Camera className="w-4 h-4 text-amber-400" />;
      default: return <Users className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white">Agency Team Directory (25 Specialists)</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Cross-Functional Execution Structure across Management, Editing, AI, SMM & Field Shooting Teams
        </p>
      </div>

      {/* Department Tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        {departments.map(dept => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              selectedDept === dept 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {dept !== 'All' && getDeptIcon(dept)}
            <span>{dept}</span>
            <span className="px-1.5 py-0.2 bg-black/30 rounded text-[10px]">
              {dept === 'All' ? teamMembers.length : teamMembers.filter(m => m.department === dept).length}
            </span>
          </button>
        ))}
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map(member => {
          // Calculate active assigned tasks
          const assignedCount = tasks.filter(t => t.assignedTo === member.id).length;

          return (
            <div 
              key={member.id}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-slate-700 transition shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl p-2 bg-slate-800 rounded-2xl border border-slate-700">
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{member.name}</h3>
                    <p className="text-xs text-blue-400 font-semibold">{member.role}</p>
                    <span className="text-[10px] text-slate-500 font-mono">{member.id}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  {member.department}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{member.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400">Current Workload:</span>
                <span className="font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                  {assignedCount} Tasks Active
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
