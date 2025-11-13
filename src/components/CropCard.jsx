import { Link } from "react-router-dom";

const CropCard = ({ crop }) => {
  return (
    <div className="group card-modern hover:scale-105 transition-all duration-300">
      {/* Image */}
      <div className="relative h-56 overflow-hidden rounded-t-2xl">
        <img
          src={crop.image}
          alt={crop.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="badge-modern bg-white/95 backdrop-blur-sm text-primary-700 shadow-lg">
            {crop.type}
          </span>
        </div>

        {/* Quick View on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/crop/${crop._id}`}
            className="px-6 py-3 bg-white text-primary-600 font-bold rounded-xl shadow-xl hover:scale-110 transition-all"
          >
            View Details
          </Link>
        </div>
      </div>

      <div className="p-6">
        {/* Crop Name */}
        <h3 className="text-2xl font-display font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
          {crop.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ₹{crop.pricePerUnit}
          </span>
          <span className="text-gray-500 font-medium">per {crop.unit}</span>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-primary-600"
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
              <p className="text-xs text-gray-500">Available</p>
              <p className="font-semibold text-gray-900">
                {crop.quantity} {crop.unit}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-accent-600"
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
              <p className="text-xs text-gray-500">Location</p>
              <p className="font-semibold text-gray-900">{crop.location}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {crop.description}
        </p>

        {/* Owner Info */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full ring-2 ring-primary-200">
              <img
                src={`https://ui-avatars.com/api/?name=${crop.owner?.ownerName}&background=10b981&color=fff`}
                alt="owner"
              />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              {crop.owner?.ownerName}
            </p>
            <p className="text-xs text-gray-500">Verified Farmer</p>
          </div>
          <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-primary-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <Link
            to={`/crop/${crop._id}`}
            className="block w-full text-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View Full Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CropCard;
