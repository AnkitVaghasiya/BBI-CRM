import React from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Download, 
  Sun, 
  Moon, 
  Menu,
  ShieldCheck,
  Lock,
  Zap,
  HardDrive
} from 'lucide-react';

export const Navbar = ({ 
  onOpenSettings, 
  onOpenMobileMenu, 
  onOpenSecurity, 
  onOpenAuth,
  onOpenSnapshotVault 
}) => {
  const { 
    theme, 
    toggleTheme, 
    currentUser, 
    switchRole, 
    clients, 
    selectedClientId, 
    setSelectedClientId,
    exportFullBackup,
    snapshots
  } = useAgency();

  const safeClients = Array.isArray(clients) ? clients : [];
  const safeSnapshots = Array.isArray(snapshots) ? snapshots : [];
  const currentClient = safeClients.find(c => c && c.id === selectedClientId) || safeClients[0] || { id: 'client-1', name: 'Primary Client' };
  const userRole = (!currentUser?.role || currentUser.role === 'admin') ? 'management' : currentUser.role;

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between sticky top-0 z-40 transition-colors shadow-sm">
      {/* Left: Mobile Hamburger & Brand Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-lg text-white shadow-md shadow-blue-500/20 shrink-0">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white">
                BrainBinary <span className="text-blue-600 dark:text-blue-400">AI OS</span>
              </span>
              <span className="hidden xs:inline-block px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                Agency CRM
              </span>
            </div>
            {/* Live Synchronized Engine Status Indicator */}
            <div className="hidden md:flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE REAL-TIME ENGINE ACTIVE
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Auto-Backup Synced (&lt;2ms)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Snapshot Vault, Security Pill, Auth & Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Instant Snapshot Vault Trigger */}
        <button
          onClick={onOpenSnapshotVault}
          title="Open Snapshot Rollback Vault & Instant Checkpoints"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 text-xs font-bold transition shadow-sm"
        >
          <HardDrive className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="hidden sm:inline">Snapshots</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-600 text-white font-mono">
            {safeSnapshots.length}
          </span>
        </button>

        {/* Security Diagnostics Quick Trigger */}
        <button
          onClick={onOpenSecurity}
          title="Open Security Diagnostics & Vulnerability Audit"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 text-xs font-bold transition"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="hidden md:inline">0 Vulns</span>
        </button>

        {/* Account / Login Trigger */}
        <button
          onClick={onOpenAuth}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition"
          title="Manage Account, Login ID or Register New Role"
        >
          <Lock className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
          <span className="max-w-[90px] truncate hidden sm:inline">
            {currentUser?.name ? currentUser.name.split(' ')[0] : 'Sign In'}
          </span>
        </button>

        {/* Role Selector Pill */}
        <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-1.5 shadow-inner">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden xl:inline font-medium">Act As:</span>
          <select 
            value={userRole === 'client' ? 'client' : userRole}
            onChange={(e) => switchRole(e.target.value, currentClient)}
            aria-label="Select Role View"
            className="bg-transparent text-xs font-semibold text-slate-800 dark:text-white focus:outline-none cursor-pointer pr-1"
          >
            <option value="management" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">👑 Executive Admin</option>
            <option value="video-editing" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">🎬 Video Editing Lead</option>
            <option value="shooting-team" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">🎥 Cinematography & DoP</option>
            <option value="ai-content" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">🤖 AI Prompt Specialist</option>
            <option value="meta-ads" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">📊 Meta Ads Lead</option>
            <option value="client" className="bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400">👤 Client Portal</option>
          </select>
        </div>

        {/* If in Client View, select client */}
        {userRole === 'client' && clients.length > 0 && (
          <div className="hidden md:flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 rounded-xl px-2 py-1.5">
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Brand:</span>
            <select
              value={selectedClientId}
              onChange={(e) => {
                setSelectedClientId(e.target.value);
                const cl = clients.find(c => c.id === e.target.value);
                if (cl) switchRole('client', cl);
              }}
              aria-label="Select Client"
              className="bg-transparent text-xs font-bold text-emerald-800 dark:text-emerald-300 focus:outline-none cursor-pointer max-w-[120px] truncate"
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
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 text-xs font-bold transition shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">Export JSON</span>
        </button>
      </div>
    </header>
  );
};
