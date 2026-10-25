import { useState } from "react";
import "./AccountSettings.css";

function AccountSettings() {
  // Store account settings
  const [profileVisible, setProfileVisible] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Store personal information
  const [formData, setFormData] = useState({
    firstName: "Husna",
    lastName: "Qadeer",
    gender: "",
    bloodGroup: "",
    location: "",
    phone: "",
    email: "",
    height: "",
    weight: "",
  });

  // Store password form values
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Update personal information
  function handleInfoChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Update password fields
  function handlePasswordChange(event) {
    const { name, value } = event.target;

    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  }

  // Handle saving personal information
  function handleInfoSubmit(event) {
    event.preventDefault();
    alert("Basic information saved!");
  }

  // Validate the new password
  function handlePasswordSubmit(event) {
    event.preventDefault();

    // Check password length
    if (passwordData.newPassword.length < 8) {
      alert("Your new password must contain at least 8 characters.");
      return;
    }

    // Check password character requirements
    if (
      !/[A-Z]/.test(passwordData.newPassword) ||
      !/[a-z]/.test(passwordData.newPassword) ||
      !/[0-9]/.test(passwordData.newPassword)
    ) {
      alert(
        "Your password must contain an uppercase letter, a lowercase letter, and a number.",
      );
      return;
    }

    // Check whether the passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("The new passwords do not match.");
      return;
    }

    // Prevent reusing the current password
    if (passwordData.currentPassword === passwordData.newPassword) {
      alert("Your new password must be different from your current password.");
      return;
    }

    // Show a message because a backend is required
    alert(
      "Password form validated. Connect a backend to change your password.",
    );

    // Clear password fields
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }

  // Toggle two-factor authentication
  function handleTwoFactorChange() {
    setTwoFactor(!twoFactor);

    if (!twoFactor) {
      alert(
        "Two-factor setup selected.",
      );
    }
  }

  // Handle account deactivation
  function handleDeactivate() {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate your account?",
    );

    if (confirmed) {
      alert("Deactivation requires a connection to the account service.");
    }
  }

  // Handle account deletion
  function handleDelete() {
    if (!confirmDelete) {
      alert("Please confirm that you want to delete your account.");
      return;
    }

    const confirmed = window.confirm(
      "This action may permanently delete your account. Do you want to continue?",
    );

    if (confirmed) {
      alert("Account deletion requires a secure backend service.");
    }
  }

  // Display the account settings page
  return (
    <div className="account-settings-page">
      {/* Page heading */}
      <div className="settings-heading">
        <div>
          <span className="settings-eyebrow">MY PATIENTHUB</span>
          <h1>Account Settings</h1>
          <p>
            Manage your profile, personal information, and account security.
          </p>
        </div>

        <div className="settings-heading-icon">⚙</div>
      </div>

      {/* Sidebar and main content */}
      <div className="settings-layout">
        {/* Sidebar navigation */}
        <aside className="settings-sidebar">
          <div className="sidebar-profile">
            <img src="Pinkprofile.jpg" alt="Patient profile" />

            <div>
              <h3>
                {formData.firstName} {formData.lastName}
              </h3>
              <p>Patient Account</p>
            </div>
          </div>

          <p className="sidebar-label">ACCOUNT MENU</p>

          {/* Navigate between settings sections */}
          <a href="#profile" className="settings-nav-link active">
            <span>👤</span> Profile
          </a>

          <a href="#basic-info" className="settings-nav-link">
            <span>📋</span> Basic Info
          </a>

          <a href="#change-password" className="settings-nav-link">
            <span>🔒</span> Change Password
          </a>

          <a href="#two-factor" className="settings-nav-link">
            <span>🛡️</span> 2FA Security
          </a>

          <a href="#sessions" className="settings-nav-link">
            <span>💻</span> Sessions
          </a>

          <a href="#delete-account" className="settings-nav-link danger-link">
            <span>🗑️</span> Delete Account
          </a>

          {/* Display the privacy reminder */}
          <div className="sidebar-help">
            <span>🔐</span>
            <h4>Your privacy matters</h4>
            <p>Keep your account information safe and up to date.</p>
          </div>
        </aside>

        {/* Main settings sections */}
        <main className="settings-content">
          {/* PROFILE CARD */}
          <section id="profile" className="settings-card profile-card">
            <div className="section-heading">
              <div>
                <h2>My Profile</h2>
                <p>Manage how your patient profile appears.</p>
              </div>

              <span className="section-icon">👤</span>
            </div>

            {/* Display profile information and visibility */}
            <div className="profile-details">
              <img
                className="profile-photo"
                src="Pinkprofile.jpg"
                alt="Patient profile"
              />

              {/* Show or hide profile details */}
              <div className="profile-name">
                {profileVisible ? (
                  <>
                    <h3>
                      {formData.firstName} {formData.lastName}
                    </h3>
                    <p>{formData.email || "Husnaqadeer1@gmail.com"}</p>
                    <span className="patient-badge">Patient</span>
                  </>
                ) : (
                  <>
                    <h3>Profile Hidden</h3>
                    <p>Your profile information is hidden in this preview.</p>
                  </>
                )}
              </div>

              {/* Toggle profile visibility */}
              <div className="visibility-control">
                <div>
                  <strong>Profile visibility</strong>
                  <p>
                    {profileVisible
                      ? "Profile is visible"
                      : "Profile is hidden"}
                  </p>
                </div>

                <label className="switch">
                  <input
                    type="checkbox"
                    checked={profileVisible}
                    onChange={() => setProfileVisible(!profileVisible)}
                    aria-label="Toggle profile visibility"
                  />
                  <span className="switch-slider"></span>
                </label>
              </div>
            </div>

            <p className="helper-text">
              This setting controls the visibility preference in this demo.
              Actual public visibility requires backend support.
            </p>
          </section>

          {/* BASIC INFORMATION */}
          <section id="basic-info" className="settings-card">
            <div className="section-heading">
              <div>
                <h2>Basic Information</h2>
                <p>Keep your personal and health details up to date.</p>
              </div>

              <span className="section-icon">📋</span>
            </div>

            {/* Form for personal and health information */}
            <form onSubmit={handleInfoSubmit}>
              <div className="settings-form-grid">
                <div className="settings-field">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInfoChange}
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div className="settings-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInfoChange}
                    placeholder="Enter last name"
                    required
                  />
                </div>

                <div className="settings-field">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInfoChange}
                  >
                    <option value="">Select gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div className="settings-field">
                  <label htmlFor="bloodGroup">Blood Group</label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInfoChange}
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>

                <div className="settings-field">
                  <label htmlFor="location">Location</label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleInfoChange}
                    placeholder="City, country"
                  />
                </div>

                <div className="settings-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInfoChange}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="settings-field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInfoChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="settings-field">
                  <label htmlFor="height">Height (cm)</label>
                  <input
                    id="height"
                    name="height"
                    type="number"
                    min="0"
                    value={formData.height}
                    onChange={handleInfoChange}
                    placeholder="e.g. 165"
                  />
                </div>

                <div className="settings-field">
                  <label htmlFor="weight">Weight (kg)</label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    min="0"
                    value={formData.weight}
                    onChange={handleInfoChange}
                    placeholder="e.g. 60"
                  />
                </div>
              </div>

              {/* Save personal information */}
              <div className="form-actions">
                <button type="submit" className="settings-primary-button">
                  Save Changes
                </button>
              </div>
            </form>
          </section>

          {/* CHANGE PASSWORD */}
          <section id="change-password" className="settings-card">
            <div className="section-heading">
              <div>
                <h2>Change Password</h2>
                <p>Choose a strong password to protect your account.</p>
              </div>

              <span className="section-icon">🔒</span>
            </div>

            {/* Form for changing the password */}
            <form onSubmit={handlePasswordSubmit}>
              <div className="settings-field password-field">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  autoComplete="current-password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div className="settings-field password-field">
                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div className="settings-field password-field">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Re-enter new password"
                  required
                />
              </div>

              {/* Display password rules */}
              <div className="password-requirements">
                <h4>Password requirements</h4>
                <p>✓ At least 8 characters</p>
                <p>✓ One uppercase and one lowercase letter</p>
                <p>✓ At least one number</p>
                <p>✓ New password must differ from current password</p>
              </div>

              <button type="submit" className="settings-primary-button">
                Update Password
              </button>
            </form>
          </section>

          {/* TWO-FACTOR AUTHENTICATION */}
          <section id="two-factor" className="settings-card">
            <div className="section-heading">
              <div>
                <h2>Two-Factor Authentication</h2>
                <p>Add another layer of protection to your account.</p>
              </div>

              <span className="section-icon">🛡️</span>
            </div>

            {/* Display two-factor authentication settings */}
            <div className="security-feature">
              <div className="feature-icon purple-icon">🔐</div>

              <div className="feature-description">
                <h3>Extra account protection</h3>
                <p>
                  Two-factor authentication asks for an additional verification
                  step when signing in.
                </p>

                {/* Show the current setup status */}
                <span
                  className={twoFactor ? "status-enabled" : "status-disabled"}
                >
                  {twoFactor ? "Setup selected" : "Not configured"}
                </span>
              </div>

              {/* Toggle the demo setting */}
              <label className="switch">
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={handleTwoFactorChange}
                  aria-label="Toggle two-factor authentication"
                />
                <span className="switch-slider"></span>
              </label>
            </div>

            <div className="security-note">
              <strong>Recommended:</strong> Use an authenticator app. This
              demonstration switch does not activate real 2FA.
            </div>
          </section>

          {/* ACTIVE SESSIONS */}
          <section id="sessions" className="settings-card">
            <div className="section-heading">
              <div>
                <h2>Active Sessions</h2>
                <p>Review devices that may have access to your account.</p>
              </div>

              <span className="section-icon">💻</span>
            </div>

            {/* Display the current device session */}
            <div className="session-item">
              <div className="feature-icon green-icon">💻</div>

              <div className="feature-description">
                <h3>This device</h3>
                <p>Current browser · Session details are examples</p>
                <span className="status-enabled">Current session</span>
              </div>

              <span className="session-current">Active</span>
            </div>

            {/* Display an example mobile session */}
            <div className="session-item">
              <div className="feature-icon blue-icon">📱</div>

              <div className="feature-description">
                <h3>Mobile device</h3>
                <p>Example session · Device activity not connected</p>
                <span className="session-muted">Demo information</span>
              </div>

              {/* Handle signing out a device */}
              <button
                type="button"
                className="settings-outline-button"
                onClick={() =>
                  alert(
                    "Signing out devices requires backend session management.",
                  )
                }
              >
                Sign Out
              </button>
            </div>

            {/* Display the security reminder */}
            <div className="session-footer">
              <span>🔎</span>
              If you notice an unfamiliar device, secure your account and change
              your password.
            </div>
          </section>

          {/* DELETE AND DEACTIVATE ACCOUNT */}
          <section id="delete-account" className="settings-card danger-card">
            <div className="section-heading">
              <div>
                <h2>Deactivate or Delete Account</h2>
                <p>Manage your account's future access carefully.</p>
              </div>

              <span className="section-icon danger-icon">⚠️</span>
            </div>

            {/* Option to deactivate the account */}
            <div className="deactivate-box">
              <div>
                <h3>Deactivate Account</h3>
                <p>
                  Temporarily disable access to your account. Reactivation would
                  depend on your account service.
                </p>
              </div>

              <button
                type="button"
                className="settings-outline-button"
                onClick={handleDeactivate}
              >
                Deactivate
              </button>
            </div>

            {/* Confirm permanent account deletion */}
            <div className="delete-warning">
              <h3>Delete Account Permanently</h3>
              <p>
                This is a serious action. Account deletion may remove your
                profile and associated information. Make sure you understand the
                consequences before proceeding.
              </p>

              {/* Require confirmation before deletion */}
              <label className="delete-confirmation">
                <input
                  type="checkbox"
                  checked={confirmDelete}
                  onChange={(event) => setConfirmDelete(event.target.checked)}
                />
                I understand and confirm that I want to delete my account.
              </label>

              <button
                type="button"
                className="settings-danger-button"
                onClick={handleDelete}
                disabled={!confirmDelete}
              >
                Delete Account
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* SHARED FOOTER */}
      <footer className="doctor-footer">
        <p>
          © 2026 MyPatientHUB. Made with <span className="footer-heart">♥</span>{" "}
          for better healthcare.
        </p>

        <div className="doctor-footer-links">
          <span>MyPatientHUB</span>
          <span>Healthcare Directory Demo</span>
        </div>
      </footer>
    </div>
  );
}

export default AccountSettings;
