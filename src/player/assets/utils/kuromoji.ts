import { KuromojiBuilder, Tokenizer } from './kuromoji-types'

declare const kuromoji: KuromojiBuilder

export const startKuromoji = async (): Promise<Tokenizer> => {
  console.log('Loading Kuromoji ...')

  return new Promise((resolve, reject) => {
    const baseUrl = document.querySelector('#app')?.getAttribute('extension')
    kuromoji.builder({ dicPath: `${baseUrl}/dict` })
      .build(async (err: boolean, tokenizer: Tokenizer) => {
        if (err) {
          console.log(tokenizer)
          reject(tokenizer)
        }

        console.log('Kuromoji loaded')

        resolve(tokenizer)
      })
  })
}
