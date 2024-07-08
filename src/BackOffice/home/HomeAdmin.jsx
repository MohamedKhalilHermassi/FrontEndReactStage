import { Outlet } from "react-router-dom"
import NavBar from "../../FrontOffice/navbar/NavBar"
import SideBar from "../../FrontOffice/sidebar/SideBar"

function HomeAdmin() {
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

<Outlet></Outlet>
        </div>
        </div>
        </>
  )
}

export default HomeAdmin
