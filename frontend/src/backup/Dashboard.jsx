import { motion } from "framer-motion";
import { LineChart, PieChart, Line, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Bell, Users, Heart, PlusCircle, Droplet } from "lucide-react";

const Dashboard = () => {
  const donationData = [
    { name: "Jan", donations: 45 },
    { name: "Feb", donations: 60 },
    { name: "Mar", donations: 80 },
    { name: "Apr", donations: 100 },
  ];

  const bloodData = [
    { name: "A+", value: 40 },
    { name: "B+", value: 30 },
    { name: "O+", value: 20 },
    { name: "AB-", value: 10 },
  ];

  const colors = ["#4ade80", "#60a5fa", "#facc15", "#f43f5e"];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-8 my-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Welcome, Admin 👋</h1>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            Donate
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
          >
            <Droplet className="w-5 h-5" />
            Blood Drive
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white p-2 rounded-full shadow-lg"
          >
            <Bell size={24} className="text-gray-600" />
          </motion.button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Donations", value: "1,240", icon: <Heart className="text-red-500" />, color: "from-red-100 to-red-200" },
          { title: "Blood Requests", value: "320", icon: <Droplet className="text-blue-500" />, color: "from-blue-100 to-blue-200" },
          { title: "Active Users", value: "540", icon: <Users className="text-green-500" />, color: "from-green-100 to-green-200" },
          { title: "Lives Impacted", value: "2,400", icon: <Heart className="text-pink-500" />, color: "from-pink-100 to-pink-200" },
        ].map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className={`bg-gradient-to-br ${card.color} p-6 rounded-xl shadow-lg transition-transform`}
          >
            <div className="flex justify-between items-center">
              {card.icon}
              <p className="text-4xl font-bold text-gray-800">{card.value}</p>
            </div>
            <p className="text-lg font-semibold text-gray-600 mt-2">{card.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-4">Donations Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={donationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="donations" stroke="#60a5fa" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-4">Blood Group Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bloodData}
                dataKey="value"
                nameKey="name"
                fill="#8884d8"
                label
              >
                {bloodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
