import { useState } from "react";
import './MyTransactions.css'
function MyTransactions() {
    const token = localStorage.getItem('token');
    const [transactions,setTransactions] =useState([]);
    const [loading,setLoading]=useState(false);
    const [Card,setCard]=useState({});
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
            console.log(Card)
            getTransactions(data.id)

        } catch (error) {
            console.error('Error fetching card details:', error);
        }
    };
    useState(()=>{
        getCard()

        },[])
    return (
   <>
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
                            {Card.solde} TND
                    </h2>
                    </div>
                
                </div>
                
                </div>
            </div>
        
            </div>

            <div className="col-lg-7">

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
</div>
</div>

</>
  )
}

export default MyTransactions
