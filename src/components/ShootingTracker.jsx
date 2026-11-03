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
  ChevronRight
} from 'lucide-react';

export const ShootingTracker = ({ onNewShoot }) => {
  const { shoots, saveShoot, teamMembers, clients } = useAgency();

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
          <h1 className="text-xl sm:text-2xl font-black text-white">Video Shooting & Production Schedule</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Field Shoot Management, Location Call Sheets, Crew Allocations & Equipment
          </p>
        </div>

        <button
          onClick={onNewShoot}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-600/30 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Shoot</span>
        </button>
      </div>

      {/* Shoots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shoots.map(shoot => {
          const client = clients.find(c => c.id === shoot.clientId);
          return (
            <div 
              key={shoot.id}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-amber-500/40 transition shadow-xl"
            >
              {/* Title & Status */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block mb-1">
                    {client ? client.name : shoot.clientName}
                  </span>
                  <h3 className="text-base font-bold text-white">{shoot.title}</h3>
                </div>
                <select
                  value={shoot.status}
                  onChange={(e) => handleStatusChange(shoot.id, e.target.value)}
                  className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-800 border border-slate-700 text-amber-300 focus:outline-none cursor-pointer"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Equipment Prep">Equipment Prep</option>
                  <option value="Shooting in Progress">Shooting Now</option>
                  <option value="Footage Offloaded">Footage Offloaded</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Date & Time Slot Details */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Shoot Date</span>
                  </div>
                  <p className="font-bold text-white">{shoot.shootDate}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>Call Schedule</span>
                  </div>
                  <p className="font-bold text-white">{shoot.callTime} - {shoot.wrapTime}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{shoot.location}</span>
              </div>

              {/* Assigned Crew from 25-team */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Assigned Production Crew</p>
                <div className="flex flex-wrap gap-1.5">
                  {shoot.crew.map(crewId => {
                    const member = teamMembers.find(t => t.id === crewId);
                    return (
                      <span 
                        key={crewId}
                        className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 border border-slate-700 text-slate-200 flex items-center gap-1.5"
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
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Equipment Checklist</p>
                  <div className="flex flex-wrap gap-1">
                    {shoot.equipmentList.map((eq, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-950 text-[10px] text-slate-400 border border-slate-800">
                        ✓ {eq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Link to Script / Brief */}
              <div className="pt-2 flex items-center justify-between">
                <a 
                  href={shoot.briefUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Open Concept & Shotlist Brief</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <span className="text-[11px] text-slate-500 font-mono">{shoot.id}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
