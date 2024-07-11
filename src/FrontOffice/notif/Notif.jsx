import  { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { jwtDecode } from 'jwt-decode';

const Notif = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7078/notificationHub', {
        accessTokenFactory: () => token,
        headers: { "User-Id": userId } 
      })
      .withAutomaticReconnect()
      .build();

    connection.on('ReceiveNotification', (message) => {
      setNotifications((prevNotifications) => [...prevNotifications, { message, date: new Date().toISOString() }]);
    });

    connection.start()
      .then(() => console.log('SignalR connected'))
      .catch((err) => console.error('SignalR connection error: ', err));

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif.message} - {notif.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notif;
