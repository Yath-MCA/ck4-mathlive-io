import { FileText, Code, Layout } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'vanillajs' | 'react') => void;
}

function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-2xl">
              <FileText className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            CMS with Math Integration
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Create rich content with mathematical expressions using CKEditor 4 and MathLive
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div
            onClick={() => onNavigate('vanillajs')}
            className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-yellow-500 p-4 rounded-xl">
                <Code className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3 text-center">
              VanillaJS Implementation
            </h2>
            <p className="text-slate-600 text-center mb-6">
              Pure JavaScript implementation with CKEditor 4 and MathLive integration
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                No framework dependencies
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                Lightweight and fast
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                Direct DOM manipulation
              </li>
            </ul>
            <div className="mt-8 text-center">
              <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                Launch Editor
              </button>
            </div>
          </div>

          <div
            onClick={() => onNavigate('react')}
            className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 p-4 rounded-xl">
                <Layout className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3 text-center">
              React Implementation
            </h2>
            <p className="text-slate-600 text-center mb-6">
              Modern React implementation with component-based architecture
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Component-based design
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                State management with hooks
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Modern React patterns
              </li>
            </ul>
            <div className="mt-8 text-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Launch Editor
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Features</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Rich Text Editing</h4>
                <p className="text-slate-600 text-sm">
                  Full-featured WYSIWYG editor with CKEditor 4
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Math Support</h4>
                <p className="text-slate-600 text-sm">
                  Beautiful mathematical expressions with MathLive
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Content Storage</h4>
                <p className="text-slate-600 text-sm">
                  Persistent storage with Supabase database
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
