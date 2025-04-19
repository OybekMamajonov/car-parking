import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function SplashScreen() {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/welcome'); // Redirect after 2 seconds
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
            <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
                {/* Status Bar (simulated iOS time) */}
                <div className="w-full text-center py-3 absolute top-0 text-black text-sm">
                    9:41
                </div>

                {/* Logo/Brand Name */}
                <div className="animate-fade-in">
                    <h1 className="text-3xl font-bold text-blue-500">ParkEasy</h1>
                </div>
            </div>
        </>
    )
}

export default SplashScreen
