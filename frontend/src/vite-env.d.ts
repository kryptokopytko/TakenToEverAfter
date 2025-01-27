/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IMGUR_AUTHORIZATION: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
