import React, { useState, useEffect } from 'react';
import { useAgency } from '../context/AgencyContext';
import { X, Check } from 'lucide-react';

// 1. Client Modal (Add / Edit)
export const ClientModal = ({ isOpen, onClose, clientToEdit }) => {
  const { clients, saveClient, teamMembers, serviceCategories } = useAgency();

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
    rawDriveUrl: 'https://drive.google.com/drive/folders/new-client-vault'
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
          management: 'tm-1',
          videoEditing: 'tm-6',
          shooting: 'tm-21',
          ai: 'tm-11',
          smm: 'tm-16'
        },
        rawDriveUrl: 'https://drive.google.com/drive/folders/client-vault'
      });
    }
  }, [clientToEdit, isOpen]);

  if (!isOpen) return null;

  const toggleService = (sId) => {
    setForm(prev => {
      const exists = prev.services.includes(sId);
      return {
        ...prev,
        services: exists ? prev.services.filter(s => s !== sId) : [...prev.services, sId]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert('Please enter client name');
    saveClient(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <h2 className="text-base font-bold text-white">
            {clientToEdit ? 'Edit Client Profile' : 'Onboard New Agency Client'}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 font-bold block mb-1">Company / Business Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Apex Health Clinic"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold block mb-1">Brand Handle / Tag</label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                placeholder="e.g. @ApexHealth"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-400 font-bold block mb-1">Contact Person</label>
              <input
                type="text"
                value={form.contactPerson}
                onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                placeholder="Dr. Vivek"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold block mb-1">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="contact@brand.com"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold block mb-1">Phone Number</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-400 font-bold block mb-1">Industry</label>
              <input
                type="text"
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                placeholder="Fitness, Real Estate..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold block mb-1">Monthly Retainer (₹)</label>
              <input
                type="number"
                value={form.monthlyRetainer}
                onChange={(e) => setForm({ ...form, monthlyRetainer: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold block mb-1">Client Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Onboarding">Onboarding</option>
                <option value="Paused">Paused</option>
              </select>
            </div>
          </div>

          {/* Enrolled Services Multi-Select Checkboxes */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-slate-300 font-bold block">
              Enrolled Services (Konsi Services Le Rakhi He):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {serviceCategories.map(s => {
                const isSelected = form.services?.includes(s.id);
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => toggleService(s.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                      isSelected 
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold' 
                        : 'bg-slate-800/40 border-slate-700 text-slate-400'
                    }`}
                  >
                    <span>{s.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Assigned Specialists from 25-team */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-slate-300 font-bold block">
              Assign Team Specialists (Kisko Konsi Service Ke Liye Assign Kiya Gaya He):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 text-[11px] block">Lead Video Editor:</label>
                <select
                  value={form.assignees?.videoEditing}
                  onChange={(e) => setForm({ ...form, assignees: { ...form.assignees, videoEditing: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
                >
                  {teamMembers.filter(m => m.department === 'Video Editing').map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-[11px] block">Shooting / DoP Lead:</label>
                <select
                  value={form.assignees?.shooting}
                  onChange={(e) => setForm({ ...form, assignees: { ...form.assignees, shooting: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
                >
                  {teamMembers.filter(m => m.department === 'Shooting Team').map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-[11px] block">Meta Ads & SMM Lead:</label>
                <select
                  value={form.assignees?.smm}
                  onChange={(e) => setForm({ ...form, assignees: { ...form.assignees, smm: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
                >
                  {teamMembers.filter(m => m.department === 'Meta Ads & SMM').map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-[11px] block">AI & Creative Lead:</label>
                <select
                  value={form.assignees?.ai}
                  onChange={(e) => setForm({ ...form, assignees: { ...form.assignees, ai: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
                >
                  {teamMembers.filter(m => m.department === 'AI Content').map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Raw Media Cloud Drive */}
          <div className="pt-2 border-t border-slate-800">
            <label className="text-slate-300 font-bold block mb-1">
              Raw Data Cloud Storage Link (Google Drive / Dropbox / Frame.io):
            </label>
            <input
              type="url"
              value={form.rawDriveUrl}
              onChange={(e) => setForm({ ...form, rawDriveUrl: e.target.value })}
              placeholder="https://drive.google.com/drive/folders/..."
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30"
            >
              Save Client Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. Task / Deliverable Modal
export const TaskModal = ({ isOpen, onClose, taskToEdit }) => {
  const { clients, tasks, saveTask, teamMembers, serviceCategories } = useAgency();

  const [form, setForm] = useState({
    title: '',
    clientId: 'client-1',
    clientName: 'IronCore Fitness',
    service: 'video-editing',
    assignedTo: 'tm-6',
    scheduledDate: '2026-11-05',
    scheduledTime: '18:00',
    rawMediaUrl: '',
    outputUrl: '',
    status: 'In Progress',
    version: 'v1',
    priority: 'Medium'
  });

  useEffect(() => {
    if (taskToEdit) {
      setForm(taskToEdit);
    } else {
      setForm({
        title: '',
        clientId: clients[0]?.id || 'client-1',
        clientName: clients[0]?.name || 'Client',
        service: 'video-editing',
        assignedTo: 'tm-6',
        scheduledDate: new Date().toISOString().split('T')[0],
        scheduledTime: '17:00',
        rawMediaUrl: 'https://drive.google.com/drive/folders/raw-footage',
        outputUrl: '',
        status: 'In Progress',
        version: 'v1',
        priority: 'Medium'
      });
    }
  }, [taskToEdit, isOpen, clients]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert('Please enter deliverable title');
    const selectedClient = clients.find(c => c.id === form.clientId);
    saveTask({
      ...form,
      clientName: selectedClient ? selectedClient.name : form.clientName
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <h2 className="text-base font-bold text-white">
            {taskToEdit ? 'Edit Deliverable' : 'Create New Deliverable / Reel Task'}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="text-slate-400 font-bold block mb-1">Deliverable Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. 30s Viral Hook Reel #15 or Black Friday Carousel"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 font-bold block mb-1">Client</label>
              <select
                value={form.clientId}
                onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              >
                {clients.slice(0, 50).map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-bold block mb-1">Service Type</label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              >
                {serviceCategories.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 font-bold block mb-1">Scheduled Publish Date</label>
              <input
                type="date"
                value={form.scheduledDate}
                onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold block mb-1">Scheduled Time Slot</label>
              <input
                type="time"
                value={form.scheduledTime}
                onChange={(e) => setForm({ ...form, scheduledTime: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 font-bold block mb-1">Assigned Specialist</label>
              <select
                value={form.assignedTo}
                onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              >
                {teamMembers.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.department})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-bold block mb-1">Pipeline Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
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
            <label className="text-slate-400 font-bold block mb-1">Raw Footage / Media Input Link</label>
            <input
              type="url"
              value={form.rawMediaUrl}
              onChange={(e) => setForm({ ...form, rawMediaUrl: e.target.value })}
              placeholder="https://drive.google.com/..."
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-400 font-bold block mb-1">Review Output / Master Link (Vimeo / Drive)</label>
            <input
              type="url"
              value={form.outputUrl}
              onChange={(e) => setForm({ ...form, outputUrl: e.target.value })}
              placeholder="https://vimeo.com/... or https://drive.google.com/..."
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30"
            >
              Save Deliverable
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 3. Shoot Modal
export const ShootModal = ({ isOpen, onClose }) => {
  const { clients, saveShoot, teamMembers } = useAgency();

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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert('Please enter shoot title');
    const cl = clients.find(c => c.id === form.clientId);
    saveShoot({
      ...form,
      clientName: cl ? cl.name : 'Client'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <h2 className="text-base font-bold text-white">Schedule Video Shoot</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="text-slate-400 font-bold block mb-1">Shoot Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Brand Anthem & Product Showcase Shoot"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-400 font-bold block mb-1">Client</label>
            <select
              value={form.clientId}
              onChange={(e) => setForm({ ...form, clientId: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            >
              {clients.slice(0, 50).map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-400 font-bold block mb-1">Shoot Date</label>
              <input
                type="date"
                value={form.shootDate}
                onChange={(e) => setForm({ ...form, shootDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold block mb-1">Call Time</label>
              <input
                type="text"
                value={form.callTime}
                onChange={(e) => setForm({ ...form, callTime: e.target.value })}
                placeholder="09:00 AM"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold block mb-1">Wrap Time</label>
              <input
                type="text"
                value={form.wrapTime}
                onChange={(e) => setForm({ ...form, wrapTime: e.target.value })}
                placeholder="04:00 PM"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 font-bold block mb-1">Location / Studio Address</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Studio 9, Andheri West, Mumbai"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-400 font-bold block mb-1">Concept / Shotlist Document Link</label>
            <input
              type="url"
              value={form.briefUrl}
              onChange={(e) => setForm({ ...form, briefUrl: e.target.value })}
              placeholder="https://docs.google.com/document/d/..."
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg shadow-amber-600/30"
            >
              Schedule Shoot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 4. Meta Ad Modal
export const AdModal = ({ isOpen, onClose }) => {
  const { clients, saveAd, teamMembers } = useAgency();

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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.campaignName.trim()) return alert('Please enter campaign name');
    const cl = clients.find(c => c.id === form.clientId);
    saveAd({
      ...form,
      clientName: cl ? cl.name : 'Client'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <h2 className="text-base font-bold text-white">Create Meta Ads Campaign</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="text-slate-400 font-bold block mb-1">Campaign Name *</label>
            <input
              type="text"
              required
              value={form.campaignName}
              onChange={(e) => setForm({ ...form, campaignName: e.target.value })}
              placeholder="e.g. Retargeting Funnel - Festive Offer"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-400 font-bold block mb-1">Client</label>
            <select
              value={form.clientId}
              onChange={(e) => setForm({ ...form, clientId: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            >
              {clients.slice(0, 50).map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 font-bold block mb-1">Daily Budget</label>
              <input
                type="text"
                value={form.dailyBudget}
                onChange={(e) => setForm({ ...form, dailyBudget: e.target.value })}
                placeholder="₹4,000 / day"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold block mb-1">Media Buyer (Lead)</label>
              <select
                value={form.assignedTo}
                onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              >
                {teamMembers.filter(m => m.department === 'Meta Ads & SMM').map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-400 font-bold block mb-1">Ad Creatives Drive Link</label>
            <input
              type="url"
              value={form.adCreativesUrl}
              onChange={(e) => setForm({ ...form, adCreativesUrl: e.target.value })}
              placeholder="https://drive.google.com/..."
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30"
            >
              Launch Campaign Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
