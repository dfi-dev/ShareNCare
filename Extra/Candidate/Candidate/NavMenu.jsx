import React, { useState } from 'react';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';
import 'react-tooltip/dist/react-tooltip.css';
import CandidateActionsBar from './CandidateActionsBar';
import { NoData } from './NoData';
import { AnimatePresence, motion } from 'framer-motion';



export default function NavMenu() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [candidateData, setCandidateData] = useState(null);

  const handleBack = () => {
    console.log("handle back")
  };

  const fadeVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };


  return (
    <div className="min-h-screen flex flex-col bg-[#f6f6f6]">
      <div className="w-full max-w-6xl mx-auto py-8 px-4 flex-grow flex flex-col space-y-6">
        <button onClick={handleBack} className="flex items-center gap-1 text-sm text-gray-600">
          <ArrowLeft className="w-4 h-4" />
          Back to candidates
        </button>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Section (2/3 Width on md+) */}
          <div className="md:col-span-3 space-y-6">
            {/* Top Header */}
            <CandidateActionsBar />


            {/* Candidate Card */}
            <div className="bg-white px-8 py-12 rounded-xl shadow-sm flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Candidate" className="w-20 h-20 rounded-full object-cover" />

              <div className="flex-grow text-center md:text-left">
                <h2 className="text-md font-semibold"> {candidateData?.candidate?.first_name || "John"} {candidateData?.candidate?.last_name || "Doe"} </h2>

                <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-6 text-gray-700">
                  <p className="flex items-center text-xs">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {candidateData?.candidate?.location || "Not specified"}
                  </p>
                  <p className="flex items-center text-xs">
                    <PhoneIcon className="w-4 h-4 mr-1" />
                    +91  {candidateData?.candidate?.phone || "0 000 000 0000"}
                  </p>
                </div>

                <p className="text-xs text-blue-500 mt-1">#referrals</p>
              </div>

              <div className="text-center md:text-right">
                <button className="flex items-center text-sm text-gray-600 bg-[#f6f6f6] border px-2 py-1 rounded-md">
                  <UserPlus size={16} className="mr-1" />
                  0 <span className="ml-1 text-sm">Follow</span>
                </button>
                <p className="leading-tight mt-1 text-left">
                  <span className="text-[#050359] text-xs">{candidateData?.candidate?.designation || "No designation"}</span><br />
                  <span className="text-gray-600 text-xs">{candidateData?.job_post?.source_id || "Sourced"}</span>
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="border-b flex flex-wrap">
                {['Profile', 'Timeline', 'Communication', 'Review', 'Comments'].map(tab => (
                  <button
                    key={tab}
                    className={`px-4 py-4 text-sm font-medium ${activeTab === tab
                      ? 'border-b-2 border-emerald-600 text-emerald-600'
                      : 'text-gray-500'
                      }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={fadeVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="p-4"
                >
                  {activeTab === "Profile" && (
                    candidateData?.candidate
                      ? <div> Profile Tab </div>
                      : <NoData type="Profile" />
                  )}

                  {activeTab === "Timeline" && (
                    false
                      ? <div>Timeline Tab</div>
                      : <NoData type="Timeline" />
                  )}

                  {activeTab === "Communication" && (
                    false
                      ? <div>Communication Tab</div>
                      : <NoData type="Communication" />
                  )}

                  {activeTab === "Review" && (
                    false
                      ? <div>Review Tab</div>
                      : <NoData type="Review" />
                  )}

                  {activeTab === "Comments" && (
                    false
                      ? <div>Comments Tab</div>
                      : <NoData type="Comments" />
                  )}
                </motion.div>
              </AnimatePresence>



            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 bg-white rounded-xl shadow-sm p-4 h-fit border-l border-gray-200">
            <h4 className="text-md font-semibold mb-2 text-center md:text-center">Candidate Overview</h4>

            {/* Horizontal line */}
            <div className="border-t border-gray-200 my-3" />

            <p className="text-sm text-gray-400 text-center md:text-center">No Activity Yet</p>
          </div>

        </div>


      </div>
    </div>
  );


}
