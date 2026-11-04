import React, { useState, useRef, useEffect } from 'react';
import { useAgency } from '../context/AgencyContext';
import { 
  MessageSquare, 
  Send, 
  Clock, 
  Search
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
              <span>क्लाइंट चैट्स (Client Channels)</span>
            </h2>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="क्लाइंट खोजें..."
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
                    isSelected ? 'bg-blue-50 dark:bg-blue-600/10 border-l-4 border-blue-600' : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="space-y-0.5 overflow-hidden">
                    <p className={`text-xs font-bold truncate ${isSelected ? 'text-blue-700 dark:text-blue-400' : 'text-slate-800 dark:text-white'}`}>
                      {c.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {lastMsg ? lastMsg.text : 'बातचीत शुरू करें'}
                    </p>
                  </div>
                  {lastMsg && (
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 shrink-0 mt-0.5 font-mono">
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
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white text-base shadow-sm">
              {activeClient?.name?.charAt(0) || 'C'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{activeClient?.name}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                  लाइव चैनल
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                संपर्क: {activeClient?.contactPerson} ({activeClient?.phone})
              </p>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-slate-400 font-mono">चैनल: {activeClientId}</span>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium block">लॉगिन: {currentUser.name}</span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/30 dark:bg-slate-900/50">
          {messages.map(msg => {
            const isMe = msg.senderId === currentUser.id;
            const isClientMsg = msg.senderRole?.toLowerCase() === 'client';

            return (
              <div 
                key={msg.id} 
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                {/* Sender Metadata with Date & Time */}
                <div className="flex items-center gap-2 mb-1 text-[11px]">
                  <span className="font-bold text-slate-700 dark:text-slate-300">{msg.senderName}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold border ${getRoleBadge(msg.senderRole)}`}>
                    {msg.senderRole}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 font-mono text-[10px]">
                    <Clock className="w-3 h-3" />
                    <span>{msg.timestamp}</span>
                  </span>
                </div>

                {/* Message Bubble */}
                <div 
                  className={`max-w-xl p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    isMe 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : isClientMsg
                        ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-100 border border-emerald-200 dark:border-emerald-500/40 rounded-bl-none'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          })}

          {messages.length === 0 && (
            <div className="text-center py-16 text-slate-400 text-xs">
              {activeClient?.name} के साथ बातचीत शुरू करें। हर मैसेज की तारीख और समय रिकॉर्ड होता है।
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 flex items-center gap-2">
          <input
            type="text"
            placeholder={`मैसेज लिखें...`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm shadow-blue-500/20"
          >
            <span>भेजें</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
