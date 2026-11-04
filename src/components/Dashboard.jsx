import React from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Users, 
  Film, 
  Camera, 
  Target, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowUpRight,
  TrendingUp,
  Plus,
  HelpCircle
} from 'lucide-react';

export const Dashboard = ({ onNewClient, onNewTask, onNewShoot }) => {
  const { clients, tasks, shoots, ads, setActiveTab, teamMembers } = useAgency();

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'Active').length;
  const totalRevenue = clients.reduce((acc, c) => acc + (c.monthlyRetainer || 0), 0);
  const pendingApprovals = tasks.filter(t => t.status === 'Client Approval Pending');
  const revisionRequests = tasks.filter(t => t.status === 'Revision Requested');

  const formatINR = (val) => {
    return '₹' + (val / 100000).toFixed(2) + ' लाख/माह';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">एजेंसी ऑपरेशन्स कमांड सेंटर (Operations Center)</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            कुल <span className="text-blue-400 font-bold">{totalClients} क्लाइंट्स</span> और <span className="text-emerald-400 font-bold">{teamMembers.length} स्टाफ मेंबर्स</span> की सभी गतिविधियों का मुख्य डैशबोर्ड।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onNewClient}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>नया क्लाइंट जोड़ें</span>
          </button>
          <button
            onClick={onNewTask}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition"
          >
            <Film className="w-4 h-4 text-blue-400" />
            <span>नया वीडियो / रील टास्क</span>
          </button>
          <button
            onClick={onNewShoot}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition"
          >
            <Camera className="w-4 h-4 text-amber-400" />
            <span>शूट शेड्यूल करें</span>
          </button>
        </div>
      </div>

      {/* Fresher Welcome Guide Card */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-blue-500/20 flex items-start gap-3 text-xs text-slate-300">
        <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white block">👋 नए यूजर के लिए ऑपरेटिंग गाइड (Quick OS Guide):</span>
          <p className="text-slate-400 mt-0.5 leading-relaxed">
            • <strong>क्लाइंट CRM:</strong> 200+ क्लाइंट्स की लिस्ट, उनकी ली हुई सर्विसेज़ और असाइन्ड स्टाफ देखने या एडिट करने के लिए बाएँ मेनू से <span className="text-blue-400 font-semibold">"क्लाइंट्स"</span> पर क्लिक करें।<br />
            • <strong>प्रोडक्शन ट्रैकर:</strong> कौन-सा वीडियो या रील किस स्टेज पर है (एडिटिंग, अप्रूवल, पब्लिश) यह देखने के लिए <span className="text-blue-400 font-semibold">"प्रोडक्शन ट्रैकर"</span> देखें।<br />
            • <strong>स्टाफ डायरेक्टरी:</strong> अपने 25 टीम मेंबर्स की जानकारी बदलने, नया एडिटर या कैमरा पर्सन जोड़ने के लिए <span className="text-blue-400 font-semibold">"स्टाफ डायरेक्टरी"</span> खोलें।
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Clients */}
        <div 
          onClick={() => setActiveTab('clients')}
          className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">कुल क्लाइंट्स (Total Clients)</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{totalClients}</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              {activeClients} एक्टिव
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">200+ क्लाइंट्स डेटाबेस क्षमता</p>
        </div>

        {/* Retainer MRR */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">मासिक रेवेन्यू (Monthly Retainer)</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400">{formatINR(totalRevenue)}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">सभी एक्टिव क्लाइंट्स कॉन्ट्रैक्ट्स से</p>
        </div>

        {/* Pending Client Approvals */}
        <div 
          onClick={() => setActiveTab('approvals')}
          className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">क्लाइंट अप्रूवल (Approvals)</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-400">{pendingApprovals.length}</span>
            <span className="text-xs text-amber-300 font-semibold">हस्ताक्षर बाकी</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{revisionRequests.length} रिविज़न माँगे गए हैं</p>
        </div>

        {/* Active Production Queue */}
        <div 
          onClick={() => setActiveTab('production')}
          className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">पाइपलाइन में काम (In Pipeline)</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition">
              <Film className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-purple-300">{tasks.length}</span>
            <span className="text-xs text-purple-400 font-semibold">{shoots.length} शूट्स शेड्यूल्ड</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{ads.length} एक्टिव मेटा ऐड कैंपेंस</p>
        </div>
      </div>

      {/* Grid: Production Pulse & Shoots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deliverables Needing Immediate Action */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">तुरंत ध्यान देने योग्य (Pending Approvals & Revisions)</h2>
            </div>
            <button 
              onClick={() => setActiveTab('approvals')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              सभी देखें <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {[...pendingApprovals, ...revisionRequests].slice(0, 4).map(task => {
              const isRevision = task.status === 'Revision Requested';
              return (
                <div key={task.id} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{task.title}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isRevision 
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {task.status} ({task.version})
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      क्लाइंट: <span className="text-slate-200 font-medium">{task.clientName}</span> • लक्ष्य तारीख: {task.scheduledDate} ({task.scheduledTime})
                    </p>
                    {task.clientFeedback && (
                      <p className="text-xs text-slate-300 bg-slate-900/70 p-2 rounded-lg border border-slate-800 italic mt-1">
                        "{task.clientFeedback}"
                      </p>
                    )}
                  </div>
                  <a 
                    href={task.outputUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="shrink-0 px-2.5 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-bold rounded-lg border border-blue-500/30 transition"
                  >
                    लिंक खोलें ↗
                  </a>
                </div>
              );
            })}

            {[...pendingApprovals, ...revisionRequests].length === 0 && (
              <p className="text-xs text-slate-500 text-center py-6">सब कुछ क्लियर है! कोई पेंडिंग अप्रूवल या रिविज़न रुका हुआ नहीं है।</p>
            )}
          </div>
        </div>

        {/* Video Shoots Dispatch */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">आगामी वीडियो शूट्स (Upcoming Video Shoots)</h2>
            </div>
            <button 
              onClick={() => setActiveTab('shoots')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              कैलेंडर <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {shoots.slice(0, 3).map(shoot => (
              <div key={shoot.id} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white">{shoot.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    {shoot.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>क्लाइंट: <span className="text-slate-200 font-medium">{shoot.clientName}</span></p>
                  <p>📅 <span className="text-amber-300 font-semibold">{shoot.shootDate}</span> • कॉल: {shoot.callTime} - रैप: {shoot.wrapTime}</p>
                  <p className="truncate">📍 {shoot.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
