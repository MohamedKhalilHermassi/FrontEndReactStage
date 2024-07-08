import { Outlet } from "react-router-dom"
import NavBar from "../navbar/NavBar"
import SideBar from "../sidebar/SideBar"

function Home() {
  const token = localStorage.getItem('token');
  if (token==undefined) {
    return <img src="https://www.techquintal.com/wp-content/uploads/2022/06/401-Unauthorized-Error.jpg" alt="" />
  }
 
  return (
    <>
  

    <div id="wrapper"> 
    <SideBar></SideBar>

      <div id="content-wrapper" className="d-flex flex-column">
      <NavBar></NavBar>


    <Outlet/>

        </div>
        </div>
        </>
  )
}

export default Home
