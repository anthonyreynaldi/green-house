import { useState } from 'react'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import PlantDetail from './pages/PlantDetail'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <BaseLayout/> } >
            <Route index element={ <Home/> } />
            <Route path=':plantTag' element={ <PlantDetail/> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
