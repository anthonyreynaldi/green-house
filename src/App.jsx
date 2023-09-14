import { useState } from 'react'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import PlantDetail from './pages/PlantDetail'
import NoPage from './pages/NoPage'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <BaseLayout/> } >
            <Route index element={ <Home/> } />
            <Route path='tanaman/:plantTag' element={ <PlantDetail/> } />
            <Route path='*' element={ <NoPage/> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
