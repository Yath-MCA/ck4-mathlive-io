import { FileText, Code, Layout, Settings, PenTool, Zap, Globe, CheckCircle2 } from 'lucide-react';

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
            CMS with TeXZilla & MathLive
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Create rich content with mathematical expressions using CKEditor 4, MathLive, and TeXZilla
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
              Pure JavaScript implementation with CKEditor 4, MathLive, and TeXZilla rendering
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
              Modern React implementation with MathLive dialogs and TeXZilla support
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

        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">CKEditor 4 + MathLive + TeXZilla Workflow</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A high-performance pipeline for modern mathematical content creation and rendering.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-8"></div>

            {[
              {
                icon: <Settings className="w-8 h-8 text-blue-500" />,
                title: "1. Integration",
                desc: "Seamlessly embed CKEditor 4 with custom MathLive-aware plugins.",
                color: "blue"
              },
              {
                icon: <PenTool className="w-8 h-8 text-yellow-500" />,
                title: "2. Visual Editing",
                desc: "Type LaTeX intuitively via MathLive's visual interface and virtual keyboards.",
                color: "yellow"
              },
              {
                icon: <Zap className="w-8 h-8 text-purple-500" />,
                title: "3. Fast Rendering",
                desc: "Convert LaTeX to MathML or SVG instantly using the TeXZilla engine.",
                color: "purple"
              },
              {
                icon: <Globe className="w-8 h-8 text-green-500" />,
                title: "4. Global Sync",
                desc: "Deploy structured math content to GitHub Pages with automated CI/CD.",
                color: "green"
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 flex flex-col items-center text-center group hover:shadow-lg transition-shadow">
                <div className={`p-4 rounded-xl bg-${step.color}-50 mb-4 group-hover:scale-110 transition-transform`}>
                  {step.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.desc}</p>
                <div className="mt-4">
                  <CheckCircle2 className={`w-5 h-5 text-${step.color}-500 opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <div className="bg-slate-900 rounded-3xl p-12 max-w-4xl mx-auto text-white shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-yellow-600 rounded-full blur-3xl opacity-20"></div>

            <h3 className="text-3xl font-bold mb-6">Ready to build the future of content?</h3>
            <p className="text-slate-300 mb-8 text-lg">
              Explore the hybrid rendering engine and see why leading researchers choose our CMMS integration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onNavigate('react')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg hover:-translate-y-1"
              >
                Get Started with React
              </button>
              <button
                onClick={() => onNavigate('vanillajs')}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold backdrop-blur-sm border border-white/20 transition-all"
              >
                View VanillaJS Source
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
