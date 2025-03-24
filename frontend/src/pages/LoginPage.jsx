import {useCallback, useRef, useState} from "react";
import SocialButton from "../components/UI/SocialButton.jsx";
import LoginForm from "../components/Forms/LoginForm.jsx";
import Modal from "../components/Modals/Modal.jsx";


const LoginPage = () => {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [modal, setModal] = useState({show: false, type: "", message: ""})
    const loginTimeoutRef = useRef(null);


    const handleLogin = useCallback(() => {
        setIsPasswordCorrect(() => {
            const newValue = formData.username === "admin" && formData.password === "123";

            if (loginTimeoutRef.current) {
                clearTimeout(loginTimeoutRef.current);
            }

            loginTimeoutRef.current = setTimeout(() => {
                setModal({
                    show: true,
                    message: newValue ? "Login Success!" : "Invalid credentials",
                    type: newValue ? "success" : "error"
                });
                newValue && setFormData({ username: "", password: "" });
            }, 1000);

            return newValue;
        });
    }, [formData]);


    const onClose = () => {
        setIsPasswordCorrect(false);
        setModal({ show: false, type: "", message: "" });
    };

    return (
        <div className="flex h-screen items-center justify-center p-4">
            <div className="w-full max-w-[400px] bg-[#ffe2e2] px-8 py-14 rounded-xl shadow-[10px_10px_20px_rgba(0,0,0,0.3)] flex flex-col">

            <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Welcome Back</h2>
               <LoginForm
                   onSubmit={handleLogin}
                   formData={formData}
                   setFormData={setFormData}
                   isPasswordCorrect={isPasswordCorrect}
               />
                <div className="mt-4 text-center text-gray-600 text-sm">
                    Don't have an account? <a href="#" className="text-[#10c1bb] font-medium">Sign Up</a>
                </div>
                <div className="my-2 text-center text-gray-600 text-sm">Or login with</div>
                <SocialButton/>
            </div>
            {modal.show && <Modal message={modal.message} type={modal.type} onClose={onClose}/>}
        </div>
    );
}
 export default LoginPage