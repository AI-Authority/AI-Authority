import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { validateCoupon } from "../../services/api";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function PaymentPage() {
  const location = useLocation();
  const courseInfo = location.state || {};

  const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  // Get the price to charge
  const originalPrice = courseInfo.originalPrice || 999;
  const finalPrice = appliedCoupon ? appliedCoupon.finalPrice : originalPrice;
  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    if (!courseInfo.courseId) {
      setCouponError("Course information missing");
      return;
    }

    try {
      setValidatingCoupon(true);
      setCouponError("");

      const res = await validateCoupon({
        code: couponCode.toUpperCase(),
        courseId: courseInfo.courseId,
      });

      setAppliedCoupon(res.data.data);
      setCouponError("");
      alert(`Coupon applied! You saved $${res.data.data.discountAmount.toFixed(2)}`);
    } catch (err) {
      console.error("Coupon validation error:", err);
      setCouponError(err.response?.data?.message || "Invalid coupon code");
      setAppliedCoupon(null);
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const handleCheckout = async () => {
    console.log("ENV VITE_API_URL =", API_BASE);
    console.log(
      "Calling API =",
      `${API_BASE}/payment/create-checkout-session`
    );
    console.log("Final price to charge:", finalPrice);

    try {
      const token = localStorage.getItem("userToken");
      
      const res = await fetch(
        `${API_BASE}/payment/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            amount: finalPrice,
            courseId: courseInfo.courseId,
            courseName: courseInfo.courseName,
            coupon: appliedCoupon,
            originalAmount: originalPrice,
          }),
        }
      );

      const session = await res.json();

      if (session.url) {
        // ✅ Redirect to Stripe (or success for free course)
        window.location.href = session.url;
      } else {
        alert("Failed to start payment");
        console.error(session);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Payment failed. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <h1 className="text-2xl font-bold">
        {courseInfo.courseName
          ? `Enroll in ${courseInfo.courseName}`
          : "Buy Membership"}
      </h1>

      {/* Course Info */}
      {courseInfo.courseName && (
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-lg mb-4 pb-3 border-b">Course Details</h3>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Course Name</p>
              <p className="font-medium text-gray-900">{courseInfo.courseName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Course Type</p>
              <p className="font-medium text-gray-900">{courseInfo.courseType}</p>
            </div>

            {/* Coupon Input */}
            {!appliedCoupon ? (
              <div className="pt-3 border-t">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Have a coupon code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter coupon code"
                    className="flex-1 p-2 border rounded-lg text-sm"
                    disabled={validatingCoupon}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={validatingCoupon || !couponCode.trim()}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 text-sm font-medium"
                  >
                    {validatingCoupon ? "Checking..." : "Apply"}
                  </button>
                </div>
                {couponError && (
                  <p className="text-xs text-red-600 mt-1">{couponError}</p>
                )}
              </div>
            ) : (
              <div className="pt-3 border-t">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-green-800">
                        Coupon Applied: {appliedCoupon.code}
                      </p>
                      <p className="text-xs font-medium text-green-700 mt-1">
                        You save ${discountAmount.toFixed(2)} (
                        {appliedCoupon.discountType === "percentage"
                          ? `${appliedCoupon.discountValue}%`
                          : `$${appliedCoupon.discountValue}`}
                        )
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Price Summary */}
            <div className="pt-3 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Original Price:</span>
                <span className={appliedCoupon ? "line-through text-gray-500" : "font-semibold"}>
                  ${originalPrice.toFixed(2)}
                </span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount:</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                <span>Total:</span>
                <span className="text-blue-600">${finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleCheckout}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold mt-4 shadow-md"
      >
        {finalPrice === 0 ? "Enroll for Free" : "Pay with Stripe"}
      </button>

      {appliedCoupon && (
        <p className="text-xs text-gray-500 text-center max-w-md">
          By proceeding, you agree that the coupon will be marked as used and cannot be reused.
        </p>
      )}
    </div>
  );
}
