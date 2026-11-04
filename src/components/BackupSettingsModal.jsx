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
  Copy
} from 'lucide-react';

export const BackupSettingsModal = ({ isOpen, onClose }) => {
  const { 
    exportFullBackup, 
    importBackup, 
    resetToFactoryState, 
    firebaseConfig, 
    setFirebaseConfig 
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
            setImportStatus('डेटा सफलतापूर्वक रीस्टोर हो गया!');
            setTimeout(() => setImportStatus(''), 4000);
          } else {
            setImportStatus('रीस्टोर नहीं हो सका: ' + result.error);
          }
        } catch (err) {
          setImportStatus('अमान्य JSON फाइल।');
        }
      };
    }
  };

  const saveFirebaseSettings = (e) => {
    e.preventDefault();
    setFirebaseConfig(fbForm);
    alert('Firebase सेटिंग्स सेव हो गई!');
  };

  const gitCommands = `# 1. GitHub पर बदलाव पुश करने के लिए:
cd "C:\\Users\\Label Sync\\.gemini\\antigravity\\scratch\\agency-crm"
git add .
git commit -m "Update BBI CRM"
git push -u origin main

# 2. Vercel पर 1-क्लिक में लाइव करें:
# https://vercel.com/new पर जाएं, BBI-CRM रिपॉजिटरी चुनें और Deploy दबाएं!`;

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
              <h2 className="text-base font-bold text-slate-900 dark:text-white">डेटा बैकअप, सेटिंग्स व क्लाउड</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">अपने डेटा का बैकअप लें या GitHub व Firebase से सिंक करें।</p>
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
            <Download className="w-4 h-4" />
            <span>लोकल बैकअप (Local Backup)</span>
          </button>

          <button
            onClick={() => setActiveTab('firebase')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'firebase' ? 'border-amber-600 text-amber-600 dark:border-amber-500 dark:text-amber-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Firebase क्लाउड सिंक</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'github' ? 'border-purple-600 text-purple-600 dark:border-purple-500 dark:text-purple-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>GitHub लिंक व डिप्लॉयमेंट</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* 1. Local Backup */}
          {activeTab === 'backup' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>1-क्लिक पूरा डेटाबेस बैकअप डाउनलोड करें</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  सभी 200+ क्लाइंट्स, 25 टीम मेंबर्स, टास्क, वीडियो शूट्स और चैट्स की पूरी JSON फाइल डाउनलोड हो जाएगी।
                </p>
                <button
                  onClick={exportFullBackup}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>पूरा बैकअप डाउनलोड करें (.json)</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>बैकअप फाइल से रीस्टोर करें</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  अपनी पहले डाउनलोड की हुई JSON बैकअप फाइल को यहाँ अपलोड करके पूरा डेटा वापस लाएं।
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

              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/20 space-y-2">
                <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>डेटा रीसेट (Factory Reset)</span>
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  डिफ़ॉल्ट डेमो डेटा पर वापस सेट करें।
                </p>
                <button
                  onClick={resetToFactoryState}
                  className="px-3 py-1 bg-rose-100 hover:bg-rose-200 dark:bg-rose-600/20 dark:hover:bg-rose-600/30 text-rose-700 dark:text-rose-300 text-xs font-semibold rounded-lg border border-rose-300 dark:border-rose-500/30 transition"
                >
                  डेटा रीसेट करें
                </button>
              </div>
            </div>
          )}

          {/* 2. Firebase Sync */}
          {activeTab === 'firebase' && (
            <form onSubmit={saveFirebaseSettings} className="space-y-4 text-xs">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 rounded-xl text-amber-800 dark:text-amber-200">
                <p className="font-bold">Google Firebase Cloud Firestore:</p>
                <p className="text-[11px] mt-0.5">console.firebase.google.com से अपने प्रोजेक्ट की keys यहाँ डालें।</p>
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
                  Firebase क्लाउड सिंक सक्षम करें (Enable Cloud Sync)
                </label>
              </div>

              <button
                type="submit"
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition"
              >
                सेटिंग्स सेव करें
              </button>
            </form>
          )}

          {/* 3. GitHub */}
          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/30 rounded-xl text-xs text-purple-800 dark:text-purple-200">
                <p className="font-bold">GitHub Repository Connected:</p>
                <p className="text-[11px] mt-0.5">
                  आपकी रिपॉजिटरी: <a href="https://github.com/AnkitVaghasiya/BBI-CRM" target="_blank" rel="noreferrer" className="underline font-bold">https://github.com/AnkitVaghasiya/BBI-CRM</a>
                </p>
              </div>

              <div className="relative">
                <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed">
                  {gitCommands}
                </pre>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCmd ? 'कॉपी हो गया!' : 'कमांड कॉपी करें'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
