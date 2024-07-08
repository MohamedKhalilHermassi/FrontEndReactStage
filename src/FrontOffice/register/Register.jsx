import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import './Register.css'; // Custom CSS for Login page styling
import { useEffect, useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(null); // Countdown timer
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectCountdown === 0) {
      navigate('/signin');
    } else if (redirectCountdown !== null) {
      const countdownInterval = setInterval(() => {
        setRedirectCountdown((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [redirectCountdown, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const requestBody = {
      Username: formData.email,
      Email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      Password: formData.password,
      Role: "User"
    };

    try {
      const response = await fetch('https://localhost:5000/user/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        setSuccessMessage('Account has been created successfully.');
        setErrorMessage('');
        setRedirectCountdown(5); // Start countdown

      } else {
        const errorData = await response.json();
        console.log('Registration failed:', errorData);
        let errorMsg = 'Registration failed. Please try again.';

        // Handle specific error cases
        if (errorData.DuplicateEmail) {
          errorMsg = errorData.DuplicateEmail[0];
        } else if (errorData.DuplicateUserName) {
          errorMsg = errorData.DuplicateUserName[0];
        } else {
          errorMsg = 'An unexpected error occurred. Please try again.';
        }

        setErrorMessage(errorMsg);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className>
      <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                Restaurant Card<br />
                <span className="text-primary">Management App</span>
              </h1>
              <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                quibusdam tempora at cupiditate quis eum maiores libero
                veritatis? Dicta facilis sint aliquid ipsum atque?
              </p>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <h5 className="mb-5 display-7 fw-bold ls-tight">
                    Create Your Account<br />
                    <span className="text-primary"></span>
                  </h5>
                  {isLoading && (
                    <div className="text-center mb-4">
                      <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
                    </div>
                  )}
                  {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
                  {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="text"
                            id="firstName"
                            className="form-control"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                          <label className="form-label" htmlFor="firstName">Nom</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="text"
                            id="lastName"
                            className="form-control"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                          <label className="form-label" htmlFor="lastName">Prénom</label>
                        </div>
                      </div>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="email">Email</label>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="password">Mot de passe</label>
                    </div>
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block" disabled={isLoading}>
                      Créer un compte
                    </button>
                   
                  </form>
               
                  {redirectCountdown !== null && (
                    <div className="text-center mt-3">
                      Redirecting to login page in {redirectCountdown} seconds...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
