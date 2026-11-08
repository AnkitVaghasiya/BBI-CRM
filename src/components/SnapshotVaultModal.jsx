import React, { useState } from 'react';
import { 
  Database, 
  RotateCcw, 
  Download, 
  Trash2, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Sparkles,
  Zap,
  HardDrive
} from 'lucide-react';
import { useAgency } from '../context/AgencyContext';

export const SnapshotVaultModal = ({ isOpen, onClose }) => {
  const { 
    snapshots, 
    createInstantSnapshot, 
    restoreSnapshot, 
    deleteSnapshot, 
    clearAllSnapshots,
    exportFullBackup,
    lastBackupTime
  } = useAgency();

  const [customLabel, setCustomLabel] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleCreateSnapshot = () => {
    createInstantSnapshot(customLabel || 'Manual User Checkpoint');
    setCustomLabel('');
    setSuccessMsg('Instant system snapshot saved to local vault!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleRestore = (snap) => {
    if (window.confirm(`Are you sure you want to rollback to snapshot: "${snap.label}" (${snap.timeFormatted})?\n\nAll data will revert to this exact point in time.`)) {
      restoreSnapshot(snap.id);
      setSuccessMsg(`System reverted successfully to checkpoint: ${snap.label}`);
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-blue-600/10 via-emerald-600/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-bold">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                Live Snapshot Vault & Rollback Hub
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400">
                  Real-time Active
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Continuous auto-snapshots with instant 1-click restore & JSON export everywhere
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-2.5">
          <input
            type="text"
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
            placeholder="Name your manual snapshot (e.g. Before client meeting)..."
            className="w-full sm:flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCreateSnapshot}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Take Snapshot Now</span>
            </button>
            <button
              onClick={exportFullBackup}
              title="Download Full JSON File"
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-1 shadow-md shadow-emerald-500/20"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">JSON</span>
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Saved Snapshot History ({snapshots.length} Available)
            </h3>
            {snapshots.length > 0 && (
              <button
                onClick={clearAllSnapshots}
                className="text-[11px] text-rose-600 hover:underline font-bold flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear Vault</span>
              </button>
            )}
          </div>

          {snapshots.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 space-y-2">
              <HardDrive className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400">No snapshots created yet</p>
              <p className="text-[11px] text-slate-400">Click 'Take Snapshot Now' above to save an instant restore checkpoint.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {snapshots.map((snap) => (
                <div
                  key={snap.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3 hover:border-blue-400 dark:hover:border-blue-500/40 transition"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {snap.label}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {snap.timeFormatted}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex flex-wrap gap-2">
                        <span>👥 {snap.counts?.clients || 0} Clients</span>
                        <span>🎬 {snap.counts?.tasks || 0} Tasks</span>
                        <span>💼 {snap.counts?.staff || 0} Staff</span>
                        <span>🕒 {snap.counts?.attendance || 0} Attendance</span>
                        <span>💵 {snap.counts?.payroll || 0} Payroll</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleRestore(snap)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1"
                      title="Rollback data to this snapshot"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore</span>
                    </button>
                    <button
                      onClick={() => deleteSnapshot(snap.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-rose-600 transition"
                      title="Delete this snapshot"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-[11px] text-slate-500">
          <span>Continuous background sync active • Zero data loss guarantee</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-white font-bold transition"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
};
