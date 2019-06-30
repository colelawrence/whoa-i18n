// https://www.loc.gov/standards/iso639-2/php/code_list.php
export type Lang = 'en' | 'es' | 'ko'

export type Translation = {
  /** Variables used in template interpolation */
  vars?: {
    /** id to notes about usage */
    [id: string]: string
  }
} & {
  /** Template for language */
  [lang in Lang]?: string;
}

export type TranslationModule = {
  [id: string]: {
    [variant: string]: Translation
  }
}
