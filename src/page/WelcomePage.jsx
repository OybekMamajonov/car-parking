import {useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import parkingVideo from '../assets/videos/parkingvideo.mp4'

const WelcomePage = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);

    useEffect(() => {
        // Videoni loop qilish
        if (videoRef.current) {
            videoRef.current.loop = true;
        }
    }, []);

    const handleClick = () => {
        navigate('/intro'); // Keyingi sahifaga o'tish
    };

    return (
        <div
            className="relative h-screen w-full overflow-hidden cursor-pointer"
            onClick={handleClick}
        >
            {/* Video Background */}
            <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
                <source
                    src={parkingVideo}
                    type="video/mp4"
                />
            </video>



            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                {/* Text Content - Animatsiyalar bilan */}
                <motion.div
                    className="text-white text-center px-4"
                    initial={{opacity: 0, x: -100}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 1.5, ease: "easeOut"}}
                >
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-4"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.5, duration: 1}}
                    >
                        Welcome to 👋
                    </motion.h1>

                    <motion.h2
                        className="text-6xl md:text-8xl font-bold text-blue-400 mb-6"
                        initial={{opacity: 0, scale: 0.5}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{delay: 1, duration: 0.8}}
                    >
                        Parkir
                    </motion.h2>

                    <motion.p
                        className="text-xl md:text-2xl max-w-2xl"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 1.8, duration: 1}}
                    >
                        The best parking app of the century for all people in the world.
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};

export default WelcomePage;