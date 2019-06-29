export type Translation = {
  en?: string,
  kr?: string,
  vars?: {[id: string]: string}
}

export type TranslationModule = {
  [id: string]: {
    [variant: string]: Translation
  }
}
