import { X } from 'lucide-react';
import React, { useState } from 'react';

export default function TimeOffTypeModal() {
    const [selectedType, setSelectedType] = useState('');
    const [note, setNote] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selecting, setSelecting] = useState('start'); // 'start' or 'end'
    const [hoverDate, setHoverDate] = useState(null); // shared hoverDate

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const [leftMonth, setLeftMonth] = useState({ month: currentMonth, year: currentYear });
    const [rightMonth, setRightMonth] = useState({
        month: (currentMonth + 1) % 12,
        year: currentMonth === 11 ? currentYear + 1 : currentYear
    });

    const formatDate = (dateStr) => {
        if (!dateStr) return '';

        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const monthName = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${monthName} ${year}`;
    };


    const handleDateClick = (date) => {
        if (selecting === 'start') {
            setStartDate(date);
            setEndDate(null); // reset end when picking new start
            setSelecting('end');
        } else {
            // If user selects end date BEFORE start → swap
            const startTimestamp = new Date(startDate).getTime();
            const selectedTimestamp = new Date(date).getTime();

            if (selectedTimestamp < startTimestamp) {
                // If user picks end date earlier than start, treat it as new start
                setStartDate(date);
                setEndDate(null);
                setSelecting('end');
            } else {
                // Normal flow
                setEndDate(date);
                setSelecting('start');
            }
        }
    };


    const handleSave = () => {
        alert(`Start Date: ${startDate || 'Not selected'}\nEnd Date: ${endDate || 'Not selected'}`);
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handlePrev = () => {
        setLeftMonth(prev => {
            const newMonth = prev.month - 1;
            if (newMonth < 0) {
                return { month: 11, year: prev.year - 1 };
            } else {
                return { month: newMonth, year: prev.year };
            }
        });

        setRightMonth(prev => {
            const newMonth = prev.month - 1;
            if (newMonth < 0) {
                return { month: 11, year: prev.year - 1 };
            } else {
                return { month: newMonth, year: prev.year };
            }
        });
    };

    const handleNext = () => {
        setLeftMonth(prev => {
            const newMonth = prev.month + 1;
            if (newMonth > 11) {
                return { month: 0, year: prev.year + 1 };
            } else {
                return { month: newMonth, year: prev.year };
            }
        });

        setRightMonth(prev => {
            const newMonth = prev.month + 1;
            if (newMonth > 11) {
                return { month: 0, year: prev.year + 1 };
            } else {
                return { month: newMonth, year: prev.year };
            }
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative space-y-6">

                <h2 className="text-xl font-semibold">Time Off Type</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time Off Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full border border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-100 rounded-md px-3 py-2 text-sm text-gray-800 transition duration-150"
                    >
                        <option value="">Select a Time Off Type</option>
                        {['Paid Time Off', 'Sick Leave', 'Unpaid Leave'].map((label, i) => (
                            <option key={i} value={label.toLowerCase()}>{label}</option>
                        ))}
                    </select>
                </div>


                <div>
                    <div className="flex items-center justify-between border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm">
                                {startDate ? formatDate(startDate) : 'Start date'}
                            </span>
                            <span>-</span>
                            <span className="text-sm">
                                {endDate ? formatDate(endDate) : 'End date'}
                            </span>
                        </div>
                        {(startDate || endDate) && (
                            <button
                                onClick={() => {
                                    setStartDate(null);
                                    setEndDate(null);
                                    setSelecting('start');
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>



                    <div className="flex gap-8 justify-between">
                        {/* Left Calendar */}
                        <div>
                            <div className="flex items-center justify-between text-gray-700 font-medium mb-2 uppercase">
                                <button onClick={handlePrev} className="px-2">{'<'}</button>
                                <span className='text-sm'>{monthNames[leftMonth.month]} {leftMonth.year}</span>
                                <div className="w-4" /> {/* spacer */}
                            </div>
                            <Calendar
                                month={leftMonth.month}
                                year={leftMonth.year}
                                onDateClick={handleDateClick}
                                startDate={startDate}
                                endDate={endDate}
                                hoverDate={hoverDate}
                                setHoverDate={setHoverDate}
                            />
                        </div>

                        {/* Right Calendar */}
                        <div>
                            <div className="flex items-center justify-between text-gray-700 font-medium mb-2 uppercase">
                                <div className="w-4" /> {/* spacer */}
                                <span className='text-sm'>{monthNames[rightMonth.month]} {rightMonth.year}</span>
                                <button onClick={handleNext} className="px-2">{'>'}</button>
                            </div>
                            <Calendar
                                month={rightMonth.month}
                                year={rightMonth.year}
                                onDateClick={handleDateClick}
                                startDate={startDate}
                                endDate={endDate}
                                hoverDate={hoverDate}
                                setHoverDate={setHoverDate}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Note</label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Write an exceptional note"
                        className="w-full text-sm border border-gray-300 rounded px-3 py-2 h-20"
                    />
                </div>

                <div className="flex justify-start">
                    <button
                        onClick={handleSave}
                        className="bg-teal-700 hover:bg-teal-600 text-sm text-white font-medium px-5 py-2 rounded"
                    >
                        Save
                    </button>
                </div>

                <button
                    onClick={() => {
                        // You can add onClose() here if needed
                        console.log('Modal close clicked');
                    }}
                    className="absolute px-2 top-1 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={20} />
                </button>

            </div>
        </div>
    );
}

function Calendar({ month, year, onDateClick, startDate, endDate, hoverDate, setHoverDate }) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const days = [];

    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        days.push(d);
    }

    const startTimestamp = startDate ? new Date(startDate).getTime() : null;
    const endTimestamp = endDate ? new Date(endDate).getTime() : null;

    const effectiveEnd = (!endDate && hoverDate && startTimestamp && hoverDate >= startTimestamp)
        ? hoverDate
        : endTimestamp;

    const ONE_DAY = 24 * 60 * 60 * 1000;
    const isAdjacent = startTimestamp && effectiveEnd && (effectiveEnd - startTimestamp === ONE_DAY);

    return (
        <div className="grid grid-cols-7 text-center text-xs gap-y-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-sm px-2 text-gray-600">{day}</div>
            ))}
            {days.map((date, index) => {
                if (date === null) {
                    return <div key={index} />;
                }

                const currentDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                const currentTimestamp = new Date(currentDateStr).getTime();

                const inRange =
                    startTimestamp &&
                    effectiveEnd &&
                    currentTimestamp >= Math.min(startTimestamp, effectiveEnd) &&
                    currentTimestamp <= Math.max(startTimestamp, effectiveEnd);

                const isStart = currentTimestamp === startTimestamp;
                const isEnd = currentTimestamp === endTimestamp;
                const isHoverEnd = !endDate && hoverDate && currentTimestamp === hoverDate;

                const isToday =
                    new Date().getDate() === date &&
                    new Date().getMonth() === month &&
                    new Date().getFullYear() === year;

                let classes = "cursor-pointer text-sm py-1 px-1 text-gray-800 ";

                if (inRange) {
                    classes += "bg-teal-100 ";
                }

                // Rounding logic
                if (isStart && (isEnd || isHoverEnd)) {
                    classes += "bg-teal-700 text-white font-bold rounded-sm ";
                } else if (isStart) {
                    if (isAdjacent) {
                        classes += "bg-teal-700 text-white font-bold rounded-l-sm ";
                    } else {
                        classes += "bg-teal-700 text-white font-bold rounded-sm ";
                    }
                } else if (isEnd || isHoverEnd) {
                    if (isAdjacent) {
                        classes += "bg-teal-700 text-white font-bold rounded-r-sm ";
                    } else {
                        classes += "bg-teal-700 text-white font-bold rounded-sm ";
                    }
                } else if (inRange) {
                    classes += "rounded-none ";
                } else {
                    classes += "rounded-sm ";
                }

                if (isToday && !inRange && !isStart && !(isEnd || isHoverEnd)) {
                    classes += " border border-teal-600 ";
                }

                const isStartOrEnd = isStart || isEnd || isHoverEnd;

                classes += isStartOrEnd
                    ? "hover:bg-gray-500 "
                    : "hover:bg-teal-500 ";

                return (
                    <div
                        key={index}
                        onClick={() => onDateClick(currentDateStr)}
                        onMouseEnter={() => {
                            if (startTimestamp && !endDate && currentTimestamp >= startTimestamp) {
                                setHoverDate(currentTimestamp);
                            }
                        }}
                        onMouseLeave={() => setHoverDate(null)}
                        className={classes}
                    >
                        {date}
                    </div>
                );
            })}
        </div>
    );
}




