# Professional Collaborative CMS with Math Support

A state-of-the-art content management interface built with **React**, **TypeScript**, and **CKEditor 4**, featuring advanced mathematical expression integration via **MathLive** and **TeXZilla**.

![Editor Preview](https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=2000)

## 🌟 Key Features

### 1. Hybrid Math Rendering Engine
*   **MathLive Integration**: Interactive, visual math editing with a custom-built dialog.
*   **TeXZilla Support**: Powerful server-less LaTeX-to-MathML and LaTeX-to-SVG conversion for high-performance rendering.
*   **Flexible Output**: Supports multiple output formats including `mathlive` (interactive), `svg`, `png`, and pure `MathML`.

### 2. CKEditor 4 Integration
*   **VanillaJS & React Implementations**: Demonstrates both direct DOM manipulation and modern component-based approaches.
*   **Advanced Click-to-Edit**: Detects clicks on rendered MathML, SVG, or hidden LaTeX spans to trigger the interactive editor seamlessly.
*   **Dynamic Content Styling**: Custom CSS (`editor.css`) injected into the editor iframe for premium visuals during editing.

### 3. Smart Rendering Logic
*   **Automatic Typesetting**: Automatically scans and renders elements with `.tex`, `.math-span`, or `.math-div` classes.
*   **Shadowing Prevention**: Robust DOM manipulation logic that safely handles multiple documents (main page + editor iframe).

## 🚀 Getting Started

### Prerequisites
*   Node.js (LTS version recommended)
*   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd ck4-mathlive-io
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Launch development server**:
    ```bash
    npm run dev
    ```

## 🛠️ Technology Stack

*   **Frontend**: React 18, TypeScript, Vite
*   **Rich Text**: CKEditor 4
*   **Math Libraries**: MathLive, TeXZilla
*   **Styling**: TailwindCSS, Vanilla CSS (Design Systems), Lucide-React

## 📖 How to Use the Math Editor

1.  **Insert New Equation**:
    *   Find the **"Insert Math"** button in the editor toolbar.
    *   Type your LaTeX (e.g., `\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}`) in the visual math field.
    *   Click "Insert Equation".

2.  **Edit Existing Equation**:
    *   **Click** any mathematical expression inside the editor (even after it has been rendered as MathML/SVG).
    *   The MathLive editor will open automatically with the original LaTeX source.
    *   Make your changes and click "Update Equation".

## 🛡️ Best Practices Implemented

*   **Type Safety**: Comprehensive TypeScript interfaces for all components, math configurations, and editor instances.
*   **Cache Busting**: Automatic CSS cache management for editor styles.
*   **Cross-Document Queries**: Advanced logic to bridge the gap between the main application and the CKEditor iframe.
*   **SEO & Semantics**: Semantic HTML5 structure with optimized meta headings and ARIA-friendly math tags.

---

Built with ❤️ for advanced content creation.
