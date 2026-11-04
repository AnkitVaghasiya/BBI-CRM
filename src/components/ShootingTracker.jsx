import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Camera, 
  Plus, 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
  CheckCircle2, 
  FileText, 
  ExternalLink,
  Edit2,
  Trash2
} from 'lucide-react';

export const ShootingTracker = ({ onNewShoot, onEditShoot }) => {
  const { shoots, saveShoot, deleteShoot, teamMembers, clients } = useAgency();

  const handleStatusChange = (shootId, newStatus) => {
    const shoot = shoots.find(s => s.id === shootId);
    if (shoot) {
      saveShoot({ ...shoot, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">शूटिंग शेड्यूल (Video Shoots)</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
              {shoots.length} शेड्यूल्ड शूट्स
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            शूट की तारीख, लोकेशन, कॉल टाइम और कैमरा क्रू का सरल प्रबंधन।
          </p>
        </div>

        <button
          onClick={onNewShoot}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-sm shadow-amber-500/20 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>नया शूट जोड़ें (Schedule Shoot)</span>
        </button>
      </div>

      {/* Shoots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shoots.map(shoot => {
          const client = clients.find(c => c.id === shoot.clientId);
          return (
            <div 
              key={shoot.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-amber-300 dark:hover:border-amber-500/40 transition shadow-sm"
            >
              {/* Title & Status */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                    {client ? client.name : shoot.clientName}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{shoot.title}</h3>
                </div>
                <select
                  value={shoot.status}
                  onChange={(e) => handleStatusChange(shoot.id, e.target.value)}
                  className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-amber-700 dark:text-amber-300 focus:outline-none cursor-pointer"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Equipment Prep">Equipment Prep</option>
                  <option value="Shooting in Progress">Shooting Now</option>
                  <option value="Footage Offloaded">Footage Offloaded</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Date & Time Slot Details */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>शूट तारीख</span>
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white">{shoot.shootDate}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>समय (Schedule)</span>
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white">{shoot.callTime} - {shoot.wrapTime}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{shoot.location || 'लोकेशन तय नहीं'}</span>
              </div>

              {/* Assigned Crew */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">असाइन्ड क्रू</p>
                <div className="flex flex-wrap gap-1.5">
                  {shoot.crew && shoot.crew.map(crewId => {
                    const member = teamMembers.find(t => t.id === crewId);
                    return (
                      <span 
                        key={crewId}
                        className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
                      >
                        <span>{member ? member.avatar : '👤'}</span>
                        <span className="font-medium">{member ? member.name : crewId}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Equipment Checklist */}
              {shoot.equipmentList && shoot.equipmentList.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">इक्विपमेंट</p>
                  <div className="flex flex-wrap gap-1">
                    {shoot.equipmentList.map((eq, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-[10px] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                        ✓ {eq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditShoot(shoot)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>एडिट</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`क्या आप "${shoot.title}" को हटाना चाहते हैं?`)) {
                        deleteShoot(shoot.id);
                      }
                    }}
                    title="हटाएं"
                    className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <a 
                  href={shoot.briefUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 hover:underline font-bold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>शॉटलिस्ट लिंक ↗</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
