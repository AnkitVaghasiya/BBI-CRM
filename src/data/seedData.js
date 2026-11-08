// Seed Data for 200+ Clients Agency Management System
// 25 Team Members across 5 Departments
// Standard English baseline for BrainBinary AI OS / OmniAgency CRM

export const TEAM_MEMBERS = [
  // 1. Management (5 Members)
  { id: 'tm-1', name: 'Neha Gupta', role: 'Agency Director & Founder', department: 'Management', email: 'neha@agency.com', phone: '+91 98765 00001', activeTasks: 4, avatar: '👩‍💼' },
  { id: 'tm-2', name: 'Karan Mehra', role: 'Operations & Delivery Head', department: 'Management', email: 'karan@agency.com', phone: '+91 98765 00002', activeTasks: 8, avatar: '👨‍💼' },
  { id: 'tm-3', name: 'Priya Sharma', role: 'Lead Account Manager', department: 'Management', email: 'priya@agency.com', phone: '+91 98765 00003', activeTasks: 12, avatar: '👩‍💻' },
  { id: 'tm-4', name: 'Rohit Verma', role: 'Client Success & Onboarding Lead', department: 'Management', email: 'rohit@agency.com', phone: '+91 98765 00004', activeTasks: 9, avatar: '👨‍💼' },
  { id: 'tm-5', name: 'Ananya Roy', role: 'QC & Quality Assurance Lead', department: 'Management', email: 'ananya@agency.com', phone: '+91 98765 00005', activeTasks: 15, avatar: '👩‍🏫' },

  // 2. Video Editing Team (5 Members)
  { id: 'tm-6', name: 'Rahul Sharma', role: 'Lead Video Editor', department: 'Video Editing', email: 'rahul.edit@agency.com', phone: '+91 98765 00006', activeTasks: 14, avatar: '🎬' },
  { id: 'tm-7', name: 'Vicky Das', role: 'Reels & Viral Hooks Specialist', department: 'Video Editing', email: 'vicky@agency.com', phone: '+91 98765 00007', activeTasks: 11, avatar: '⚡' },
  { id: 'tm-8', name: 'Amit Sen', role: 'Motion Graphics & VFX Artist', department: 'Video Editing', email: 'amit@agency.com', phone: '+91 98765 00008', activeTasks: 7, avatar: '✨' },
  { id: 'tm-9', name: 'Pooja Rawat', role: 'Long-Form & YouTube Editor', department: 'Video Editing', email: 'pooja@agency.com', phone: '+91 98765 00009', activeTasks: 8, avatar: '🎞️' },
  { id: 'tm-10', name: 'Kunal Joshi', role: 'Colorist & Sound Designer', department: 'Video Editing', email: 'kunal@agency.com', phone: '+91 98765 00010', activeTasks: 10, avatar: '🎧' },

  // 3. AI & Creative Team (5 Members)
  { id: 'tm-11', name: 'Sameer Khan', role: 'Lead AI Prompt Engineer & GenAI', department: 'AI Content', email: 'sameer@agency.com', phone: '+91 98765 00011', activeTasks: 16, avatar: '🤖' },
  { id: 'tm-12', name: 'Divya Nair', role: 'AI Copywriter & Hook Architect', department: 'AI Content', email: 'divya@agency.com', phone: '+91 98765 00012', activeTasks: 13, avatar: '✍️' },
  { id: 'tm-13', name: 'Ayush Patel', role: 'AI Voice & Video Synthesizer', department: 'AI Content', email: 'ayush@agency.com', phone: '+91 98765 00013', activeTasks: 9, avatar: '🎙️' },
  { id: 'tm-14', name: 'Shreya Sen', role: 'Visual AI & Midjourney Creator', department: 'AI Content', email: 'shreya@agency.com', phone: '+91 98765 00014', activeTasks: 12, avatar: '🎨' },
  { id: 'tm-15', name: 'Manisha Paul', role: 'AI QA & Brand Voice Analyst', department: 'AI Content', email: 'manisha@agency.com', phone: '+91 98765 00015', activeTasks: 11, avatar: '🔍' },

  // 4. Social Media Marketing & Meta Ads Team (5 Members)
  { id: 'tm-16', name: 'Aryan Malhotra', role: 'Meta Ads & Media Buyer Lead', department: 'Meta Ads & SMM', email: 'aryan@agency.com', phone: '+91 98765 00016', activeTasks: 18, avatar: '📊' },
  { id: 'tm-17', name: 'Tanvi Singhania', role: 'Paid Social Funnel Strategist', department: 'Meta Ads & SMM', email: 'tanvi@agency.com', phone: '+91 98765 00017', activeTasks: 14, avatar: '📈' },
  { id: 'tm-18', name: 'Sahil Kapoor', role: 'Instagram & LinkedIn Growth Manager', department: 'Meta Ads & SMM', email: 'sahil@agency.com', phone: '+91 98765 00018', activeTasks: 15, avatar: '🚀' },
  { id: 'tm-19', name: 'Riya Bose', role: 'Community & Scheduling Specialist', department: 'Meta Ads & SMM', email: 'riya@agency.com', phone: '+91 98765 00019', activeTasks: 22, avatar: '📅' },
  { id: 'tm-20', name: 'Deep Patel', role: 'Tracking, Pixel & Analytics Lead', department: 'Meta Ads & SMM', email: 'deep@agency.com', phone: '+91 98765 00020', activeTasks: 10, avatar: '🎯' },

  // 5. Shooting & Production Team (5 Members)
  { id: 'tm-21', name: 'Vikram Rathore', role: 'Director of Photography (DoP)', department: 'Shooting Team', email: 'vikram@agency.com', phone: '+91 98765 00021', activeTasks: 6, avatar: '📹' },
  { id: 'tm-22', name: 'Arjun Mehta', role: 'Senior Cinematographer & Drone Op', department: 'Shooting Team', email: 'arjun@agency.com', phone: '+91 98765 00022', activeTasks: 5, avatar: '🚁' },
  { id: 'tm-23', name: 'Saurabh Mishra', role: 'Gimbal Operator & Reel Videographer', department: 'Shooting Team', email: 'saurabh@agency.com', phone: '+91 98765 00023', activeTasks: 7, avatar: '🎥' },
  { id: 'tm-24', name: 'Simran Kaur', role: 'Shoot Producer & Wardrobe Stylist', department: 'Shooting Team', email: 'simran@agency.com', phone: '+91 98765 00024', activeTasks: 4, avatar: '👗' },
  { id: 'tm-25', name: 'Chetan Vyas', role: 'Lighting & Sound Engineer', department: 'Shooting Team', email: 'chetan@agency.com', phone: '+91 98765 00025', activeTasks: 6, avatar: '💡' }
];

export const SERVICE_CATEGORIES = [
  { id: 'video-editing', name: 'Video Editing', icon: 'Scissors', color: 'blue' },
  { id: 'video-shooting', name: 'Video Shooting', icon: 'Camera', color: 'amber' },
  { id: 'social-media-posting', name: 'Posting & Scheduling', icon: 'Calendar', color: 'purple' },
  { id: 'meta-ads', name: 'Meta Ads Management', icon: 'Target', color: 'emerald' },
  { id: 'ai-posts', name: 'AI Posts & Visuals', icon: 'Bot', color: 'pink' },
  { id: 'photos', name: 'Photos & Retouching', icon: 'Image', color: 'indigo' },
  { id: 'raw-data', name: 'Raw Data & Cloud Drive', icon: 'HardDrive', color: 'cyan' }
];

export const generateClients = () => {
  const baseClients = [
    {
      id: 'client-1',
      name: 'Ambika Watches (Fastrack Authorized)',
      brand: 'Ambika Watches & Fastrack',
      contactPerson: 'Ankit Vaghasiya',
      email: 'theankitvaghasiya@gmail.com',
      phone: '+91 98200 44112',
      industry: 'Luxury Retail & Watches',
      monthlyRetainer: 95000,
      status: 'Active',
      services: ['video-editing', 'video-shooting', 'social-media-posting', 'meta-ads', 'ai-posts', 'raw-data'],
      assignees: {
        management: 'tm-3',
        videoEditing: 'tm-7',
        shooting: 'tm-23',
        ai: 'tm-11',
        smm: 'tm-16'
      },
      rawDriveUrl: 'https://drive.google.com/drive/folders/ambika-watches-campaign-assets',
      totalQuota: { reels: 24, shoots: 2, metaCampaigns: 4, aiPosts: 16 },
      completedQuota: { reels: 18, shoots: 2, metaCampaigns: 4, aiPosts: 14 },
      createdAt: '2026-01-15'
    },
    {
      id: 'client-2',
      name: 'LivDecor Luxury Living & Interiors',
      brand: 'LivDecor Studio',
      contactPerson: 'Ruchita Patel',
      email: 'ruchita@livdecor.in',
      phone: '+91 98111 55667',
      industry: 'Interior Design',
      monthlyRetainer: 135000,
      status: 'Active',
      services: ['video-editing', 'video-shooting', 'social-media-posting', 'meta-ads', 'photos', 'raw-data'],
      assignees: {
        management: 'tm-2',
        videoEditing: 'tm-6',
        shooting: 'tm-21',
        ai: 'tm-14',
        smm: 'tm-17'
      },
      rawDriveUrl: 'https://drive.google.com/drive/folders/livdecor-interiors-footage',
      totalQuota: { reels: 16, shoots: 3, metaCampaigns: 6, aiPosts: 12 },
      completedQuota: { reels: 12, shoots: 2, metaCampaigns: 5, aiPosts: 9 },
      createdAt: '2026-02-01'
    },
    {
      id: 'client-3',
      name: 'Prime Care Super Speciality Clinic',
      brand: 'Prime Care Healthcare',
      contactPerson: 'Dr. Vivek Desai',
      email: 'dr.vivek@primecare.com',
      phone: '+91 98777 88990',
      industry: 'Dentist & Clinic',
      monthlyRetainer: 110000,
      status: 'Active',
      services: ['video-editing', 'social-media-posting', 'meta-ads', 'ai-posts', 'raw-data'],
      assignees: {
        management: 'tm-4',
        videoEditing: 'tm-8',
        shooting: 'tm-22',
        ai: 'tm-12',
        smm: 'tm-16'
      },
      rawDriveUrl: 'https://drive.google.com/drive/folders/prime-care-patient-stories',
      totalQuota: { reels: 18, shoots: 2, metaCampaigns: 5, aiPosts: 20 },
      completedQuota: { reels: 14, shoots: 1, metaCampaigns: 4, aiPosts: 17 },
      createdAt: '2026-02-10'
    },
    {
      id: 'client-4',
      name: 'Azone Global Accounting & Advisory',
      brand: 'Azone Financials',
      contactPerson: 'Rajesh Mehta',
      email: 'rajesh@azoneadvisory.com',
      phone: '+91 98450 33211',
      industry: 'Tech SaaS & Finance',
      monthlyRetainer: 80000,
      status: 'Active',
      services: ['video-editing', 'social-media-posting', 'meta-ads', 'ai-posts'],
      assignees: {
        management: 'tm-1',
        videoEditing: 'tm-9',
        shooting: 'tm-23',
        ai: 'tm-13',
        smm: 'tm-18'
      },
      rawDriveUrl: 'https://drive.google.com/drive/folders/azone-tax-season-reels',
      totalQuota: { reels: 10, shoots: 1, metaCampaigns: 3, aiPosts: 15 },
      completedQuota: { reels: 8, shoots: 1, metaCampaigns: 3, aiPosts: 12 },
      createdAt: '2026-02-14'
    },
    {
      id: 'client-5',
      name: 'IronCore Elite Fitness Hub',
      brand: 'IronCore Fitness',
      contactPerson: 'Aditya Oberoi',
      email: 'aditya@ironcorefit.com',
      phone: '+91 98200 11223',
      industry: 'Fitness & Gym',
      monthlyRetainer: 90000,
      status: 'Active',
      services: ['video-editing', 'video-shooting', 'social-media-posting', 'meta-ads', 'ai-posts', 'raw-data'],
      assignees: {
        management: 'tm-3',
        videoEditing: 'tm-7',
        shooting: 'tm-23',
        ai: 'tm-11',
        smm: 'tm-16'
      },
      rawDriveUrl: 'https://drive.google.com/drive/folders/ironcore-benchpress-raw-4k',
      totalQuota: { reels: 20, shoots: 2, metaCampaigns: 4, aiPosts: 15 },
      completedQuota: { reels: 15, shoots: 2, metaCampaigns: 4, aiPosts: 12 },
      createdAt: '2026-02-18'
    }
  ];

  const fullClients = [...baseClients];
  const industries = ['Fitness & Gym', 'Real Estate', 'Luxury Fashion', 'Tech SaaS', 'Dentist & Clinic', 'Restaurant & Cafe', 'EdTech', 'E-commerce DTC', 'Jewellery', 'Interior Design'];
  
  for (let i = 6; i <= 210; i++) {
    const ind = industries[i % industries.length];
    const hasShooting = i % 2 === 0;
    const hasAds = i % 3 !== 0;
    const activeServices = ['video-editing', 'social-media-posting', 'raw-data'];
    if (hasShooting) activeServices.push('video-shooting');
    if (hasAds) activeServices.push('meta-ads');
    activeServices.push('ai-posts');

    fullClients.push({
      id: `client-${i}`,
      name: `${ind.split(' ')[0]} Enterprise Brand #${i}`,
      brand: `Brand-${i} Global`,
      contactPerson: `Executive Lead ${i}`,
      email: `contact.client${i}@agencydomain.com`,
      phone: `+91 98${(100 + i).toString().slice(-3)} ${(20000 + i).toString().slice(-5)}`,
      industry: ind,
      monthlyRetainer: 45000 + (i % 15) * 5000,
      status: i % 18 === 0 ? 'On Hold' : i % 25 === 0 ? 'Review' : 'Active',
      services: activeServices,
      assignees: {
        management: TEAM_MEMBERS[i % 5].id,
        videoEditing: TEAM_MEMBERS[5 + (i % 5)].id,
        shooting: TEAM_MEMBERS[20 + (i % 5)].id,
        ai: TEAM_MEMBERS[10 + (i % 5)].id,
        smm: TEAM_MEMBERS[15 + (i % 5)].id
      },
      rawDriveUrl: `https://drive.google.com/drive/folders/client-${i}-footage-vault`,
      totalQuota: { reels: 12 + (i % 8), shoots: hasShooting ? 2 : 0, metaCampaigns: hasAds ? 3 : 0, aiPosts: 10 + (i % 10) },
      completedQuota: { reels: Math.floor((12 + (i % 8)) * 0.7), shoots: hasShooting ? 1 : 0, metaCampaigns: hasAds ? 2 : 0, aiPosts: Math.floor((10 + (i % 10)) * 0.75) },
      createdAt: '2026-03-01'
    });
  }

  return fullClients;
};

export const INITIAL_TASKS = [
  {
    id: 'task-101',
    title: 'Fastrack x Ambika Authorized Dealer Reel #01 (Left Cut)',
    clientId: 'client-1',
    clientName: 'Ambika Watches (Fastrack Authorized)',
    service: 'video-editing',
    assignedTo: 'tm-7',
    scheduledDate: '2026-11-09',
    scheduledTime: '18:30',
    rawMediaUrl: 'https://drive.google.com/drive/folders/ambika-watch-vetra-raw',
    outputUrl: 'https://vimeo.com/manage/videos/ambika-watch-vetra-v2',
    status: 'Client Approval Pending',
    version: 'v2 Master',
    revisionsCount: 1,
    clientFeedback: 'Fastrack branding looks crisp; yellow accent pop verified at 0:08.',
    lastUpdated: '08/11/2026, 12:40 PM',
    priority: 'Urgent'
  },
  {
    id: 'task-102',
    title: 'LivDecor Signature Villa Interior Walkthrough (4K Reel)',
    clientId: 'client-2',
    clientName: 'LivDecor Luxury Living & Interiors',
    service: 'video-editing',
    assignedTo: 'tm-6',
    scheduledDate: '2026-11-10',
    scheduledTime: '19:00',
    rawMediaUrl: 'https://drive.google.com/drive/folders/livdecor-interiors-footage',
    outputUrl: 'https://vimeo.com/manage/videos/livdecor-villa-final',
    status: 'Approved',
    version: 'Final Master',
    revisionsCount: 0,
    clientFeedback: 'Approved! Schedule for Tuesday evening prime time on Instagram & Facebook.',
    lastUpdated: '08/11/2026, 11:15 AM',
    priority: 'High'
  },
  {
    id: 'task-103',
    title: 'Prime Care Diwali Dental Wellness Reel Campaign',
    clientId: 'client-3',
    clientName: 'Prime Care Super Speciality Clinic',
    service: 'ai-posts',
    assignedTo: 'tm-11',
    scheduledDate: '2026-11-09',
    scheduledTime: '12:00',
    rawMediaUrl: 'https://frame.io/projects/prime-care-smile-stills',
    outputUrl: 'https://drive.google.com/drive/folders/prime-care-diwali-visuals',
    status: 'In Progress',
    version: 'v1 Draft',
    revisionsCount: 0,
    clientFeedback: '',
    lastUpdated: '08/11/2026, 10:20 AM',
    priority: 'Medium'
  },
  {
    id: 'task-104',
    title: 'Azone Tax Season & Wealth Management Explainer',
    clientId: 'client-4',
    clientName: 'Azone Global Accounting & Advisory',
    service: 'video-editing',
    assignedTo: 'tm-8',
    scheduledDate: '2026-11-11',
    scheduledTime: '17:00',
    rawMediaUrl: 'https://drive.google.com/drive/folders/azone-tax-season-reels',
    outputUrl: 'https://vimeo.com/manage/videos/azone-tax-cut-v1',
    status: 'Internal QC',
    version: 'v1',
    revisionsCount: 0,
    clientFeedback: '',
    lastUpdated: '08/11/2026, 09:45 AM',
    priority: 'Medium'
  },
  {
    id: 'task-105',
    title: 'IronCore Transformational Athlete Highlight Reel',
    clientId: 'client-5',
    clientName: 'IronCore Elite Fitness Hub',
    service: 'video-editing',
    assignedTo: 'tm-7',
    scheduledDate: '2026-11-10',
    scheduledTime: '18:00',
    rawMediaUrl: 'https://drive.google.com/drive/folders/ironcore-benchpress-raw-4k',
    outputUrl: 'https://vimeo.com/manage/videos/ironcore-athlete-draft',
    status: 'Scheduled',
    version: 'Final Master',
    revisionsCount: 0,
    clientFeedback: 'Confirmed and locked for release.',
    lastUpdated: '07/11/2026, 05:10 PM',
    priority: 'High'
  }
];

export const INITIAL_SHOOTS = [
  {
    id: 'shoot-1',
    clientId: 'client-1',
    clientName: 'Ambika Watches (Fastrack Authorized)',
    title: 'Fastrack Festive Edition Macro Wrist & Lifestyle Shoot',
    shootDate: '2026-11-10',
    callTime: '09:00 AM',
    wrapTime: '03:00 PM',
    location: 'Ambika Watches Showroom, Diamond City Mall, Surat',
    crew: ['tm-21', 'tm-23', 'tm-25'],
    briefUrl: 'https://docs.google.com/document/d/ambika-festive-shotlist',
    equipmentList: ['Sony FX3 Cinema Line', '90mm f/2.8 Macro Lens', 'DJI RS3 Pro Gimbal', 'Aputure 300d II Light Kit', 'Wireless Lavalier Mic'],
    status: 'Confirmed'
  },
  {
    id: 'shoot-2',
    clientId: 'client-2',
    clientName: 'LivDecor Luxury Living & Interiors',
    title: 'Luxury 4BHK Penthouse Sunset Walkthrough & Drone Tour',
    shootDate: '2026-11-12',
    callTime: '03:30 PM',
    wrapTime: '07:30 PM',
    location: 'Skyline Seaface Towers, Penthouse 42B, Mumbai',
    crew: ['tm-21', 'tm-22', 'tm-24'],
    briefUrl: 'https://docs.google.com/document/d/livdecor-penthouse-script',
    equipmentList: ['DJI Mavic 3 Pro Cine Drone', 'Sony A7S III', '16-35mm GM Wide Lens', 'Nanlite Pavotube II Full Kit', 'Ronin 4D Rig'],
    status: 'Equipment Prep'
  }
];

export const INITIAL_ADS = [
  {
    id: 'ad-1',
    clientId: 'client-1',
    clientName: 'Ambika Watches (Fastrack Authorized)',
    campaignName: 'Fastrack Festive Watch Series - Meta Lead Gen & Store Walk-in',
    platform: 'Instagram Reels & Facebook Feed',
    dailyBudget: '₹4,000 / day',
    leadsGenerated: 184,
    cpl: '₹21.7',
    roas: '5.2x',
    adCreativesUrl: 'https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=1606985407825083',
    assignedTo: 'tm-16',
    status: 'Active',
    adAccountId: 'act_1606985407825083'
  },
  {
    id: 'ad-2',
    clientId: 'client-2',
    clientName: 'LivDecor Luxury Living & Interiors',
    campaignName: 'Turnkey Luxury Interior Consultation - High-Ticket Leads',
    platform: 'Instagram Story & Carousel Ads',
    dailyBudget: '₹6,500 / day',
    leadsGenerated: 76,
    cpl: '₹85.5',
    roas: '7.8x',
    adCreativesUrl: 'https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=1606985407825083',
    assignedTo: 'tm-17',
    status: 'Active',
    adAccountId: 'act_1606985407825083'
  },
  {
    id: 'ad-3',
    clientId: 'client-3',
    clientName: 'Prime Care Super Speciality Clinic',
    campaignName: 'Diwali Clear Aligners & Smile Makeover Special',
    platform: 'Facebook & Instagram Feed',
    dailyBudget: '₹3,500 / day',
    leadsGenerated: 112,
    cpl: '₹31.2',
    roas: '4.6x',
    adCreativesUrl: 'https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=1606985407825083',
    assignedTo: 'tm-16',
    status: 'Active',
    adAccountId: 'act_1606985407825083'
  },
  {
    id: 'ad-4',
    clientId: 'client-4',
    clientName: 'Azone Global Accounting & Advisory',
    campaignName: 'Corporate Year-End Tax Audit & GST Compliance Lead Funnel',
    platform: 'LinkedIn & Meta Ads',
    dailyBudget: '₹2,500 / day',
    leadsGenerated: 42,
    cpl: '₹59.5',
    roas: '4.1x',
    adCreativesUrl: 'https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=1606985407825083',
    assignedTo: 'tm-18',
    status: 'Active',
    adAccountId: 'act_1606985407825083'
  }
];

export const INITIAL_CHATS = [
  {
    id: 'chat-client-1',
    clientId: 'client-1',
    messages: [
      {
        id: 'msg-1',
        senderId: 'client-1',
        senderName: 'Ankit Vaghasiya (Client)',
        senderRole: 'Client',
        timestamp: '08/11/2026, 11:30 AM',
        text: 'Hi team, the 3 Fastrack creative cuts (1080x1350) look super sharp! Can we launch the Meta ad set this afternoon?'
      },
      {
        id: 'msg-2',
        senderId: 'tm-16',
        senderName: 'Aryan Malhotra (Ads Lead)',
        senderRole: 'META ADS',
        timestamp: '08/11/2026, 11:32 AM',
        text: 'Hello Ankit! Yes, Meta Ad Account act_1606985407825083 is synced and ready. We are launching the festive audience set at 2:00 PM.'
      },
      {
        id: 'msg-3',
        senderId: 'tm-7',
        senderName: 'Vicky Das (Editor)',
        senderRole: 'VIDEO EDITING',
        timestamp: '08/11/2026, 11:33 AM',
        text: 'Uploaded 4K master files directly into the client approval portal. Version v2 is ready for final sign-off!'
      }
    ]
  },
  {
    id: 'chat-client-2',
    clientId: 'client-2',
    messages: [
      {
        id: 'msg-201',
        senderId: 'client-2',
        senderName: 'Ruchita Patel (Client)',
        senderRole: 'Client',
        timestamp: '08/11/2026, 10:15 AM',
        text: 'The 4BHK Penthouse luxury walkthrough reel is approved. Please proceed with scheduling on Instagram and YouTube Shorts.'
      },
      {
        id: 'msg-202',
        senderId: 'tm-2',
        senderName: 'Karan Mehra (Operations Head)',
        senderRole: 'MANAGEMENT',
        timestamp: '08/11/2026, 10:17 AM',
        text: 'Thank you Ruchita! Scheduled for Tuesday 7 PM peak engagement slot.'
      }
    ]
  }
];
