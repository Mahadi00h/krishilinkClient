import { useEffect, useState } from "react";

const Statistics = () => {
  const [counts, setCounts] = useState({
    farmers: 0,
    crops: 0,
    connections: 0,
    revenue: 0,
  });

  useEffect(() => {
    // Animate counters
    const interval = setInterval(() => {
      setCounts((prev) => ({
        farmers: prev.farmers < 5000 ? prev.farmers + 100 : 5000,
        crops: prev.crops < 15000 ? prev.crops + 300 : 15000,
        connections: prev.connections < 8000 ? prev.connections + 150 : 8000,
        revenue: prev.revenue < 50 ? prev.revenue + 1 : 50,
      }));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Active Farmers",
      value: counts.farmers.toLocaleString(),
      icon: (
        <svg
          className="w-10 h-10"
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
      ),
      suffix: "+",
      color: "primary",
      bgColor: "bg-primary-500",
      lightBg: "bg-primary-50",
    },
    {
      label: "Crops Listed",
      value: counts.crops.toLocaleString(),
      icon: (
        <svg
          className="w-10 h-10"
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
      ),
      suffix: "+",
      color: "secondary",
      bgColor: "bg-secondary-500",
      lightBg: "bg-secondary-50",
    },
    {
      label: "Successful Connections",
      value: counts.connections.toLocaleString(),
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      suffix: "+",
      color: "accent",
      bgColor: "bg-accent-500",
      lightBg: "bg-accent-50",
    },
    {
      label: "Crore Revenue Generated",
      value: counts.revenue,
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      suffix: "+ Cr",
      color: "primary",
      bgColor: "bg-gradient-to-br from-primary-600 to-primary-700",
      lightBg: "bg-primary-50",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute inset-0 bg-pattern opacity-5"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary-500/20 backdrop-blur-sm text-primary-300 rounded-full text-sm font-semibold border border-primary-500/30">
              🎯 Our Impact
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Empowering India's Agriculture
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Connecting thousands of farmers and buyers, creating opportunities
            and transforming lives
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                {/* Gradient Overlay on Hover */}
                <div
                  className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 ${stat.lightBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className={`text-${stat.color}-600`}>{stat.icon}</div>
                  </div>
                </div>

                {/* Value */}
                <div className="relative mb-2">
                  <div className="text-5xl md:text-6xl font-display font-bold text-white mb-1">
                    {stat.value}
                    <span className="text-primary-400">{stat.suffix}</span>
                  </div>
                </div>

                {/* Label */}
                <div className="relative">
                  <p className="text-gray-300 font-medium text-base">
                    {stat.label}
                  </p>
                </div>

                {/* Decorative Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fadeInUp">
          <p className="text-gray-300 mb-6 text-lg">
            Join thousands of farmers and buyers transforming Indian agriculture
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get Started Today
            </a>
            <a
              href="/all-crops"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Browse Crops
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
