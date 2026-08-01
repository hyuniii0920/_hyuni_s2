import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const FONT_LOAD_TIMEOUT = 5000

function mountApp() {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

async function prepareFonts() {
  if (!document.fonts) return true

  const fontLoads = Promise.all([
    document.fonts.load('300 16px Inter'),
    document.fonts.load('400 16px Inter'),
    document.fonts.load('500 16px Inter'),
    document.fonts.load('300 72px "Cormorant Garamond"'),
    document.fonts.load('400 48px "Cormorant Garamond"'),
    document.fonts.load('500 48px "Cormorant Garamond"'),
    document.fonts.load('600 22px "Cormorant Garamond"'),
    document.fonts.load('700 22px "Cormorant Garamond"'),
    document.fonts.load('italic 300 20px "Cormorant Garamond"'),
    document.fonts.load('italic 400 20px "Cormorant Garamond"'),
  ])
    .then((loadedFaces) => {
      if (loadedFaces.some((faces) => faces.length === 0)) return false
      return document.fonts.ready.then(() => true)
    })

  const timeout = new Promise((resolve) => {
    window.setTimeout(() => resolve(false), FONT_LOAD_TIMEOUT)
  })

  return Promise.race([fontLoads, timeout])
}

prepareFonts()
  .then((fontsReady) => {
    if (!fontsReady) document.documentElement.classList.add('use-fallback-fonts')
  })
  .catch(() => document.documentElement.classList.add('use-fallback-fonts'))
  .finally(mountApp)
