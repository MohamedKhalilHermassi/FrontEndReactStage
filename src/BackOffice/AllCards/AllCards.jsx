import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

function AllCards() {
    const [demandes, setDemandes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate()
    const handleClick =(cardId)=>{
        navigate(`/homeAdmin/Transactions/${cardId}`)
    }
    const demandsPerPage = 10;
    const formatCardNumber = (number) => {
        return number.replace(/(\d{4})(?=\d)/g, '$1 ');
      };
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const getMyDemandes = async () => {
        try {
            const response = await fetch(
                "https://localhost:5000/card/CarteRestoQueries",
                {
                    method: "GET",
                    headers: header,
                }
            );
            const data = await response.json();
            setDemandes(data);
        } catch (error) {
            console.error('Error fetching demands:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getMyDemandes();
    }, []);

    // Get current demandes
    const indexOfLastDemande = currentPage * demandsPerPage;
    const indexOfFirstDemande = indexOfLastDemande - demandsPerPage;
    const currentDemandes = demandes.slice(indexOfFirstDemande, indexOfLastDemande);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(demandes.length / demandsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            {isLoading && (
                <div className="text-center mb-4">
                    <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
                </div>
            )}
            {!isLoading && (
                <>
                    <div className='mx-2 mb-3'>La liste suivante contient <b>{demandes.length}</b> cartes restaurant</div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Numero de la carte</th>
                                <th scope="col">Employé</th>
                                <th scope="col">Solde</th>
                                <th scope="col">Transactions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentDemandes.map((demande, index) => (
                                <tr key={demande.id}>
                                    <td>{indexOfFirstDemande + index + 1}</td>
                                    <td>{formatCardNumber(demande.numero)}</td>

                                    <td>{demande.userEmail}</td>
                                    <td>
                                        {demande.solde} TND
                                    </td>
                                    <td>
                                       <button onClick={()=>handleClick(demande.id)} className='btn btn-primary'>
                                    Consulter
                                       </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav>
                        <ul className="pagination justify-content-center">
                            {pageNumbers.map(number => (
                                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                    <a onClick={() => paginate(number)} className="page-link" href="#">
                                        {number}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
}

export default AllCards;
