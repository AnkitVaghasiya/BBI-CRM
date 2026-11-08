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
  DELIVERABLE_TYPES
} from '../data/seedData';

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

  // Database States with LocalStorage fallback (v3 to incorporate full Quota & Revision schema)
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('agency_clients_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return generateClients();
  });

  const [teamMembers, setTeamMembers] = useState(() => {
    const saved = localStorage.getItem('agency_team_members_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return TEAM_MEMBERS;
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

  // 1. Client CRUD
  const saveClient = (clientData) => {
    setClients(prev => {
      const index = prev.findIndex(c => c.id === clientData.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], ...clientData };
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
          createdAt: new Date().toISOString().split('T')[0]
        };
        return [newClient, ...prev];
      }
    });
  };

  const deleteClient = (clientId) => {
    setClients(prev => prev.filter(c => c.id !== clientId));
    setTasks(prev => prev.filter(t => t.clientId !== clientId));
    setShoots(prev => prev.filter(s => s.clientId !== clientId));
    setAds(prev => prev.filter(a => a.clientId !== clientId));
    setDailyLogs(prev => prev.filter(l => l.clientId !== clientId));
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

  // 2. Team Member CRUD
  const saveTeamMember = (memberData) => {
    setTeamMembers(prev => {
      const index = prev.findIndex(m => m.id === memberData.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], ...memberData };
        return updated;
      } else {
        const newMember = {
          ...memberData,
          id: memberData.id || `tm-${Date.now()}`,
          activeTasks: 0,
          dailyTarget: memberData.dailyTarget || 2,
          monthlyDelivered: 0
        };
        return [...prev, newMember];
      }
    });
  };

  const deleteTeamMember = (memberId) => {
    setTeamMembers(prev => prev.filter(m => m.id !== memberId));
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
        teamMembers,
        saveTeamMember,
        deleteTeamMember,
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
        getCurrentTimestamp
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
};

export const useAgency = () => useContext(AgencyContext);
