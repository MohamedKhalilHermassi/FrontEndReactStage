import { ClipLoader } from 'react-spinners';
import './Login.css'; 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(formData.email)) {
      setErrorMessage('Invalid email format.');
      setIsLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setErrorMessage('Password must be at least 8 characters long and contain at least one letter and one number.');
      setIsLoading(false);
      return;
    }

    const requestBody = {
      Email: formData.email,
      Password: formData.password,
    };

    try {
      const response = await fetch('https://localhost:5000/user/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('email', data.email);
        localStorage.setItem('token', data.token);

        const decodedToken = jwtDecode(data.token);
        localStorage.setItem('id', decodedToken.id);

        console.log(decodedToken);
        let redirectPath = '/'; 
        if (decodedToken.role === 'User') {
          redirectPath = '/home';
        } else if (decodedToken.role === 'Admin') {
          redirectPath = '/homeAdmin';
        }
        navigate(redirectPath);

        setSuccessMessage('Login successful!');
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        console.log('Login failed:', errorData);
        let errorMsg = 'Login failed. Please try again.';

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
      console.error('Error during login:', error);
      setErrorMessage('Bad Credentials, please check your email and password.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight text-black">
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
                    Accedez à votre compte<br />
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
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
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
                        required
                      />
                      <label className="form-label" htmlFor="password">Password</label>
                    </div>
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block" disabled={isLoading}>
                      Se connecter
                    </button>
                  </form>
                  <Link to={'/'}><a  data-mdb-button-init data-mdb-ripple-init className="btn btn-secondary btn-block mt-2">
                      Vous n'avez pas un compte ? Créez-en un
                    </a></Link> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
