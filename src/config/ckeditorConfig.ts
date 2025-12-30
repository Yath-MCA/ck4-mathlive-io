
export const ckeditorConfig = {
    height: 400,
    allowedContent: true,
    extraAllowedContent: '*(*)[*]{*}',
    autoParagraph: false,
    ignoreEmptyParagraph: false,
    entities: false,
    entities_greek: false,
    entities_latin: false,
    htmlEncodeOutput: false,
    toolbar: [
        { name: 'document', items: ['Source'] },
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'Undo', 'Redo'] },
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', 'Blockquote'] },
        { name: 'tools', items: ['Maximize'] },
        { name: 'custom', items: ['InsertMath'] },
    ],
};
