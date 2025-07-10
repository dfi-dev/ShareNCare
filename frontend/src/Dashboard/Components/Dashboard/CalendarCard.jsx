import React, { useState } from "react";
import { CalendarClock, CalendarDays } from "lucide-react";
import CreateTodoModal from "./CreateTodoModal";
import EventCalendarModal from "./EventCalendarModal";
import { format } from "date-fns";


const CalendarCard = () => {
  const [activeTab, setActiveTab] = useState("Events");
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  const [events, setEvents] = useState([
    {
      time: "11:00 AM",
      title: "Induction Meeting",
      description: "Welcome session for new joiners.",
      date: new Date("2025-01-23T11:00:00"),
    },
    {
      time: "12:00 PM",
      title: "Interview Meeting with Candidate",
      description: "Tech round with senior engineer.",
      date: new Date("2025-01-23T12:00:00"),
    },
    {
      time: "01:30 PM",
      title: "Follow-up Call",
      description: "Client discussion and feedback review.",
      date: new Date("2025-01-23T13:30:00"),
    },
  ]);

  const [todoList, setTodoList] = useState([
    { title: "Prepare Report", done: false },
    { title: "Send Emails to Clients", done: false },
    { title: "Prepare Report", done: false },
    { title: "Send Emails to Clients", done: false },
    { title: "Prepare Report", done: false },
    { title: "Send Emails to Clients", done: false },
    { title: "Prepare Report", done: false },
    { title: "Send Emails to Clients", done: false },
    { title: "Prepare Report", done: false },
    { title: "Send Emails to Clients", done: false },
  ]);



  const handleCheckboxChange = (index) => {
    const updated = [...todoList];
    updated[index].done = !updated[index].done;
    setTodoList(updated);
  };

  const handleAddTodos = (newTodos) => {
    setTodoList([
      ...todoList,
      ...newTodos.map((t) => ({ title: t, done: false })),
    ]);
  };

  return (
    <div className="bg-white rounded-xl shadow">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#007a6e] rounded-full flex items-center justify-center text-white">
            <CalendarDays className="w-5 h-5" />
          </div>
          <p className="text-sm text-gray-800">Wednesday 23 Jan, 2025</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {["Events", "To Do"].map((label) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${activeTab === label
                ? "bg-[#007a6e] text-white"
                : "bg-[#F3F7F8] text-[#757575]"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Scrollable To-Do or Event List */}
        <div className="space-y-4 max-h-52 overflow-y-auto pr-2 scrollbar-enhanced">
          {activeTab === "Events" &&
            events.map((item, idx) => (
              <div key={idx}>
                <div className="flex gap-4 items-center px-2 py-2">
                  {/* Icon + Date/Time */}
                  <div className="flex items-center gap-2 w-40">
                    <div className="bg-[#007a6e] text-white p-1 rounded-full">
                      <CalendarClock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {format(new Date(item.date), "EEE, d MMM")}
                      </p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 leading-tight">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-xs text-gray-500">{item.description}</p>
                    )}
                  </div>
                </div>

                {/* Separator */}
                {idx < events.length - 1 && (
                  <div className="border-t border-gray-200 mx-2"></div>
                )}
              </div>
            ))}

          {activeTab === "To Do" && (
            <>
              {todoList.map((item, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 cursor-pointer px-2"
                >
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleCheckboxChange(idx)}
                    className="accent-[#007a6e] w-4 h-4"
                  />
                  <span
                    className={`text-sm ${item.done
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                      }`}
                  >
                    {item.title}
                  </span>
                </label>
              ))}

              {todoList.length === 0 && (
                <p className="text-sm text-gray-400 text-center">
                  No tasks available.
                </p>
              )}
            </>
          )}
        </div>

        {/* Sticky Button Below Scroll */}
        {activeTab === "To Do" && (
          <div className="sticky bottom-0 pt-2 bg-white">
            <button
              onClick={() => setShowTodoModal(true)}
              className="text-[#007a6e] text-sm font-medium hover:underline"
            >
              + Create New Task
            </button>
          </div>
        )}

        {activeTab === "Events" && (
          <div className="sticky bottom-0 pt-2 bg-white">
            <button
              onClick={() => setShowEventModal(true)}
              className="text-[#007a6e] text-sm font-medium hover:underline"
            >
              + Create New Event
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateTodoModal
        isOpen={showTodoModal}
        onClose={() => setShowTodoModal(false)}
        onSubmit={handleAddTodos}
      />

      <EventCalendarModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        onSubmit={(event) =>
          setEvents((prev) => [...prev, event])
        }
      />
    </div>
  );
};

export default CalendarCard;