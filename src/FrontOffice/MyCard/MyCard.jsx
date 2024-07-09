import { useEffect, useState } from 'react';
import './MyCard.css';
import { ClipLoader } from 'react-spinners';
import { jwtDecode } from 'jwt-decode';

function MyCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [card, setCard] = useState(null);
  const decodedToken = jwtDecode(localStorage.getItem('token'))
  const [name,setName]= useState('');
  const fetchMyCard = async () => {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`https://localhost:5000/card/CarteRestoQueries/getCardByUserId/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCard(data);
      } else {
        console.log('No card found');
        setCard(null);
      }
    } catch (error) {
      console.log(error);
      setCard(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setName(decodedToken.name);
    setIsLoading(true);
    fetchMyCard();
  }, []);

  const formatCardNumber = (number) => {
    return number.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  return (
    <>
      <div className="text-center mb-4">
        <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
      </div>
        <div className='row'>

        </div>
      <div className='d-flex justify-content-center'>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : card ? (
        <div className='row'>
          
          <div className='col-lg-6'>
        <ul className="list-group mx-3">
            <li className="list-group-item">Informations à propos votre carte restaurant :</li>
            <li className="list-group-item">Numero :  {formatCardNumber(card.numero)}</li>
            <li className="list-group-item">Nom sur la carte : {name} </li>
            <li className="list-group-item">Solde : {card.solde} TND </li>
        </ul>


          </div>
          
          <div className='col-lg-6'>

          <aside className="card-front">
            <label className="number" htmlFor="cardNumber">
              {card.numero ? formatCardNumber(card.numero) : 'XXXX XXXX XXXX XXXX'}
            </label>
            <label className="name" htmlFor="cardHolder">
             {name}
            </label>
            <label className="expiry" htmlFor="expiryMonth">
              {card.expiryMonth}/{card.expiryYear}
            </label>
            <img className="cardLogo" data-v-5d206127 data-v-8fcb32d4 style={{ opacity: 1 }} src="https://i.pinimg.com/736x/82/be/d4/82bed479344270067e3d2171379949b3.jpg" alt="Card logo" />
            <div className="chip">
              <svg role="img" viewBox="0 0 100 100" aria-label="Chip">
                <use href="#chip-lines" />
              </svg>
            </div>
            <svg className="contactless" role="img" viewBox="0 0 24 24" aria-label="Contactless">
              <use href="#contactless"></use>
            </svg>
          </aside>
          <svg id="chip">
            <g id="chip-lines">
              <polyline points="0,50 35,50" />
              <polyline points="0,20 20,20 35,35" />
              <polyline points="50,0 50,35" />
              <polyline points="65,35 80,20 100,20" />
              <polyline points="100,50 65,50" />
              <polyline points="35,35 65,35 65,65 35,65 35,35" />
              <polyline points="0,80 20,80 35,65" />
              <polyline points="50,100 50,65" />
              <polyline points="65,65 80,80 100,80" />
            </g>
          </svg>
          <svg id="contactless">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9.172 15.172a4 4 0 0 1 5.656 0" />
            <path d="M6.343 12.343a8 8 0 0 1 11.314 0" />
            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
          </svg>
          </div>
        </div>
      ) : (
        <div className='d-flex justify-content-center'>
          Vous ne disposez pas de carte restaurant
        </div>
      )}
    </>
  );
}

export default MyCard;
