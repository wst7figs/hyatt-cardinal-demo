import { useState } from 'react'
import Cover from './components/Cover.jsx'
import SwitcherBar from './components/SwitcherBar.jsx'
import InfoSite from './info/InfoSite.jsx'
import ShopSite from './shop/ShopSite.jsx'

export default function App() {
  const [view, setView] = useState('cover')

  function go(next) {
    setView(next)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <>
      {view === 'cover' ? <Cover onOpen={go} /> : null}
      {view === 'info' ? <InfoSite /> : null}
      {view === 'shop' ? <ShopSite /> : null}
      {view !== 'cover' ? <SwitcherBar view={view} onChange={go} /> : null}
    </>
  )
}
