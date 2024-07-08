import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

function RejectedDemands() {
    const [demandes, setDemandes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const demandsPerPage = 10;

    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const getMyDemandes = async () => {
        try {
            const response = await fetch(
                "https://localhost:5000/demandeTransaction/DemandeCardQueries",
                {
                    method: "GET",
                    headers: header,
                }
            );
            const data = await response.json();
            const approvedDemandes = data.filter(demande => demande.status === false);
            setDemandes(approvedDemandes);
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
                    <div className='mx-2 mb-3'>Vous avez <b>{demandes.length}</b> demandes de carte de restaurant rejetées</div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date de la demande</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentDemandes.map((demande, index) => (
                                <tr key={demande.id}>
                                    <td>{indexOfFirstDemande + index + 1}</td>
                                    <td>{new Date(demande.date).toLocaleDateString()} à {new Date(demande.date).toLocaleTimeString()}</td>
                                    <td>
                                        <span className="badge badge-danger">rejetée</span>
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

export default RejectedDemands;
