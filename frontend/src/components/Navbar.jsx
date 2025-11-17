import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className="bg-white shadow-md fixed w-full py-2">
      <div className="px-2 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <img src="../../images/logo.png" className="h-8 sm:h-11" />
          <div className="flex-col">
            <Link
              to="/dashboard"
              className="font-bold text-sky-600 text-xl sm:text-2xl"
            >
              DSA Instructor AI
            </Link>
            <p className="leading-none text-[10px] sm:text-xs text-sky-600">
              Logic is your superpower
            </p>
          </div>
        </div>
        {user ? (
          <>
            <button
              onClick={logout}
              className="flex items-center bg-red-600 text-white p-2.5 rounded-lg hover:bg-red-700 text-xs sm:text-base"
            >
              Logout <MdLogout className="text-xl ml-2" />
            </button>
          </>
        ) : (
          <Link to="/" className="text-slate-600 hover:text-slate-800">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
