import React from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Download, 
  Sun, 
  Moon, 
  Cloud,
  ChevronDown
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
    firebaseConfig 
  } = useAgency();

  const currentClient = clients.find(c => c.id === selectedClientId) || clients[0];

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 transition-colors shadow-sm">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-lg text-white shadow-md shadow-blue-500/20 shrink-0">
          ⚡
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              BBI <span className="text-blue-600 dark:text-blue-400">CRM</span>
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              Agency OS
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">सरल व आसान एजेंसी मैनेजमेंट</p>
        </div>
      </div>

      {/* Role Switcher, Theme Switcher & Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Selector Pill */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 shadow-inner">
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden md:inline font-medium">रोल:</span>
          <select 
            value={currentUser.role === 'client' ? 'client' : currentUser.role}
            onChange={(e) => switchRole(e.target.value, currentClient)}
            aria-label="Select Role View"
            className="bg-transparent text-xs font-semibold text-slate-800 dark:text-white focus:outline-none cursor-pointer pr-1"
          >
            <option value="management" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">👑 एडमिन / डायरेक्टर (Admin)</option>
            <option value="video-editing" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">🎬 वीडियो एडिटर (Video Editor)</option>
            <option value="shooting-team" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">🎥 शूटिंग टीम (Camera Crew)</option>
            <option value="ai-content" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">🤖 AI व प्रॉम्प्ट्स (AI Team)</option>
            <option value="meta-ads" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">📊 मेटा ऐड्स (Ads Lead)</option>
            <option value="client" className="bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400">👤 क्लाइंट पोर्टल (Client View)</option>
          </select>
        </div>

        {/* If in Client View, select client */}
        {currentUser.role === 'client' && (
          <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 rounded-xl px-2.5 py-1.5">
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">क्लाइंट:</span>
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
          title={theme === 'light' ? 'डार्क मोड चालू करें' : 'लाइट मोड चालू करें'}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 text-slate-700" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
        </button>

        {/* 1-Click Backup Button */}
        <button
          onClick={exportFullBackup}
          title="Download 1-Click Complete Agency Backup (.json)"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-600/20 dark:hover:bg-blue-600/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 rounded-xl text-xs font-semibold transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">बैकअप (Backup)</span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-1 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-sm font-bold text-slate-700 dark:text-white">
            {currentUser.role === 'client' ? '🏢' : '👑'}
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">{currentUser.role.replace('-', ' ')}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
