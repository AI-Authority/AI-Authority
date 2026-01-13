import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCouponStats,
  getApprovedCourses,
} from "../../services/api";

export default function AdminCouponManagement() {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    checkAdminAccess();
    loadCoupons();
    loadCourses();
  }, []);

  const checkAdminAccess = () => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      alert("Admin access required");
      navigate("/");
    }
  };

  const loadCoupons = async () => {
    try {
      setLoading(true);
      const res = await getAllCoupons();
      setCoupons(res.data.data || []);
    } catch (err) {
      console.error("Error loading coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadCourses = async () => {
    try {
      const res = await getApprovedCourses();
      setCourses(res.data.data || []);
    } catch (err) {
      console.error("Error loading courses:", err);
    }
  };

  const handleViewStats = async (coupon) => {
    try {
      const res = await getCouponStats(coupon._id);
      setStats(res.data.data);
      setSelectedCoupon(coupon);
      setShowStatsModal(true);
    } catch (err) {
      console.error("Error loading stats:", err);
      alert("Failed to load coupon statistics");
    }
  };

  const handleToggleActive = async (coupon) => {
    try {
      await updateCoupon(coupon._id, { isActive: !coupon.isActive });
      loadCoupons();
    } catch (err) {
      console.error("Error updating coupon:", err);
      alert("Failed to update coupon");
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) {
      return;
    }

    try {
      await deleteCoupon(couponId);
      loadCoupons();
    } catch (err) {
      console.error("Error deleting coupon:", err);
      alert("Failed to delete coupon");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading coupons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Coupon Management</h1>
              <p className="text-gray-600">Create and manage membership-specific discount coupons</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/admin")}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                ← Back to Dashboard
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Coupon
              </button>
            </div>
          </div>
        </div>

        {/* Coupons List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">All Coupons ({coupons.length})</h2>
          </div>

          {coupons.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No coupons yet</h3>
              <p className="mt-2 text-gray-500">Get started by creating your first coupon</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memberships</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coupons.map((coupon) => (
                    <tr key={coupon._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-bold text-blue-600">{coupon.code}</div>
                        </div>
                        <div className="text-sm text-gray-500">{coupon.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-lg font-semibold text-green-600">
                          {coupon.discountType === "percentage"
                            ? `${coupon.discountValue}%`
                            : `$${coupon.discountValue}`}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {coupon.allowedMemberships.map((membership) => (
                            <span
                              key={membership}
                              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800"
                            >
                              {membership.replace("_", " ")}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {coupon.currentUses} {coupon.maxUses ? `/ ${coupon.maxUses}` : ""}
                        </div>
                        <button
                          onClick={() => handleViewStats(coupon)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          View Stats
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {coupon.validUntil
                          ? new Date(coupon.validUntil).toLocaleDateString()
                          : "No expiry"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            coupon.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {coupon.isActive ? "Active" : "Inactive"}
                        </span>
                        {coupon.stripeCouponId && (
                          <div className="mt-1 flex items-center gap-1 text-xs text-blue-600">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Stripe
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleToggleActive(coupon)}
                            className={`px-3 py-1 rounded ${
                              coupon.isActive
                                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                          >
                            {coupon.isActive ? "Deactivate" : "Activate"}
                          </button>
                          <button
                            onClick={() => handleDeleteCoupon(coupon._id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create Coupon Modal */}
      {showCreateModal && (
        <CreateCouponModal
          courses={courses}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            loadCoupons();
          }}
        />
      )}

      {/* Stats Modal */}
      {showStatsModal && stats && (
        <StatsModal
          coupon={selectedCoupon}
          stats={stats}
          onClose={() => {
            setShowStatsModal(false);
            setStats(null);
            setSelectedCoupon(null);
          }}
        />
      )}
    </div>
  );
}

// Create Coupon Modal Component
function CreateCouponModal({ courses, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    allowedMemberships: ["all"],
    maxUses: "",
    maxUsesPerUser: 1,
    validUntil: "",
    syncWithStripe: true, // NEW: Default to syncing with Stripe
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const membershipTypes = [
    { value: "all", label: "All Memberships" },
    { value: "student_membership", label: "Student" },
    { value: "individual_membership", label: "Individual" },
    { value: "corporate_membership", label: "Corporate" },
    { value: "trainer_membership", label: "Trainer" },
    { value: "ai_architecture_membership", label: "AI Architecture" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.code || !formData.discountValue) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        code: formData.code.toUpperCase(),
        discountValue: parseFloat(formData.discountValue),
        maxUses: formData.maxUses ? parseInt(formData.maxUses) : null,
        maxUsesPerUser: parseInt(formData.maxUsesPerUser),
      };

      await createCoupon(payload);
      alert("Coupon created successfully!");
      onSuccess();
    } catch (err) {
      console.error("Error creating coupon:", err);
      setError(err.response?.data?.message || "Failed to create coupon");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleMembership = (value) => {
    if (value === "all") {
      setFormData({ ...formData, allowedMemberships: ["all"] });
    } else {
      let newMemberships = formData.allowedMemberships.filter((m) => m !== "all");
      if (newMemberships.includes(value)) {
        newMemberships = newMemberships.filter((m) => m !== value);
      } else {
        newMemberships.push(value);
      }
      if (newMemberships.length === 0) newMemberships = ["all"];
      setFormData({ ...formData, allowedMemberships: newMemberships });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Create New Coupon</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coupon Code * <span className="text-gray-500">(will be converted to uppercase)</span>
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              className="w-full p-3 border rounded-lg"
              placeholder="e.g., STUDENT25"
              required
            />
          </div>

          {/* Discount Type and Value */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type *</label>
              <select
                value={formData.discountType}
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                className="w-full p-3 border rounded-lg"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Value * {formData.discountType === "percentage" && "(0-100)"}
              </label>
              <input
                type="number"
                value={formData.discountValue}
                onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                className="w-full p-3 border rounded-lg"
                min="0"
                max={formData.discountType === "percentage" ? "100" : undefined}
                step={formData.discountType === "percentage" ? "1" : "0.01"}
                required
              />
            </div>
          </div>

          {/* Allowed Memberships */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Memberships *</label>
            <div className="grid grid-cols-2 gap-2">
              {membershipTypes.map((type) => (
                <label key={type.value} className="flex items-center p-2 border rounded hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.allowedMemberships.includes(type.value)}
                    onChange={() => toggleMembership(type.value)}
                    className="mr-2"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>

          {/* Usage Limits */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Total Uses <span className="text-gray-500">(leave empty for unlimited)</span>
              </label>
              <input
                type="number"
                value={formData.maxUses}
                onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                className="w-full p-3 border rounded-lg"
                min="1"
                placeholder="Unlimited"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Uses Per User *</label>
              <input
                type="number"
                value={formData.maxUsesPerUser}
                onChange={(e) => setFormData({ ...formData, maxUsesPerUser: e.target.value })}
                className="w-full p-3 border rounded-lg"
                min="1"
                required
              />
            </div>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date <span className="text-gray-500">(leave empty for no expiry)</span>
            </label>
            <input
              type="date"
              value={formData.validUntil}
              onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
              className="w-full p-3 border rounded-lg"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Stripe Integration */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.syncWithStripe}
                onChange={(e) => setFormData({ ...formData, syncWithStripe: e.target.checked })}
                className="mt-1 w-4 h-4 text-blue-600"
              />
              <div>
                <span className="font-medium text-gray-900">Sync with Stripe</span>
                <p className="text-sm text-gray-600 mt-1">
                  Create this coupon in Stripe and let Stripe handle the discount calculation. 
                  Recommended for accurate payment processing.
                </p>
              </div>
            </label>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {submitting ? "Creating..." : "Create Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Stats Modal Component
function StatsModal({ coupon, stats, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Coupon Statistics: {coupon.code}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-sm text-blue-600 font-medium">Total Uses</div>
              <div className="text-3xl font-bold text-blue-900">{stats.totalUses}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-sm text-green-600 font-medium">Total Discount Given</div>
              <div className="text-3xl font-bold text-green-900">${stats.totalDiscountGiven.toFixed(2)}</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="text-sm text-purple-600 font-medium">Avg Discount</div>
              <div className="text-3xl font-bold text-purple-900">
                ${stats.totalUses > 0 ? (stats.totalDiscountGiven / stats.totalUses).toFixed(2) : "0.00"}
              </div>
            </div>
          </div>

          {/* Recent Usages */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Usages</h3>
            {stats.recentUsages.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No usage history yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Course</th>
                      <th className="px-4 py-2 text-right">Original</th>
                      <th className="px-4 py-2 text-right">Discount</th>
                      <th className="px-4 py-2 text-right">Final</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {stats.recentUsages.map((usage) => (
                      <tr key={usage._id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{new Date(usage.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-2">{usage.courseId?.courseName || "N/A"}</td>
                        <td className="px-4 py-2 text-right">${usage.originalPrice.toFixed(2)}</td>
                        <td className="px-4 py-2 text-right text-green-600">
                          -${usage.discountAmount.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 text-right font-semibold">
                          ${usage.finalPrice.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
