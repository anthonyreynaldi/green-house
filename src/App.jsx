import { useState } from 'react'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import PlantDetail from './pages/PlantDetail'
import NoPage from './pages/NoPage'
import Admin from './pages/Admin'
import AdminManage from './pages/AdminManage'
import PrivateRoutes from './utils/PrivateRoutes'
import Login from './pages/Login'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <BaseLayout/> } >
            <Route index element={ <Home/> } />
            <Route path='tanaman/:plantTag' element={ <PlantDetail/> } />
            <Route path='login' element={ <Login/> } />
            <Route element={ <PrivateRoutes/> } >
              <Route path='admin' element={ <Admin/> } />
              <Route path='admin/manage/:plantTag?' element={ <AdminManage/> } />
            </Route>
            <Route path='*' element={ <NoPage/> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
