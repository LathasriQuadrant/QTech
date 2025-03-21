import React from "react";
import { Link, useLocation } from "react-router-dom";
import LogoImg from "/Qtech.png";

const MainHeader = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-md text-black py-4 px-8 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <img src={LogoImg} alt="Logo" className="h-12" />

      {/* Navigation */}
      <nav className="flex space-x-6 text-gray-700 font-medium">
        <Link
          to="/"
          className={`px-4 py-2 transition ${isActive("/") ? "text-violet-800 font-bold" : "hover:text-violet-600"}`}
        >
          Home
        </Link>
        <Link
          to="/Courses"
          className={`px-4 py-2 transition ${isActive("/Courses") ? "text-violet-800 font-bold" : "hover:text-violet-600"}`}
        >
          Courses
        </Link>
        <Link
          to="/About"
          className={`px-4 py-2 transition ${isActive("/About") ? "text-violet-800 font-bold" : "hover:text-violet-600"}`}
        >
          About
        </Link>
        <Link
          to="/Contact"
          className={`px-4 py-2 transition ${isActive("/Contact") ? "text-violet-800 font-bold" : "hover:text-violet-600"}`}
        >
          Contact
        </Link>
        <Link
          to="/Login"
          className="px-4 py-2 text-red-500 transition hover:text-red-700"
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default MainHeader;
