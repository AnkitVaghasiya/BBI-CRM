import React from 'react';
import { CheckCircle2, Zap, CloudCheck, HardDrive } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';

export const LiveNotificationToast = () => {
  const { liveToast } = useAgency();

  if (!liveToast || !liveToast.visible) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 animate-slide-up max-w-sm w-full pointer-events-none">
      <div className="p-3.5 rounded-2xl bg-slate-900/95 dark:bg-slate-900/95 text-white border border-slate-700/80 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 pointer-events-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Zap className="w-4 h-4 fill-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-white flex items-center gap-1.5">
              <span>{liveToast.title || 'Live Sync Executed'}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                {liveToast.latency || '< 2ms'}
              </span>
            </p>
            <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
              {liveToast.message}
            </p>
          </div>
        </div>

        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
      </div>
    </div>
  );
};
