import { CalendarDays, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ActionButton from '../../Components/ActionButton';

export default function TimeOffRequestModal({ onClose }) {
    const [selectedType, setSelectedType] = useState('');
    const [note, setNote] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selecting, setSelecting] = useState('start');
    const [hoverDate, setHoverDate] = useState(null);
    const [isClosing, setIsClosing] = useState(false);
    const [firstDayType, setFirstDayType] = useState('full');
    const [lastDayType, setLastDayType] = useState('full');
    const totalPaidTimeOff = 12; // This could be fetched from API

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const [leftMonth, setLeftMonth] = useState({ month: currentMonth, year: currentYear });
    const [rightMonth, setRightMonth] = useState({
        month: (currentMonth + 1) % 12,
        year: currentMonth === 11 ? currentYear + 1 : currentYear
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const monthName = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${monthName} ${year}`;
    };
    const calculateRequestedDays = () => {
        if (!startDate || !endDate) return 0;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = end.getTime() - start.getTime();
        const totalDays = diffTime / (1000 * 60 * 60 * 24) + 1;

        let adjustedDays = totalDays;

        if (firstDayType === 'half') adjustedDays -= 0.5;
        if (lastDayType === 'half') adjustedDays -= 0.5;

        return adjustedDays;
    };

    const handleDateClick = (date) => {
        if (selecting === 'start') {
            setStartDate(date);
            setEndDate(null);
            setSelecting('end');
        } else {
            const startTimestamp = new Date(startDate).getTime();
            const selectedTimestamp = new Date(date).getTime();

            if (selectedTimestamp < startTimestamp) {
                setStartDate(date);
                setEndDate(null);
                setSelecting('end');
            } else {
                setEndDate(date);
                setSelecting('start');
            }
        }
    };

    function handleClose() {
        setIsClosing(true); // trigger shrink animation
        setTimeout(() => {
            onClose(); // after animation (200ms), unmount
        }, 200); // match your shrinkToBottom animation duration
    }

    const handlePrev = () => {
        setLeftMonth(prev => {
            const newMonth = prev.month - 1;
            return newMonth < 0 ? { month: 11, year: prev.year - 1 } : { month: newMonth, year: prev.year };
        });
        setRightMonth(prev => {
            const newMonth = prev.month - 1;
            return newMonth < 0 ? { month: 11, year: prev.year - 1 } : { month: newMonth, year: prev.year };
        });
    };

    const handleNext = () => {
        setLeftMonth(prev => {
            const newMonth = prev.month + 1;
            return newMonth > 11 ? { month: 0, year: prev.year + 1 } : { month: newMonth, year: prev.year };
        });
        setRightMonth(prev => {
            const newMonth = prev.month + 1;
            return newMonth > 11 ? { month: 0, year: prev.year + 1 } : { month: newMonth, year: prev.year };
        });
    };

    const handleSave = () => {
        alert(`Start Date: ${startDate || 'Not selected'}\nEnd Date: ${endDate || 'Not selected'}`);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#313b46e6]">
            {/* Floating Close Button */}
            <button
                onClick={handleClose}
                className="absolute top-4 right-4 bg-transparent p-1.5 hover:bg-opacity-100 transition text-white"
            >
                <X className="w-6 h-6" />
            </button>

            <div className={`relative w-full max-w-screen-2xl h-[90vh] bg-white rounded-t-2xl shadow-lg flex flex-col ${isClosing ? 'animate-shrinkToBottom' : 'animate-growFromBottom'}`}>

                {/* Header */}
                <div className="sticky top-0 bg-white px-8 py-6 border-b flex items-start justify-between rounded-t-2xl">
                    <h2 className="text-2xl font-semibold text-gray-900">Request time off</h2>
                    <ActionButton
                        label="Request time off"
                        onClick={handleSave}
                        isLoading={false}
                        className="w-[170px] h-[38px] px-[20px]"
                        labelClassName="text-sm"
                    />
                </div>

                {/* Content */}
                <div className="overflow-auto flex-1">
                    <div className="px-8 py-6 w-[850px] mx-auto space-y-6">

                        {/* Time Off Type */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Time Off Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full border border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-100 rounded-md px-3 py-2 text-sm text-gray-800 transition"
                            >
                                <option value="">Select a Time Off Type</option>
                                {['Paid Time Off', 'Sick Leave', 'Unpaid Leave'].map((label, i) => (
                                    <option key={i} value={label.toLowerCase()}>{label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Time Off Period */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Time Off Period <span className="text-red-500">*</span></label>

                            <div className="border border-gray-300 rounded-lg px-4 py-6 space-y-6">
                                {/* Date Range */}
                                <div className="flex items-center justify-between bg-[#f3f5f8] rounded px-3 py-2 text-sm text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <span className='text-sm'>
                                            {startDate ? formatDate(startDate) : 'Start date'}
                                        </span>
                                        <span>-</span>
                                        <span className='text-sm'>
                                            {endDate ? formatDate(endDate) : 'End date'}
                                        </span>
                                    </div>

                                    {(startDate || endDate) ? (
                                        <button
                                            onClick={() => {
                                                setStartDate(null);
                                                setEndDate(null);
                                                setSelecting('start');
                                            }}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <X size={16} />
                                        </button>
                                    ) : (
                                        <CalendarDays className="w-4 h-4 text-gray-500" />
                                    )}
                                </div>


                                {/* Calendars */}
                                <div className="flex gap-8 justify-between">
                                    {/* Left Calendar */}
                                    <div>
                                        <div className="flex items-center justify-between text-gray-700 font-medium mb-2 uppercase">
                                            <button onClick={handlePrev} className="px-2">{'<'}</button>
                                            <span className="text-sm">
                                                {monthNames[leftMonth.month]} {leftMonth.year}
                                            </span>
                                            <div className="w-4" />
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
                                            <div className="w-4" />
                                            <span className="text-sm">
                                                {monthNames[rightMonth.month]} {rightMonth.year}
                                            </span>
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

                                {/* First / Last Day */}
                                {/* First / Last Day */}
                                {startDate && endDate && (
                                    <div className="flex flex-wrap gap-8">
                                        <div className="flex-1 min-w-[200px]">
                                            <label className="block text-sm font-medium mb-1 text-gray-700">First day</label>
                                            <select
                                                value={firstDayType}
                                                onChange={(e) => setFirstDayType(e.target.value)}
                                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800"
                                            >
                                                <option value="full">Full day</option>
                                                <option value="half">Half day</option>
                                            </select>
                                        </div>

                                        <div className="flex-1 min-w-[200px]">
                                            <label className="block text-sm font-medium mb-1 text-gray-700">Last day</label>
                                            <select
                                                value={lastDayType}
                                                onChange={(e) => setLastDayType(e.target.value)}
                                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800"
                                            >
                                                <option value="full">Full day</option>
                                                <option value="half">Half day</option>
                                            </select>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>


                        {/* Summary */}
                        {selectedType === 'paid time off' && startDate && endDate && (
                            <div className="flex items-center gap-4 bg-blue-50 border border-blue-100 rounded px-6 py-5 mt-4">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="w-8 h-8 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                    </svg>
                                </div>
                                <div className="text-gray-800 space-y-1">
                                    <div className="font-medium text-sm">
                                        You’re requesting <span className="text-blue-700 font-semibold">{calculateRequestedDays()} days off</span>.
                                    </div>
                                    <div className="text-sm">
                                        You’ll have <span className="text-blue-700 font-semibold">
                                            {(totalPaidTimeOff - calculateRequestedDays()).toFixed(1)} days
                                        </span> of Paid time off remaining.
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* Note */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Note</label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Write an exceptional note"
                                className="w-full text-sm border border-gray-300 rounded px-3 py-2 h-20"
                            />
                        </div>
                    </div>
                </div>
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