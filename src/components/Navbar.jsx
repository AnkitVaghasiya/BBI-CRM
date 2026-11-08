import React from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Download, 
  Sun, 
  Moon, 
  Cloud,
  ChevronDown,
  Sparkles,
  Zap
} from 'lucide-react';

export const Navbar = ({ onOpenSettings }) => {
  const { 
    theme, 
    toggleTheme, 
    currentUser, 
    switchRole, 
    clients, 
    selectedClientId, 
    setSelectedClientId,
    exportFullBackup,
    firebaseConfig,
    integrations
  } = useAgency();

  const currentClient = clients.find(c => c.id === selectedClientId) || clients[0];

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 transition-colors shadow-sm">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-lg text-white shadow-md shadow-blue-500/20 shrink-0">
          <Zap className="w-5 h-5 fill-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              BrainBinary <span className="text-blue-600 dark:text-blue-400">AI OS</span>
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              Agency CRM
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
            Scale 200+ Clients • 25 Staff • Meta & AI Gateways
          </p>
        </div>
      </div>

      {/* Role Switcher, Theme Switcher & Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Selector Pill */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 shadow-inner">
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden md:inline font-medium">Act As:</span>
          <select 
            value={currentUser.role === 'client' ? 'client' : currentUser.role}
            onChange={(e) => switchRole(e.target.value, currentClient)}
            aria-label="Select Role View"
            className="bg-transparent text-xs font-semibold text-slate-800 dark:text-white focus:outline-none cursor-pointer pr-1"
          >
            <option value="management" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">👑 Executive Director / Admin</option>
            <option value="video-editing" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">🎬 Video Editing Lead</option>
            <option value="shooting-team" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">🎥 Cinematography & DoP</option>
            <option value="ai-content" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">🤖 AI Prompt & GenAI Specialist</option>
            <option value="meta-ads" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">📊 Meta Ads & Media Buyer Lead</option>
            <option value="client" className="bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400">👤 Client Portal Simulation</option>
          </select>
        </div>

        {/* If in Client View, select client */}
        {currentUser.role === 'client' && (
          <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 rounded-xl px-2.5 py-1.5">
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Client:</span>
            <select
              value={selectedClientId}
              onChange={(e) => {
                setSelectedClientId(e.target.value);
                const cl = clients.find(c => c.id === e.target.value);
                if (cl) switchRole('client', cl);
              }}
              aria-label="Select Client"
              className="bg-transparent text-xs font-bold text-emerald-800 dark:text-emerald-300 focus:outline-none cursor-pointer"
            >
              {clients.slice(0, 30).map(c => (
                <option key={c.id} value={c.id} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Light / Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 text-slate-700" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
        </button>

        {/* 1-Click JSON Backup Quick Button */}
        <button
          onClick={exportFullBackup}
          title="Download Complete Agency Database Backup (JSON)"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 text-xs font-bold transition shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Backup</span>
        </button>
      </div>
    </header>
  );
};
