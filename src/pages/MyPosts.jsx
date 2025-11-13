import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const MyPosts = () => {
  const { user } = useAuth();
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCrop, setEditingCrop] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchMyCrops();
  }, [user]);

  const fetchMyCrops = async () => {
    try {
      const res = await axios.get(
        `https://krishilink-server-blue.vercel.app/my-crops/${user.email}`
      );
      setCrops(res.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load crops");
      setLoading(false);
    }
  };

  const handleEdit = (crop) => {
    setEditingCrop(crop);
    setFormData(crop);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to update this crop?")) {
      return;
    }

    try {
      await axios.put(
        `https://krishilink-server-blue.vercel.app/crops/${editingCrop._id}`,
        formData
      );
      toast.success("Crop updated successfully!");
      setEditingCrop(null);
      fetchMyCrops();
      document.getElementById("edit_modal").close();
    } catch (error) {
      toast.error("Failed to update crop");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await axios.delete(
        `https://krishilink-server-blue.vercel.app/crops/${id}`
      );
      toast.success("Crop deleted successfully!");
      setCrops(crops.filter((crop) => crop._id !== id));
    } catch (error) {
      toast.error("Failed to delete crop");
    }
  };

  const openEditModal = (crop) => {
    handleEdit(crop);
    document.getElementById("edit_modal").showModal();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-secondary-800 mb-3">
            My Posts
          </h1>
          <p className="text-lg text-gray-600 font-body">
            Manage your crop listings
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Crops Table */}
        {crops.length === 0 ? (
          <div className="card bg-white shadow-xl">
            <div className="card-body text-center py-20">
              <svg
                className="w-24 h-24 mx-auto text-gray-300 mb-4"
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
              <h3 className="text-2xl font-display font-bold text-gray-400 mb-2">
                No Crops Posted Yet
              </h3>
              <p className="text-gray-500 font-body mb-6">
                Start by adding your first crop listing
              </p>
              <a href="/add-crop" className="btn btn-primary font-body">
                Add Your First Crop
              </a>
            </div>
          </div>
        ) : (
          <div className="card bg-white shadow-xl">
            <div className="card-body overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="font-display">Image</th>
                    <th className="font-display">Name</th>
                    <th className="font-display">Type</th>
                    <th className="font-display">Price/Unit</th>
                    <th className="font-display">Quantity</th>
                    <th className="font-display">Location</th>
                    <th className="font-display">Actions</th>
                  </tr>
                </thead>
                <tbody className="font-body">
                  {crops.map((crop) => (
                    <tr key={crop._id} className="hover">
                      <td>
                        <div className="avatar">
                          <div className="w-16 h-16 rounded-lg">
                            <img src={crop.image} alt={crop.name} />
                          </div>
                        </div>
                      </td>
                      <td className="font-semibold">{crop.name}</td>
                      <td>
                        <span className="badge badge-primary badge-sm">
                          {crop.type}
                        </span>
                      </td>
                      <td>
                        ₹{crop.pricePerUnit}/{crop.unit}
                      </td>
                      <td>
                        {crop.quantity} {crop.unit}
                      </td>
                      <td>{crop.location}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(crop)}
                            className="btn btn-sm btn-info"
                            title="Edit"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(crop._id, crop.name)}
                            className="btn btn-sm btn-error"
                            title="Delete"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-display font-bold text-2xl mb-6 text-secondary-800">
            Edit Crop
          </h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold font-body">
                    Crop Name
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered font-body"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold font-body">
                    Type
                  </span>
                </label>
                <select
                  className="select select-bordered font-body"
                  value={formData.type || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  required
                >
                  <option value="">Select Type</option>
                  {[
                    "Vegetable",
                    "Fruit",
                    "Grain",
                    "Pulses",
                    "Spices",
                    "Oilseeds",
                    "Other",
                  ].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold font-body">
                    Price per Unit (₹)
                  </span>
                </label>
                <input
                  type="number"
                  className="input input-bordered font-body"
                  value={formData.pricePerUnit || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerUnit: e.target.value })
                  }
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold font-body">
                    Unit
                  </span>
                </label>
                <select
                  className="select select-bordered font-body"
                  value={formData.unit || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  required
                >
                  <option value="">Select Unit</option>
                  {["kg", "ton", "quintal", "bag", "piece"].map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold font-body">
                    Quantity
                  </span>
                </label>
                <input
                  type="number"
                  className="input input-bordered font-body"
                  value={formData.quantity || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold font-body">
                    Location
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered font-body"
                  value={formData.location || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold font-body">
                  Description
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 font-body"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold font-body">
                  Image URL
                </span>
              </label>
              <input
                type="url"
                className="input input-bordered font-body"
                value={formData.image || ""}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                required
              />
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary font-body">
                Update Crop
              </button>
              <form method="dialog">
                <button type="button" className="btn font-body">
                  Cancel
                </button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyPosts;
