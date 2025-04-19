import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Introduction(){

    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0-indeksdan boshlaymiz

    // Har bir qadam uchun kontent
    const steps = [
        {
            title: "Find Parking Places\nAround You Easily",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            icon: (
                <svg className="w-32 h-32 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        },
        {
            title: "Quick Reservations\nIn Just Few Clicks",
            description: "Sed do eiusmod tempor incididunt ut labore et dolore.",
            icon: (
                <svg className="w-32 h-32 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            )
        },
        {
            title: "Secure Payments\nMultiple Options",
            description: "Ut enim ad minim veniam, quis nostrud exercitation.",
            icon: (
                <svg className="w-32 h-32 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            navigate('/letsin');
        }
    };

    const handleSkip = () => {
        navigate('/letsin');
    };

    return (
        <div className="flex flex-col justify-between h-screen p-6 bg-white">
            {/* Content */}
            <div className="flex-1 flex flex-col justify-center items-center text-center">
                {/* Illustration */}
                <div className="mb-8 w-64 h-64 bg-gray-100 rounded-full flex items-center justify-center">
                    {steps[currentStep].icon}
                </div>

                {/* Text content */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4 whitespace-pre-line">
                    {steps[currentStep].title}
                </h1>
                <p className="text-gray-600 mb-8 max-w-md">
                    {steps[currentStep].description}
                </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${currentStep === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>

                <div className="flex space-x-4">
                    <button
                        onClick={handleSkip}
                        className="px-6 py-2 text-gray-600 font-medium"
                    >
                        Skip
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium"
                    >
                        {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Introduction;