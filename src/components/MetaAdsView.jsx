import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  ExternalLink, 
  BarChart3, 
  Users, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export const MetaAdsView = ({ onNewAd }) => {
  const { ads, saveAd, teamMembers, clients } = useAgency();

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
          <h1 className="text-xl sm:text-2xl font-black text-white">Meta Ads & Performance Marketing Hub</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Paid Social Funnels, Ad Creatives, Daily Budgets, ROAS & Lead Generation
          </p>
        </div>

        <button
          onClick={onNewAd}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Meta Campaign</span>
        </button>
      </div>

      {/* Campaigns Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Campaign Name & Client</th>
                <th className="py-3.5 px-4">Platform</th>
                <th className="py-3.5 px-4">Daily Budget</th>
                <th className="py-3.5 px-4">Performance Metrics</th>
                <th className="py-3.5 px-4">Creatives Link</th>
                <th className="py-3.5 px-4">Media Buyer</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {ads.map(ad => {
                const assignee = teamMembers.find(t => t.id === ad.assignedTo);
                return (
                  <tr key={ad.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-white text-sm block">{ad.campaignName}</span>
                        <span className="text-emerald-400 text-xs font-semibold">{ad.clientName}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-semibold text-[11px]">
                        {ad.platform}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-white text-xs">{ad.dailyBudget}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5 text-[11px]">
                        <p className="text-white font-medium">🎯 Leads: <span className="text-emerald-400 font-bold">{ad.leadsGenerated}</span></p>
                        <p className="text-slate-400">CPL: {ad.cpl} • ROAS: <span className="text-blue-400 font-bold">{ad.roas}</span></p>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {ad.adCreativesUrl ? (
                        <a 
                          href={ad.adCreativesUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg font-semibold text-[11px] transition"
                        >
                          <span>Review Creatives</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="text-slate-500">Pending</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-slate-300 font-medium">
                        {assignee ? assignee.name : 'Aryan Malhotra'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={ad.status}
                        onChange={(e) => handleStatusChange(ad.id, e.target.value)}
                        className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-800 border border-slate-700 text-emerald-300 focus:outline-none cursor-pointer"
                      >
                        <option value="In Planning">In Planning</option>
                        <option value="Creative Pending">Creative Pending</option>
                        <option value="In Review">In Review</option>
                        <option value="Active & Scaling">Active & Scaling</option>
                        <option value="Paused">Paused</option>
                      </select>
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
