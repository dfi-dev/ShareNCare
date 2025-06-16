import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from "./components/Layout/Footer.jsx";
import PublicHeader from "./components/Layout/PublicHeader.jsx";
import Welcome from "./pages/public/Welcome.jsx";
import About from "./pages/public/About.jsx";
import Contact from "./pages/public/Contact.jsx";
import TopDonors from "./pages/public//TopDonors.jsx";
import Donate from "./pages/public/Donate.jsx";
import LoginPage from "./pages/public/LoginPage.jsx";
import SignupPage from "./pages/public/SignupPage.jsx";
import ConfirmEmailPage from './pages/public/ConfirmEmailPage.jsx';
import NotFoundPage from './pages/public/NotFoundPage.jsx';
import DonorLanding from './pages/donor/DonorLanding.jsx';

const App = () => {
    const location = useLocation();

    // Hide header and footer on login, signup, and OTP pages
    const hideHeaderFooter = ['/login', '/signup', '/otp'].includes(location.pathname);

    return (
        <div className="min-h-screen flex flex-col">
            {!hideHeaderFooter && <PublicHeader />}

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Welcome />} /> 
                    <Route path="/donate" element={<Donate />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/top-donors" element={<TopDonors />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/confirm-email" element={<ConfirmEmailPage />} />
                    <Route path="/donor/dashboard" element={<DonorLanding />} />

                    {/* 404 Not Found Route */}
                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
            </main>

            {!hideHeaderFooter && <Footer />}
        </div>
    );
};

export default App;
