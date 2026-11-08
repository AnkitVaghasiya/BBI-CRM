import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  TEAM_MEMBERS, 
  SERVICE_CATEGORIES, 
  generateClients, 
  INITIAL_TASKS, 
  INITIAL_SHOOTS, 
  INITIAL_ADS, 
  INITIAL_CHATS,
  INITIAL_DAILY_LOGS,
  REVISION_REASONS,
  DELIVERABLE_TYPES,
  CHANGE_REASONS,
  INITIAL_PARTNER_AGENCIES,
  INITIAL_AUDIT_LOGS,
  SOCIAL_PLATFORMS,
  generateClientSocialChannels,
  generateClientAiPreferences
} from '../data/seedData';
import {
  hashPassword,
  sanitizeInput,
  generateSecureToken,
  validatePasswordStrength,
  checkRateLimit,
  recordFailedLogin,
  recordSuccessfulLogin,
  runSecurityAudit
} from '../utils/security';


const AgencyContext = createContext();

export const AgencyProvider = ({ children }) => {
  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('agency_ui_theme') || 'light';
  });

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('agency_ui_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-slate-950 text-slate-100 antialiased min-h-screen';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-slate-50 text-slate-900 antialiased min-h-screen';
    }
  }, [theme]);

  // Current active user/role view
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('agency_current_user');
    return saved ? JSON.parse(saved) : {
      role: 'management',
      name: 'Neha Gupta (Admin)',
      id: 'tm-1',
      clientId: null
    };
  });


  // ==========================================
  // USERS & CREDENTIALS STATE (Encrypted Passwords)
  // ==========================================
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('agency_users_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_USERS;
  });

  useEffect(() => {
    localStorage.setItem('agency_users_v3', JSON.stringify(users));
  }, [users]);

  // Is Fresh Workspace Flag (clean slate without dummy records)
  const [isFreshWorkspace, setIsFreshWorkspace] = useState(() => {
    return localStorage.getItem('agency_fresh_workspace') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('agency_fresh_workspace', isFreshWorkspace.toString());
  }, [isFreshWorkspace]);

  // ==========================================
  // HRMS STATES: Attendance, Payroll, Leaves, Documents
  // ==========================================
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('agency_attendance_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ATTENDANCE;
  });

  useEffect(() => {
    localStorage.setItem('agency_attendance_v3', JSON.stringify(attendance));
  }, [attendance]);

  const [payroll, setPayroll] = useState(() => {
    const saved = localStorage.getItem('agency_payroll_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PAYROLL;
  });

  useEffect(() => {
    localStorage.setItem('agency_payroll_v3', JSON.stringify(payroll));
  }, [payroll]);

  const [leaves, setLeaves] = useState(() => {
    const saved = localStorage.getItem('agency_leaves_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_LEAVES;
  });

  useEffect(() => {
    localStorage.setItem('agency_leaves_v3', JSON.stringify(leaves));
  }, [leaves]);

  const [hrDocuments, setHrDocuments] = useState(() => {
    const saved = localStorage.getItem('agency_hr_documents_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_HR_DOCUMENTS;
  });

  useEffect(() => {
    localStorage.setItem('agency_hr_documents_v3', JSON.stringify(hrDocuments));
  }, [hrDocuments]);

  // Database States with LocalStorage fallback (v3 to incorporate full Quota & Revision schema)
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('agency_clients_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((c, idx) => ({
          ...c,
          socialChannels: c.socialChannels || generateClientSocialChannels(c.name, c.brand, idx + 1),
          aiPreferences: c.aiPreferences || generateClientAiPreferences(c.name, c.industry || 'Business', c.brand)
        }));
      } catch (e) { console.error(e); }
    }
    return generateClients();
  });

  const [teamMembers, setTeamMembers] = useState(() => {
    const saved = localStorage.getItem('agency_team_members_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((m, idx) => ({
          ...m,
          currentDuties: m.currentDuties || 'Standard agency operations and deliverable production.',
          assignedScope: m.assignedScope || 'Execute scheduled daily quota and resolve active revisions.',
          toolstack: m.toolstack || ['Adobe Premiere Pro', 'CapCut Pro'],
          assignedClientIds: m.assignedClientIds || ['client-1'],
          lastUpdated: m.lastUpdated || '2026-11-08 11:30',
          lastChangeReason: m.lastChangeReason || 'Initial System Onboarding'
        }));
      } catch (e) { console.error(e); }
    }
    return TEAM_MEMBERS;
  });

  const [partnerAgencies, setPartnerAgencies] = useState(() => {
    const saved = localStorage.getItem('agency_partner_agencies_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PARTNER_AGENCIES;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('agency_audit_logs_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_AUDIT_LOGS;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('agency_tasks_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_TASKS;
  });

  const [dailyLogs, setDailyLogs] = useState(() => {
    const saved = localStorage.getItem('agency_daily_logs_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_DAILY_LOGS;
  });

  const [shoots, setShoots] = useState(() => {
    const saved = localStorage.getItem('agency_shoots_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_SHOOTS;
  });

  const [ads, setAds] = useState(() => {
    const saved = localStorage.getItem('agency_ads_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ADS;
  });

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('agency_chats_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CHATS;
  });

  // Active view navigation
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClientId, setSelectedClientId] = useState('client-1');

  // Integrations Hub state
  const [integrations, setIntegrations] = useState(() => {
    const saved = localStorage.getItem('agency_integrations');
    return saved ? JSON.parse(saved) : {
      meta: {
        appId: '396533460853002',
        appSecret: '••••••••••••••••••••••••••••••••',
        adAccountId: 'act_1606985407825083',
        accessToken: 'EAAG...[Meta Verified System User Token]',
        status: 'Connected',
        lastSync: 'Just now'
      },
      ai: {
        provider: 'gemini',
        model: 'gemini-2.0-flash',
        apiKey: 'System Antigravity AI Engine (Active)',
        status: 'Ready'
      },
      whatsapp: {
        phoneId: '109827364521',
        businessId: '396533460853002',
        status: 'Connected',
        slaMinutes: 3
      },
      google: {
        driveIntake: 'Enabled',
        youtubeDataApi: 'Connected',
        status: 'Connected'
      },
      brightbean: {
        endpoint: 'http://127.0.0.1:8000',
        status: 'Connected'
      },
      grafana: {
        url: 'http://127.0.0.1:3000/d/bbi-weekly-health/brainbinary-7c-weekly-account-health',
        status: 'Online'
      }
    };
  });

  const saveIntegrations = (newIntegrations) => {
    setIntegrations(newIntegrations);
    localStorage.setItem('agency_integrations', JSON.stringify(newIntegrations));
  };

  const syncMetaAds = () => {
    setAds(prev => prev.map(ad => {
      const randomExtraLeads = Math.floor(Math.random() * 3);
      return {
        ...ad,
        leadsGenerated: (Number(ad.leadsGenerated) || 0) + randomExtraLeads,
        status: 'Active',
        lastSynced: new Date().toLocaleTimeString()
      };
    }));
  };

  // Firebase Config State
  const [firebaseConfig, setFirebaseConfig] = useState(() => {
    const saved = localStorage.getItem('agency_firebase_config');
    return saved ? JSON.parse(saved) : {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      isEnabled: false
    };
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('agency_clients_v3', JSON.stringify(clients));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('agency_team_members_v3', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('agency_partner_agencies_v3', JSON.stringify(partnerAgencies));
  }, [partnerAgencies]);

  useEffect(() => {
    localStorage.setItem('agency_audit_logs_v3', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('agency_tasks_v3', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('agency_daily_logs_v3', JSON.stringify(dailyLogs));
  }, [dailyLogs]);

  useEffect(() => {
    localStorage.setItem('agency_shoots_v3', JSON.stringify(shoots));
  }, [shoots]);

  useEffect(() => {
    localStorage.setItem('agency_ads_v3', JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    localStorage.setItem('agency_chats_v3', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('agency_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('agency_firebase_config', JSON.stringify(firebaseConfig));
  }, [firebaseConfig]);

  // Helper format timestamp: "08/11/2026, 01:15 PM"
  const getCurrentTimestamp = () => {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, '0');
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const y = now.getFullYear();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strHours = String(hours).padStart(2, '0');
    return `${d}/${m}/${y}, ${strHours}:${minutes} ${ampm}`;
  };

  // Switch Role / Mode
  const switchRole = (roleType, customClient = null) => {
    if (roleType === 'client') {
      const targetClient = customClient || clients[0];
      setCurrentUser({
        role: 'client',
        name: `${targetClient.name} (Client)`,
        id: targetClient.id,
        clientId: targetClient.id
      });
      setSelectedClientId(targetClient.id);
      setActiveTab('approvals');
    } else if (roleType === 'video-editing') {
      setCurrentUser({
        role: 'video-editing',
        name: 'Rahul Sharma (Lead Editor)',
        id: 'tm-6',
        clientId: null
      });
      setActiveTab('departments');
    } else if (roleType === 'shooting-team') {
      setCurrentUser({
        role: 'shooting-team',
        name: 'Vikram Rathore (DoP)',
        id: 'tm-21',
        clientId: null
      });
      setActiveTab('departments');
    } else if (roleType === 'ai-content') {
      setCurrentUser({
        role: 'ai-content',
        name: 'Sameer Khan (AI Lead)',
        id: 'tm-11',
        clientId: null
      });
      setActiveTab('departments');
    } else if (roleType === 'meta-ads') {
      setCurrentUser({
        role: 'meta-ads',
        name: 'Aryan Malhotra (Ads Lead)',
        id: 'tm-16',
        clientId: null
      });
      setActiveTab('departments');
    } else {
      setCurrentUser({
        role: 'management',
        name: 'Neha Gupta (Admin)',
        id: 'tm-1',
        clientId: null
      });
    }
  };

  // Audit Trail Logger Helper
  const addAuditLog = (entityType, entityId, entityName, action, changeReason, changeNotes, changedBy) => {
    const timestamp = getCurrentTimestamp();
    const newLog = {
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp,
      entityType,
      entityId,
      entityName,
      action,
      changeReason: changeReason || 'Routine Profile & Scope Update',
      changeNotes: changeNotes || 'No specific notes provided',
      changedBy: changedBy || currentUser.name || 'Administrator'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // 1. Client CRUD with Reason Tracking
  const saveClient = (clientData, changeReason = 'Client Reassignment & Workload Rebalancing', changeNotes = '') => {
    const timestamp = getCurrentTimestamp();
    const isNew = !clients.some(c => c.id === clientData.id);

    setClients(prev => {
      const index = prev.findIndex(c => c.id === clientData.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { 
          ...updated[index], 
          ...clientData,
          lastUpdated: timestamp,
          lastChangeReason: changeReason
        };
        return updated;
      } else {
        const newClient = {
          ...clientData,
          id: clientData.id || `client-${Date.now()}`,
          quotas: clientData.quotas || {
            videos: { target: 16, completed: 0, inProgress: 0 },
            graphics: { target: 12, completed: 0, inProgress: 0 },
            posts: { target: 20, completed: 0, inProgress: 0 },
            scripts: { target: 20, completed: 0, inProgress: 0 },
            shoots: { target: 2, completed: 0, inProgress: 0 },
            metaCampaigns: { target: 4, completed: 0, inProgress: 0 }
          },
          createdAt: new Date().toISOString().split('T')[0],
          lastUpdated: timestamp,
          lastChangeReason: changeReason
        };
        return [newClient, ...prev];
      }
    });

    addAuditLog(
      'Client Account',
      clientData.id || 'New',
      clientData.name,
      isNew ? 'Onboarded New Client' : 'Updated Client Details & Retainer',
      changeReason,
      changeNotes || `Updated services, quotas and assignees for ${clientData.name}`
    );
  };

  const deleteClient = (clientId, changeReason = 'Client Contract Completion') => {
    const client = clients.find(c => c.id === clientId);
    setClients(prev => prev.filter(c => c.id !== clientId));
    setTasks(prev => prev.filter(t => t.clientId !== clientId));
    setShoots(prev => prev.filter(s => s.clientId !== clientId));
    setAds(prev => prev.filter(a => a.clientId !== clientId));
    setDailyLogs(prev => prev.filter(l => l.clientId !== clientId));

    addAuditLog(
      'Client Account',
      clientId,
      client ? client.name : clientId,
      'Archived Client Account',
      changeReason,
      'Client removed from active roster.'
    );
  };

  // Update specific deliverable quota for a client
  const updateClientQuota = (clientId, quotaCategory, field, value) => {
    setClients(prev => prev.map(c => {
      if (c.id === clientId) {
        const currentQuotas = c.quotas || {
          videos: { target: 16, completed: 0, inProgress: 0 },
          graphics: { target: 12, completed: 0, inProgress: 0 },
          posts: { target: 20, completed: 0, inProgress: 0 },
          scripts: { target: 20, completed: 0, inProgress: 0 },
          shoots: { target: 2, completed: 0, inProgress: 0 },
          metaCampaigns: { target: 4, completed: 0, inProgress: 0 }
        };
        const catObj = currentQuotas[quotaCategory] || { target: 0, completed: 0, inProgress: 0 };
        return {
          ...c,
          quotas: {
            ...currentQuotas,
            [quotaCategory]: {
              ...catObj,
              [field]: Number(value)
            }
          }
        };
      }
      return c;
    }));
  };

  // Update client social media channels
  const updateClientChannels = (clientId, updatedChannels) => {
    setClients(prev => prev.map(c => {
      if (c.id === clientId) {
        return {
          ...c,
          socialChannels: {
            ...(c.socialChannels || {}),
            ...updatedChannels
          }
        };
      }
      return c;
    }));
  };

  // Toggle whether agency is currently actively managing this platform for the client
  const toggleClientChannelActive = (clientId, platformKey, isActive) => {
    setClients(prev => prev.map(c => {
      if (c.id === clientId) {
        const currentPlatform = c.socialChannels?.[platformKey] || {};
        const newStatus = isActive !== undefined ? isActive : !currentPlatform.active;
        return {
          ...c,
          socialChannels: {
            ...(c.socialChannels || {}),
            [platformKey]: {
              ...currentPlatform,
              active: newStatus
            }
          }
        };
      }
      return c;
    }));
  };

  // Specific Meta Ads connector for a client
  const updateClientMetaAds = (clientId, metaData) => {
    setClients(prev => prev.map(c => {
      if (c.id === clientId) {
        const currentMeta = c.socialChannels?.meta || {};
        return {
          ...c,
          socialChannels: {
            ...(c.socialChannels || {}),
            meta: {
              ...currentMeta,
              ...metaData,
              lastSynced: getCurrentTimestamp()
            }
          }
        };
      }
      return c;
    }));
  };

  // Update client AI brand voice and model configuration
  const updateClientAiPreferences = (clientId, preferences) => {
    setClients(prev => prev.map(c => {
      if (c.id === clientId) {
        return {
          ...c,
          aiPreferences: {
            ...(c.aiPreferences || {}),
            ...preferences
          }
        };
      }
      return c;
    }));
  };

  // 2. Team Member / Editor CRUD with Reason Tracking
  const saveTeamMember = (memberData, changeReason = 'Role Promotion & Scope Expansion', changeNotes = '') => {
    const timestamp = getCurrentTimestamp();
    const isNew = !teamMembers.some(m => m.id === memberData.id);

    setTeamMembers(prev => {
      const index = prev.findIndex(m => m.id === memberData.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { 
          ...updated[index], 
          ...memberData,
          lastUpdated: timestamp,
          lastChangeReason: changeReason
        };
        return updated;
      } else {
        const newMember = {
          ...memberData,
          id: memberData.id || `tm-${Date.now()}`,
          activeTasks: 0,
          dailyTarget: memberData.dailyTarget || 2,
          monthlyDelivered: 0,
          currentDuties: memberData.currentDuties || 'Standard agency operations and deliverable production.',
          assignedScope: memberData.assignedScope || 'Execute scheduled daily quota and resolve active revisions.',
          toolstack: memberData.toolstack || ['Adobe Premiere Pro', 'CapCut Pro'],
          assignedClientIds: memberData.assignedClientIds || ['client-1'],
          lastUpdated: timestamp,
          lastChangeReason: changeReason
        };
        return [...prev, newMember];
      }
    });

    addAuditLog(
      'Editor / Employee',
      memberData.id || 'New',
      `${memberData.name} (${memberData.role || 'Staff'})`,
      isNew ? 'Added New Team Member' : 'Updated Role & Scope of Work',
      changeReason,
      changeNotes || `Duties: "${memberData.currentDuties || 'Standard'}" | Upcoming: "${memberData.assignedScope || 'Standard'}"`
    );
  };

  const deleteTeamMember = (memberId, changeReason = 'Employee Offboarding / Role Transfer') => {
    const member = teamMembers.find(m => m.id === memberId);
    setTeamMembers(prev => prev.filter(m => m.id !== memberId));

    addAuditLog(
      'Editor / Employee',
      memberId,
      member ? member.name : memberId,
      'Offboarded Team Member',
      changeReason,
      'Removed from active agency team directory.'
    );
  };

  // 2B. Partner Agencies & External Vendors CRUD with Reason Tracking
  const savePartnerAgency = (agencyData, changeReason = 'Partner Agency / Vendor Contract Update', changeNotes = '') => {
    const timestamp = getCurrentTimestamp();
    const isNew = !partnerAgencies.some(a => a.id === agencyData.id);

    setPartnerAgencies(prev => {
      const index = prev.findIndex(a => a.id === agencyData.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { 
          ...updated[index], 
          ...agencyData,
          lastUpdated: timestamp,
          lastChangeReason: changeReason
        };
        return updated;
      } else {
        const newAgency = {
          ...agencyData,
          id: agencyData.id || `agency-${Date.now()}`,
          status: agencyData.status || 'Active Partner',
          lastUpdated: timestamp,
          lastChangeReason: changeReason
        };
        return [...prev, newAgency];
      }
    });

    addAuditLog(
      'Partner Agency',
      agencyData.id || 'New',
      agencyData.name,
      isNew ? 'Added New Partner Agency' : 'Updated Partner Agency Scope & Retainer',
      changeReason,
      changeNotes || `Type: ${agencyData.type} | Contracted: ${agencyData.contractedDeliverables || 'N/A'}`
    );
  };

  const deletePartnerAgency = (agencyId, changeReason = 'Vendor Contract Termination') => {
    const agency = partnerAgencies.find(a => a.id === agencyId);
    setPartnerAgencies(prev => prev.filter(a => a.id !== agencyId));

    addAuditLog(
      'Partner Agency',
      agencyId,
      agency ? agency.name : agencyId,
      'Terminated Partner Agency',
      changeReason,
      'Vendor removed from active partner network.'
    );
  };

  // 3. Task CRUD & Revisions with Reason Categories
  const saveTask = (taskData) => {
    const timestamp = getCurrentTimestamp();
    setTasks(prev => {
      const index = prev.findIndex(t => t.id === taskData.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], ...taskData, lastUpdated: timestamp };
        return updated;
      } else {
        const newTask = {
          ...taskData,
          id: taskData.id || `task-${Date.now()}`,
          deliverableType: taskData.deliverableType || 'Video Reel',
          status: taskData.status || 'Raw Data Ingest',
          version: taskData.version || 'v1',
          revisionsCount: 0,
          revisionsHistory: [],
          lastUpdated: timestamp
        };
        return [newTask, ...prev];
      }
    });
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const approveTask = (taskId, approvalNotes = 'Deliverable approved for publishing.') => {
    const timestamp = getCurrentTimestamp();
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        // Also increment client quota completed
        if (t.clientId) {
          const qCategory = t.deliverableType === 'Video Reel' || t.deliverableType === 'Long-Form Video' 
            ? 'videos'
            : t.deliverableType === 'Social Graphic' ? 'graphics'
            : t.deliverableType === 'Script / Concept' ? 'scripts'
            : 'posts';
          
          setClients(cPrev => cPrev.map(cl => {
            if (cl.id === t.clientId && cl.quotas?.[qCategory]) {
              return {
                ...cl,
                quotas: {
                  ...cl.quotas,
                  [qCategory]: {
                    ...cl.quotas[qCategory],
                    completed: cl.quotas[qCategory].completed + 1,
                    inProgress: Math.max(0, (cl.quotas[qCategory].inProgress || 1) - 1)
                  }
                }
              };
            }
            return cl;
          }));
        }

        return {
          ...t,
          status: 'Approved',
          version: 'Final Master',
          lastUpdated: timestamp,
          clientFeedback: approvalNotes
        };
      }
      return t;
    }));
  };

  const requestRevision = (taskId, reasonCategory, feedbackText, author = 'Client') => {
    const timestamp = getCurrentTimestamp();
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const currentCount = t.revisionsCount || 0;
        const newCount = currentCount + 1;
        const newHistoryItem = {
          iteration: newCount,
          date: timestamp,
          author,
          reasonCategory: reasonCategory || 'Pacing & Fast Cuts',
          feedback: feedbackText
        };

        return {
          ...t,
          status: 'Revision Requested',
          revisionsCount: newCount,
          version: `v${newCount + 1}`,
          revisionsHistory: [...(t.revisionsHistory || []), newHistoryItem],
          clientFeedback: feedbackText,
          lastUpdated: timestamp
        };
      }
      return t;
    }));
  };

  // 4. Daily Creator Output Worklogs
  const addDailyLog = (logData) => {
    const timestamp = getCurrentTimestamp();
    const newLog = {
      ...logData,
      id: logData.id || `log-${Date.now()}`,
      timestamp,
      date: logData.date || new Date().toISOString().split('T')[0]
    };
    setDailyLogs(prev => [newLog, ...prev]);

    // Update team member delivered count
    if (logData.memberId) {
      setTeamMembers(prev => prev.map(m => {
        if (m.id === logData.memberId) {
          return { ...m, monthlyDelivered: (m.monthlyDelivered || 0) + 1 };
        }
        return m;
      }));
    }
  };

  const deleteDailyLog = (logId) => {
    setDailyLogs(prev => prev.filter(l => l.id !== logId));
  };

  // 5. Shoot CRUD
  const saveShoot = (shootData) => {
    setShoots(prev => {
      const index = prev.findIndex(s => s.id === shootData.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], ...shootData };
        return updated;
      } else {
        const newShoot = {
          ...shootData,
          id: shootData.id || `shoot-${Date.now()}`,
          status: shootData.status || 'Confirmed'
        };
        return [newShoot, ...prev];
      }
    });
  };

  const deleteShoot = (shootId) => {
    setShoots(prev => prev.filter(s => s.id !== shootId));
  };

  // 6. Meta Ad CRUD
  const saveAd = (adData) => {
    setAds(prev => {
      const index = prev.findIndex(a => a.id === adData.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], ...adData };
        return updated;
      } else {
        const newAd = {
          ...adData,
          id: adData.id || `ad-${Date.now()}`,
          status: adData.status || 'Active'
        };
        return [newAd, ...prev];
      }
    });
  };

  const deleteAd = (adId) => {
    setAds(prev => prev.filter(a => a.id !== adId));
  };

  // 7. Chat: Send Message
  const sendMessage = (clientId, text) => {
    if (!text.trim()) return;
    const timestamp = getCurrentTimestamp();
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role === 'client' ? 'Client' : currentUser.role.toUpperCase(),
      timestamp,
      text: text.trim()
    };

    setChats(prev => {
      const clientChat = prev.find(c => c.clientId === clientId);
      if (clientChat) {
        return prev.map(c => {
          if (c.clientId === clientId) {
            return { ...c, messages: [...c.messages, newMsg] };
          }
          return c;
        });
      } else {
        return [...prev, { id: `chat-${Date.now()}`, clientId, messages: [newMsg] }];
      }
    });
  };


  // ==========================================
  // AUTHENTICATION & LOGIN LOGIC
  // ==========================================
  const loginUser = async (usernameOrEmail, password) => {
    const cleanId = sanitizeInput(usernameOrEmail.trim().toLowerCase());
    
    // Check Brute-Force Rate Limiting
    const limitCheck = checkRateLimit(cleanId);
    if (!limitCheck.allowed) {
      return { success: false, error: limitCheck.message };
    }

    const matchedUser = users.find(u => 
      u.username.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId
    );

    if (!matchedUser) {
      recordFailedLogin(cleanId);
      return { success: false, error: 'User account not found. Please check your username or register.' };
    }

    const salt = matchedUser.salt || 'bbi_agency_salt_v3';
    const computedHash = await hashPassword(password, salt);

    if (computedHash !== matchedUser.passwordHash) {
      recordFailedLogin(cleanId);
      return { success: false, error: 'Incorrect password. Please verify and try again.' };
    }

    // Login Successful
    recordSuccessfulLogin(cleanId);
    const sessionToken = generateSecureToken();
    const updatedUser = {
      ...matchedUser,
      token: sessionToken,
      lastLogin: new Date().toISOString()
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('agency_current_user', JSON.stringify(updatedUser));

    // If client user, automatically select their client ID
    if (updatedUser.clientId) {
      setSelectedClientId(updatedUser.clientId);
    }

    addAuditLog(
      'Security',
      updatedUser.id,
      updatedUser.name,
      'USER_LOGIN',
      'Security & Access',
      `User ${updatedUser.username} successfully authenticated via secure token.`,
      updatedUser.name
    );

    return { success: true, user: updatedUser };
  };

  const registerUser = async ({ username, email, name, role, department, password, clientId, partnerAgencyId, memberId }) => {
    const cleanUsername = sanitizeInput(username.trim().toLowerCase());
    const cleanEmail = sanitizeInput(email.trim().toLowerCase());
    const cleanName = sanitizeInput(name.trim());

    // Password validation
    const passCheck = validatePasswordStrength(password);
    if (!passCheck.isValid) {
      return { success: false, error: passCheck.message };
    }

    // Check duplicate
    const exists = users.some(u => 
      u.username.toLowerCase() === cleanUsername || u.email.toLowerCase() === cleanEmail
    );
    if (exists) {
      return { success: false, error: 'An account with this username or email already exists.' };
    }

    const salt = 'salt_' + Date.now().toString(36);
    const passwordHash = await hashPassword(password, salt);

    const newUser = {
      id: `usr-${Date.now()}`,
      username: cleanUsername,
      email: cleanEmail,
      name: cleanName,
      role: role || 'employee',
      department: department || 'General Operations',
      passwordHash,
      salt,
      clientId: clientId || null,
      partnerAgencyId: partnerAgencyId || null,
      memberId: memberId || null,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [newUser, ...prev]);

    addAuditLog(
      'Security',
      newUser.id,
      newUser.name,
      'USER_REGISTERED',
      'Role & Account Onboarding',
      `New user account registered for ${cleanName} with role '${role}'.`,
      currentUser.name
    );

    return { success: true, user: newUser };
  };

  const logoutUser = () => {
    const guestUser = {
      role: 'management',
      name: 'Neha Gupta (Admin)',
      id: 'tm-1',
      clientId: null
    };
    setCurrentUser(guestUser);
    localStorage.setItem('agency_current_user', JSON.stringify(guestUser));
  };

  // ==========================================
  // HRMS ACTIONS: Attendance, Payroll, Leaves, Docs
  // ==========================================
  const markAttendance = (status = 'Present', workLocation = 'Office', notes = '') => {
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    setAttendance(prev => {
      const existing = prev.find(a => a.memberId === currentUser.id && a.date === today);
      if (existing) {
        // If already checked in, perform check-out
        return prev.map(a => {
          if (a.id === existing.id) {
            return {
              ...a,
              checkOutTime: nowTime,
              hoursWorked: 8.5,
              notes: notes || a.notes
            };
          }
          return a;
        });
      } else {
        // Check in
        const newRecord = {
          id: `att-${Date.now()}`,
          memberId: currentUser.id,
          memberName: currentUser.name,
          department: currentUser.department || 'General Operations',
          date: today,
          checkInTime: nowTime,
          checkOutTime: null,
          status,
          workLocation,
          hoursWorked: 0,
          notes: sanitizeInput(notes)
        };
        return [newRecord, ...prev];
      }
    });

    addAuditLog(
      'HRMS',
      currentUser.id,
      currentUser.name,
      'ATTENDANCE_PUNCH',
      'Daily Operations',
      `Attendance marked as '${status}' (${workLocation}) at ${nowTime}`,
      currentUser.name
    );
  };

  const savePayrollRecord = (payrollData) => {
    const base = Number(payrollData.baseSalary) || 0;
    const allowances = Number(payrollData.allowances) || 0;
    const bonus = Number(payrollData.bonus) || 0;
    const deductions = Number(payrollData.deductions) || 0;
    const netPay = base + allowances + bonus - deductions;

    const record = {
      ...payrollData,
      id: payrollData.id || `pay-${Date.now()}`,
      baseSalary: base,
      allowances,
      bonus,
      deductions,
      netPay
    };

    setPayroll(prev => {
      const index = prev.findIndex(p => p.id === record.id);
      if (index >= 0) {
        const copy = [...prev];
        copy[index] = record;
        return copy;
      }
      return [record, ...prev];
    });

    addAuditLog(
      'Payroll',
      record.id,
      record.memberName,
      payrollData.id ? 'UPDATE' : 'CREATE',
      'Compensation & Payroll',
      `Salary record updated for ${record.memberName} (Net: ₹${netPay.toLocaleString()})`,
      currentUser.name
    );
  };

  const applyLeave = ({ leaveType, startDate, endDate, daysCount, reason }) => {
    const newLeave = {
      id: `lev-${Date.now()}`,
      memberId: currentUser.id,
      memberName: currentUser.name,
      department: currentUser.department || 'General Operations',
      leaveType,
      startDate,
      endDate,
      daysCount: Number(daysCount) || 1,
      reason: sanitizeInput(reason),
      status: 'Pending',
      approvedBy: null,
      appliedOn: new Date().toISOString().split('T')[0]
    };

    setLeaves(prev => [newLeave, ...prev]);

    addAuditLog(
      'HRMS',
      newLeave.id,
      newLeave.memberName,
      'LEAVE_APPLICATION',
      'Leave Management',
      `Applied for ${newLeave.leaveType} (${startDate} to ${endDate})`,
      currentUser.name
    );
  };

  const reviewLeave = (leaveId, newStatus, remarks = '') => {
    setLeaves(prev => prev.map(l => {
      if (l.id === leaveId) {
        return {
          ...l,
          status: newStatus,
          approvedBy: currentUser.name,
          reviewRemarks: sanitizeInput(remarks)
        };
      }
      return l;
    }));

    addAuditLog(
      'HRMS',
      leaveId,
      'Leave Request',
      'LEAVE_REVIEW',
      'Leave Management',
      `Leave marked as ${newStatus} by ${currentUser.name}. Note: ${remarks}`,
      currentUser.name
    );
  };

  const uploadHrDocument = (docData) => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      memberId: docData.memberId || currentUser.id,
      memberName: docData.memberName || currentUser.name,
      title: sanitizeInput(docData.title),
      docType: docData.docType || 'Contract',
      fileName: sanitizeInput(docData.fileName || 'document.pdf'),
      fileSize: docData.fileSize || '1.5 MB',
      uploadedOn: new Date().toISOString().split('T')[0],
      status: 'Verified',
      verifiedBy: currentUser.name
    };

    setHrDocuments(prev => [newDoc, ...prev]);

    addAuditLog(
      'HRMS',
      newDoc.id,
      newDoc.title,
      'DOCUMENT_UPLOAD',
      'HR Compliance',
      `Uploaded document '${newDoc.title}' for ${newDoc.memberName}`,
      currentUser.name
    );
  };

  // ==========================================
  // FRESH WORKSPACE PURGE & DEMO RESTORE
  // ==========================================
  const clearAllDummyData = () => {
    if (window.confirm('Are you sure you want to PURGE ALL dummy data?\n\nThis will remove all demo clients, tasks, shoots, and dummy logs to give you a 100% clean, fresh production system. You can start adding your real clients and staff right away.')) {
      setClients([]);
      setTasks([]);
      setShoots([]);
      setAds([]);
      setDailyLogs([]);
      setChats([]);
      setAttendance([]);
      setPayroll([]);
      setLeaves([]);
      setHrDocuments([]);
      // Keep only admin team member
      setTeamMembers(prev => prev.slice(0, 1));
      setPartnerAgencies([]);
      setIsFreshWorkspace(true);

      addAuditLog(
        'System',
        'sys-purge',
        'Database Engine',
        'WORKSPACE_PURGE',
        'System Initialization',
        'User executed Clean Slate Purge. All dummy records cleared for fresh operations.',
        currentUser.name
      );

      alert('Clean Slate Activated! All dummy data has been removed. You now have a fresh, production-ready system.');
    }
  };

  const loadDemoData = () => {
    if (window.confirm('Restore complete BrainBinary sample dataset with 50 clients, 25 team members, and demo production tasks?')) {
      setClients(generateClients());
      setTeamMembers(TEAM_MEMBERS);
      setTasks(INITIAL_TASKS);
      setDailyLogs(INITIAL_DAILY_LOGS);
      setShoots(INITIAL_SHOOTS);
      setAds(INITIAL_ADS);
      setChats(INITIAL_CHATS);
      setAttendance(INITIAL_ATTENDANCE);
      setPayroll(INITIAL_PAYROLL);
      setLeaves(INITIAL_LEAVES);
      setHrDocuments(INITIAL_HR_DOCUMENTS);
      setPartnerAgencies(INITIAL_PARTNER_AGENCIES);
      setIsFreshWorkspace(false);
      window.location.reload();
    }
  };

  // Backup: Export Full JSON
  const exportFullBackup = () => {
    const fullData = {
      backupDate: new Date().toISOString(),
      version: '3.0-Production-Robust',
      clients,
      tasks,
      dailyLogs,
      shoots,
      ads,
      chats,
      teamMembers,
      integrations
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(fullData, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `bbi_crm_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Backup: Import Full JSON
  const importBackup = (jsonData) => {
    try {
      if (jsonData.clients) setClients(jsonData.clients);
      if (jsonData.teamMembers) setTeamMembers(jsonData.teamMembers);
      if (jsonData.tasks) setTasks(jsonData.tasks);
      if (jsonData.dailyLogs) setDailyLogs(jsonData.dailyLogs);
      if (jsonData.shoots) setShoots(jsonData.shoots);
      if (jsonData.ads) setAds(jsonData.ads);
      if (jsonData.chats) setChats(jsonData.chats);
      if (jsonData.integrations) setIntegrations(jsonData.integrations);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  // Reset to initial clean state
  const resetToFactoryState = () => {
    if (window.confirm('Are you sure you want to reset all agency CRM data to initial defaults?')) {
      localStorage.clear();
      setClients(generateClients());
      setTeamMembers(TEAM_MEMBERS);
      setTasks(INITIAL_TASKS);
      setDailyLogs(INITIAL_DAILY_LOGS);
      setShoots(INITIAL_SHOOTS);
      setAds(INITIAL_ADS);
      setChats(INITIAL_CHATS);
      window.location.reload();
    }
  };

  return (
    <AgencyContext.Provider
      value={{
        theme,
        toggleTheme,
        currentUser,
        switchRole,
        clients,
        saveClient,
        deleteClient,
        updateClientQuota,
        updateClientChannels,
        toggleClientChannelActive,
        updateClientMetaAds,
        updateClientAiPreferences,
        teamMembers,
        saveTeamMember,
        deleteTeamMember,
        partnerAgencies,
        savePartnerAgency,
        deletePartnerAgency,
        auditLogs,
        addAuditLog,
        changeReasons: CHANGE_REASONS,
        tasks,
        saveTask,
        deleteTask,
        approveTask,
        requestRevision,
        dailyLogs,
        addDailyLog,
        deleteDailyLog,
        shoots,
        saveShoot,
        deleteShoot,
        ads,
        saveAd,
        deleteAd,
        chats,
        sendMessage,
        serviceCategories: SERVICE_CATEGORIES,
        socialPlatforms: SOCIAL_PLATFORMS,
        revisionReasons: REVISION_REASONS,
        deliverableTypes: DELIVERABLE_TYPES,
        activeTab,
        setActiveTab,
        selectedClientId,
        setSelectedClientId,
        integrations,
        saveIntegrations,
        syncMetaAds,
        exportFullBackup,
        importBackup,
        resetToFactoryState,
        firebaseConfig,
        setFirebaseConfig,
        getCurrentTimestamp,
        // Auth & RBAC
        users,
        loginUser,
        registerUser,
        logoutUser,
        // HRMS System
        attendance,
        markAttendance,
        payroll,
        savePayrollRecord,
        leaves,
        applyLeave,
        reviewLeave,
        hrDocuments,
        uploadHrDocument,
        hrPolicies: HR_POLICIES,
        // Workspace Cleansing
        isFreshWorkspace,
        clearAllDummyData,
        loadDemoData,
        runSecurityAudit
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
};

export const useAgency = () => useContext(AgencyContext);
