import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Target, 
  TrendingUp, 
  Plus, 
  ExternalLink, 
  Edit2, 
  Trash2 
} from 'lucide-react';

export const MetaAdsView = ({ onNewAd, onEditAd }) => {
  const { ads, saveAd, deleteAd, teamMembers, clients } = useAgency();

  const handleStatusChange = (adId, newStatus) => {
    const ad = ads.find(a => a.id === adId);
    if (ad) {
      saveAd({ ...ad, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">मेटा ऐड्स ट्रैकर (Meta Ads Hub)</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
              {ads.length} एक्टिव कैंपेंस
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            फेसबुक व इंस्टाग्राम विज्ञापन, डेली बजट, लीड्स और ROAS की सरल ट्रैकिंग।
          </p>
        </div>

        <button
          onClick={onNewAd}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm shadow-emerald-500/20 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>नया ऐड जोड़ें (New Campaign)</span>
        </button>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">कैंपेन व क्लाइंट</th>
                <th className="py-3.5 px-4">प्लेटफ़ॉर्म</th>
                <th className="py-3.5 px-4">डेली बजट</th>
                <th className="py-3.5 px-4">लीड्स व ROAS</th>
                <th className="py-3.5 px-4">क्रिएटिव लिंक</th>
                <th className="py-3.5 px-4">मीडिया बायर</th>
                <th className="py-3.5 px-4">स्टेटस</th>
                <th className="py-3.5 px-4 text-right">एक्शन</th>
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
                        <p className="text-slate-800 dark:text-white font-medium">🎯 लीड्स: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{ad.leadsGenerated}</span></p>
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
                          <span>क्रिएटिव देखें ↗</span>
                        </a>
                      ) : (
                        <span className="text-slate-400">पेंडिंग</span>
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
                        className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-700 dark:text-emerald-300 focus:outline-none cursor-pointer"
                      >
                        <option value="In Planning">In Planning</option>
                        <option value="Creative Pending">Creative Pending</option>
                        <option value="In Review">In Review</option>
                        <option value="Active & Scaling">Active & Scaling</option>
                        <option value="Paused">Paused</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onEditAd(ad)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1 transition"
                        >
                          <Edit2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>एडिट</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`क्या आप "${ad.campaignName}" को हटाना चाहते हैं?`)) {
                              deleteAd(ad.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
