import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    // Default headers, can include things like Content-Type if required for most requests
    'Content-Type': 'application/json',
  },
});

// Generic GET request function (handles optional query params and custom headers)
export const getData = async (url, params = null, headers = null) => {
  try {
    const config = headers ? { params, headers } : { params };
    const response = await api.get(url, config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong';
  }
};

// Generic POST request function (handles request body data and custom headers)
export const postData = async (url, data = null, headers = null) => {
  try {
    const config = headers ? { headers } : {};
    const response = await api.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong';
  }
};

// Generic PUT request function (handles request body data and custom headers)
export const putData = async (url, data = null, headers = null) => {
  try {
    const config = headers ? { headers } : {};
    const response = await api.put(url, data, config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong';
  }
};

// Generic DELETE request function (handles optional query params and custom headers)
export const deleteData = async (url, params = null, headers = null) => {
  try {
    const config = headers ? { params, headers } : { params };
    const response = await api.delete(url, config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong';
  }
};

// Generic PATCH request function (handles request body data and custom headers)
export const patchData = async (url, data = null, headers = null) => {
  try {
    const config = headers ? { headers } : {};
    const response = await api.patch(url, data, config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong';
  }
};

// Example usage
const fetchExampleData = async () => {
  const data = await getData('/example', null, { Authorization: 'Bearer your-token' });
  console.log(data);
};

export default api;
