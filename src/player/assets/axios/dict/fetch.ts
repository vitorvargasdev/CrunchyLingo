import axios from 'axios'
import type { ORIGIN } from './types'

const fetch = async (keyword: string, origin: ORIGIN) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://static.crunchyroll.com'
  }
  const url = `https://dict.vitorvargas.dev/search?keyword=${keyword}&origin=${origin}`
  return await axios
    .get(url, { headers })
    .then((response) => response?.data)
}

export default fetch
