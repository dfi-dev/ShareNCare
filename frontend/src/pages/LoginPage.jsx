import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { loginSuccess, setError, setLoading } from "../store/slices/authSlice";
import SocialButton from "../components/UI/SocialButton.jsx";
import LoginForm from "../components/Forms/LoginForm.jsx";
import Modal from "../components/Modals/Modal.jsx";
import Loader from "../components/Loaders/Loader.jsx";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [modal, setModal] = useState({ show: false, type: "", message: "" });

    const handleLogin = async () => {
        dispatch(setLoading(true));
    
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email: formData.email,
                password: formData.password
            });
    
            if (response.status === 200) {
                const { token, user } = response.data;
    
                // Dispatch Redux action
                dispatch(loginSuccess({ user, token }));
    
                setModal({
                    show: true,
                    message: "Login Successful!",
                    type: "success"
                });
    
                // Delay navigation by 1 second
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            }
        } catch (error) {
            console.error("Login error:", error);
    
            const errorMessage = error.response?.data?.message;
            
            dispatch(setError(errorMessage));
    
            setModal({
                show: true,
                message: errorMessage,
                type: "error"
            });
        } finally {
            dispatch(setLoading(false));
        }
    };
    

    const onClose = () => {
        setModal({ show: false, type: "", message: "" });
    };

    return (
        <div className="flex h-screen items-center justify-center p-4">
              {loading && <Loader />}
            <div className="w-full max-w-[400px] bg-[#ffe2e2] px-8 py-14 rounded-xl shadow-[10px_10px_20px_rgba(0,0,0,0.3)] flex flex-col">
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Welcome Back</h2>

                <LoginForm
                    onSubmit={handleLogin}
                    formData={formData}
                    setFormData={setFormData}
                />

                <div className="mt-4 text-center text-gray-600 text-sm">
                    Don't have an account? <Link to="/signup" className="text-[#10c1bb] font-medium">Sign Up</Link>
                </div>

                <div className="my-2 text-center text-gray-600 text-sm">Or login with</div>
                <SocialButton />

            </div>

            {modal.show && <Modal message={modal.message} type={modal.type} onClose={onClose} />}
        </div>
    );
};

export default LoginPage;
