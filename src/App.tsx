import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import VanillaJSEditor from './pages/VanillaJSEditor';
import ReactEditor from './pages/ReactEditor';

type Page = 'landing' | 'vanillajs' | 'react';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'vanillajs':
        return <VanillaJSEditor onNavigate={setCurrentPage} />;
      case 'react':
        return <ReactEditor onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return <div className="min-h-screen">{renderPage()}</div>;
}

export default App;
