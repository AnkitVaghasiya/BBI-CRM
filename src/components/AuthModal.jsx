import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  Mail, 
  Briefcase, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  X, 
  ArrowRight, 
  Building2, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { validatePasswordStrength } from '../utils/security';

export const AuthModal = ({ isOpen, onClose }) => {
  const { 
    currentUser, 
    loginUser, 
    registerUser, 
    switchRole, 
    clients, 
    partnerAgencies,
    setSelectedClientId
  } = useAgency();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('video-editing');
  const [regDepartment, setRegDepartment] = useState('Video Editing & VFX');
  const [regClientBrand, setRegClientBrand] = useState('');
  const [regPartnerAgency, setRegPartnerAgency] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    setLoading(true);

    try {
      const result = await loginUser(loginIdentifier, loginPassword);
      if (result.success) {
        setAuthSuccess(`Welcome back, ${result.user.name}!`);
        setTimeout(() => {
          onClose();
        }, 600);
      } else {
        setAuthError(result.error || 'Failed to authenticate.');
      }
    } catch {
      setAuthError('An unexpected authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    setLoading(true);

    try {
      const passValidation = validatePasswordStrength(regPassword);
      if (!passValidation.isValid) {
        setAuthError(passValidation.message);
        setLoading(false);
        return;
      }

      const result = await registerUser({
        username: regUsername,
        email: regEmail,
        name: regName,
        role: regRole,
        department: regDepartment,
        password: regPassword,
        clientId: regRole === 'client' ? (clients[0]?.id || 'client-1') : null,
        partnerAgencyId: regRole === 'vendor' ? (partnerAgencies[0]?.id || 'agency-vendor-1') : null
      });

      if (result.success) {
        setAuthSuccess('Account created successfully! Logging you in...');
        // Auto-login
        await loginUser(regUsername, regPassword);
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setAuthError(result.error || 'Registration failed.');
      }
    } catch {
      setAuthError('An unexpected registration error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoSwitch = (roleName, clientObj = null) => {
    switchRole(roleName, clientObj || clients[0]);
    if (roleName === 'client' && clients.length > 0) {
      setSelectedClientId(clients[0].id);
    }
    setAuthSuccess(`Switched to demo role: ${roleName.toUpperCase()}`);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-transparent flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Account & Authentication Hub
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Secure access for Staff, Clients, Vendors & Leadership
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-4 flex gap-2 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => { setActiveTab('login'); setAuthError(''); setAuthSuccess(''); }}
            className={`pb-3 text-xs font-bold transition border-b-2 ${
              activeTab === 'login'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Sign In with ID & Password
          </button>
          <button
            onClick={() => { setActiveTab('register'); setAuthError(''); setAuthSuccess(''); }}
            className={`pb-3 text-xs font-bold transition border-b-2 ${
              activeTab === 'register'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Create New Account / Register
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {authError && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-xs text-red-700 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {authSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{authSuccess}</span>
            </div>
          )}

          {/* TAB 1: LOGIN */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Login ID / Email / Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. admin or vicky.editor or ankit.ambika"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                <p className="font-semibold text-slate-700 dark:text-slate-300">Quick Testing Credentials:</p>
                <p>• Admin: <code className="text-blue-600 dark:text-blue-400 font-mono">admin</code> / <code className="text-blue-600 dark:text-blue-400 font-mono">admin123</code></p>
                <p>• Editor: <code className="text-blue-600 dark:text-blue-400 font-mono">vicky.editor</code> / <code className="text-blue-600 dark:text-blue-400 font-mono">admin123</code></p>
                <p>• Client: <code className="text-blue-600 dark:text-blue-400 font-mono">ankit.ambika</code> / <code className="text-blue-600 dark:text-blue-400 font-mono">admin123</code></p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
              >
                {loading ? 'Authenticating...' : 'Sign In Securely'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 2: REGISTER */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Account Type & Access Role
                </label>
                <select
                  value={regRole}
                  onChange={(e) => {
                    const r = e.target.value;
                    setRegRole(r);
                    if (r === 'video-editing') setRegDepartment('Video Editing & VFX');
                    else if (r === 'shooting-team') setRegDepartment('Cinematography & Shoots');
                    else if (r === 'ai-content') setRegDepartment('AI Prompt & Copywriting');
                    else if (r === 'meta-ads') setRegDepartment('Performance Marketing & Ads');
                    else if (r === 'management') setRegDepartment('Executive Leadership');
                    else if (r === 'client') setRegDepartment('Client Brand Portal');
                    else if (r === 'vendor') setRegDepartment('External Partner Studio');
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white"
                >
                  <option value="video-editing">🎬 Video Editor / VFX Specialist</option>
                  <option value="shooting-team">🎥 Cinematographer / DoP</option>
                  <option value="ai-content">🤖 AI Prompt & Content Specialist</option>
                  <option value="meta-ads">📊 Meta Ads & Media Buyer</option>
                  <option value="client">🏢 Client Brand Account</option>
                  <option value="vendor">🤝 Partner Agency / External Vendor</option>
                  <option value="management">👑 Executive Management / Super Admin</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name / Brand Name
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Choose Login ID / Username
                  </label>
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="e.g. rahul.editor"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Create Password (minimum 6 chars, letters & numbers)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Create secure password"
                    className="w-full px-3 py-2 pr-10 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-2 mt-2"
              >
                {loading ? 'Registering Account...' : 'Create Account & Sign In'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Demo Switcher Section */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              ⚡ Quick Role Simulator (Instant Preview)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleQuickDemoSwitch('management')}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-left text-xs transition"
              >
                <p className="font-bold text-blue-600 dark:text-blue-400 text-[11px]">👑 Admin</p>
                <p className="text-[10px] text-slate-500 truncate">Executive view</p>
              </button>

              <button
                onClick={() => handleQuickDemoSwitch('video-editing')}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-left text-xs transition"
              >
                <p className="font-bold text-indigo-600 dark:text-indigo-400 text-[11px]">🎬 Editor</p>
                <p className="text-[10px] text-slate-500 truncate">VFX & tasks</p>
              </button>

              <button
                onClick={() => handleQuickDemoSwitch('client')}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-left text-xs transition"
              >
                <p className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">🏢 Client</p>
                <p className="text-[10px] text-slate-500 truncate">Approvals only</p>
              </button>

              <button
                onClick={() => handleQuickDemoSwitch('meta-ads')}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-900/30 text-left text-xs transition"
              >
                <p className="font-bold text-purple-600 dark:text-purple-400 text-[11px]">📊 Ads Lead</p>
                <p className="text-[10px] text-slate-500 truncate">Media buyer</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
