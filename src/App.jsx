import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { RecipeDetail } from './pages/RecipeDetail'

function App() {
  return (
      <div className="min-h-screen bg-background text-text font-sans">
        {/* putting nevbar outside 'routes' so that it is visible no matter what route it is */}
        {/* we will render the pages based on their routes */}
        <Navbar/>
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/recipe/:id' element={<RecipeDetail/>}/>
          <Route path='*' element= {<NotFound/>}/>
        </Routes>
      </div>
  )
}

export default App
