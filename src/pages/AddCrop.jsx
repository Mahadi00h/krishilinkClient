import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddCrop = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    pricePerUnit: "",
    unit: "",
    quantity: "",
    description: "",
    location: "",
    image: "",
  });

  const cropTypes = [
    "Vegetable",
    "Fruit",
    "Grain",
    "Pulses",
    "Spices",
    "Oilseeds",
    "Other",
  ];
  const units = ["kg", "ton", "quintal", "bag", "piece"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cropData = {
      ...formData,
      pricePerUnit: parseFloat(formData.pricePerUnit),
      quantity: parseFloat(formData.quantity),
      owner: {
        ownerEmail: user.email,
        ownerName: user.displayName,
      },
    };

    try {
      await axios.post(
        "https://krishilink-server-blue.vercel.app/crops",
        cropData
      );
      toast.success("Crop added successfully!");
      navigate("/my-posts");
    } catch (error) {
      toast.error("Failed to add crop");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-secondary-800 mb-3">
            Add Your Crop
          </h1>
          <p className="text-lg text-gray-600 font-body">
            Share your harvest with the community
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Form Card */}
        <div className="max-w-3xl mx-auto">
          <div className="card bg-white shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Name & Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold font-body">
                        Crop Name *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g., Tomato"
                      className="input input-bordered font-body"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold font-body">
                        Crop Type *
                      </span>
                    </label>
                    <select
                      name="type"
                      className="select select-bordered font-body"
                      value={formData.type}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Type</option>
                      {cropTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 2: Price & Unit */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold font-body">
                        Price per Unit (₹) *
                      </span>
                    </label>
                    <input
                      type="number"
                      name="pricePerUnit"
                      placeholder="e.g., 50"
                      className="input input-bordered font-body"
                      value={formData.pricePerUnit}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold font-body">
                        Unit *
                      </span>
                    </label>
                    <select
                      name="unit"
                      className="select select-bordered font-body"
                      value={formData.unit}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Unit</option>
                      {units.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Quantity & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold font-body">
                        Available Quantity *
                      </span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      placeholder="e.g., 500"
                      className="input input-bordered font-body"
                      value={formData.quantity}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold font-body">
                        Location *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g., Nashik, Maharashtra"
                      className="input input-bordered font-body"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Row 4: Description */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold font-body">
                      Description *
                    </span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Describe your crop, quality, organic/conventional, etc."
                    className="textarea textarea-bordered h-24 font-body"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* Row 5: Image URL */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold font-body">
                      Image URL *
                    </span>
                  </label>
                  <input
                    type="url"
                    name="image"
                    placeholder="https://example.com/crop-image.jpg"
                    className="input input-bordered font-body"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                  {formData.image && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2 font-body">
                        Preview:
                      </p>
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="form-control mt-8">
                  <button
                    type="submit"
                    className={`btn btn-primary btn-lg font-body ${
                      loading ? "loading" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Adding Crop..." : "Add Crop"}
                    {!loading && (
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCrop;
