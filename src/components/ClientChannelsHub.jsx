import React, { useState, useMemo } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Search, 
  Target, 
  Camera, 
  Video, 
  Pin, 
  Ghost, 
  Briefcase, 
  Share2, 
  Globe, 
  Check, 
  CheckCircle2, 
  X, 
  SlidersHorizontal, 
  Sparkles, 
  Copy, 
  Plus, 
  Edit3, 
  ExternalLink, 
  ShieldCheck, 
  Eye, 
  RefreshCw, 
  Bot, 
  Zap, 
  TrendingUp, 
  BarChart2,
  Lock,
  ArrowRight
} from 'lucide-react';

// Platform branded badges & icons
export const PlatformIcon = ({ platform, className = "w-4 h-4" }) => {
  switch (platform) {
    case 'meta':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0a12 12 0 0 0-4.37 23.17c-.05-.98-.1-2.48.02-3.55.11-.98.71-6.17.71-6.17s-.18-.36-.18-.9c0-.84.49-1.47 1.1-1.47.52 0 .77.39.77.86 0 .52-.33 1.3-.5 2.02-.14.61.31 1.11.91 1.11 1.09 0 1.94-1.15 1.94-2.81 0-1.47-1.06-2.5-2.57-2.5-1.75 0-2.78 1.31-2.78 2.67 0 .53.2 1.1.46 1.41.05.06.06.12.04.18-.04.18-.14.58-.16.66-.03.11-.09.13-.21.08-.8-.37-1.3-1.54-1.3-2.48 0-2.02 1.47-3.87 4.23-3.87 2.22 0 3.95 1.58 3.95 3.7 0 2.21-1.39 3.98-3.32 3.98-.65 0-1.26-.34-1.47-.73l-.4 1.53c-.15.56-.54 1.27-.81 1.7A12 12 0 1 0 12 0z" />
        </svg>
      );
    case 'snapchat':
      return <Ghost className={className} />;
    case 'linkedin':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    default:
      return <Globe className={className} />;
  }
};

export const ClientChannelsHub = ({ onOpenClientModal }) => {
  const { 
    clients, 
    updateClientChannels, 
    toggleClientChannelActive, 
    updateClientMetaAds, 
    updateClientAiPreferences,
    saveTask,
    socialPlatforms 
  } = useAgency();

  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('matrix'); // 'matrix' or 'cards'

  // Modals state
  const [editingClient, setEditingClient] = useState(null);
  const [channelModalTab, setChannelModalTab] = useState('meta');

  // AI Generation Drawer State
  const [aiClient, setAiClient] = useState(null);
  const [aiPlatform, setAiPlatform] = useState('meta');
  const [aiContentGoal, setAiContentGoal] = useState('Viral Reel Hook & Script');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Platform count aggregations
  const platformStats = useMemo(() => {
    return clients.reduce((acc, c) => {
      const sc = c.socialChannels || {};
      if (sc.meta?.active) acc.metaActive += 1;
      if (sc.meta?.connected) acc.metaConnected += 1;
      if (sc.instagram?.active) acc.igActive += 1;
      if (sc.youtube?.active) acc.ytActive += 1;
      if (sc.pinterest?.active) acc.pinActive += 1;
      if (sc.snapchat?.active) acc.snapActive += 1;
      if (sc.linkedin?.active) acc.liActive += 1;
      return acc;
    }, {
      metaActive: 0, metaConnected: 0,
      igActive: 0, ytActive: 0,
      pinActive: 0, snapActive: 0,
      liActive: 0
    });
  }, [clients]);

  // Filter clients
  const filteredClients = useMemo(() => {
    return clients.filter(c => {
      const sc = c.socialChannels || {};
      const matchesSearch = 
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.brand.toLowerCase().includes(search.toLowerCase()) ||
        (sc.meta?.adAccountId && sc.meta.adAccountId.toLowerCase().includes(search.toLowerCase())) ||
        (sc.instagram?.handle && sc.instagram.handle.toLowerCase().includes(search.toLowerCase()));

      let matchesPlatform = true;
      if (platformFilter !== 'All') {
        matchesPlatform = sc[platformFilter]?.active === true;
      }

      let matchesStatus = true;
      if (statusFilter === 'meta_active') {
        matchesStatus = sc.meta?.active === true;
      } else if (statusFilter === 'meta_inactive') {
        matchesStatus = sc.meta?.active !== true;
      } else if (statusFilter === 'ig_active') {
        matchesStatus = sc.instagram?.active === true;
      } else if (statusFilter === 'yt_active') {
        matchesStatus = sc.youtube?.active === true;
      } else if (statusFilter === 'snap_active') {
        matchesStatus = sc.snapchat?.active === true;
      } else if (statusFilter === 'pin_active') {
        matchesStatus = sc.pinterest?.active === true;
      }

      return matchesSearch && matchesPlatform && matchesStatus;
    });
  }, [clients, search, platformFilter, statusFilter]);

  // Handle opening Channel Config Modal
  const openChannelConfig = (client, defaultTab = 'meta') => {
    setEditingClient(JSON.parse(JSON.stringify(client)));
    setChannelModalTab(defaultTab);
  };

  // Save Channel Config
  const handleSaveChannelConfig = (e) => {
    e.preventDefault();
    if (!editingClient) return;
    updateClientChannels(editingClient.id, editingClient.socialChannels);
    updateClientAiPreferences(editingClient.id, editingClient.aiPreferences);
    setEditingClient(null);
  };

  // Launch AI Studio for Client & Channel
  const launchAiGenerator = (client, platform = 'meta') => {
    setAiClient(client);
    setAiPlatform(platform);
    setAiResult(null);
    setCopied(false);
  };

  // Execute AI generation with realistic brand copy
  const handleGenerateAiCreative = () => {
    if (!aiClient) return;
    setAiGenerating(true);
    setCopied(false);

    setTimeout(() => {
      const brand = aiClient.brand || aiClient.name;
      const industry = aiClient.industry;
      const voice = aiClient.aiPreferences?.brandVoice || 'Engaging, modern & authoritative';
      const audience = aiClient.aiPreferences?.targetAudience || 'Target customers & lifestyle buyers';

      let generated = {};

      if (aiPlatform === 'meta') {
        generated = {
          headline: `Transform Your Routine with ${brand} — Engineered for Excellence`,
          primaryText: `Tired of settling for average? At ${brand}, we designed our latest ${industry.toLowerCase()} collection to bridge premium quality with uncompromising performance.\n\n✨ Certified durability\n⚡ Precision crafted for ${audience}\n🔥 Limited Edition Release — Order online today.`,
          adAngles: [
            { angle: 'Pain-Point / Frustration', hook: `"Stop wasting money on products that wear out in 3 months."` },
            { angle: 'Aspirational / Status', hook: `"The gold standard trusted by industry leaders across India."` },
            { angle: 'Direct Urgency / Promo', hook: `"Only 40 pieces left in stock for this festive dispatch cycle."` }
          ],
          callToAction: 'Shop Now',
          adAccountConnected: aiClient.socialChannels?.meta?.adAccountId || 'act_1606985407825083',
          recommendedPlacement: 'Instagram Reels (9:16) + Facebook Feed (1:1)'
        };
      } else if (aiPlatform === 'instagram') {
        generated = {
          reelHook: `Stop scrolling if you care about ${industry.toLowerCase()}! 🛑`,
          caption: `We challenged our team to push ${brand} to the absolute limit. Here is what happened... 🧵👇\n\nDrop a "🔥" if you need this in your life!\n\nSave this reel for your next weekend inspiration.`,
          hashtags: `#${brand.replace(/\s+/g, '')} #${industry.replace(/\s+/g, '')} #ReelsViral #IndiaLifestyle #LuxuryLiving #CreatorsOfIndia #AestheticVibes #TrendAlert #DailyInspiration #ShopLocal`,
          carouselSlides: [
            'Slide 1 (Cover): The secret most brands will never tell you about...',
            'Slide 2: Why traditional alternatives fail under daily pressure',
            'Slide 3: The 3-layer craftsmanship behind ' + brand,
            'Slide 4: Real user transformation & before/after testimonial',
            'Slide 5 (CTA): Comment "INFO" to get the direct VIP discount link in DM'
          ]
        };
      } else if (aiPlatform === 'youtube') {
        generated = {
          titles: [
            `I Tested ${brand} for 30 Days (Is It Worth The Hype?)`,
            `The Ultimate ${industry} Guide: What They Don't Want You To Know`,
            `${brand} Review 2026: The Honest Truth Before You Buy`,
            `5 Mistakes Everyone Makes With ${industry} (And How ${brand} Fixes Them)`
          ],
          seoDescription: `In this video, we break down why ${brand} has become the fastest-growing brand in ${industry}. From design philosophy to real-world performance tests, here is everything you must know.\n\n⏱️ Chapters:\n0:00 - Introduction & The Big Problem\n1:45 - Unboxing & First Impressions\n4:20 - Extreme Durability Test\n7:15 - Final Verdict & Discount Code`,
          tags: `${brand}, ${industry}, Best ${industry} 2026, Honest Review, India Unboxing, Viral Shorts`
        };
      } else if (aiPlatform === 'snapchat') {
        generated = {
          spotlightHook: `Wait... you didn't know ${brand} could do this?! 🤯`,
          script15s: `[0-3s]: Fast zoom-in on the hero detail.\n[3-8s]: "Everyone asked where I got this from. It's literally changing how I experience ${industry.toLowerCase()}."\n[8-12s]: Text overlay: "Use code VIP20 at checkout"\n[12-15s]: Hand points down: "Swipe up before stock runs out!"`,
          swipeUpAction: 'Swipe Up to Visit Official Store'
        };
      } else if (aiPlatform === 'pinterest') {
        generated = {
          pinTitle: `${brand} Aesthetic Inspiration | Top ${industry} Trends 2026`,
          pinDescription: `Looking for minimalist, high-end ${industry.toLowerCase()} ideas? Explore ${brand}'s curated lookbook featuring warm lighting, premium textures, and functional elegance. Save this pin to your dream board!`,
          boardSuggestion: `${industry} Moodboard & Aesthetic Living`,
          keywords: `${brand}, aesthetic, luxury, minimal design, daily inspo`
        };
      } else {
        generated = {
          headline: `Strategic Growth Announcement from ${brand}`,
          content: `In the modern ${industry.toLowerCase()} landscape, innovation is no longer optional — it is the baseline. Today, we are proud to spotlight the new milestones achieved by ${brand}.`
        };
      }

      setAiResult(generated);
      setAiGenerating(false);
    }, 800);
  };

  // Convert AI generated creative into a Production Tracker task
  const handleCreateTaskFromAi = () => {
    if (!aiClient || !aiResult) return;
    const deliverableTypeMap = {
      meta: 'Meta Ad Creative',
      instagram: 'Video Reel',
      youtube: 'Long-Form Video',
      snapchat: 'Video Reel',
      pinterest: 'Social Graphic',
      linkedin: 'Carousel Post'
    };

    saveTask({
      title: `${aiClient.name} — AI Generated ${aiPlatform.toUpperCase()} Creative`,
      clientId: aiClient.id,
      clientName: aiClient.name,
      deliverableType: deliverableTypeMap[aiPlatform] || 'Video Reel',
      service: aiPlatform === 'meta' ? 'meta-ads' : 'social-media-posting',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '18:00',
      status: 'In Progress',
      version: 'v1',
      clientFeedback: `Generated via Antigravity Omnichannel AI for ${aiPlatform.toUpperCase()}.\nGoal: ${aiContentGoal}`,
      rawMediaUrl: aiClient.rawDriveUrl || ''
    });

    alert(`Successfully created deliverable task in Master Production Tracker for ${aiClient.name}!`);
    setAiClient(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(typeof text === 'string' ? text : JSON.stringify(text, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Client Social Media & Meta Ads Ecosystem
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              {clients.length} Accounts Configured
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Connect and manage client-specific Meta Ads IDs, FB Pages, IG, YouTube, Pinterest & Snapchat handles with active management toggles and integrated omnichannel AI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 rounded-lg transition ${viewMode === 'matrix' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500'}`}
            >
              Matrix Table
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg transition ${viewMode === 'cards' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500'}`}
            >
              Account Cards
            </button>
          </div>
        </div>
      </div>

      {/* Omnichannel Platform Overview Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Meta Ads */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200/80 dark:border-blue-500/20 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <PlatformIcon platform="meta" className="w-3.5 h-3.5 text-blue-600" />
              Meta Ads
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {platformStats.metaActive} <span className="text-xs font-semibold text-slate-400">active</span>
          </div>
          <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold mt-1">
            {platformStats.metaConnected} Ad Accounts Syncing
          </p>
        </div>

        {/* Instagram */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-pink-200/80 dark:border-pink-500/20 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <PlatformIcon platform="instagram" className="w-3.5 h-3.5 text-pink-600" />
              Instagram
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {platformStats.igActive} <span className="text-xs font-semibold text-slate-400">active</span>
          </div>
          <p className="text-[10px] text-pink-600 dark:text-pink-400 font-semibold mt-1">
            Reels & Grid Active
          </p>
        </div>

        {/* YouTube */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-red-200/80 dark:border-red-500/20 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <PlatformIcon platform="youtube" className="w-3.5 h-3.5 text-red-600" />
              YouTube
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {platformStats.ytActive} <span className="text-xs font-semibold text-slate-400">active</span>
          </div>
          <p className="text-[10px] text-red-600 dark:text-red-400 font-semibold mt-1">
            Shorts & Long-form
          </p>
        </div>

        {/* Pinterest */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-500/20 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <PlatformIcon platform="pinterest" className="w-3.5 h-3.5 text-rose-600" />
              Pinterest
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {platformStats.pinActive} <span className="text-xs font-semibold text-slate-400">active</span>
          </div>
          <p className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold mt-1">
            Visual Idea Pins
          </p>
        </div>

        {/* Snapchat */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-500/20 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <PlatformIcon platform="snapchat" className="w-3.5 h-3.5 text-amber-500" />
              Snapchat
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {platformStats.snapActive} <span className="text-xs font-semibold text-slate-400">active</span>
          </div>
          <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-1">
            Spotlight & Story Ads
          </p>
        </div>

        {/* Omnichannel AI Status */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 border border-purple-200 dark:border-purple-500/30 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1">
              <Bot className="w-3.5 h-3.5 text-purple-600" />
              Omnichannel AI
            </span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200">
              Gemini
            </span>
          </div>
          <div className="text-xl font-black text-purple-900 dark:text-white">
            100% <span className="text-xs font-semibold text-purple-600 dark:text-purple-300">synced</span>
          </div>
          <p className="text-[10px] text-purple-700 dark:text-purple-400 font-semibold mt-1">
            One-Click GenAI Ready
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3 transition-colors">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by client, brand, Instagram handle (@...), or Meta Ad Account ID (act_...)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Platform Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold shrink-0">Channel:</span>
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Channels</option>
              <option value="meta">Meta Ads & Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="pinterest">Pinterest</option>
              <option value="snapchat">Snapchat</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>

          {/* Active Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold shrink-0">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Clients</option>
              <option value="meta_active">Active on Meta Ads (Working On It)</option>
              <option value="ig_active">Active on Instagram</option>
              <option value="yt_active">Active on YouTube</option>
              <option value="snap_active">Active on Snapchat</option>
              <option value="pin_active">Active on Pinterest</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <span>Displaying <strong>{filteredClients.length}</strong> client social ecosystems</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> = Currently Working On & Active &nbsp;|&nbsp;
            <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" /> = Not Active / Inactive
          </span>
        </div>
      </div>

      {/* MATRIX TABLE VIEW */}
      {viewMode === 'matrix' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 min-w-[200px]">Client & Brand</th>
                  <th className="py-3.5 px-3 min-w-[170px]">Meta Ads & FB</th>
                  <th className="py-3.5 px-3 min-w-[150px]">Instagram</th>
                  <th className="py-3.5 px-3 min-w-[150px]">YouTube</th>
                  <th className="py-3.5 px-3 min-w-[140px]">Pinterest</th>
                  <th className="py-3.5 px-3 min-w-[140px]">Snapchat</th>
                  <th className="py-3.5 px-3 min-w-[120px]">AI Integration</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredClients.slice(0, 50).map(client => {
                  const sc = client.socialChannels || {};
                  return (
                    <tr key={client.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                      {/* Client Info */}
                      <td className="py-3.5 px-4">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-slate-900 dark:text-white text-xs">{client.name}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{client.brand}</p>
                          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{client.industry}</span>
                        </div>
                      </td>

                      {/* Meta Ads */}
                      <td className="py-3.5 px-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleClientChannelActive(client.id, 'meta')}
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition shrink-0 ${
                                sc.meta?.active 
                                  ? 'bg-blue-600 border-blue-600 text-white' 
                                  : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                              }`}
                              title={sc.meta?.active ? 'Currently Working On: ACTIVE (Click to toggle)' : 'Not Active (Click to activate)'}
                            >
                              {sc.meta?.active && <Check className="w-2.5 h-2.5" />}
                            </button>
                            <span className={`text-[10px] font-bold ${sc.meta?.active ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400'}`}>
                              {sc.meta?.active ? 'Managing Ads' : 'Inactive'}
                            </span>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700/60 text-[10px] font-mono text-slate-700 dark:text-slate-300 truncate max-w-[150px]">
                            {sc.meta?.adAccountId || 'No Ad ID Set'}
                          </div>
                        </div>
                      </td>

                      {/* Instagram */}
                      <td className="py-3.5 px-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleClientChannelActive(client.id, 'instagram')}
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition shrink-0 ${
                                sc.instagram?.active 
                                  ? 'bg-pink-600 border-pink-600 text-white' 
                                  : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                              }`}
                              title={sc.instagram?.active ? 'Currently Working On: ACTIVE' : 'Not Active'}
                            >
                              {sc.instagram?.active && <Check className="w-2.5 h-2.5" />}
                            </button>
                            <span className={`text-[10px] font-bold ${sc.instagram?.active ? 'text-pink-700 dark:text-pink-400' : 'text-slate-400'}`}>
                              {sc.instagram?.active ? 'Managing IG' : 'Inactive'}
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block truncate max-w-[130px]">
                            {sc.instagram?.handle || '@unconfigured'}
                          </span>
                        </div>
                      </td>

                      {/* YouTube */}
                      <td className="py-3.5 px-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleClientChannelActive(client.id, 'youtube')}
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition shrink-0 ${
                                sc.youtube?.active 
                                  ? 'bg-red-600 border-red-600 text-white' 
                                  : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                              }`}
                              title={sc.youtube?.active ? 'Currently Working On: ACTIVE' : 'Not Active'}
                            >
                              {sc.youtube?.active && <Check className="w-2.5 h-2.5" />}
                            </button>
                            <span className={`text-[10px] font-bold ${sc.youtube?.active ? 'text-red-700 dark:text-red-400' : 'text-slate-400'}`}>
                              {sc.youtube?.active ? 'Managing YT' : 'Inactive'}
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block truncate max-w-[130px]">
                            {sc.youtube?.handle || 'Not Enrolled'}
                          </span>
                        </div>
                      </td>

                      {/* Pinterest */}
                      <td className="py-3.5 px-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleClientChannelActive(client.id, 'pinterest')}
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition shrink-0 ${
                                sc.pinterest?.active 
                                  ? 'bg-rose-600 border-rose-600 text-white' 
                                  : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                              }`}
                              title={sc.pinterest?.active ? 'Currently Working On: ACTIVE' : 'Not Active'}
                            >
                              {sc.pinterest?.active && <Check className="w-2.5 h-2.5" />}
                            </button>
                            <span className={`text-[10px] font-bold ${sc.pinterest?.active ? 'text-rose-700 dark:text-rose-400' : 'text-slate-400'}`}>
                              {sc.pinterest?.active ? 'Active Pins' : 'Inactive'}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 block truncate max-w-[120px]">
                            {sc.pinterest?.handle || 'Not Set'}
                          </span>
                        </div>
                      </td>

                      {/* Snapchat */}
                      <td className="py-3.5 px-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleClientChannelActive(client.id, 'snapchat')}
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition shrink-0 ${
                                sc.snapchat?.active 
                                  ? 'bg-amber-500 border-amber-500 text-white' 
                                  : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                              }`}
                              title={sc.snapchat?.active ? 'Currently Working On: ACTIVE' : 'Not Active'}
                            >
                              {sc.snapchat?.active && <Check className="w-2.5 h-2.5" />}
                            </button>
                            <span className={`text-[10px] font-bold ${sc.snapchat?.active ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
                              {sc.snapchat?.active ? 'Spotlight ON' : 'Inactive'}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 block truncate max-w-[120px]">
                            {sc.snapchat?.handle || 'Not Set'}
                          </span>
                        </div>
                      </td>

                      {/* AI Integration */}
                      <td className="py-3.5 px-3">
                        <button
                          onClick={() => launchAiGenerator(client, 'meta')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 rounded-lg text-[10px] font-bold transition"
                          title="Generate Omnichannel AI Copy for this Client"
                        >
                          <Sparkles className="w-3 h-3 text-purple-600" />
                          <span>AI Studio</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openChannelConfig(client, 'meta')}
                            className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 transition flex items-center gap-1"
                          >
                            <SlidersHorizontal className="w-3 h-3" />
                            <span>Connect</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CARDS VIEW */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.slice(0, 30).map(client => {
            const sc = client.socialChannels || {};
            return (
              <div 
                key={client.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm hover:shadow transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">{client.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{client.brand} • {client.industry}</p>
                  </div>
                  <button
                    onClick={() => openChannelConfig(client, 'meta')}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                    title="Configure Channels"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Channels Grid with Toggles */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  {/* Meta */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <PlatformIcon platform="meta" className="w-4 h-4 text-blue-600" />
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">Meta Ads</span>
                        <span className="text-[10px] font-mono text-slate-500">{sc.meta?.adAccountId || 'No Ad ID'}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleClientChannelActive(client.id, 'meta')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        sc.meta?.active 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300' 
                          : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                      }`}
                    >
                      {sc.meta?.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <PlatformIcon platform="instagram" className="w-4 h-4 text-pink-600" />
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">Instagram</span>
                        <span className="text-[10px] text-slate-500">{sc.instagram?.handle || 'Unset'}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleClientChannelActive(client.id, 'instagram')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        sc.instagram?.active 
                          ? 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300' 
                          : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                      }`}
                    >
                      {sc.instagram?.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>

                  {/* YouTube */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <PlatformIcon platform="youtube" className="w-4 h-4 text-red-600" />
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">YouTube</span>
                        <span className="text-[10px] text-slate-500">{sc.youtube?.handle || 'Not Enrolled'}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleClientChannelActive(client.id, 'youtube')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        sc.youtube?.active 
                          ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300' 
                          : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                      }`}
                    >
                      {sc.youtube?.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>

                  {/* Snapchat & Pinterest */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <PlatformIcon platform="snapchat" className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-[10px] font-bold">Snapchat</span>
                      </div>
                      <button
                        onClick={() => toggleClientChannelActive(client.id, 'snapchat')}
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${sc.snapchat?.active ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-500'}`}
                      >
                        {sc.snapchat?.active ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <PlatformIcon platform="pinterest" className="w-3.5 h-3.5 text-rose-600" />
                        <span className="text-[10px] font-bold">Pinterest</span>
                      </div>
                      <button
                        onClick={() => toggleClientChannelActive(client.id, 'pinterest')}
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${sc.pinterest?.active ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-500'}`}
                      >
                        {sc.pinterest?.active ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1">
                    <Bot className="w-3 h-3" />
                    AI Engine Ready
                  </span>
                  <button
                    onClick={() => launchAiGenerator(client, 'meta')}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold rounded-lg transition flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Generate AI Creative</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CHANNEL CONFIGURATION MODAL */}
      {editingClient && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transition-colors">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>🔗 Connect & Configure Social Channels</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {editingClient.name} ({editingClient.brand})
                </p>
              </div>
              <button 
                onClick={() => setEditingClient(null)} 
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Sub-Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 overflow-x-auto text-xs font-bold">
              {[
                { id: 'meta', label: 'Meta Ads & FB', icon: 'meta' },
                { id: 'instagram', label: 'Instagram', icon: 'instagram' },
                { id: 'youtube', label: 'YouTube', icon: 'youtube' },
                { id: 'pinterest', label: 'Pinterest', icon: 'pinterest' },
                { id: 'snapchat', label: 'Snapchat', icon: 'snapchat' },
                { id: 'ai', label: 'AI Brand Voice', icon: null }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setChannelModalTab(tab.id)}
                  className={`px-4 py-3 flex items-center gap-2 border-b-2 whitespace-nowrap transition ${
                    channelModalTab === tab.id
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-extrabold bg-white dark:bg-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  {tab.icon && <PlatformIcon platform={tab.icon} className="w-3.5 h-3.5" />}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveChannelConfig} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              {/* META ADS TAB */}
              {channelModalTab === 'meta' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/30">
                    <div>
                      <span className="font-bold text-blue-900 dark:text-blue-200 block text-xs">
                        Agency Meta Ads & Facebook Service Status
                      </span>
                      <p className="text-[11px] text-blue-700 dark:text-blue-400 mt-0.5">
                        Is our agency currently running and optimizing Meta Ads for this client?
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={editingClient.socialChannels?.meta?.active || false}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            meta: { ...editingClient.socialChannels.meta, active: e.target.checked }
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                        Meta Ad Account ID * (act_...)
                      </label>
                      <input
                        type="text"
                        value={editingClient.socialChannels?.meta?.adAccountId || ''}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            meta: { ...editingClient.socialChannels.meta, adAccountId: e.target.value }
                          }
                        })}
                        placeholder="e.g. act_1606985407825083"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                        Meta Pixel ID (Datasets)
                      </label>
                      <input
                        type="text"
                        value={editingClient.socialChannels?.meta?.pixelId || ''}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            meta: { ...editingClient.socialChannels.meta, pixelId: e.target.value }
                          }
                        })}
                        placeholder="e.g. pix_90112233"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                        Facebook Page ID
                      </label>
                      <input
                        type="text"
                        value={editingClient.socialChannels?.meta?.pageId || ''}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            meta: { ...editingClient.socialChannels.meta, pageId: e.target.value }
                          }
                        })}
                        placeholder="e.g. 109823485723"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                        Facebook Page Handle / URL
                      </label>
                      <input
                        type="text"
                        value={editingClient.socialChannels?.meta?.handle || ''}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            meta: { ...editingClient.socialChannels.meta, handle: e.target.value }
                          }
                        })}
                        placeholder="e.g. @brand.official"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                      System Access Token (Encrypted)
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={editingClient.socialChannels?.meta?.accessToken || 'EAAZ_system_token_active'}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            meta: { ...editingClient.socialChannels.meta, accessToken: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500 pr-20"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* INSTAGRAM TAB */}
              {channelModalTab === 'instagram' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-pink-50/60 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-500/30">
                    <div>
                      <span className="font-bold text-pink-900 dark:text-pink-200 block text-xs">
                        Instagram Management Status
                      </span>
                      <p className="text-[11px] text-pink-700 dark:text-pink-400 mt-0.5">
                        Are we managing Reels, Stories and Grid posts for this client?
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={editingClient.socialChannels?.instagram?.active || false}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            instagram: { ...editingClient.socialChannels.instagram, active: e.target.checked }
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                        Instagram Handle * (@...)
                      </label>
                      <input
                        type="text"
                        value={editingClient.socialChannels?.instagram?.handle || ''}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            instagram: { ...editingClient.socialChannels.instagram, handle: e.target.value }
                          }
                        })}
                        placeholder="e.g. @brand_name"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                        Followers Count
                      </label>
                      <input
                        type="text"
                        value={editingClient.socialChannels?.instagram?.followers || ''}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            instagram: { ...editingClient.socialChannels.instagram, followers: e.target.value }
                          }
                        })}
                        placeholder="e.g. 45.2K"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                      Direct Instagram Profile URL
                    </label>
                    <input
                      type="url"
                      value={editingClient.socialChannels?.instagram?.url || ''}
                      onChange={(e) => setEditingClient({
                        ...editingClient,
                        socialChannels: {
                          ...editingClient.socialChannels,
                          instagram: { ...editingClient.socialChannels.instagram, url: e.target.value }
                        }
                      })}
                      placeholder="https://instagram.com/..."
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* YOUTUBE TAB */}
              {channelModalTab === 'youtube' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-red-50/60 dark:bg-red-950/30 border border-red-200 dark:border-red-500/30">
                    <div>
                      <span className="font-bold text-red-900 dark:text-red-200 block text-xs">
                        YouTube Channel Management Status
                      </span>
                      <p className="text-[11px] text-red-700 dark:text-red-400 mt-0.5">
                        Are we managing Shorts, editing long-form podcast/interviews, and handling SEO?
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={editingClient.socialChannels?.youtube?.active || false}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            youtube: { ...editingClient.socialChannels.youtube, active: e.target.checked }
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                        Channel Handle (@...)
                      </label>
                      <input
                        type="text"
                        value={editingClient.socialChannels?.youtube?.handle || ''}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            youtube: { ...editingClient.socialChannels.youtube, handle: e.target.value }
                          }
                        })}
                        placeholder="e.g. @BrandOfficial"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                        Subscribers Count
                      </label>
                      <input
                        type="text"
                        value={editingClient.socialChannels?.youtube?.subscribers || ''}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            youtube: { ...editingClient.socialChannels.youtube, subscribers: e.target.value }
                          }
                        })}
                        placeholder="e.g. 18.5K"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                      YouTube Channel ID (UC_...)
                    </label>
                    <input
                      type="text"
                      value={editingClient.socialChannels?.youtube?.channelId || ''}
                      onChange={(e) => setEditingClient({
                        ...editingClient,
                        socialChannels: {
                          ...editingClient.socialChannels,
                          youtube: { ...editingClient.socialChannels.youtube, channelId: e.target.value }
                        }
                      })}
                      placeholder="e.g. UC_brand_xyz"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* PINTEREST TAB */}
              {channelModalTab === 'pinterest' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/30">
                    <div>
                      <span className="font-bold text-rose-900 dark:text-rose-200 block text-xs">
                        Pinterest Account Status
                      </span>
                      <p className="text-[11px] text-rose-700 dark:text-rose-400 mt-0.5">
                        Active pin creation, product catalog sync, and idea pins.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={editingClient.socialChannels?.pinterest?.active || false}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            pinterest: { ...editingClient.socialChannels.pinterest, active: e.target.checked }
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Pinterest Handle</label>
                      <input
                        type="text"
                        value={editingClient.socialChannels?.pinterest?.handle || ''}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            pinterest: { ...editingClient.socialChannels.pinterest, handle: e.target.value }
                          }
                        })}
                        placeholder="e.g. @brand_pins"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Monthly Views</label>
                      <input
                        type="text"
                        value={editingClient.socialChannels?.pinterest?.monthlyViews || ''}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            pinterest: { ...editingClient.socialChannels.pinterest, monthlyViews: e.target.value }
                          }
                        })}
                        placeholder="e.g. 150K"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SNAPCHAT TAB */}
              {channelModalTab === 'snapchat' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30">
                    <div>
                      <span className="font-bold text-amber-900 dark:text-amber-200 block text-xs">
                        Snapchat Spotlight & Public Profile Status
                      </span>
                      <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">
                        Vertical Spotlight videos, filters, and Story Ads.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={editingClient.socialChannels?.snapchat?.active || false}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            snapchat: { ...editingClient.socialChannels.snapchat, active: e.target.checked }
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Snapchat Public Handle</label>
                      <input
                        type="text"
                        value={editingClient.socialChannels?.snapchat?.handle || ''}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            snapchat: { ...editingClient.socialChannels.snapchat, handle: e.target.value }
                          }
                        })}
                        placeholder="e.g. brand_snaps"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Public Profile ID</label>
                      <input
                        type="text"
                        value={editingClient.socialChannels?.snapchat?.publicProfileId || ''}
                        onChange={(e) => setEditingClient({
                          ...editingClient,
                          socialChannels: {
                            ...editingClient.socialChannels,
                            snapchat: { ...editingClient.socialChannels.snapchat, publicProfileId: e.target.value }
                          }
                        })}
                        placeholder="e.g. snap_123456"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* AI BRAND VOICE TAB */}
              {channelModalTab === 'ai' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/30">
                    <span className="font-bold text-purple-900 dark:text-purple-200 block text-xs">
                      Omnichannel AI Engine Settings
                    </span>
                    <p className="text-[11px] text-purple-700 dark:text-purple-400 mt-0.5">
                      Define the custom tone and audience demographics used by Gemini when generating content for this client's connected platforms.
                    </p>
                  </div>

                  <div>
                    <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                      Brand Voice & Editorial Tone *
                    </label>
                    <textarea
                      rows={3}
                      value={editingClient.aiPreferences?.brandVoice || ''}
                      onChange={(e) => setEditingClient({
                        ...editingClient,
                        aiPreferences: { ...editingClient.aiPreferences, brandVoice: e.target.value }
                      })}
                      placeholder="e.g. Sophisticated, witty, luxury-focused with crisp short sentences..."
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                      Target Audience Demographics & Pain Points
                    </label>
                    <textarea
                      rows={2}
                      value={editingClient.aiPreferences?.targetAudience || ''}
                      onChange={(e) => setEditingClient({
                        ...editingClient,
                        aiPreferences: { ...editingClient.aiPreferences, targetAudience: e.target.value }
                      })}
                      placeholder="e.g. Urban professionals aged 25-45 looking for premium lifestyle..."
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingClient(null)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Channel Connections</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OMNICHANNEL AI STUDIO DRAWER / MODAL */}
      {aiClient && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transition-colors">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/60 dark:to-indigo-950/60">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Omnichannel AI Creative Studio</span>
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Generating tailored creative for {aiClient.name} ({aiClient.brand})
                </p>
              </div>
              <button 
                onClick={() => setAiClient(null)} 
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                    Select Target Social Platform:
                  </label>
                  <select
                    value={aiPlatform}
                    onChange={(e) => setAiPlatform(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold focus:outline-none"
                  >
                    <option value="meta">Meta Ads (Facebook & Instagram Feed)</option>
                    <option value="instagram">Instagram Reel & Carousel</option>
                    <option value="youtube">YouTube Title & SEO Chapters</option>
                    <option value="snapchat">Snapchat 3s Spotlight Hook & Script</option>
                    <option value="pinterest">Pinterest Rich Pin & Aesthetics</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                    Campaign / Creative Goal:
                  </label>
                  <select
                    value={aiContentGoal}
                    onChange={(e) => setAiContentGoal(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold focus:outline-none"
                  >
                    <option value="Viral Reel Hook & Script">Viral Hook & Rapid Engagement</option>
                    <option value="High-Converting Ad">Direct Response & Sales Conversion</option>
                    <option value="Educational Authority">Educational Breakdown & Trust Building</option>
                    <option value="Seasonal Promo / Discount">Urgent Promo & Limited Time Offer</option>
                  </select>
                </div>
              </div>

              {/* Client Brand Voice Reminder */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Applied Brand Voice</span>
                  <p className="text-slate-800 dark:text-slate-200 font-semibold italic text-[11px] truncate max-w-md">
                    "{aiClient.aiPreferences?.brandVoice || 'Premium, engaging and modern'}"
                  </p>
                </div>
                <button
                  onClick={handleGenerateAiCreative}
                  disabled={aiGenerating}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-sm transition flex items-center gap-1.5 shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{aiGenerating ? 'Generating...' : 'Generate Now'}</span>
                </button>
              </div>

              {/* Generated Result Container */}
              {aiResult && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-purple-200 dark:border-purple-500/30 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                    <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <PlatformIcon platform={aiPlatform} className="w-3.5 h-3.5" />
                      Generated {aiPlatform.toUpperCase()} Asset
                    </span>
                    <button
                      onClick={() => copyToClipboard(aiResult)}
                      className="px-2.5 py-1 text-[11px] font-bold bg-white dark:bg-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-600 transition flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Render based on platform */}
                  {aiPlatform === 'meta' && (
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px]">HEADLINE:</span>
                        <p className="font-bold text-slate-900 dark:text-white">{aiResult.headline}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px]">PRIMARY AD TEXT:</span>
                        <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">{aiResult.primaryText}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px]">3 TESTING ANGLES:</span>
                        <div className="space-y-1 mt-1">
                          {aiResult.adAngles?.map((ang, i) => (
                            <div key={i} className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px]">
                              <strong className="text-blue-600 dark:text-blue-400">{ang.angle}:</strong> {ang.hook}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span>CTA: <strong className="text-emerald-600">{aiResult.callToAction}</strong></span>
                        <span className="text-slate-400 font-mono">Target Ad Account: {aiResult.adAccountConnected}</span>
                      </div>
                    </div>
                  )}

                  {aiPlatform === 'instagram' && (
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-500/30">
                        <span className="text-pink-700 dark:text-pink-300 font-bold block text-[10px]">3-SECOND VISUAL HOOK:</span>
                        <p className="font-extrabold text-slate-900 dark:text-white">{aiResult.reelHook}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px]">CAPTION WITH LINE-BREAKS:</span>
                        <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                          {aiResult.caption}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px]">CAROUSEL SLIDE BREAKDOWN:</span>
                        <ul className="list-disc pl-4 space-y-0.5 text-slate-600 dark:text-slate-300 text-[11px]">
                          {aiResult.carouselSlides?.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px]">30 TARGETED HASHTAGS:</span>
                        <p className="text-blue-600 dark:text-blue-400 text-[11px] font-semibold">{aiResult.hashtags}</p>
                      </div>
                    </div>
                  )}

                  {aiPlatform === 'youtube' && (
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px]">4 HIGH-CTR TITLE VARIATIONS:</span>
                        <div className="space-y-1 mt-1">
                          {aiResult.titles?.map((t, i) => (
                            <div key={i} className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white">
                              {i + 1}. {t}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px]">SEO DESCRIPTION & AUTO-CHAPTERS:</span>
                        <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                          {aiResult.seoDescription}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px]">VIDEO SEARCH TAGS:</span>
                        <p className="font-mono text-[11px] text-slate-600 dark:text-slate-400">{aiResult.tags}</p>
                      </div>
                    </div>
                  )}

                  {aiPlatform === 'snapchat' && (
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30">
                        <span className="text-amber-700 dark:text-amber-300 font-bold block text-[10px]">SPOTLIGHT HOOK:</span>
                        <p className="font-extrabold text-slate-900 dark:text-white">{aiResult.spotlightHook}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px]">15-SECOND SCRIPT TIMELINE:</span>
                        <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-[11px]">
                          {aiResult.script15s}
                        </p>
                      </div>
                    </div>
                  )}

                  {aiPlatform === 'pinterest' && (
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px]">AESTHETIC PIN TITLE:</span>
                        <p className="font-bold text-slate-900 dark:text-white">{aiResult.pinTitle}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px]">RICH PIN DESCRIPTION:</span>
                        <p className="text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                          {aiResult.pinDescription}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span>Board: <strong>{aiResult.boardSuggestion}</strong></span>
                        <span className="text-slate-400">{aiResult.keywords}</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Ready to assign to editor or media buyer?</span>
                    <button
                      onClick={handleCreateTaskFromAi}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Push to Master Production Pipeline</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
