import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./Dashboard.css";

// Sample doctor information
const doctors = [
  {
    name: "Dr Afiah",
    specialty: "Cardiologist",
    icon: "fa-heart-pulse",
    time: "Today, 2:30 PM",
    color: "doctor-purple",
  },
  {
    name: "Dr Sarah Lim",
    specialty: "General Practitioner",
    icon: "fa-user-doctor",
    time: "Tomorrow, 10:00 AM",
    color: "doctor-green",
  },
  {
    name: "Dr Daniel Wong",
    specialty: "Dermatologist",
    icon: "fa-hand-dots",
    time: "Friday, 11:30 AM",
    color: "doctor-orange",
  },
];

// Sample appointment information
const appointments = [
  {
    doctor: "Dr Afiah",
    specialty: "Cardiologist",
    date: "Today",
    time: "2:30 PM",
    status: "Confirmed",
  },
  {
    doctor: "Dr Sarah Lim",
    specialty: "General Practitioner",
    date: "Tomorrow",
    time: "10:00 AM",
    status: "Upcoming",
  },
  {
    doctor: "Dr Daniel Wong",
    specialty: "Dermatologist",
    date: "Friday",
    time: "11:30 AM",
    status: "Pending",
  },
];

// Sample promotion details for each category
const promotionDetails = {
  clinics: {
    title: "Clinic Promotions",
    description: "Explore these sample clinic offers.",
    items: [
      "Klinik Lee Healthcare — 19% promotion",
      "Klinik Bandar Baru Nilai — 4% promotion",
      "Klinik Mediviron Giant Nilai — 10% promotion",
      "Klinik Nilai Impian — 21% promotion",
      "Klinik Mediviron — 2% promotion",
    ],
  },
  pharmacies: {
    title: "Pharmacy Promotions",
    description: "Browse sample offers from local pharmacies.",
    items: [
      "Alpro Pharmacy Nilai — 15% promotion",
      "Alpro Pharmacy Pekan Nilai — 12% promotion",
      "OK Pharmacy — 5% promotion",
      "Pharmart Pharmacy Nilai — 9% promotion",
      "Health Lane Family Pharmacy — 14% promotion",
    ],
  },
  market: {
    title: "Smart Market Usage",
    description: "A sample overview of marketplace app usage.",
    items: [
      "Food Panda — 25%",
      "Grab Food — 3%",
      "Online Market — 12%",
      "Health Store — 18%",
    ],
  },
  doctors: {
    title: "Doctor Promotions",
    description: "Explore sample offers from healthcare professionals.",
    items: [
      "Dr Afiah — 10% consultation promotion",
      "Dr Sarah Lim — 15% consultation promotion",
      "Dr Daniel Wong — 12% consultation promotion",
    ],
  },
};

// Reusable doughnut chart component
function DonutChart({
  percent,
  data,
  size = 125,
  innerRadius = 41,
  outerRadius = 62,
  centerLabel = "",
}) {
  return (
    <div
      className="recharts-donut-chart"
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        margin: centerLabel ? "0" : "22px auto",
      }}
    >
      {/* Display the doughnut chart */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={90}
            endAngle={-270}
            stroke="none"
            isAnimationActive={false}
          >
            {/* Set the color of each chart section */}
            {data.map((item, index) => (
              <Cell key={item.name || index} fill={item.color} />
            ))}
          </Pie>

          {/* Show the percentage in the center */}
          <text
            x="50%"
            y={centerLabel ? "46%" : "50%"}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#344054"
            fontSize={20}
            fontWeight="bold"
          >
            {percent}%
          </text>

          {/* Show an optional label below the percentage */}
          {centerLabel && (
            <text
              x="50%"
              y="59%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#667085"
              fontSize={10}
            >
              {centerLabel}
            </text>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function Dashboard() {
  // Store modal and booking information
  const [activeModal, setActiveModal] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");

  // Filter doctors by name or specialty
  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.specialty}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  // Open the booking modal
  function openBooking(doctorName = "") {
    setSelectedDoctor(doctorName);
    setBookingMessage("");
    setSearchText("");
    setActiveModal("booking");
  }

  // Close the modal and clear its message
  function closeModal() {
    setActiveModal("");
    setBookingMessage("");
  }

  // Check the selected doctor before sending a request
  function confirmBooking() {
    if (!selectedDoctor) {
      setBookingMessage("Please choose a doctor first.");
      return;
    }

    setBookingMessage(`Request sent for ${selectedDoctor}.`);
  }

  return (
    <div className="dashboard-page">
      {/* Welcome section */}
      <section className="dashboard-welcome">
        <div>
          <span className="welcome-label">YOUR HEALTH, YOUR PRIORITY</span>
          <h1>Welcome to MyPatientHUB!</h1>
          <p>Your healthcare information, all in one place.</p>
        </div>

        <button
          className="primary-button"
          type="button"
          onClick={() => openBooking()}
        >
          <i className="fa-solid fa-calendar-plus"></i>
          Book an Appointment
        </button>
      </section>

      {/* Quick statistics */}
      <section className="quick-stats">
        <article className="stat-card">
          <div className="stat-icon stat-blue">
            <i className="fa-solid fa-calendar-check"></i>
          </div>
          <div>
            <p>Appointments</p>
            <h2>3</h2>
            <small>Sample appointments</small>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon stat-green">
            <i className="fa-solid fa-user-doctor"></i>
          </div>
          <div>
            <p>Available Doctors</p>
            <h2>{doctors.length}</h2>
            <small>Across different specialties</small>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon stat-purple">
            <i className="fa-solid fa-heart-pulse"></i>
          </div>
          <div>
            <p>Health Index</p>
            <h2>70%</h2>
            <small className="positive-text">+3% sample change</small>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon stat-orange">
            <i className="fa-solid fa-pills"></i>
          </div>
          <div>
            <p>Health Reminders</p>
            <h2>2</h2>
            <small>Reminders</small>
          </div>
        </article>
      </section>

      {/* Promotion charts */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Discover Promotions</h2>
            <p>Explore sample offers from healthcare providers.</p>
          </div>
        </div>

        <div className="dashboard-cards">
          {/* Clinic chart */}
          <article className="dashboard-card promotion-card">
            <div className="card-heading-icon clinic-icon">
              <i className="fa-solid fa-hospital"></i>
            </div>

            <h3>Promotion by Clinics</h3>
            <p className="card-description">
              Check out offers from clinics near you.
            </p>

            <DonutChart
              percent={56}
              data={[
                { name: "Pink", value: 30, color: "#ec008c" },
                { name: "Purple", value: 18, color: "#9e00c7" },
                { name: "Blue", value: 17, color: "#2855e8" },
                { name: "Green", value: 17, color: "#16b849" },
                { name: "Remaining", value: 18, color: "#e6e9ee" },
              ]}
            />

            <ul className="promotion-list">
              <li>
                Klinik Lee Healthcare <b>19%</b>
              </li>
              <li>
                Klinik Bandar Baru Nilai <b>4%</b>
              </li>
              <li>
                Klinik Mediviron Giant Nilai <b>10%</b>
              </li>
            </ul>

            <button
              className="details-button"
              type="button"
              onClick={() => setActiveModal("clinics")}
            >
              More Details <i className="fa-solid fa-arrow-right"></i>
            </button>
          </article>

          {/* Pharmacy chart */}
          <article className="dashboard-card promotion-card">
            <div className="card-heading-icon pharmacy-icon">
              <i className="fa-solid fa-prescription-bottle-medical"></i>
            </div>

            <h3>Promotion by Pharmacies</h3>
            <p className="card-description">
              Discover sample pharmacy promotions.
            </p>

            <DonutChart
              percent={55}
              data={[
                { name: "Blue", value: 25, color: "#2855e8" },
                { name: "Pink", value: 20, color: "#ec008c" },
                { name: "Green", value: 20, color: "#16b849" },
                { name: "Light blue", value: 17, color: "#a9bada" },
                { name: "Remaining", value: 18, color: "#e6e9ee" },
              ]}
            />

            <ul className="promotion-list">
              <li>
                Alpro Pharmacy Nilai <b>15%</b>
              </li>
              <li>
                Alpro Pharmacy Pekan Nilai <b>12%</b>
              </li>
              <li>
                OK Pharmacy <b>5%</b>
              </li>
            </ul>

            <button
              className="details-button"
              type="button"
              onClick={() => setActiveModal("pharmacies")}
            >
              More Details <i className="fa-solid fa-arrow-right"></i>
            </button>
          </article>

          {/* Marketplace chart */}
          <article className="dashboard-card promotion-card">
            <div className="card-heading-icon market-icon">
              <i className="fa-solid fa-bag-shopping"></i>
            </div>

            <h3>Smart Market Usage</h3>
            <p className="card-description">
              See how sample marketplace apps are used.
            </p>

            <DonutChart
              percent={58}
              data={[
                { name: "Navy", value: 25, color: "#303867" },
                { name: "Blue", value: 20, color: "#2c58e7" },
                { name: "Green", value: 20, color: "#16b849" },
                { name: "Pink", value: 17, color: "#e5009b" },
                { name: "Remaining", value: 18, color: "#e6e9ee" },
              ]}
            />

            <ul className="promotion-list">
              <li>
                Food Panda <b>25%</b>
              </li>
              <li>
                Grab Food <b>3%</b>
              </li>
              <li>
                Online Market <b>12%</b>
              </li>
            </ul>

            <button
              className="details-button"
              type="button"
              onClick={() => setActiveModal("market")}
            >
              More Details <i className="fa-solid fa-arrow-right"></i>
            </button>
          </article>

          {/* Doctor promotion chart */}
          <article className="dashboard-card promotion-card">
            <div className="card-heading-icon doctor-promotion-icon">
              <i className="fa-solid fa-user-doctor"></i>
            </div>

            <h3>Doctor Promotions</h3>
            <p className="card-description">
              Explore sample offers from healthcare professionals.
            </p>

            <DonutChart
              percent={60}
              data={[
                { name: "Orange", value: 30, color: "#dc8a36" },
                { name: "Purple", value: 30, color: "#9e00c7" },
                { name: "Remaining", value: 40, color: "#f3e8ff" },
              ]}
            />

            <ul className="promotion-list">
              <li>
                Dr Afiah <b>10%</b>
              </li>
              <li>
                Dr Sarah Lim <b>15%</b>
              </li>
              <li>
                Dr Daniel Wong <b>12%</b>
              </li>
            </ul>

            <button
              className="details-button"
              type="button"
              onClick={() => setActiveModal("doctors")}
            >
              More Details <i className="fa-solid fa-arrow-right"></i>
            </button>
          </article>
        </div>
      </section>

      {/* Find doctors section */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Find Your Doctor</h2>
            <p>Explore doctors and their specialties.</p>
          </div>

          <button
            className="text-button"
            type="button"
            onClick={() => openBooking()}
          >
            View All Doctors <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        {/* Display each doctor card */}
        <div className="doctor-grid">
          {doctors.map((doctor) => (
            <article className="doctor-card" key={doctor.name}>
              <div className={`doctor-avatar ${doctor.color}`}>
                <i className={`fa-solid ${doctor.icon}`}></i>
              </div>

              <span className="availability-label">
                <span></span> Availability
              </span>

              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>

              <div className="doctor-time">
                <i className="fa-regular fa-clock"></i>
                {doctor.time}
              </div>

              <button
                className="doctor-book-button"
                type="button"
                onClick={() => openBooking(doctor.name)}
              >
                Book Appointment
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Health index and reminders */}
      <section className="dashboard-lower-grid">
        <article className="dashboard-card health-card">
          <div className="section-heading">
            <div>
              <h2>Health Index</h2>
              <p>Your sample health overview</p>
            </div>
            <i className="fa-solid fa-heart-pulse health-heading-icon"></i>
          </div>

          <div className="health-score">
            <div className="health-progress" style={{ background: "none" }}>
              {/* Display the health index chart */}
              <DonutChart
                percent={70}
                size={140}
                innerRadius={47}
                outerRadius={68}
                centerLabel="Health Index"
                data={[
                  { name: "Pink", value: 35, color: "#ec008c" },
                  { name: "Purple", value: 35, color: "#9e00c7" },
                  { name: "Remaining", value: 30, color: "#e6e9ee" },
                ]}
              />
            </div>

            <div className="health-score-info">
              <span className="positive-text">
                <i className="fa-solid fa-arrow-trend-up"></i> +3%
              </span>
              <p>Sample change</p>
              <small>This is an indicator, not a medical assessment.</small>
            </div>
          </div>

          {/* Show a general wellness tip */}
          <div className="health-tip">
            <i className="fa-solid fa-lightbulb"></i>
            <p>
              <b>Wellness tip</b>
              <br />
              Keep track of your appointments and follow advice from your
              healthcare professional.
            </p>
          </div>
        </article>

        {/* Display health reminders */}
        <article className="dashboard-card reminder-card">
          <div className="section-heading">
            <div>
              <h2>Health Reminders</h2>
              <p>Helpful things to remember</p>
            </div>
            <i className="fa-regular fa-bell reminder-heading-icon"></i>
          </div>

          <div className="reminder-item">
            <div className="reminder-icon reminder-blue">
              <i className="fa-solid fa-calendar-day"></i>
            </div>
            <div>
              <b>Check your appointments</b>
              <p>Review your upcoming visits.</p>
            </div>
          </div>

          <div className="reminder-item">
            <div className="reminder-icon reminder-green">
              <i className="fa-solid fa-notes-medical"></i>
            </div>
            <div>
              <b>Update health records</b>
              <p>Keep your information up to date.</p>
            </div>
          </div>
        </article>
      </section>

      {/* Upcoming appointments */}
      <section className="dashboard-card dashboard-appointments">
        <div className="section-heading">
          <div>
            <h2>Upcoming Appointments</h2>
            <p>Keep track of your sample healthcare visits.</p>
          </div>

          <button
            className="text-button"
            type="button"
            onClick={() => setActiveModal("appointments")}
          >
            View All <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        {/* Show the first two appointments */}
        <div className="appointment-list">
          {appointments.slice(0, 2).map((appointment) => (
            <div className="appointment-row" key={appointment.doctor}>
              <div className="appointment-doctor-icon">
                <i className="fa-solid fa-user-doctor"></i>
              </div>

              <div className="appointment-doctor-info">
                <b>{appointment.doctor}</b>
                <small>{appointment.specialty}</small>
              </div>

              <div className="appointment-date">
                <i className="fa-regular fa-calendar"></i>
                <span>
                  {appointment.date}, {appointment.time}
                </span>
              </div>

              <span
                className={`appointment-status status-${appointment.status.toLowerCase()}`}
              >
                {appointment.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="doctor-footer">
        <p>
          © 2026 MyPatientHUB. Made with <span className="footer-heart">♥</span>{" "}
          for better healthcare.
        </p>

        <div className="doctor-footer-links">
          <span>MyPatientHUB</span>
          <span>Healthcare Directory</span>
        </div>
      </footer>

      {/* Modals */}
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <section
            className="dashboard-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={closeModal}
              aria-label="Close window"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {/* Promotion details modal */}
            {promotionDetails[activeModal] && (
              <>
                <div className="modal-icon">
                  <i className="fa-solid fa-tag"></i>
                </div>
                <h2 id="modal-title">{promotionDetails[activeModal].title}</h2>
                <p>{promotionDetails[activeModal].description}</p>

                <ul className="modal-detail-list">
                  {promotionDetails[activeModal].items.map((item) => (
                    <li key={item}>
                      <i className="fa-solid fa-circle-check"></i>
                      {item}
                    </li>
                  ))}
                </ul>

                <small className="demo-note">
                  Sample information for website demonstration.
                </small>
              </>
            )}

            {/* Appointments modal */}
            {activeModal === "appointments" && (
              <>
                <div className="modal-icon">
                  <i className="fa-solid fa-calendar-check"></i>
                </div>
                <h2 id="modal-title">All Appointments</h2>
                <p>Review the sample appointment schedule.</p>

                {/* List all sample appointments */}
                <div className="modal-appointment-list">
                  {appointments.map((appointment) => (
                    <div className="modal-appointment" key={appointment.doctor}>
                      <b>{appointment.doctor}</b>
                      <span>{appointment.specialty}</span>
                      <small>
                        {appointment.date} · {appointment.time}
                      </small>
                      <span
                        className={`appointment-status status-${appointment.status.toLowerCase()}`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className="primary-button modal-primary-button"
                  type="button"
                  onClick={() => openBooking()}
                >
                  Book an Appointment
                </button>
              </>
            )}

            {/* Booking modal */}
            {activeModal === "booking" && (
              <>
                <div className="modal-icon">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <h2 id="modal-title">Find a Doctor</h2>
                <p>Search the sample doctor directory.</p>

                {/* Search doctors by name or specialty */}
                <input
                  className="doctor-search"
                  type="text"
                  placeholder="Search by name or specialty..."
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                />

                {/* Display matching doctors */}
                <div className="modal-doctor-list">
                  {filteredDoctors.map((doctor) => (
                    <button
                      className={`modal-doctor-option ${
                        selectedDoctor === doctor.name ? "selected" : ""
                      }`}
                      type="button"
                      key={doctor.name}
                      onClick={() => {
                        setSelectedDoctor(doctor.name);
                        setBookingMessage("");
                      }}
                    >
                      <span>
                        <b>{doctor.name}</b>
                        <small>{doctor.specialty}</small>
                      </span>
                      <i
                        className={`fa-solid ${
                          selectedDoctor === doctor.name
                            ? "fa-circle-check"
                            : "fa-circle"
                        }`}
                      ></i>
                    </button>
                  ))}

                  {/* Show a message when no doctors match */}
                  {filteredDoctors.length === 0 && (
                    <p className="no-doctors">
                      No matching doctors found. Try another search.
                    </p>
                  )}
                </div>

                {/* Confirm the appointment request */}
                <button
                  className="primary-button modal-primary-button"
                  type="button"
                  onClick={confirmBooking}
                >
                  Request Appointment
                </button>

                {/* Display the booking message */}
                {bookingMessage && (
                  <p className="booking-message">{bookingMessage}</p>
                )}

                <small className="demo-note">
                  This does not contact a doctor or create a real booking.
                </small>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
