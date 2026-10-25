import { useEffect, useState } from "react";
import "./Appointments.css";

const doctors = [
  { name: "Dr. Afiah", specialty: "Cardiologist" },
  { name: "Dr. Sarah Lim", specialty: "General Practitioner" },
  { name: "Dr. Daniel Wong", specialty: "Dermatologist" },
];

const STORAGE_KEY = "mypatienthub-appointments";

function getDateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function createSampleAppointments() {
  return [
    {
      id: 1,
      doctor: "Dr. Afiah",
      specialty: "Cardiologist",
      date: getDateOffset(3),
      time: "10:00",
      type: "In-person",
      reason: "Regular heart checkup",
      status: "Upcoming",
    },
    {
      id: 2,
      doctor: "Dr. Sarah Lim",
      specialty: "General Practitioner",
      date: getDateOffset(7),
      time: "14:30",
      type: "Online",
      reason: "General consultation",
      status: "Upcoming",
    },
    {
      id: 3,
      doctor: "Dr. Daniel Wong",
      specialty: "Dermatologist",
      date: getDateOffset(-5),
      time: "11:00",
      type: "In-person",
      reason: "Skin consultation",
      status: "Completed",
    },
    {
      id: 4,
      doctor: "Dr. Afiah",
      specialty: "Cardiologist",
      date: getDateOffset(-2),
      time: "09:30",
      type: "Online",
      reason: "Follow-up consultation",
      status: "Cancelled",
    },
  ];
}

function getInitialAppointments() {
  try {
    const savedAppointments = localStorage.getItem(STORAGE_KEY);

    if (savedAppointments !== null) {
      const parsedAppointments = JSON.parse(savedAppointments);

      if (Array.isArray(parsedAppointments)) {
        return parsedAppointments;
      }
    }
  } catch (error) {
    console.error("Could not load appointments:", error);
  }

  return createSampleAppointments();
}

function formatDate(dateString) {
  if (!dateString) return "";

  return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(timeString) {
  if (!timeString) return "";

  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function Appointments() {
  const [appointments, setAppointments] = useState(getInitialAppointments);

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    doctor: doctors[0].name,
    date: "",
    time: "",
    type: "In-person",
    reason: "",
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "mypatienthub-appointments",
        JSON.stringify(appointments),
      );
    } catch (error) {
      console.error("Could not save appointments:", error);
    }
  }, [appointments]);

  const today = getDateOffset(0);

  const upcomingCount = appointments.filter(
    (appointment) => appointment.status === "Upcoming",
  ).length;

  const completedCount = appointments.filter(
    (appointment) => appointment.status === "Completed",
  ).length;

  const cancelledCount = appointments.filter(
    (appointment) => appointment.status === "Cancelled",
  ).length;

  const filteredAppointments = appointments
    .filter((appointment) => {
      const matchesFilter =
        activeFilter === "All" || appointment.status === activeFilter;

      const matchesSearch =
        appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      return (
        new Date(a.date) - new Date(b.date) || a.time.localeCompare(b.time)
      );
    });

  function openBookingForm() {
    setFormData({
      doctor: doctors[0].name,
      date: "",
      time: "",
      type: "In-person",
      reason: "",
    });

    setSelectedAppointment(null);
    setMessage("");
    setModalType("book");
  }

  function openRescheduleForm(appointment) {
    setSelectedAppointment(appointment);

    setFormData({
      doctor: appointment.doctor,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      reason: appointment.reason,
    });

    setMessage("");
    setModalType("reschedule");
  }

  function closeModal() {
    setModalType("");
    setSelectedAppointment(null);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formData.date < today) {
      setMessage("Please choose today or a future date.");
      return;
    }

    const doctor = doctors.find((item) => item.name === formData.doctor);

    if (!doctor) {
      setMessage("Please select a valid doctor.");
      return;
    }

    if (modalType === "reschedule" && selectedAppointment) {
      setAppointments((previousAppointments) =>
        previousAppointments.map((appointment) =>
          appointment.id === selectedAppointment.id
            ? {
                ...appointment,
                date: formData.date,
                time: formData.time,
                type: formData.type,
                reason: formData.reason,
                status: "Upcoming",
              }
            : appointment,
        ),
      );

      setMessage("Appointment rescheduled successfully.");
    } else {
      const newAppointment = {
        id: Date.now(),
        doctor: doctor.name,
        specialty: doctor.specialty,
        date: formData.date,
        time: formData.time,
        type: formData.type,
        reason: formData.reason,
        status: "Upcoming",
      };

      setAppointments((previousAppointments) => [
        ...previousAppointments,
        newAppointment,
      ]);

      setMessage("Appointment booked successfully.");
    }

    closeModal();
  }

  function cancelAppointment(appointment) {
    const confirmed = window.confirm(
      `Are you sure you want to cancel your appointment with ${appointment.doctor}?`,
    );

    if (!confirmed) return;

    setAppointments((previousAppointments) =>
      previousAppointments.map((item) =>
        item.id === appointment.id ? { ...item, status: "Cancelled" } : item,
      ),
    );

    setMessage("Appointment cancelled successfully.");
  }

  function markAsCompleted(appointment) {
    const confirmed = window.confirm("Mark this appointment as completed?");

    if (!confirmed) return;

    setAppointments((previousAppointments) =>
      previousAppointments.map((item) =>
        item.id === appointment.id ? { ...item, status: "Completed" } : item,
      ),
    );

    setMessage("Appointment marked as completed.");
  }

  function resetDemoAppointments() {
    const confirmed = window.confirm(
      "Reset the appointment list to its original sample data? Your current appointment changes will be lost.",
    );

    if (!confirmed) return;

    setAppointments(createSampleAppointments());
    setActiveFilter("All");
    setSearchTerm("");
    setMessage("Sample appointments have been restored.");
  }

  return (
    <div className="appointments-page">
      <div className="appointments-header">
        <div>
          <p className="appointments-eyebrow">HEALTHCARE MANAGEMENT</p>
          <h1>My Appointments</h1>
          <p className="appointments-subtitle">
            Book visits and manage your healthcare appointments.
          </p>
        </div>

        <button className="appointment-primary-btn" onClick={openBookingForm}>
          <span>+</span> Book Appointment
        </button>
      </div>

      {message && (
        <div className="appointment-message" role="status">
          <span>{message}</span>
          <button
            className="message-close"
            onClick={() => setMessage("")}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      <div className="appointment-stats">
        <div className="appointment-stat-card">
          <div className="appointment-stat-icon total-icon">▦</div>
          <div>
            <p>Total Appointments</p>
            <h2>{appointments.length}</h2>
          </div>
        </div>

        <div className="appointment-stat-card">
          <div className="appointment-stat-icon upcoming-icon">◷</div>
          <div>
            <p>Upcoming</p>
            <h2>{upcomingCount}</h2>
          </div>
        </div>

        <div className="appointment-stat-card">
          <div className="appointment-stat-icon completed-icon">✓</div>
          <div>
            <p>Completed</p>
            <h2>{completedCount}</h2>
          </div>
        </div>

        <div className="appointment-stat-card">
          <div className="appointment-stat-icon cancelled-icon">×</div>
          <div>
            <p>Cancelled</p>
            <h2>{cancelledCount}</h2>
          </div>
        </div>
      </div>

      <section className="appointment-list-section">
        <div className="appointment-section-heading">
          <div>
            <h2>Appointment List</h2>
            <p>View and manage your scheduled visits.</p>
          </div>

          <button
            className="appointment-reset-btn"
            onClick={resetDemoAppointments}
            title="Restore the original sample appointments"
          >
            Reset data
          </button>
        </div>

        <div className="appointment-toolbar">
          <div className="appointment-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search doctor or specialty..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search appointments"
            />
          </div>

          <div className="appointment-filters">
            {["All", "Upcoming", "Completed", "Cancelled"].map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? "active" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="appointment-list">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <article className="appointment-card" key={appointment.id}>
                <div className="appointment-date-box">
                  <span>
                    {new Date(
                      `${appointment.date}T12:00:00`,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                  <strong>
                    {new Date(`${appointment.date}T12:00:00`).getDate()}
                  </strong>
                  <small>
                    {new Date(
                      `${appointment.date}T12:00:00`,
                    ).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </small>
                </div>

                <div className="appointment-main-info">
                  <h3>{appointment.doctor}</h3>
                  <p>{appointment.specialty}</p>

                  <div className="appointment-meta">
                    <span>◷ {formatTime(appointment.time)}</span>
                    <span>•</span>
                    <span>{appointment.type}</span>
                  </div>

                  <span
                    className={`appointment-status ${appointment.status.toLowerCase()}`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="appointment-actions">
                  <button
                    className="appointment-view-btn"
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setModalType("details");
                    }}
                  >
                    View Details
                  </button>

                  {appointment.status === "Upcoming" && (
                    <>
                      <button
                        className="appointment-reschedule-btn"
                        onClick={() => openRescheduleForm(appointment)}
                      >
                        Reschedule
                      </button>

                      <button
                        className="appointment-cancel-btn"
                        onClick={() => cancelAppointment(appointment)}
                      >
                        Cancel
                      </button>

                      <button
                        className="appointment-complete-btn"
                        onClick={() => markAsCompleted(appointment)}
                      >
                        Mark Completed
                      </button>
                    </>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="appointment-empty-state">
              <div>▦</div>
              <h3>No appointments found</h3>
              <p>Try another search or filter, or book a new appointment.</p>
              <button
                className="appointment-primary-btn"
                onClick={openBookingForm}
              >
                + Book Appointment
              </button>
            </div>
          )}
        </div>
      </section>

      {modalType === "book" && (
        <div className="appointment-modal-overlay">
          <div
            className="appointment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="appointment-modal-title"
          >
            <div className="appointment-modal-heading">
              <div>
                <h2 id="appointment-modal-title">Book an Appointment</h2>
                <p>Enter your visit details below.</p>
              </div>
              <button onClick={closeModal} aria-label="Close">
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="doctor">Choose Doctor</label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleInputChange}
                required
              >
                {doctors.map((doctor) => (
                  <option key={doctor.name} value={doctor.name}>
                    {doctor.name} — {doctor.specialty}
                  </option>
                ))}
              </select>

              <div className="appointment-form-row">
                <div>
                  <label htmlFor="appointment-date">Date</label>
                  <input
                    id="appointment-date"
                    type="date"
                    name="date"
                    min={today}
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="appointment-time">Time</label>
                  <select
                    id="appointment-time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="09:30">9:30 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="14:30">2:30 PM</option>
                    <option value="15:00">3:00 PM</option>
                  </select>
                </div>
              </div>

              <label htmlFor="appointment-type">Visit Type</label>
              <select
                id="appointment-type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="In-person">In-person</option>
                <option value="Online">Online consultation</option>
              </select>

              <label htmlFor="appointment-reason">Reason for Visit</label>
              <textarea
                id="appointment-reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Briefly describe the reason for your visit"
                rows="3"
                required
              />

              <div className="appointment-modal-actions">
                <button
                  type="button"
                  className="appointment-secondary-btn"
                  onClick={closeModal}
                >
                  Go Back
                </button>
                <button type="submit" className="appointment-primary-btn">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalType === "reschedule" && (
        <div className="appointment-modal-overlay">
          <div
            className="appointment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reschedule-modal-title"
          >
            <div className="appointment-modal-heading">
              <div>
                <h2 id="reschedule-modal-title">Reschedule Appointment</h2>
                <p>
                  Choose a new date and time for {selectedAppointment?.doctor}.
                </p>
              </div>
              <button onClick={closeModal} aria-label="Close">
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="reschedule-date">New Date</label>
              <input
                id="reschedule-date"
                type="date"
                name="date"
                min={today}
                value={formData.date}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="reschedule-time">New Time</label>
              <select
                id="reschedule-time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              >
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="09:30">9:30 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="14:30">2:30 PM</option>
                <option value="15:00">3:00 PM</option>
              </select>

              <label htmlFor="reschedule-type">Visit Type</label>
              <select
                id="reschedule-type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="In-person">In-person</option>
                <option value="Online">Online consultation</option>
              </select>

              <label htmlFor="reschedule-reason">Reason for Visit</label>
              <textarea
                id="reschedule-reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                rows="3"
                required
              />

              <div className="appointment-modal-actions">
                <button
                  type="button"
                  className="appointment-secondary-btn"
                  onClick={closeModal}
                >
                  Go Back
                </button>
                <button type="submit" className="appointment-primary-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalType === "details" && selectedAppointment && (
        <div className="appointment-modal-overlay">
          <div
            className="appointment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="details-modal-title"
          >
            <div className="appointment-modal-heading">
              <div>
                <h2 id="details-modal-title">Appointment Details</h2>
                <p>Review your appointment information.</p>
              </div>
              <button onClick={closeModal} aria-label="Close">
                ×
              </button>
            </div>

            <div className="appointment-detail-list">
              <div>
                <span>Doctor</span>
                <strong>{selectedAppointment.doctor}</strong>
              </div>
              <div>
                <span>Specialty</span>
                <strong>{selectedAppointment.specialty}</strong>
              </div>
              <div>
                <span>Date</span>
                <strong>{formatDate(selectedAppointment.date)}</strong>
              </div>
              <div>
                <span>Time</span>
                <strong>{formatTime(selectedAppointment.time)}</strong>
              </div>
              <div>
                <span>Visit Type</span>
                <strong>{selectedAppointment.type}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{selectedAppointment.status}</strong>
              </div>
              <div>
                <span>Reason for Visit</span>
                <strong>{selectedAppointment.reason || "Not provided"}</strong>
              </div>
            </div>

            <div className="appointment-modal-actions">
              <button
                className="appointment-secondary-btn"
                onClick={closeModal}
              >
                Close
              </button>

              {selectedAppointment.status === "Upcoming" && (
                <button
                  className="appointment-primary-btn"
                  onClick={() => openRescheduleForm(selectedAppointment)}
                >
                  Reschedule
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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

export default Appointments;
