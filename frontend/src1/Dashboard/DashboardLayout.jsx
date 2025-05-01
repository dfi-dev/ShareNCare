// src/components/Layout.js
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Loader from "./Components/Loader";
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardLayout = () => {
  const [access_token, setAccessToken] = useState(null);
  const [username,setUsername] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(()=>{
    cache_cleaner()
    const accessToken = localStorage.getItem('access_token')
    setAccessToken(accessToken)
    if(!accessToken){
      // navigate("/signin")
      console.log("signin")
    }    
    const user = localStorage.getItem('email')
    setUsername(user)
  },[location.pathname])


  // make an api call to verify the token and if failed then redirect to signin page
  const cache_cleaner = async()=>{
    try {
      const response = await axios.get("https://bipani.com/api/v.1/cacheclear",{
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("access_token"),
        }
      })
      if(response.status!=200){
        // navigate("/signin")
        console.log("signin")
      }
    } catch (error) {
      // navigate("/signin")
      console.log("signin")
    }
  }
  
  return (
    <>
    {
      !access_token
      ?
        <Loader />
      :
      <div className=" flex flex-col justify-center items-center relative">
        <main className="w-full max-w-[1700px] bg-[#F3F3F3]">
          <Outlet username={username} /> {/* This will render the child route (page) */}
        </main>
      </div>
    }
    </>
  );
};

export default DashboardLayout;
