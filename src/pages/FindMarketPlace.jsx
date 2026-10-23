
import { useState } from "react";
import "./FindMarketPlace.css";

const products = [
    {
        id: 1,
        name: "Digital Thermometer",
        category: "Monitoring",
        price: 12,
        company: "CarePlus Pharmacy",
        image: "/thermometer.jpg",
        stock: "In Stock",
        description: "A digital thermometer for checking body temperature.",
    },
    {
        id: 2,
        name: "First Aid Kit",
        category: "First Aid",
        price: 25,
        company: "HealthCare Store",
        image: "/first-aid-kit.jpg",
        stock: "In Stock",
        description: "A handy kit with basic first-aid supplies.",
    },
    {
        id: 3,
        name: "Medical Face Masks",
        category: "Hygiene",
        price: 8,
        company: "CarePlus Pharmacy",
        image: "/face-masks.jpg",
        stock: "In Stock",
        description: "Disposable face masks for everyday use.",
    },
    {
        id: 4,
        name: "Blood Pressure Monitor",
        category: "Monitoring",
        price: 65,
        company: "MedSupply",
        image: "/blood-pressure-monitor.jpg",
        stock: "Low Stock",
        description: "A home-use device for measuring blood pressure.",
    },
    {
        id: 5,
        name: "Elastic Bandage",
        category: "First Aid",
        price: 10,
        company: "HealthCare Store",
        image: "/bandage.jpg",
        stock: "In Stock",
        description: "An elastic bandage for basic first-aid supplies.",
    },
    {
        id: 6,
        name: "Hand Sanitizer",
        category: "Hygiene",
        price: 7,
        company: "CarePlus Pharmacy",
        image: "/hand-sanitizer.jpg",
        stock: "In Stock",
        description: "Hand sanitizer for everyday hand hygiene.",
    },
];

function FindMarketPlace() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("default");
    const [cart, setCart] = useState([]);
    const [tableSearch, setTableSearch] = useState("");

    function addToCart(product) {
        setCart((previousCart) => [...previousCart, product]);
    }

    function removeFromCart(productId) {
        setCart((previousCart) => {
            const index = previousCart.findIndex(
                (product) => product.id === productId
            );

            if (index === -1) {
                return previousCart;
            }

            return previousCart.filter(
                (_, itemIndex) => itemIndex !== index
            );
        });
    }

    let filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.company.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            category === "All" || product.category === category;

        return matchesSearch && matchesCategory;
    });

    if (sort === "low-to-high") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => a.price - b.price
        );
    } else if (sort === "high-to-low") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => b.price - a.price
        );
    }

    const tableProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(tableSearch.toLowerCase())
    );

    const cartTotal = cart.reduce(
        (total, product) => total + product.price,
        0
    );

    return (
        <div className="marketplace-page">
            <section className="marketplace-hero">
                <div>
                    <span className="marketplace-label">
                        MYPATIENTHUB MARKETPLACE
                    </span>

                    <h1>Your health essentials, all in one place</h1>

                    <p>
                        Explore medical supplies and healthcare essentials
                        from our sample marketplace.
                    </p>
                </div>

                <div className="cart-summary">
                    <span className="cart-icon">🛒</span>
                    <div>
                        <strong>My Cart ({cart.length})</strong>
                        <p>RM {cartTotal.toFixed(2)} total</p>
                    </div>
                </div>
            </section>

            <section className="marketplace-card">
                <div className="marketplace-section-heading">
                    <div>
                        <h2>Medical Products</h2>
                        <p>Browse our healthcare essentials.</p>
                    </div>

                    <span className="product-count">
                        {filteredProducts.length} products
                    </span>
                </div>

                <div className="marketplace-filters">
                    <input
                        type="text"
                        placeholder="Search products or pharmacies..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        aria-label="Search products or pharmacies"
                    />

                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        aria-label="Filter by category"
                    >
                        <option value="All">All Categories</option>
                        <option value="Monitoring">Monitoring</option>
                        <option value="First Aid">First Aid</option>
                        <option value="Hygiene">Hygiene</option>
                    </select>

                    <select
                        value={sort}
                        onChange={(event) => setSort(event.target.value)}
                        aria-label="Sort products by price"
                    >
                        <option value="default">Sort by Price</option>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                    </select>
                </div>

                <div className="products-container">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <article
                                className="product-card"
                                key={product.id}
                            >
                                <div className="product-image-container">
                                    <img
                                        className="medical-product-image"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                    <span
                                        className={`stock-badge ${
                                            product.stock === "Low Stock"
                                                ? "low-stock"
                                                : ""
                                        }`}
                                    >
                                        {product.stock}
                                    </span>
                                </div>

                                <div className="product-card-content">
                                    <span className="product-category">
                                        {product.category}
                                    </span>

                                    <h3>{product.name}</h3>

                                    <p className="product-description">
                                        {product.description}
                                    </p>

                                    <p className="product-company">
                                        Sold by {product.company}
                                    </p>

                                    <div className="product-card-bottom">
                                        <strong className="product-price">
                                            RM {product.price.toFixed(2)}
                                        </strong>

                                        <button
                                            className="buy-button"
                                            type="button"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="no-products">
                            <h3>No products found</h3>
                            <p>
                                Try another search or choose a different
                                category.
                            </p>

                            <button
                                type="button"
                                className="reset-button"
                                onClick={() => {
                                    setSearch("");
                                    setCategory("All");
                                    setSort("default");
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <section className="results-section">
                <div className="marketplace-section-heading">
                    <div>
                        <h2>Product Directory</h2>
                        <p>
                            View product prices, categories, and sellers.
                        </p>
                    </div>
                </div>

                <div className="table-top">
                    <label className="table-search-label">
                        Search products
                        <input
                            className="table-search"
                            type="text"
                            placeholder="Enter product name..."
                            value={tableSearch}
                            onChange={(event) =>
                                setTableSearch(event.target.value)
                            }
                        />
                    </label>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>PRODUCT</th>
                                <th>CATEGORY</th>
                                <th>SELLER</th>
                                <th>AVAILABILITY</th>
                                <th>PRICE</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tableProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="name-cell">
                                            <img
                                                src={product.image}
                                                alt=""
                                            />
                                            <span>{product.name}</span>
                                        </div>
                                    </td>
                                    <td>{product.category}</td>
                                    <td>{product.company}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        RM {product.price.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {tableProducts.length === 0 && (
                        <p className="empty-table">
                            No matching products found.
                        </p>
                    )}
                </div>

                <p className="table-footer">
                    Showing {tableProducts.length} of {filteredProducts.length}{" "}
                    matching products
                </p>
            </section>

            {cart.length > 0 && (
                <section className="cart-details">
                    <div>
                        <h2>Your Cart</h2>
                        <p>
                            {cart.length} item(s) · Total RM{" "}
                            {cartTotal.toFixed(2)}
                        </p>
                    </div>

                    <ul>
                        {cart.map((product, index) => (
                            <li key={`${product.id}-${index}`}>
                                <span>
                                    {product.name} — RM{" "}
                                    {product.price.toFixed(2)}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => removeFromCart(product.id)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <footer className="doctor-footer">
                <p>
                    © 2026 MyPatientHUB. Made with{" "}
                    <span className="footer-heart">♥</span> for better
                    healthcare.
                </p>

                <div className="doctor-footer-links">
                    <span>MyPatientHUB</span>
                    <span>Healthcare Directory Demo</span>
                </div>
            </footer>
        </div>
    );
}

export default FindMarketPlace;
