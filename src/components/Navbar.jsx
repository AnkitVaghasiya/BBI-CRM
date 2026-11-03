import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  Download, 
  Database, 
  Video, 
  Sparkles, 
  Target, 
  Camera, 
  UserCheck, 
  Search, 
  Bell,
  RefreshCw
} from 'lucide-react';

export const Navbar = ({ onOpenSettings }) => {
  const { 
    currentUser, 
    switchRole, 
    clients, 
    selectedClientId, 
    setSelectedClientId,
    exportFullBackup,
    firebaseConfig 
  } = useAgency();

  const [searchQuery, setSearchQuery] = useState('');

  const currentClient = clients.find(c => c.id === selectedClientId) || clients[0];

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Brand & Workspace */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 font-black text-xl text-white">
          ⚡
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-white">OmniAgency <span className="text-blue-400">OS</span></span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              ERP & CRM
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block">200+ Clients & 25-Member Team Hub</p>
        </div>
      </div>

      {/* Role Switcher & Live Simulation Badge */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Switcher Pill */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 rounded-xl px-2.5 py-1.5 shadow-inner">
          <span className="text-xs text-slate-400 hidden md:inline font-medium">Viewing as:</span>
          <select 
            value={currentUser.role === 'client' ? 'client' : currentUser.role}
            onChange={(e) => switchRole(e.target.value, currentClient)}
            aria-label="Select Role View"
            className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer pr-1"
          >
            <option value="management" className="bg-slate-900 text-white">👑 Management (Super Admin)</option>
            <option value="video-editing" className="bg-slate-900 text-white">🎬 Video Editing Team</option>
            <option value="shooting-team" className="bg-slate-900 text-white">🎥 Shooting & DoP Team</option>
            <option value="ai-content" className="bg-slate-900 text-white">🤖 AI Content & Prompts</option>
            <option value="meta-ads" className="bg-slate-900 text-white">📊 Meta Ads & SMM</option>
            <option value="client" className="bg-slate-900 text-emerald-400">👤 Client Portal View</option>
          </select>
        </div>

        {/* If in Client View, let user choose which client they are simulating */}
        {currentUser.role === 'client' && (
          <div className="flex items-center gap-1 bg-emerald-950/60 border border-emerald-500/30 rounded-xl px-2.5 py-1.5">
            <span className="text-xs text-emerald-400 font-medium">Client:</span>
            <select
              value={selectedClientId}
              onChange={(e) => {
                setSelectedClientId(e.target.value);
                const cl = clients.find(c => c.id === e.target.value);
                if (cl) switchRole('client', cl);
              }}
              aria-label="Select Client for Simulation"
              className="bg-transparent text-xs font-bold text-emerald-300 focus:outline-none cursor-pointer"
            >
              {clients.slice(0, 30).map(c => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                  {c.name} ({c.industry})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Cloud Sync Status */}
        <div 
          onClick={onOpenSettings}
          title={firebaseConfig.isEnabled ? "Firebase Cloud Sync Active" : "Local Storage Active (Click to connect Firebase / GitHub)"}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs cursor-pointer transition ${
            firebaseConfig.isEnabled 
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/40' 
              : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
          }`}
        >
          <span className={`w-2 h-2 rounded-full animate-pulse ${firebaseConfig.isEnabled ? 'bg-emerald-400' : 'bg-blue-400'}`}></span>
          <span className="hidden lg:inline">{firebaseConfig.isEnabled ? 'Firebase Synced' : 'Local + Backup'}</span>
        </div>

        {/* 1-Click JSON Backup Button */}
        <button
          onClick={exportFullBackup}
          title="Download 1-Click Complete Agency Backup (.json)"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-semibold transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Backup</span>
        </button>

        {/* User Badge */}
        <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm">
            {currentUser.role === 'client' ? '🏢' : '👑'}
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-white leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-slate-400 capitalize">{currentUser.role.replace('-', ' ')}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
