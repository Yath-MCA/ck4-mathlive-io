import { useEffect, useRef } from 'react';
import { ckeditorConfig } from '../config/ckeditorConfig';
import { openMathDialog } from './MathLiveDialog';

interface CKEditor4Props {
    initialData?: string;
    onChange?: (data: string) => void;
    onReady?: (editor: any) => void;
}

const CKEditor4 = ({ initialData, onChange, onReady }: CKEditor4Props) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const editorInstanceRef = useRef<any>(null);

    useEffect(() => {
        const loadScripts = async () => {
            // Check if scripts are already loaded
            if (!window.CKEDITOR) {
                const ckeditorScript = document.createElement('script');
                ckeditorScript.src = 'https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js';
                ckeditorScript.async = true;
                document.body.appendChild(ckeditorScript);
                await new Promise((resolve) => {
                    ckeditorScript.onload = resolve;
                });
            }

            const mathLiveStylesId = 'mathlive-styles';
            if (!document.getElementById(mathLiveStylesId)) {
                const mathLiveStyles = document.createElement('link');
                mathLiveStyles.id = mathLiveStylesId;
                mathLiveStyles.rel = 'stylesheet';
                mathLiveStyles.href = 'https://unpkg.com/mathlive@0.95.5/dist/mathlive-static.css';
                document.head.appendChild(mathLiveStyles);
            }

            // Load MathLive
            if (!window.MathLive) {
                await import('https://esm.run/mathlive').then((mathlive) => {
                    window.MathLive = mathlive;
                    mathlive.renderMathInDocument();
                });
            }

            if (editorRef.current && window.CKEDITOR) {
                // If an instance already exists, destroy it first
                if (window.CKEDITOR.instances[editorRef.current.id]) {
                    window.CKEDITOR.instances[editorRef.current.id].destroy();
                }

                const editor = window.CKEDITOR.replace(editorRef.current, ckeditorConfig);

                editor.on('instanceReady', () => {
                    if (initialData) {
                        editor.setData(initialData);
                    }
                    if (onReady) {
                        onReady(editor);
                    }
                });

                editor.on('change', () => {
                    if (onChange) {
                        onChange(editor.getData());
                    }
                });

                // MathLive Integration
                editor.addCommand('insertMath', {
                    exec: (editor: any) => {
                        openMathDialog(editor);
                    },
                });

                editor.ui.addButton('InsertMath', {
                    label: 'Insert Math',
                    command: 'insertMath',
                    toolbar: 'custom',
                    icon: 'https://cdn-icons-png.flaticon.com/512/3771/3771471.png',
                });

                editor.on('contentDom', () => {
                    editor.editable().on('click', (evt: any) => {
                        const target = evt.data.getTarget();
                        const mathSpan = target.getAscendant((el: any) => {
                            return el.hasClass && el.hasClass('math-span');
                        }, true);
                        if (mathSpan) {
                            const latex = mathSpan.getText();
                            openMathDialog(editor, latex, mathSpan);
                        }
                    });
                });

                editorInstanceRef.current = editor;
            }
        };

        loadScripts();

        return () => {
            if (editorInstanceRef.current) {
                editorInstanceRef.current.destroy();
                editorInstanceRef.current = null;
            }
        };
    }, []);

    return <div ref={editorRef} />;
};

export default CKEditor4;
