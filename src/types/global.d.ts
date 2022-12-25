export declare global {
    interface Window {
        spa: {
            scan: () => void;
            navigate: (path?: string) => void;
        },
    }
}