import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loaders/Loader";
import Modal from "../components/Modals/Modal";

const ConfirmEmailPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ show: false, type: "", message: "" });

    useEffect(() => {
        const confirmEmail = async () => {
            const token = searchParams.get("token");
            
            if (!token) {
                setModal({
                    show: true,
                    type: "error",
                    message: "Invalid or missing token!"
                });
                setLoading(false);
                return;
            }

            try {
                const response = await axios.post("http://localhost:5000/api/auth/confirm-email", { token });

                if (response.status === 200) {
                    setModal({
                        show: true,
                        type: "success",
                        message: response.data.message || "Email confirmed successfully!"
                    });

                    setTimeout(() => {
                        navigate("/login");  // Redirect after confirmation
                    }, 2000);
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || "Email confirmation failed!";
                setModal({
                    show: true,
                    type: "error",
                    message: errorMessage
                });
            } finally {
                setLoading(false);
            }
        };

        confirmEmail();
    }, [searchParams, navigate]);

    return (
        <div className="flex h-screen items-center justify-center p-4">
            {loading ? (
                <Loader />
            ) : (
                modal.show && (
                    <Modal
                        type={modal.type}
                        message={modal.message}
                        onClose={() => navigate("/login")}
                    />
                )
            )}
        </div>
    );
};

export default ConfirmEmailPage;
