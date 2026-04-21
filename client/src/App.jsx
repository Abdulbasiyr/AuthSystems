

import './App.css'
import Features from './components/feauters'
import Footer from './components/footer'
import Header from './components/header'
import Main from './components/body'
import { useEffect, useState } from 'react'
import { getProfileAuthApi } from './api/auth.api.js'

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    (async() => {
      const userData = await getProfileAuthApi()
      setUser(userData ?? null)
    })()
  }, [])

  return (
    <>
    
      <Header user={user} />
      <Main user={user} />
      <Features />
      <Footer />

    </>
  )
}

export default App
