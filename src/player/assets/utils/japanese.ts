const KATA_BEGIN = 0x30A1
const KATA_HIRACOMPAT_END = 0x30F6

const HIRA_BEGIN = 0x3041
const HIRA_END = 0x3096

const shiftRange = (text: string, begin: number, end: number, offset: number): string => {
  return text.split('')
    .reduce((res: string[], curr: string): string[] => {
      const char = curr.charCodeAt(0)
      const checkIfInRange = char >= begin && char <= end

      checkIfInRange
        ? res.push(String.fromCharCode(char + offset))
        : res.push(curr)

      return res
    }, [])
    .join('')
}

const hiraToKata = (text: string) => shiftRange(text, HIRA_BEGIN, HIRA_END, KATA_BEGIN - HIRA_BEGIN)
const kataToHira = (text: string) => shiftRange(text, KATA_BEGIN, KATA_HIRACOMPAT_END, HIRA_BEGIN - KATA_BEGIN)

export { hiraToKata, kataToHira }
