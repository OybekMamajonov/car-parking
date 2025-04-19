import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCreditCard, FaBell, FaShieldAlt, FaInfoCircle, FaMoon, FaSignOutAlt, FaChevronLeft, FaCalendarAlt, FaEnvelope, FaGlobe, FaVenusMars } from "react-icons/fa";

import '../styles/Profile.css';
import BottomNav from "../components/BottomNav";

// Namunaviy foydalanuvchi ma'lumotlari
const initialUserData = {
    name: "Andrew Ainsley",
    email: "andrew_ainsley@yourdomain.com",
    dob: "12/27/1995",
    country: "United States",
    phone: "+1 114 467 378 399",
    gender: "Male",
    image: "https://via.placeholder.com/100x100.png?text=User",
};

const ProfilePage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(initialUserData);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSecurity, setShowSecurity] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);
    const [notifications, setNotifications] = useState({
        general: false,
        sound: false,
        vibrate: false,
        appUpdates: true,
        newService: false,
        newTips: false,
    });
    const [security, setSecurity] = useState({
        faceId: false,
        rememberMe: false,
        touchId: true,
        googleAuth: false,
    });

    // Edit Profile formasi uchun state
    const [editData, setEditData] = useState({ ...userData });

    // Profil ma'lumotlarini yangilash
    const handleUpdateProfile = () => {
        setUserData({ ...editData });
        setShowEditProfile(false);
    };

    // Bildirishnoma sozlamalarini yangilash
    const toggleNotification = (key) => {
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // Xavfsizlik sozlamalarini yangilash
    const toggleSecurity = (key) => {
        setSecurity((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // Logout tasdiqlash
    const handleLogout = () => {
        // Bu yerda haqiqiy logout logikasi bo‘lardi (masalan, tokenni o‘chirish)
        navigate("/home"); // Hozircha HomePage‘ga yo‘naltirish
    };

    return (
        <div className="h-screen w-full relative overflow-hidden bg-gray-100">
            {/* Main Profile Page */}
            {!showEditProfile && !showNotifications && !showSecurity && (
                <div className="pt-16 pb-20 px-4 h-full overflow-y-auto">
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src={userData.image}
                            alt={userData.name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg mb-4"
                        />
                        <h2 className="text-2xl font-bold text-blue-600">{userData.name}</h2>
                        <p className="text-gray-600">{userData.email}</p>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => setShowEditProfile(true)}
                            className="flex items-center w-full p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <FaUser className="text-gray-600 mr-4" size={20} />
                            <span className="text-gray-800 font-medium">Edit Profile</span>
                        </button>
                        <button
                            onClick={() => console.log("Payment bosildi")}
                            className="flex items-center w-full p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <FaCreditCard className="text-gray-600 mr-4" size={20} />
                            <span className="text-gray-800 font-medium">Payment</span>
                        </button>
                        <button
                            onClick={() => setShowNotifications(true)}
                            className="flex items-center w-full p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <FaBell className="text-gray-600 mr-4" size={20} />
                            <span className="text-gray-800 font-medium">Notifications</span>
                        </button>
                        <button
                            onClick={() => setShowSecurity(true)}
                            className="flex items-center w-full p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <FaShieldAlt className="text-gray-600 mr-4" size={20} />
                            <span className="text-gray-800 font-medium">Security</span>
                        </button>
                        <button
                            onClick={() => console.log("Help bosildi")}
                            className="flex items-center w-full p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <FaInfoCircle className="text-gray-600 mr-4" size={20} />
                            <span className="text-gray-800 font-medium">Help</span>
                        </button>
                        <div className="flex items-center justify-between w-full p-4 bg-white rounded-2xl shadow-md">
                            <div className="flex items-center">
                                <FaMoon className="text-gray-600 mr-4" size={20} />
                                <span className="text-gray-800 font-medium">Dark Theme</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={darkTheme}
                                    onChange={() => setDarkTheme(!darkTheme)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:bg-blue-500 transition-all duration-300">
                                    <div
                                        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                                            darkTheme ? "translate-x-5" : "translate-x-0"
                                        }`}
                                    ></div>
                                </div>
                            </label>
                        </div>
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="flex items-center w-full p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <FaSignOutAlt className="text-red-500 mr-4" size={20} />
                            <span className="text-red-500 font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Profile Page */}
            {showEditProfile && (
                <div className="pt-16 pb-20 px-4 h-full overflow-y-auto">
                    <button
                        onClick={() => setShowEditProfile(false)}
                        className="flex items-center mb-6 text-blue-600"
                    >
                        <FaChevronLeft size={20} />
                        <span className="ml-2 text-lg font-semibold">Edit Profile</span>
                    </button>
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl shadow-md p-4">
                            <label className="block text-gray-600 mb-2">Name</label>
                            <input
                                type="text"
                                value={editData.name}
                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                        <div className="bg-white rounded-2xl shadow-md p-4">
                            <label className="block text-gray-600 mb-2 flex items-center">
                                <FaCalendarAlt className="mr-2" /> Date of Birth
                            </label>
                            <input
                                type="text"
                                value={editData.dob}
                                onChange={(e) => setEditData({ ...editData, dob: e.target.value })}
                                className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                        <div className="bg-white rounded-2xl shadow-md p-4">
                            <label className="block text-gray-600 mb-2 flex items-center">
                                <FaEnvelope className="mr-2" /> Email
                            </label>
                            <input
                                type="email"
                                value={editData.email}
                                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                        <div className="bg-white rounded-2xl shadow-md p-4">
                            <label className="block text-gray-600 mb-2 flex items-center">
                                <FaGlobe className="mr-2" /> Country & Phone
                            </label>
                            <div className="flex items-center space-x-2">
                                <img
                                    src="https://flagcdn.com/w40/us.png"
                                    alt="Country Flag"
                                    className="w-6 h-6"
                                />
                                <input
                                    type="text"
                                    value={editData.phone}
                                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                    className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-md p-4">
                            <label className="block text-gray-600 mb-2 flex items-center">
                                <FaVenusMars className="mr-2" /> Gender
                            </label>
                            <input
                                type="text"
                                value={editData.gender}
                                onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                                className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                        <button
                            onClick={handleUpdateProfile}
                            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:shadow-xl transition-all duration-300"
                        >
                            Update
                        </button>
                    </div>
                </div>
            )}

            {/* Notifications Page */}
            {showNotifications && (
                <div className="pt-16 pb-20 px-4 h-full overflow-y-auto">
                    <button
                        onClick={() => setShowNotifications(false)}
                        className="flex items-center mb-6 text-blue-600"
                    >
                        <FaChevronLeft size={20} />
                        <span className="ml-2 text-lg font-semibold">Notification</span>
                    </button>
                    <div className="space-y-4">
                        {[
                            { label: "General Notification", key: "general" },
                            { label: "Sound", key: "sound" },
                            { label: "Vibrate", key: "vibrate" },
                            { label: "App Updates", key: "appUpdates" },
                            { label: "New Service Available", key: "newService" },
                            { label: "New Tips Available", key: "newTips" },
                        ].map((item) => (
                            <div
                                key={item.key}
                                className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md"
                            >
                                <span className="text-gray-800 font-medium">{item.label}</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={notifications[item.key]}
                                        onChange={() => toggleNotification(item.key)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:bg-blue-500 transition-all duration-300">
                                        <div
                                            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                                                notifications[item.key] ? "translate-x-5" : "translate-x-0"
                                            }`}
                                        ></div>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Security Page */}
            {showSecurity && (
                <div className="pt-16 pb-20 px-4 h-full overflow-y-auto">
                    <button
                        onClick={() => setShowSecurity(false)}
                        className="flex items-center mb-6 text-blue-600"
                    >
                        <FaChevronLeft size={20} />
                        <span className="ml-2 text-lg font-semibold">Security</span>
                    </button>
                    <div className="space-y-4">
                        {[
                            { label: "Face ID", key: "faceId" },
                            { label: "Remember me", key: "rememberMe" },
                            { label: "Touch ID", key: "touchId" },
                            { label: "Google Authenticator", key: "googleAuth" },
                        ].map((item) => (
                            <div
                                key={item.key}
                                className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md"
                            >
                                <span className="text-gray-800 font-medium">{item.label}</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={security[item.key]}
                                        onChange={() => toggleSecurity(item.key)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:bg-blue-500 transition-all duration-300">
                                        <div
                                            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                                                security[item.key] ? "translate-x-5" : "translate-x-0"
                                            }`}
                                        ></div>
                                    </div>
                                </label>
                            </div>
                        ))}
                        <button
                            onClick={() => console.log("Change Password bosildi")}
                            className="w-full mt-6 px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-all duration-300"
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            )}

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1002]">
                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[400px] shadow-2xl">
                        <h3 className="text-lg font-semibold text-red-500 mb-4">Logout</h3>
                        <p className="text-gray-600 mb-4">Siz rostdan ham chiqmoqchimisiz?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
                            >
                                Bekor Qilish
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:shadow-xl transition-all duration-300"
                            >
                                Ha, Chiqish
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="absolute top-0 left-0 w-full p-4 bg-white shadow-md z-[1000] flex items-center justify-between">
                <h1 className="text-2xl font-bold text-blue-600">Profil</h1>
                <div className="w-6 h-6" /> {/* Placeholder for menu icon */}
            </div>

            <BottomNav />
        </div>
    );
};

export default ProfilePage;