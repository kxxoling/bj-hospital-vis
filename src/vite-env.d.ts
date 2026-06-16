/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module 'coordtransform' {
  export function bd09togcj02(lng: number, lat: number): [number, number]
  export function gcj02tobd09(lng: number, lat: number): [number, number]
  export function wgs84togcj02(lng: number, lat: number): [number, number]
  export function gcj02towgs84(lng: number, lat: number): [number, number]
}

interface ImportMetaEnv {
  readonly BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
