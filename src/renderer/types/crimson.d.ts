export {}

declare global {
  interface Window {
    crimson: {
      openImage: () => Promise<{filePath: string, dataUrl: string} | null>
      saveText: (opts: { defaultPath?: string, content: string }) => Promise<string | null>
      openText: () => Promise<{ filePath: string, content: string } | null>
      storeGet: (key: string) => Promise<any>
      storeSet: (key: string, value: unknown) => Promise<boolean>
    }
  }
}
