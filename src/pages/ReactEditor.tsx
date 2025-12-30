import { useEffect, useRef, useState, useMemo } from 'react';
import { Home, Save, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';
import CKEditor4 from '../components/CKEditor4';
import mathExamples from '../data/mathExamples.json';

interface ReactEditorProps {
  onNavigate: (page: 'landing') => void;
}

function ReactEditor({ onNavigate }: ReactEditorProps) {
  const randomExample = useMemo(() => {
    return mathExamples[Math.floor(Math.random() * mathExamples.length)];
  }, []);

  const [currentDocId, setCurrentDocId] = useState<string | null>(null);
  const [title, setTitle] = useState(randomExample.title);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [savedDocuments, setSavedDocuments] = useState<any[]>([]);
  const editorInstanceRef = useRef<any>(null);

  useEffect(() => {
    loadSavedDocuments();
  }, []);

  const loadSavedDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_content')
        .select('*')
        .eq('editor_type', 'react')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setSavedDocuments(data || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  const handleSave = async () => {
    if (!editorInstanceRef.current) return;

    setIsSaving(true);
    setSaveStatus('');

    const content = editorInstanceRef.current.getData();

    try {
      const payload = {
        title: title || 'Untitled Document',
        content,
        editor_type: 'react',
        user_id: null,
      };

      let error;
      if (currentDocId) {
        ({ error } = await supabase
          .from('cms_content')
          .update(payload)
          .eq('id', currentDocId));
      } else {
        const { data, error: insertError } = await supabase
          .from('cms_content')
          .insert(payload)
          .select()
          .single();

        error = insertError;
        if (data && !error) {
          setCurrentDocId(data.id);
        }
      }

      if (error) throw error;

      setSaveStatus(currentDocId ? 'Content updated successfully!' : 'Content saved successfully!');
      await loadSavedDocuments();
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('Error saving content. Please try again.');
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const loadDocument = (doc: any) => {
    if (editorInstanceRef.current) {
      setCurrentDocId(doc.id);
      setTitle(doc.title);
      editorInstanceRef.current.setData(doc.content);
      setSaveStatus(`Loaded: ${doc.title}`);
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

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
          <button
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Content'}</span>
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                CKEditor 4 + MathLive (React)
              </h1>
              <p className="text-slate-600">
                Component-based implementation with state management and mathematical expressions
              </p>
            </div>

            {saveStatus && (
              <div
                className={`mb-4 p-4 rounded-lg ${saveStatus.includes('Error')
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
                  }`}
              >
                {saveStatus}
              </div>
            )}

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

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Recent Documents
              </h3>
              {savedDocuments.length === 0 ? (
                <p className="text-sm text-slate-500">No saved documents yet</p>
              ) : (
                <div className="space-y-2">
                  {savedDocuments.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => loadDocument(doc)}
                      className="w-full text-left p-3 rounded-lg hover:bg-blue-50 border border-slate-200 transition-colors"
                    >
                      <div className="font-medium text-slate-900 text-sm truncate">
                        {doc.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {new Date(doc.created_at).toLocaleDateString()}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReactEditor;
