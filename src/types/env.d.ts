/// <reference types="astro/client" />


interface ImportMetaEnv {
    readonly PRODUCTION: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}