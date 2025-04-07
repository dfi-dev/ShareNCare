import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from "./components/Layout/Footer.jsx";
import Header from "./components/Layout/Header.jsx";
import Welcome from "./pages/Welcome.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import TopDonors from "./pages/TopDonors.jsx";
import Donate from "./pages/Donate.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ConfirmEmailPage from './pages/ConfirmEmailPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import OTPPage from './pages/OTPPage.jsx';

const App = () => {
    const location = useLocation();

    // Hide header and footer on login, signup, and OTP pages
    const hideHeaderFooter = ['/login', '/signup', '/otp'].includes(location.pathname);

    return (
        <div className="min-h-screen flex flex-col">
            {!hideHeaderFooter && <Header />}

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Welcome />} /> 
                    <Route path="/donate" element={<Donate />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/top-donors" element={<TopDonors />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/confirm-email" element={<ConfirmEmailPage />} />
                    <Route path="/otp" element={<OTPPage />} />

                    {/* 404 Not Found Route */}
                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
            </main>

            {!hideHeaderFooter && <Footer />}
        </div>
    );
};

export default App;
