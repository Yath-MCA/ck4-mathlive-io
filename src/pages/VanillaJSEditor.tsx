import { useState, useCallback, useMemo, useEffect } from 'react';
import { Home, Save, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';
import CKEditor4 from '../components/CKEditor4';
import mathExamples from '../data/mathExamples.json';

interface VanillaJSEditorProps {
  onNavigate: (page: 'landing') => void;
}

function VanillaJSEditor({ onNavigate }: VanillaJSEditorProps) {
  const randomExample = useMemo(() => {
    return mathExamples[Math.floor(Math.random() * mathExamples.length)];
  }, []);

  const [currentDocId, setCurrentDocId] = useState<string | null>(null);
  const [title, setTitle] = useState(randomExample.title);
  const [content, setContent] = useState(randomExample.content);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [savedDocuments, setSavedDocuments] = useState<any[]>([]);
  const [editorInstance, setEditorInstance] = useState<any>(null);

  const loadSavedDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_content')
        .select('*')
        .eq('editor_type', 'vanillajs')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setSavedDocuments(data || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  useEffect(() => {
    loadSavedDocuments();
  }, []);

  const handleEditorReady = useCallback((editor: any) => {
    setEditorInstance(editor);
    setIsLoading(false);
  }, []);

  const handleEditorChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  const handleSave = async () => {
    if (!editorInstance) return;

    setIsSaving(true);
    setSaveStatus('');

    try {
      const payload = {
        title: title || 'Untitled Document',
        content: content,
        editor_type: 'vanillajs',
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
    } catch (err) {
      setSaveStatus('Error saving content. Please try again.');
      console.error('Save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const loadDocument = (doc: any) => {
    if (editorInstance) {
      setCurrentDocId(doc.id);
      setTitle(doc.title);
      editorInstance.setData(doc.content);
      setSaveStatus(`Loaded: ${doc.title}`);
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

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
          <button
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className="flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                CKEditor 4 + MathLive (VanillaJS)
              </h1>
              <p className="text-slate-600">
                Refactored React implementation with modular components
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
                    onChange={handleEditorChange}
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
                      className="w-full text-left p-3 rounded-lg hover:bg-yellow-50 border border-slate-200 transition-colors"
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

export default VanillaJSEditor;
