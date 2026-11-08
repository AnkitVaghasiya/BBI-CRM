import React, { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Bulletproof Error Boundary to prevent blank blue screens
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CRITICAL REACT RENDER ERROR CAUGHT:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleResetStorage = () => {
    // Clear agency localStorage keys that might be corrupted
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('agency_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xl">
                ⚠️
              </div>
              <div>
                <h1 className="text-base font-extrabold text-white">Application Recovery Console</h1>
                <p className="text-xs text-slate-400">A runtime error occurred in the browser workspace.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs font-mono overflow-x-auto space-y-1">
              <p className="font-bold text-rose-400">Error: {this.state.error?.message || 'Unknown runtime error'}</p>
              {this.state.error?.stack && (
                <pre className="text-[10px] text-slate-400 max-h-36 overflow-y-auto pt-1">
                  {this.state.error.stack}
                </pre>
              )}
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={this.handleResetStorage}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
              >
                <span>Clear Cached Data & Restore Verified Workspace</span>
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Global window error listener for unhandled rejections
window.addEventListener('error', (event) => {
  console.error('Global Window Error Event:', event.error || event.message);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
