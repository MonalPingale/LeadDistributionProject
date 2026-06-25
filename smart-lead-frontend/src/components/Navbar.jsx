import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleLogout = () => {

    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <nav
      className="
      flex
      justify-between
      items-center
      px-6
      md:px-10
      py-6
      border-b
      border-white/10
      "
    >

      {/* Logo */}
      <h1 className="text-2xl font-bold text-white">
        Smart Lead
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6 text-sm md:text-base">

        <Link
          to="/home"
          className="text-gray-300 hover:text-white transition"
        >
          Home
        </Link>

        {/* ADMIN ONLY */}
        {role === "ADMIN" && (
          <>
            <Link
              to="/total-leads"
              className="text-gray-300 hover:text-white transition"
            >
              Total Leads
            </Link>

            <Link
              to="/request-service"
              className="text-gray-300 hover:text-white transition"
            >
              Create Lead
            </Link>

            <Link
              to="/all-leads"
              className="text-gray-300 hover:text-white transition"
            >
              All Leads
            </Link>

            <Link
              to="/providers"
              className="text-gray-300 hover:text-white transition"
            >
              Providers
            </Link>

            <Link
              to="/pending-leads"
              className="text-gray-300 hover:text-white transition"
            >
              Pending Leads
            </Link>

            <Link
              to="/analytics"
              className="text-gray-300 hover:text-white transition"
            >
              Analytics
            </Link>
          </>
        )}

        {/* PROVIDER ONLY */}
        {role === "PROVIDER" && (
          <Link
            to="/my-work"
            className="
            px-4
            py-2
            rounded-xl
            bg-purple-500/10
            border
            border-purple-500/20
            text-purple-400
            hover:bg-purple-500/20
            transition
            "
          >
            My Work
          </Link>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
          px-4
          py-2
          rounded-xl
          border
          border-white/10
          text-gray-300
          hover:bg-white/5
          hover:text-white
          transition
          "
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;