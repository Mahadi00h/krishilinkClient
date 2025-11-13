import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200",
      title: "Connect with Farmers Directly",
      subtitle: "Join India's fastest growing agricultural community",
      cta: "Get Started",
      link: "/register",
      gradient: "from-primary-900/80 via-primary-800/70 to-transparent",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200",
      title: "Fresh Produce, Fair Prices",
      subtitle: "Direct connection between farmers and consumers",
      cta: "Browse Crops",
      link: "/all-crops",
      gradient: "from-secondary-900/80 via-secondary-800/70 to-transparent",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200",
      title: "Share Your Harvest",
      subtitle: "List your crops and reach thousands of buyers",
      cta: "Add Your Crop",
      link: "/add-crop",
      gradient: "from-accent-900/80 via-accent-800/70 to-transparent",
    },
  ];

  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        loop={true}
        className="h-[600px] md:h-[700px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
                ></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-3xl">
                    <div className="space-y-6 animate-fadeInUp">
                      <div className="inline-block">
                        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/30">
                          🌾 Welcome to KrishiLink
                        </span>
                      </div>

                      <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                        {slide.title}
                      </h1>

                      <p className="text-xl md:text-2xl text-gray-100 max-w-2xl">
                        {slide.subtitle}
                      </p>

                      <div className="flex flex-wrap gap-4 pt-4">
                        <Link
                          to={slide.link}
                          className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                          {slide.cta}
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
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </Link>
                        <Link
                          to="/all-crops"
                          className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
                        >
                          Learn More
                        </Link>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-6 pt-8">
                        <div className="flex items-center gap-2 text-white">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="font-semibold">
                            Direct Connection
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
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
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <span className="font-semibold">Fair Pricing</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
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
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          </div>
                          <span className="font-semibold">Fast & Easy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Decorative Shape */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          className="w-full h-16 md:h-24 text-gray-50"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSlider;
