import { renderLatex } from '../lib/mathRenderer';

export const openMathDialog = (editor: any, initialLatex = '', targetElement: any = null) => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(15, 23, 42, 0.6);            
    display: flex;
    align-items: center;
    justify-content: center;            
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    z-index: 10000;
  `;

    overlay.innerHTML = `
    <div style="background: #ffffff; padding: 24px; border-radius: 16px; width: 480px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); border: 1px solid #e2e8f0;">
        <h4 style="margin: 0 0 16px 0; font-size: 1.25rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #eab308;"><path d="m9 9 6 6"/><path d="m15 9-6 6"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h1v1"/><path d="M7 16h1v1"/><path d="M16 7h1v1"/><path d="M16 16h1v1"/></svg>
          ${targetElement ? 'Update Math' : 'MathLive Editor'}
        </h4>
        <div style="margin-bottom: 20px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px; background: #f8fafc;">
          <math-field id="mf" style="width: 100%; font-size: 20px; outline: none; background: transparent;"></math-field>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
            <button id="cancel" style="padding: 8px 16px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; color: #64748b; font-weight: 600; cursor: pointer; transition: all 0.2s;">Cancel</button>
            <button id="ok" style="padding: 8px 16px; border-radius: 8px; border: none; background: #eab308; color: white; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 6px -1px rgba(234, 179, 8, 0.3);">${targetElement ? 'Update Equation' : 'Insert Equation'}</button>
        </div>
    </div>
  `;

    document.body.appendChild(overlay);

    const mf = overlay.querySelector('#mf') as any;
    const cancelBtn = overlay.querySelector('#cancel') as HTMLButtonElement;
    const okBtn = overlay.querySelector('#ok') as HTMLButtonElement;

    if (initialLatex) {
        mf.value = initialLatex;
    }

    // Focus the math field
    setTimeout(() => mf.focus(), 100);

    cancelBtn.onmouseover = () => { cancelBtn.style.background = '#f1f5f9'; };
    cancelBtn.onmouseout = () => { cancelBtn.style.background = 'white'; };

    okBtn.onmouseover = () => { okBtn.style.background = '#ca8a04'; };
    okBtn.onmouseout = () => { okBtn.style.background = '#eab308'; };

    cancelBtn.onclick = () => overlay.remove();

    const handleSave = () => {
        const latex = mf.value;
        if (latex) {
            if (targetElement) {
                const renderedHtml = renderLatex(latex);
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = renderedHtml;
                const newContent = tempDiv.firstChild as HTMLElement;

                // Copy attributes if necessary
                if (newContent) {
                    targetElement.setHtml(newContent.innerHTML);
                    // Update attributes on the actual targetElement in CKEditor
                    targetElement.setAttribute('class', newContent.className);
                    targetElement.setAttribute('data-latex', latex);
                }
            } else {
                const renderedHtml = renderLatex(latex);
                editor.insertHtml(renderedHtml);
            }

            setTimeout(() => {
                if (window.MathLive) {
                    import('../config/mathConfig').then(({ mathConfig }) => {
                        if (mathConfig.outputFormat === 'mathlive') {
                            window.MathLive.renderMathInDocument();
                        }
                    });
                }
            }, 100);
        }
        overlay.remove();
    };

    okBtn.onclick = handleSave;

    // Handle Enter key
    mf.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        }
        if (e.key === 'Escape') {
            overlay.remove();
        }
    });
};
