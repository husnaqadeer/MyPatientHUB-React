import { useState } from "react";
import "./Account.css";

function Account() {
  // Controls which forms and invoice details are visible.
  const [editingBilling, setEditingBilling] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [message, setMessage] = useState("");

  // Stores the user's billing information.
  const [billing, setBilling] = useState({
    name: "Husna Qadeer",
    email: "Name@example.com",
    phone: "",
    address: "",
    city: "",
    country: "Afghanistan",
  });

  // Stores the user's saved payment methods.
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      name: "My Bank Card",
      holder: "Full Name",
      last4: "4821",
      expiry: "08/28",
      type: "Visa",
    },
  ]);

  // Stores the information entered when adding a new card.
  const [newCard, setNewCard] = useState({
    holder: "",
    last4: "",
    expiry: "",
    type: "Visa",
  });

  // Stores invoice information displayed in the invoices table.
  const [invoices, setInvoices] = useState([
    {
      id: "INV-1001",
      date: "21 Oct 2026",
      description: "Pharmacy purchase",
      amount: 35,
      status: "Paid",
    },
    {
      id: "INV-1002",
      date: "20 Oct 2026",
      description: "Clinic appointment",
      amount: 50,
      status: "Pending",
    },
    {
      id: "INV-1003",
      date: "18 Oct 2026",
      description: "Health consultation",
      amount: 80,
      status: "Paid",
    },
  ]);

  // Stores the recent transaction history.
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: "Pharmacy purchase",
      date: "21 Oct 2026",
      amount: 35,
      status: "Completed",
    },
    {
      id: 2,
      title: "Clinic appointment",
      date: "20 Oct 2026",
      amount: 50,
      status: "Pending",
    },
    {
      id: 3,
      title: "Health consultation",
      date: "18 Oct 2026",
      amount: 80,
      status: "Completed",
    },
  ]);

  // wallet balance.
  const balance = 250;

  // Updates billing information when the user types.
  function updateBilling(event) {
    const { name, value } = event.target;

    setBilling({
      ...billing,
      [name]: value,
    });
  }

  // Saves billing changes and closes the editing form.
  function saveBilling(event) {
    event.preventDefault();
    setEditingBilling(false);
    setMessage("Billing information updated successfully.");
  }

  // Updates the new payment card form.
  function updateNewCard(event) {
    const { name, value } = event.target;

    setNewCard({
      ...newCard,
      [name]: value,
    });
  }

  // Validates and adds a new payment method.
  function addPaymentMethod(event) {
    event.preventDefault();

    if (!/^\d{4}$/.test(newCard.last4)) {
      setMessage("Please enter exactly four digits for the card number.");
      return;
    }

    const card = {
      ...newCard,
      id: Date.now(),
    };

    setPaymentMethods([...paymentMethods, card]);

    setNewCard({
      holder: "",
      last4: "",
      expiry: "",
      type: "Visa",
    });

    setShowPaymentForm(false);
    setMessage("Payment method added successfully.");
  }

  // Marks an invoice as paid and adds it to transactions.
  function payInvoice(invoice) {
    if (invoice.status === "Paid") {
      setSelectedInvoice(invoice.id);
      return;
    }

    setInvoices(
      invoices.map((item) =>
        item.id === invoice.id ? { ...item, status: "Paid" } : item,
      ),
    );

    setTransactions([
      {
        id: crypto.randomUUID(),
        title: invoice.description,
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        amount: invoice.amount,
        status: "Completed",
      },
      ...transactions,
    ]);

    setSelectedInvoice(invoice.id);
    setMessage("Payment completed!");
  }

  // Removes a saved payment method.
  function removePaymentMethod(id) {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));

    setMessage("Payment method removed.");
  }

  return (
    <main className="account-page">
      {/* PAGE HEADING */}
      <div className="account-heading">
        <div>
          <p className="account-eyebrow">ACCOUNT CENTER</p>
          <h1>My Account</h1>
          <p>Manage your wallet, payments, invoices, and billing details.</p>
        </div>

        <div className="account-avatar">
          <i className="fa-solid fa-user"></i>
        </div>
      </div>

      {/* Displays success or error messages. */}
      {message && (
        <div className="account-message" role="status">
          <span>{message}</span>
          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Dismiss message"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

      {/* Displays balance, total invoices, and pending payments. */}

      <section className="account-summary">
        <div className="summary-card balance-card">
          <div className="summary-top">
            <span>Account Balance</span>
            <i className="fa-solid fa-wallet"></i>
          </div>
          <h2>RM {balance.toFixed(2)}</h2>
          <p>Your demo wallet balance</p>
        </div>

        <div className="summary-card">
          <div className="summary-top">
            <span>Total Invoices</span>
            <i className="fa-solid fa-file-invoice"></i>
          </div>
          <h2>{invoices.length}</h2>
          <p>Invoices in your account</p>
        </div>

        <div className="summary-card">
          <div className="summary-top">
            <span>Pending Payments</span>
            <i className="fa-solid fa-clock"></i>
          </div>
          <h2>
            RM{" "}
            {invoices
              .filter((invoice) => invoice.status === "Pending")
              .reduce((total, invoice) => total + invoice.amount, 0)
              .toFixed(2)}
          </h2>
          <p>Outstanding invoice amount</p>
        </div>
      </section>

      {/* Displays the user's wallet and available balance. */}
      <section className="account-columns">
        <div className="account-panel wallet-panel">
          <div className="panel-heading">
            <div>
              <h2>My Wallet</h2>
              <p>Your account payment overview</p>
            </div>
            <i className="fa-solid fa-wallet panel-icon"></i>
          </div>

          <div className="wallet-card">
            <div className="wallet-card-top">
              <span>MyPatientHUB Wallet</span>
              <i className="fa-solid fa-heart-pulse"></i>
            </div>

            <p>Available Balance</p>
            <h3>RM {balance.toFixed(2)}</h3>

            <div className="wallet-card-bottom">
              <span>HEALTH ACCOUNT</span>
              <i className="fa-solid fa-shield-heart"></i>
            </div>
          </div>
        </div>

        {/* Displays saved cards and allows adding or removing cards. */}
        <div className="account-panel payment-panel">
          <div className="panel-heading">
            <div>
              <h2>Payment Methods</h2>
              <p>Manage your saved bank cards</p>
            </div>
            <i className="fa-solid fa-credit-card panel-icon"></i>
          </div>

          {/* Message shown when no payment methods exist. */}
          {paymentMethods.length === 0 && (
            <p className="empty-state">
              You have not added a payment method yet.
            </p>
          )}

          {/* Displays each saved payment card. */}
          {paymentMethods.map((method) => (
            <div className="saved-card" key={method.id}>
              <div className="saved-card-icon">
                <i className="fa-solid fa-credit-card"></i>
              </div>

              <div className="saved-card-info">
                <strong>{method.name || method.type}</strong>
                <span>•••• •••• •••• {method.last4}</span>
                <small>Expires {method.expiry || "Not provided"}</small>
              </div>

              {/* Removes the selected card. */}
              <button
                type="button"
                className="remove-card"
                onClick={() => removePaymentMethod(method.id)}
                aria-label={"Remove card ending in " + method.last4}
                title="Remove payment method"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}

          {/* Opens or closes the Add Payment Method form. */}
          <button
            type="button"
            className="account-primary-button add-payment-button"
            onClick={() => {
              setShowPaymentForm(!showPaymentForm);
              setMessage("");
            }}
          >
            <i className="fa-solid fa-plus"></i>
            {showPaymentForm ? "Cancel" : "Add Payment Method"}
          </button>

          {/* Form for adding a new payment card. */}
          {showPaymentForm && (
            <form className="payment-form" onSubmit={addPaymentMethod}>
              <h3>Add a bank card</h3>

              <label htmlFor="card-holder">Cardholder name</label>
              <input
                id="card-holder"
                name="holder"
                type="text"
                value={newCard.holder}
                onChange={updateNewCard}
                placeholder="Name on card"
                required
              />

              <label htmlFor="card-last4">Last four digits</label>
              <input
                id="card-last4"
                name="last4"
                type="text"
                inputMode="numeric"
                maxLength="4"
                pattern="[0-9]{4}"
                value={newCard.last4}
                onChange={updateNewCard}
                placeholder="e.g. 1234"
                required
              />

              <label htmlFor="card-expiry">Expiry date</label>
              <input
                id="card-expiry"
                name="expiry"
                type="text"
                value={newCard.expiry}
                onChange={updateNewCard}
                placeholder="MM/YY"
                required
              />

              <label htmlFor="card-type">Card type</label>
              <select
                id="card-type"
                name="type"
                value={newCard.type}
                onChange={updateNewCard}
              >
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="Other">Other</option>
              </select>

              <button type="submit" className="account-primary-button">
                Save Payment Method
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Displays invoice details, payment status, and actions. */}
      <section className="account-panel account-section">
        <div className="panel-heading">
          <div>
            <h2>Invoices</h2>
            <p>Review your billing history and invoice status</p>
          </div>
          <i className="fa-solid fa-file-invoice-dollar panel-icon"></i>
        </div>

        {/* Invoice table. */}
        <div className="account-table-wrapper">
          <table className="account-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {/* Creates one row for each invoice. */}
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.description}</td>
                  <td>RM {invoice.amount.toFixed(2)}</td>
                  <td>
                    <span
                      className={
                        invoice.status === "Paid"
                          ? "status-badge paid"
                          : "status-badge pending"
                      }
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td>
                    {/* Pay pending invoices or view paid invoice details. */}
                    <button
                      type="button"
                      className="table-action"
                      onClick={() => {
                        if (invoice.status === "Pending") {
                          payInvoice(invoice);
                        } else {
                          setSelectedInvoice(
                            selectedInvoice === invoice.id ? null : invoice.id,
                          );
                        }
                      }}
                    >
                      {invoice.status === "Pending"
                        ? "Pay now"
                        : selectedInvoice === invoice.id
                          ? "Hide details"
                          : "View details"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Shows details of the selected invoice. */}
        {selectedInvoice && (
          <div className="invoice-details">
            <strong>Invoice details</strong>
            <p>Invoice: {selectedInvoice}</p>
            <p>
              {
                invoices.find((invoice) => invoice.id === selectedInvoice)
                  ?.description
              }
            </p>
          </div>
        )}
      </section>

      {/* Displays recent purchases and payment activity. */}
      <section className="account-panel account-section">
        <div className="panel-heading">
          <div>
            <h2>Recent Transactions</h2>
            <p>See recent activity in your account</p>
          </div>
          <i className="fa-solid fa-arrow-right-arrow-left panel-icon"></i>
        </div>

        <div className="transaction-list">
          {/* Creates one row for each transaction. */}

          {transactions.map((transaction) => (
            <div className="transaction-row" key={transaction.id}>
              <div className="transaction-icon">
                <i className="fa-solid fa-receipt"></i>
              </div>

              <div className="transaction-info">
                <strong>{transaction.title}</strong>
                <span>{transaction.date}</span>
              </div>

              <div className="transaction-amount">
                <strong>- RM {transaction.amount.toFixed(2)}</strong>
                <span
                  className={
                    transaction.status === "Completed"
                      ? "transaction-completed"
                      : "transaction-pending"
                  }
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Displays and allows editing of billing contact details. */}
      <section className="account-panel account-section">
        <div className="panel-heading">
          <div>
            <h2>Billing Information</h2>
            <p>Keep your contact details up to date</p>
          </div>

          {/* Enables editing of billing information. */}
          {!editingBilling && (
            <button
              type="button"
              className="account-outline-button"
              onClick={() => {
                setEditingBilling(true);
                setMessage("");
              }}
            >
              <i className="fa-solid fa-pen"></i>
              Edit Details
            </button>
          )}
        </div>

        {/* Billing form with editable contact information. */}
        <form className="billing-form" onSubmit={saveBilling}>
          <div className="billing-field">
            <label htmlFor="billing-name">Full name</label>
            <input
              id="billing-name"
              name="name"
              type="text"
              value={billing.name}
              onChange={updateBilling}
              disabled={!editingBilling}
              required
            />
          </div>

          <div className="billing-field">
            <label htmlFor="billing-email">Email address</label>
            <input
              id="billing-email"
              name="email"
              type="email"
              value={billing.email}
              onChange={updateBilling}
              disabled={!editingBilling}
              required
            />
          </div>

          <div className="billing-field">
            <label htmlFor="billing-phone">Phone number</label>
            <input
              id="billing-phone"
              name="phone"
              type="tel"
              value={billing.phone}
              onChange={updateBilling}
              disabled={!editingBilling}
              placeholder="Enter phone number"
            />
          </div>

          <div className="billing-field">
            <label htmlFor="billing-country">Country</label>
            <input
              id="billing-country"
              name="country"
              type="text"
              value={billing.country}
              onChange={updateBilling}
              disabled={!editingBilling}
            />
          </div>

          <div className="billing-field full-width">
            <label htmlFor="billing-address">Billing address</label>
            <input
              id="billing-address"
              name="address"
              type="text"
              value={billing.address}
              onChange={updateBilling}
              disabled={!editingBilling}
              placeholder="Enter street address"
            />
          </div>

          <div className="billing-field">
            <label htmlFor="billing-city">City</label>
            <input
              id="billing-city"
              name="city"
              type="text"
              value={billing.city}
              onChange={updateBilling}
              disabled={!editingBilling}
              placeholder="Enter city"
            />
          </div>

          {/* Save and Cancel buttons shown during editing. */}
          {editingBilling && (
            <div className="billing-actions full-width">
              <button type="submit" className="account-primary-button">
                Save Changes
              </button>

              <button
                type="button"
                className="account-outline-button"
                onClick={() => {
                  setEditingBilling(false);
                  setMessage("");
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
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

export default Account;
