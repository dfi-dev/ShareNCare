import { motion } from "framer-motion";
import { Heart, Calendar, Droplet, CheckCircle2, Smile, Handshake, Users } from "lucide-react";

const DonorDashboard = () => {
  const OptionCard = ({ title, description, icon: Icon, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 12px 25px rgba(0,0,0,0.1)" }}
      className="w-full min-h-[140px] max-h-[140px] bg-white rounded-lg shadow-md border transition cursor-pointer group hover:shadow-lg flex justify-between items-center"
      onClick={onClick}
    >
      <div className="flex items-center gap-4 px-6 py-4 w-full">
        <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition">
          <Icon size={28} className="text-blue-500" />
        </div>
        <div className="w-full">
          <h2 className="text-base font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 my-10 md:p-12 text-gray-900">

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <OptionCard
          title="Make a Donation"
          description="Donate essentials or blood to help others."
          icon={Heart}
          onClick={() => alert("Navigate to donation form")}
        />

        <OptionCard
          title="Upcoming Drives"
          description="Explore and join upcoming donation events."
          icon={Calendar}
          onClick={() => alert("View upcoming drives")}
        />

        <OptionCard
          title="My Donations"
          description="Track your past donations and contributions."
          icon={CheckCircle2}
          onClick={() => alert("View donation history")}
        />

        <OptionCard
          title="Request Help"
          description="Ask for blood or essentials when in need."
          icon={Handshake}
          onClick={() => alert("Create a help request")}
        />

        <OptionCard
          title="My Impact"
          description="See the difference you've made by donating."
          icon={Smile}
          onClick={() => alert("View impact summary")}
        />

        <OptionCard
          title="Invite Friends"
          description="Spread the word and invite friends to donate."
          icon={Users}
          onClick={() => alert("Invite friends")}
        />
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Make a Difference 🌟</h2>
        <p className="text-md md:text-lg text-gray-600 mt-2">
          Your donations save lives. Join more drives.
        </p>
        <button className="mt-6 px-6 py-3 rounded-md bg-green-500 text-white hover:bg-green-600 transition shadow-md">
          <Droplet size={18} className="inline-block mr-2" />
          <span className="text-sm">Join a Drive</span>
        </button>
      </div>
    </div>
  );
};

export default DonorDashboard;
