import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/ai-logo.jpg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuthStatus();

    const handleStorageChange = () => {
      checkAuthStatus();
    };
    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(checkAuthStatus, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("userToken");
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsLoggedIn(!!token);
    setIsAdmin(!!token && adminStatus);
  };

  const handleLogout = () => {
    // FIX 3: Clear all user-specific localStorage data to prevent enrollment leakage
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("enrolledCourses");
    localStorage.removeItem("trainerId");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsMenuOpen(false); // Close mobile menu if open
    window.location.href = "/"; // Redirect to home page
  };

  return (
    <header className="w-full z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="AI Authority Logo"
              className="w-14 h-14 rounded-full object-cover"
            />
            <span className="text-blue-700 text-2xl font-bold">
              AI Authority
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-blue-700 hover:text-blue-500 font-medium">
              Home
            </Link>

            <Link to="/about" className="text-blue-700 hover:text-blue-500 font-medium">
              About
            </Link>

            {/* Knowledge Hub */}
            <div className="relative group">
              <button className="flex items-center text-blue-700 hover:text-blue-500 font-medium">
                Knowledge Hub <ChevronDown className="ml-1 w-4 h-4" />
              </button>

              <div className="absolute left-0 top-full w-56 bg-white shadow-lg rounded-md py-2
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-all duration-150 translate-y-1 group-hover:translate-y-0 z-50">
                <Link to="/frameworks" className="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                  Frameworks
                </Link>
                <Link to="/toolkits" className="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                  Toolkits
                </Link>
                <Link to="/standards" className="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                  Standards & Regulations
                </Link>
                <Link to="/blogs" className="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                  Blogs
                </Link>
              </div>
            </div>

            {/* Services */}
            <div className="relative group">
              <Link
                to="/services"
                className="flex items-center text-blue-700 hover:text-blue-500 font-medium"
              >
                Services <ChevronDown className="ml-1 w-4 h-4" />
              </Link>

              <div className="absolute left-0 top-full w-56 bg-white shadow-lg rounded-md py-2
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-all duration-150 translate-y-1 group-hover:translate-y-0 z-50">
                <Link to="/services/training" className="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                  Training
                </Link>
                <Link to="/services/consulting" className="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                  Consulting
                </Link>
              </div>
            </div>

            {/* Certification */}
            <div className="relative group">
              <Link
                to="/certifications"
                className="flex items-center text-blue-700 hover:text-blue-500 font-medium"
              >
                Certification <ChevronDown className="ml-1 w-4 h-4" />
              </Link>

              <div className="absolute left-0 top-full w-64 bg-white shadow-lg rounded-md py-2
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-all duration-150 translate-y-1 group-hover:translate-y-0 z-50">
                <Link to="/certified-members" className="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                  Certified Members
                </Link>
                <Link to="/accredited-trainers" className="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                  Accredited Trainers
                </Link>
              </div>
            </div>

            <Link
              to="/membership"
              className="text-blue-700 hover:text-blue-500 font-medium"
            >
              Membership
            </Link>

            {/* Auth Buttons - Desktop */}
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-md hover:bg-indigo-700 font-medium transition-colors shadow-sm"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Show My Profile only for non-admin users */}
                {!isAdmin && (
                  <Link
                    to="/profile"
                    className="text-blue-700 hover:text-blue-500 font-medium"
                  >
                    My Profile
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 font-medium transition-colors shadow-sm"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Admin Dropdown */}
            {isAdmin && (
              <div className="relative group">
                <button className="flex items-center text-red-600 hover:text-red-500 font-medium">
                  Admin <ChevronDown className="ml-1 w-4 h-4" />
                </button>

                <div className="absolute right-0 top-full w-64 bg-white shadow-lg rounded-md py-2
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                transition-all duration-150 translate-y-1 group-hover:translate-y-0 z-50">

                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-50 font-semibold"
                  >
                    Dashboard
                  </Link>

                  <hr className="my-1" />

                  <Link
                    to="/admin/membership-applications"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                  >
                    Membership Applications
                  </Link>

                  <Link
                    to="/admin/certificates"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                  >
                    Upload Certificates
                  </Link>

                  <Link
                    to="/admin/manage"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                  >
                    Manage Certificates
                  </Link>

                  {/* ⭐ NEW: Manage Courses */}
                  <Link
                    to="/admin/courses"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                  >
                    Manage Courses
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg mt-2 rounded-lg p-4 space-y-4">
            <Link
              to="/"
              className="block text-blue-700 font-medium hover:text-blue-500"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="block text-blue-700 font-medium hover:text-blue-500"
            >
              About
            </Link>

            <div>
              <p className="text-blue-700 font-semibold">Knowledge Hub</p>
              <div className="ml-4 space-y-1">
                <Link to="/frameworks" className="block text-blue-600 hover:text-blue-500">
                  Frameworks
                </Link>
                <Link to="/toolkits" className="block text-blue-600 hover:text-blue-500">
                  Toolkits
                </Link>
                <Link to="/standards" className="block text-blue-600 hover:text-blue-500">
                  Standards & Regulations
                </Link>
                <Link to="/blogs" className="block text-blue-600 hover:text-blue-500">
                  Blogs
                </Link>
              </div>
            </div>

            <div>
              <Link
                to="/services"
                className="text-blue-700 font-semibold hover:text-blue-500"
              >
                Services
              </Link>
              <div className="ml-4 space-y-1">
                <Link to="/services/training" className="block text-blue-600 hover:text-blue-500">
                  Training
                </Link>
                <Link to="/services/consulting" className="block text-blue-600 hover:text-blue-500">
                  Consulting
                </Link>
              </div>
            </div>

            <div>
              <Link
                to="/certifications"
                className="text-blue-700 font-semibold hover:text-blue-500"
              >
                Certification
              </Link>
              <div className="ml-4 space-y-1">
                <Link to="/certified-members" className="block text-blue-600 hover:text-blue-500">
                  Certified Members
                </Link>
                <Link to="/accredited-trainers" className="block text-blue-600 hover:text-blue-500">
                  Accredited Trainers
                </Link>
              </div>
            </div>

            <Link
              to="/membership"
              className="block text-blue-700 font-medium hover:text-blue-500"
            >
              Membership
            </Link>

            {/* Auth Buttons - Mobile */}
            {!isLoggedIn ? (
              <div className="pt-2 border-t border-gray-200">
                <Link
                  to="/login"
                  className="block text-center bg-indigo-600 text-white px-4 py-2.5 rounded-md hover:bg-indigo-700 font-medium transition-colors shadow-sm"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-200 space-y-2">
                {/* Show My Profile only for non-admin users */}
                {!isAdmin && (
                  <Link
                    to="/profile"
                    className="block text-blue-700 font-medium hover:text-blue-500"
                  >
                    My Profile
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-center bg-red-600 text-white px-4 py-2.5 rounded-md hover:bg-red-700 font-medium transition-colors shadow-sm"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Admin Mobile Menu */}
            {isAdmin && (
              <div>
                <p className="text-red-600 font-semibold">Admin Panel</p>
                <div className="ml-4 space-y-1">
                  <Link
                    to="/admin/dashboard"
                    className="block text-blue-600 hover:text-blue-500 font-semibold"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/admin/membership-applications"
                    className="block text-blue-600 hover:text-blue-500"
                  >
                    Membership Applications
                  </Link>

                  <Link
                    to="/admin/certificates"
                    className="block text-blue-600 hover:text-blue-500"
                  >
                    Upload Certificates
                  </Link>

                  <Link
                    to="/admin/manage"
                    className="block text-blue-600 hover:text-blue-500"
                  >
                    Manage Certificates
                  </Link>

                  {/* ⭐ NEW: Mobile Manage Courses */}
                  <Link
                    to="/admin/courses"
                    className="block text-blue-600 hover:text-blue-500"
                  >
                    Manage Courses
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
