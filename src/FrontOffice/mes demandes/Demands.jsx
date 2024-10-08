import { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';

function Demands() {
    const [demandes, setDemandes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [demandsPerPage] = useState(10); // 10 rows per page

    const getMyDemandes = async () => {
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        const header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        try {
            const response = await fetch(
                `https://localhost:5000/demandeTransaction/DemandeCardQueries/getDemandeByUserId/${id}`,
                {
                    method: "GET",
                    headers: header,
                }
            );
            const data = await response.json();
            console.log(data);
            setDemandes(data);
        } catch (error) {
            console.log(error);
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
                                        {demande.status === null ? (
                                            <span className="badge badge-warning">en cours</span>
                                        ) : demande.status === true ? (
                                            <span className="badge badge-success">approuvée</span>
                                        ) : demande.status === false ? (
                                            <span className="badge badge-danger">refusée</span>
                                        ) : null}
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

export default Demands;
