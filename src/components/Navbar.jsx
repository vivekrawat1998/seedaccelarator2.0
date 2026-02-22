import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LoginModal from "./Loginmodal";
import RegisterModal from "./Registermodel";
import { useAuth } from "../context/AuthProvider";

const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Work", href: "/ourwork" },
  { name: "SAN Members", href: "/network-members" },
  { name: "Product Evaluation", href: "/product" },
  { name: "Impact", href: "/impact" },
  { name: "Resources", href: "/resource" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {

  const location = useLocation();
  const navigate = useNavigate();

  /* ⭐ AUTH */
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const lastY = useRef(0);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* ===== SCROLL HIDE ===== */
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastY.current || currentY < 80);
      lastY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ⭐ LOGOUT HANDLER */
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* ================= MODALS ================= */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterModal onClose={() => setShowRegister(false)} />
      )}

      <nav className={`w-full z-50 transition-all duration-300 ${visible ? "translate-y-0" : "translate-y-0"}`}>

        {/* ================= LAYER 1 (YELLOW BAR) ================= */}
        <div className="bg-yellow-400 text-sm">
          <div className="container mx-auto px-4 py-1 flex justify-end gap-6 font-bold cursor-pointer font-karla">

            <Link to="/contact">Contact Us</Link>

            <Link to="/network-members#register">
              Join SAN
            </Link>

            {/* ⭐ IF LOGGED IN SHOW DASHBOARD + LOGOUT */}
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="font-bold cursor-pointer"
                >
                  Dashboard
                </button>

                <button onClick={handleLogout} className="font-bold cursor-pointer">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={() => setShowLogin(true)}>
                Login
              </button>
            )}

          </div>
        </div>

        {/* ================= LAYER 2 (LOGO BAR) ================= */}
        <div className="bg-green-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between">

            {/* LEFT LOGO */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/hero/SAN Logo_750X750 px without caption.png"
                className="h-14 w-14 object-contain"
              />
              <span className="text-4xl text-center font-bold tracking-wide font-Nunito">
                SAN
              </span>
            </Link>

            {/* RIGHT LOGO */}
            <img
              src="/logo/logo.png"
              className="h-12 object-contain"
            />
          </div>
        </div>

        {/* ================= LAYER 3 (MENU BAR) ================= */}
        <div className="bg-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

            {/* DESKTOP MENU */}
            <ul className="hidden md:flex gap-8 font-bold">
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="hover:text-yellow-300 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* MOBILE TOGGLE */}
            <button
              className="md:hidden cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

          </div>

          {/* MOBILE MENU */}
          <div className={`${menuOpen ? "max-h-[80vh]" : "max-h-0 overflow-hidden"} md:hidden bg-green-600 transition-all`}>
            <ul className="flex flex-col  gap-4 p-4">
              {navLinks.map(link => (
                <li className="" key={link.name}>
                  <Link to={link.href}>{link.name}</Link>
                </li>
              ))}

              {/* ⭐ MOBILE AUTH BUTTONS */}
              {isLoggedIn ? (
                <>
                  <button onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </button>
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <button onClick={() => setShowLogin(true)}>
                  Login
                </button>
              )}

            </ul>
          </div>

        </div>

      </nav>
    </>
  );
}