import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const navigate = useNavigate();

  const deposerDemande = async () => {
    setLoading(true);
    setAlertMessage("");
    const requestBody = {
      UserId: localStorage.getItem("id"),
      UserEmail: localStorage.getItem('email')
    };
    const token = localStorage.getItem("token");

    const header = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        "https://localhost:5000/demandeTransaction/DemandeCardCommands",
        {
          method: "POST",
          headers: header,
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setAlertVariant("success");
        setAlertMessage("Demande déposée avec succès!");
      }
    
      else {
        setAlertVariant("danger");
        setAlertMessage(data.message || "Vous avez déjà une ");
      }
      
    } catch (error) {
      setAlertVariant("danger");
      setAlertMessage("Vous avez déjà déposé une demande de carte restaurant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="row">
      <div className="col-lg-6">
        <div className="card shadow mb-0 mx-3">
          <div className="card-body">
          <div className="d-flex justify-content-center">          <img width="300" height="300" src="https://st3.depositphotos.com/31068556/34432/v/450/depositphotos_344324446-stock-illustration-the-user-press-a-button.jpg" alt="order-completed"/><br />
          </div>
            Si vous voulez déposer une nouvelle demande de carte de Restaurant veuillez cliquer sur le bouton ci-dessous. Votre demande sera traitée par un administrateur et vous serez notifié dans les plus brefs délais.
            <br />
            {loading ? (
              <Spinner animation="border" variant="primary" className="mt-3" />
            ) : (
              <>
                <a onClick={deposerDemande} className="btn btn-primary btn-icon-split mt-3">
                  <span className="text">Déposer une demande de carte</span>
                </a>
                <Link to="/home/mesdemandes" className="btn btn-secondary btn-icon-split ml-3 mt-3">
                  <span className="text">Consulter vos demandes</span>
                </Link>
              </>
            )}
            {alertMessage && (
              <Alert variant={alertVariant} className="mt-3">
                {alertMessage}
              </Alert>
            )}
          </div>
        </div>

      
      </div>
      <div className="col-lg-6">
      <div className="card shadow mb-0 mx-3">
          <div className="card-body">
          <div className="d-flex justify-content-center">          <img width="360" height="300" src="https://cdni.iconscout.com/illustration/premium/thumb/credit-card-4847377-4031506.png" alt="order-completed"/><br />
          </div>
              Vous pouvez consulter le solde de votre carte de restaurant en cliquent sur le boutons ci-dessus. 
                <br />
                <br />  
            <br />
           
             
                <Link to={"macarte"}><a  className="btn btn-success btn-icon-split mt-3">
                  <span className="text">Consulter votre carte</span>
                </a></Link>
                
             
          </div>
        </div>
      </div>
      
   
    </div>
    <div className="row">
    <div className="col-lg-6">
    <div className="card shadow mt-3 mb-0 mx-3">
          <div className="card-body">
          <div className="d-flex justify-content-center">          <img width="360" height="300" src="https://static-00.iconduck.com/assets.00/transaction-illustration-2048x1568-ox8kabuo.png" alt="order-completed"/><br />
          </div>
          
Vous pouvez suivre toutes vos transactions à tout moment à travers un simple clique.            <br />
         
             
                <Link to="/home/MyTransactions" className="btn btn-secondary btn-icon-split ml-3 mt-3">
                  <span className="text">Consulter mes transactions</span>
                </Link>
            
        
          </div>
        </div>
    </div>
    </div>
      </>
  );
}

export default LandingPage;
