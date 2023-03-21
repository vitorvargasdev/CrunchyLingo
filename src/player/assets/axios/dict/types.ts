export enum ORIGIN {
  JISHO = 'jisho',
  MANABOU = 'manabou'
}

export type ManabouEntry = {
  id: string
  readings: ManabouReadings[]
  senses: ManabouSenses[]
}[]

export type ManabouReadings = {
  kanji?: string
  kana?: string
}

type ManabouSenses = {
  id: string
  part_of_speech: string
  definition: string
}

export type JishoEntry = {
  slug: string
  japanese: JishoReadings[]
  senses: JishoSenses[]
  is_common?: boolean
  jlpt: string[]
}[]

export type JishoReadings = {
  word?: string
  reading?: string
}

type JishoSenses = {
  parts_of_speech: string[]
  english_definitions: string[]
}
