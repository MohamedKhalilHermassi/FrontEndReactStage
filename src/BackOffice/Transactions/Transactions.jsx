import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function Transactions() {
    let { cardId } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [card, setCard] = useState({});
    const [reloadAmount, setReloadAmount] = useState(0); 
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const rechargerCarte = async (cardId, montant) => {
        try {
            const response = await fetch(
                `https://localhost:5000/card/carterestocommands/chargecard/${cardId}/${montant}`,
                {
                    method: "PUT",
                    headers: header,
                }
            );
            const data = await response.json();
            setCard(data); 
            window.location.reload(false);
            getTransactions(cardId);
        } catch (error) {
            console.error('Error reloading card:', error);
        }
    };

    const getCard = async (cardId) => {
        try {
            const response = await fetch(
                `https://localhost:5000/card/carterestoqueries/${cardId}`,
                {
                    method: "GET",
                    headers: header,
                } 
            );
            const data = await response.json();
            setCard(data);
        } catch (error) {
            console.error('Error fetching card details:', error);
        }
    };

    const getTransactions = async (cardId) => {
        try {
            const response = await fetch(
                `https://localhost:5000/transactions/transactionquery/getTransactionByCardRestoId/${cardId}`,
                {
                    method: "GET",
                    headers: header,
                }
            );
            const data = await response.json();
            // Sort transactions by date, latest first
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReloadClick = async () => {
        console.log("Reloading card with amount:", reloadAmount);
        await rechargerCarte(cardId, reloadAmount);
        setReloadAmount(""); 
    };

    useEffect(() => {
        getTransactions(cardId);
        getCard(cardId) ;
    }, [transactions]);

    return (
        <>
            <div className="btn btn-secondary mx-3"> Solde Restant : {card.solde} TND </div>
            <div className="btn btn-light mx-3"> Employé : {card.userEmail} </div>
            <div className="input-group mt-3 mx-3">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Montant à recharger"
                    value={reloadAmount}
                    onChange={(e) => setReloadAmount(e.target.value)}
                />
                <button
                    className="btn btn-primary mx-3"
                    type="button"
                    onClick={handleReloadClick}
                >
                    Recharger la carte
                </button>
            </div>
            {loading && (
                <div className="text-center mb-4">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
            )}
            {!loading && (
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    {transactions.map((transaction, index) => (
                        <div className="accordion-item" key={transaction.id}>
                            <h2 className="accordion-header" id={`flush-heading${index}`}>
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#flush-collapse${index}`}
                                    aria-expanded="false"
                                    aria-controls={`flush-collapse${index}`}
                                >
                                    <div className={`btn ${transaction.type ? 'btn-success' : 'btn-danger'}`}>
                                        {transaction.type ? '+ ' : '- '}{transaction.montant} TND
                                    </div>
                                    <div className="mx-5">
                                        le {new Date(transaction.date).toLocaleString()}
                                    </div>
                                </button>
                            </h2>
                            <div
                                id={`flush-collapse${index}`}
                                className="accordion-collapse collapse"
                                aria-labelledby={`flush-heading${index}`}
                                data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body">
                                    <p><strong>Montant:</strong> {transaction.montant} TND</p>
                                    <p><strong>Description:</strong> {transaction.description}</p>
                                    <p><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default Transactions;
