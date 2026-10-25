import { useState } from "react";
import "./FindDoctor.css";

// SAMPLE DOCTOR DATA
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    specialty: "Cardiology",
    location: "Kabul",
    rating: 4.9,
    reviews: 124,
    experience: 12,
    availability: "Available tomorrow",
    initials: "SA",
    color: "#F3DDF0",
  },
  {
    id: 2,
    name: "Dr. Ahmad Rahimi",
    specialty: "Neurology",
    location: "Kabul",
    rating: 4.8,
    reviews: 98,
    experience: 10,
    availability: "Available today",
    initials: "AR",
    color: "#E5DFFC",
  },
  {
    id: 3,
    name: "Dr. Maryam Khan",
    specialty: "Dermatology",
    location: "Herat",
    rating: 4.9,
    reviews: 86,
    experience: 8,
    availability: "Available tomorrow",
    initials: "MK",
    color: "#FCE5D9",
  },
  {
    id: 4,
    name: "Dr. Farid Noori",
    specialty: "Emergency Medicine",
    location: "Mazar-i-Sharif",
    rating: 4.7,
    reviews: 73,
    experience: 9,
    availability: "Accepting requests",
    initials: "FN",
    color: "#DDF2EA",
  },
  {
    id: 5,
    name: "Dr. Laila Sediqi",
    specialty: "Ophthalmology",
    location: "Kabul",
    rating: 4.8,
    reviews: 112,
    experience: 11,
    availability: "Available today",
    initials: "LS",
    color: "#FBE6EF",
  },
  {
    id: 6,
    name: "Dr. Omar Hassan",
    specialty: "Anesthesiology",
    location: "Herat",
    rating: 4.7,
    reviews: 65,
    experience: 7,
    availability: "Accepting requests",
    initials: "OH",
    color: "#E1EAFB",
  },
];

// AVAILABLE SPECIALTIES
const specialties = [
  "Cardiology",
  "Dermatology",
  "Emergency Medicine",
  "Neurology",
  "Ophthalmology",
  "Anesthesiology",
];

// HEALTHCARE SERVICES
const services = [
  {
    title: "Primary Care and Internal Medicine",
    icon: "fa-heart-pulse",
    description:
      "Learn about general healthcare, preventive checkups, and support for ongoing health needs.",
  },
  {
    title: "Emergency Care",
    icon: "fa-kit-medical",
    description:
      "Learn about emergency care options. For a medical emergency, contact your local emergency service.",
  },
  {
    title: "Imaging Services",
    icon: "fa-x-ray",
    description:
      "Explore diagnostic imaging services, including X-rays, ultrasound, and MRI scans.",
  },
  {
    title: "Urgent Care",
    icon: "fa-stethoscope",
    description:
      "Explore options for health concerns that need prompt medical attention.",
  },
];

function FindDoctor() {
  // SEARCH AND FILTER STATES
  const [doctorSearch, setDoctorSearch] = useState("");
  const [location, setLocation] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  // SERVICE AND RESULTS STATES
  const [openService, setOpenService] = useState(null);
  const [showResults, setShowResults] = useState(true);

  // APPOINTMENT FORM STATES
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");

  // FILTER AND SORT DOCTOR PROFILES
  const filteredDoctors = doctors
    .filter((doctor) => {
      const searchText = doctorSearch.trim().toLowerCase();
      const locationText = location.trim().toLowerCase();

      const matchesSearch =
        searchText === "" ||
        doctor.name.toLowerCase().includes(searchText) ||
        doctor.specialty.toLowerCase().includes(searchText);

      const matchesLocation =
        locationText === "" ||
        doctor.location.toLowerCase().includes(locationText);

      const matchesSpecialty =
        specialtyFilter === "" || doctor.specialty === specialtyFilter;

      const matchesAvailability =
        availabilityFilter === "" || doctor.availability === availabilityFilter;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesSpecialty &&
        matchesAvailability
      );
    })
    .sort((firstDoctor, secondDoctor) => {
      if (sortBy === "rating") {
        return secondDoctor.rating - firstDoctor.rating;
      }

      if (sortBy === "experience") {
        return secondDoctor.experience - firstDoctor.experience;
      }

      if (sortBy === "name") {
        return firstDoctor.name.localeCompare(secondDoctor.name);
      }

      return firstDoctor.id - secondDoctor.id;
    });

  // HANDLE SEARCH SUBMISSION
  function handleDoctorSearch(event) {
    event.preventDefault();
    setShowResults(true);
    setBookingMessage("");
  }

  // UPDATE LOCATION INPUT
  function handleLocationChange(event) {
    setLocation(event.target.value);
  }

  // FILTER DOCTORS BY SPECIALTY
  function handleSpecialtyClick(specialty) {
    setDoctorSearch("");
    setSpecialtyFilter(specialty);
    setShowResults(true);
    setBookingMessage("");

    document
      .getElementById("doctor-results")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // RESET ALL FILTERS
  function handleClearFilters() {
    setDoctorSearch("");
    setLocation("");
    setSpecialtyFilter("");
    setAvailabilityFilter("");
    setSortBy("recommended");
    setBookingMessage("");
    setSelectedDoctor(null);
    setShowResults(true);
  }

  // SELECT DOCTOR FOR APPOINTMENT
  function handleBookDoctor(doctor) {
    setSelectedDoctor(doctor);
    setBookingMessage("");

    setTimeout(() => {
      document
        .getElementById("appointment-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  // HANDLE APPOINTMENT FORM SUBMISSION
  function handleBookingSubmit(event) {
    event.preventDefault();

    if (!selectedDoctor) {
      return;
    }

    setBookingMessage(
      `Your demo request for ${selectedDoctor.name} on ${bookingDate} has been prepared. No appointment has been booked or sent to a clinic.`,
    );

    setSelectedDoctor(null);
    setBookingName("");
    setBookingEmail("");
    setBookingDate("");
  }

  // OPEN OR CLOSE SERVICE DETAILS
  function handleServiceClick(index) {
    setOpenService(openService === index ? null : index);
  }

  return (
    <main className="find-doctor-page">
      {/* HERO SECTION */}

      <section className="doctor-hero">
        <div className="doctor-hero-content">
          <span className="doctor-eyebrow">YOUR HEALTH, YOUR CHOICE</span>

          <h1>
            Find the care
            <br />
            that's right for you.
          </h1>

          <p>
            Explore healthcare specialties and discover sample doctor profiles
            to help you take your next step.
          </p>

          {/* DOCTOR SEARCH FORM */}
          <form className="doctor-search" onSubmit={handleDoctorSearch}>
            <label className="doctor-search-field">
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
              <span className="sr-only">Doctor name or specialty</span>
              <input
                type="search"
                placeholder="Doctor name or specialty"
                value={doctorSearch}
                onChange={(event) => setDoctorSearch(event.target.value)}
              />
            </label>

            <label className="doctor-search-field">
              <i className="fa-solid fa-location-dot" aria-hidden="true" />
              <span className="sr-only">City</span>
              <input
                type="text"
                placeholder="City, e.g. Kabul"
                value={location}
                onChange={handleLocationChange}
              />
            </label>

            <button type="submit" className="doctor-search-btn">
              Find Doctors
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </button>
          </form>

          <div className="doctor-hero-note">
            <i className="fa-solid fa-shield-heart" aria-hidden="true" />
            Sample profiles for demonstration
          </div>
        </div>
      </section>

      {/* DOCTOR RESULTS */}

      <section className="doctor-results-section" id="doctor-results">
        <div className="doctor-results-heading">
          <div>
            <span className="results-eyebrow">EXPLORE YOUR OPTIONS</span>

            <h2>Meet your next doctor</h2>

            <p>
              Search our sample directory by specialty, availability, or city.
            </p>
          </div>

          <span className="doctor-result-count">
            {filteredDoctors.length}{" "}
            {filteredDoctors.length === 1 ? "profile" : "profiles"}
          </span>
        </div>

        {/* FILTER AND SORT OPTIONS */}
        <div className="doctor-filter-panel">
          <label className="doctor-filter-field">
            <span>Specialty</span>

            <select
              value={specialtyFilter}
              onChange={(event) => setSpecialtyFilter(event.target.value)}
            >
              <option value="">All specialties</option>

              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </label>

          <label className="doctor-filter-field">
            <span>Availability</span>

            <select
              value={availabilityFilter}
              onChange={(event) => setAvailabilityFilter(event.target.value)}
            >
              <option value="">Any availability</option>
              <option value="Available today">Available today</option>
              <option value="Available tomorrow">Available tomorrow</option>
              <option value="Accepting requests">Accepting requests</option>
            </select>
          </label>

          <label className="doctor-filter-field">
            <span>Sort by</span>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Highest rating</option>
              <option value="experience">Most experience</option>
              <option value="name">Doctor name</option>
            </select>
          </label>

          <button
            type="button"
            className="clear-search-btn"
            onClick={handleClearFilters}
          >
            <i className="fa-solid fa-rotate-left" aria-hidden="true" />
            Reset
          </button>
        </div>

        {/* DISPLAY MATCHING DOCTOR CARDS */}
        {showResults && filteredDoctors.length > 0 && (
          <div className="doctor-results-grid">
            {filteredDoctors.map((doctor) => (
              <article className="doctor-profile-card" key={doctor.id}>
                <div className="doctor-profile-top">
                  <div
                    className="doctor-avatar"
                    style={{
                      backgroundColor: doctor.color,
                    }}
                    aria-label={`Initials ${doctor.initials}`}
                  >
                    {doctor.initials}
                  </div>

                  <span className="doctor-rating">
                    <i className="fa-solid fa-star" aria-hidden="true" />
                    {doctor.rating.toFixed(1)}
                    <span className="doctor-review-count">
                      ({doctor.reviews})
                    </span>
                  </span>
                </div>

                <p className="doctor-card-label">SAMPLE DOCTOR PROFILE</p>

                <h3>{doctor.name}</h3>

                <p className="doctor-profile-specialty">{doctor.specialty}</p>

                <div className="doctor-profile-detail">
                  <i className="fa-solid fa-location-dot" aria-hidden="true" />
                  <span>{doctor.location}</span>
                </div>

                <div className="doctor-profile-detail">
                  <i
                    className="fa-solid fa-briefcase-medical"
                    aria-hidden="true"
                  />
                  <span>{doctor.experience} years of experience</span>
                </div>

                <div className="doctor-availability">
                  <i
                    className="fa-regular fa-calendar-check"
                    aria-hidden="true"
                  />
                  {doctor.availability}
                </div>

                {/* SELECT DOCTOR */}
                <button
                  type="button"
                  className="book-doctor-btn"
                  onClick={() => handleBookDoctor(doctor)}
                >
                  Request Appointment
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        )}

        {/* DISPLAY WHEN NO DOCTORS MATCH */}
        {showResults && filteredDoctors.length === 0 && (
          <div className="no-doctors-found">
            <i className="fa-solid fa-user-doctor" aria-hidden="true" />

            <h3>No matching profiles</h3>

            <p>Try another search, city, specialty, or availability option.</p>

            <button
              type="button"
              className="book-doctor-btn"
              onClick={handleClearFilters}
            >
              Show all sample doctors
            </button>
          </div>
        )}
      </section>

      {/* APPOINTMENT FORM */}

      {selectedDoctor && (
        <section className="appointment-section" id="appointment-form">
          <div className="appointment-heading">
            <span className="results-eyebrow">YOUR NEXT STEP</span>

            <h2>Request an appointment</h2>

            <p>
              Selected doctor: <strong>{selectedDoctor.name}</strong>
            </p>

            <p>
              Complete this form to see how an appointment request could
              work.
            </p>
          </div>

          <form className="appointment-form" onSubmit={handleBookingSubmit}>
            <label>
              Full name
              <input
                type="text"
                value={bookingName}
                onChange={(event) => setBookingName(event.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                value={bookingEmail}
                onChange={(event) => setBookingEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label>
              Preferred date
              <input
                type="date"
                value={bookingDate}
                min={new Date().toLocaleDateString("en-CA")}
                onChange={(event) => setBookingDate(event.target.value)}
                required
              />
            </label>

            {/* SUBMIT OR CANCEL REQUEST */}
            <div className="appointment-form-actions">
              <button type="submit" className="book-doctor-btn">
                Prepare Appointment Request
              </button>

              <button
                type="button"
                className="cancel-booking-btn"
                onClick={() => setSelectedDoctor(null)}
              >
                Cancel
              </button>
            </div>

            <p className="appointment-demo-note">
            This form does not send your details to a clinic or reserve an appointment.
            </p>
          </form>
        </section>
      )}

      {/* BOOKING CONFIRMATION */}

      {bookingMessage && (
        <div className="booking-message" role="status">
          <i className="fa-solid fa-circle-check" aria-hidden="true" />

          <p>{bookingMessage}</p>

          <button
            type="button"
            onClick={() => setBookingMessage("")}
            aria-label="Dismiss confirmation message"
          >
            ×
          </button>
        </div>
      )}

      {/* SPECIAL SERVICES */}

      <section className="special-services">
        <div className="doctor-section-heading">
          <span className="results-eyebrow">CARE AND SUPPORT</span>

          <h2>Explore our services</h2>

          <p>
            Learn about different types of healthcare services. Select a topic
            to read more.
          </p>
        </div>

        {/* EXPAND OR COLLAPSE SERVICE DETAILS */}
        <div className="services-grid">
          {services.map((service, index) => (
            <article
              className={`service-card ${
                openService === index ? "service-open" : ""
              }`}
              key={service.title}
            >
              <button
                type="button"
                className="service-card-toggle"
                onClick={() => handleServiceClick(index)}
                aria-expanded={openService === index}
              >
                <span className="service-icon">
                  <i
                    className={`fa-solid ${service.icon}`}
                    aria-hidden="true"
                  />
                </span>

                <span className="service-card-title">{service.title}</span>

                <i
                  className={`fa-solid fa-chevron-down service-chevron ${
                    openService === index ? "rotated" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {openService === index && (
                <p className="service-description">{service.description}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* SPECIALTIES */}

      <section className="specialty-section">
        <div className="doctor-section-heading">
          <span className="results-eyebrow">BROWSE BY SPECIALTY</span>

          <h2>What kind of care do you need?</h2>

          <p>Choose a specialty to filter the sample doctor directory.</p>
        </div>

        {/* SELECT A SPECIALTY */}
        <div className="specialty-grid">
          {specialties.map((specialty) => (
            <button
              type="button"
              className="specialty-box"
              key={specialty}
              onClick={() => handleSpecialtyClick(specialty)}
            >
              <span className="specialty-icon">
                <i className="fa-solid fa-user-doctor" aria-hidden="true" />
              </span>

              <span className="specialty-name">{specialty}</span>

              <i
                className="fa-solid fa-arrow-up-right-from-square specialty-arrow"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </section>

      {/* FOOTER */}

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
    </main>
  );
}

export default FindDoctor;
