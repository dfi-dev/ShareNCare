import SignupForm from "../components/Forms/SignupForm.jsx";
import SocialButton from "../components/UI/SocialButton.jsx";
import Loader from "../components/Loaders/Loader.jsx";
import Modal from "../components/Modals/Modal.jsx";
import { useMemo, useState } from "react";
import { validateForm } from "../utils/validateForm.js";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
    const navigate = useNavigate();

    const formInitialState = useMemo(() => ({
        fullName: "",
        userType: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        dob: "",
        gender: "",
        address: "",
        bloodGroup: ""
    }), []);

    const [formData, setFormData] = useState(formInitialState);
    const [errors, setErrors] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [modal, setModal] = useState({ show: false, type: "", message: "" });

    const handleSignupSubmit = async () => {
        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setModal({ show: true, type: "error", message: "Input validation failed!" });
            return;
        }

        setShowLoader(true);

        // Preparing the payload
        const payload = {
            fullName: formData.fullName,
            email: formData.email,
            role: formData.userType,
            phone: formData.phone,
            address: formData.address,
            dob: formData.dob,
            gender: formData.gender,
            password: formData.password
        };

        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", payload);

            if (response.status === 201) {
                // Display the actual message from the API response
                const apiMessage = response.data.message || "Signup successful!";
                
                setModal({
                    show: true,
                    type: "success",
                    message: apiMessage
                });

                // Navigate after 1 second
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                throw new Error("Unexpected response status.");
            }

        } catch (error) {
            console.error("Signup error:", error);

            const errorMessage = error.response?.data?.message || "Signup failed!";
            
            setModal({
                show: true,
                type: "error",
                message: errorMessage
            });

        } finally {
            setShowLoader(false);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center p-4">
            <div
                className="w-full max-w-[400px] bg-[#ffe2e2] px-8 py-14 rounded-xl shadow-[10px_10px_20px_rgba(0,0,0,0.3)] flex flex-col">

                <SignupForm
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                    setErrors={setErrors}
                    onSubmit={handleSignupSubmit}
                />

                <div className="mt-4 text-center text-gray-600 text-sm">
                 Already have an account? <Link to="/login" className="text-[#10c1bb] font-medium">Login</Link>
                </div>

                <div className="my-4 text-center text-gray-600 text-sm">Or sign up with</div>
                <SocialButton />
            </div>

            {showLoader ? <Loader /> : modal.show && (
                <Modal 
                    type={modal.type}
                    message={modal.message}
                    showLoader={modal.showLoader}
                    onClose={() => setModal({ show: false })}
                />
            )}
        </div>
    );
}
