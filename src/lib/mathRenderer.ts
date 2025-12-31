import { mathConfig } from '../config/mathConfig';

declare global {
    interface Window {
        TeXZilla: any;
    }
}

export const renderLatex = (latex: string): string => {
    if (!mathConfig.useTeXZilla || mathConfig.outputFormat === 'mathlive') {
        return `<span class="math-span">${latex}</span>`;
    }

    if (window.TeXZilla) {
        try {
            if (mathConfig.outputFormat === 'svg') {
                // TeXZilla.toImage produces an image element with SVG data URI
                const img = window.TeXZilla.toImage(latex, true, 1.5);
                return `<span class="math-texzilla-svg" data-latex="${latex}">${img.outerHTML}</span>`;
            } else if (mathConfig.outputFormat === 'png') {
                // For PNG, we might need to use canvas or just assume TeXZilla.toImage can be configured
                // Usually TeXZilla returns an image. If we want PNG, we might need further steps,
                // but for now let's use the image it provides.
                const img = window.TeXZilla.toImage(latex, true, 1.5);
                return `<span class="math-texzilla-png" data-latex="${latex}">${img.outerHTML}</span>`;
            }
        } catch (e) {
            console.error('TeXZilla rendering error:', e);
            return `<span class="math-span">${latex}</span>`;
        } finally {
            return `<span class="math-span">${latex}</span>`;
        }
    }

    return `<span class="math-span">${latex}</span>`;
};

export const renderAllMathInEditor = (editor: any) => {
    console.log(mathConfig.outputFormat);

    if (mathConfig.outputFormat === 'mathlive') {
        if (window.MathLive) {
            const editorDoc = editor.document.$ as Document;
            window.MathLive.renderMathInElement(editorDoc.body);
        }
        return;
    }

    const editorDoc = editor.document.$ as Document;
    const mathSpans = editorDoc.querySelectorAll<HTMLElement>('.math-span, .math-texzilla-svg, .math-texzilla-png');

    function appendTex(selector: string, displayMode: boolean = false): void {

        // Use a Set to avoid duplicates if querying multiple sources
        const results: HTMLElement[] = Array.from(
            new Set([
                ...Array.from(editorDoc.querySelectorAll<HTMLElement>(selector)),
                ...Array.from(window.document.querySelectorAll<HTMLElement>(selector))
            ])
        );

        results.forEach((el: HTMLElement) => {
            const latex: string = el.textContent || '';
            if (!latex.trim()) return;

            try {
                const mathML = window.TeXZilla.toMathML(latex, displayMode);
                // Add class to original element to hide it
                el.classList.add("hidden");

                // Append MathML *after* the original element
                el.parentNode?.insertBefore(mathML, el.nextSibling);
            } catch (e) {
                console.error('TeXZilla rendering error in appendTex:', e);
            }
        });
    }

    // Inline math
    appendTex('span.tex:not(.hidden), .math-span:not(.hidden)');

    // Display math
    appendTex('div.tex:not(.hidden), .math-div:not(.hidden)', true);



    mathSpans.forEach((span: HTMLElement) => {
        const latex = span.getAttribute('data-latex') || span.innerText;
        const renderedHtml = renderLatex(latex);
        const tempDiv = editorDoc.createElement('div');
        tempDiv.innerHTML = renderedHtml;
        const newContent = tempDiv.firstChild as HTMLElement | null;

        if (newContent) {
            // span.innerHTML = newContent.innerHTML;
            // span.className = newContent.className;
            // span.setAttribute('data-latex', latex);
        }
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
