import { useEffect, useState } from "react";
import axios from "axios";
import CropCard from "../components/CropCard";

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCrops();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, crops]);

  const fetchCrops = async () => {
    try {
      const res = await axios.get(
        "https://krishilink-server-blue.vercel.app/crops"
      );
      setCrops(res.data);
      setFilteredCrops(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredCrops(crops);
      return;
    }

    const filtered = crops.filter(
      (crop) =>
        crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCrops(filtered);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-600 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-green-700 text-center mb-4">
            Browse All Crops
          </h1>
          <p className="text-xl text-green-700 text-center font-body mb-8">
            Discover fresh produce from farmers across India
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="form-control">
              <div className="input-group shadow-lg">
                <input
                  type="text"
                  placeholder="Search by crop name, type, or location..."
                  className="input input-bordered input-lg w-full font-body"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-square btn-lg bg-secondary-700 hover:bg-secondary-800 border-none">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crops Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : filteredCrops.length > 0 ? (
          <>
            <div className="text-center mb-8">
              <p className="text-lg font-body text-gray-600">
                Showing{" "}
                <span className="font-bold text-primary">
                  {filteredCrops.length}
                </span>{" "}
                crops
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCrops.map((crop) => (
                <CropCard key={crop._id} crop={crop} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-2xl font-display font-bold text-gray-400 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-500 font-body">
              Try searching with different keywords
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCrops;
