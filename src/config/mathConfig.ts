
export type MathOutputFormat = 'mathlive' | 'svg' | 'png';

export interface MathConfig {
    outputFormat: MathOutputFormat;
    useTeXZilla: boolean;
}

export const mathConfig: MathConfig = {
    outputFormat: 'svg', // Default to SVG as per user request
    useTeXZilla: true
};
