import { useState } from "react";
import "./Dependents.css";

// List of months used in the birth date fields
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Dependents() {
  // Track the current step of the form
  const [step, setStep] = useState(1);

  // Store all dependent information
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    month: "February",
    day: "1",
    year: "2021",
    relation: "",
    gender: "",
    healthCondition: "",
    medicalInformation: "",
    plan: "",
  });

  // Update the field that the user changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Find the selected month's index
  const currentMonth = months.indexOf(formData.month);

  // Calculate the number of days in the selected month
  const daysInMonth = new Date(
    Number(formData.year),
    currentMonth + 1,
    0,
  ).getDate();

  // Generate a list of years from the current year to 1900
  const years = Array.from(
    { length: new Date().getFullYear() - 1900 + 1 },
    (_, index) => new Date().getFullYear() - index,
  );

  // Validate the required fields and move to the next step
  const nextStep = () => {
    if (step === 1) {
      if (
        !formData.firstName.trim() ||
        !formData.lastName.trim() ||
        !formData.relation ||
        !formData.gender
      ) {
        alert("Please complete all required fields before continuing.");
        return;
      }

      // Check whether the birth date is valid and not in the future
      const birthDate = new Date(
        Number(formData.year),
        currentMonth,
        Number(formData.day),
      );

      if (
        birthDate.getFullYear() !== Number(formData.year) ||
        birthDate.getMonth() !== currentMonth ||
        birthDate.getDate() !== Number(formData.day) ||
        birthDate > new Date()
      ) {
        alert("Please select a valid birth date.");
        return;
      }
    }

    // Move forward if another step is available
    if (step < 3) {
      setStep(step + 1);
    }
  };

  // Return to the previous step
  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Check the selected plan and submit the profile
  const sendForm = () => {
    if (!formData.plan) {
      alert("Please select a family care plan.");
      return;
    }

    alert(
      `Dependent profile completed for ${formData.firstName} ${formData.lastName}!`,
    );
  };

  // Define the available family care plans
  const plans = [
    {
      name: "Standard Plan",
      description: "Essential family care",
      details: [
        "Dependent profile",
        "Health information",
        "Family care overview",
      ],
    },
    {
      name: "Premium Plan",
      description: "Additional care support",
      details: [
        "All Standard features",
        "Detailed health records",
        "Care planning support",
      ],
    },
    {
      name: "Super Plan",
      description: "Comprehensive family care",
      details: [
        "All Premium features",
        "Family health overview",
        "Organized care information",
      ],
    },
  ];

  return (
    <div className="profile-page">
      {/* Page heading */}
      <div className="page-heading">
        <h1>Build Your Profile</h1>
        <p>This information will help us learn more about your family.</p>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-line">
          <div
            className={`progress-filled ${
              step === 1 ? "step-one" : step === 2 ? "step-two" : "step-three"
            }`}
          ></div>

          {/* Highlight the completed and current steps */}
          <div
            className={`progress-circle first ${step >= 1 ? "active" : ""}`}
          ></div>

          <div
            className={`progress-circle second ${step >= 2 ? "active" : ""}`}
          ></div>

          <div
            className={`progress-circle third ${step >= 3 ? "active" : ""}`}
          ></div>
        </div>

        {/* Display the step names */}
        <div className="step-labels">
          <div className={step === 1 ? "current" : ""}>
            Dependent Registration
          </div>

          <div className={step === 2 ? "current" : ""}>
            Dependent Health
            <br />
            Records
          </div>

          <div className={step === 3 ? "current" : ""}>Family Care Plan</div>
        </div>
      </div>

      <div className="main-card">
        {/* STEP 1: DEPENDENT INFORMATION */}
        {step === 1 && (
          <div className="registration-step">
            <h2>Let's start with the basic information</h2>

            <p className="description">
              Enter the personal details of your family member.
            </p>

            {/* Enter the dependent's name */}
            <div className="two-columns">
              <div className="input-group">
                <label htmlFor="firstName">First Name *</label>

                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="lastName">Last Name *</label>

                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Select the dependent's birth date */}
            <div className="input-group birth-group">
              <label>Birth Date *</label>

              <div className="birth-inputs">
                <select
                  name="month"
                  aria-label="Birth month"
                  value={formData.month}
                  onChange={(e) => {
                    const newMonth = e.target.value;
                    const monthIndex = months.indexOf(newMonth);

                    // Adjust the day if the new month has fewer days
                    const maxDay = new Date(
                      Number(formData.year),
                      monthIndex + 1,
                      0,
                    ).getDate();

                    setFormData({
                      ...formData,
                      month: newMonth,
                      day: String(Math.min(Number(formData.day), maxDay)),
                    });
                  }}
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>

                <select
                  name="day"
                  aria-label="Birth day"
                  value={formData.day}
                  onChange={handleChange}
                >
                  {/* Generate the valid days for the selected month */}
                  {Array.from({ length: daysInMonth }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>

                <select
                  name="year"
                  aria-label="Birth year"
                  value={formData.year}
                  onChange={(e) => {
                    const newYear = e.target.value;

                    // Adjust the day when the year changes
                    const maxDay = new Date(
                      Number(newYear),
                      currentMonth + 1,
                      0,
                    ).getDate();

                    setFormData({
                      ...formData,
                      year: newYear,
                      day: String(Math.min(Number(formData.day), maxDay)),
                    });
                  }}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Select the relationship and gender */}
            <div className="two-columns">
              <div className="input-group">
                <label htmlFor="relation">Relationship *</label>

                <select
                  id="relation"
                  name="relation"
                  value={formData.relation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select relationship</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                  <option value="Child">Child</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="gender">Gender *</label>

                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Continue to the health records step */}
            <div className="button-container next-container">
              <button type="button" className="next-button" onClick={nextStep}>
                NEXT
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: HEALTH RECORDS */}
        {step === 2 && (
          <div className="health-step">
            <h2>Dependent Health Records</h2>

            <p className="description">
              Add health information to help organize your family member's care.
            </p>

            {/* Enter health conditions and medical notes */}
            <div className="health-form">
              <div className="input-group">
                <label htmlFor="healthCondition">Health Condition</label>

                <input
                  id="healthCondition"
                  type="text"
                  name="healthCondition"
                  placeholder="For example, allergies"
                  value={formData.healthCondition}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="medicalInformation">Medical Information</label>

                <textarea
                  id="medicalInformation"
                  name="medicalInformation"
                  placeholder="Add relevant health notes"
                  value={formData.medicalInformation}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Navigate between form steps */}
            <div className="button-container">
              <button
                type="button"
                className="back-button"
                onClick={previousStep}
              >
                BACK
              </button>

              <button type="button" className="next-button" onClick={nextStep}>
                REVIEW
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW AND CARE PLAN */}
        {step === 3 && (
          <div className="plan-step">
            <h2 className="review-title">Review Dependent Information</h2>

            <p className="description">
              Check the details below and choose a family care plan.
            </p>

            {/* Review the personal information */}
            <div className="review-card">
              <div className="review-heading">
                <h3>Personal Information</h3>

                <button
                  type="button"
                  className="edit-button"
                  onClick={() => setStep(1)}
                >
                  Edit
                </button>
              </div>

              <div className="review-grid">
                <p>
                  <strong>Name:</strong> {formData.firstName}{" "}
                  {formData.lastName}
                </p>

                <p>
                  <strong>Birth Date:</strong> {formData.month} {formData.day},{" "}
                  {formData.year}
                </p>

                <p>
                  <strong>Relationship:</strong> {formData.relation}
                </p>

                <p>
                  <strong>Gender:</strong> {formData.gender}
                </p>
              </div>

              {/* Review the health information */}
              <div className="review-heading health-review-heading">
                <h3>Health Information</h3>

                <button
                  type="button"
                  className="edit-button"
                  onClick={() => setStep(2)}
                >
                  Edit
                </button>
              </div>

              <p>
                <strong>Health Condition:</strong>{" "}
                {formData.healthCondition || "Not provided"}
              </p>

              <p>
                <strong>Medical Information:</strong>{" "}
                {formData.medicalInformation || "Not provided"}
              </p>
            </div>

            {/* Display the available family care plans */}
            <h2 className="choose-plan-title">Choose a Family Care Plan</h2>

            <div className="plans">
              {plans.map((plan) => (
                <button
                  type="button"
                  key={plan.name}
                  className={`plan-card ${
                    formData.plan === plan.name ? "selected-plan" : ""
                  }`}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      plan: plan.name,
                    })
                  }
                >
                  <h3>{plan.name}</h3>

                  <p className="plan-description">{plan.description}</p>

                  <div className="plan-line"></div>

                  {/* List the features included in each plan */}
                  {plan.details.map((detail) => (
                    <div className="detail" key={detail}>
                      <span>✓</span>
                      <p>{detail}</p>
                    </div>
                  ))}

                  {/* Show whether the plan is selected */}
                  <span className="plan-selection">
                    {formData.plan === plan.name ? "Selected" : "Select plan"}
                  </span>
                </button>
              ))}
            </div>

            {/* Go back or submit the profile */}
            <div className="button-container">
              <button
                type="button"
                className="back-button"
                onClick={previousStep}
              >
                BACK
              </button>

              <button type="button" className="send-button" onClick={sendForm}>
                SUBMIT PROFILE
              </button>
            </div>
          </div>
        )}
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

export default Dependents;
