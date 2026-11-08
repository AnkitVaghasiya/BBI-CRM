// Seed Data for 200+ Clients Agency Management System
// 25 Team Members across 5 Departments
// Standard English baseline for BrainBinary AI OS / OmniAgency CRM

export const REVISION_REASONS = [
  'Pacing & Fast Cuts',
  'Text, Captions & Typography',
  'Audio, Voiceover & Music',
  'Color Grading & Visual Tone',
  'Brand Guidelines & Logo',
  'Actor / Shot Replacement',
  'Client Script Drift / Scope Change'
];

export const DELIVERABLE_TYPES = [
  'Video Reel',
  'Long-Form Video',
  'Social Graphic',
  'Carousel Post',
  'Script / Concept',
  'Meta Ad Creative'
];

export const CHANGE_REASONS = [
  'Role Promotion & Scope Expansion',
  'Client Reassignment & Workload Rebalancing',
  'Deliverable Target & Capacity Adjustment',
  'Retainer / Compensation Revision',
  'SOP & Workflow Restructuring',
  'Toolstack & Software Upgrade',
  'Partner Agency / Vendor Contract Update',
  'Emergency Task Coverage & Backup',
  'Performance Review / Quality Adjustment',
  'Routine Contact & Profile Update'
];

export const TEAM_MEMBERS = [
  // 1. Management (5 Members)
  {
    id: 'tm-1',
    name: 'Neha Gupta',
    role: 'Agency Director & Founder',
    department: 'Management',
    email: 'neha@agency.com',
    phone: '+91 98765 00001',
    activeTasks: 4,
    avatar: '👩‍💼',
    dailyTarget: 0,
    monthlyDelivered: 42,
    currentDuties: 'Client onboarding, strategic account governance, cross-department quota tracking and SLA monitoring.',
    assignedScope: 'Lead weekly executive client reviews and manage high-tier contract retainer expansions.',
    toolstack: ['Notion', 'Slack', 'WhatsApp Business API', 'Google Workspace'],
    assignedClientIds: ['client-1', 'client-2', 'client-3'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-2',
    name: 'Karan Mehra',
    role: 'Operations & Delivery Head',
    department: 'Management',
    email: 'karan@agency.com',
    phone: '+91 98765 00002',
    activeTasks: 8,
    avatar: '👨‍💼',
    dailyTarget: 0,
    monthlyDelivered: 58,
    currentDuties: 'Client onboarding, strategic account governance, cross-department quota tracking and SLA monitoring.',
    assignedScope: 'Lead weekly executive client reviews and manage high-tier contract retainer expansions.',
    toolstack: ['Notion', 'Slack', 'WhatsApp Business API', 'Google Workspace'],
    assignedClientIds: ['client-1', 'client-2', 'client-3'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-3',
    name: 'Priya Sharma',
    role: 'Lead Account Manager',
    department: 'Management',
    email: 'priya@agency.com',
    phone: '+91 98765 00003',
    activeTasks: 12,
    avatar: '👩‍💻',
    dailyTarget: 0,
    monthlyDelivered: 64,
    currentDuties: 'Client onboarding, strategic account governance, cross-department quota tracking and SLA monitoring.',
    assignedScope: 'Lead weekly executive client reviews and manage high-tier contract retainer expansions.',
    toolstack: ['Notion', 'Slack', 'WhatsApp Business API', 'Google Workspace'],
    assignedClientIds: ['client-1', 'client-2', 'client-3'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-4',
    name: 'Rohit Verma',
    role: 'Client Success & Onboarding Lead',
    department: 'Management',
    email: 'rohit@agency.com',
    phone: '+91 98765 00004',
    activeTasks: 9,
    avatar: '👨‍💼',
    dailyTarget: 0,
    monthlyDelivered: 50,
    currentDuties: 'Client onboarding, strategic account governance, cross-department quota tracking and SLA monitoring.',
    assignedScope: 'Lead weekly executive client reviews and manage high-tier contract retainer expansions.',
    toolstack: ['Notion', 'Slack', 'WhatsApp Business API', 'Google Workspace'],
    assignedClientIds: ['client-1', 'client-2', 'client-3'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-5',
    name: 'Ananya Roy',
    role: 'QC & Quality Assurance Lead',
    department: 'Management',
    email: 'ananya@agency.com',
    phone: '+91 98765 00005',
    activeTasks: 15,
    avatar: '👩‍🏫',
    dailyTarget: 8,
    monthlyDelivered: 112,
    currentDuties: 'Client onboarding, strategic account governance, cross-department quota tracking and SLA monitoring.',
    assignedScope: 'Lead weekly executive client reviews and manage high-tier contract retainer expansions.',
    toolstack: ['Notion', 'Slack', 'WhatsApp Business API', 'Google Workspace'],
    assignedClientIds: ['client-1', 'client-2', 'client-3'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },

  // 2. Video Editing Team (5 Members)
  {
    id: 'tm-6',
    name: 'Rahul Sharma',
    role: 'Lead Video Editor',
    department: 'Video Editing',
    email: 'rahul.edit@agency.com',
    phone: '+91 98765 00006',
    activeTasks: 14,
    avatar: '🎬',
    dailyTarget: 2,
    monthlyDelivered: 48,
    currentDuties: 'Rough cuts, pacing adjustments, audio track leveling, b-roll integration, and subtitle typography.',
    assignedScope: 'Deliver daily target cuts and resolve reason-coded revisions within 4 hours of feedback.',
    toolstack: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve Studio', 'CapCut Pro'],
    assignedClientIds: ['client-1', 'client-4', 'client-5'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-7',
    name: 'Vicky Das',
    role: 'Reels & Viral Hooks Specialist',
    department: 'Video Editing',
    email: 'vicky@agency.com',
    phone: '+91 98765 00007',
    activeTasks: 11,
    avatar: '⚡',
    dailyTarget: 3,
    monthlyDelivered: 56,
    currentDuties: 'Rough cuts, pacing adjustments, audio track leveling, b-roll integration, and subtitle typography.',
    assignedScope: 'Deliver daily target cuts and resolve reason-coded revisions within 4 hours of feedback.',
    toolstack: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve Studio', 'CapCut Pro'],
    assignedClientIds: ['client-1', 'client-4', 'client-5'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-8',
    name: 'Amit Sen',
    role: 'Motion Graphics & VFX Artist',
    department: 'Video Editing',
    email: 'amit@agency.com',
    phone: '+91 98765 00008',
    activeTasks: 7,
    avatar: '✨',
    dailyTarget: 2,
    monthlyDelivered: 38,
    currentDuties: 'Rough cuts, pacing adjustments, audio track leveling, b-roll integration, and subtitle typography.',
    assignedScope: 'Deliver daily target cuts and resolve reason-coded revisions within 4 hours of feedback.',
    toolstack: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve Studio', 'CapCut Pro'],
    assignedClientIds: ['client-1', 'client-4', 'client-5'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-9',
    name: 'Pooja Rawat',
    role: 'Long-Form & YouTube Editor',
    department: 'Video Editing',
    email: 'pooja@agency.com',
    phone: '+91 98765 00009',
    activeTasks: 8,
    avatar: '🎞️',
    dailyTarget: 1,
    monthlyDelivered: 24,
    currentDuties: 'Rough cuts, pacing adjustments, audio track leveling, b-roll integration, and subtitle typography.',
    assignedScope: 'Deliver daily target cuts and resolve reason-coded revisions within 4 hours of feedback.',
    toolstack: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve Studio', 'CapCut Pro'],
    assignedClientIds: ['client-1', 'client-4', 'client-5'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-10',
    name: 'Kunal Joshi',
    role: 'Colorist & Sound Designer',
    department: 'Video Editing',
    email: 'kunal@agency.com',
    phone: '+91 98765 00010',
    activeTasks: 10,
    avatar: '🎧',
    dailyTarget: 4,
    monthlyDelivered: 72,
    currentDuties: 'Rough cuts, pacing adjustments, audio track leveling, b-roll integration, and subtitle typography.',
    assignedScope: 'Deliver daily target cuts and resolve reason-coded revisions within 4 hours of feedback.',
    toolstack: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve Studio', 'CapCut Pro'],
    assignedClientIds: ['client-1', 'client-4', 'client-5'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },

  // 3. AI & Creative Team (5 Members)
  {
    id: 'tm-11',
    name: 'Sameer Khan',
    role: 'Lead AI Prompt Engineer & GenAI',
    department: 'AI Content',
    email: 'sameer@agency.com',
    phone: '+91 98765 00011',
    activeTasks: 16,
    avatar: '🤖',
    dailyTarget: 5,
    monthlyDelivered: 96,
    currentDuties: 'Crafting viral 3-second hook scripts, Midjourney visual generations, and omnichannel AI prompt engineering.',
    assignedScope: 'Generate 5 high-converting ad copy angles and 10 social captions daily per assigned client.',
    toolstack: ['Gemini 2.0 Flash', 'Midjourney v6', 'Claude 3.5 Sonnet', 'ElevenLabs AI'],
    assignedClientIds: ['client-1', 'client-2', 'client-5'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-12',
    name: 'Divya Nair',
    role: 'AI Copywriter & Hook Architect',
    department: 'AI Content',
    email: 'divya@agency.com',
    phone: '+91 98765 00012',
    activeTasks: 13,
    avatar: '✍️',
    dailyTarget: 6,
    monthlyDelivered: 115,
    currentDuties: 'Crafting viral 3-second hook scripts, Midjourney visual generations, and omnichannel AI prompt engineering.',
    assignedScope: 'Generate 5 high-converting ad copy angles and 10 social captions daily per assigned client.',
    toolstack: ['Gemini 2.0 Flash', 'Midjourney v6', 'Claude 3.5 Sonnet', 'ElevenLabs AI'],
    assignedClientIds: ['client-1', 'client-2', 'client-5'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-13',
    name: 'Ayush Patel',
    role: 'AI Voice & Video Synthesizer',
    department: 'AI Content',
    email: 'ayush@agency.com',
    phone: '+91 98765 00013',
    activeTasks: 9,
    avatar: '🎙️',
    dailyTarget: 3,
    monthlyDelivered: 54,
    currentDuties: 'Crafting viral 3-second hook scripts, Midjourney visual generations, and omnichannel AI prompt engineering.',
    assignedScope: 'Generate 5 high-converting ad copy angles and 10 social captions daily per assigned client.',
    toolstack: ['Gemini 2.0 Flash', 'Midjourney v6', 'Claude 3.5 Sonnet', 'ElevenLabs AI'],
    assignedClientIds: ['client-1', 'client-2', 'client-5'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-14',
    name: 'Shreya Sen',
    role: 'Visual AI & Midjourney Creator',
    department: 'AI Content',
    email: 'shreya@agency.com',
    phone: '+91 98765 00014',
    activeTasks: 12,
    avatar: '🎨',
    dailyTarget: 4,
    monthlyDelivered: 82,
    currentDuties: 'Crafting viral 3-second hook scripts, Midjourney visual generations, and omnichannel AI prompt engineering.',
    assignedScope: 'Generate 5 high-converting ad copy angles and 10 social captions daily per assigned client.',
    toolstack: ['Gemini 2.0 Flash', 'Midjourney v6', 'Claude 3.5 Sonnet', 'ElevenLabs AI'],
    assignedClientIds: ['client-1', 'client-2', 'client-5'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-15',
    name: 'Manisha Paul',
    role: 'AI QA & Brand Voice Analyst',
    department: 'AI Content',
    email: 'manisha@agency.com',
    phone: '+91 98765 00015',
    activeTasks: 11,
    avatar: '🔍',
    dailyTarget: 8,
    monthlyDelivered: 140,
    currentDuties: 'Crafting viral 3-second hook scripts, Midjourney visual generations, and omnichannel AI prompt engineering.',
    assignedScope: 'Generate 5 high-converting ad copy angles and 10 social captions daily per assigned client.',
    toolstack: ['Gemini 2.0 Flash', 'Midjourney v6', 'Claude 3.5 Sonnet', 'ElevenLabs AI'],
    assignedClientIds: ['client-1', 'client-2', 'client-5'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },

  // 4. Social Media Marketing & Meta Ads Team (5 Members)
  {
    id: 'tm-16',
    name: 'Aryan Malhotra',
    role: 'Meta Ads & Media Buyer Lead',
    department: 'Meta Ads & SMM',
    email: 'aryan@agency.com',
    phone: '+91 98765 00016',
    activeTasks: 18,
    avatar: '📊',
    dailyTarget: 2,
    monthlyDelivered: 36,
    currentDuties: 'Media buying, Meta Ad Account campaign structuring, CPL/ROAS tracking, and community scheduling.',
    assignedScope: 'Scale winning creative ad sets, run A/B copy tests, and audit pixel conversion events weekly.',
    toolstack: ['Meta Ads Manager', 'Facebook Business Suite', 'Google Analytics 4', 'Triple Whale'],
    assignedClientIds: ['client-1', 'client-3', 'client-4'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-17',
    name: 'Tanvi Singhania',
    role: 'Paid Social Funnel Strategist',
    department: 'Meta Ads & SMM',
    email: 'tanvi@agency.com',
    phone: '+91 98765 00017',
    activeTasks: 14,
    avatar: '📈',
    dailyTarget: 2,
    monthlyDelivered: 32,
    currentDuties: 'Media buying, Meta Ad Account campaign structuring, CPL/ROAS tracking, and community scheduling.',
    assignedScope: 'Scale winning creative ad sets, run A/B copy tests, and audit pixel conversion events weekly.',
    toolstack: ['Meta Ads Manager', 'Facebook Business Suite', 'Google Analytics 4', 'Triple Whale'],
    assignedClientIds: ['client-1', 'client-3', 'client-4'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-18',
    name: 'Sahil Kapoor',
    role: 'Instagram & LinkedIn Growth Manager',
    department: 'Meta Ads & SMM',
    email: 'sahil@agency.com',
    phone: '+91 98765 00018',
    activeTasks: 15,
    avatar: '🚀',
    dailyTarget: 4,
    monthlyDelivered: 84,
    currentDuties: 'Media buying, Meta Ad Account campaign structuring, CPL/ROAS tracking, and community scheduling.',
    assignedScope: 'Scale winning creative ad sets, run A/B copy tests, and audit pixel conversion events weekly.',
    toolstack: ['Meta Ads Manager', 'Facebook Business Suite', 'Google Analytics 4', 'Triple Whale'],
    assignedClientIds: ['client-1', 'client-3', 'client-4'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-19',
    name: 'Riya Bose',
    role: 'Community & Scheduling Specialist',
    department: 'Meta Ads & SMM',
    email: 'riya@agency.com',
    phone: '+91 98765 00019',
    activeTasks: 22,
    avatar: '📅',
    dailyTarget: 8,
    monthlyDelivered: 160,
    currentDuties: 'Media buying, Meta Ad Account campaign structuring, CPL/ROAS tracking, and community scheduling.',
    assignedScope: 'Scale winning creative ad sets, run A/B copy tests, and audit pixel conversion events weekly.',
    toolstack: ['Meta Ads Manager', 'Facebook Business Suite', 'Google Analytics 4', 'Triple Whale'],
    assignedClientIds: ['client-1', 'client-3', 'client-4'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-20',
    name: 'Deep Patel',
    role: 'Tracking, Pixel & Analytics Lead',
    department: 'Meta Ads & SMM',
    email: 'deep@agency.com',
    phone: '+91 98765 00020',
    activeTasks: 10,
    avatar: '🎯',
    dailyTarget: 1,
    monthlyDelivered: 20,
    currentDuties: 'Media buying, Meta Ad Account campaign structuring, CPL/ROAS tracking, and community scheduling.',
    assignedScope: 'Scale winning creative ad sets, run A/B copy tests, and audit pixel conversion events weekly.',
    toolstack: ['Meta Ads Manager', 'Facebook Business Suite', 'Google Analytics 4', 'Triple Whale'],
    assignedClientIds: ['client-1', 'client-3', 'client-4'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },

  // 5. Shooting & Production Team (5 Members)
  {
    id: 'tm-21',
    name: 'Vikram Rathore',
    role: 'Director of Photography (DoP)',
    department: 'Shooting Team',
    email: 'vikram@agency.com',
    phone: '+91 98765 00021',
    activeTasks: 6,
    avatar: '📹',
    dailyTarget: 1,
    monthlyDelivered: 18,
    currentDuties: 'Directing on-location video shoots, multi-cam 4K framing, lighting setup, and gimbal movement.',
    assignedScope: 'Execute scheduled client shoots, backup raw cards, and ingest footage to Google Drive within 6h.',
    toolstack: ['Sony FX3 Cinema Line', 'DJI Ronin RS3 Gimbal', 'Aputure 300D II', 'Sennheiser Wireless'],
    assignedClientIds: ['client-1', 'client-2', 'client-5'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-22',
    name: 'Arjun Mehta',
    role: 'Senior Cinematographer & Drone Op',
    department: 'Shooting Team',
    email: 'arjun@agency.com',
    phone: '+91 98765 00022',
    activeTasks: 5,
    avatar: '🚁',
    dailyTarget: 1,
    monthlyDelivered: 16,
    currentDuties: 'Directing on-location video shoots, multi-cam 4K framing, lighting setup, and gimbal movement.',
    assignedScope: 'Execute scheduled client shoots, backup raw cards, and ingest footage to Google Drive within 6h.',
    toolstack: ['Sony FX3 Cinema Line', 'DJI Ronin RS3 Gimbal', 'Aputure 300D II', 'Sennheiser Wireless'],
    assignedClientIds: ['client-1', 'client-2', 'client-5'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-23',
    name: 'Saurabh Mishra',
    role: 'Gimbal Operator & Reel Videographer',
    department: 'Shooting Team',
    email: 'saurabh@agency.com',
    phone: '+91 98765 00023',
    activeTasks: 7,
    avatar: '🎥',
    dailyTarget: 1,
    monthlyDelivered: 22,
    currentDuties: 'Directing on-location video shoots, multi-cam 4K framing, lighting setup, and gimbal movement.',
    assignedScope: 'Execute scheduled client shoots, backup raw cards, and ingest footage to Google Drive within 6h.',
    toolstack: ['Sony FX3 Cinema Line', 'DJI Ronin RS3 Gimbal', 'Aputure 300D II', 'Sennheiser Wireless'],
    assignedClientIds: ['client-1', 'client-2', 'client-5'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-24',
    name: 'Simran Kaur',
    role: 'Shoot Producer & Wardrobe Stylist',
    department: 'Shooting Team',
    email: 'simran@agency.com',
    phone: '+91 98765 00024',
    activeTasks: 4,
    avatar: '👗',
    dailyTarget: 1,
    monthlyDelivered: 14,
    currentDuties: 'Directing on-location video shoots, multi-cam 4K framing, lighting setup, and gimbal movement.',
    assignedScope: 'Execute scheduled client shoots, backup raw cards, and ingest footage to Google Drive within 6h.',
    toolstack: ['Sony FX3 Cinema Line', 'DJI Ronin RS3 Gimbal', 'Aputure 300D II', 'Sennheiser Wireless'],
    assignedClientIds: ['client-1', 'client-2', 'client-5'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  },
  {
    id: 'tm-25',
    name: 'Chetan Vyas',
    role: 'Lighting & Sound Engineer',
    department: 'Shooting Team',
    email: 'chetan@agency.com',
    phone: '+91 98765 00025',
    activeTasks: 6,
    avatar: '💡',
    dailyTarget: 1,
    monthlyDelivered: 20,
    currentDuties: 'Directing on-location video shoots, multi-cam 4K framing, lighting setup, and gimbal movement.',
    assignedScope: 'Execute scheduled client shoots, backup raw cards, and ingest footage to Google Drive within 6h.',
    toolstack: ['Sony FX3 Cinema Line', 'DJI Ronin RS3 Gimbal', 'Aputure 300D II', 'Sennheiser Wireless'],
    assignedClientIds: ['client-1', 'client-2', 'client-5'],
    lastUpdated: '2026-11-08 11:30',
    lastChangeReason: 'Role Promotion & Scope Expansion'
  }
];

export const SERVICE_CATEGORIES = [
  { id: 'video-editing', name: 'Video Editing', icon: 'Scissors', color: 'blue' },
  { id: 'video-shooting', name: 'Video Shooting', icon: 'Camera', color: 'amber' },
  { id: 'social-media-posting', name: 'Posting & Scheduling', icon: 'Calendar', color: 'purple' },
  { id: 'meta-ads', name: 'Meta Ads Management', icon: 'Target', color: 'emerald' },
  { id: 'ai-posts', name: 'AI Posts & Visuals', icon: 'Bot', color: 'pink' },
  { id: 'photos', name: 'Photos & Graphics', icon: 'Image', color: 'indigo' },
  { id: 'scripts', name: 'Scripts & Concepts', icon: 'FileText', color: 'teal' },
  { id: 'raw-data', name: 'Raw Data & Cloud Drive', icon: 'HardDrive', color: 'cyan' }
];

export const INITIAL_PARTNER_AGENCIES = [
  {
    id: 'agency-1',
    name: 'VFX Prodigy 3D & CGI Studios',
    type: '3D VFX & CGI Animation',
    contactPerson: 'Aditya Singhal',
    email: 'aditya@vfxprodigy.io',
    phone: '+91 98333 44551',
    monthlyRetainer: 85000,
    status: 'Active Partner',
    currentScope: 'High-end 3D bottle and product renders, liquid simulation, watch rotation animations for luxury clients.',
    upcomingTasks: 'Deliver 6 photorealistic 3D watch CGI hero shots for Ambika Watches festive campaign.',
    contractedDeliverables: '8 CGI Renders / month',
    assignedClients: ['client-1', 'client-2'],
    slaHours: 48,
    ndaSigned: true,
    lastUpdated: '2026-11-08 10:15',
    lastChangeReason: 'Client Reassignment & Workload Rebalancing'
  },
  {
    id: 'agency-2',
    name: 'VoiceWave Multilingual Dubbing Hub',
    type: 'Voiceover & Multilingual Dubbing',
    contactPerson: 'Meera Deshmukh',
    email: 'meera@voicewave.in',
    phone: '+91 98222 77889',
    monthlyRetainer: 45000,
    status: 'Active Partner',
    currentScope: 'Studio voiceover dubbing in Hindi, English, Gujarati & Marathi with broadcast-grade audio mastering.',
    upcomingTasks: 'Produce 12 regional language voiceovers for Prime Care clinic patient awareness reels.',
    contractedDeliverables: '20 VO Tracks / month',
    assignedClients: ['client-3', 'client-4'],
    slaHours: 24,
    ndaSigned: true,
    lastUpdated: '2026-11-07 14:30',
    lastChangeReason: 'Deliverable Target & Capacity Adjustment'
  },
  {
    id: 'agency-3',
    name: 'ScaleMax Performance Media Partners',
    type: 'White-Label Performance Ads',
    contactPerson: 'Harshvardhan Kapoor',
    email: 'harsh@scalemaxmedia.com',
    phone: '+91 98111 22334',
    monthlyRetainer: 120000,
    status: 'Active Partner',
    currentScope: 'Deep funnel Google Performance Max and programmatic display retargeting for high-budget agency accounts.',
    upcomingTasks: 'Set up Google Ads search campaigns and remarketing audiences for Azone Financials.',
    contractedDeliverables: '4 Managed Ad Accounts',
    assignedClients: ['client-4', 'client-5'],
    slaHours: 12,
    ndaSigned: true,
    lastUpdated: '2026-11-08 09:00',
    lastChangeReason: 'Partner Agency / Vendor Contract Update'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'audit-1',
    timestamp: '2026-11-08 12:45',
    entityType: 'Employee',
    entityId: 'tm-6',
    entityName: 'Rahul Sharma (Lead Video Editor)',
    action: 'Scope & Target Update',
    changeReason: 'Role Promotion & Scope Expansion',
    changeNotes: 'Promoted to lead daily video review pipeline; assigned Ambika Watches and IronCore fitness hero reels.',
    changedBy: 'Neha Gupta (Admin)'
  },
  {
    id: 'audit-2',
    timestamp: '2026-11-08 11:20',
    entityType: 'Client',
    entityId: 'client-1',
    entityName: 'Ambika Watches (Fastrack Authorized)',
    action: 'Quota & Retainer Update',
    changeReason: 'Deliverable Target & Capacity Adjustment',
    changeNotes: 'Increased monthly video target from 16 to 20 reels for upcoming festive season launch.',
    changedBy: 'Karan Mehra (Operations Head)'
  },
  {
    id: 'audit-3',
    timestamp: '2026-11-08 09:30',
    entityType: 'Partner Agency',
    entityId: 'agency-1',
    entityName: 'VFX Prodigy 3D & CGI Studios',
    action: 'Contract Scope Update',
    changeReason: 'Partner Agency / Vendor Contract Update',
    changeNotes: 'Expanded SLA to 48 hours for 3D watch simulation assets.',
    changedBy: 'Neha Gupta (Admin)'
  }
];

export const SOCIAL_PLATFORMS = [
  { id: 'meta', name: 'Meta Ads & Facebook', icon: 'Target', color: 'blue', badge: 'Meta Marketing API', desc: 'Ad campaigns, Pixel tracking & Page posts' },
  { id: 'instagram', name: 'Instagram', icon: 'Instagram', color: 'pink', badge: 'IG Graph API', desc: 'Reels, Carousels, Stories & Grid posts' },
  { id: 'youtube', name: 'YouTube', icon: 'Youtube', color: 'red', badge: 'YouTube Data API v3', desc: 'Shorts, Long-form videos & Community posts' },
  { id: 'pinterest', name: 'Pinterest', icon: 'Pin', color: 'rose', badge: 'Pinterest Business API', desc: 'Visual pins, Idea pins & Catalog boards' },
  { id: 'snapchat', name: 'Snapchat', icon: 'Ghost', color: 'amber', badge: 'Snap Marketing API', desc: 'Spotlight videos, Public profile & Snap ads' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'Linkedin', color: 'indigo', badge: 'LinkedIn Marketing API', desc: 'B2B Company page & Thought leadership' }
];

export const generateClientSocialChannels = (clientName, brandName, i = 1) => {
  const cleanSlug = (brandName || clientName).toLowerCase().replace(/[^a-z0-9]/g, '');
  const hasMeta = true;
  const hasIg = true;
  const hasYt = i % 2 === 0 || i <= 5;
  const hasPinterest = (i % 3 === 0) || (i === 2);
  const hasSnapchat = (i % 2 !== 0) || (i === 1) || (i === 5);
  const hasLinkedIn = (i % 4 === 0) || (i === 4);

  return {
    meta: {
      active: hasMeta,
      adAccountId: i === 1 ? 'act_1606985407825083' : `act_${1600000000000000 + i * 8371}`,
      pixelId: `pix_${90000000 + i * 412}`,
      pageId: `fb_${88000000 + i * 231}`,
      handle: `@${cleanSlug}.official`,
      url: `https://facebook.com/${cleanSlug}`,
      accessToken: 'EAAZ_verified_token_active',
      connected: true,
      lastSynced: '2026-11-08 12:30'
    },
    instagram: {
      active: hasIg,
      handle: `@${cleanSlug}`,
      url: `https://instagram.com/${cleanSlug}`,
      followers: `${(12 + ((i * 4.3) % 90)).toFixed(1)}K`,
      connected: true,
      lastSynced: '2026-11-08 11:15'
    },
    youtube: {
      active: hasYt,
      handle: `@${cleanSlug}Official`,
      channelId: `UC_${cleanSlug}_${i}`,
      url: `https://youtube.com/@${cleanSlug}Official`,
      subscribers: hasYt ? `${(3 + ((i * 1.8) % 45)).toFixed(1)}K` : '0',
      connected: hasYt,
      lastSynced: hasYt ? '2026-11-07 19:40' : null
    },
    pinterest: {
      active: hasPinterest,
      handle: `@${cleanSlug}_pins`,
      url: `https://pinterest.com/${cleanSlug}`,
      monthlyViews: hasPinterest ? `${(20 + ((i * 7) % 180)).toFixed(0)}K` : '0',
      connected: hasPinterest,
      lastSynced: hasPinterest ? '2026-11-06 14:10' : null
    },
    snapchat: {
      active: hasSnapchat,
      handle: `${cleanSlug}_snap`,
      publicProfileId: `snap_${cleanSlug}_${i}`,
      spotlightSubscribers: hasSnapchat ? `${(5 + ((i * 2.2) % 35)).toFixed(1)}K` : '0',
      connected: hasSnapchat,
      lastSynced: hasSnapchat ? '2026-11-08 09:45' : null
    },
    linkedin: {
      active: hasLinkedIn,
      handle: `${cleanSlug}-corp`,
      url: `https://linkedin.com/company/${cleanSlug}`,
      followers: hasLinkedIn ? `${(1.5 + ((i * 0.9) % 20)).toFixed(1)}K` : '0',
      connected: hasLinkedIn,
      lastSynced: hasLinkedIn ? '2026-11-05 16:00' : null
    }
  };
};

export const generateClientAiPreferences = (clientName, industry, brandName) => {
  const isLuxury = industry.includes('Luxury') || industry.includes('Jewellery');
  const isFitness = industry.includes('Fitness');
  const isTech = industry.includes('Tech') || industry.includes('Finance');
  const isClinic = industry.includes('Clinic') || industry.includes('Dentist');

  return {
    aiConnected: true,
    brandVoice: isLuxury 
      ? 'Sophisticated, aspirational, premium craftsmanship, timeless elegance with crisp tone'
      : isFitness 
      ? 'High-energy, relentless motivation, disciplined, transformational and hype-driven'
      : isTech 
      ? 'Authoritative, analytical, data-driven, ROI-focused and jargon-free clarity'
      : isClinic 
      ? 'Compassionate, medically reassuring, patient-centric, informative and trustworthy'
      : 'Conversational, vibrant, community-focused, engaging and trend-conscious',
    targetAudience: isLuxury
      ? 'High-net-worth lifestyle buyers, watch collectors, corporate gifting (Age 24-50)'
      : isFitness
      ? 'Active professionals, athletes, bodybuilding enthusiasts, weight loss seekers (Age 18-40)'
      : isTech
      ? 'Founders, CFOs, accountants, business owners and tech decision makers (Age 28-55)'
      : isClinic
      ? 'Families, dental patients, wellness seekers, health-conscious urbanites (All ages)'
      : 'Metro urban consumers, social media active youth and young families (Age 20-45)',
    preferredAiModel: 'Gemini 2.0 Flash / Pro (Connected)',
    toneKeywords: isLuxury ? ['Aspirational', 'Prestige', 'Authentic'] : isFitness ? ['Grind', 'Power', 'Victory'] : ['Precision', 'Growth', 'Reliability'],
    enabledChannels: ['meta', 'instagram', 'youtube', 'snapchat', 'pinterest'],
    dailyAutoPrompts: true
  };
};

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
      services: ['video-editing', 'video-shooting', 'social-media-posting', 'meta-ads', 'ai-posts', 'photos', 'scripts', 'raw-data'],
      assignees: {
        management: 'tm-3',
        videoEditing: 'tm-7',
        shooting: 'tm-23',
        ai: 'tm-11',
        smm: 'tm-16'
      },
      rawDriveUrl: 'https://drive.google.com/drive/folders/ambika-watches-campaign-assets',
      quotas: {
        videos: { target: 20, completed: 15, inProgress: 3 },
        graphics: { target: 12, completed: 9, inProgress: 2 },
        posts: { target: 24, completed: 18, inProgress: 4 },
        scripts: { target: 25, completed: 22, inProgress: 3 },
        shoots: { target: 2, completed: 2, inProgress: 0 },
        metaCampaigns: { target: 4, completed: 4, inProgress: 0 }
      },
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
      services: ['video-editing', 'video-shooting', 'social-media-posting', 'meta-ads', 'photos', 'scripts', 'raw-data'],
      assignees: {
        management: 'tm-2',
        videoEditing: 'tm-6',
        shooting: 'tm-21',
        ai: 'tm-14',
        smm: 'tm-17'
      },
      rawDriveUrl: 'https://drive.google.com/drive/folders/livdecor-interiors-footage',
      quotas: {
        videos: { target: 16, completed: 12, inProgress: 2 },
        graphics: { target: 10, completed: 8, inProgress: 1 },
        posts: { target: 20, completed: 15, inProgress: 3 },
        scripts: { target: 18, completed: 16, inProgress: 2 },
        shoots: { target: 3, completed: 2, inProgress: 1 },
        metaCampaigns: { target: 6, completed: 5, inProgress: 1 }
      },
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
      services: ['video-editing', 'social-media-posting', 'meta-ads', 'ai-posts', 'photos', 'scripts', 'raw-data'],
      assignees: {
        management: 'tm-4',
        videoEditing: 'tm-8',
        shooting: 'tm-22',
        ai: 'tm-12',
        smm: 'tm-16'
      },
      rawDriveUrl: 'https://drive.google.com/drive/folders/prime-care-patient-stories',
      quotas: {
        videos: { target: 18, completed: 14, inProgress: 2 },
        graphics: { target: 15, completed: 12, inProgress: 2 },
        posts: { target: 22, completed: 18, inProgress: 3 },
        scripts: { target: 20, completed: 17, inProgress: 2 },
        shoots: { target: 2, completed: 1, inProgress: 1 },
        metaCampaigns: { target: 5, completed: 4, inProgress: 1 }
      },
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
      services: ['video-editing', 'social-media-posting', 'meta-ads', 'ai-posts', 'scripts'],
      assignees: {
        management: 'tm-1',
        videoEditing: 'tm-9',
        shooting: 'tm-23',
        ai: 'tm-13',
        smm: 'tm-18'
      },
      rawDriveUrl: 'https://drive.google.com/drive/folders/azone-tax-season-reels',
      quotas: {
        videos: { target: 10, completed: 8, inProgress: 1 },
        graphics: { target: 8, completed: 6, inProgress: 1 },
        posts: { target: 16, completed: 14, inProgress: 2 },
        scripts: { target: 15, completed: 12, inProgress: 2 },
        shoots: { target: 1, completed: 1, inProgress: 0 },
        metaCampaigns: { target: 3, completed: 3, inProgress: 0 }
      },
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
      services: ['video-editing', 'video-shooting', 'social-media-posting', 'meta-ads', 'ai-posts', 'photos', 'scripts', 'raw-data'],
      assignees: {
        management: 'tm-3',
        videoEditing: 'tm-7',
        shooting: 'tm-23',
        ai: 'tm-11',
        smm: 'tm-16'
      },
      rawDriveUrl: 'https://drive.google.com/drive/folders/ironcore-benchpress-raw-4k',
      quotas: {
        videos: { target: 20, completed: 15, inProgress: 3 },
        graphics: { target: 10, completed: 8, inProgress: 2 },
        posts: { target: 25, completed: 20, inProgress: 3 },
        scripts: { target: 22, completed: 18, inProgress: 2 },
        shoots: { target: 2, completed: 2, inProgress: 0 },
        metaCampaigns: { target: 4, completed: 4, inProgress: 0 }
      },
      createdAt: '2026-02-18'
    }
  ];

  const enhancedBaseClients = baseClients.map((c, idx) => ({
    ...c,
    socialChannels: c.socialChannels || generateClientSocialChannels(c.name, c.brand, idx + 1),
    aiPreferences: c.aiPreferences || generateClientAiPreferences(c.name, c.industry, c.brand)
  }));

  const fullClients = [...enhancedBaseClients];
  const industries = ['Fitness & Gym', 'Real Estate', 'Luxury Fashion', 'Tech SaaS', 'Dentist & Clinic', 'Restaurant & Cafe', 'EdTech', 'E-commerce DTC', 'Jewellery', 'Interior Design'];
  
  for (let i = 6; i <= 210; i++) {
    const ind = industries[i % industries.length];
    const hasShooting = i % 2 === 0;
    const hasAds = i % 3 !== 0;
    const activeServices = ['video-editing', 'social-media-posting', 'photos', 'scripts', 'raw-data'];
    if (hasShooting) activeServices.push('video-shooting');
    if (hasAds) activeServices.push('meta-ads');
    activeServices.push('ai-posts');

    const vTarget = 12 + (i % 8);
    const gTarget = 8 + (i % 6);
    const sTarget = 14 + (i % 10);
    const pTarget = 18 + (i % 12);
    const cName = `${ind.split(' ')[0]} Enterprise Brand #${i}`;
    const bName = `Brand-${i} Global`;

    fullClients.push({
      id: `client-${i}`,
      name: cName,
      brand: bName,
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
      socialChannels: generateClientSocialChannels(cName, bName, i),
      aiPreferences: generateClientAiPreferences(cName, ind, bName),
      quotas: {
        videos: { target: vTarget, completed: Math.floor(vTarget * 0.7), inProgress: Math.max(1, Math.floor(vTarget * 0.15)) },
        graphics: { target: gTarget, completed: Math.floor(gTarget * 0.75), inProgress: Math.max(1, Math.floor(gTarget * 0.15)) },
        posts: { target: pTarget, completed: Math.floor(pTarget * 0.7), inProgress: Math.max(1, Math.floor(pTarget * 0.2)) },
        scripts: { target: sTarget, completed: Math.floor(sTarget * 0.8), inProgress: Math.max(1, Math.floor(sTarget * 0.15)) },
        shoots: { target: hasShooting ? 2 : 0, completed: hasShooting ? 1 : 0, inProgress: hasShooting ? 1 : 0 },
        metaCampaigns: { target: hasAds ? 3 : 0, completed: hasAds ? 2 : 0, inProgress: hasAds ? 1 : 0 }
      },
      createdAt: '2026-03-01'
    });
  }

  return fullClients;
};

// Initial Production Tasks & Deliverables with Versioning and Multi-Tier Revision History
export const INITIAL_TASKS = [
  {
    id: 'task-101',
    title: 'Fastrack x Ambika Authorized Dealer Reel #01 (Left Cut)',
    clientId: 'client-1',
    clientName: 'Ambika Watches (Fastrack Authorized)',
    deliverableType: 'Video Reel',
    service: 'video-editing',
    assignedTo: 'tm-7', // Vicky Das
    scheduledDate: '2026-11-09',
    scheduledTime: '18:30',
    rawMediaUrl: 'https://drive.google.com/drive/folders/ambika-watch-vetra-raw',
    outputUrl: 'https://vimeo.com/manage/videos/ambika-watch-vetra-v2',
    status: 'Client Approval Pending',
    version: 'v2',
    revisionsCount: 1,
    revisionsHistory: [
      {
        iteration: 1,
        date: '08/11/2026, 11:20 AM',
        author: 'Ankit Vaghasiya (Client)',
        reasonCategory: 'Text, Captions & Typography',
        feedback: 'Fastrack branding looks crisp. Please make accent font color golden yellow at 0:08 and add subtle drop shadow.'
      }
    ],
    lastUpdated: '08/11/2026, 12:40 PM',
    priority: 'Urgent'
  },
  {
    id: 'task-102',
    title: 'LivDecor Signature Villa Interior Walkthrough (4K Reel)',
    clientId: 'client-2',
    clientName: 'LivDecor Luxury Living & Interiors',
    deliverableType: 'Video Reel',
    service: 'video-editing',
    assignedTo: 'tm-6', // Rahul Sharma
    scheduledDate: '2026-11-10',
    scheduledTime: '19:00',
    rawMediaUrl: 'https://drive.google.com/drive/folders/livdecor-interiors-footage',
    outputUrl: 'https://vimeo.com/manage/videos/livdecor-villa-final',
    status: 'Approved',
    version: 'Final Master',
    revisionsCount: 1,
    revisionsHistory: [
      {
        iteration: 1,
        date: '07/11/2026, 04:15 PM',
        author: 'Ruchita Patel (Client)',
        reasonCategory: 'Audio, Voiceover & Music',
        feedback: 'Swap modern lo-fi music with elegant instrumental classical violin at 0:14.'
      }
    ],
    lastUpdated: '08/11/2026, 11:15 AM',
    priority: 'High'
  },
  {
    id: 'task-103',
    title: 'Prime Care Diwali Dental Wellness Reel Campaign',
    clientId: 'client-3',
    clientName: 'Prime Care Super Speciality Clinic',
    deliverableType: 'Video Reel',
    service: 'video-editing',
    assignedTo: 'tm-8', // Amit Sen
    scheduledDate: '2026-11-09',
    scheduledTime: '12:00',
    rawMediaUrl: 'https://frame.io/projects/prime-care-smile-stills',
    outputUrl: 'https://drive.google.com/drive/folders/prime-care-diwali-visuals',
    status: 'Revision Requested',
    version: 'v2',
    revisionsCount: 2,
    revisionsHistory: [
      {
        iteration: 1,
        date: '06/11/2026, 02:00 PM',
        author: 'Ananya Roy (Internal QC)',
        reasonCategory: 'Pacing & Fast Cuts',
        feedback: 'Doctor soundbite has 0.9s dead air before case study graphics reveal.'
      },
      {
        iteration: 2,
        date: '08/11/2026, 10:20 AM',
        author: 'Dr. Vivek Desai (Client)',
        reasonCategory: 'Color Grading & Visual Tone',
        feedback: 'Clinic interior lighting looks slightly green in the surgery room shot; warm up white balance.'
      }
    ],
    lastUpdated: '08/11/2026, 10:20 AM',
    priority: 'Urgent'
  },
  {
    id: 'task-104',
    title: 'Azone Tax Season & Wealth Management Explainer',
    clientId: 'client-4',
    clientName: 'Azone Global Accounting & Advisory',
    deliverableType: 'Carousel Post',
    service: 'photos',
    assignedTo: 'tm-14', // Shreya Sen
    scheduledDate: '2026-11-11',
    scheduledTime: '17:00',
    rawMediaUrl: 'https://drive.google.com/drive/folders/azone-tax-season-reels',
    outputUrl: 'https://vimeo.com/manage/videos/azone-tax-cut-v1',
    status: 'Internal QC',
    version: 'v1',
    revisionsCount: 0,
    revisionsHistory: [],
    lastUpdated: '08/11/2026, 09:45 AM',
    priority: 'Medium'
  },
  {
    id: 'task-105',
    title: 'Fastrack Festive Edition 3-Second Viral Hook Script #12',
    clientId: 'client-1',
    clientName: 'Ambika Watches (Fastrack Authorized)',
    deliverableType: 'Script / Concept',
    service: 'scripts',
    assignedTo: 'tm-12', // Divya Nair
    scheduledDate: '2026-11-09',
    scheduledTime: '11:00',
    rawMediaUrl: '',
    outputUrl: 'https://docs.google.com/document/d/fastrack-scripts-festive',
    status: 'Approved',
    version: 'v1 Master',
    revisionsCount: 0,
    revisionsHistory: [],
    lastUpdated: '08/11/2026, 08:30 AM',
    priority: 'High'
  },
  {
    id: 'task-106',
    title: 'IronCore Transformational Athlete Highlight Reel',
    clientId: 'client-5',
    clientName: 'IronCore Elite Fitness Hub',
    deliverableType: 'Video Reel',
    service: 'video-editing',
    assignedTo: 'tm-7',
    scheduledDate: '2026-11-10',
    scheduledTime: '18:00',
    rawMediaUrl: 'https://drive.google.com/drive/folders/ironcore-benchpress-raw-4k',
    outputUrl: 'https://vimeo.com/manage/videos/ironcore-athlete-draft',
    status: 'Scheduled',
    version: 'Final Master',
    revisionsCount: 1,
    revisionsHistory: [
      {
        iteration: 1,
        date: '07/11/2026, 03:00 PM',
        author: 'Aditya Oberoi (Client)',
        reasonCategory: 'Brand Guidelines & Logo',
        feedback: 'Position IronCore crest 15px higher so it does not collide with Instagram caption area.'
      }
    ],
    lastUpdated: '07/11/2026, 05:10 PM',
    priority: 'High'
  }
];

// Initial Daily Creator & Editor Worklogs
export const INITIAL_DAILY_LOGS = [
  {
    id: 'log-1',
    date: '2026-11-08',
    timestamp: '08/11/2026, 12:45 PM',
    memberId: 'tm-7',
    memberName: 'Vicky Das',
    department: 'Video Editing',
    clientId: 'client-1',
    clientName: 'Ambika Watches (Fastrack Authorized)',
    taskTitle: 'Fastrack x Ambika Authorized Dealer Reel #01',
    assetType: 'Video Reel',
    activity: 'Revision Edit (Pacing & Font Pop)',
    version: 'v2',
    durationMinutes: 75,
    status: 'Client Approval Pending',
    notes: 'Re-rendered in 4K 60fps with golden yellow kinetic subtitles.'
  },
  {
    id: 'log-2',
    date: '2026-11-08',
    timestamp: '08/11/2026, 11:30 AM',
    memberId: 'tm-6',
    memberName: 'Rahul Sharma',
    department: 'Video Editing',
    clientId: 'client-2',
    clientName: 'LivDecor Luxury Living & Interiors',
    taskTitle: 'LivDecor Signature Villa Interior Walkthrough',
    assetType: 'Video Reel',
    activity: 'Master Export & Color Polish',
    version: 'Final Master',
    durationMinutes: 120,
    status: 'Approved',
    notes: 'Final export delivered to client portal with violins audio stem.'
  },
  {
    id: 'log-3',
    date: '2026-11-08',
    timestamp: '08/11/2026, 10:15 AM',
    memberId: 'tm-12',
    memberName: 'Divya Nair',
    department: 'AI Content',
    clientId: 'client-1',
    clientName: 'Ambika Watches (Fastrack Authorized)',
    taskTitle: 'Fastrack Festive Edition 3-Second Viral Hook Script #12',
    assetType: 'Script / Concept',
    activity: 'Scriptwriting & Hook Generation',
    version: 'v1 Master',
    durationMinutes: 45,
    status: 'Approved',
    notes: 'Generated 3 high-retention hooks and shot directions for macro watch reel.'
  },
  {
    id: 'log-4',
    date: '2026-11-08',
    timestamp: '08/11/2026, 09:30 AM',
    memberId: 'tm-14',
    memberName: 'Shreya Sen',
    department: 'AI Content',
    clientId: 'client-4',
    clientName: 'Azone Global Accounting & Advisory',
    taskTitle: 'Azone Tax Season & Wealth Management Explainer',
    assetType: 'Carousel Post',
    activity: 'Design & Visual Assembly',
    version: 'v1',
    durationMinutes: 90,
    status: 'Internal QC',
    notes: 'Designed 6-slide infographic carousel on corporate tax optimization.'
  },
  {
    id: 'log-5',
    date: '2026-11-07',
    timestamp: '07/11/2026, 04:30 PM',
    memberId: 'tm-8',
    memberName: 'Amit Sen',
    department: 'Video Editing',
    clientId: 'client-3',
    clientName: 'Prime Care Super Speciality Clinic',
    taskTitle: 'Prime Care Diwali Dental Wellness Reel Campaign',
    assetType: 'Video Reel',
    activity: 'Motion Graphics & 3D Teeth Retouch',
    version: 'v1',
    durationMinutes: 140,
    status: 'Revision Requested',
    notes: 'Assembled animated lower-thirds and doctor credential overlays.'
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
