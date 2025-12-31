import { mathConfig } from '../config/mathConfig';

declare global {
    interface Window {
        TeXZilla: any;
    }
}

// ─────────────────────────────────────────────
// 2. ID store (safe & fast)
// ─────────────────────────────────────────────
window.usedMathIds = [];

export const generateUniqueMathId = (): string => {
    let id: string;
    do {
        id = `m${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, '0')}`;
    } while (window.usedMathIds.includes(id));

    window.usedMathIds.push(id);
    return id;
};

export const renderLatex = (latex: string): { id: string; html: string } => {

    const id = generateUniqueMathId();

    if (!mathConfig.useTeXZilla || mathConfig.outputFormat === 'mathlive') {
        return {
            id,
            html: `<span id="${id}" class="math-span">${latex}</span>`
        };
    }

    if (window.TeXZilla) {

        try {
            if (mathConfig.outputFormat === 'svg') {
                // TeXZilla.toImage produces an image element with SVG data URI
                const img = window.TeXZilla.toImage(latex, true, 1.5);
                // return `<span class="math-texzilla-svg" data-latex="${latex}">${img.outerHTML}</span>`;
            } else if (mathConfig.outputFormat === 'png') {
                // For PNG, we might need to use canvas or just assume TeXZilla.toImage can be configured
                // Usually TeXZilla returns an image. If we want PNG, we might need further steps,
                // but for now let's use the image it provides.
                const img = window.TeXZilla.toImage(latex, true, 1.5);
                // return `<span class="math-texzilla-png" data-latex="${latex}">${img.outerHTML}</span>`;
            }
        } catch (e) {
            console.error('TeXZilla rendering error:', e);
            return {
                id,
                html: `<span id="${id}" class="math-span" data-new="true">${latex}</span>`
            };
        } finally {
            return {
                id,
                html: `<span id="${id}" class="math-span" data-new="true">${latex}</span>`
            };
        }
    }

    return {
        id,
        html: `<span id="${id}" class="math-span" data-new="true">${latex}</span>`
    };
};

export const renderAllMathInEditor = (editor: any, existingId: string) => {
    if (!editor || !editor.document) return;

    const editorDoc = editor.document.$ as Document;

    // ─────────────────────────────────────────────
    // 1. MathLive rendering
    // ─────────────────────────────────────────────
    if (mathConfig.outputFormat === 'mathlive') {
        if (window.MathLive) {
            window.MathLive.renderMathInElement(editorDoc.body);
        }
        return;
    }



    // ─────────────────────────────────────────────
    // 3. Append / replace MathML
    // ─────────────────────────────────────────────
    const appendTex = (selector: string, displayMode = false): void => {
        const elements = editorDoc.querySelectorAll<HTMLElement>(selector);

        elements.forEach(el => {
            const latex = el.textContent?.trim();
            if (!latex) return;

            // Ensure stable ID
            let mathId = el.getAttribute('id');
            if (!mathId) {
                mathId = generateUniqueMathId();
                el.setAttribute('id', mathId);
            }

            try {
                const mathML = window.TeXZilla.toMathML(latex, displayMode);
                mathML.setAttribute('data-id', mathId);

                const parent = el.parentNode;
                if (!parent) return;

                const next = el.nextSibling;
                const existingMathML = parent.querySelector<HTMLElement>(
                    `math[data-id="${mathId}"]`
                );

                if (existingMathML) {
                    existingMathML.replaceWith(mathML);
                } else {
                    parent.insertBefore(mathML, next);
                }
                // Hide source LaTeX
                el.classList.add('hidden');
            } catch (e) {
                console.error('TeXZilla rendering error:', e);
            }
        });
    };

    // ─────────────────────────────────────────────
    // 4. Render inline & display math (correct split)
    // ─────────────────────────────────────────────
    appendTex(existingId ? `[id=${existingId}]` : '.tex:not(.hidden), .math-span:not(.hidden)');
    appendTex(existingId ? `[id=${existingId}]` : '.tex:not(.hidden), .math-span:not(.hidden)', true);

    // ─────────────────────────────────────────────
    // 5. Optional custom renderers (SVG / PNG)
    // ─────────────────────────────────────────────
    const mathSpans = editorDoc.querySelectorAll<HTMLElement>(
        '.math-texzilla-svg, .math-texzilla-png'
    );

    mathSpans.forEach(span => {
        const latex = span.getAttribute('data-latex') || span.innerText;
        if (!latex.trim()) return;

        const { html, id } = renderLatex(latex);
        const tempDiv = editorDoc.createElement('div');
        tempDiv.innerHTML = html;

        const newContent = tempDiv.firstElementChild as HTMLElement | null;
        if (!newContent) return;

        // Uncomment if replacement is required
        // span.innerHTML = newContent.innerHTML;
        // span.className = newContent.className;
    });
};


export const renderNormalDOM = () => {
    if (!window.TeXZilla) return;

    const texElements = document.querySelectorAll<HTMLElement>('.tex');
    texElements.forEach((el) => {
        const latex = el.innerText || el.textContent || '';
        if (!latex.trim()) return;

        try {
            if (window.TeXZilla.toMathMLString) {
                // const mathml = window.TeXZilla.toMathMLString(latex);
            }

            // Use isDisplay to differentiate between display and inline math
            if (window.TeXZilla.toImage) {
                // const isDisplay = el.tagName === 'DIV';
                // const img = window.TeXZilla.toImage(latex, isDisplay, 1.5);
                // el.innerHTML = img.outerHTML;
                // el.className = (isDisplay ? 'math-texzilla-display' : 'math-texzilla-inline') + ' tex-rendered';
                // el.setAttribute('data-latex', latex);
            }


        } catch (e) {
            console.error('TeXZilla DOM rendering error:', e);
        }
    });



};
