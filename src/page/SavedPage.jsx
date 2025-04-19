import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes, FaTrash } from "react-icons/fa";
import '../styles/Saved.css';
import BottomNav from "../components/BottomNav";

// Namunaviy saqlangan parking joylari
const initialSavedSpots = [
    {
        id: "1",
        name: "Chilonzor Metro Parking",
        address: "Chilonzor, Toshkent",
        image: "https://via.placeholder.com/80x80.png?text=Parking",
    },
    {
        id: "2",
        name: "Yunusobod Metro Parking",
        address: "Yunusobod, Toshkent",
        image: "https://via.placeholder.com/80x80.png?text=Parking",
    },
    {
        id: "3",
        name: "Oybek Metro Parking",
        address: "Toshkent markazi",
        image: "https://via.placeholder.com/80x80.png?text=Parking",
    },
    {
        id: "4",
        name: "Sergeli Parking",
        address: "Sergeli, Toshkent",
        image: "https://via.placeholder.com/80x80.png?text=Parking",
    },
];

const SavedPage = () => {
    const [savedSpots, setSavedSpots] = useState(initialSavedSpots);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredSpots, setFilteredSpots] = useState(savedSpots);
    const [showSearch, setShowSearch] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [spotToRemove, setSpotToRemove] = useState(null);
    const searchPanelRef = useRef(null);

    // Qidiruv funksiyasi
    useEffect(() => {
        if (searchQuery) {
            const filtered = savedSpots.filter(
                (spot) =>
                    spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    spot.address.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredSpots(filtered);
        } else {
            setFilteredSpots(savedSpots);
        }
    }, [searchQuery, savedSpots]);

    // Qidiruv panelini ochish/yopish
    const toggleSearch = () => {
        setShowSearch((prev) => !prev);
        if (showSearch) {
            setSearchQuery("");
        }
    };

    // O‘chirishni tasdiqlash oynasini ko‘rsatish
    const handleRemoveClick = (spot) => {
        setSpotToRemove(spot);
        setShowConfirm(true);
    };

    // O‘chirishni tasdiqlash
    const confirmRemove = () => {
        if (spotToRemove) {
            setSavedSpots(savedSpots.filter((spot) => spot.id !== spotToRemove.id));
            setShowConfirm(false);
            setSpotToRemove(null);
        }
    };

    // O‘chirishni bekor qilish
    const cancelRemove = () => {
        setShowConfirm(false);
        setSpotToRemove(null);
    };

    return (
        <div className="h-screen w-full relative overflow-hidden bg-gray-100">
            <div className="absolute top-0 left-0 w-full p-4 bg-white shadow-md z-[1000] flex items-center justify-between">
                <h1 className="text-2xl font-bold text-blue-600">Saqlangan Joylar</h1>
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
                            placeholder="Parking joyini qidiring..."
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

            {/* Ro‘yxat */}
            <div className="pt-20 pb-20 px-4 overflow-y-auto h-full">
                {filteredSpots.length === 0 ? (
                    <p className="text-center text-gray-600 mt-10">Saqlangan parking joylari yo‘q</p>
                ) : (
                    filteredSpots.map((spot) => (
                        <div
                            key={spot.id}
                            className="bg-white rounded-2xl shadow-md p-4 mb-4 flex items-center justify-between transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="flex items-center">
                                <img
                                    src={spot.image}
                                    alt={spot.name}
                                    className="w-20 h-20 rounded-xl object-cover mr-4"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-600">{spot.name}</h3>
                                    <p className="text-gray-600">{spot.address}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveClick(spot)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                            >
                                <FaTrash size={20} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Tasdiqlash oynasi */}
            {showConfirm && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1002]">
                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[400px] shadow-2xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Saqlanganlardan o‘chirilsinmi?</h3>
                        <div className="flex items-center mb-4">
                            <img
                                src={spotToRemove.image}
                                alt={spotToRemove.name}
                                className="w-16 h-16 rounded-xl object-cover mr-4"
                            />
                            <div>
                                <p className="font-medium text-gray-800">{spotToRemove.name}</p>
                                <p className="text-gray-600 text-sm">{spotToRemove.address}</p>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={cancelRemove}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={confirmRemove}
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:shadow-xl transition-all duration-300"
                            >
                                Ha, o‘chirish
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <BottomNav />
        </div>
    );
};

export default SavedPage;