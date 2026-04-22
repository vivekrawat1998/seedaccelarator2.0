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

  /* LOGOUT */
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className={`w-full z-50 fixed top-0 left-0 transition-all duration-300 ${visible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      {/* ================= TOP BAR ================= */}
      <div className="bg-white text-sm">
        <div className="container mx-auto px-4 py-1 flex justify-end gap-6 font-bold font-Karla">
          <Link to="/contact">Contact Us</Link>

          <Link to="/network-members#register">Join SAN</Link>

          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="font-[18px] font-bold hover:underline"
              >
                User Profile
              </button>

              <button
                onClick={handleLogout}
                className="font-[18px] font-bold hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="font-[18px] font-bold hover:underline"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <div className="bg-green-700 text-white shadow-md">
        <div className="max-w-8xl mx-auto px-4 py-2 flex items-center justify-between">

          {/* LEFT LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo/With SAN Full White (3).png"
              className="md:h-[65px] md:w-[300px] w-[150px] object-contain"
              alt="SAN Logo"
            />

          </Link>

          {/* NAV LINKS (DESKTOP) */}
          <ul className="hidden md:flex gap-6 ">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className={`transition-all font-Karla font-[18px] duration-200 hover:text-yellow-300 ${location.pathname === link.href
                    ? "text-yellow-300"
                    : ""
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3">

            {/* RIGHT LOGO */}
            <img
              src="/logo/IRRI-CG 3 lines spell out_IRRI Logo white.png"
              className="h-[60px] w-[300px] object-contain"
              alt="Right Logo"
            />

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden p-2 rounded hover:bg-green-600 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <div
          className={`${menuOpen ? "max-h-[80vh]" : "max-h-0 overflow-hidden"
            } md:hidden bg-green-700 transition-all duration-300`}
        >
          <ul className="flex flex-col gap-4 p-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="py-2 px-4 rounded hover:bg-green-600 block transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* AUTH BUTTONS MOBILE */}
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setMenuOpen(false);
                  }}
                  className="py-3 px-6 bg-green-500 hover:bg-green-400 rounded-xl font-bold"
                >
                  User Profile
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="py-3 px-6 bg-red-500 hover:bg-red-400 rounded-xl font-bold"
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
                className="py-3 px-6 bg-yellow-400 text-green-900 hover:bg-yellow-300 rounded-xl font-bold"
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