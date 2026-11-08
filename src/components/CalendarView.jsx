import React from 'react';
import { useAgency } from '../context/AgencyContext';
import { Calendar, Clock, ExternalLink } from 'lucide-react';

export const CalendarView = () => {
  const { tasks } = useAgency();

  const scheduledDeliverables = tasks.filter(t => t.scheduledDate);

  const groupedByDate = scheduledDeliverables.reduce((acc, t) => {
    acc[t.scheduledDate] = acc[t.scheduledDate] || [];
    acc[t.scheduledDate].push(t);
    return acc;
  }, {});

  const dates = Object.keys(groupedByDate).sort();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          Social Media Publishing Calendar
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Chronological schedule of approved video reels, photo carousels, and Meta sponsored drops.
        </p>
      </div>

      <div className="space-y-6">
        {dates.map(date => (
          <div key={date} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Publishing Date: <span className="text-purple-600 dark:text-purple-300">{date}</span>
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                {groupedByDate[date].length} Posts Scheduled
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedByDate[date].map(item => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{item.clientName}</span>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-200 dark:border-purple-500/30">
                      <Clock className="w-3 h-3" />
                      <span>{item.scheduledTime || 'Flexible'}</span>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{item.title}</h4>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 dark:border-slate-700/50">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'Approved' ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {item.status}
                    </span>

                    {item.outputUrl && (
                      <a 
                        href={item.outputUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>View Deliverable</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {dates.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-xs">
            No posts scheduled for upcoming dates yet. Assign publishing dates from the Master Production Tracker.
          </div>
        )}
      </div>
    </div>
  );
};
