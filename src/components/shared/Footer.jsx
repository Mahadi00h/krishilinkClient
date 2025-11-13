import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-5"></div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl text-green-700 font-display font-bold">
                  KrishiLink
                </h2>
                <p className="text-sm text-gray-400">Farm to Future</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting farmers, traders, and consumers in one digital
              agricultural ecosystem. Growing together, harvesting success.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-gradient-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover-glow"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-gradient-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover-glow"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-gradient-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover-glow"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-gradient-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover-glow"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-gradient-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover-glow"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2 text-green-700">
              <div className="w-1 h-6 bg-gradient-primary rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:w-3 transition-all"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-crops"
                  className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:w-3 transition-all"></span>
                  Browse Crops
                </Link>
              </li>
              <li>
                <Link
                  to="/add-crop"
                  className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:w-3 transition-all"></span>
                  Post Crops
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:w-3 transition-all"></span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2 text-green-700">
              <div className="w-1 h-6 bg-gradient-accent rounded-full"></div>
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-accent-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-accent-500 rounded-full group-hover:w-3 transition-all"></span>
                  Farming Tips
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-accent-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-accent-500 rounded-full group-hover:w-3 transition-all"></span>
                  Market Prices
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-accent-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-accent-500 rounded-full group-hover:w-3 transition-all"></span>
                  Weather Forecast
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-accent-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-accent-500 rounded-full group-hover:w-3 transition-all"></span>
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2 text-green-700">
              <div className="w-1 h-6 bg-gradient-secondary rounded-full"></div>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-white">ht.mahadi@gmail.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-accent-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-white">+8801401726502</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 KrishiLink. All rights reserved. Made with 💚 for farmers.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
