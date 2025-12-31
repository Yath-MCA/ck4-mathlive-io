
export { };

declare global {
    interface Window {
        CKEDITOR: any;
        MathLive: any;
        TeXZilla: any;
        usedMathIds: Array<string>;
    }
}
