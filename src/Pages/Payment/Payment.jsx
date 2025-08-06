import React, { useEffect, useState, useMemo } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Layout from "../../components/Layout";
import "./payment.css";
import { useCart } from "../../components/DataProvider/DataProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

import visaImg from "../../assets/Images/visa2.png";
import mastercardImg from "../../assets/Images/master.png";
import amexImg from "../../assets/Images/american.png";

const backendUrl = "http://localhost:5000/api";

async function saveOrderToBackend(orderData) {
  const response = await fetch(`${backendUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) throw new Error("Failed to save order");
  return response.json();
}

function MockPaymentForm({
  totalAmount,
  cart,
  shippingDetails,
  discount,
  subTotal,
  promoCode,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const orderData = useMemo(
    () => ({
      items: cart.map((item) => ({
        productId: item.productId || item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image || null,
      })),
      shippingDetails: shippingDetails || {},
      totalAmount,
      paymentStatus: "paid",
      discount,
      subTotal,
      promoCode,
    }),
    [cart, shippingDetails, totalAmount, discount, subTotal, promoCode]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save order to backend
      await saveOrderToBackend(orderData);
      
      toast.success("¡Pago exitoso! Pedido realizado.");
      onSuccess();
    } catch (err) {
      setError(err.message);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="card-details">
        <h3>Card Details</h3>
        <div className="input-group">
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>Expiry Date</label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="input-group">
            <label>CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              required
            />
          </div>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button
        type="submit"
        disabled={loading}
        className="payment-button"
      >
        {loading ? (
          <ClipLoader size={20} color="#ffffff" />
        ) : (
          `Pay $${totalAmount.toFixed(2)}`
        )}
      </button>
    </form>
  );
}

const Payment = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();
  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubTotal(total);
  }, [cart, navigate]);

  const totalAmount = subTotal - discount;

  const handleShippingChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleShippingSave = async () => {
    setIsEditingShipping(false);
          toast.success("¡Detalles de envío guardados!");
  };

  const handleShippingCancel = () => {
    setIsEditingShipping(false);
  };

  const handlePaymentSuccess = () => {
    dispatch({ type: "CLEAR_CART" });
    navigate("/orders");
  };

  return (
    <Layout>
      <div className="payment-container">
        <div className="payment-header">
          <h1>Payment</h1>
        </div>
        
        <div className="payment-content">
          <div className="shipping-section">
            <h2>Shipping Details</h2>
            {isEditingShipping ? (
              <div className="shipping-form">
                <input
                  type="text"
                  name="address"
                  value={shippingDetails.address}
                  onChange={handleShippingChange}
                  placeholder="Address"
                />
                <input
                  type="text"
                  name="city"
                  value={shippingDetails.city}
                  onChange={handleShippingChange}
                  placeholder="City"
                />
                <input
                  type="text"
                  name="state"
                  value={shippingDetails.state}
                  onChange={handleShippingChange}
                  placeholder="State"
                />
                <input
                  type="text"
                  name="zipCode"
                  value={shippingDetails.zipCode}
                  onChange={handleShippingChange}
                  placeholder="ZIP Code"
                />
                <input
                  type="text"
                  name="country"
                  value={shippingDetails.country}
                  onChange={handleShippingChange}
                  placeholder="Country"
                />
                <div className="shipping-actions">
                  <button onClick={handleShippingSave}>Save</button>
                  <button onClick={handleShippingCancel}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="shipping-display">
                <p>{shippingDetails.address || "No address set"}</p>
                <button onClick={() => setIsEditingShipping(true)}>
                  Edit Shipping
                </button>
              </div>
            )}
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p>${item.price} x {item.quantity}</p>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="total-row">
                  <span>Discount:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="total-row total">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="payment-section">
            <h2>Payment Method</h2>
            <MockPaymentForm
              totalAmount={totalAmount}
              cart={cart}
              shippingDetails={shippingDetails}
              discount={discount}
              subTotal={subTotal}
              promoCode={promoCode}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
