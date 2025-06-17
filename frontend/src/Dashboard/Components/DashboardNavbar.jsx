import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import UserMenu from './UserMenu';
import { useSnackbar } from './SnackbarContext';
import axios from 'axios';
import Loader from './Loader';

const DashboardNavbar = ({ username }) => {
  const navigate = useNavigate()
  const { showSnackbar } = useSnackbar()
  const location = useLocation();
  const [path, setPath] = useState('dashboard')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const pathname = location.pathname.split("/");
    if (pathname.length > 2) {
      setPath(pathname[2]);
    } else {
      setPath(pathname[1]);
    }
  }, [location.pathname])


  const handleLogout = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/logout`, {}, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("access_token"),
        }
      })
      if (response.status === 200) {
        showSnackbar(response.data.message, "success")
        navigate("/signin")
      } else {
        showSnackbar("Error while Logout", "error")
      }
    } catch (error) {
      showSnackbar(error.response.data.message, "error")
    }
    setLoading(false)
  }

  return (
    <div className='w-full bg-black shadow-lg flex justify-center items-center'>
      {
        loading
          ?
          <Loader message={"Getting you logged out..."} />
          :
          <></>
      }
      
    </div>
  )
}

export default DashboardNavbar
