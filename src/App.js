import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import WelcomePage from "./page/WelcomePage";
import Introduction from "./page/Introduction";
import LetsIn from "./page/LetsIn";
import HomePage from "./page/Home";
import SavedPage from "./page/SavedPage";
import BookingPage from "./page/BookingPage";
import ProfilePage from "./page/ProfilePage";
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SplashScreen/>} />
            <Route path="/welcome" element={<WelcomePage/>}/>
            <Route path='/intro' element={<Introduction/>}/>
            <Route path='/letsin' element={<LetsIn/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/saved' element={<SavedPage/>}/>
            <Route path='/booking' element={<BookingPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
