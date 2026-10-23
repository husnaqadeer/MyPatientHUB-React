
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setMessage('Please enter your name and email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    if (rememberMe) {
      localStorage.setItem('mypatienthub-email', email);
    } else {
      localStorage.removeItem('mypatienthub-email');
    }

    navigate('/dashboard');
  }

  return (
    <main className="login-page">
      <div className="login-image"></div>

      <section className="login">
        <h1>Welcome to MyPatientHUB!</h1>
        <p>We provide smart healthcare services in your hands.</p>

        <form onSubmit={handleSubmit}>
          <h2>Sign in to MyPatientHUB</h2>

          <div className="social">
            <button
              type="button"
              aria-label="Facebook sign in"
              onClick={() =>
                setMessage('Facebook sign in is not connected yet.')
              }
            >
              <i className="fa-brands fa-facebook-f"></i>
            </button>

            <button
              type="button"
              aria-label="Google sign in"
              onClick={() =>
                setMessage('Google sign in is not connected yet.')
              }
            >
              <i className="fa-brands fa-google"></i>
            </button>
          </div>

          <input
            type="text"
            placeholder="Full name"
            aria-label="Full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            aria-label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <button className="signin" type="submit">
            SIGN IN
          </button>

          {message && (
            <p className="form-message" role="status">
              {message}
            </p>
          )}

          <div className="options">
            <Link to="/forgot-password">Forgot password?</Link>

            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              Remember me
            </label>
          </div>

          <div className="or">or</div>

          <Link to="/signup" className="signup">
            SIGN UP
          </Link>
        </form>
      </section>

      <footer className="login-footer">
        <a href="#google-play">Google Play Store APP</a>
        <a href="#app-store">App Store APP</a>
        <a href="#about">About MyPatientHUB</a>
        <a href="#about-us">About Us</a>
        <a href="#blog">Our Blog</a>
      </footer>
    </main>
  );
}

export default Login;
