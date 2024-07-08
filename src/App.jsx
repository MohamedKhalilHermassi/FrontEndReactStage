import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './FrontOffice/register/Register'
import Login from './FrontOffice/login/Login'
import Home from './FrontOffice/home/Home'
import LandingPage from './FrontOffice/landingPage/landingPage'
import Demands from './FrontOffice/mes demandes/Demands'
import PageNotFound from './FrontOffice/404/PageNotFound'
import HomeAdmin from './BackOffice/home/HomeAdmin'
import DemandesCarte from './BackOffice/Demandes/DemandesCarte'
import ApprovedDemands from './BackOffice/ApprovedDemands/ApprovedDemands'
import RejectedDemands from './BackOffice/RejectedDemands/RejectedDemands'

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/signin" element={<Login/>} />
        <Route path="/homeAdmin" element={<HomeAdmin />}>

             <Route index element={<DemandesCarte/>} />
              <Route path='ApprovedDemands' element={<ApprovedDemands/>}/>
              <Route path='RejectedDemands' element={<RejectedDemands/>}/>

        </Route>
        <Route path="/home" element={<Home />}>

             <Route index element={<LandingPage />} />

            <Route path="demandeCarte" element={<Login />} />
            <Route path="mesdemandes" element={<Demands />} />

        </Route>
        <Route path="*" element={<PageNotFound/>} />

    </Routes>
  </BrowserRouter>
  )
}

export default App

