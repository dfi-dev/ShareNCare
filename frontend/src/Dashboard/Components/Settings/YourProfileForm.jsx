import React, { useEffect, useState } from "react";
import UploadBox from "./UploadBox";
import FormInput from "../FormInput";
import CustomSelect from "../CustomSelect";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSnackbar } from '../../Components/SnackbarContext';
import Loader from '../../Components/Loader'
import axios from "axios";


export default function YourProfileForm() {
    const { showSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [formValues, setFormValues] = useState({
        firstName: "Sourabh",
        lastName: "Singh",
        jobTitle: "Developer",
        timeZone: "",
        profilePicture: null,
        email: ""
    });


    const handleChange = (key, value) => {
        setFormValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleProfileSave = () => {
        console.log("Profile saved:", {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            jobTitle: formValues.jobTitle,
            profilePicture: formValues.profilePicture
        });
    };

    const handleCredentialsSave = async () => {
        const { email, oldPassword, password, confirmPassword } = formValues;

        if (!email) {
            showSnackbar("Email is required.", "error");
            return;
        }

        if (showPasswordFields) {
            if (!oldPassword || !password || !confirmPassword) {
                showSnackbar("Please fill all password fields.", "error");
                return;
            }
            if (password !== confirmPassword) {
                showSnackbar("Passwords do not match.", "error");
                return;
            }
        }

        try {
            const payload = { email };
            if (showPasswordFields) {
                payload.old_password = oldPassword;
                payload.new_password = password;
                payload.new_password_confirmation = confirmPassword;
            }

            const res = await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/auth/profile/credentials`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );

            showSnackbar("Credentials updated successfully.", "success");
            console.log(res.data);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Something went wrong.";
            showSnackbar(errorMessage, "error");
        }
    };


    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true); // Start loading before the request
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });

                const { user } = res.data;

                setFormValues((prev) => ({
                    ...prev,
                    email: user.email || "",
                }));
            } catch (err) {
                console.error("Failed to fetch profile", err);
                showSnackbar("Failed to load profile info.", "error");
            } finally {
                setLoading(false); // Stop loading after the request completes or fails
            }
        };

        fetchProfile();
    }, []);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-[300px]">
                <Loader />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* PROFILE Section */}
            <h3 className="text-[14px] text-gray-500 leading-relaxed font-semibold">PROFILE</h3>
            <div className="bg-white rounded-[6px] shadow-md px-8 py-6 space-y-6">
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Profile picture</p>
                    <UploadBox
                        label="Profile Picture"
                        buttonText="Upload an image"
                        accept="image/*"
                        maxSizeMB={3}
                        onChange={(file) => handleChange("profilePicture", file)}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        Maximum file size 3MB - acceptable file types .jpg, .jpeg, .gif, .png.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <FormInput
                        label="* First/Preferred name"
                        value={formValues.firstName}
                        onChange={(val) => handleChange("firstName", val)}
                    />
                    <FormInput
                        label="* Last name"
                        value={formValues.lastName}
                        onChange={(val) => handleChange("lastName", val)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col justify-between">
                        <FormInput
                            label="Job title"
                            value={formValues.jobTitle}
                            onChange={(val) => handleChange("jobTitle", val)}
                        />
                        <div className="h-[20px]" />
                    </div>
                    <div className="flex flex-col justify-between">
                        <FormInput
                            label="Status"
                            value={"Active"}
                            onChange={(val) => handleChange("jobTitle", val)}
                        />
                    </div>
                </div>

                {/* Save Button for Profile */}
                <div className="pt-4">
                    <button
                        className="bg-teal-600 text-white px-5 py-2 text-sm rounded 
                   hover:bg-teal-700 disabled:bg-teal-600 disabled:cursor-not-allowed"
                        onClick={handleProfileSave}
                        disabled={true} // 👈 just for testing; replace with your condition
                    >
                        Save Profile
                    </button>
                </div>

            </div>

            {/* CREDENTIALS Section */}
            <h3 className="text-[14px] text-gray-500 leading-relaxed font-semibold">CREDENTIALS</h3>
            <div className="bg-white rounded-[6px] shadow-md px-8 py-6 space-y-6">

                {/* Email + Old Password Row */}
                <div className="grid grid-cols-2 gap-6">
                    <FormInput
                        label="* Email"
                        type="email"
                        value={formValues.email}
                        onChange={(val) => handleChange("email", val)}
                    />
                    {showPasswordFields && (
                        <FormInput
                            label="Old Password"
                            type="password"
                            value={formValues.oldPassword}
                            onChange={(val) => handleChange("oldPassword", val)}
                        />
                    )}
                </div>

                {/* Toggle Password Button */}
                <button
                    type="button"
                    className="text-sm text-gray-600 inline-flex items-center space-x-1 focus:outline-none"
                    onClick={() => {
                        setShowPasswordFields((prev) => {
                            const newState = !prev;

                            if (newState) {
                                setFormValues((prev) => ({
                                    ...prev,
                                    oldPassword: "",
                                    password: "",
                                    confirmPassword: ""
                                }));
                            } else {
                                setFormValues(({ oldPassword, password, confirmPassword, ...rest }) => rest);
                            }

                            return newState;
                        });
                    }}
                >
                    <span className="text-sm hover:underline">Update your password</span>
                    {showPasswordFields ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {/* New + Confirm Password Row */}
                {showPasswordFields && (
                    <div className="grid grid-cols-2 gap-6">
                        <FormInput
                            label="New Password"
                            type="password"
                            value={formValues.password}
                            onChange={(val) => handleChange("password", val)}
                        />
                        <FormInput
                            label="Password Confirmation"
                            type="password"
                            value={formValues.confirmPassword}
                            onChange={(val) => handleChange("confirmPassword", val)}
                        />
                    </div>
                )}

                {/* Save Button */}
                <div className="pt-4">
                    <button
                        className="bg-teal-600 text-white hover:bg-teal-700 px-5 py-2 text-sm rounded"
                        onClick={handleCredentialsSave}
                    >
                        Save Changes
                    </button>
                </div>
            </div>


        </div>
    );
}
