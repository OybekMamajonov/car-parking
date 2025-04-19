import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import '../styles/Booking.css'
import BottomNav from "../components/BottomNav";

// Namunaviy booking ma'lumotlari
const initialBookings = [
    {
        id: "1",
        name: "San Manolia",
        address: "Trantow Courts, Toshkent",
        price: "8000 UZS/hour",
        duration: "8 hour",
        status: "ongoing",
        state: "NOW ACTIVE",
        image: "https://via.placeholder.com/80x80.png?text=Parking",
    },
    {
        id: "2",
        name: "Buxton Path",
        address: "Evergreen Drive, Toshkent",
        price: "5700 UZS/hour",
        duration: "5 hour",
        status: "ongoing",
        state: "PAID",
        image: "https://via.placeholder.com/80x80.png?text=Parking",
    },
    {
        id: "3",
        name: "Blake Valley",
        address: "Messerschmidt Circle, Toshkent",
        price: "5810 UZS/hour",
        duration: "4 hour",
        status: "completed",
        state: "COMPLETED",
        image: "https://via.placeholder.com/80x80.png?text=Parking",
    },
    {
        id: "4",
        name: "Bondhouse Lane",
        address: "Tomscot Crossing, Toshkent",
        price: "4700 UZS/hour",
        duration: "3 hour",
        status: "completed",
        state: "COMPLETED",
        image: "https://via.placeholder.com/80x80.png?text=Parking",
    },
    {
        id: "5",
        name: "Broughton Woods",
        address: "Lakewood Gardens Junction, Toshkent",
        price: "5840 UZS/hour",
        duration: "6 hour",
        status: "completed",
        state: "COMPLETED",
        image: "https://via.placeholder.com/80x80.png?text=Parking",
    },
    {
        id: "6",
        name: "Allington Paddock",
        address: "Linden Trail, Toshkent",
        price: "5840 UZS/hour",
        duration: "6 hour",
        status: "canceled",
        state: "CANCELED",
        image: "https://via.placeholder.com/80x80.png?text=Parking",
    },
    {
        id: "7",
        name: "Appleton Warren",
        address: "Red Cloud Court, Toshkent",
        price: "5890 UZS/hour",
        duration: "7 hour",
        status: "canceled",
        state: "CANCELED",
        image: "https://via.placeholder.com/80x80.png?text=Parking",
    },
    {
        id: "8",
        name: "Banfield Road",
        address: "Division Center, Toshkent",
        price: "5840 UZS/hour",
        duration: "5 hour",
        status: "canceled",
        state: "CANCELED",
        image: "https://via.placeholder.com/80x80.png?text=Parking",
    },
    {
        id: "9",
        name: "Beach Furlong",
        address: "Waubesa Plaza, Toshkent",
        price: "5520 UZS/hour",
        duration: "4 hour",
        status: "canceled",
        state: "CANCELED",
        image: "https://via.placeholder.com/80x80.png?text=Parking",
    },
];

const BookingPage = () => {
    const [bookings, setBookings] = useState(initialBookings);
    const [activeTab, setActiveTab] = useState("ongoing");
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [refundMethod, setRefundMethod] = useState("");
    const searchPanelRef = useRef(null);

    // Tab bo'yicha filtr
    useEffect(() => {
        let filtered = bookings.filter((booking) => booking.status === activeTab);
        if (searchQuery) {
            filtered = filtered.filter(
                (booking) =>
                    booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    booking.address.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredBookings(filtered);
    }, [activeTab, bookings, searchQuery]);

    // Qidiruv panelini ochish/yopish
    const toggleSearch = () => {
        setShowSearch((prev) => !prev);
        if (showSearch) {
            setSearchQuery("");
        }
    };

    // Cancel modalni ochish
    const handleCancelClick = (booking) => {
        setSelectedBooking(booking);
        setShowCancelModal(true);
    };

    // Cancel tasdiqlash
    const confirmCancel = () => {
        if (selectedBooking && refundMethod) {
            const updatedBookings = bookings.map((booking) =>
                booking.id === selectedBooking.id
                    ? { ...booking, status: "canceled", state: "CANCELED" }
                    : booking
            );
            setBookings(updatedBookings);
            setShowCancelModal(false);
            setShowSuccessModal(true);
            setRefundMethod("");
            setSelectedBooking(null);
        }
    };

    // Cancel modalni yopish
    const closeCancelModal = () => {
        setShowCancelModal(false);
        setSelectedBooking(null);
        setRefundMethod("");
    };

    // Success modalni yopish
    const closeSuccessModal = () => {
        setShowSuccessModal(false);
    };

    // View Timer yoki View Ticket tugmasi bosilganda
    const handleViewAction = (action) => {
        console.log(`${action} bosildi:`, selectedBooking);
    };

    return (
        <div className="h-screen w-full relative overflow-hidden bg-gray-100">
            <div className="absolute top-0 left-0 w-full p-4 bg-white shadow-md z-[1000] flex items-center justify-between">
                <h1 className="text-2xl font-bold text-blue-600">Mening Band Qilishlarim</h1>
                <button
                    onClick={toggleSearch}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                >
                    <FaSearch className="text-white" size={20} />
                </button>
            </div>

            {/* Qidiruv paneli */}
            <div
                ref={searchPanelRef}
                className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[500px] bg-gradient-to-br from-blue-600 to-indigo-600 shadow-2xl z-[1001] transition-all duration-500 ease-in-out transform rounded-b-3xl border-b-4 border-blue-400 backdrop-blur-md ${
                    showSearch ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                }`}
            >
                <div className="flex items-center p-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Band qilishni qidiring..."
                            className="w-full p-3 pr-12 rounded-full bg-white/95 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md transition-all duration-300 hover:shadow-lg"
                        />
                        <FaSearch
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 cursor-pointer"
                            size={20}
                            onClick={() => setSearchQuery(searchQuery)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Tablar */}
            <div className="pt-20 px-4 flex space-x-2">
                <button
                    onClick={() => setActiveTab("ongoing")}
                    className={`flex-1 py-2 rounded-full font-medium transition-all duration-300 ${
                        activeTab === "ongoing"
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                            : "bg-gray-200 text-gray-700"
                    }`}
                >
                    Ongoing
                </button>
                <button
                    onClick={() => setActiveTab("completed")}
                    className={`flex-1 py-2 rounded-full font-medium transition-all duration-300 ${
                        activeTab === "completed"
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                            : "bg-gray-200 text-gray-700"
                    }`}
                >
                    Completed
                </button>
                <button
                    onClick={() => setActiveTab("canceled")}
                    className={`flex-1 py-2 rounded-full font-medium transition-all duration-300 ${
                        activeTab === "canceled"
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                            : "bg-gray-200 text-gray-700"
                    }`}
                >
                    Canceled
                </button>
            </div>

            {/* Ro‘yxat */}
            <div className="pt-4 pb-20 px-4 overflow-y-auto h-full">
                {filteredBookings.length === 0 ? (
                    <p className="text-center text-gray-600 mt-10">Band qilishlar yo‘q</p>
                ) : (
                    filteredBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white rounded-2xl shadow-md p-4 mb-4 flex items-center justify-between transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="flex items-center">
                                <img
                                    src={booking.image}
                                    alt={booking.name}
                                    className="w-20 h-20 rounded-xl object-cover mr-4"
                                />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-blue-600">{booking.name}</h3>
                                    <p className="text-gray-600">{booking.address}</p>
                                    <p className="text-gray-800 font-medium">
                                        {booking.price} | {booking.duration}
                                    </p>
                                    <div
                                        className={`text-sm font-semibold mt-1 inline-block px-2 py-1 rounded-full ${
                                            booking.status === "ongoing"
                                                ? booking.state === "NOW ACTIVE"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : "bg-green-100 text-green-600"
                                                : booking.status === "completed"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"
                                        }`}
                                    >
                                        {booking.state}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                {booking.status === "ongoing" && (
                                    <>
                                        <button
                                            className="border-2 border-blue-500 text-blue-500 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors"
                                            onClick={() => handleViewAction("View Timer")}
                                        >
                                            View Timer
                                        </button>
                                        <button
                                            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full hover:shadow-xl transition-all duration-300"
                                            onClick={() => handleViewAction("View Ticket")}
                                        >
                                            View Ticket
                                        </button>
                                        {booking.state !== "PAID" && (
                                            <button
                                                className="border-2 border-red-500 text-red-500 px-3 py-1 rounded-full hover:bg-red-50 transition-colors"
                                                onClick={() => handleCancelClick(booking)}
                                            >
                                                Cancel Booking
                                            </button>
                                        )}
                                    </>
                                )}
                                {booking.status !== "ongoing" && (
                                    <button
                                        className="border-2 border-blue-500 text-blue-500 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors"
                                        onClick={() => handleViewAction("View Ticket")}
                                    >
                                        View Ticket
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Cancel Modal */}
            {showCancelModal && selectedBooking && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1002]">
                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[400px] shadow-2xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Band Qilishni Bekor Qilish</h3>
                        <p className="text-gray-600 mb-4">
                            Iltimos, qaytarib berish usulini tanlang (faqat 80% qaytariladi).
                        </p>
                        <div className="space-y-3">
                            {["Paypal", "Google Pay", "Apple Pay", "Card (**** 4679)"].map((method) => (
                                <label key={method} className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="refundMethod"
                                        value={method}
                                        checked={refundMethod === method}
                                        onChange={(e) => setRefundMethod(e.target.value)}
                                        className="form-radio text-blue-500"
                                    />
                                    <span className="text-gray-800">{method}</span>
                                </label>
                            ))}
                        </div>
                        <p className="text-gray-600 mt-4">
                            To‘langan: {selectedBooking.price.split(" ")[0]} UZS | Qaytariladi:{" "}
                            {Math.round(
                                parseInt(selectedBooking.price.split(" ")[0]) * 0.8
                            )}{" "}
                            UZS
                        </p>
                        <div className="flex justify-end space-x-2 mt-6">
                            <button
                                onClick={closeCancelModal}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
                            >
                                Bekor Qilish
                            </button>
                            <button
                                onClick={confirmCancel}
                                className={`px-4 py-2 rounded-full text-white transition-all duration-300 ${
                                    refundMethod
                                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 hover:shadow-xl"
                                        : "bg-gray-400 cursor-not-allowed"
                                }`}
                                disabled={!refundMethod}
                            >
                                Tasdiqlash
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && selectedBooking && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1003]">
                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[400px] shadow-2xl text-center">
                        <div className="relative w-16 h-16 mx-auto mb-4">
                            <div className="absolute inset-0 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-10 h-10 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                            </div>
                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-200 rounded-full animate-ping"></div>
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-200 rounded-full animate-ping"></div>
                        </div>
                        <h3 className="text-xl font-semibold text-blue-600 mb-2">Muvaffaqiyatli!!</h3>
                        <p className="text-gray-600 mb-4">
                            Siz parking band qilishni muvaffaqiyatli bekor qildingiz. 80% mablag‘ hisobingizga
                            qaytariladi.
                        </p>
                        <p className="text-gray-600">
                            To‘langan: {selectedBooking.price.split(" ")[0]} UZS | Qaytariladi:{" "}
                            {Math.round(
                                parseInt(selectedBooking.price.split(" ")[0]) * 0.8
                            )}{" "}
                            UZS
                        </p>
                        <button
                            onClick={closeSuccessModal}
                            className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:shadow-xl transition-all duration-300"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            <BottomNav />
        </div>
    );
};

export default BookingPage;