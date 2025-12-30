# Professional Collaborative CMS with Math Support

A state-of-the-art content management interface built with **React**, **TypeScript**, and **CKEditor 4**, featuring advanced mathematical expression integration via **MathLive**.

![Editor Preview](https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=2000)

## 🌟 Key Features

### 1. CKEditor 4 Integration
*   **VanillaJS Implementation**: A low-level integration demonstrating direct DOM manipulation and CKEditor instance management.
*   **React Implementation**: A modern, component-based approach using dedicated React wrappers.
*   **Advanced Configuration**: Customized toolbar, allowed content rules, and disabled entity encoding for clean mathematical output.

### 2. Advanced Mathematical Support (MathLive)
*   **Embedded Math**: Seamlessly insert high-quality mathematical formulas into your documents.
*   **Interactive Math Editor**: A custom-built dialog powered by MathLive for effortless LaTeX input and visual editing.
*   **One-Click Editing**: Simply click on any existing equation to open the math editor and modify the LaTeX live.
*   **Automatic Rendering**: Uses standard `math-span` elements that are automatically typeset into beautiful math notation.

## 🚀 Getting Started

### Prerequisites
*   Node.js (LTS version recommended)
*   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd project-bolt-sb1-w5rm5fie
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
*   **Math Rendering**: MathLive
*   **Styling**: TailwindCSS, Lucide-React

## 📖 How to Use the Math Editor

1.  **Insert New Equation**:
    *   Find the gold **"Insert Math"** button in the editor toolbar.
    *   Type your LaTeX (e.g., `e^{i \pi} + 1 = 0`) in the visual math field.
    *   Click "Insert Equation".

2.  **Edit Existing Equation**:
    *   Hover and **click** any mathematical expression inside the editor.
    *   The MathLive editor will open automatically with the current LaTeX.
    *   Make your changes and click "Update Equation".

## 🛡️ Best Practices Implemented

*   **Type Safety**: Comprehensive TypeScript interfaces for all components and editor instances.
*   **Performance**: Dynamic script loading for heavy editor libraries.
*   **SEO & Semantics**: Semantic HTML5 structure with optimized meta headings.
*   **UX/UI**: Premium, responsive design with smooth transitions and glassmorphism accents.

---

Built with ❤️ for advanced content creation.
