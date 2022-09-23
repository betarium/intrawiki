/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_MANAGE_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
