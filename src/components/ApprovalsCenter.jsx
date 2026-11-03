import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ExternalLink, 
  MessageSquare, 
  Send, 
  Sparkles, 
  History,
  FileCheck
} from 'lucide-react';

export const ApprovalsCenter = () => {
  const { 
    currentUser, 
    tasks, 
    approveTask, 
    requestRevision, 
    selectedClientId, 
    clients, 
    serviceCategories 
  } = useAgency();

  // If in client view, filter deliverables ONLY for that client. If admin, show all pending approvals or filter by selected client.
  const isClientView = currentUser.role === 'client';
  const effectiveClientId = isClientView ? currentUser.clientId : selectedClientId;
  const currentClient = clients.find(c => c.id === effectiveClientId) || clients[0];

  const [revisionInputs, setRevisionInputs] = useState({});
  const [activeFeedbackBox, setActiveFeedbackBox] = useState(null);

  // Relevant deliverables
  const clientTasks = tasks.filter(t => t.clientId === effectiveClientId);
  const pendingApprovals = clientTasks.filter(t => t.status === 'Client Approval Pending' || t.status === 'Revision Requested');
  const approvedTasks = clientTasks.filter(t => t.status === 'Approved' || t.status === 'Scheduled' || t.status === 'Posted');

  const handleApprove = (taskId) => {
    approveTask(taskId, 'Deliverable approved for publishing.');
  };

  const handleRevisionSubmit = (taskId) => {
    const feedback = revisionInputs[taskId];
    if (!feedback || !feedback.trim()) {
      alert('Please enter specific revision notes before submitting.');
      return;
    }
    requestRevision(taskId, feedback.trim());
    setRevisionInputs(prev => ({ ...prev, [taskId]: '' }));
    setActiveFeedbackBox(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {isClientView ? 'Brand Client Portal' : 'Admin Approval Matrix'}
              </span>
              <span className="text-xs text-slate-400 font-mono">Client ID: {currentClient?.id}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              {currentClient?.name} — Deliverables & Approval Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Review video cuts, carousels, ad designs and click Approve or Request Timestamped Revisions.
            </p>
          </div>

          <div className="text-left sm:text-right bg-slate-950/50 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Enrolled Services:</span>
            <div className="flex flex-wrap gap-1 mt-1 justify-start sm:justify-end">
              {currentClient?.services?.map(sId => (
                <span key={sId} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700 capitalize">
                  {sId.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pending Approvals Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white">Items Awaiting Sign-off ({pendingApprovals.length})</h2>
        </div>

        <div className="space-y-4">
          {pendingApprovals.map(task => (
            <div 
              key={task.id}
              className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-4 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-base">{task.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {task.version || 'v1'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 capitalize">
                      {task.service?.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Scheduled Publish Date: <span className="text-white font-semibold">{task.scheduledDate || 'TBD'}</span> at <span className="text-white font-semibold">{task.scheduledTime || 'TBD'}</span> • Last updated: {task.lastUpdated}
                  </p>
                </div>

                {/* Direct Review Link Button */}
                {task.outputUrl ? (
                  <a
                    href={task.outputUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition shrink-0"
                  >
                    <span>Open & Review Video Cut</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-500 italic">Review Link Rendering...</span>
                )}
              </div>

              {/* Previous Client Feedback if in Revision Requested */}
              {task.clientFeedback && (
                <div className="p-3 rounded-xl bg-slate-950/70 border border-amber-500/20 text-xs">
                  <span className="text-amber-400 font-bold block mb-1">Previous Revision Notes:</span>
                  <p className="text-slate-300 italic">"{task.clientFeedback}"</p>
                </div>
              )}

              {/* Action Buttons: Approve or Request Revision */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <History className="w-4 h-4 text-slate-500" />
                  <span>Revisions Count: <strong className="text-white">{task.revisionsCount || 0}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveFeedbackBox(activeFeedbackBox === task.id ? null : task.id)}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-xl border border-amber-500/30 transition flex items-center gap-1.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Request Changes / Revision</span>
                  </button>

                  <button
                    onClick={() => handleApprove(task.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Deliverable</span>
                  </button>
                </div>
              </div>

              {/* Inline Revision Input Drawer */}
              {activeFeedbackBox === task.id && (
                <div className="pt-3 border-t border-slate-800 space-y-2 animate-fadeIn">
                  <label className="text-xs font-bold text-slate-300 block">
                    Write exact changes required (e.g. "Change song at 0:15, fix spelling in caption"):
                  </label>
                  <div className="flex gap-2">
                    <textarea
                      rows={2}
                      placeholder="Type your feedback for the video editing team..."
                      value={revisionInputs[task.id] || ''}
                      onChange={(e) => setRevisionInputs({ ...revisionInputs, [task.id]: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => handleRevisionSubmit(task.id)}
                      className="px-4 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shrink-0 transition flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Revision</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {pendingApprovals.length === 0 && (
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-white">All Caught Up!</p>
              <p className="text-xs text-slate-400">There are no pending deliverables awaiting your approval right now.</p>
            </div>
          )}
        </div>
      </div>

      {/* Approved Deliverables Log */}
      {approvedTasks.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Approved & Completed Deliverables ({approvedTasks.length})</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approvedTasks.map(task => (
              <div key={task.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs">{task.title}</h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {task.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Target: {task.scheduledDate} at {task.scheduledTime}
                </p>
                {task.outputUrl && (
                  <a 
                    href={task.outputUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Approved Master</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
