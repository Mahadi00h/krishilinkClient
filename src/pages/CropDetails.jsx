import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const CropDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCropDetails();
  }, [id]);

  const fetchCropDetails = async () => {
    try {
      const res = await axios.get(
        `https://krishilink-server-blue.vercel.app/crops/${id}`
      );
      setCrop(res.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load crop details");
      setLoading(false);
    }
  };

  // ✅ PROPER OWNER CHECK - Works for ANY user
  const isOwner = user && crop && user.email === crop.owner?.ownerEmail;

  // ✅ Check if user already sent interest
  const hasInterest =
    user &&
    crop &&
    crop.interests?.some((interest) => interest.userEmail === user.email);

  const totalPrice = quantity * (crop?.pricePerUnit || 0);

  const handleSubmitInterest = async (e) => {
    e.preventDefault();

    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    if (!window.confirm("Are you sure you want to send this interest?")) {
      return;
    }

    const interestData = {
      cropId: crop._id,
      userEmail: user.email,
      userName: user.displayName,
      quantity: parseInt(quantity),
      message,
      status: "pending",
    };

    try {
      await axios.post(
        "https://krishilink-server-blue.vercel.app/interests",
        interestData
      );
      toast.success("Interest sent successfully!");
      fetchCropDetails(); // Refresh to show updated data
      setQuantity(1);
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send interest");
    }
  };

  const handleAcceptReject = async (interestId, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this interest?`)) {
      return;
    }

    try {
      await axios.put(
        "https://krishilink-server-blue.vercel.app/interests/status",
        {
          interestId,
          cropId: crop._id,
          status,
        }
      );
      toast.success(`Interest ${status} successfully!`);
      fetchCropDetails(); // Refresh to show updated data
    } catch (error) {
      toast.error("Failed to update interest");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p className="text-gray-600">Loading crop details...</p>
        </div>
      </div>
    );
  }

  if (!crop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg
            className="w-24 h-24 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-400 mb-2">
            Crop Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            The crop you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/all-crops")}
            className="btn-primary"
          >
            Browse All Crops
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Crop Information Card */}
        <div className="card-modern overflow-hidden mb-8">
          <div className="lg:flex">
            {/* Image Section */}
            <div className="lg:w-1/2">
              <div className="relative h-96 lg:h-full">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <span className="badge-modern bg-white/95 backdrop-blur-sm text-primary-700 shadow-lg text-sm font-bold px-4 py-2">
                    {crop.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="lg:w-1/2 p-8 lg:p-12">
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
                {crop.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ₹{crop.pricePerUnit}
                </span>
                <span className="text-2xl text-gray-500 font-medium">
                  per {crop.unit}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-7 h-7 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Available Quantity
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {crop.quantity} {crop.unit}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-accent-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-7 h-7 text-accent-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="text-xl font-bold text-gray-900">
                      {crop.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {crop.description}
                </p>
              </div>

              {/* Owner Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  {crop.owner?.ownerName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Listed by</p>
                  <p className="text-lg font-bold text-gray-900">
                    {crop.owner?.ownerName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {crop.owner?.ownerEmail}
                  </p>
                </div>
                {isOwner && (
                  <span className="ml-auto badge-modern bg-primary-100 text-primary-700">
                    Your Listing
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Interest Form - ONLY for NON-OWNERS */}
        {!isOwner && user && (
          <div className="card-modern p-8 lg:p-12 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-900">
                Express Your Interest
              </h2>
            </div>

            {hasInterest ? (
              <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-8 text-center">
                <svg
                  className="w-20 h-20 text-primary-600 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-2xl font-bold text-primary-900 mb-2">
                  Interest Already Sent!
                </h3>
                <p className="text-primary-700 mb-6">
                  You've already expressed interest in this crop. The farmer
                  will contact you soon.
                </p>
                <button
                  onClick={() => navigate("/my-interests")}
                  className="btn-primary"
                >
                  View My Interests
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInterest} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Quantity ({crop.unit})
                    </label>
                    <input
                      type="number"
                      className="input-modern"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      max={crop.quantity}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Max available: {crop.quantity} {crop.unit}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Total Price
                    </label>
                    <div className="input-modern bg-gray-50 flex items-center">
                      <span className="text-3xl font-bold text-primary-600">
                        ₹{totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Message to Farmer
                  </label>
                  <textarea
                    className="input-modern min-h-[120px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell the farmer why you're interested in this crop..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-lg py-4"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Send Interest
                </button>
              </form>
            )}
          </div>
        )}

        {/* Received Interests - ONLY for OWNERS */}
        {isOwner && (
          <div className="card-modern p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-secondary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-900">
                Received Interests
              </h2>
              {crop.interests && crop.interests.length > 0 && (
                <span className="ml-auto badge-modern bg-primary-100 text-primary-700 text-lg px-4 py-2">
                  {crop.interests.length}
                </span>
              )}
            </div>

            {!crop.interests || crop.interests.length === 0 ? (
              <div className="text-center py-16">
                <svg
                  className="w-24 h-24 text-gray-300 mx-auto mb-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h3 className="text-2xl font-bold text-gray-400 mb-2">
                  No Interests Yet
                </h3>
                <p className="text-gray-500">
                  When buyers express interest in your crop, they'll appear
                  here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b-2 border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                        Buyer
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                        Message
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {crop.interests.map((interest) => (
                      <tr
                        key={interest._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                              {interest.userName?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {interest.userName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {interest.userEmail}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="font-bold text-lg text-gray-900">
                            {interest.quantity} {crop.unit}
                          </span>
                        </td>
                        <td className="px-6 py-5 max-w-xs">
                          <p className="text-gray-600">{interest.message}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`badge-modern font-semibold ${
                              interest.status === "accepted"
                                ? "bg-green-100 text-green-700"
                                : interest.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {interest.status.charAt(0).toUpperCase() +
                              interest.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          {interest.status === "pending" ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  handleAcceptReject(interest._id, "accepted")
                                }
                                className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg"
                              >
                                ✓ Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleAcceptReject(interest._id, "rejected")
                                }
                                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg"
                              >
                                ✗ Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">
                              {interest.status === "accepted"
                                ? "✓ Accepted"
                                : "✗ Rejected"}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Not Logged In Message */}
        {!user && (
          <div className="card-modern p-12 text-center">
            <svg
              className="w-20 h-20 text-gray-300 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Login Required
            </h3>
            <p className="text-gray-600 mb-6">
              Please login to express interest in this crop or view your
              listings.
            </p>
            <button onClick={() => navigate("/login")} className="btn-primary">
              Login to Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropDetails;
