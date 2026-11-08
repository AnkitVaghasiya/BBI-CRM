import React, { useState, useEffect } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  X, 
  Check, 
  Trash2, 
  History, 
  Tag, 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  SlidersHorizontal,
  Search,
  Filter,
  UserCheck,
  Calendar,
  Clock,
  ExternalLink
} from 'lucide-react';

// 1. Team Member / Editor Modal (Full Edit & Add with Duties & Reason Tracking)
export const TeamMemberModal = ({ isOpen, onClose, memberToEdit }) => {
  const { saveTeamMember, deleteTeamMember, changeReasons, clients } = useAgency();

  const reasonsList = changeReasons || [
    'Role Promotion & Scope Expansion',
    'Client Reassignment & Workload Rebalancing',
    'Deliverable Target & Capacity Adjustment',
    'Retainer / Compensation Revision',
    'SOP & Workflow Restructuring',
    'Toolstack & Software Upgrade',
    'Emergency Task Coverage & Backup',
    'Routine Contact & Profile Update'
  ];

  const [form, setForm] = useState({
    name: '',
    role: '',
    department: 'Video Editing',
    email: '',
    phone: '',
    avatar: '🎬',
    dailyTarget: 2,
    currentDuties: '',
    assignedScope: '',
    toolstackStr: 'Adobe Premiere Pro, CapCut Pro',
    assignedClientIds: ['client-1'],
    changeReason: reasonsList[0],
    changeNotes: ''
  });

  const departmentAvatars = {
    'Management': '👩‍💼',
    'Video Editing': '🎬',
    'AI Content': '🤖',
    'Meta Ads & SMM': '📊',
    'Shooting Team': '🎥'
  };

  useEffect(() => {
    if (memberToEdit) {
      setForm({
        ...memberToEdit,
        dailyTarget: memberToEdit.dailyTarget || 2,
        currentDuties: memberToEdit.currentDuties || 'Standard deliverable editing and quality control.',
        assignedScope: memberToEdit.assignedScope || 'Meet scheduled quotas and resolve revisions within 4 hours.',
        toolstackStr: Array.isArray(memberToEdit.toolstack) ? memberToEdit.toolstack.join(', ') : (memberToEdit.toolstack || 'Adobe Premiere Pro, CapCut Pro'),
        assignedClientIds: memberToEdit.assignedClientIds || ['client-1'],
        changeReason: reasonsList[0],
        changeNotes: ''
      });
    } else {
      setForm({
        name: '',
        role: 'Video Editor Specialist',
        department: 'Video Editing',
        email: '',
        phone: '',
        avatar: '🎬',
        dailyTarget: 2,
        currentDuties: 'Short-form reel cutting, hook pacing, audio balancing and subtitle animation.',
        assignedScope: 'Produce 2 high-retention video cuts daily and handle revision feedback.',
        toolstackStr: 'Adobe Premiere Pro, After Effects, CapCut Pro',
        assignedClientIds: ['client-1'],
        changeReason: reasonsList[0],
        changeNotes: 'Initial team member onboarding.'
      });
    }
  }, [memberToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert('Please enter full name');
    
    const tools = form.toolstackStr.split(',').map(t => t.trim()).filter(Boolean);
    const memberPayload = {
      ...form,
      toolstack: tools
    };

    saveTeamMember(memberPayload, form.changeReason, form.changeNotes || `Updated duties and scope for ${form.name}`);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove ${form.name} from active staff?`)) {
      deleteTeamMember(form.id, form.changeReason || 'Staff Offboarding');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl transition-colors">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{memberToEdit ? '✏️ Edit Staff & Role Scope' : '➕ Onboard New Staff Specialist'}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Specify current duties ("kon kya karta he"), future scope ("kon kya karega"), tools, and change reason.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          {/* Name & Avatar */}
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-3">
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-semibold"
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Avatar</label>
              <input
                type="text"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-center text-base focus:outline-none"
              />
            </div>
          </div>

          {/* Department & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Department</label>
              <select
                value={form.department}
                onChange={(e) => {
                  const newDept = e.target.value;
                  setForm({ ...form, department: newDept, avatar: departmentAvatars[newDept] || '👤' });
                }}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none font-semibold"
              >
                <option value="Management">Management</option>
                <option value="Video Editing">Video Editing</option>
                <option value="AI Content">AI & Creative Content</option>
                <option value="Meta Ads & SMM">Meta Ads & Performance SMM</option>
                <option value="Shooting Team">Shooting & Cinematography Crew</option>
              </select>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Role / Designation *</label>
              <input
                type="text"
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Lead Video Editor"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none font-semibold"
              />
            </div>
          </div>

          {/* Email, Phone & Daily Target */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="staff@agency.com"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Phone Number</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 00000"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Daily Target Deliverables</label>
              <input
                type="number"
                min="0"
                value={form.dailyTarget}
                onChange={(e) => setForm({ ...form, dailyTarget: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold focus:outline-none"
              />
            </div>
          </div>

          {/* Current Duties ("kon kya karta he") */}
          <div className="space-y-1">
            <label className="text-slate-800 dark:text-slate-200 font-bold block flex items-center gap-1.5">
              <span>🎯 Current Responsibilities ("What they currently do / kon kya karta he") *</span>
            </label>
            <textarea
              rows={2}
              required
              value={form.currentDuties}
              onChange={(e) => setForm({ ...form, currentDuties: e.target.value })}
              placeholder="e.g. Responsible for first-cut editing of viral reels, sound design, pacing cuts and color grading..."
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Future / Assigned Scope ("kon kya karega") */}
          <div className="space-y-1">
            <label className="text-slate-800 dark:text-slate-200 font-bold block flex items-center gap-1.5">
              <span>🚀 Upcoming Scope & Deliverables ("What they will do / kon kya karega") *</span>
            </label>
            <textarea
              rows={2}
              required
              value={form.assignedScope}
              onChange={(e) => setForm({ ...form, assignedScope: e.target.value })}
              placeholder="e.g. Lead the festive Diwali reels campaign for Ambika Watches and deliver 2 completed cuts daily with under 4-hour revision turns..."
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Tools & Software Stack */}
          <div>
            <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
              Primary Tools & Software Stack (Comma separated)
            </label>
            <input
              type="text"
              value={form.toolstackStr}
              onChange={(e) => setForm({ ...form, toolstackStr: e.target.value })}
              placeholder="Adobe Premiere Pro, After Effects, DaVinci Resolve, CapCut Pro"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          {/* MANDATORY REASON FOR UPDATE / AUDIT TRAIL */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 space-y-2.5">
            <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold">
              <Tag className="w-4 h-4 text-amber-600" />
              <span>Audit Trail: Reason for Change / Update *</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-slate-600 dark:text-slate-400 text-[11px] block mb-1 font-semibold">
                  Standardized Reason Category:
                </label>
                <select
                  value={form.changeReason}
                  onChange={(e) => setForm({ ...form, changeReason: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-bold focus:outline-none"
                >
                  {reasonsList.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 text-[11px] block mb-1 font-semibold">
                  Justification Notes (Audit Log):
                </label>
                <input
                  type="text"
                  value={form.changeNotes}
                  onChange={(e) => setForm({ ...form, changeNotes: e.target.value })}
                  placeholder="e.g. Promoted to lead editor due to high velocity output."
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {memberToEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-600/10 dark:hover:bg-rose-600/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 rounded-xl font-medium flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Staff</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{memberToEdit ? 'Save Staff Updates with Reason' : 'Add Staff Member'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. Client Modal (Full Edit & Add with Quota, Social Channels, and Reason Tracking)
export const ClientModal = ({ isOpen, onClose, clientToEdit }) => {
  const { clients, saveClient, deleteClient, teamMembers, serviceCategories, changeReasons } = useAgency();

  const reasonsList = changeReasons || [
    'Client Reassignment & Workload Rebalancing',
    'Deliverable Target & Capacity Adjustment',
    'Retainer / Compensation Revision',
    'SOP & Workflow Restructuring',
    'Partner Agency / Vendor Contract Update',
    'Routine Contact & Profile Update'
  ];

  const [form, setForm] = useState({
    name: '',
    brand: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: 'Fitness & Gym',
    monthlyRetainer: 75000,
    status: 'Active',
    services: ['video-editing', 'social-media-posting', 'meta-ads', 'raw-data'],
    assignees: {
      management: 'tm-1',
      videoEditing: 'tm-6',
      shooting: 'tm-21',
      ai: 'tm-11',
      smm: 'tm-16'
    },
    rawDriveUrl: 'https://drive.google.com/drive/folders/client-vault',
    quotas: {
      videos: { target: 16, completed: 0, inProgress: 0 },
      graphics: { target: 12, completed: 0, inProgress: 0 },
      posts: { target: 20, completed: 0, inProgress: 0 },
      scripts: { target: 20, completed: 0, inProgress: 0 },
      shoots: { target: 2, completed: 0, inProgress: 0 },
      metaCampaigns: { target: 4, completed: 0, inProgress: 0 }
    },
    socialChannels: {
      meta: { active: true, adAccountId: 'act_1606985407825083' },
      instagram: { active: true, handle: '@client_brand' },
      youtube: { active: true, handle: '@clientTV' },
      snapchat: { active: false, handle: '' },
      pinterest: { active: false, handle: '' }
    },
    changeReason: reasonsList[0],
    changeNotes: ''
  });

  useEffect(() => {
    if (clientToEdit) {
      setForm({
        ...clientToEdit,
        changeReason: reasonsList[0],
        changeNotes: ''
      });
    } else {
      setForm({
        name: '',
        brand: '',
        contactPerson: '',
        email: '',
        phone: '',
        industry: 'Fitness & Gym',
        monthlyRetainer: 75000,
        status: 'Active',
        services: ['video-editing', 'social-media-posting', 'meta-ads', 'raw-data'],
        assignees: {
          management: teamMembers[0]?.id || 'tm-1',
          videoEditing: teamMembers[5]?.id || 'tm-6',
          shooting: teamMembers[20]?.id || 'tm-21',
          ai: teamMembers[10]?.id || 'tm-11',
          smm: teamMembers[15]?.id || 'tm-16'
        },
        rawDriveUrl: 'https://drive.google.com/drive/folders/client-vault',
        quotas: {
          videos: { target: 16, completed: 0, inProgress: 0 },
          graphics: { target: 12, completed: 0, inProgress: 0 },
          posts: { target: 20, completed: 0, inProgress: 0 },
          scripts: { target: 20, completed: 0, inProgress: 0 },
          shoots: { target: 2, completed: 0, inProgress: 0 },
          metaCampaigns: { target: 4, completed: 0, inProgress: 0 }
        },
        socialChannels: {
          meta: { active: true, adAccountId: 'act_1606985407825083' },
          instagram: { active: true, handle: '@client_brand' },
          youtube: { active: true, handle: '@clientTV' },
          snapchat: { active: false, handle: '' },
          pinterest: { active: false, handle: '' }
        },
        changeReason: reasonsList[0],
        changeNotes: 'Initial client onboarding.'
      });
    }
  }, [clientToEdit, isOpen, teamMembers]);

  if (!isOpen) return null;

  const toggleService = (sId) => {
    setForm(prev => {
      const exists = prev.services?.includes(sId);
      return {
        ...prev,
        services: exists ? prev.services.filter(s => s !== sId) : [...(prev.services || []), sId]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert('Please enter company/brand name');
    saveClient(form, form.changeReason, form.changeNotes || `Updated profile & deliverables for ${form.name}`);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete client "${form.name}"?`)) {
      deleteClient(form.id, form.changeReason || 'Client Cancellation');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transition-colors">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{clientToEdit ? '✏️ Edit Client Profile & Scope' : '➕ Onboard New Client'}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Update monthly retainers, quotas, social channels, department assignees, and change reason.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Company / Brand Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. IronCore Gym"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-semibold"
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Brand Handle / Tag</label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                placeholder="@IronCore"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Contact Person</label>
              <input
                type="text"
                value={form.contactPerson}
                onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                placeholder="Full Name"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="client@brand.com"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Industry</label>
              <select
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Fitness & Gym">Fitness & Gym</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Luxury Retail & Watches">Luxury Retail & Watches</option>
                <option value="Tech SaaS & Finance">Tech SaaS & Finance</option>
                <option value="Dentist & Clinic">Dentist & Clinic</option>
                <option value="Restaurant & Cafe">Restaurant & Cafe</option>
                <option value="Interior Design">Interior Design</option>
              </select>
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Monthly Retainer (₹)</label>
              <input
                type="number"
                value={form.monthlyRetainer}
                onChange={(e) => setForm({ ...form, monthlyRetainer: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-semibold focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Onboarding">Onboarding</option>
                <option value="On Hold">On Hold</option>
                <option value="Review">Review</option>
              </select>
            </div>
          </div>

          {/* Monthly Deliverables Targets */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-slate-800 dark:text-slate-300 font-bold block">
              Monthly Deliverable Target Quotas:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Target Videos</label>
                <input
                  type="number"
                  min="0"
                  value={form.quotas?.videos?.target ?? 16}
                  onChange={(e) => setForm({
                    ...form,
                    quotas: {
                      ...(form.quotas || {}),
                      videos: { ...(form.quotas?.videos || { completed: 0, inProgress: 0 }), target: Number(e.target.value) }
                    }
                  })}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Target Graphics</label>
                <input
                  type="number"
                  min="0"
                  value={form.quotas?.graphics?.target ?? 12}
                  onChange={(e) => setForm({
                    ...form,
                    quotas: {
                      ...(form.quotas || {}),
                      graphics: { ...(form.quotas?.graphics || { completed: 0, inProgress: 0 }), target: Number(e.target.value) }
                    }
                  })}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Target Scripts</label>
                <input
                  type="number"
                  min="0"
                  value={form.quotas?.scripts?.target ?? 20}
                  onChange={(e) => setForm({
                    ...form,
                    quotas: {
                      ...(form.quotas || {}),
                      scripts: { ...(form.quotas?.scripts || { completed: 0, inProgress: 0 }), target: Number(e.target.value) }
                    }
                  })}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Target Posts</label>
                <input
                  type="number"
                  min="0"
                  value={form.quotas?.posts?.target ?? 20}
                  onChange={(e) => setForm({
                    ...form,
                    quotas: {
                      ...(form.quotas || {}),
                      posts: { ...(form.quotas?.posts || { completed: 0, inProgress: 0 }), target: Number(e.target.value) }
                    }
                  })}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-bold"
                />
              </div>
            </div>
          </div>

          {/* Connected Social Media & Meta Ads Accounts */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-slate-800 dark:text-slate-300 font-bold block">
              Connected Social Media & Meta Ads Accounts:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-500 dark:text-slate-400 text-[11px] block mb-1">
                  Meta Ad Account ID (act_...)
                </label>
                <input
                  type="text"
                  value={form.socialChannels?.meta?.adAccountId || ''}
                  onChange={(e) => setForm({
                    ...form,
                    socialChannels: {
                      ...(form.socialChannels || {}),
                      meta: { ...(form.socialChannels?.meta || { active: true }), adAccountId: e.target.value }
                    }
                  })}
                  placeholder="e.g. act_1606985407825083"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-500 dark:text-slate-400 text-[11px] block mb-1">
                  Instagram Handle (@...)
                </label>
                <input
                  type="text"
                  value={form.socialChannels?.instagram?.handle || ''}
                  onChange={(e) => setForm({
                    ...form,
                    socialChannels: {
                      ...(form.socialChannels || {}),
                      instagram: { ...(form.socialChannels?.instagram || { active: true }), handle: e.target.value }
                    }
                  })}
                  placeholder="e.g. @brand_official"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Raw Media Drive */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-slate-800 dark:text-slate-300 font-bold block mb-1">
              Raw Media Cloud Storage Link (Google Drive):
            </label>
            <input
              type="url"
              value={form.rawDriveUrl}
              onChange={(e) => setForm({ ...form, rawDriveUrl: e.target.value })}
              placeholder="https://drive.google.com/..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* MANDATORY REASON FOR UPDATE / AUDIT TRAIL */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 space-y-2.5">
            <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold">
              <Tag className="w-4 h-4 text-amber-600" />
              <span>Audit Trail: Reason for Change / Update *</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-slate-600 dark:text-slate-400 text-[11px] block mb-1 font-semibold">
                  Standardized Reason Category:
                </label>
                <select
                  value={form.changeReason}
                  onChange={(e) => setForm({ ...form, changeReason: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-bold focus:outline-none"
                >
                  {reasonsList.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 text-[11px] block mb-1 font-semibold">
                  Justification Notes (Audit Log):
                </label>
                <input
                  type="text"
                  value={form.changeNotes}
                  onChange={(e) => setForm({ ...form, changeNotes: e.target.value })}
                  placeholder="e.g. Scope expansion and quarterly retainer revision."
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {clientToEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-600/10 dark:hover:bg-rose-600/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 rounded-xl font-medium flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{clientToEdit ? 'Save Client with Reason' : 'Onboard Client'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// 3. Partner Agency / Vendor Modal ("other agencies", kon kya karta he, kon kya karega)
export const PartnerAgencyModal = ({ isOpen, onClose, agencyToEdit }) => {
  const { savePartnerAgency, deletePartnerAgency, changeReasons, clients } = useAgency();

  const reasonsList = changeReasons || [
    'Partner Agency / Vendor Contract Update',
    'Deliverable Target & Capacity Adjustment',
    'Retainer / Compensation Revision',
    'Client Reassignment & Workload Rebalancing',
    'Routine Contact & Profile Update'
  ];

  const [form, setForm] = useState({
    name: '',
    type: '3D VFX & CGI Animation',
    contactPerson: '',
    email: '',
    phone: '',
    monthlyRetainer: 60000,
    status: 'Active Partner',
    currentScope: '',
    upcomingTasks: '',
    contractedDeliverables: '6 Renders / month',
    slaHours: 48,
    ndaSigned: true,
    assignedClients: ['client-1'],
    changeReason: reasonsList[0],
    changeNotes: ''
  });

  useEffect(() => {
    if (agencyToEdit) {
      setForm({
        ...agencyToEdit,
        changeReason: reasonsList[0],
        changeNotes: ''
      });
    } else {
      setForm({
        name: '',
        type: '3D VFX & CGI Animation',
        contactPerson: '',
        email: '',
        phone: '',
        monthlyRetainer: 60000,
        status: 'Active Partner',
        currentScope: '3D modeling, fluid simulations and CGI visual sequences for product commercials.',
        upcomingTasks: 'Produce festive 3D assets and photorealistic product turnarounds.',
        contractedDeliverables: '6 Renders / month',
        slaHours: 48,
        ndaSigned: true,
        assignedClients: ['client-1'],
        changeReason: reasonsList[0],
        changeNotes: 'Initial vendor contract onboarding.'
      });
    }
  }, [agencyToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert('Please enter agency name');
    savePartnerAgency(form, form.changeReason, form.changeNotes || `Updated scope for ${form.name}`);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to terminate vendor contract with "${form.name}"?`)) {
      deletePartnerAgency(form.id, form.changeReason || 'Contract Termination');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl transition-colors">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>{agencyToEdit ? '✏️ Edit Partner Agency / Vendor' : '➕ Contract New Partner Agency'}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Configure collaborating agencies, external vendors, contracted scope, and change reason.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          {/* Agency Name & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Partner Agency Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. VFX Prodigy Studios"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Agency Specialty / Domain *</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-semibold focus:outline-none"
              >
                <option value="3D VFX & CGI Animation">3D VFX & CGI Animation</option>
                <option value="Voiceover & Multilingual Dubbing">Voiceover & Multilingual Dubbing</option>
                <option value="White-Label Performance Ads">White-Label Performance Ads</option>
                <option value="Cinematic Drone & Production House">Cinematic Drone & Production House</option>
                <option value="Translation & Script Adaptation">Translation & Script Adaptation</option>
                <option value="Celebrity & Influencer Casting Agency">Celebrity & Influencer Casting Agency</option>
              </select>
            </div>
          </div>

          {/* Contact, Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Contact Lead</label>
              <input
                type="text"
                value={form.contactPerson}
                onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                placeholder="Vendor Lead Name"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Vendor Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="contact@vendor.io"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 00000"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Retainer & SLA */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Monthly Cost / Retainer (₹)</label>
              <input
                type="number"
                value={form.monthlyRetainer}
                onChange={(e) => setForm({ ...form, monthlyRetainer: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Contract Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-semibold focus:outline-none"
              >
                <option value="Active Partner">Active Partner</option>
                <option value="On Trial">On Trial</option>
                <option value="Paused">Paused</option>
              </select>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">SLA Turnaround (Hours)</label>
              <input
                type="number"
                value={form.slaHours}
                onChange={(e) => setForm({ ...form, slaHours: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold focus:outline-none"
              />
            </div>
          </div>

          {/* Current Duties ("kon kya karta he") */}
          <div>
            <label className="text-slate-800 dark:text-slate-200 font-bold block mb-1">
              Current Deliverable Duties ("What this agency currently does / kon kya karta he") *
            </label>
            <textarea
              rows={2}
              required
              value={form.currentScope}
              onChange={(e) => setForm({ ...form, currentScope: e.target.value })}
              placeholder="e.g. CGI renders, 3D watch simulation, liquid simulation and dynamic motion backgrounds..."
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Future / Assigned Scope ("kon kya karega") */}
          <div>
            <label className="text-slate-800 dark:text-slate-200 font-bold block mb-1">
              Upcoming Contracted Tasks ("What this agency will do / kon kya karega") *
            </label>
            <textarea
              rows={2}
              required
              value={form.upcomingTasks}
              onChange={(e) => setForm({ ...form, upcomingTasks: e.target.value })}
              placeholder="e.g. Complete 6 photorealistic watch rotation renders for Ambika Watches festive season launch..."
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Deliverables quota & NDA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Contracted Deliverables</label>
              <input
                type="text"
                value={form.contractedDeliverables}
                onChange={(e) => setForm({ ...form, contractedDeliverables: e.target.value })}
                placeholder="e.g. 8 CGI Renders / month"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="nda"
                checked={form.ndaSigned}
                onChange={(e) => setForm({ ...form, ndaSigned: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-0"
              />
              <label htmlFor="nda" className="text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Mutual NDA & Confidentiality Agreement Signed</span>
              </label>
            </div>
          </div>

          {/* MANDATORY REASON FOR UPDATE / AUDIT TRAIL */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 space-y-2.5">
            <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold">
              <Tag className="w-4 h-4 text-amber-600" />
              <span>Audit Trail: Reason for Change / Contract Revision *</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-slate-600 dark:text-slate-400 text-[11px] block mb-1 font-semibold">
                  Reason Category:
                </label>
                <select
                  value={form.changeReason}
                  onChange={(e) => setForm({ ...form, changeReason: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-bold focus:outline-none"
                >
                  {reasonsList.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 text-[11px] block mb-1 font-semibold">
                  Justification Notes:
                </label>
                <input
                  type="text"
                  value={form.changeNotes}
                  onChange={(e) => setForm({ ...form, changeNotes: e.target.value })}
                  placeholder="e.g. Added 2 new deliverables to monthly SLA."
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {agencyToEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-600/10 dark:hover:bg-rose-600/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 rounded-xl font-medium flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Terminate Vendor</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{agencyToEdit ? 'Save Partner Agency with Reason' : 'Contract Partner Agency'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// 4. Dedicated Audit Log Modal / Change History Explorer
export const AuditLogModal = ({ isOpen, onClose }) => {
  const { auditLogs } = useAgency();
  const [search, setSearch] = useState('');
  const [entityFilter, setEntityFilter] = useState('All');

  if (!isOpen) return null;

  const filteredLogs = (auditLogs || []).filter(log => {
    const matchesSearch = 
      log.entityName.toLowerCase().includes(search.toLowerCase()) ||
      log.changeReason.toLowerCase().includes(search.toLowerCase()) ||
      log.changeNotes.toLowerCase().includes(search.toLowerCase()) ||
      log.changedBy.toLowerCase().includes(search.toLowerCase());

    const matchesEntity = entityFilter === 'All' || log.entityType === entityFilter;

    return matchesSearch && matchesEntity;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl transition-colors">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-4 h-4 text-blue-600" />
              <span>System Audit Trail & Edit Reasons Log</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Historical record of all edits made across editors, staff, clients, teams, and partner agencies with reasons.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search audit trail by entity, reason, author, or notes..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-slate-500 text-[11px] font-semibold">Entity:</span>
              <select
                value={entityFilter}
                onChange={(e) => setEntityFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold focus:outline-none"
              >
                <option value="All">All Entities</option>
                <option value="Editor / Employee">Staff & Editors</option>
                <option value="Client Account">Clients</option>
                <option value="Partner Agency">Partner Agencies</option>
              </select>
            </div>
          </div>

          {/* Logs List */}
          <div className="space-y-2.5">
            {filteredLogs.map(log => (
              <div 
                key={log.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                      {log.entityType}
                    </span>
                    <strong className="text-slate-900 dark:text-white text-xs">{log.entityName}</strong>
                    <span className="text-slate-400 text-[11px]">• {log.action}</span>
                  </div>
                  <span className="text-slate-400 text-[10px] font-mono">{log.timestamp}</span>
                </div>

                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" /> {log.changeReason}
                  </span>
                  <span className="text-slate-500 text-[11px]">Changed by: <strong className="text-slate-800 dark:text-slate-200">{log.changedBy}</strong></span>
                </div>

                {log.changeNotes && (
                  <p className="text-slate-700 dark:text-slate-300 italic text-[11px] bg-white dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200 dark:border-slate-700/50">
                    "{log.changeNotes}"
                  </p>
                )}
              </div>
            ))}

            {filteredLogs.length === 0 && (
              <div className="p-8 text-center text-slate-400 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                No audit logs found matching your filter criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// 3. Task Modal (Full Edit & Add)
export const TaskModal = ({ isOpen, onClose, taskToEdit }) => {
  const { clients, saveTask, deleteTask, teamMembers, serviceCategories, DELIVERABLE_TYPES } = useAgency();

  const [form, setForm] = useState({
    title: '',
    clientId: 'client-1',
    clientName: 'IronCore Fitness',
    deliverableType: 'Video Reel',
    service: 'video-editing',
    assignedTo: 'tm-6',
    scheduledDate: '2026-11-05',
    scheduledTime: '18:00',
    rawMediaUrl: '',
    outputUrl: '',
    status: 'In Progress',
    version: 'v1',
    priority: 'Medium',
    clientFeedback: ''
  });

  useEffect(() => {
    if (taskToEdit) {
      setForm({ ...taskToEdit, deliverableType: taskToEdit.deliverableType || 'Video Reel' });
    } else {
      setForm({
        title: '',
        clientId: clients[0]?.id || 'client-1',
        clientName: clients[0]?.name || 'Client',
        deliverableType: 'Video Reel',
        service: 'video-editing',
        assignedTo: teamMembers.find(m => m.department === 'Video Editing')?.id || 'tm-6',
        scheduledDate: new Date().toISOString().split('T')[0],
        scheduledTime: '17:00',
        rawMediaUrl: 'https://drive.google.com/drive/folders/raw-footage',
        outputUrl: '',
        status: 'In Progress',
        version: 'v1',
        priority: 'Medium',
        clientFeedback: ''
      });
    }
  }, [taskToEdit, isOpen, clients, teamMembers]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert('Please enter a title');
    const selectedClient = clients.find(c => c.id === form.clientId);
    saveTask({
      ...form,
      clientName: selectedClient ? selectedClient.name : form.clientName
    });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${form.title}" ?`)) {
      deleteTask(form.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl transition-colors">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{taskToEdit ? '✏️ Edit Deliverable Task' : '➕ Add New Deliverable Task'}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Date, Time Slot, Status and Review URL update.</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          <div>
            <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Task Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. 30s Viral Hook Reel #15"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Select Client</label>
              <select
                value={form.clientId}
                onChange={(e) => {
                  const cId = e.target.value;
                  const cl = clients.find(c => c.id === cId);
                  setForm({ ...form, clientId: cId, clientName: cl ? cl.name : form.clientName });
                }}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              >
                {clients.slice(0, 60).map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Deliverable Type</label>
              <select
                value={form.deliverableType}
                onChange={(e) => setForm({ ...form, deliverableType: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none font-semibold"
              >
                {(DELIVERABLE_TYPES || ['Video Reel', 'Long-Form Video', 'Social Graphic', 'Carousel Post', 'Script / Concept', 'Meta Ad Creative']).map(dt => (
                  <option key={dt} value={dt}>{dt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Service Category</label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              >
                {serviceCategories.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Date (Date)</label>
              <input
                type="date"
                value={form.scheduledDate}
                onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Time Slot (Time Slot)</label>
              <input
                type="time"
                value={form.scheduledTime}
                onChange={(e) => setForm({ ...form, scheduledTime: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Assign Staff Member</label>
              <select
                value={form.assignedTo}
                onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              >
                {teamMembers.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.department})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="Raw Data Ingest">Raw Data Ingest</option>
                <option value="In Progress">In Progress</option>
                <option value="Internal QC">Internal QC</option>
                <option value="Client Approval Pending">Client Approval Pending</option>
                <option value="Revision Requested">Revision Requested</option>
                <option value="Approved">Approved</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Posted">Posted</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Raw Footage Cloud Link</label>
            <input
              type="url"
              value={form.rawMediaUrl}
              onChange={(e) => setForm({ ...form, rawMediaUrl: e.target.value })}
              placeholder="https://drive.google.com/..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Review Output Video Link (Vimeo/Drive)</label>
            <input
              type="url"
              value={form.outputUrl}
              onChange={(e) => setForm({ ...form, outputUrl: e.target.value })}
              placeholder="https://vimeo.com/..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {taskToEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-600/10 dark:hover:bg-rose-600/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 rounded-xl font-medium flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Task</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-sm transition"
              >
                {taskToEdit ? 'Save (Save)' : 'Task Add (Add)'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// 4. Shoot Modal
export const ShootModal = ({ isOpen, onClose, shootToEdit }) => {
  const { clients, saveShoot, deleteShoot, teamMembers } = useAgency();

  const [form, setForm] = useState({
    title: '',
    clientId: 'client-1',
    shootDate: '2026-11-06',
    callTime: '09:00 AM',
    wrapTime: '03:00 PM',
    location: '',
    crew: ['tm-21', 'tm-23'],
    briefUrl: 'https://docs.google.com/document/d/shoot-concept',
    equipmentList: ['Sony FX3', 'Ronin RS3 Pro', 'Mic Kit'],
    status: 'Confirmed'
  });

  useEffect(() => {
    if (shootToEdit) {
      setForm(shootToEdit);
    } else {
      setForm({
        title: '',
        clientId: clients[0]?.id || 'client-1',
        shootDate: new Date().toISOString().split('T')[0],
        callTime: '09:00 AM',
        wrapTime: '03:00 PM',
        location: '',
        crew: teamMembers.filter(m => m.department === 'Shooting Team').slice(0, 2).map(m => m.id),
        briefUrl: 'https://docs.google.com/document/d/shoot-concept',
        equipmentList: ['Sony FX3', 'Ronin RS3 Pro', 'Mic Kit'],
        status: 'Confirmed'
      });
    }
  }, [shootToEdit, isOpen, clients, teamMembers]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert('Please enter a title');
    const cl = clients.find(c => c.id === form.clientId);
    saveShoot({
      ...form,
      clientName: cl ? cl.name : 'Client'
    });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${form.title}" ?`)) {
      deleteShoot(form.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transition-colors">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{shootToEdit ? '✏️ Edit Video Shoot Schedule' : '➕ Schedule New Video Shoot'}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Date, Location and Camera Crew manage.</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          <div>
            <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Shoot Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Festive Lifestyle Wrist & Macro Shoot"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Client</label>
              <select
                value={form.clientId}
                onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              >
                {clients.slice(0, 60).map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Equipment Prep">Equipment Prep</option>
                <option value="Shooting in Progress">Shooting Now</option>
                <option value="Footage Offloaded">Footage Offloaded</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Date</label>
              <input
                type="date"
                value={form.shootDate}
                onChange={(e) => setForm({ ...form, shootDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Call Time</label>
              <input
                type="text"
                value={form.callTime}
                onChange={(e) => setForm({ ...form, callTime: e.target.value })}
                placeholder="09:00 AM"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Wrap Time</label>
              <input
                type="text"
                value={form.wrapTime}
                onChange={(e) => setForm({ ...form, wrapTime: e.target.value })}
                placeholder="04:00 PM"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Location Address</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Diamond City Mall Showroom / Studio A 9, Surat / Mumbai"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {shootToEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-600/10 dark:hover:bg-rose-600/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 rounded-xl font-medium flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-sm transition"
              >
                {shootToEdit ? 'Save (Save)' : 'Schedule (Confirm)'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// 5. Ad Modal
export const AdModal = ({ isOpen, onClose, adToEdit }) => {
  const { clients, saveAd, deleteAd, teamMembers } = useAgency();

  const [form, setForm] = useState({
    campaignName: '',
    clientId: 'client-1',
    platform: 'Instagram & Facebook Ads',
    dailyBudget: '₹3,500 / day',
    status: 'In Planning',
    leadsGenerated: 0,
    cpl: '₹0',
    roas: 'N/A',
    adCreativesUrl: '',
    assignedTo: 'tm-16'
  });

  useEffect(() => {
    if (adToEdit) {
      setForm(adToEdit);
    } else {
      setForm({
        campaignName: '',
        clientId: clients[0]?.id || 'client-1',
        platform: 'Instagram & Facebook Ads',
        dailyBudget: '₹3,500 / day',
        status: 'In Planning',
        leadsGenerated: 0,
        cpl: '₹0',
        roas: 'N/A',
        adCreativesUrl: '',
        assignedTo: teamMembers.find(m => m.department === 'Meta Ads & SMM')?.id || 'tm-16'
      });
    }
  }, [adToEdit, isOpen, clients, teamMembers]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.campaignName.trim()) return alert('Please enter a name');
    const cl = clients.find(c => c.id === form.clientId);
    saveAd({
      ...form,
      clientName: cl ? cl.name : 'Client'
    });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${form.campaignName}" ?`)) {
      deleteAd(form.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transition-colors">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{adToEdit ? '✏️ Edit Meta Ad Campaign' : '➕ Create New Meta Ad Campaign'}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Update budget, leads count, creative links, and media buyer.</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          <div>
            <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Campaign Name *</label>
            <input
              type="text"
              required
              value={form.campaignName}
              onChange={(e) => setForm({ ...form, campaignName: e.target.value })}
              placeholder="e.g. Diwali Festive Watch Lead Gen Campaign"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Client</label>
              <select
                value={form.clientId}
                onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              >
                {clients.slice(0, 60).map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Daily Budget</label>
              <input
                type="text"
                value={form.dailyBudget}
                onChange={(e) => setForm({ ...form, dailyBudget: e.target.value })}
                placeholder="₹4,000 / day"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Leads Generated</label>
              <input
                type="number"
                value={form.leadsGenerated}
                onChange={(e) => setForm({ ...form, leadsGenerated: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">CPL</label>
              <input
                type="text"
                value={form.cpl}
                onChange={(e) => setForm({ ...form, cpl: e.target.value })}
                placeholder="₹95"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">ROAS</label>
              <input
                type="text"
                value={form.roas}
                onChange={(e) => setForm({ ...form, roas: e.target.value })}
                placeholder="4.2x"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Creative Asset Link (Google Drive)</label>
            <input
              type="url"
              value={form.adCreativesUrl}
              onChange={(e) => setForm({ ...form, adCreativesUrl: e.target.value })}
              placeholder="https://drive.google.com/..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {adToEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-600/10 dark:hover:bg-rose-600/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 rounded-xl font-medium flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-sm transition"
              >
                {adToEdit ? 'Save (Save)' : 'Launch (Launch)'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
