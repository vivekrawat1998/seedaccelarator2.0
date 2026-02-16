import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Facebook, Twitter, Youtube } from "lucide-react";
import LoginModal from "./Loginmodal";
import RegisterModal from "./Registermodel";

const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Work", href: "/ourwork" },
  { name: "SAN Member", href: "/network-members" },
  { name: "Product Evaluation", href: "/product" },
  { name: "Impact", href: "/impact" },
  { name: "Resources", href: "/resource" },
  { name: "Contact Us", href: "/contact" },
];

const SocialIcons = () => (
  <div className="flex gap-3">
    <a className="icon-circle"><Facebook size={18} /></a>
    <a className="icon-circle"><Twitter size={18} /></a>
    <a className="icon-circle"><Youtube size={18} /></a>
  </div>
);

const Navbar = () => {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const lastY = useRef(0);
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);


  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastY.current || currentY < 80);
      setAtTop(currentY < 20);
      lastY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const navStyle = atTop
    ? "bg-transparent"
    : "bg-white shadow-md ";

  const logoSrc = atTop
    ? "/hero/SAN Logo_750X750 px without caption.png"      
    : "/hero/Muliti_Colour Logo.png";              

  return (
    <>
      {/* MODALS */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onRegister={() => {
        setShowLogin(false);
        setShowRegister(true);
      }} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}

      <nav
        className={`fixed top-0 z-50 w-full  transition-all duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        } ${navStyle}`}
      >
        <div className="container  mx-auto h-full  px-2 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src={logoSrc}
              alt="SAN Logo"
              className="h-[100px] w-[100px] object-contain transition-all duration-300"
             />
          </Link>

          {/* DESKTOP MENU */}
          <ul className={`hidden md:flex gap-8 items-center font-Karla ${
            atTop ? "text-white" : "text-green-700"
          }`}>
            {navLinks.map(link => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="hover:text-green-600 transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* DESKTOP LOGIN */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setShowLogin(true)}
              className="bg-button text-black font-Karla  cursor-pointer font-semibold px-10 py-3  hover:bg-button/90 transition"
            >
              Login
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden ${atTop ? "text-white" : "text-gray-800"}`}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden absolute w-full bg-white transition-all duration-300 ${
            menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <ul className="flex flex-col p-6 gap-4 text-gray-800">
            {navLinks.map(link => (
              <li key={link.name}>
                <Link to={link.href}>{link.name}</Link>
              </li>
            ))}
            <button
              onClick={() => {
                setShowLogin(true);
                setMenuOpen(false);
              }}
              className="mt-4 bg-button text-black font-Karla  cursor-pointer font-semibold px-10 py-3  hover:bg-button/90 transition"
            >
              Login
            </button>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
