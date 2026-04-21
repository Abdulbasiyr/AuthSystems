

import './App.css'
import Features from './components/feauters'
import Footer from './components/footer'
import Header from './components/header'
import Main from './components/body'
import { useEffect } from 'react'
import { getProfileAuthApi } from './api/auth.api.js'

function App() {

  useEffect(() => {
    (async() => {
      await getProfileAuthApi()
    })()
  }, [])

  return (
    <>
    
      <Header />
      <Main />
      <Features />
      <Footer />

    </>
  )
}

export default App
