import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "../styles/Payment.css";

const plans = [
  {
    id: 1,
    name: "Basic",
    priceINR: 0,
    features: [
      "Access to free study materials",
      "Community support",
      "Basic roadmaps",
    ],
  },
  {
    id: 2,
    name: "Premium",
    priceINR: 3999,
    features: [
      "All Basic features",
      "Exclusive premium materials",
      "Priority mentorship",
      "Ad-free experience",
      "Early access to new content",
    ],
  },
];

const validCoupons = {
  learnhub20: 20,
  summer15: 15,
};

const dummyPaymentHistory = [
  { id: 1, date: "2025-06-01", amount: 3199, status: "Success" },
  { id: 2, date: "2025-04-15", amount: 3999, status: "Success" },
];

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards and UPI payments.",
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel anytime from your profile settings.",
  },
  {
    question: "Is there a refund policy?",
    answer: "Refunds are available within 7 days of purchase.",
  },
];

const Payment = () => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [coupon, setCoupon] = useState("");
  const [referral, setReferral] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null); // null, loading, success, error
  const [errorMsg, setErrorMsg] = useState("");

  const applyCoupon = () => {
    const code = coupon.trim().toLowerCase();
    if (validCoupons[code]) {
      setDiscount(validCoupons[code]);
      setErrorMsg("");
      alert(`Coupon applied! ${validCoupons[code]}% discount granted.`);
    } else {
      setDiscount(0);
      setErrorMsg("Invalid coupon code.");
    }
  };

  const handlePayment = () => {
    setErrorMsg("");
    setPaymentStatus("loading");
    setTimeout(() => {
      setPaymentStatus("success");
      setStep(3);
    }, 2500);
  };

  const finalPrice = selectedPlan.priceINR * ((100 - discount) / 100);

  return (
    <div className="page payment-page">
      {paymentStatus === "success" && (
        <motion.div
          className="confetti-placeholder"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🎉 Payment Successful! Enjoy your premium access.
        </motion.div>
      )}

      <motion.h2
        className="payment-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Choose Your Plan
      </motion.h2>

      {step === 1 && (
        <>
          <motion.div
            className="plans-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                className={`plan-card ${
                  selectedPlan.id === plan.id ? "selected" : ""
                }`}
                onClick={() => setSelectedPlan(plan)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setSelectedPlan(plan);
                }}
                role="button"
                aria-pressed={selectedPlan.id === plan.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3>{plan.name}</h3>
                <p className="plan-price">
                  {plan.priceINR === 0 ? "Free" : `₹${plan.priceINR}`}
                </p>
                <ul>
                  {plan.features.map((feat, i) => (
                    <li key={i}>
                      <FaCheckCircle className="check-icon" aria-hidden="true" /> {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="coupon-referral-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label>
              Coupon Code
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                aria-label="Coupon code"
                title="Try 'learnhub20' or 'summer15'"
                className={errorMsg ? "input-error" : ""}
              />
              <button onClick={applyCoupon} aria-label="Apply coupon code">
                Apply
              </button>
            </label>

            <label>
              Referral Code (optional)
              <input
                type="text"
                placeholder="Enter referral code"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                aria-label="Referral code"
              />
            </label>
          </motion.div>

          {errorMsg && (
            <motion.p
              className="error-msg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FaTimesCircle /> {errorMsg}
            </motion.p>
          )}

          <motion.div
            className="final-price"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p>
              Final Price:{" "}
              <span className="price">
                ₹{finalPrice.toFixed(2)}{" "}
                {discount > 0 && <span className="discount">({discount}% off)</span>}
              </span>
            </p>
          </motion.div>

          <button
            className="pay-btn"
            onClick={() => setStep(2)}
            aria-label="Proceed to payment"
          >
            Proceed to Payment
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Confirm Payment</h3>
          <p>
            You are about to pay{" "}
            <strong>
              ₹{finalPrice.toFixed(2)}
            </strong>{" "}
            for the <strong>{selectedPlan.name}</strong> plan.
          </p>
          <button
            className="pay-btn"
            onClick={handlePayment}
            disabled={paymentStatus === "loading"}
            aria-busy={paymentStatus === "loading"}
          >
            {paymentStatus === "loading" ? (
              <span className="loader" aria-label="Processing payment"></span>
            ) : (
              "Pay Now"
            )}
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              setStep(1);
              setPaymentStatus(null);
            }}
          >
            Cancel
          </button>
        </>
      )}

      {/* Payment History */}
      <section className="payment-history">
        <h3>Payment History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyPaymentHistory.map(({ id, date, amount, status }) => (
              <tr key={id}>
                <td>{date}</td>
                <td>₹{amount.toFixed(2)}</td>
                <td
                  className={
                    status === "Success" ? "status-success" : "status-failed"
                  }
                >
                  {status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* FAQ Section */}
      <section className="payment-faq">
        <h3>Payment FAQs</h3>
        <div className="faq-list">
          {faqs.map(({ question, answer }, idx) => (
            <details key={idx} className="faq-item">
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Premium Benefits */}
      <section className="premium-benefits">
        <h3>Why Upgrade to Premium?</h3>
        <ul>
          <li>Access to exclusive premium study materials</li>
          <li>Priority mentorship sessions</li>
          <li>Early access to new roadmaps and features</li>
          <li>Ad-free learning experience</li>
          <li>Special discounts on workshops and events</li>
        </ul>
      </section>
    </div>
  );
};

export default Payment;