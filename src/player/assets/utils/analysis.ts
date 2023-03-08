import DiffMatchPatch from 'diff-match-patch'
import { hiraToKata, kataToHira } from './japanese'
import { Tokenize } from './kuromoji-types'

const dmp = new DiffMatchPatch()

const JapaneseToFurigana = (japanese: string, furigana: string): string => {
  const diffs = dmp.diff_main(japanese, furigana)
  const ruby = { furigana: '', text: '' }

  diffs.push([0, ''])

  return diffs.reduce((res: string, curr: [position: number, text: string]): string => {
    const [position, text] = curr

    if (position === 0 && ruby.furigana && ruby.text) {
      res += `<ruby>${ruby.text}<rt>${ruby.furigana}</rt></ruby>`
      ruby.furigana = ''
      ruby.text = ''
    }

    position === 0
      ? res += text
      : ruby[position === 1 ? 'furigana' : 'text'] = text

    return res
  }, '')
}

const furiganaToKuromoji = (word: Tokenize) => {
  if (word.pos_detail_1 === '数' || word.basic_form === '*') return word.surface_form
  if (word.reading === '*' || hiraToKata(word.reading) === hiraToKata(word.surface_form)) return word.surface_form

  return JapaneseToFurigana(
    word.surface_form,
    kataToHira(word.reading)
  )
}

export { JapaneseToFurigana, furiganaToKuromoji }