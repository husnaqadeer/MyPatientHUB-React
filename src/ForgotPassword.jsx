
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage('Please enter your email address.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setMessage('Please enter a valid email address.');
      return;
    }

    navigate('/dashboard');
  }

  return (
    <main className="forgot-page">
      <div className="forgot-image"></div>

      <section className="forgot-card">
        <div className="forgot-icon">
          <i className="fa-solid fa-lock"></i>
        </div>

        <h1>Forgot Password?</h1>

        <p>
          Don't worry! Enter the email address linked to your
          MyPatientHUB account, and we'll help you reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="reset-email">Email Address</label>

          <input
            id="reset-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <button type="submit">RESET PASSWORD</button>

          {message && <p className="reset-message">{message}</p>}
        </form>

        <Link to="/login" className="back-login">
          <i className="fa-solid fa-arrow-left"></i> Back to Sign In
        </Link>
      </section>
    </main>
  );
}

export default ForgotPassword;
