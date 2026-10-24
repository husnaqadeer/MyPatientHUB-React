
import { useState } from "react";
import "./FindClinic.css";

const clinics = [
    {
        id: 1,
        name: "Kabul Family Medical Clinic",
        type: "Family Clinic",
        city: "Kabul",
        address: "Kabul, Afghanistan",
        phone: "+93 78 678 7869",
        hours: "Hours: 8:00 AM - 5:00 PM",
        rating: "4.8",
        services: [
            "General Checkup",
            "Family Medicine",
            "Blood Tests"
        ],
        mapX: 38,
        mapY: 35,
    },
    {
        id: 2,
        name: "Herat Health Care Clinic",
        type: "General Clinic",
        city: "Herat",
        address: "Herat, Afghanistan",
        phone: "+93 79 456 2381",
        hours: "Hours: 8:00 AM - 4:00 PM",
        rating: "4.6",
        services: [
            "General Checkup",
            "Women's Health",
            "Vaccination"
        ],
        mapX: 23,
        mapY: 55,
    },
    {
        id: 3,
        name: "Mazar Family Health Clinic",
        type: "Family Clinic",
        city: "Mazar-i-Sharif",
        address: "Mazar-i-Sharif, Balkh, Afghanistan",
        phone: "+93 70 345 6728",
        hours: "Hours: 9:00 AM - 5:00 PM",
        rating: "4.7",
        services: [
            "Family Medicine",
            "Pediatrics",
            "Blood Tests"
        ],
        mapX: 53,
        mapY: 22,
    },
    {
        id: 4,
        name: "Kandahar Community Clinic",
        type: "Community Clinic",
        city: "Kandahar",
        address: "Kandahar, Afghanistan",
        phone: "+93 77 234 5691",
        hours: "Hours: 8:00 AM - 4:00 PM",
        rating: "4.5",
        services: [
            "General Checkup",
            "Pediatrics",
            "Vaccination"
        ],
        mapX: 45,
        mapY: 76,
    },
];

function FindClinic() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCity, setSelectedCity] = useState("All Cities");
    const [selectedClinic, setSelectedClinic] = useState(clinics[0]);
    const [showContactModal, setShowContactModal] = useState(false);

    const cities = [
        "All Cities",
        "Kabul",
        "Herat",
        "Mazar-i-Sharif",
        "Kandahar",
    ];

    const filteredClinics = clinics.filter((clinic) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            clinic.name.toLowerCase().includes(search) ||
            clinic.type.toLowerCase().includes(search) ||
            clinic.city.toLowerCase().includes(search) ||
            clinic.address.toLowerCase().includes(search) ||
            clinic.services.some((service) =>
                service.toLowerCase().includes(search)
            );

        const matchesCity =
            selectedCity === "All Cities" ||
            clinic.city === selectedCity;

        return matchesSearch && matchesCity;
    });

    function resetFilters() {
        setSearchTerm("");
        setSelectedCity("All Cities");
    }

    function selectClinic(clinic) {
        setSelectedClinic(clinic);
    }

    return (
        <div className="find-clinic-page">

            {/* PAGE HEADER */}

            <header className="clinic-page-header">
                <span className="clinic-eyebrow">
                    Healthcare Directory · Afghanistan
                </span>

                <h1>Find a Clinic</h1>

                <p>
                    Explore clinic information and healthcare
                    services in Afghanistan.
                </p>
            </header>

            {/* SEARCH SECTION */}

            <section className="clinic-finder">
                <div className="clinic-finder-heading">
                    <h2>Search for a Clinic</h2>

                    <span className="clinic-count">
                        {filteredClinics.length} clinics found
                    </span>
                </div>

                <div className="clinic-search-bar">
                    <input
                        className="clinic-search-input"
                        type="text"
                        placeholder="Search by clinic, city, or service..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                    />

                    <select
                        className="clinic-city-select"
                        value={selectedCity}
                        onChange={(event) =>
                            setSelectedCity(event.target.value)
                        }
                    >
                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>

                    <button
                        className="clinic-search-button"
                        type="button"
                        onClick={() => {}}
                    >
                        Search
                    </button>
                </div>
            </section>

            {/* MAP AND CLINIC LIST */}

            <div className="clinic-map-list">

                {/* MAP SECTION */}

                <section className="clinic-map-section">
                    <div className="clinic-map-heading">
                        <h2>Clinic Locations</h2>

                        <span className="clinic-map-badge">
                            Afghanistan
                        </span>
                    </div>

                    <div className="clinic-map">
                        <div className="map-park map-park-one" />
                        <div className="map-park map-park-two" />
                        <div className="map-park map-park-three" />

                        <div className="map-road map-road-one" />
                        <div className="map-road map-road-two" />
                        <div className="map-road map-road-three" />

                        <span className="map-label map-label-north">
                            NORTH
                        </span>

                        <span className="map-label map-label-kabul">
                            Kabul
                        </span>

                        <span className="map-label map-label-west">
                            Herat
                        </span>

                        <span className="map-label map-label-east">
                            Mazar-i-Sharif
                        </span>

                        <span className="map-label map-label-south">
                            Kandahar
                        </span>

                        {filteredClinics.map((clinic) => (
                            <button
                                key={clinic.id}
                                type="button"
                                className={`clinic-map-marker ${
                                    selectedClinic?.id === clinic.id
                                        ? "active-marker"
                                        : ""
                                }`}
                                style={{
                                    left: `${clinic.mapX}%`,
                                    top: `${clinic.mapY}%`,
                                }}
                                onClick={() => selectClinic(clinic)}
                                title={clinic.name}
                                aria-label={`Select ${clinic.name}`}
                            >
                                +
                            </button>
                        ))}

                        {filteredClinics.length === 0 && (
                            <div className="map-empty-message">
                                No clinics match your search.
                            </div>
                        )}
                    </div>

                    <div className="map-legend">
                        <span>Available demo clinic</span>
                        <span>Selected clinic</span>
                    </div>

                    <p className="clinic-map-note">
                        This is an illustrative map for demonstration
                        only. Markers show sample positions, not
                        verified geographic coordinates.
                    </p>
                </section>

                {/* CLINIC LIST */}

                <section className="clinic-list-section">
                    <div className="clinic-list-heading">
                        <h2>Clinics</h2>

                        <button
                            className="clinic-reset-button"
                            type="button"
                            onClick={resetFilters}
                        >
                            Reset filters
                        </button>
                    </div>

                    <div className="clinic-list">
                        {filteredClinics.map((clinic) => (
                            <button
                                type="button"
                                key={clinic.id}
                                className={`clinic-list-item ${
                                    selectedClinic?.id === clinic.id
                                        ? "selected-clinic"
                                        : ""
                                }`}
                                onClick={() => selectClinic(clinic)}
                            >
                                <span className="clinic-list-icon">
                                    ✚
                                </span>

                                <span className="clinic-list-info">
                                    <strong>{clinic.name}</strong>

                                    <span className="clinic-list-location">
                                        {clinic.city}, Afghanistan
                                    </span>

                                    <span className="clinic-list-rating">
                                        ★ {clinic.rating}{" "}
                                        <span className="clinic-demo-rating">
                                            Rating
                                        </span>
                                    </span>
                                </span>

                                <span className="clinic-list-arrow">
                                    ›
                                </span>
                            </button>
                        ))}

                        {filteredClinics.length === 0 && (
                            <p className="clinic-no-results">
                                No clinics found. Try another search
                                or city.
                            </p>
                        )}
                    </div>
                </section>
            </div>

            {/* SELECTED CLINIC DETAILS */}

            {selectedClinic && (
                <section className="clinic-detail-panel">

                    <div className="clinic-detail-header">
                        <div className="clinic-detail-icon">
                            ✚
                        </div>

                        <div>
                            <p className="clinic-detail-label">
                                Selected Clinic · Sample Listing
                            </p>

                            <h2>{selectedClinic.name}</h2>

                            <p className="clinic-detail-subtitle">
                                {selectedClinic.type}
                            </p>
                        </div>
                    </div>

                    <div className="clinic-detail-grid">

                        <div className="clinic-detail-item">
                            <h3>Location</h3>
                            <p>{selectedClinic.address}</p>
                        </div>

                        <div className="clinic-detail-item">
                            <h3>Opening Hours</h3>
                            <p>{selectedClinic.hours}</p>
                        </div>

                        <div className="clinic-detail-item">
                            <h3>Contact Information</h3>
                            <p>
                                {selectedClinic.phone}
                                {" "} 
                            </p>
                        </div>

                        <div className="clinic-detail-item">
                            <h3>Rating</h3>

                            <p>
                                ★ {selectedClinic.rating}{" "}
                                <span className="clinic-demo-rating">
                                    Illustrative rating
                                </span>
                            </p>
                        </div>

                        <div className="clinic-detail-item clinic-detail-services">
                            <h3>Services</h3>

                            <div className="clinic-service-tags">
                                {selectedClinic.services.map((service) => (
                                    <span key={service}>
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        className="clinic-contact-button"
                        type="button"
                        onClick={() => setShowContactModal(true)}
                    >
                        View Contact Information
                    </button>

                    <p className="clinic-demo-note">
                        This directory contains sample clinic
                        information and demonstration phone numbers.
                        Please verify actual clinic details before
                        making healthcare decisions.
                    </p>
                </section>
            )}

            {/* CONTACT MODAL */}

            {showContactModal && selectedClinic && (
                <div
                    className="clinic-modal-overlay"
                    onClick={() => setShowContactModal(false)}
                >
                    <div
                        className="clinic-contact-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="clinic-modal-title"
                        onClick={(event) => event.stopPropagation()}
                    >

                        <button
                            className="clinic-modal-close"
                            type="button"
                            onClick={() => setShowContactModal(false)}
                            aria-label="Close contact information"
                        >
                            ×
                        </button>

                        <div className="clinic-modal-icon">
                            ✚
                        </div>

                        <p className="clinic-modal-subtitle">
                            Clinic Information
                        </p>

                        <h2
                            className="clinic-modal-clinic-name"
                            id="clinic-modal-title"
                        >
                            {selectedClinic.name}
                        </h2>

                        <div className="clinic-modal-information">

                            {/* LOCATION */}

                            <div className="clinic-modal-row">
                                <span>📍</span>
                                <span>
                                    {selectedClinic.address}
                                </span>
                            </div>

                            {/* PHONE NUMBER */}

                            <div className="clinic-modal-row">
                                <span>☎</span>
                                <span>
                                    {selectedClinic.phone}
                                    {" "} 
                                </span>
                            </div>

                            {/* OPENING HOURS */}

                            <div className="clinic-modal-row">
                                <span>🕒</span>
                                <span>
                                    {selectedClinic.hours}
                                </span>
                            </div>
                        </div>

                        <p className="clinic-modal-note">
                            This is a sample clinic listing.
                            The phone number is for demonstration
                            only and is not a verified contact number.
                        </p>

                        <button
                            className="clinic-modal-cancel-button"
                            type="button"
                            onClick={() => setShowContactModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* FOOTER */}

            <footer className="doctor-footer">
                <p>
                    © 2026 MyPatientHUB. Made with{" "}
                    <span className="footer-heart">♥</span>{" "}
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

export default FindClinic;
