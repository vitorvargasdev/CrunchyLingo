export const inject = async (): Promise<void> => {  
  const head = document.getElementsByTagName('head')[0]
  const player = document.getElementById('vilosRoot')
  const timestamp = new Date().getTime()

  const css: HTMLLinkElement = document.createElement('link')
  css.rel = 'stylesheet'
  css.id = 'app-css'
  css.href = chrome.runtime.getURL('/assets/main.css?timestamp=' + timestamp)
  head?.appendChild(css)

  const div: HTMLDivElement = document.createElement('div')
  div.id = 'app'
  div.style.position = 'absolute'
  div.style.webkitUserSelect = 'text'
  div.style.userSelect = 'text'
  div.style.left = '0'
  div.style.width = '100%'
  div.setAttribute('extension', chrome.runtime.getURL('/'))
  
  player?.append(div)

  const script: HTMLScriptElement = document.createElement('script')
  script.type = 'module'
  script.src = chrome.runtime.getURL('/assets/player.js?timestamp=' + timestamp)
  script.id = 'app-script'
  head?.appendChild(script)

  const kuromoji: HTMLScriptElement = document.createElement('script')
  kuromoji.src = chrome.runtime.getURL('/kuromoji.js?timestamp=' + timestamp)
  kuromoji.id = 'kuromoji-script'
  head?.appendChild(kuromoji)
}
