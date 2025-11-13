import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const MyInterests = () => {
  const { user } = useAuth();
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recent"); // recent, accepted, rejected, pending

  useEffect(() => {
    fetchMyInterests();
  }, [user]);

  const fetchMyInterests = async () => {
    try {
      const res = await axios.get(
        `https://krishilink-server-blue.vercel.app/my-interests/${user.email}`
      );
      setInterests(res.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load interests");
      setLoading(false);
    }
  };

  // Sorting logic - CHALLENGE
  const sortedInterests = [...interests].sort((a, b) => {
    switch (sortBy) {
      case "accepted":
        return a.status === "accepted" ? -1 : 1;
      case "rejected":
        return a.status === "rejected" ? -1 : 1;
      case "pending":
        return a.status === "pending" ? -1 : 1;
      case "recent":
      default:
        return new Date(b._id) - new Date(a._id);
    }
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return <span className="badge badge-success font-body">Accepted</span>;
      case "rejected":
        return <span className="badge badge-error font-body">Rejected</span>;
      case "pending":
      default:
        return <span className="badge badge-warning font-body">Pending</span>;
    }
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
            My Interests
          </h1>
          <p className="text-lg text-gray-600 font-body">
            Track all your crop interest requests
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Sorting Controls - CHALLENGE */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-body text-gray-600">
            Total Interests:{" "}
            <span className="font-bold text-primary">{interests.length}</span>
          </div>
          <div className="form-control">
            <select
              className="select select-bordered select-sm font-body"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Sort by: Most Recent</option>
              <option value="accepted">Sort by: Accepted</option>
              <option value="rejected">Sort by: Rejected</option>
              <option value="pending">Sort by: Pending</option>
            </select>
          </div>
        </div>

        {/* Interests Table */}
        {interests.length === 0 ? (
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h3 className="text-2xl font-display font-bold text-gray-400 mb-2">
                No Interests Sent Yet
              </h3>
              <p className="text-gray-500 font-body mb-6">
                Browse crops and send interest requests to farmers
              </p>
              <a href="/all-crops" className="btn btn-primary font-body">
                Browse Crops
              </a>
            </div>
          </div>
        ) : (
          <div className="card bg-white shadow-xl">
            <div className="card-body overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="font-display">Crop Name</th>
                    <th className="font-display">Owner</th>
                    <th className="font-display">Quantity</th>
                    <th className="font-display">Message</th>
                    <th className="font-display">Status</th>
                    <th className="font-display">Action</th>
                  </tr>
                </thead>
                <tbody className="font-body">
                  {sortedInterests.map((interest) => (
                    <tr key={interest._id} className="hover">
                      <td>
                        {/* OPTIONAL: Clickable crop name - navigates to details page */}
                        <Link
                          to={`/crop/${interest.cropId}`}
                          className="font-semibold text-primary hover:underline"
                        >
                          {interest.cropName}
                        </Link>
                      </td>
                      <td>{interest.cropOwner}</td>
                      <td>{interest.quantity}</td>
                      <td className="max-w-xs truncate">{interest.message}</td>
                      <td>{getStatusBadge(interest.status)}</td>
                      <td>
                        <Link
                          to={`/crop/${interest.cropId}`}
                          className="btn btn-sm btn-ghost text-primary"
                        >
                          View Crop
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInterests;
