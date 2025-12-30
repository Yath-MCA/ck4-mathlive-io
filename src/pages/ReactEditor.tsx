import { useRef, useState, useMemo } from 'react';
import { Home, FileText } from 'lucide-react';
import CKEditor4 from '../components/CKEditor4';
import mathExamples from '../data/mathExamples.json';

interface ReactEditorProps {
  onNavigate: (page: 'landing') => void;
}

function ReactEditor({ onNavigate }: ReactEditorProps) {
  const randomExample = useMemo(() => {
    return mathExamples[Math.floor(Math.random() * mathExamples.length)];
  }, []);

  const [title, setTitle] = useState(randomExample.title);
  const [isLoading, setIsLoading] = useState(true);
  const editorInstanceRef = useRef<any>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-semibold">Home</span>
            </button>
            <div className="flex items-center space-x-2 text-blue-600">
              <FileText className="w-5 h-5" />
              <span className="font-semibold">React Editor</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              CKEditor 4 + MathLive (React)
            </h1>
            <p className="text-slate-600">
              Standalone component-based editor with mathematical expressions
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
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
              <div style={{ display: isLoading ? 'none' : 'block' }}>
                <CKEditor4
                  initialData={randomExample.content}
                  onReady={(editor) => {
                    editorInstanceRef.current = editor;
                    setIsLoading(false);
                  }}
                />
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-2">Math Formula Examples:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                <li>Quadratic: x^2 + 5x + 6 = 0</li>
                <li>Pythagorean: a^2 + b^2 = c^2</li>
                <li>Fraction: \frac{'{numerator}'}{'{denominator}'}</li>
                <li>Square root: \sqrt{'{x}'}</li>
                <li>Sum: \sum_{'{i=1}'}^{'{n}'} x_i</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReactEditor;
