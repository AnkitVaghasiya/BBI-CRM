import React, { useState, useEffect } from 'react';
import { useAgency } from '../context/AgencyContext';
import { X, Check, Trash2 } from 'lucide-react';

// 1. Team Member Modal (Full Edit & Add)
export const TeamMemberModal = ({ isOpen, onClose, memberToEdit }) => {
  const { saveTeamMember, deleteTeamMember } = useAgency();

  const [form, setForm] = useState({
    name: '',
    role: '',
    department: 'Video Editing',
    email: '',
    phone: '',
    avatar: '🎬'
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
      setForm(memberToEdit);
    } else {
      setForm({
        name: '',
        role: 'Video Editor Specialist',
        department: 'Video Editing',
        email: '',
        phone: '',
        avatar: '🎬'
      });
    }
  }, [memberToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert('Please enter a name');
    saveTeamMember(form);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${form.name} ?`)) {
      deleteTeamMember(form.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transition-colors">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{memberToEdit ? '✏️ Edit Team Member' : '➕ Add New Team Member'}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Update name, designation, department, and contact info.</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-3">
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Full Name (Full Name) *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Avatar</label>
              <input
                type="text"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-center text-base focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Department (Department)</label>
              <select
                value={form.department}
                onChange={(e) => {
                  const newDept = e.target.value;
                  setForm({ ...form, department: newDept, avatar: departmentAvatars[newDept] || '👤' });
                }}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Management">Management (Management)</option>
                <option value="Video Editing">Video Editing (Video Editing)</option>
                <option value="AI Content">AI Content (AI & Creative)</option>
                <option value="Meta Ads & SMM">Meta Ads & SMM (Meta Ads & SMM)</option>
                <option value="Shooting Team">Shooting Team (Camera Crew)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Role / Designation (Role)</label>
              <input
                type="text"
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Lead Editor"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Email (Email Address)</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="member@agency.com"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Phone (Phone Number)</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 00000"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
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
                <span>Delete (Delete)</span>
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
                {memberToEdit ? 'Save (Save)' : 'Add (Add)'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. Client Modal (Full Edit & Add)
export const ClientModal = ({ isOpen, onClose, clientToEdit }) => {
  const { clients, saveClient, deleteClient, teamMembers, serviceCategories } = useAgency();

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
    rawDriveUrl: 'https://drive.google.com/drive/folders/client-vault'
  });

  useEffect(() => {
    if (clientToEdit) {
      setForm(clientToEdit);
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
        rawDriveUrl: 'https://drive.google.com/drive/folders/client-vault'
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
    if (!form.name.trim()) return alert('Please enter a name');
    saveClient(form);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete client "${form.name}" ?`)) {
      deleteClient(form.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transition-colors">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{clientToEdit ? '✏️ Edit Client Profile' : '➕ Onboard New Client'}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Configure client profile, enrolled services, and team leads.</p>
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
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
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
                placeholder="e.g. Dr. Vivek Desai"
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
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Phone Number</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98200 00000"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Industry Category</label>
              <input
                type="text"
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                placeholder="Fitness, Real Estate..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Monthly Retainer (₹)</label>
              <input
                type="number"
                value={form.monthlyRetainer}
                onChange={(e) => setForm({ ...form, monthlyRetainer: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Active">Active (Active)</option>
                <option value="Onboarding">Onboarding</option>
                <option value="Paused">Paused</option>
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

          {/* Enrolled Services */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-slate-800 dark:text-slate-300 font-bold block">
              Enrolled Services (Subscribed Services):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {serviceCategories.map(s => {
                const isSelected = form.services?.includes(s.id);
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => toggleService(s.id)}
                    className={`p-2 rounded-xl border text-left flex items-center justify-between transition ${
                      isSelected 
                        ? 'bg-blue-50 dark:bg-blue-600/20 border-blue-500 text-blue-700 dark:text-blue-300 font-bold' 
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span>{s.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Assigned Specialists */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-slate-800 dark:text-slate-300 font-bold block">
              Assigned Department Specialists (Assignees):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-500 dark:text-slate-400 text-[11px] block mb-1">Video Editor:</label>
                <select
                  value={form.assignees?.videoEditing}
                  onChange={(e) => setForm({ ...form, assignees: { ...form.assignees, videoEditing: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                >
                  {teamMembers.filter(m => m.department === 'Video Editing').map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-500 dark:text-slate-400 text-[11px] block mb-1">Shooting Lead:</label>
                <select
                  value={form.assignees?.shooting}
                  onChange={(e) => setForm({ ...form, assignees: { ...form.assignees, shooting: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                >
                  {teamMembers.filter(m => m.department === 'Shooting Team').map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
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
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-sm transition"
              >
                {clientToEdit ? 'Save (Save)' : 'Onboard (Add)'}
              </button>
            </div>
          </div>
        </form>
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
