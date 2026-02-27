
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';

const envErrors = [];
if (!import.meta.env.VITE_SUPABASE_URL) {
  envErrors.push("VITE_SUPABASE_URL is missing in environment variables.");
}
if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  envErrors.push("VITE_SUPABASE_ANON_KEY is missing in environment variables.");
}

const renderApp = () => {
  if (envErrors.length > 0) {
    return (
      <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#e53e3e', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>Configuration Error</h1>
        <p style={{ fontSize: '18px', color: '#4a5568' }}>The application cannot start because essential environment variables are missing:</p>
        <ul style={{ background: '#fff5f5', padding: '20px 40px', borderRadius: '8px', color: '#c53030', fontWeight: 'bold' }}>
          {envErrors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>
        <p style={{ marginTop: '20px', color: '#718096' }}>
          Please check your <code>.env.local</code> file or environment configuration and ensure these variables are correctly set.
        </p>
      </div>
    );
  }
  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  renderApp()
);
