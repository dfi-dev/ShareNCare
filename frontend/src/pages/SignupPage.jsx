import SignupForm from "../components/Forms/SignupForm.jsx";
import SocialButton from "../components/UI/SocialButton.jsx";
import Loader from "../components/Loaders/Loader.jsx";
import Modal from "../components/Modals/Modal.jsx";
import {useMemo, useState} from "react";
import {validateForm} from "../utils/validateForm.js";

export default function SignupPage() {

    const formInitialState = useMemo(() => ({
        fullName: "", userType: "", email: "", phone: "",
        password: "", confirmPassword: "", dob: "", gender: "", address: "", bloodGroup: ""
    }), []);

    const [formData, setFormData] = useState(formInitialState);
    const [errors, setErrors] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [modal, setModal] = useState({ show: false, type: "", message: "" });

    const handleSignupSubmit = () => {
        const newErrors = validateForm(formData);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            setModal({ show: true, type: "error", message: "Input validation failed!" });
            return;
        }
        setShowLoader(true);
        setTimeout(() => {
            setShowLoader(false);
            setModal({ show: true, type: "success", message: "Signup Successful!" });
        }, 2000);
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
                    Already have an account? <a href="#"
                                                className="text-[#10c1bb]  font-sans font-medium tracking-wide">Login</a>
                </div>

                <div className="my-2 text-center text-gray-600 text-sm">Or sign up with</div>
                <SocialButton/>
            </div>
            {showLoader ? <Loader/> : modal.show && <Modal type={modal.type} message={modal.message} showLoader={modal.showLoader} onClose={() => setModal({ show: false })} />}
        </div>
    );
}
