import { useState } from "react";
import "./FindPharmacy.css";

// SAMPLE MEDICINE DATA
const medicines = [
  {
    id: "8234",
    name: "Esomeprazole",
    price: 5,
    category: "Tablet",
    company: "Caring Pharmacy",
    logo: "/pic 1.jpg",
    description: "Medicine listing from Caring Pharmacy.",
  },
  {
    id: "872",
    name: "Paracetamol",
    price: 9,
    category: "Tablet",
    company: "OK Pharmacy",
    logo: "/pic 2.jpg",
    description: "Medicine listing from OK Pharmacy.",
  },
  {
    id: "0134",
    name: "Amoxicillin",
    price: 7,
    category: "Capsule",
    company: "Hilton Medical",
    logo: "/pic 3.jpg",
    description: "Medicine listing from Hilton Medical.",
  },
  {
    id: "113",
    name: "Omeprazole",
    price: 9,
    category: "Tablet",
    company: "Hinucion Pharma",
    logo: "/pic 4.jpg",
    description: "Medicine listing from Hinucion Pharma.",
  },
  {
    id: "629",
    name: "Cetirizine",
    price: 20,
    category: "Tablet",
    company: "Hamza Medical Pharmacy",
    logo: "/pic 7.jpg",
    description: "Medicine listing from Hamza Medical Pharmacy.",
  },
  {
    id: "634729",
    name: "Vitamin C",
    price: 20,
    category: "Tablet",
    company: "Food Panda",
    logo: "/pic 6.jpg",
    description: "Medicine listing from Food Panda.",
  },
];

export default function FindPharmacy() {
  // SEARCH AND FILTER STATES
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [savedIds, setSavedIds] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // FILTER AND SORT MEDICINES
  const filteredMedicines = medicines
    .filter((medicine) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        medicine.name.toLowerCase().includes(searchText) ||
        medicine.company.toLowerCase().includes(searchText) ||
        medicine.category.toLowerCase().includes(searchText) ||
        medicine.id.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || medicine.category === category;

      const matchesSaved = !showSaved || savedIds.includes(medicine.id);

      return matchesSearch && matchesCategory && matchesSaved;
    })
    .sort((a, b) => {
      if (sortOrder === "low") {
        return a.price - b.price;
      }

      if (sortOrder === "high") {
        return b.price - a.price;
      }

      return 0;
    });

  // SAVE OR UNSAVE A MEDICINE
  function toggleSaved(id) {
    setSavedIds((previousIds) =>
      previousIds.includes(id)
        ? previousIds.filter((savedId) => savedId !== id)
        : [...previousIds, id],
    );
  }

  // RESET SEARCH AND FILTERS
  function clearFilters() {
    setSearch("");
    setCategory("All");
    setSortOrder("default");
    setShowSaved(false);
  }

  return (
    <div className="pharmacy-page">
      {/* PHARMACY PAGE HEADER */}
      <section className="pharmacy-hero">
        <div className="hero-text">
          <span className="pharmacy-label">MYPATIENTHUB HEALTHCARE</span>

          <h1>Find a Pharmacy</h1>

          <p>
            Search for medicines, compare listed prices, and keep track of the
            options you are interested in.
          </p>
        </div>

        <div className="hero-icon" aria-hidden="true">
          <span>✚</span>
        </div>

        {/* SEARCH MEDICINES AND PHARMACIES */}
        <div className="pharmacy-search">
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>

          <input
            type="search"
            placeholder="Search medicine, pharmacy, or ID..."
            aria-label="Search medicines and pharmacies"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearch("")}
            >
              Clear
            </button>
          )}
        </div>

        <p className="search-hint">
          Try Esomeprazole, Paracetamol, or a pharmacy name.
        </p>
      </section>

      {/* MEDICINE STATISTICS */}
      <section className="pharmacy-stats">
        <div className="stat-card">
          <span className="stat-icon">✚</span>

          <div>
            <p>Listed medicines</p>
            <h2>{medicines.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon saved-stat-icon">♡</span>

          <div>
            <p>Saved medicines</p>
            <h2>{savedIds.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon results-stat-icon">⌕</span>

          <div>
            <p>Matching results</p>
            <h2>{filteredMedicines.length}</h2>
          </div>
        </div>
      </section>

      {/* MEDICINE DIRECTORY */}
      <section className="medicine-section">
        <div className="section-heading">
          <div>
            <span className="pharmacy-label">MEDICINE DIRECTORY</span>

            <h2>Compare Medicine Listings</h2>

            <p>
              Filter your results and compare the prices shown by each provider.
            </p>
          </div>

          {/* TOGGLE SAVED MEDICINES */}
          <button
            type="button"
            className={`saved-toggle ${showSaved ? "saved-toggle-active" : ""}`}
            onClick={() => setShowSaved(!showSaved)}
          >
            ♡ {showSaved ? "All medicines" : "Saved medicines"}
          </button>
        </div>

        {/* CATEGORY AND PRICE FILTERS */}
        <div className="medicine-filters">
          <div className="category-filters">
            {["All", "Tablet", "Capsule"].map((item) => (
              <button
                type="button"
                key={item}
                className={`filter-button ${
                  category === item ? "filter-active" : ""
                }`}
                onClick={() => setCategory(item)}
              >
                {item === "All" ? "All medicines" : item + "s"}
              </button>
            ))}
          </div>

          <label className="sort-control">
            <span>Sort by:</span>

            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
            >
              <option value="default">Default order</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </div>

        {/* DISPLAY MEDICINE LISTINGS */}
        <div className="medicine-list">
          {filteredMedicines.map((medicine) => (
            <article className="medicine-item" key={medicine.id}>
              <div className="medicine-logo">
                <img src={medicine.logo} alt="" />
              </div>

              <div className="medicine-information">
                <h3>{medicine.name}</h3>

                <p className="medicine-provider">{medicine.company}</p>

                <div className="medicine-tags">
                  <span>{medicine.category}</span>
                  <span>ID: {medicine.id}</span>
                </div>
              </div>

              <div className="medicine-price">
                <span>Listed price</span>
                <strong>{medicine.price} RM</strong>
              </div>

              {/* MEDICINE ACTION BUTTONS */}
              <div className="medicine-actions">
                <button
                  type="button"
                  className="details-button"
                  onClick={() =>
                    setSelectedMedicine(
                      selectedMedicine === medicine.id ? null : medicine.id,
                    )
                  }
                >
                  {selectedMedicine === medicine.id
                    ? "Hide details"
                    : "Details"}
                </button>

                <button
                  type="button"
                  className={`save-button ${
                    savedIds.includes(medicine.id) ? "is-saved" : ""
                  }`}
                  onClick={() => toggleSaved(medicine.id)}
                  aria-pressed={savedIds.includes(medicine.id)}
                >
                  {savedIds.includes(medicine.id) ? "♥ Saved" : "♡ Save"}
                </button>
              </div>

              {/* EXPAND MEDICINE DETAILS */}
              {selectedMedicine === medicine.id && (
                <div className="medicine-details">
                  <h4>Listing details</h4>

                  <p>{medicine.description}</p>

                  <p>
                    <strong>Provider:</strong> {medicine.company}
                  </p>

                  <p>
                    <strong>Listed price:</strong> {medicine.price} RM
                  </p>

                  <p className="demo-notice">
                    This is sample data. Contact the provider to confirm stock,
                    current pricing, and availability before purchasing.
                  </p>
                </div>
              )}
            </article>
          ))}

          {/* SHOW MESSAGE WHEN NO MEDICINES MATCH */}
          {filteredMedicines.length === 0 && (
            <div className="no-medicines">
              <span>⌕</span>
              <h3>No matching medicines found</h3>

              <p>Try another search or change your filters.</p>

              <button
                type="button"
                className="reset-button"
                onClick={clearFilters}
              >
                Clear search and filters
              </button>
            </div>
          )}
        </div>

        {/* MEDICINE LIST SUMMARY */}
        <div className="medicine-list-footer">
          <span>
            Showing {filteredMedicines.length} of {medicines.length} listings
          </span>

          {(search ||
            category !== "All" ||
            sortOrder !== "default" ||
            showSaved) && (
            <button type="button" onClick={clearFilters}>
              Reset filters
            </button>
          )}
        </div>
      </section>

      {/* MEDICAL DISCLAIMER */}
      <div className="pharmacy-disclaimer">
        <span>ⓘ</span>

        <p>
          <strong>Important:</strong> These are demonstration listings, not
          verified pharmacy inventory. Prices, availability, and provider
          details should be confirmed directly. This directory does not replace
          advice from a qualified healthcare professional.
        </p>
      </div>

      {/* PAGE FOOTER */}
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
