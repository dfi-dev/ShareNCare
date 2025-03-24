import Footer from "./components/Layout/Footer.jsx";
import Header from "./components/Layout/Header.jsx";
import Notifications from "./components/Notifications/Notifications.jsx";
import PhotoGrid from "./components/Gallery/PhotoGrid.jsx";

import Welcome from "./pages/Welcome.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import TopDonors from "./pages/TopDonors.jsx";
import Donate from "./pages/Donate.jsx";
import Signup from "./backup/Signup.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import BloodDonationForm from "./components/Forms/BloodDonationForm.jsx";


const App = () => {
    return <>
        {/*<Header></Header>*/}
        {/*<Notifications/>*/}
        {/*<Welcome/>*/}
        {/*<About/>*/}
        {/* <Contact/>*/}
        {/* <TopDonors/> */}
        {/* <Donate/>*/}
        {/*<Footer/>*/}
        <BloodDonationForm/>
        {/*<SignupPage/>*/}
        {/*<LoginPage/>*/}
    </>
};

export default App;
