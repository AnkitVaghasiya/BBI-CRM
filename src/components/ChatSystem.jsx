import React, { useState, useRef, useEffect } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  MessageSquare, 
  Send, 
  Clock, 
  Search,
  Bot,
  Sparkles
} from 'lucide-react';

export const ChatSystem = () => {
  const { 
    currentUser, 
    chats, 
    sendMessage, 
    clients, 
    selectedClientId, 
    setSelectedClientId,
    setActiveTab 
  } = useAgency();

  const isClient = currentUser.role === 'client';
  const activeClientId = isClient ? currentUser.clientId : selectedClientId;

  const [inputMessage, setInputMessage] = useState('');
  const [clientSearch, setClientSearch] = useState('');
  const messagesEndRef = useRef(null);

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
        return 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30';
      case 'video editing':
      case 'video-editing':
        return 'bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30';
      case 'management':
        return 'bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30';
      case 'meta ads & smm':
      case 'meta-ads':
        return 'bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30';
      default:
        return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors">
      {/* Channels Sidebar */}
      {!isClient && (
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-950/40">
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 space-y-2">
            <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Client Communications Hub</span>
            </h2>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search clients..."
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                className="w-full pl-8 pr-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/40">
            {filteredClientList.slice(0, 50).map(c => {
              const isSelected = c.id === activeClientId;
              const chatObj = chats.find(ch => ch.clientId === c.id);
              const lastMsg = chatObj && chatObj.messages?.length > 0 ? chatObj.messages[chatObj.messages.length - 1] : null;

              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedClientId(c.id)}
                  className={`w-full p-3 text-left transition flex items-start justify-between gap-2 ${
                    isSelected
                      ? 'bg-blue-50/80 dark:bg-blue-600/10 border-l-4 border-blue-600'
                      : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-bold truncate ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                      {c.name}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {lastMsg ? lastMsg.text : 'No messages yet'}
                    </p>
                  </div>

                  {lastMsg && (
                    <span className="text-[9px] text-slate-400 shrink-0 mt-0.5">
                      {lastMsg.timestamp?.split(',')[1]?.trim() || ''}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Chat Thread */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden bg-slate-50/20 dark:bg-slate-950/20">
        {/* Thread Header */}
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span>{activeClient?.name}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                SLA: &lt;3 Min Active
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Assigned Lead: {activeClient?.contactPerson} • {activeClient?.phone}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('ai-studio')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 dark:bg-purple-500/10 dark:hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 rounded-xl text-xs font-bold transition"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Fast Drafter</span>
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {messages.map(msg => {
            const isMe = msg.senderId === currentUser.id;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {msg.senderName}
                  </span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold border ${getRoleBadge(msg.senderRole)}`}>
                    {msg.senderRole}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{msg.timestamp}</span>
                  </span>
                </div>

                <div className={`p-3 rounded-2xl max-w-lg text-xs leading-relaxed shadow-sm ${
                  isMe
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}

          {messages.length === 0 && (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400 dark:text-slate-500">
              <MessageSquare className="w-10 h-10 stroke-1 mb-2 text-slate-300 dark:text-slate-600" />
              <p className="font-semibold text-xs text-slate-600 dark:text-slate-400">No Messages Yet</p>
              <p className="text-[11px] mt-1">Start the conversation with {activeClient?.name} below.</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Reply to ${activeClient?.name} (all messages logged with verified timestamps)...`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-sm shadow-blue-500/20 transition shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
