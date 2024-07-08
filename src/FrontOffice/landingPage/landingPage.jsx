import { useState } from "react";
import { Link } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  const deposerDemande = async () => {
    setLoading(true);
    setAlertMessage("");
    const requestBody = {
      UserId: localStorage.getItem("id"),
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
      } else {
        setAlertVariant("danger");
        setAlertMessage(data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      setAlertVariant("danger");
      setAlertMessage("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-6">
        <div>
          <div className="card shadow mb-0 mx-3">
            <div className="card-body">
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
      </div>
    </div>
  );
}

export default LandingPage;
