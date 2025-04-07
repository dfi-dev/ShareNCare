import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser } from "../store/actions/authActions";
import SocialButton from "../components/UI/SocialButton.jsx";
import LoginForm from "../components/Forms/LoginForm.jsx";
import Modal from "../components/Modals/Modal.jsx";
import Loader from "../components/Loaders/Loader.jsx";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [modal, setModal] = useState({ show: false, type: "", message: "" });

  const handleLogin = async () => {
    try {
      await dispatch(loginUser(formData));

      setModal({
        show: true,
        type: "success",
        message: "Login successful! Redirecting...",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setModal({
        show: true,
        type: "error",
        message: err.message || "Login failed. Please try again.",
      });
    }
  };

  const onClose = () => {
    setModal({ show: false, type: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-200/50 dark:bg-indigo-900/20"
            initial={{
              scale: 0,
              x: Math.random() * 1000 - 500,
              y: Math.random() * 1000 - 500,
            }}
            animate={{
              scale: 1,
              x: [null, Math.random() * 200 - 100],
              y: [null, Math.random() * 200 - 100],
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
            }}
          />
        ))}
      </motion.div>

      {loading && <Loader />}
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, type: "spring", damping: 10 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/50">
            <div className="p-8">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-block mb-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                      />
                    </svg>
                  </div>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
                >
                  Welcome Back!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 dark:text-gray-300"
                >
                  Sign in to continue your journey
                </motion.p>
              </div>

              <LoginForm
                onSubmit={handleLogin}
                formData={formData}
                setFormData={setFormData}
                isPasswordCorrect={formData.password.length > 0}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-center text-sm"
              >
                <Link
                  to="/forgot-password"
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center my-6"
              >
                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                <span className="mx-4 text-gray-500 dark:text-gray-400 text-sm">or continue with</span>
                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <SocialButton />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400"
              >
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                >
                  Sign Up
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {modal.show && (
        <Modal
          message={modal.message}
          type={modal.type}
          onClose={onClose}
          autoClose={modal.type === "success" ? 1500 : 3000}
        />
      )}
    </div>
  );
};

export default LoginPage;