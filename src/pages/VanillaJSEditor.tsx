import { useState, useCallback, useMemo, useEffect } from 'react';
import { Home, FileText } from 'lucide-react';
import CKEditor4 from '../components/CKEditor4';
import mathExamples from '../data/mathExamples.json';
import { renderNormalDOM } from '../lib/mathRenderer';

interface VanillaJSEditorProps {
  onNavigate: (page: 'landing') => void;
}

function VanillaJSEditor({ onNavigate }: VanillaJSEditorProps) {
  const randomExample = useMemo(() => {
    return mathExamples[Math.floor(Math.random() * mathExamples.length)];
  }, []);

  const [title, setTitle] = useState(randomExample.title);
  const [content] = useState(randomExample.content);
  const [isLoading, setIsLoading] = useState(true);

  const handleEditorReady = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Wait for TeXZilla to be available if it's not yet
    const timer = setInterval(() => {
      if (window.TeXZilla) {
        renderNormalDOM();
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center space-x-2 text-slate-700 hover:text-yellow-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-semibold">Home</span>
            </button>
            <div className="flex items-center space-x-2 text-yellow-600">
              <FileText className="w-5 h-5" />
              <span className="font-semibold">VanillaJS Editor</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              CKEditor 4 + MathLive + TeXZilla (VanillaJS)
            </h1>
            <p className="text-slate-600">
              Standalone editor with direct DOM manipulation and MathLive integration
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                Document Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Content Editor
              </label>
              {isLoading && (
                <div className="flex items-center justify-center py-20 bg-slate-50 rounded-lg">
                  <div className="text-slate-600">Loading editor...</div>
                </div>
              )}
              <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
                <CKEditor4
                  initialData={content}
                  onReady={handleEditorReady}
                />
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-2">How to use Math:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-slate-700">
                <li>Click the "Insert Math" button in the toolbar</li>
                <li>Enter your LaTeX expression (e.g., x^2 + y^2 = z^2)</li>
                <li>The expression will be rendered beautifully in the editor</li>
              </ol>
            </div>
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-2">Texzila</h3>
              <div>
                <span className="tex">\int_a^b f(x) d x = F(b) - F(a)</span>
                <div className="tex">\int_0^\pi 2 \cos(\theta) - 3 \sin(\theta) d\theta = \left[ 2 \sin(\theta) + 3 \cos(\theta) \right]_0^\pi = -6</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VanillaJSEditor;
