import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.offline";
import { FaSearch, FaBell, FaTimes } from "react-icons/fa";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import haversine from "haversine-distance";
import BottomNav from "../components/BottomNav";

// Foydalanuvchi uchun ikonka (yashil doira ichida odam belgisi)
const userIcon = L.divIcon({
    className: "user-marker",
    html: `
    <div style="
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #28A745;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    ">
      <span style="
        color: #FFFFFF;
        font-size: 20px;
        font-weight: bold;
      ">👤</span>
    </div>
  `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

// Parking joylari uchun dinamik ikonka (narxga qarab rang o‘zgaradi)
const getMarkerIcon = (price) => {
    let priceValue;
    try {
        priceValue = parseInt(price.split(" ")[0]);
    } catch (error) {
        console.error("Narxni parse qilishda xatolik:", price, error);
        priceValue = 0;
    }

    let backgroundColor = "#1E90FF";
    if (priceValue < 5000) {
        backgroundColor = "#28A745";
    } else if (priceValue >= 5000 && priceValue < 7000) {
        backgroundColor = "#FFC107";
    } else {
        backgroundColor = "#DC3545";
    }

    return L.divIcon({
        className: "custom-marker",
        html: `
      <div style="
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: ${backgroundColor};
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      ">
        <span style="
          color: #FFFFFF;
          font-size: 20px;
          font-weight: bold;
        ">P</span>
      </div>
    `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });
};

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userPosition, setUserPosition] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredParkingSpots, setFilteredParkingSpots] = useState([]);
    const [selectedParking, setSelectedParking] = useState(null);
    const searchPanelRef = useRef(null);

    // Toshkent tumanlarining markaziy koordinatalari
    const tumanCenters = {
        "Chilonzor": { lat: 41.2775, lng: 69.2018 },
        "Yunusobod": { lat: 41.3644, lng: 69.2875 },
        "Mirzo Ulug‘bek": { lat: 41.3275, lng: 69.3425 },
        "Toshkent markazi": { lat: 41.2995, lng: 69.2401 },
        "Sergeli": { lat: 41.2247, lng: 69.2167 },
        "Shayxontohur": { lat: 41.3167, lng: 69.2167 },
        "Bektemir": { lat: 41.2333, lng: 69.3333 },
        "Yakkasaroy": { lat: 41.2875, lng: 69.2167 },
        "Uchtepa": { lat: 41.2867, lng: 69.1667 },
        "Mirobod": { lat: 41.2833, lng: 69.2667 },
        "Olmazor": { lat: 41.3500, lng: 69.2167 },
    };

    const localParkingSpots = [
        {
            id: "1",
            name: "Chilonzor Metro Parking",
            lat: 41.2775,
            lng: 69.2018,
            region: "Chilonzor, Toshkent",
            country: "Uzbekistan",
            distance: "300m",
            distanceMeters: 300,
            price: "6000 UZS/soat",
            description: "Chilonzor metrosi yaqinidagi parking.",
        },
        {
            id: "2",
            name: "Yunusobod Metro Parking",
            lat: 41.3644,
            lng: 69.2875,
            region: "Yunusobod, Toshkent",
            country: "Uzbekistan",
            distance: "500m",
            distanceMeters: 500,
            price: "7000 UZS/soat",
            description: "Yunusobod metrosi yaqinidagi parking.",
        },
        {
            id: "3",
            name: "Mirzo Ulug‘bek Parking",
            lat: 41.3275,
            lng: 69.3425,
            region: "Mirzo Ulug‘bek, Toshkent",
            country: "Uzbekistan",
            distance: "700m",
            distanceMeters: 700,
            price: "5000 UZS/soat",
            description: "Mirzo Ulug‘bek tumani yaqinidagi parking.",
        },
        {
            id: "4",
            name: "Oybek Metro Parking",
            lat: 41.2995,
            lng: 69.2401,
            region: "Toshkent markazi",
            country: "Uzbekistan",
            distance: "200m",
            distanceMeters: 200,
            price: "8000 UZS/soat",
            description: "Oybek metrosi yaqinidagi parking.",
        },
        {
            id: "5",
            name: "Sergeli Parking",
            lat: 41.2247,
            lng: 69.2167,
            region: "Sergeli, Toshkent",
            country: "Uzbekistan",
            distance: "1000m",
            distanceMeters: 1000,
            price: "4000 UZS/soat",
            description: "Sergeli tumani yaqinidagi parking.",
        },
        {
            id: "6",
            name: "Shayxontohur Parking",
            lat: 41.3167,
            lng: 69.2167,
            region: "Shayxontohur, Toshkent",
            country: "Uzbekistan",
            distance: "800m",
            distanceMeters: 800,
            price: "5000 UZS/soat",
            description: "Shayxontohur tumani yaqinidagi parking.",
        },
        {
            id: "7",
            name: "Bektemir Parking",
            lat: 41.2333,
            lng: 69.3333,
            region: "Bektemir, Toshkent",
            country: "Uzbekistan",
            distance: "1200m",
            distanceMeters: 1200,
            price: "4500 UZS/soat",
            description: "Bektemir tumani yaqinidagi parking.",
        },
        {
            id: "8",
            name: "Yakkasaroy Metro Parking",
            lat: 41.2875,
            lng: 69.2167,
            region: "Yakkasaroy, Toshkent",
            country: "Uzbekistan",
            distance: "600m",
            distanceMeters: 600,
            price: "7000 UZS/soat",
            description: "Yakkasaroy tumani yaqinidagi parking.",
        },
        {
            id: "9",
            name: "Uchtepa Parking",
            lat: 41.2867,
            lng: 69.1667,
            region: "Uchtepa, Toshkent",
            country: "Uzbekistan",
            distance: "900m",
            distanceMeters: 900,
            price: "5000 UZS/soat",
            description: "Uchtepa tumani yaqinidagi parking.",
        },
        {
            id: "10",
            name: "Mirobod Parking",
            lat: 41.2833,
            lng: 69.2667,
            region: "Mirobod, Toshkent",
            country: "Uzbekistan",
            distance: "400m",
            distanceMeters: 400,
            price: "6000 UZS/soat",
            description: "Mirobod tumani yaqinidagi parking.",
        },
        {
            id: "11",
            name: "Olmazor Parking",
            lat: 41.3500,
            lng: 69.2167,
            region: "Olmazor, Toshkent",
            country: "Uzbekistan",
            distance: "1100m",
            distanceMeters: 1100,
            price: "5500 UZS/soat",
            description: "Olmazor tumani yaqinidagi parking.",
        },
        {
            id: "12",
            name: "Chilonzor 45-kvartal Parking",
            lat: 41.2700,
            lng: 69.1900,
            region: "Chilonzor, Toshkent",
            country: "Uzbekistan",
            distance: "350m",
            distanceMeters: 350,
            price: "6000 UZS/soat",
            description: "Chilonzor 45-kvartal yaqinidagi parking.",
        },
        {
            id: "13",
            name: "Yunusobod 4-kvartal Parking",
            lat: 41.3700,
            lng: 69.2900,
            region: "Yunusobod, Toshkent",
            country: "Uzbekistan",
            distance: "550m",
            distanceMeters: 550,
            price: "7000 UZS/soat",
            description: "Yunusobod 4-kvartal yaqinidagi parking.",
        },
        {
            id: "14",
            name: "Mirzo Ulug‘bek Metro Parking",
            lat: 41.3300,
            lng: 69.3400,
            region: "Mirzo Ulug‘bek, Toshkent",
            country: "Uzbekistan",
            distance: "750m",
            distanceMeters: 750,
            price: "5000 UZS/soat",
            description: "Mirzo Ulug‘bek metrosi yaqinidagi parking.",
        },
        {
            id: "15",
            name: "Toshkent City Mall Parking",
            lat: 41.3100,
            lng: 69.2500,
            region: "Toshkent markazi",
            country: "Uzbekistan",
            distance: "250m",
            distanceMeters: 250,
            price: "8000 UZS/soat",
            description: "Toshkent City Mall yaqinidagi parking.",
        },
    ];

    // Qo‘shimcha parking joylarini tumanlar bo‘yicha tarqatish
    const regions = Object.keys(tumanCenters);
    for (let i = 16; i <= 200; i++) {
        const randomRegion = regions[Math.floor(Math.random() * regions.length)];
        const center = tumanCenters[randomRegion];
        const latOffset = (Math.random() - 0.5) * 0.02; // ±0.02 daraja (taxminan 2 km radius)
        const lngOffset = (Math.random() - 0.5) * 0.02;
        localParkingSpots.push({
            id: `${i}`,
            name: `${randomRegion} Parking ${i}`,
            lat: center.lat + latOffset,
            lng: center.lng + lngOffset,
            region: randomRegion + ", Toshkent",
            country: "Uzbekistan",
            distance: `${Math.floor(Math.random() * 1000) + 200}m`,
            distanceMeters: Math.floor(Math.random() * 1000) + 200,
            price: `${Math.floor(Math.random() * 4000) + 4000} UZS/soat`,
            description: `${randomRegion} tumanidagi parking joyi.`,
        });
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserPosition([latitude, longitude]);
                    console.log("User Position:", [latitude, longitude]);
                },
                (error) => {
                    console.error("Joylashuvni olishda xatolik:", error);
                    setUserPosition([41.2995, 69.2401]);
                }
            );
        } else {
            console.error("Brauzer geolocation’ni qo‘llab-quvvatlamaydi");
            setUserPosition([41.2995, 69.2401]);
        }
    }, []);

    const fetchParkingSpots = useCallback(async () => {
        if (!userPosition) return;

        try {
            setIsLoading(true);

            const finalParkingData = [...localParkingSpots];

            finalParkingData.forEach((spot) => {
                const userPoint = { lat: userPosition[0], lng: userPosition[1] };
                const parkingPoint = { lat: spot.lat, lng: spot.lng };
                spot.distanceMeters = haversine(userPoint, parkingPoint);
                spot.distance = `${Math.round(spot.distanceMeters)}m`;
            });

            finalParkingData.sort((a, b) => a.distanceMeters - b.distanceMeters);

            const limitedParkingData = finalParkingData.slice(0, 200);

            setFilteredParkingSpots(limitedParkingData);
            console.log("Toshkentdagi jami parking joylari soni (cheklangan):", limitedParkingData.length);
        } catch (error) {
            console.error("Ma'lumotlarni olishda xatolik:", error);
            const finalParkingData = [...localParkingSpots];
            finalParkingData.sort((a, b) => a.distanceMeters - b.distanceMeters);
            setFilteredParkingSpots(finalParkingData.slice(0, 200));
        } finally {
            setIsLoading(false);
        }
    }, [userPosition]);

    useEffect(() => {
        if (userPosition) {
            fetchParkingSpots();
        }
    }, [userPosition, fetchParkingSpots]);

    useEffect(() => {
        console.log("Filtered Parking Spots:", filteredParkingSpots);
    }, [filteredParkingSpots]);

    const handleSearch = useCallback(async (query) => {
        if (!query) {
            fetchParkingSpots();
            return;
        }

        const provider = new OpenStreetMapProvider();
        const results = await provider.search({ query });

        const uzbekistanResults = results.filter((result) =>
            result.label.toLowerCase().includes("uzbekistan")
        );

        if (uzbekistanResults.length > 0) {
            const region = uzbekistanResults[0].label.split(",")[0].toLowerCase();
            let filteredSpots = filteredParkingSpots.filter((spot) =>
                spot.region.toLowerCase().includes(region) || spot.name.toLowerCase().includes(query.toLowerCase())
            );

            filteredSpots = filteredSpots.slice(0, 200);

            setFilteredParkingSpots(filteredSpots);
            console.log("Qidiruv natijasi - Jami parking joylari soni (cheklangan):", filteredSpots.length);
        } else {
            setFilteredParkingSpots([]);
            console.log("Qidiruv natijasi - Jami parking joylari soni: 0");
        }

        setShowSearch(false);
        setSearchQuery("");
    }, [filteredParkingSpots, fetchParkingSpots]);

    const toggleSearch = () => {
        setShowSearch((prev) => !prev);
        if (showSearch) {
            setSearchQuery("");
        }
    };

    const handleMarkerClick = (spot) => {
        setSelectedParking(spot);
    };

    const closeInfoPanel = () => {
        setSelectedParking(null);
        console.log("Panel yopildi");
    };

    return (
        <div className="h-screen w-full relative overflow-hidden">
            {isLoading || !userPosition ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <p className="text-lg font-semibold text-gray-600">Loading...</p>
                </div>
            ) : (
                <>
                    <MapContainer
                        center={userPosition}
                        zoom={12} // Zoom darajasini biroz kichraytirdik
                        maxZoom={18}
                        style={{ height: "calc(100% - 80px)", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            useCache={true}
                            crossOrigin={true}
                            tileSize={256}
                            minZoom={0}
                            maxZoom={18}
                        />
                        <Marker position={userPosition} icon={userIcon} />
                        <Circle
                            center={userPosition}
                            radius={500}
                            pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.1 }}
                        />
                        {filteredParkingSpots.map((spot) => (
                            <Marker
                                key={spot.id}
                                position={[spot.lat, spot.lng]}
                                icon={getMarkerIcon(spot.price)}
                                eventHandlers={{
                                    click: () => handleMarkerClick(spot),
                                }}
                            />
                        ))}
                    </MapContainer>

                    <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-lg z-[1000]">
                        <p className="text-sm font-semibold text-gray-800">
                            Toshkentdagi jami parking joylari: {filteredParkingSpots.length} ta
                        </p>
                    </div>

                    <div className="absolute top-4 right-4 flex space-x-2 z-[1000]">
                        <button
                            onClick={toggleSearch}
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                        >
                            <FaSearch className="text-white" size={20} />
                        </button>
                        <button className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                            <FaBell className="text-white" size={20} />
                        </button>
                    </div>

                    <div
                        ref={searchPanelRef}
                        className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[500px] bg-gradient-to-br from-blue-600 to-indigo-600 shadow-2xl z-[1000] transition-all duration-500 ease-in-out transform rounded-b-3xl border-b-4 border-blue-400 backdrop-blur-md ${
                            showSearch ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                        }`}
                    >
                        <div className="flex items-center p-4">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch(searchQuery);
                                        }
                                    }}
                                    placeholder="Manzil qidiring..."
                                    className="w-full p-3 pr-12 rounded-full bg-white/95 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md transition-all duration-300 hover:shadow-lg"
                                />
                                <FaSearch
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 cursor-pointer"
                                    size={20}
                                    onClick={() => handleSearch(searchQuery)}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            handleSearch("");
                                        }}
                                        className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        <FaTimes size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {selectedParking && (
                        <div
                            className="absolute bottom-20 left-0 right-0 bg-white shadow-lg z-[1000] transition-all duration-500 ease-in-out transform rounded-t-3xl border-t-4 border-blue-400 p-4 max-h-[30vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-blue-600">{selectedParking.name}</h3>
                                <button
                                    onClick={closeInfoPanel}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>
                            <p className="text-gray-700 mb-2">
                                <span className="font-medium">Hudud:</span> {selectedParking.region}, {selectedParking.country}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <span className="font-medium">Masofa:</span> {selectedParking.distance}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <span className="font-medium">Narx:</span> {selectedParking.price}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-medium">Tavsif:</span> {selectedParking.description}
                            </p>
                        </div>
                    )}
                </>
            )}
            <BottomNav />
        </div>
    );
};

export default HomePage;