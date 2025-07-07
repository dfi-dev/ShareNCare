import React, { useEffect, useState } from 'react';
import TimeOffRequestModal from './TimeOffRequestModal';
import LeaveBalanceEditor from '../../Components/TimeOff/LeaveBalanceEditor';
import { EditIcon } from 'lucide-react';

export default function LeaveBalance() {
  const [showModal, setShowModal] = useState(false);
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCardId, setActiveCardId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetchDummyData();
    }, 1000);
  }, []);

  const fetchDummyData = () => {
    const mockData = [
      { type: 'Paid Time Off', remaining_days: 12 },
      { type: 'Sick Leave', remaining_days: 5 },
      { type: 'Unpaid Leave', remaining_days: 0 },
    ];

    const sorted = mockData
      .sort((a, b) => {
        const preferredOrder = ['Paid Time Off', 'Sick Leave', 'Unpaid Leave'];
        return preferredOrder.indexOf(a.type) - preferredOrder.indexOf(b.type);
      })
      .map((item) => ({
        id: item.type,
        name: item.type,
        value: Number(item.remaining_days),
        isUnlimited: item.type === 'Unpaid Leave',
        unit: 'Days available',
        active: item.type === 'Sick Leave',
      }));

    setLeaveBalances(sorted);
    setLoading(false);
  };

  return (
    <>
      <div className="bg-white p-6 border border-gray-200 space-y-6 rounded-b-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Time Off Balance</h2>
          <button
            onClick={() => setShowModal(true)}
            className="border border-teal-700 text-teal-700 px-4 py-[6px] rounded-full text-sm font-semibold hover:bg-teal-50"
          >
            Request Time Off
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-300 px-6 py-4 animate-pulse space-y-2"
              >
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-9 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {leaveBalances.map((leave) => (
              <div
                key={leave.id}
                className={`relative rounded-lg border px-6 py-4 ${leave.active
                  ? 'bg-teal-700 text-white border-teal-700'
                  : 'border-gray-400 text-black'
                  }`}
              >
                {/* Edit Icon */}
                {!leave.isUnlimited && (
                  <button
                    onClick={() =>
                      setActiveCardId((prev) =>
                        prev === leave.id ? null : leave.id
                      )
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
                  >
                    <EditIcon className="w-5 h-5" />
                  </button>
                )}

                {/* Card Content */}
                <div className="text-sm font-semibold mb-2">{leave.name}</div>
                <div className="text-3xl font-extrabold mb-1">
                  {leave.isUnlimited ? (
                    <span className="text-5xl font-extrabold leading-none">∞</span>
                  ) : (
                    leave.value
                  )}
                </div>
                <div className="text-sm">{leave.unit}</div>

                {/* Popup */}
                {activeCardId === leave.id && !leave.isUnlimited && (
                  <div className="absolute bottom-full mb-2 right-0 z-50">
                    <LeaveBalanceEditor
                      label={`Edit ${leave.name}`}
                      initialValue={typeof leave.value === 'number' ? leave.value : 0}
                      onSave={(updatedValue) => {
                        console.log("Updated via button:", updatedValue);
                      }}
                      onClose={() => setActiveCardId(null)}
                    />
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && <TimeOffRequestModal onClose={() => setShowModal(false)} />}
    </>
  );
}
