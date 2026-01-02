import { useState } from 'react';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' or 'dashboard'

  // Simple router function
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'landing':
      default:
        return <LandingPage onEnterApp={() => setCurrentPage('dashboard')} />;
    }
  };

  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: 'var(--spacing-lg) 0',
        textAlign: 'center',
        marginTop: 'auto'
      }}>
        <div className="container">
          <p style={{ margin: 0, opacity: 0.7 }}>&copy; 2025 KisanMandi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
