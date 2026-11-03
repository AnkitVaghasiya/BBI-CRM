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
  CheckCircle2, 
  Terminal,
  Copy,
  ExternalLink
} from 'lucide-react';

export const BackupSettingsModal = ({ isOpen, onClose }) => {
  const { 
    exportFullBackup, 
    importBackup, 
    resetToFactoryState, 
    firebaseConfig, 
    setFirebaseConfig 
  } = useAgency();

  const [activeTab, setActiveTab] = useState('backup'); // 'backup', 'firebase', 'github'
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
            setImportStatus('Backup restored successfully!');
            setTimeout(() => setImportStatus(''), 4000);
          } else {
            setImportStatus('Failed to restore: ' + result.error);
          }
        } catch (err) {
          setImportStatus('Invalid JSON backup file.');
        }
      };
    }
  };

  const saveFirebaseSettings = (e) => {
    e.preventDefault();
    setFirebaseConfig(fbForm);
    alert('Firebase configuration saved successfully!');
  };

  const gitCommands = `# 1. Open Terminal in the project folder
cd "C:\\Users\\Label Sync\\.gemini\\antigravity\\scratch\\agency-crm"

# 2. Check Git status & commit any new files
git add .
git commit -m "Agency CRM & Production Tracker Initial Release"

# 3. Create a new repository on GitHub (e.g. your-username/agency-crm)
# Then link and push:
git remote add origin https://github.com/YOUR_USERNAME/agency-crm.git
git branch -M main
git push -u origin main

# 4. Deploy live in 1 minute on Vercel:
# Import your GitHub repo on https://vercel.com/new - Done!`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl space-y-0">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-xl">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Data Backups, Firebase & GitHub Setup</h2>
              <p className="text-xs text-slate-400">Never lose a single client or task record • Fully multi-platform</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-5 pt-3 gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('backup')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'backup' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Local Backup & Restore</span>
          </button>

          <button
            onClick={() => setActiveTab('firebase')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'firebase' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Firebase Cloud Sync</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'github' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>GitHub & Deployment</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* 1. Local Backup & Restore */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-400" />
                  <span>1-Click Complete Agency Database Download</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Exports all 200+ clients, services, assigned team members, deliverables, shoot schedules, Meta ads, and timestamped chat logs into an offline JSON backup.
                </p>
                <button
                  onClick={exportFullBackup}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full JSON Backup</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>Restore from JSON Backup File</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Upload an existing backup file to restore all agency data instantly on any machine or browser.
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-700 file:text-white hover:file:bg-slate-600 cursor-pointer"
                />
                {importStatus && (
                  <p className="text-xs font-bold text-emerald-400 animate-fadeIn">{importStatus}</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-2">
                <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Reset to Factory Demo State</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Resets the application back to the clean seed dataset (210 clients, 25 team members, demo tasks).
                </p>
                <button
                  onClick={resetToFactoryState}
                  className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 text-xs font-semibold rounded-lg border border-rose-500/30 transition"
                >
                  Reset All Data
                </button>
              </div>
            </div>
          )}

          {/* 2. Firebase Cloud Sync */}
          {activeTab === 'firebase' && (
            <form onSubmit={saveFirebaseSettings} className="space-y-4">
              <div className="p-3.5 bg-amber-950/30 border border-amber-500/30 rounded-xl text-xs text-amber-200">
                <p className="font-bold">Free Cloud Database via Firebase Firestore:</p>
                <p className="text-[11px] text-amber-300/80 mt-1">
                  1. Go to <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="underline font-bold">console.firebase.google.com</a> (100% Free).<br />
                  2. Create a project, add a Web App, and copy the config keys below.<br />
                  3. This enables multi-device live cloud sync across your team and clients!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">API Key</label>
                  <input
                    type="text"
                    value={fbForm.apiKey}
                    onChange={(e) => setFbForm({ ...fbForm, apiKey: e.target.value })}
                    placeholder="AIzaSy..."
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Project ID</label>
                  <input
                    type="text"
                    value={fbForm.projectId}
                    onChange={(e) => setFbForm({ ...fbForm, projectId: e.target.value })}
                    placeholder="my-agency-crm"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Auth Domain</label>
                  <input
                    type="text"
                    value={fbForm.authDomain}
                    onChange={(e) => setFbForm({ ...fbForm, authDomain: e.target.value })}
                    placeholder="my-agency-crm.firebaseapp.com"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-bold block mb-1">App ID</label>
                  <input
                    type="text"
                    value={fbForm.appId}
                    onChange={(e) => setFbForm({ ...fbForm, appId: e.target.value })}
                    placeholder="1:123456789:web:abcdef"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="enableFb"
                  checked={fbForm.isEnabled}
                  onChange={(e) => setFbForm({ ...fbForm, isEnabled: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="enableFb" className="text-xs font-bold text-white cursor-pointer">
                  Enable Cloud Sync with this Firebase Project
                </label>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition"
              >
                Save Firebase Settings
              </button>
            </form>
          )}

          {/* 3. GitHub & Deployment */}
          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-purple-950/30 border border-purple-500/30 rounded-xl text-xs text-purple-200">
                <p className="font-bold">Deploy to GitHub & Vercel / Netlify:</p>
                <p className="text-[11px] text-purple-300/80 mt-1">
                  We have already created the complete codebase inside your scratch workspace with Git initialized. Run these commands to push to GitHub:
                </p>
              </div>

              <div className="relative">
                <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
                  {gitCommands}
                </pre>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCmd ? 'Copied!' : 'Copy Commands'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
