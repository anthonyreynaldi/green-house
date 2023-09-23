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
import Logout from './pages/Logout'
import AdminEmail from './pages/AdminEmail'


function App() {
  return (
    <div className='bg-repeat bg-[length:500px]' style={{backgroundImage: "url('/images/background.jpg')"}}>
      <div className='bg-[#f2f4ea] bg-opacity-95'>
        {/* <img className="h-full w-full object-cover" src=/> */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <BaseLayout/> } >
              <Route index element={ <Home/> } />
              <Route path='tanaman/:plantTag' element={ <PlantDetail/> } />
              <Route path='login' element={ <Login/> } />
              <Route path='logout' element={ <Logout/> } />
              <Route element={ <PrivateRoutes/> } >
                <Route path='admin' element={ <Admin/> } />
                <Route path='admin/manage/:plantTag?' element={ <AdminManage/> } />
                <Route path='admin/email' element={ <AdminEmail/> } />
              </Route>
              <Route path='*' element={ <NoPage/> } />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
