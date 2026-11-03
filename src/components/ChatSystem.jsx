import React, { useState, useRef, useEffect } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  MessageSquare, 
  Send, 
  Clock, 
  User, 
  ShieldCheck, 
  Paperclip, 
  Sparkles, 
  Search, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const ChatSystem = () => {
  const { 
    currentUser, 
    chats, 
    sendMessage, 
    clients, 
    selectedClientId, 
    setSelectedClientId 
  } = useAgency();

  // If client role, lock channel to their own client ID
  const isClient = currentUser.role === 'client';
  const activeClientId = isClient ? currentUser.clientId : selectedClientId;

  const [inputMessage, setInputMessage] = useState('');
  const [clientSearch, setClientSearch] = useState('');
  const messagesEndRef = useRef(null);

  // Find active chat or empty
  const currentChat = chats.find(c => c.clientId === activeClientId);
  const activeClient = clients.find(c => c.id === activeClientId) || clients[0];
  const messages = currentChat ? currentChat.messages : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessage(activeClientId, inputMessage);
    setInputMessage('');
  };

  const filteredClientList = clients.filter(c => 
    c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.brand.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case 'client':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'video editing':
      case 'video-editing':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'management':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'meta ads & smm':
      case 'meta-ads':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'ai content':
      case 'ai-content':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'shooting team':
      case 'shooting-team':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Client Channels Sidebar (Only shown for agency team members, hidden for client) */}
      {!isClient && (
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col bg-slate-950/40">
          <div className="p-3 border-b border-slate-800 space-y-2">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
              <span>Client Chat Channels</span>
            </h2>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search client channel..."
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                className="w-full pl-8 pr-2 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
            {filteredClientList.slice(0, 50).map(c => {
              const isSelected = c.id === activeClientId;
              const chatObj = chats.find(ch => ch.clientId === c.id);
              const lastMsg = chatObj && chatObj.messages?.length > 0 ? chatObj.messages[chatObj.messages.length - 1] : null;

              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedClientId(c.id)}
                  className={`w-full p-3 text-left transition flex items-start justify-between gap-2 ${
                    isSelected ? 'bg-blue-600/10 border-l-4 border-blue-500' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className="space-y-0.5 overflow-hidden">
                    <p className={`text-xs font-bold truncate ${isSelected ? 'text-blue-400' : 'text-white'}`}>
                      {c.name}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {lastMsg ? lastMsg.text : 'No messages yet'}
                    </p>
                  </div>
                  {lastMsg && (
                    <span className="text-[9px] text-slate-500 shrink-0 mt-0.5 font-mono">
                      {lastMsg.timestamp?.split(',')[1]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Chat Conversation Area */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        {/* Channel Top Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-base">
              {activeClient?.name?.charAt(0) || 'C'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">{activeClient?.name} Channel</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Direct Communication
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Contact: {activeClient?.contactPerson} ({activeClient?.phone}) • Retainer Client
              </p>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-slate-500 block font-mono">Channel ID: {activeClientId}</span>
            <span className="text-xs text-blue-400 font-medium">Logged in: {currentUser.name}</span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map(msg => {
            const isMe = msg.senderId === currentUser.id;
            const isClientMsg = msg.senderRole?.toLowerCase() === 'client';

            return (
              <div 
                key={msg.id} 
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                {/* Sender Metadata with Date & Time Timestamp */}
                <div className="flex items-center gap-2 mb-1 text-[11px]">
                  <span className="font-bold text-slate-300">{msg.senderName}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold border ${getRoleBadge(msg.senderRole)}`}>
                    {msg.senderRole}
                  </span>
                  <span className="text-slate-500 flex items-center gap-1 font-mono text-[10px]">
                    <Clock className="w-3 h-3" />
                    <span>{msg.timestamp}</span>
                  </span>
                </div>

                {/* Message Bubble */}
                <div 
                  className={`max-w-xl p-3.5 rounded-2xl text-xs leading-relaxed shadow-md ${
                    isMe 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : isClientMsg
                        ? 'bg-emerald-950/80 text-emerald-100 border border-emerald-500/40 rounded-bl-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          })}

          {messages.length === 0 && (
            <div className="text-center py-16 text-slate-500 text-xs">
              Start a conversation with the team for {activeClient?.name}. All messages are stored with exact date and time timestamps.
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Message ${activeClient?.name} team (Timestamps are recorded automatically)...`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
