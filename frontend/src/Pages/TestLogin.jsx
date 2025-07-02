import React, { useState } from "react";
import axios from "axios";

export default function TestLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axios.post("http://localhost:8000/api/v.1/login", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Test Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-500 text-sm break-all">
            <strong>Error:</strong> {JSON.stringify(error)}
          </div>
        )}

        {response && (
          <div className="mt-4 text-green-600 text-sm break-all">
            <strong>Success:</strong> <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
