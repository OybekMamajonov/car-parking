import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBookmark, FaCalendarAlt, FaUser } from "react-icons/fa";
import "../styles/BottomNav.css";

const BottomNav = () => {
    const location = useLocation();

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-[1000] flex justify-around items-center py-3 border-t-2 border-blue-200 backdrop-blur-md">
            <Link
                to="/home"
                className={`nav-item ${
                    location.pathname === "/home" ? "nav-item-active" : "nav-item-inactive"
                }`}
            >
                <FaHome size={24} />
                <span className="text-sm font-medium mt-1">Home</span>
            </Link>
            <Link
                to="/saved"
                className={`nav-item ${
                    location.pathname === "/saved" ? "nav-item-active" : "nav-item-inactive"
                }`}
            >
                <FaBookmark size={24} />
                <span className="text-sm font-medium mt-1">Saved</span>
            </Link>
            <Link
                to="/booking"
                className={`nav-item ${
                    location.pathname === "/booking" ? "nav-item-active" : "nav-item-inactive"
                }`}
            >
                <FaCalendarAlt size={24} />
                <span className="text-sm font-medium mt-1">Booking</span>
            </Link>
            <Link
                to="/profile"
                className={`nav-item ${
                    location.pathname === "/profile" ? "nav-item-active" : "nav-item-inactive"
                }`}
            >
                <FaUser size={24} />
                <span className="text-sm font-medium mt-1">Profile</span>
            </Link>
        </div>
    );
};

export default BottomNav;