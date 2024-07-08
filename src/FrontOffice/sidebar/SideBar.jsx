import { Link, useNavigate } from "react-router-dom"

function SideBar() {
  const navigate = useNavigate();
    return (
 <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
 {/* Sidebar - Brand */}
 <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
   <div className="sidebar-brand-icon rotate-n-15">
     <i className="fas fa-utensils" />
   </div>
   <div className="sidebar-brand-text mx-3">Dashboard<sup></sup></div>
 </a>


 {/* Divider */}
 <hr className="sidebar-divider" />
 {/* Heading */}
 <div className="sidebar-heading">

 </div>
 {/* Nav Item - Pages Collapse Menu */}
 <li className="nav-item">
   <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
   <img width="28" height="28" src="https://img.icons8.com/color/48/hourglass-sand-top.png" alt="bank-card-back-side"/>     <span>Demandes de cartes</span>
   </a>
   <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
     <div className="bg-white py-2 collapse-inner rounded">
       <h6 className="collapse-header">Gestion des demandes</h6>
       <Link to={""} style={{ textDecoration: 'none' }}><a className="collapse-item">Demandes à traiter</a></Link>

       <Link to={"ApprovedDemands"} style={{ textDecoration: 'none' }}><a className="collapse-item">Demandes Approuvéés</a></Link>
       <Link to={"RejectedDemands"} style={{ textDecoration: 'none' }}><a className="collapse-item">Demandes Rejetées</a></Link>

     </div>
   </div>
 </li>
 {/* Nav Item - Utilities Collapse Menu */}
 <li className="nav-item">
   <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
   <img width="28" height="28" src="https://img.icons8.com/badges/48/bank-card-back-side.png" alt="hourglass-sand-top"/>
     <span className="mx-2">Cartes Restaurant</span>
   </a>
   <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
     <div className="bg-white py-2 collapse-inner rounded">
       <h6 className="collapse-header">Custom Utilities:</h6>
       <a className="collapse-item" href="utilities-color.html">Colors</a>
       <a className="collapse-item" href="utilities-border.html">Borders</a>
       <a className="collapse-item" href="utilities-animation.html">Animations</a>
       <a className="collapse-item" href="utilities-other.html">Other</a>
     </div>
   </div>
 </li>
 {/* Divider */}
 <hr className="sidebar-divider" />
 {/* Heading */}
 <div className="sidebar-heading">
   Tranasctions
 </div>
 {/* Nav Item - Pages Collapse Menu */}
 <li className="nav-item">
   <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
   <img width="28" height="28" src="https://img.icons8.com/pulsar-gradient/48/transaction.png" alt="transaction"/>
     <span className="mx-2">Cartes Restaurant</span>
   </a>
   <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
     <div className="bg-white py-2 collapse-inner rounded">
       <h6 className="collapse-header">Login Screens:</h6>
       <a className="collapse-item" href="login.html">Login</a>
       <a className="collapse-item" href="register.html">Register</a>
       <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
       <div className="collapse-divider" />
       <h6 className="collapse-header">Other Pages:</h6>
       <a className="collapse-item" href="404.html">404 Page</a>
       <a className="collapse-item" href="blank.html">Blank Page</a>
     </div>
   </div>
 </li>
 {/* Nav Item - Charts */}
 <li className="nav-item">
   <a className="nav-link" href="charts.html">
     <i className="fas fa-fw fa-chart-area" />
     <span>Charts</span></a>
 </li>
 {/* Nav Item - Tables */}
 <li className="nav-item">
   <a className="nav-link" href="tables.html">
     <i className="fas fa-fw fa-table" />
     <span>Tables</span></a>
 </li>
 {/* Divider */}
 <hr className="sidebar-divider d-none d-md-block" />


</ul>

  )
}

export default SideBar
