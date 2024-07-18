import { useState, useEffect } from "react";
import './MyTransactions.css';
import { ClipLoader } from "react-spinners";
import { Alert } from "react-bootstrap";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function MyTransactions() {

    const token = localStorage.getItem('token');
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("success");
    const [card, setCard] = useState(null);
    const [montant, setMontant] = useState("");
    const [description, setDescription] = useState("");
    const [newTransaction, setNewTransaction] = useState(null);
    const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const getTransactions = async (cardId) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://localhost:5000/transactions/transactionquery/getTransactionByCardRestoId/${cardId}`,
                {
                    method: "GET",
                    headers: header,
                }
            );
            const data = await response.json();
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const getCard = async () => {
        const userId = localStorage.getItem('id');
        try {
            const response = await fetch(
                `https://localhost:5000/card/carterestoqueries/getCardByUserId/${userId}`,
                {
                    method: "GET",
                    headers: header,
                }
            );
            const data = await response.json();
            setCard(data);
            getTransactions(data.id);
        } catch (error) {
            console.error('Error fetching card details:', error);
        }
    };

    const chartData = {
        labels: transactions.map(transaction => new Date(transaction.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Montant des Transactions',
                data: transactions.map(transaction => transaction.montant),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };
    
    const chartOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Montant (TND)',
                },
                beginAtZero: true,
            },
        },
    };
    
    useEffect(() => {
        getCard();
    }, []);

    const handleTransactionSubmit = async (e) => {
        e.preventDefault();
        const transaction = {
            montant,
            description,
            CarteRestoId: card.id
        };

        try {
            const response = await fetch(
                `https://localhost:5000/card/carterestocommands/dischargecard/${transaction.CarteRestoId}/${transaction.montant}/${transaction.description}`,
                {
                    method: "PUT",
                    headers: header,
                }
            );
            if(response.ok) {
                const data = await response.json();
                console.log("New transaction added:", data);
                card.solde -= transaction.montant;
                setCard({ ...card });
                setAlertVariant("success");
                setAlertMessage("Transaction ajoutée avec succès");
                await getTransactions(card.id);
            } else {
                console.log("Vous n'avez pas assez de solde");
                setAlertVariant("danger");
                setAlertMessage("Vous n'avez pas assez de solde");
                setMontant("");
                setDescription("");
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
        }

        
    };

    if (card==null) {
        return 
    }
    else {

    
    return (
        <>
            {loading && (
                <div className="text-center mb-4">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
            )}
            {!loading && (
                <div className="row">
                    <div className="col-xl-4 col-lg-6 mx-3">
                        <div className="card l-bg-orange-dark">
                            <div className="card-statistic-3 p-4">
                                <div className="card-icon card-icon-large"><i className="fas fa-dollar-sign" /></div>
                                <div className="mb-4">
                                    <h5 className="card-title mb-0">Mon Solde</h5>
                                </div>
                                <div className="row align-items-center mb-2 d-flex">
                                    <div className="col-8">
                                        <h2 className="d-flex align-items-center mb-0">
                                            {card.solde} TND
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <h2>Historique de mes transactions</h2>

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
                    </div>

                    <div className="row">
                        <div className="col-lg-6 mx-5 my-5">
                            <h3>Effectuer une transaction</h3>
                            <form onSubmit={handleTransactionSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="montant" className="form-label">Montant</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="montant"
                                        value={montant}
                                        onChange={(e) => setMontant(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                {alertMessage && (
                                    <Alert variant={alertVariant} className="mt-3">
                                        {alertMessage}
                                    </Alert>
                                )}
                            </form>
                            {newTransaction && (
                                <div className="mt-3">
                                    <h5>Nouvelle Transaction:</h5>
                                    <p><strong>Montant:</strong> {newTransaction.montant} TND</p>
                                    <p><strong>Description:</strong> {newTransaction.description}</p>
                                </div>
                            )}
                        </div>
                        <div className="col-lg-5 mt-5">
                            <h3>Graphe de mes transactions</h3>
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );}
}

export default MyTransactions;
