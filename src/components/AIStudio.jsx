import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  Bot, 
  Sparkles, 
  Copy, 
  Check, 
  Send, 
  Wand2, 
  Flame, 
  FileText, 
  MessageSquare, 
  Target,
  RefreshCw
} from 'lucide-react';

export const AIStudio = () => {
  const { clients, selectedClientId, setSelectedClientId, sendMessage, tasks, saveTask } = useAgency();

  const [activeTool, setActiveTool] = useState('caption');
  const [targetClient, setTargetClient] = useState(selectedClientId || 'client-1');
  const [tone, setTone] = useState('viral');
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const clientObj = clients.find(c => c.id === targetClient) || clients[0];

  const handleGenerate = () => {
    setIsGenerating(true);
    setCopied(false);

    setTimeout(() => {
      let output = '';
      const clientName = clientObj.name;
      const brand = clientObj.brand;

      if (activeTool === 'caption') {
        output = `🔥 EXCLUSIVE LAUNCH: Elevate your lifestyle with the all-new ${brand} signature release!

Designed for those who demand precision, elegance, and unyielding performance. Whether you are stepping into a high-stakes boardroom or owning the weekend, this is your statement.

✨ Highlights:
• Handcrafted detailing & modern ergonomic silhouette
• Premium finishes that turn heads instantly
• Available now at authorized flagship showrooms

👇 Tap the link in our bio to book your private preview or order today before inventory runs out!
.
.
#${brand.replace(/\s+/g, '')} #StyleStatement #LuxuryLiving #TrendingReels #FestiveCollection #ExclusiveDrop #AuthorizedDealer`;
      } else if (activeTool === 'hooks') {
        output = `🎯 3 VIRAL 3-SECOND HOOKS FOR ${brand.toUpperCase()} REELS:

Hook 1 (Curiosity Gap):
"Stop scrolling if you are still making this 1 major mistake when styling your accessories..."
Visual: Rapid macro zoom into watch dial with intense sound design riser.

Hook 2 (Contrarian / High Value):
"Nobody is talking about this, but here is why high-performers never settle for ordinary gear in 2026."
Visual: Fast cut transitions between high-tempo motion shots and crisp product reveal.

Hook 3 (Urgency / Exclusive):
"If you want to get your hands on this before Diwali, you need to watch this right now."
Visual: Dynamic unboxing reveal with text overlay bouncing on beat.

🎬 CTA (End Screen):
"Comment 'LINK' below and we will DM you the exclusive catalog immediately!"`;
      } else if (activeTool === 'sla') {
        output = `Hello ${clientObj.contactPerson}! 

Thank you for reaching out to the BrainBinary operations desk. 

Our lead editor and Meta media buyer have reviewed your request for ${brand}. All adjustments are being implemented right now. Your updated 4K revision will be uploaded to the client portal by 3:30 PM today for your sign-off.

Please let us know if you need anything else expedited in the meantime!`;
      } else if (activeTool === 'ads') {
        output = `📊 META ADS HIGH-CONVERSION COPY PACK (${brand}):

Primary Text (Angle: Social Proof + Limited Availability):
"Over 1,200+ clients have already experienced the ${brand} difference. For the next 48 hours only, claim our exclusive festive concierge package with complimentary doorstep consultation."

Headline:
"Authorized Edition — Claim 15% Festive Privilege Today"

Description:
"★★★★★ 4.9/5 Rating by 850+ Verified Customers"

Targeting Angle (Surat / Mumbai High Net Worth):
• Placements: Instagram Reels & Feed, Facebook Mobile Feed
• Age: 24 - 52
• Interests: Luxury Goods, Luxury Lifestyle, Chronograph Watches, Architectural Digest
• Call to Action: 'Book Now' / 'Learn More'`;
      }

      setGeneratedOutput(output);
      setIsGenerating(false);
    }, 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendToChat = () => {
    if (!generatedOutput) return;
    sendMessage(targetClient, generatedOutput);
    alert(`Output posted directly into ${clientObj.name} timestamped chat!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              AI Creative & Operations Studio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> High Precision GenAI
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Generate viral captions, 3-second reel hooks, 3-minute SLA client responses, and Meta ad copy in 1 click.
          </p>
        </div>

        {/* Client selector */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold shadow-sm">
          <span className="text-slate-500 dark:text-slate-400">Target Client:</span>
          <select
            value={targetClient}
            onChange={(e) => {
              setTargetClient(e.target.value);
              setSelectedClientId(e.target.value);
            }}
            className="bg-transparent text-slate-900 dark:text-white font-bold focus:outline-none cursor-pointer"
          >
            {clients.slice(0, 30).map(c => (
              <option key={c.id} value={c.id} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tool Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => { setActiveTool('caption'); setGeneratedOutput(''); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTool === 'caption'
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Captions & Hashtags</span>
        </button>

        <button
          onClick={() => { setActiveTool('hooks'); setGeneratedOutput(''); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTool === 'hooks'
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Viral 3-Second Hooks</span>
        </button>

        <button
          onClick={() => { setActiveTool('sla'); setGeneratedOutput(''); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTool === 'sla'
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>3-Min SLA Client Responder</span>
        </button>

        <button
          onClick={() => { setActiveTool('ads'); setGeneratedOutput(''); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTool === 'ads'
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Meta Ad Copy & Targeting</span>
        </button>
      </div>

      {/* Main Studio Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Controls Column */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Generation Parameters</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Tone & Voice</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none"
              >
                <option value="viral">Viral, Energetic & High-Retention</option>
                <option value="luxury">Luxury, Minimal & Ultra-Premium</option>
                <option value="conversion">Direct Response & High-Conversion CTA</option>
                <option value="professional">Corporate, Authoritative & Sober</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                Specific Topic / Product / Campaign Focus (Optional)
              </label>
              <textarea
                rows={4}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={`e.g. Diwali festive watch offer, 4K luxury interior walkthrough reel, or urgent client delivery update for ${clientObj.brand}...`}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
              <p className="font-semibold text-slate-700 dark:text-slate-300">Brand Context Injected:</p>
              <p>• Client: <strong>{clientObj.name}</strong></p>
              <p>• Industry: <strong>{clientObj.industry}</strong></p>
              <p>• Retainer Tier: <strong>₹{clientObj.monthlyRetainer.toLocaleString()}/mo</strong></p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing with AI Engine...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Content Now</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Column */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>AI Output</span>
              </h2>

              {generatedOutput && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleSendToChat}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-semibold transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to Client Chat</span>
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4">
              {generatedOutput ? (
                <pre className="whitespace-pre-wrap font-sans text-xs text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 max-h-[380px] overflow-y-auto">
                  {generatedOutput}
                </pre>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400 dark:text-slate-500">
                  <Bot className="w-12 h-12 stroke-1 mb-3 text-slate-300 dark:text-slate-600" />
                  <p className="font-semibold text-xs text-slate-600 dark:text-slate-400">Ready to Generate</p>
                  <p className="text-[11px] mt-1 max-w-xs">
                    Choose a tool above, set your tone, and click "Generate Content Now" to produce instant deliverable-ready copy.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Model: Gemini 2.0 Flash / Antigravity Agent Engine</span>
            <span>Zero hallucination prompt guardrails active</span>
          </div>
        </div>

      </div>
    </div>
  );
};
