import { CalendarDays, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ActionButton from '../../Components/ActionButton';
import Calendar from '../../Components/TimeOff/CalendarSelector';

const TimeOffSchema = Yup.object().shape({
    selectedType: Yup.string().required('Time Off Type is required'),
    note: Yup.string(),
});

export default function TimeOffRequestModal({ onClose }) {
    const totalPaidTimeOff = 12;

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const [selecting, setSelecting] = useState('start');
    const [hoverDate, setHoverDate] = useState(null);
    const [isClosing, setIsClosing] = useState(false);
    const [firstDayType, setFirstDayType] = useState(1);
    const [lastDayType, setLastDayType] = useState(1);
    const [leftMonth, setLeftMonth] = useState({ month: currentMonth, year: currentYear });
    const [rightMonth, setRightMonth] = useState({
        month: (currentMonth + 1) % 12,
        year: currentMonth === 11 ? currentYear + 1 : currentYear,
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
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

    const calculateRequestedDays = (start, end) => {
        if (!start || !end) return 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        let totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
        if (firstDayType === 0.5) totalDays -= 0.5;
        if (lastDayType === 0.5) totalDays -= 0.5;
        return totalDays;
    };

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

    function handleClose() {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 200);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#313b46e6]">
            <button
                onClick={handleClose}
                className="absolute top-4 right-4 bg-transparent p-1.5 hover:bg-opacity-100 transition text-white"
            >
                <X className="w-6 h-6" />
            </button>

            <div className={`relative w-full max-w-screen-2xl h-[90vh] bg-white rounded-t-2xl shadow-lg flex flex-col ${isClosing ? 'animate-shrinkToBottom' : 'animate-growFromBottom'}`}>
                <Formik
                    initialValues={{ selectedType: '', note: '', startDate: null, endDate: null, dateRangeError: '' }}
                    validationSchema={TimeOffSchema}
                    validate={(values) => {
                        const errors = {};

                        if (!values.startDate && !values.endDate) {
                            errors.dateRangeError = 'Start and End dates are required';
                        } else if (!values.startDate) {
                            errors.dateRangeError = 'Start date is required';
                        } else if (!values.endDate) {
                            errors.dateRangeError = 'End date is required';
                        } else if (new Date(values.endDate) < new Date(values.startDate)) {
                            errors.dateRangeError = 'End date cannot be before start date';
                        }

                        return errors;
                    }}

                    onSubmit={(values) => {
                        const totalDays = calculateRequestedDays(values.startDate, values.endDate);
                        const payload = {
                            type: parseInt(values.selectedType),
                            start_date: values.startDate,
                            end_date: values.endDate,
                            first_day: firstDayType,
                            last_day: lastDayType,
                            total_days: totalDays,
                            total_hours: totalDays * 8,
                            note: values.note.trim()
                        };
                        console.log('Submitting payload:', payload);
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <Form className="flex flex-col flex-1 overflow-hidden">
                            <div className="sticky top-0 bg-white px-4 sm:px-6 md:px-8 py-6 border-b flex items-center justify-between flex-wrap gap-2 sm:gap-0 rounded-t-2xl">
                                <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">Request time off</h2>
                                <ActionButton
                                    label="Request time off"
                                    type="submit"
                                    isLoading={false}
                                    className="sm:w-[170px] h-[38px] px-[20px]"
                                    labelClassName="text-sm"
                                />
                            </div>

                            <div className="overflow-auto flex-1">
                                <div className="px-4 sm:px-6 md:px-8 py-6 w-full max-w-[850px] mx-auto space-y-6">
                                    {/* Time Off Type */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Time Off Type <span className="text-red-500">*</span>
                                        </label>
                                        <Field
                                            as="select"
                                            name="selectedType"
                                            className="w-full border border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-100 rounded-md px-3 py-2 text-sm text-gray-800 transition"
                                        >
                                            <option value="">Select a Time Off Type</option>
                                            <option value="1">Paid Time Off</option>
                                            <option value="2">Sick Leave</option>
                                            <option value="3">Unpaid Leave</option>
                                        </Field>
                                        <ErrorMessage name="selectedType" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>

                                    {/* Time Off Period */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Time Off Period <span className="text-red-500">*</span>
                                        </label>

                                        <div className="border border-gray-300 rounded-lg px-4 py-6 space-y-4">
                                            {/* Date Range */}
                                            <div className="flex items-center justify-between bg-[#f3f5f8] rounded px-3 py-2 text-sm text-gray-700">
                                                <div className="flex items-center gap-2">
                                                    <span className='text-sm'>{values.startDate ? formatDate(values.startDate) : 'Start date'}</span>
                                                    <span>-</span>
                                                    <span className='text-sm'>{values.endDate ? formatDate(values.endDate) : 'End date'}</span>
                                                </div>
                                                {(values.startDate || values.endDate) ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFieldValue('startDate', null);
                                                            setFieldValue('endDate', null);
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
                                            <ErrorMessage name="dateRangeError" component="div" className="text-red-500 text-xs" />

                                            {/* Calendars */}
                                            <div className="grid gap-6 sm:grid-cols-2">
                                                <div>
                                                    <div className="flex items-center justify-between text-gray-700 font-medium mb-2 uppercase">
                                                        <button type="button" onClick={handlePrev} className="px-2">{'<'}</button>
                                                        <span className="text-sm">{monthNames[leftMonth.month]} {leftMonth.year}</span>
                                                        <div className="w-4" />
                                                    </div>
                                                    <Calendar
                                                        month={leftMonth.month}
                                                        year={leftMonth.year}
                                                        onDateClick={(date) => {
                                                            if (selecting === 'start') {
                                                                setFieldValue('startDate', date);
                                                                setFieldValue('endDate', null);
                                                                setSelecting('end');
                                                            } else {
                                                                const startTimestamp = new Date(values.startDate).getTime();
                                                                const selectedTimestamp = new Date(date).getTime();
                                                                if (selectedTimestamp < startTimestamp) {
                                                                    setFieldValue('startDate', date);
                                                                    setFieldValue('endDate', null);
                                                                    setSelecting('end');
                                                                } else {
                                                                    setFieldValue('endDate', date);
                                                                    setSelecting('start');
                                                                }
                                                            }
                                                        }}
                                                        startDate={values.startDate}
                                                        endDate={values.endDate}
                                                        hoverDate={hoverDate}
                                                        setHoverDate={setHoverDate}
                                                    />
                                                </div>
                                                <div>
                                                    <div className="flex items-center justify-between text-gray-700 font-medium mb-2 uppercase">
                                                        <div className="w-4" />
                                                        <span className="text-sm">{monthNames[rightMonth.month]} {rightMonth.year}</span>
                                                        <button type="button" onClick={handleNext} className="px-2">{'>'}</button>
                                                    </div>
                                                    <Calendar
                                                        month={rightMonth.month}
                                                        year={rightMonth.year}
                                                        onDateClick={(date) => {
                                                            // Same logic as left calendar
                                                            if (selecting === 'start') {
                                                                setFieldValue('startDate', date);
                                                                setFieldValue('endDate', null);
                                                                setSelecting('end');
                                                            } else {
                                                                const startTimestamp = new Date(values.startDate).getTime();
                                                                const selectedTimestamp = new Date(date).getTime();
                                                                if (selectedTimestamp < startTimestamp) {
                                                                    setFieldValue('startDate', date);
                                                                    setFieldValue('endDate', null);
                                                                    setSelecting('end');
                                                                } else {
                                                                    setFieldValue('endDate', date);
                                                                    setSelecting('start');
                                                                }
                                                            }
                                                        }}
                                                        startDate={values.startDate}
                                                        endDate={values.endDate}
                                                        hoverDate={hoverDate}
                                                        setHoverDate={setHoverDate}
                                                    />
                                                </div>
                                            </div>

                                            {/* First/Last Day */}
                                            {values.startDate && values.endDate && (
                                                <div className="flex flex-col sm:flex-row gap-4">
                                                    <div className="flex-1">
                                                        <label className="block text-sm font-medium mb-1 text-gray-700">First day</label>
                                                        <select
                                                            value={firstDayType}
                                                            onChange={(e) => setFirstDayType(parseFloat(e.target.value))}
                                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800"
                                                        >
                                                            <option value="1">Full day</option>
                                                            <option value="0.5">Half day</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="block text-sm font-medium mb-1 text-gray-700">Last day</label>
                                                        <select
                                                            value={lastDayType}
                                                            onChange={(e) => setLastDayType(parseFloat(e.target.value))}
                                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800"
                                                        >
                                                            <option value="1">Full day</option>
                                                            <option value="0.5">Half day</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    {values.selectedType === '1' && values.startDate && values.endDate && (
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-blue-50 border border-blue-100 rounded px-6 py-5 mt-4">
                                            <div className="flex-shrink-0">
                                                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                                                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                                </svg>
                                            </div>
                                            <div className="text-gray-800 space-y-1 text-sm">
                                                <div className="font-medium">
                                                    You’re requesting <span className="text-blue-700 font-semibold">{calculateRequestedDays(values.startDate, values.endDate)} days off</span>.
                                                </div>
                                                <div>
                                                    You’ll have <span className="text-blue-700 font-semibold">
                                                        {(totalPaidTimeOff - calculateRequestedDays(values.startDate, values.endDate)).toFixed(1)} days
                                                    </span> of Paid time off remaining.
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Note */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Note</label>
                                        <Field
                                            as="textarea"
                                            name="note"
                                            placeholder="Write an exceptional note"
                                            className="w-full text-sm border border-gray-300 rounded px-3 py-2 h-20"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
