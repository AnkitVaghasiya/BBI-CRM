import React, { createContext, useContext, useState, useEffect } from 'react';
import { TEAM_MEMBERS, SERVICE_CATEGORIES, generateClients, INITIAL_TASKS, INITIAL_SHOOTS, INITIAL_ADS, INITIAL_CHATS } from '../data/seedData';

const AgencyContext = createContext();

export const AgencyProvider = ({ children }) => {
  // Current active user/role view
  // Roles: 'management' (Admin), 'video-editing', 'ai-content', 'meta-ads', 'shooting-team', 'client'
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('agency_current_user');
    return saved ? JSON.parse(saved) : {
      role: 'management',
      name: 'Neha Gupta (Admin)',
      id: 'tm-1',
      clientId: null
    };
  });

  // Database States with LocalStorage fallback
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('agency_clients_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return generateClients();
  });

  const [teamMembers, setTeamMembers] = useState(() => {
    const saved = localStorage.getItem('agency_team_members_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return TEAM_MEMBERS;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('agency_tasks_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_TASKS;
  });

  const [shoots, setShoots] = useState(() => {
    const saved = localStorage.getItem('agency_shoots_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_SHOOTS;
  });

  const [ads, setAds] = useState(() => {
    const saved = localStorage.getItem('agency_ads_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ADS;
  });

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('agency_chats_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CHATS;
  });

  // Active view navigation
  // views: 'dashboard', 'clients', 'production', 'shoots', 'ads', 'calendar', 'approvals', 'chat', 'team', 'settings'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClientId, setSelectedClientId] = useState('client-1');

  // Fresher / Beginner Guide Banner visibility toggle
  const [showBeginnerGuide, setShowBeginnerGuide] = useState(() => {
    const saved = localStorage.getItem('agency_show_guide');
    return saved !== null ? JSON.parse(saved) : true;
  });

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
      localStorage.setItem('agency_clients_v1', JSON.stringify(clients));
    } catch (e) {
      console.warn('LocalStorage quota or serialization error:', e);
    }
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('agency_team_members_v1', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('agency_tasks_v1', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('agency_shoots_v1', JSON.stringify(shoots));
  }, [shoots]);

  useEffect(() => {
    localStorage.setItem('agency_ads_v1', JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    localStorage.setItem('agency_chats_v1', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('agency_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('agency_show_guide', JSON.stringify(showBeginnerGuide));
  }, [showBeginnerGuide]);

  useEffect(() => {
    localStorage.setItem('agency_firebase_config', JSON.stringify(firebaseConfig));
  }, [firebaseConfig]);

  // Helper format timestamp: "04/11/2026, 08:15 AM"
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
      setActiveTab('production');
    } else if (roleType === 'shooting-team') {
      setCurrentUser({
        role: 'shooting-team',
        name: 'Vikram Rathore (DoP)',
        id: 'tm-21',
        clientId: null
      });
      setActiveTab('shoots');
    } else if (roleType === 'ai-content') {
      setCurrentUser({
        role: 'ai-content',
        name: 'Sameer Khan (AI Lead)',
        id: 'tm-11',
        clientId: null
      });
      setActiveTab('production');
    } else if (roleType === 'meta-ads') {
      setCurrentUser({
        role: 'meta-ads',
        name: 'Aryan Malhotra (Ads Lead)',
        id: 'tm-16',
        clientId: null
      });
      setActiveTab('ads');
    } else {
      // Management
      setCurrentUser({
        role: 'management',
        name: 'Neha Gupta (Admin / Director)',
        id: 'tm-1',
        clientId: null
      });
      setActiveTab('dashboard');
    }
  };

  // 1. Team Member CRUD
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
          avatar: memberData.avatar || '👤'
        };
        return [...prev, newMember];
      }
    });
  };

  const deleteTeamMember = (memberId) => {
    setTeamMembers(prev => prev.filter(m => m.id !== memberId));
  };

  // 2. Client CRUD
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
  };

  // 3. Task / Deliverable CRUD
  const saveTask = (taskData) => {
    setTasks(prev => {
      const index = prev.findIndex(t => t.id === taskData.id);
      const timestamp = getCurrentTimestamp();
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], ...taskData, lastUpdated: timestamp };
        return updated;
      } else {
        const newTask = {
          ...taskData,
          id: taskData.id || `task-${Date.now()}`,
          version: taskData.version || 'v1',
          revisionsCount: 0,
          status: taskData.status || 'Raw Data Ingest',
          lastUpdated: timestamp
        };
        return [newTask, ...prev];
      }
    });
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Client Approval Workflow: Approve
  const approveTask = (taskId, comment = 'Approved without revisions.') => {
    const timestamp = getCurrentTimestamp();
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: 'Approved',
          clientFeedback: comment,
          lastUpdated: timestamp
        };
      }
      return t;
    }));

    const task = tasks.find(t => t.id === taskId);
    if (task) {
      sendMessage(task.clientId, `✅ [DELIVERABLE APPROVED] "${task.title}" has been approved! Note: ${comment}`);
    }
  };

  // Client Approval Workflow: Request Revision
  const requestRevision = (taskId, feedbackText) => {
    const timestamp = getCurrentTimestamp();
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextRev = (t.revisionsCount || 0) + 1;
        return {
          ...t,
          status: 'Revision Requested',
          version: `v${nextRev + 1} Needed`,
          revisionsCount: nextRev,
          clientFeedback: feedbackText,
          lastUpdated: timestamp
        };
      }
      return t;
    }));

    const task = tasks.find(t => t.id === taskId);
    if (task) {
      sendMessage(task.clientId, `⚠️ [REVISION REQUESTED] for "${task.title}": "${feedbackText}"`);
    }
  };

  // 4. Video Shoot CRUD
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

  // 5. Meta Ad CRUD
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
          status: adData.status || 'In Planning'
        };
        return [newAd, ...prev];
      }
    });
  };

  const deleteAd = (adId) => {
    setAds(prev => prev.filter(a => a.id !== adId));
  };

  // 6. Chat: Send Message
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
      version: '1.1',
      clients,
      tasks,
      shoots,
      ads,
      chats,
      teamMembers
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(fullData, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `omniagency_backup_${new Date().toISOString().split('T')[0]}.json`);
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
      if (jsonData.shoots) setShoots(jsonData.shoots);
      if (jsonData.ads) setAds(jsonData.ads);
      if (jsonData.chats) setChats(jsonData.chats);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  // Reset to initial clean state
  const resetToFactoryState = () => {
    if (window.confirm('क्या आप सच में सभी डेटा को रीसेट करना चाहते हैं? (Are you sure you want to reset all data to default demo data?)')) {
      localStorage.clear();
      setClients(generateClients());
      setTeamMembers(TEAM_MEMBERS);
      setTasks(INITIAL_TASKS);
      setShoots(INITIAL_SHOOTS);
      setAds(INITIAL_ADS);
      setChats(INITIAL_CHATS);
      window.location.reload();
    }
  };

  return (
    <AgencyContext.Provider
      value={{
        currentUser,
        switchRole,
        clients,
        saveClient,
        deleteClient,
        teamMembers,
        saveTeamMember,
        deleteTeamMember,
        tasks,
        saveTask,
        deleteTask,
        approveTask,
        requestRevision,
        shoots,
        saveShoot,
        deleteShoot,
        ads,
        saveAd,
        deleteAd,
        chats,
        sendMessage,
        serviceCategories: SERVICE_CATEGORIES,
        activeTab,
        setActiveTab,
        selectedClientId,
        setSelectedClientId,
        showBeginnerGuide,
        setShowBeginnerGuide,
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
