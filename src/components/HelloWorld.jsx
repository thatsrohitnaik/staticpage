// src/components/HelloWorld.jsx
import { useEffect, useState } from 'react'
import './HelloWorld.css'
import defaultBg from '../assets/images/home.png'
import mobileBg from '../assets/images/home.png'
import Confetti from './Confetti/Confetti'

// collect all SVG file URLs from the images folder using Vite's import.meta.glob
// This works with Vite; it eagerly imports the modules so we get URLs.
let svgUrls = []
try {
  const modules = import.meta.glob('../assets/images/*.svg', { eager: true })
  // modules is an object: { './b.svg': module, ... }
  svgUrls = Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => {
      // In eager mode the imported module may expose the URL as default
      // or directly as a string depending on Vite config; handle both.
      if (!mod) return null
      return (mod && (mod.default ?? mod))
    })
    .filter(Boolean)
} catch {
  // fallback to empty list if glob isn't supported in some environments
  svgUrls = []
}

// initialize isMobile from matchMedia to avoid setting state synchronously in an effect
const getIsMobile = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(max-width: 767px)').matches
}

export default function HelloWorld({ bgImage }) {
  const [isMobile, setIsMobile] = useState(getIsMobile)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const onChange = (e) => setIsMobile(e.matches)
    // don't call setIsMobile here synchronously (we already initialized state above)
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange)
    } else {
      mql.addListener(onChange)
    }
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', onChange)
      } else {
        mql.removeListener(onChange)
      }
    }
  }, [])

  // Use provided bgImage prop first, then mobile fallback, then default
  const bg = bgImage || (isMobile ? mobileBg : defaultBg)
  const style = {
    backgroundImage: `url(${bg})`,
  }

  return (
      <section className="hello-world" style={style}>
        <div className="hello-world-content">
          <Confetti runOnMount density={1} />
           <div className="svgs">
             {svgUrls.map((src, idx) => (
                 <div className="svg-item" key={idx}>
                   <img src={src} alt={`svg-${idx}`} />
                 </div>
             ))}
           </div>
         </div>
       </section>
   )
 }
