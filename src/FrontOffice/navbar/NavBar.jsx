import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function NavBar() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [notifications, setNotifications] = useState([]);
  const checkNotifForAdmin = async () => {
    try {
      const decodedToken = jwtDecode(localStorage.getItem('token'));
      if (decodedToken.role === "Admin") {
        const res = await axios.get("https://localhost:7279/api/Notification/admin@admin.com");
        const data = res.data; // Access the response data
        
        // Map the fetched notifications to match the format expected by your state
        const adminNotifications = data.map(notification => ({
          message: notification.message,
          date: new Date(notification.date)
        }));
        
        const newAdminNotifications = adminNotifications.filter(notification => (
          !notifications.some(existingNotif => 
            existingNotif.message === notification.message &&
            existingNotif.date.getTime() === notification.date.getTime()
          )
        ));
        
        setNotifications(prevNotifications => [
          ...prevNotifications,
          ...newAdminNotifications
        ]);
      }
    } catch (error) {
      console.error("Error fetching admin notifications:", error);
    }
  };
  
  const logout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  useEffect(() => {


    checkNotifForAdmin()
    const decodedToken = jwtDecode(localStorage.getItem('token'))
    setName(decodedToken.name);
    

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7279/notificationHub", {
        accessTokenFactory: () => {
          return localStorage.getItem("token"); 
        }
      })
      .build();

    connection.on("ReceiveMessage", (message) => {
      console.log("Received message: " + message);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { message, date: new Date() }
      ]);
    });
    connection.on("NotifyUserAccept", (message) => {
      console.log("Received message: " + message);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { message, date: new Date() }
      ]);
    });
    connection.on("NotifyUserReject", (message) => {
      console.log("Received message: " + message);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { message, date: new Date() }
      ]);
    });

    connection.start().catch(err => console.error(err.toString()));

    return () => {
      connection.stop();
    };
     
  }, []);

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="fa fa-bars" />
      </button>
      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm" />
            </button>
          </div>
        </div>
      </form>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow mx-1">
          <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-bell fa-fw" />
          <span className="badge badge-danger badge-counter">
              {notifications.length > 3 ? "3+" : notifications.length}
            </span>
          </a>
          <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
            <h6 className="dropdown-header">Notifications</h6>
            {notifications.slice(0, 3).map((notification, index) => (
              <a key={index} className="dropdown-item d-flex align-items-center" href="#">
                <div className="mr-3">
                  <div className="icon-circle bg-primary">
                    <i className="fas fa-file-alt text-white" />
                  </div>
                </div>
             <Link style={{ textDecoration: 'none' }} to={'/homeAdmin'}><div>
                  <div className="small text-gray-900">{new Date(notification.date).toLocaleString()}</div>
                  <span className="font-weight-bold">{notification.message}</span>
                </div></Link> 
              </a>
            ))}
            <a className="dropdown-item text-center small text-gray-500" href="#">
              Show All Alerts
            </a>
          </div>
        </li>
        <li className="nav-item dropdown no-arrow mx-1">
        
          <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
            <h6 className="dropdown-header">Message Center</h6>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="dropdown-list-image mr-3">
                <img className="rounded-circle" src="assets/img/undraw_profile_1.svg" alt="..." />
                <div className="status-indicator bg-success" />
              </div>
              <div className="font-weight-bold">
                <div className="text-truncate">
                  Hi there! I am wondering if you can help me with a problem I've been having.
                </div>
                <div className="small text-gray-500">Emily Fowler · 58m</div>
              </div>
            </a>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="dropdown-list-image mr-3">
                <img className="rounded-circle" src="assets/img/undraw_profile_2.svg" alt="..." />
                <div className="status-indicator" />
              </div>
              <div>
                <div className="text-truncate">
                  I have the photos that you ordered last month, how would you like them sent to you?
                </div>
                <div className="small text-gray-500">Jae Chun · 1d</div>
              </div>
            </a>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="dropdown-list-image mr-3">
                <img className="rounded-circle" src="assets/img/undraw_profile_3.svg" alt="..." />
                <div className="status-indicator bg-warning" />
              </div>
              <div>
                <div className="text-truncate">
                  Last month's report looks great, I am very happy with the progress so far, keep up the good work!
                </div>
                <div className="small text-gray-500">Morgan Alvarez · 2d</div>
              </div>
            </a>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="dropdown-list-image mr-3">
                <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="..." />
                <div className="status-indicator bg-success" />
              </div>
              <div>
                <div className="text-truncate">
                  Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...
                </div>
                <div className="small text-gray-500">Chicken the Dog · 2w</div>
              </div>
            </a>
            <a className="dropdown-item text-center small text-gray-500" href="#">
              Read More Messages
            </a>
          </div>
        </li>
        <div className="topbar-divider d-none d-sm-block" />
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{name}</span>
            <img className="img-profile rounded-circle" src="https://static.vecteezy.com/system/resources/previews/004/819/327/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg" />
          </a>
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            <a className="dropdown-item" href="#">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
              Profile
            </a>
            <a className="dropdown-item" href="#">
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
              Settings
            </a>
            <a className="dropdown-item" href="#">
              <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
              Activity Log
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" onClick={logout} href="#" data-target="#logoutModal">
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
              Se deconnecter
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
