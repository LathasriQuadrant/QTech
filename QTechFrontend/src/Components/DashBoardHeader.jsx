import React, { useContext, useState } from "react";
import { Avatar, Tooltip } from "@mui/material";
import AuthContext from "./AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoImg from "/Qtech.png";

const DashBoardHeader = () => {
  const { logout, role, mail } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const firstLetter = mail ? mail.charAt(0).toUpperCase() : "?";

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    window.dispatchEvent(new CustomEvent("search", { detail: { searchTerm: e.target.value }, bubbles: true }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !window.location.pathname.includes("/User/courses")) {
      navigate("/User/courses");
      window.dispatchEvent(new CustomEvent("search", { detail: { searchTerm }, bubbles: true }));
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    // bg-white shadow-md text-black py-4 px-8 flex items-center justify-between sticky top-0 z-50
    <header className="bg-white shadow-md text-black py-4 px-8 flex items-center justify-between fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <img src={LogoImg} alt="Logo" className="h-12" />

      {/* Navigation */}
      <nav className="flex space-x-6 text-gray-700 font-medium">
        {(role === "Admin" || role === "Manager") && (
          <Link
            to={role === "Admin" ? "/Admin/Home" : "/Manager/Home"}
            className={`px-4 py-2 transition ${
              isActive(role === "Admin" ? "/Admin/Home" : "/Manager/Home") ? "text-violet-800 font-bold" : "hover:text-violet-600"
            }`}
          >
            Home
          </Link>
        )}
        <Link
          to="/User/courses"
          className={`px-4 py-2 transition ${isActive("/User/courses") ? "text-violet-800 font-bold" : "hover:text-violet-600"}`}
        >
          Courses
        </Link>
        <Link
          to="/User/about"
          className={`px-4 py-2 transition ${isActive("/User/about") ? "text-violet-800 font-bold" : "hover:text-violet-600"}`}
        >
          About
        </Link>
        <Link
          to="/User/contact"
          className={`px-4 py-2 transition ${isActive("/User/contact") ? "text-violet-800 font-bold" : "hover:text-violet-600"}`}
        >
          Contact
        </Link>
        <button onClick={logout} className="px-4 py-2 text-red-500 transition hover:text-red-700">
          Logout
        </button>
      </nav>

      {/* User Avatar with Enlarged Tooltip */}
      <Tooltip
        title={
          <div className="p-3 text-lg">
            <p className="font-semibold">{mail}</p>
            <p className="text-white font-bold">Role: {role}</p>
          </div>
        }
        arrow
      >
        <Avatar className="bg-violet-600 text-white cursor-pointer hover:shadow-md transition text-xl">
          {firstLetter}
        </Avatar>
      </Tooltip>
    </header>
  );
};

export default DashBoardHeader;
