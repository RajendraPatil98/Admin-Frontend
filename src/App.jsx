import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddFood from './pages/AddFood/AddFood'
import Orders from './pages/Orders/Orders'
import ListFood from './pages/ListFood/ListFood'
import Sidebar from './components/Sidebar/Sidebar'
import Menbar from './components/Menubar/Menbar'
import { ToastContainer} from 'react-toastify';

const App = () => {

   const [sidebarVisible,setSidebarVisible]=useState(true);

   const toggleSidebar=()=>{
    setSidebarVisible(!sidebarVisible);
   }

  return (
           
    <div className="d-flex" id="wrapper">

          <Sidebar sidebarVisible={sidebarVisible}/>

            <div id="page-content-wrapper">
                   
                   <Menbar toggleSidebar={toggleSidebar}/>
                   <ToastContainer />

                <div className="container-fluid">
                    <Routes>
                       <Route path='/add' element={<AddFood />} />
                       <Route path='/list' element={<ListFood />} />
                       <Route path='/orders' element={<Orders />} />
                       <Route path='/' element={<ListFood />} />
                    </Routes>
                </div>
            </div>
        </div>
  )
}

export default App;