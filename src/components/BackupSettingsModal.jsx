import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  X, 
  Download, 
  Upload, 
  Database, 
  FolderGit2, 
  Cloud, 
  ShieldAlert, 
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const BackupSettingsModal = ({ isOpen, onClose }) => {
  const { 
    exportFullBackup, 
    importBackup, 
    resetToFactoryState, 
    firebaseConfig, 
    setFirebaseConfig,
    clearAllDummyData,
    loadDemoData,
    isFreshWorkspace
  } = useAgency();

  const [activeTab, setActiveTab] = useState('backup');
  const [fbForm, setFbForm] = useState(firebaseConfig);
  const [importStatus, setImportStatus] = useState('');
  const [copiedCmd, setCopiedCmd] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          const result = importBackup(parsed);
          if (result.success) {
            setImportStatus('Agency database successfully restored from JSON backup!');
            setTimeout(() => setImportStatus(''), 4000);
          } else {
            setImportStatus('Restore failed: ' + result.error);
          }
        } catch {
          setImportStatus('Invalid JSON file format.');
        }
      };
    }
  };

  const saveFirebaseSettings = (e) => {
    e.preventDefault();
    setFirebaseConfig(fbForm);
    alert('Firebase Cloud Firestore configuration saved!');
  };

  const gitCommands = `# 1. Push latest updates to GitHub:
cd "C:\\Users\\Label Sync\\.gemini\\antigravity\\scratch\\agency-crm"
git add .
git commit -m "feat: complete fresh system purge, RBAC login IDs, staff HRMS suite, and mobile responsive layout"
git push -u origin main

# 2. Deploy to Vercel in 1 click:
# Visit https://vercel.com/new, import your repository and click Deploy!`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded-xl">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">System Data, Cloud & Deployment</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Purge dummy records, export JSON snapshots, sync with Firebase, or deploy to Vercel.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 px-5 pt-3 gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('backup')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'backup' ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Data Operations & Purge</span>
          </button>
          <button
            onClick={() => setActiveTab('firebase')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'firebase' ? 'border-amber-600 text-amber-600 dark:border-amber-500 dark:text-amber-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Firebase Sync</span>
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'github' ? 'border-purple-600 text-purple-600 dark:border-purple-500 dark:text-purple-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Server Deployment</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* 1. Backup & Data Operations */}
          {activeTab === 'backup' && (
            <div className="space-y-4">
              {/* Fresh System Purge Card */}
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Fresh Workspace Mode (Clean Slate)</span>
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-200 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200">
                    {isFreshWorkspace ? 'Clean Slate Active' : 'Demo Data Loaded'}
                  </span>
                </div>
                <p className="text-[11px] text-amber-800 dark:text-amber-300/80">
                  Wipe all dummy clients, tasks, and test logs to start with a pristine agency slate.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => { clearAllDummyData(); onClose(); }}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-sm"
                  >
                    Purge All Dummy Data (Start Fresh)
                  </button>
                  <button
                    onClick={() => { loadDemoData(); onClose(); }}
                    className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-xs font-bold transition"
                  >
                    Restore Full Demo Dataset
                  </button>
                </div>
              </div>

              {/* JSON Backup Export */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Download Complete JSON Backup</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Exports clients, deliverables, attendance timesheets, payroll, shoots, and credentials in a single portable JSON file.
                </p>
                <button
                  onClick={exportFullBackup}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Database JSON</span>
                </button>
              </div>

              {/* Restore */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Restore from Backup File</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select a previously downloaded JSON backup file to instantly restore all agency state.
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="text-xs text-slate-600 dark:text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-200 dark:file:bg-slate-700 file:text-slate-800 dark:file:text-white hover:file:bg-slate-300 dark:hover:file:bg-slate-600 cursor-pointer"
                />
                {importStatus && (
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{importStatus}</p>
                )}
              </div>
            </div>
          )}

          {/* 2. Firebase Sync */}
          {activeTab === 'firebase' && (
            <form onSubmit={saveFirebaseSettings} className="space-y-4 text-xs">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 rounded-xl text-amber-800 dark:text-amber-200">
                <p className="font-bold">Google Firebase Cloud Firestore:</p>
                <p className="text-[11px] mt-0.5">Enter your Firebase Web App configuration keys from console.firebase.google.com.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">API Key</label>
                  <input
                    type="text"
                    value={fbForm.apiKey}
                    onChange={(e) => setFbForm({ ...fbForm, apiKey: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Project ID</label>
                  <input
                    type="text"
                    value={fbForm.projectId}
                    onChange={(e) => setFbForm({ ...fbForm, projectId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="enableFb"
                  checked={fbForm.isEnabled}
                  onChange={(e) => setFbForm({ ...fbForm, isEnabled: e.target.checked })}
                  className="rounded text-blue-600 cursor-pointer"
                />
                <label htmlFor="enableFb" className="text-xs font-bold text-slate-800 dark:text-white cursor-pointer">
                  Enable Cloud Firestore Sync
                </label>
              </div>

              <button
                type="submit"
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition"
              >
                Save Firebase Config
              </button>
            </form>
          )}

          {/* 3. Server Deployment */}
          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/20 space-y-2">
                <h3 className="text-xs font-bold text-purple-900 dark:text-purple-300 flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-purple-600" />
                  <span>1-Click Production Server Deployment</span>
                </h3>
                <p className="text-[11px] text-purple-800 dark:text-purple-300/80">
                  Deploy to Vercel, Netlify, Cloudflare Pages, or Docker with zero configuration:
                </p>
                <div className="relative">
                  <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[10px] font-mono overflow-x-auto">
                    {gitCommands}
                  </pre>
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                  >
                    {copiedCmd ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCmd ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
