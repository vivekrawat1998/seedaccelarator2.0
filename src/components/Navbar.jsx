import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
    <nav className={`w-full z-50 transition-all duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
      
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
                className="font-bold cursor-pointer hover:underline"
              >
                Dashboard
              </button>

              <button onClick={handleLogout} className="font-bold cursor-pointer hover:underline">
                Logout
              </button>
            </>
          ) : (
            /* ✅ FULL PAGE LOGIN - No Modal */
            <button 
              onClick={() => navigate("/login")} 
              className="font-bold cursor-pointer hover:underline"
            >
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
              alt="SAN Logo"
            />
            <span className="text-4xl text-center font-bold tracking-wide font-Nunito">
              SAN
            </span>
          </Link>

          {/* RIGHT LOGO */}
          <img
            src="/logo/logo.png"
            className="h-12 object-contain"
            alt="SAN"
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
                  className="hover:text-yellow-300 transition-all duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden cursor-pointer p-2 rounded hover:bg-green-700 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* MOBILE MENU */}
        <div className={`${menuOpen ? "max-h-[80vh]" : "max-h-0 overflow-hidden"} md:hidden bg-green-600 transition-all duration-300`}>
          <ul className="flex flex-col gap-4 p-4">
            {navLinks.map(link => (
              <li className="" key={link.name}>
                <Link 
                  to={link.href} 
                  className="py-2 px-4 rounded hover:bg-green-700 block transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* ⭐ MOBILE AUTH BUTTONS */}
            {isLoggedIn ? (
              <>
                <button 
                  onClick={() => {
                    navigate("/dashboard");
                    setMenuOpen(false);
                  }}
                  className="py-3 px-6 bg-green-500 hover:bg-green-400 rounded-xl font-bold mx-4 mb-2 transition"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="py-3 px-6 bg-red-500 hover:bg-red-400 rounded-xl font-bold mx-4 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="py-3 px-6 bg-yellow-400 text-green-900 hover:bg-yellow-300 rounded-xl font-bold mx-4 transition font-karla"
              >
                Login
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
