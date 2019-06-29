export type Translation = {
  en?: string,
  kr?: string,
  vars?: {
    /** id to notes about usage */
    [id: string]: string
  }
}

export type TranslationModule = {
  [id: string]: {
    [variant: string]: Translation
  }
}
