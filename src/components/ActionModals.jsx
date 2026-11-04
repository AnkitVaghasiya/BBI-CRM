import React, { useState, useEffect } from 'react';
import { useAgency } from '../context/AgencyContext';
import { X, Check, Trash2, AlertCircle, Info } from 'lucide-react';

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
    if (!form.name.trim()) return alert('कृपया टीम मेंबर का नाम दर्ज करें (Please enter member name)');
    saveTeamMember(form);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`क्या आप सच में ${form.name} को टीम डायरेक्टरी से हटाना चाहते हैं?`)) {
      deleteTeamMember(form.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>{memberToEdit ? '✏️ टीम मेंबर एडिट करें' : '➕ नया टीम मेंबर जोड़ें'}</span>
              <span className="text-xs text-slate-400 font-normal">({memberToEdit ? 'Edit Member' : 'Add Team Member'})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">नाम, पद, डिपार्टमेंट, फोन और ईमेल को आसानी से अपडेट करें।</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Name & Avatar */}
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-3">
              <label className="text-slate-300 font-semibold block mb-1">पूरा नाम (Full Name) *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="उदा. राहुल शर्मा (Rahul Sharma)"
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">अवतार (Icon)</label>
              <input
                type="text"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-center text-base focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Department & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">डिपार्टमेंट (Department)</label>
              <select
                value={form.department}
                onChange={(e) => {
                  const newDept = e.target.value;
                  setForm({ ...form, department: newDept, avatar: departmentAvatars[newDept] || '👤' });
                }}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Management">Management (प्रबंधन)</option>
                <option value="Video Editing">Video Editing (वीडियो एडिटिंग)</option>
                <option value="AI Content">AI Content (एआई व प्रॉम्प्ट्स)</option>
                <option value="Meta Ads & SMM">Meta Ads & SMM (मेटा ऐड्स व सोशल)</option>
                <option value="Shooting Team">Shooting Team (शूटिंग व कैमरा क्रू)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">पद / रोल (Role / Designation)</label>
              <input
                type="text"
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="उदा. Lead Video Editor, Drone Operator..."
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">ईमेल पता (Email Address)</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="rahul@agency.com"
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">फ़ोन / व्हाट्सएप (Phone Number)</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 00000"
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            {memberToEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/30 rounded-xl font-medium flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>हटाएं (Delete)</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition"
              >
                रद्द करें (Cancel)
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition"
              >
                {memberToEdit ? 'अपडेट करें (Save Changes)' : 'सेव करें (Add Member)'}
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
    if (!form.name.trim()) return alert('कृपया क्लाइंट का नाम दर्ज करें (Please enter client name)');
    saveClient(form);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`चेतावनी: क्या आप सच में क्लाइंट "${form.name}" और उसके सभी रिकॉर्ड डिलीट करना चाहते हैं?`)) {
      deleteClient(form.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>{clientToEdit ? '✏️ क्लाइंट प्रोफाइल एडिट करें' : '➕ नया क्लाइंट ऑनबोर्ड करें'}</span>
              <span className="text-xs text-slate-400 font-normal">({clientToEdit ? 'Edit Client Profile' : 'Onboard Client'})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">सर्विस, असाइन्ड टीम, रिटेनर फीस और रॉ डेटा ड्राइव लिंक मैनेज करें।</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">कंपनी / ब्रांड का नाम (Business Name) *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="उदा. Apex Dental Clinic / IronCore Gym"
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">सोशल हैंडल / टैग (Handle / Short Tag)</label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                placeholder="@ApexDental / @IronCore"
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">संपर्क व्यक्ति (Contact Person)</label>
              <input
                type="text"
                value={form.contactPerson}
                onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                placeholder="उदा. डॉ. विवेक / मिस्टर कपूर"
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">ईमेल (Email Address)</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="client@brand.com"
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">फ़ोन नंबर (Phone / WhatsApp)</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98200 00000"
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">इंडस्ट्री (Industry)</label>
              <input
                type="text"
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                placeholder="उदा. Fitness, Real Estate, Fashion..."
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">मासिक फीस (Monthly Retainer ₹)</label>
              <input
                type="number"
                value={form.monthlyRetainer}
                onChange={(e) => setForm({ ...form, monthlyRetainer: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">स्टेटस (Status)</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Active">Active (सक्रिय)</option>
                <option value="Onboarding">Onboarding (शुरुआती सेटअप)</option>
                <option value="Paused">Paused (रोका हुआ)</option>
              </select>
            </div>
          </div>

          {/* Services Enrolled */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-bold block">
                क्लाइंट ने कौन-सी सर्विसेज़ ले रखी हैं? (Select Subscribed Services):
              </label>
              <span className="text-[11px] text-slate-400">क्लिक करके चालू/बंद करें</span>
            </div>
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
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold' 
                        : 'bg-slate-800/50 border-slate-700/70 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{s.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Assigned Specialists */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-slate-300 font-bold block">
              किस सर्विस के लिए किस टीम मेंबर को असाइन किया गया है? (Assignees):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 text-[11px] block mb-1">लीड वीडियो एडिटर (Video Editor):</label>
                <select
                  value={form.assignees?.videoEditing}
                  onChange={(e) => setForm({ ...form, assignees: { ...form.assignees, videoEditing: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
                >
                  {teamMembers.filter(m => m.department === 'Video Editing').map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-[11px] block mb-1">शूटिंग / कैमरा लीड (Shooting Crew):</label>
                <select
                  value={form.assignees?.shooting}
                  onChange={(e) => setForm({ ...form, assignees: { ...form.assignees, shooting: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
                >
                  {teamMembers.filter(m => m.department === 'Shooting Team').map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-[11px] block mb-1">मेटा ऐड्स व सोशल मार्केटर (Ads / SMM):</label>
                <select
                  value={form.assignees?.smm}
                  onChange={(e) => setForm({ ...form, assignees: { ...form.assignees, smm: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
                >
                  {teamMembers.filter(m => m.department === 'Meta Ads & SMM').map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-[11px] block mb-1">एआई व विज़ुअल्स स्पेशलिस्ट (AI Content):</label>
                <select
                  value={form.assignees?.ai}
                  onChange={(e) => setForm({ ...form, assignees: { ...form.assignees, ai: e.target.value } })}
                  className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
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
              रॉ डेटा क्लाउड ड्राइव लिंक (Google Drive / Dropbox / Frame.io):
            </label>
            <input
              type="url"
              value={form.rawDriveUrl}
              onChange={(e) => setForm({ ...form, rawDriveUrl: e.target.value })}
              placeholder="https://drive.google.com/drive/folders/..."
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">यहाँ क्लाइंट का फुटेज फोल्डर लिंक रखें, एडिटर इसे सीधे खोल सकेंगे।</p>
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            {clientToEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/30 rounded-xl font-medium flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>डिलीट करें (Delete)</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition"
              >
                रद्द करें (Cancel)
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition"
              >
                {clientToEdit ? 'अपडेट करें (Save Changes)' : 'सेव करें (Onboard Client)'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// 3. Task / Deliverable Modal (Full Edit & Add)
export const TaskModal = ({ isOpen, onClose, taskToEdit }) => {
  const { clients, saveTask, deleteTask, teamMembers, serviceCategories } = useAgency();

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
    priority: 'Medium',
    clientFeedback: ''
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
    if (!form.title.trim()) return alert('कृपया काम/रील का टाइटल दर्ज करें (Please enter title)');
    const selectedClient = clients.find(c => c.id === form.clientId);
    saveTask({
      ...form,
      clientName: selectedClient ? selectedClient.name : form.clientName
    });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`क्या आप सच में "${form.title}" टास्क को हटाना चाहते हैं?`)) {
      deleteTask(form.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>{taskToEdit ? '✏️ टास्क / रील एडिट करें' : '➕ नया टास्क / रील जोड़ें'}</span>
              <span className="text-xs text-slate-400 font-normal">({taskToEdit ? 'Edit Task' : 'Add Deliverable'})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">तारीख, टाइम स्लॉट, स्टेटस, रॉ फुटेज और रिव्यू लिंक अपडेट करें।</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">टास्क / रील का नाम (Title) *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="उदा. 30s ट्रांसफॉर्मेशन हुक रील #15 / ब्लैक फ्राइडे कैरोसेल"
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">क्लाइंट चुनें (Select Client)</label>
              <select
                value={form.clientId}
                onChange={(e) => {
                  const cId = e.target.value;
                  const cl = clients.find(c => c.id === cId);
                  setForm({ ...form, clientId: cId, clientName: cl ? cl.name : form.clientName });
                }}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              >
                {clients.slice(0, 60).map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">सर्विस प्रकार (Service Type)</label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              >
                {serviceCategories.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">शेड्यूल तारीख (Scheduled Date)</label>
              <input
                type="date"
                value={form.scheduledDate}
                onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">टाइम स्लॉट (Scheduled Time Slot)</label>
              <input
                type="time"
                value={form.scheduledTime}
                onChange={(e) => setForm({ ...form, scheduledTime: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">असाइन किया गया सदस्य (Assigned Specialist)</label>
              <select
                value={form.assignedTo}
                onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              >
                {teamMembers.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.department})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">पाइपलाइन स्टेटस (Pipeline Status)</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              >
                <option value="Raw Data Ingest">Raw Data Ingest (रॉ फुटेज प्राप्त)</option>
                <option value="In Progress">In Progress (एडिटिंग चालू)</option>
                <option value="Internal QC">Internal QC (आंतरिक जांच)</option>
                <option value="Client Approval Pending">Client Approval Pending (क्लाइंट अप्रूवल पेंडिंग)</option>
                <option value="Revision Requested">Revision Requested (रिविज़न माँगा गया)</option>
                <option value="Approved">Approved (पास / अप्रूव्ड)</option>
                <option value="Scheduled">Scheduled (शेड्यूल किया गया)</option>
                <option value="Posted">Posted (लाइव पोस्टेड)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">रॉ फुटेज / मीडिया इनपुट लिंक (Raw Data Link)</label>
            <input
              type="url"
              value={form.rawMediaUrl}
              onChange={(e) => setForm({ ...form, rawMediaUrl: e.target.value })}
              placeholder="https://drive.google.com/..."
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">रिव्यू आउटपुट लिंक (Review Master Link - Vimeo/Drive)</label>
            <input
              type="url"
              value={form.outputUrl}
              onChange={(e) => setForm({ ...form, outputUrl: e.target.value })}
              placeholder="https://vimeo.com/... या https://drive.google.com/..."
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {form.clientFeedback && (
            <div>
              <label className="text-slate-300 font-semibold block mb-1">क्लाइंट फीडबैक / रिविज़न नोट्स (Client Feedback)</label>
              <textarea
                rows={2}
                value={form.clientFeedback}
                onChange={(e) => setForm({ ...form, clientFeedback: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
          )}

          {/* Footer buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            {taskToEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/30 rounded-xl font-medium flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>टास्क हटाएं (Delete)</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition"
              >
                रद्द करें (Cancel)
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition"
              >
                {taskToEdit ? 'अपडेट करें (Save Changes)' : 'टास्क जोड़ें (Add Deliverable)'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// 4. Shoot Modal (Full Edit & Add)
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
    if (!form.title.trim()) return alert('कृपया शूट का टाइटल दर्ज करें (Please enter shoot title)');
    const cl = clients.find(c => c.id === form.clientId);
    saveShoot({
      ...form,
      clientName: cl ? cl.name : 'Client'
    });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`क्या आप सच में "${form.title}" शूट को हटाना चाहते हैं?`)) {
      deleteShoot(form.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>{shootToEdit ? '✏️ वीडियो शूट एडिट करें' : '➕ नया वीडियो शूट शेड्यूल करें'}</span>
              <span className="text-xs text-slate-400 font-normal">({shootToEdit ? 'Edit Shoot' : 'Schedule Shoot'})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">कॉल टाइम, लोकेशन, क्रू टीम और इक्विपमेंट मैनेज करें।</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">शूट का नाम (Shoot Title) *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="उदा. ब्रांड एंथम व प्रोडक्ट रील शूट"
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">क्लाइंट चुनें (Client)</label>
              <select
                value={form.clientId}
                onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              >
                {clients.slice(0, 60).map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">शूट स्टेटस (Status)</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              >
                <option value="Confirmed">Confirmed (कन्फर्म्ड)</option>
                <option value="Equipment Prep">Equipment Prep (कैमरा तैयारी)</option>
                <option value="Shooting in Progress">Shooting Now (शूट चालू)</option>
                <option value="Footage Offloaded">Footage Offloaded (डेटा बैकअप)</option>
                <option value="Completed">Completed (पूरा हुआ)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">शूट तारीख (Date)</label>
              <input
                type="date"
                value={form.shootDate}
                onChange={(e) => setForm({ ...form, shootDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">कॉल टाइम (Call Time)</label>
              <input
                type="text"
                value={form.callTime}
                onChange={(e) => setForm({ ...form, callTime: e.target.value })}
                placeholder="09:00 AM"
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">रैप टाइम (Wrap Time)</label>
              <input
                type="text"
                value={form.wrapTime}
                onChange={(e) => setForm({ ...form, wrapTime: e.target.value })}
                placeholder="04:00 PM"
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">लोकेशन / स्टूडियो का पता (Studio / Location)</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="उदा. स्टूडियो 9, अंधेरी वेस्ट, मुंबई"
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">शॉटलिस्ट / कॉन्सेप्ट ब्रीफ लिंक (Shotlist Doc Link)</label>
            <input
              type="url"
              value={form.briefUrl}
              onChange={(e) => setForm({ ...form, briefUrl: e.target.value })}
              placeholder="https://docs.google.com/document/d/..."
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            {shootToEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/30 rounded-xl font-medium flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>शूट हटाएं (Delete)</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition"
              >
                रद्द करें (Cancel)
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg shadow-amber-600/30 transition"
              >
                {shootToEdit ? 'अपडेट करें (Save Changes)' : 'शेड्यूल करें (Confirm Shoot)'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// 5. Meta Ad Modal (Full Edit & Add)
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
    if (!form.campaignName.trim()) return alert('कृपया कैंपेन का नाम दर्ज करें (Please enter campaign name)');
    const cl = clients.find(c => c.id === form.clientId);
    saveAd({
      ...form,
      clientName: cl ? cl.name : 'Client'
    });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`क्या आप सच में "${form.campaignName}" ऐड कैंपेन को हटाना चाहते हैं?`)) {
      deleteAd(form.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>{adToEdit ? '✏️ मेटा ऐड कैंपेन एडिट करें' : '➕ नया ऐड कैंपेन जोड़ें'}</span>
              <span className="text-xs text-slate-400 font-normal">({adToEdit ? 'Edit Campaign' : 'Create Campaign'})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">बजट, प्लेटफॉर्म, मीडिया बायर और क्रिएटिव लिंक अपडेट करें।</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">कैंपेन का नाम (Campaign Name) *</label>
            <input
              type="text"
              required
              value={form.campaignName}
              onChange={(e) => setForm({ ...form, campaignName: e.target.value })}
              placeholder="उदा. न्यू ईयर लीड जनरेशन फनल"
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">क्लाइंट (Client)</label>
              <select
                value={form.clientId}
                onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              >
                {clients.slice(0, 60).map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">प्लेटफ़ॉर्म (Platform)</label>
              <input
                type="text"
                value={form.platform}
                onChange={(e) => setForm({ ...form, platform: e.target.value })}
                placeholder="Instagram & Facebook Ads"
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">डेली बजट (Daily Budget)</label>
              <input
                type="text"
                value={form.dailyBudget}
                onChange={(e) => setForm({ ...form, dailyBudget: e.target.value })}
                placeholder="₹4,000 / day"
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">मीडिया बायर (Media Buyer)</label>
              <select
                value={form.assignedTo}
                onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              >
                {teamMembers.filter(m => m.department === 'Meta Ads & SMM').map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">लीड्स (Leads Generated)</label>
              <input
                type="number"
                value={form.leadsGenerated}
                onChange={(e) => setForm({ ...form, leadsGenerated: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">कॉस्ट पर लीड (CPL)</label>
              <input
                type="text"
                value={form.cpl}
                onChange={(e) => setForm({ ...form, cpl: e.target.value })}
                placeholder="₹95"
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">ROAS</label>
              <input
                type="text"
                value={form.roas}
                onChange={(e) => setForm({ ...form, roas: e.target.value })}
                placeholder="4.2x"
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">ऐड क्रिएटिव्स ड्राइव लिंक (Ad Creatives URL)</label>
            <input
              type="url"
              value={form.adCreativesUrl}
              onChange={(e) => setForm({ ...form, adCreativesUrl: e.target.value })}
              placeholder="https://drive.google.com/..."
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">कैंपेन स्टेटस (Campaign Status)</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none"
            >
              <option value="In Planning">In Planning (प्लानिंग में)</option>
              <option value="Creative Pending">Creative Pending (क्रिएटिव बाकी)</option>
              <option value="In Review">In Review (रिव्यू में)</option>
              <option value="Active & Scaling">Active & Scaling (लाइव व सक्रिय)</option>
              <option value="Paused">Paused (रोका गया)</option>
            </select>
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            {adToEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/30 rounded-xl font-medium flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>कैंपेन हटाएं (Delete)</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition"
              >
                रद्द करें (Cancel)
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition"
              >
                {adToEdit ? 'अपडेट करें (Save Changes)' : 'लॉन्च करें (Save Campaign)'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
