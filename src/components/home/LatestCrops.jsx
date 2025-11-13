import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CropCard from "../CropCard";

const LatestCrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestCrops();
  }, []);

  const fetchLatestCrops = async () => {
    try {
      const res = await axios.get(
        "https://krishilink-server-blue.vercel.app/crops/latest"
      );
      setCrops(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              Fresh from Farms
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Latest Crops Available
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover fresh produce from farmers across the country. Connect
            directly and grow together.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <div className="w-12 h-1 bg-primary-500 rounded-full"></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
          </div>
        </div>

        {/* Crops Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="relative">
              <div className="spinner"></div>
              <p className="mt-4 text-gray-600">Loading fresh crops...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {crops.map((crop, index) => (
                <div
                  key={crop._id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CropCard crop={crop} />
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center animate-fadeInUp">
              <Link
                to="/all-crops"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span>View All Crops</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LatestCrops;
