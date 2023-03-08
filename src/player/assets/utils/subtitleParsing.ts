const cleanText = (lines: string): string => {
  const BREAK_RE = /(<br>)/ig // sub files shouldn't have these, but some do
  const NL_RE = /(\\n|\\N)/ig
  const TAG_RE = /(<([^>]+)>)/ig
  const ASS_STYLE_RE = /(\{\\[^}]*\})/ig
  return lines.trim().replace(BREAK_RE, '\n').replace(NL_RE, '\n').replace(TAG_RE, '').replace(ASS_STYLE_RE, '')
}

const parseASSTime = (time: string) => {
  const regex = /(\d):(\d{2}):(\d{2})\.(\d{2})/

  const regexResult: RegExpExecArray | null = regex.exec(time)

  if (regexResult === null) return 0

  const hours: string = regexResult[1]
  const mins: string = regexResult[2]
  const seconds: string = regexResult[3]
  const ms: string = regexResult[4]

  return 3600 * (+hours) + 60 * (+mins) + (+seconds) + 0.01 * (+ms)
}

export const parseASS = (text: string) => {
  const EVENTS_SECTION_RE = /^\[Events\]\s+Format:(.*)\s*([^]*)/mg
  const EVENT_LINE_RE = /([^:]+):\s*(.*)/

  const result = []

  const eventsSectionMatch: RegExpExecArray | null = EVENTS_SECTION_RE.exec(text)
  if (eventsSectionMatch) {
    const fieldNames: string[] = eventsSectionMatch[1].split(',').map(s => s.trim())
    if (fieldNames[fieldNames.length - 1] !== 'Text') {
      throw new Error('Last field of ASS events must be Text')
    }

    const startFieldIdx: number = fieldNames.indexOf('Start')
    if (startFieldIdx < 0) {
      throw new Error('Start field not found in ASS events format')
    }
    const endFieldIdx: number = fieldNames.indexOf('End')
    if (endFieldIdx < 0) {
      throw new Error('End field not found in ASS events format')
    }

    const eventLines: string[] = eventsSectionMatch[2].trim().split('\n').map(s => s.trim())

    for (const eventLine of eventLines) {
      const lineMatch: RegExpExecArray | null = EVENT_LINE_RE.exec(eventLine)
      if (lineMatch) {
        const eventType: string = lineMatch[1]
        if (eventType === 'Dialogue') {
          const fields: string[] = lineMatch[2].split(',')
          const text: string = fields.slice(fieldNames.length - 1).join(',').trim()
          const start: number = parseASSTime(fields[startFieldIdx])
          const end: number = parseASSTime(fields[endFieldIdx])
          if (text) {
            result.push({
              begin: start,
              end,
              lines: cleanText(text)
            })
          }
        }
      }
    }
  }

  return result
}