import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Target, 
  TrendingUp, 
  Plus, 
  ExternalLink, 
  Edit2, 
  Trash2,
  RefreshCw,
  Zap,
  BarChart2,
  DollarSign
} from 'lucide-react';

export const MetaAdsView = ({ onNewAd, onEditAd }) => {
  const { ads, saveAd, deleteAd, teamMembers, clients, syncMetaAds } = useAgency();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleStatusChange = (adId, newStatus) => {
    const ad = ads.find(a => a.id === adId);
    if (ad) {
      saveAd({ ...ad, status: newStatus });
    }
  };

  const handleLiveSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      syncMetaAds();
      setIsSyncing(false);
    }, 1000);
  };

  // Calculate live aggregate stats
  const totalLeads = ads.reduce((acc, a) => acc + (Number(a.leadsGenerated) || 0), 0);
  const activeCampaigns = ads.filter(a => a.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Meta Ads & Performance Hub
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
              {activeCampaigns} Active Campaigns
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Facebook & Instagram paid media performance, ad sets, daily budgets, qualified leads, and ROAS metrics.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleLiveSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Graph API'}</span>
          </button>

          <button
            onClick={onNewAd}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm shadow-emerald-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Verified Ad Account</p>
          <p className="text-sm font-bold text-slate-900 dark:text-white mt-1 font-mono">act_1606985407825083</p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
            ● Meta Marketing API Connected
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Total Qualified Leads</p>
          <p className="text-xl font-black text-slate-900 dark:text-white mt-1">{totalLeads}</p>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold mt-1 block">
            +18% vs last week
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Average Client CPL</p>
          <p className="text-xl font-black text-slate-900 dark:text-white mt-1">₹38.5</p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">
            Optimal benchmark
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Blended Agency ROAS</p>
          <p className="text-xl font-black text-slate-900 dark:text-white mt-1">5.4x</p>
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold mt-1 block">
            Profitable return
          </span>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Campaign & Client</th>
                <th className="py-3.5 px-4">Platform</th>
                <th className="py-3.5 px-4">Daily Budget</th>
                <th className="py-3.5 px-4">Leads & ROAS</th>
                <th className="py-3.5 px-4">Creatives / Ads Manager</th>
                <th className="py-3.5 px-4">Media Buyer</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {ads.map(ad => {
                const assignee = teamMembers.find(t => t.id === ad.assignedTo);
                return (
                  <tr key={ad.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm block">{ad.campaignName}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">{ad.clientName}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold text-[11px]">
                        {ad.platform}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 dark:text-white text-xs">{ad.dailyBudget}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5 text-[11px]">
                        <p className="text-slate-800 dark:text-white font-medium">🎯 Leads: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{ad.leadsGenerated}</span></p>
                        <p className="text-slate-500 dark:text-slate-400">CPL: {ad.cpl} • ROAS: <span className="text-blue-600 dark:text-blue-400 font-bold">{ad.roas}</span></p>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {ad.adCreativesUrl ? (
                        <a 
                          href={ad.adCreativesUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 rounded-lg font-semibold text-[11px] transition"
                        >
                          <span>Meta Ads Manager</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[11px]">None</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {assignee ? assignee.name : 'Aryan Malhotra'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={ad.status}
                        onChange={(e) => handleStatusChange(ad.id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          ad.status === 'Active'
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30'
                            : ad.status === 'Optimizing'
                              ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        <option value="Active">Active</option>
                        <option value="Optimizing">Optimizing</option>
                        <option value="In Planning">In Planning</option>
                        <option value="Paused">Paused</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onEditAd(ad)}
                          title="Edit Campaign"
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete campaign "${ad.campaignName}"?`)) {
                              deleteAd(ad.id);
                            }
                          }}
                          title="Delete Campaign"
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
