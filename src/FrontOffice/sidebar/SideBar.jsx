import { Link } from "react-router-dom"

function SideBar() {
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
       <h6 className="collapse-header">Cartes</h6>
       <Link to={'AllCards'} style={{ textDecoration: 'none' }}><a className="collapse-item">Liste des cartes</a></Link>
     </div>
   </div>
 </li>
 {/* Divider */}
 <hr className="sidebar-divider" />



</ul>

  )
}

export default SideBar
