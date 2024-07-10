import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

function DemandesCarte() {
    const [demandes, setDemandes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modifiedDemands, setModifiedDemands] = useState([]);
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const updateDemandStatus = (id, status) => {
        setDemandes((prevDemandes) => 
            prevDemandes.map((demande) => 
                demande.id === id ? { ...demande, status } : demande
            )
        );
    };

    const approveDemand = async (id) => {
        try {
            await fetch(
                `https://localhost:5000/demandeTransaction/demandecardcommands/approve/${id}`,
                {
                    method: "PUT",
                    headers: header,
                }
            );
            updateDemandStatus(id, 'approvée');
            setModifiedDemands((prevModified) => [...prevModified, id]);
        } catch (error) {
            console.error('Error approving demand:', error);
        }
    };

    const rejectDemand = async (id) => {
        try {
            await fetch(
                `https://localhost:5000/demandeTransaction/demandecardcommands/reject/${id}`,
                {
                    method: "PUT",
                    headers: header,
                }
            );
            updateDemandStatus(id, 'rejetée');
            setModifiedDemands((prevModified) => [...prevModified, id]);
        } catch (error) {
            console.error('Error rejecting demand:', error);
        }
    };

    const getMyDemandes = async () => {
        try {
            const response = await fetch(
                "https://localhost:5000/demandeTransaction/DemandeCardQueries/pending",
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

    return (
        <div>
            {isLoading && (
                <div className="text-center mb-4">
                    <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
                </div>
            )}
            {!isLoading && (
                <>
                    <div className='mx-2 mb-3'>Vous avez <b>{demandes.length}</b> demandes de carte de restaurant</div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date de la demande</th>
                                <th scope="col">Employé</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {demandes.map((demande, index) => (
                                <tr key={demande.id}>
                                    <td>{index + 1}</td>
                                    <td>{new Date(demande.date).toLocaleDateString()} à {new Date(demande.date).toLocaleTimeString()}</td>
                                    <td>{demande.userEmail}</td>
                                    <td>
                                        <span className={`badge ${demande.status === 'approvée' ? 'badge-success' : demande.status === 'rejetée' ? 'badge-danger' : 'badge-warning'}`}>
                                            {demande.status === null ? 'en cours' : demande.status}
                                        </span> 
                                    </td>
                                    <td>
                                        <button 
                                            disabled={modifiedDemands.includes(demande.id)} 
                                            onClick={() => approveDemand(demande.id)} 
                                            className='btn btn-success mx-1'
                                        >
                                            Approuver
                                        </button>
                                        <button 
                                            disabled={modifiedDemands.includes(demande.id)} 
                                            onClick={() => rejectDemand(demande.id)} 
                                            className='btn btn-danger'
                                        >
                                            Réfuser
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default DemandesCarte;
