const cleanText = (lines: string) => {
  const BREAK_RE = /(<br>)/ig // sub files shouldn't have these, but some do
  const NL_RE = /(\\n|\\N)/ig
  const TAG_RE = /(<([^>]+)>)/ig
  const ASS_STYLE_RE = /(\{\\[^}]*\})/ig
  return lines.trim().replace(BREAK_RE, '\n').replace(NL_RE, '\n').replace(TAG_RE, '').replace(ASS_STYLE_RE, '')
}

const parseSRTTime = (srtTime: string): number => {
  const regex = /(\d{2}):(\d{2}):(\d{2}),(\d{3})/
  const regexResult: RegExpExecArray | null = regex.exec(srtTime)
  
  if (regexResult === null) return 0

  const hours: string = regexResult[1]
  const mins: string = regexResult[2]
  const seconds: string = regexResult[3]
  const ms: string = regexResult[4]

  return 3600 * (+hours) + 60 * (+mins) + (+seconds) + 0.001 * (+ms)
}

export const parseSRT = (subtitle: string) => {
  const normText: string = subtitle.replace(/\r\n/g, '\n') // normalize newlines

  const beginToEndStr = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\s*\n((?:.+\n)+)/g
  const subs = []

  let found
  let notFound = true

  while (notFound) {
    found = beginToEndStr.exec(normText)
    if (!found) {
      notFound = false
      break
    }
    const [full, , beginStr, endStr, lines] = found
    const begin: number = parseSRTTime(beginStr)
    const end: number = parseSRTTime(endStr)

    subs.push({
      begin,
      end,
      lines: cleanText(lines)
    })
    beginToEndStr.lastIndex = found.index + full.length
  }

  return subs
}

