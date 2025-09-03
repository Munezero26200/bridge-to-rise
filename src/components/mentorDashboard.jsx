import React, { useState, useEffect } from 'react';

// Inline SVG for icons to avoid external dependencies.
const MenteesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h-3a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v10a3 3 0 01-3 3zM15 10a1 1 0 100-2 1 1 0 000 2zM9 10a1 1 0 100-2 1 1 0 000 2z" /></svg>);
const SchedulesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);
const ResourcesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13.5m0-13.5a4.125 4.125 0 110-8.25m0 8.25a4.125 4.125 0 100 8.25m-6.75 2.25l-2.25 2.25h15.75l-2.25-2.25M12 21.75a2.25 2.25 0 110-4.5m0 4.5a2.25 2.25 0 100-4.5" /></svg>);
const MessagesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>);
const AnnouncementIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 10.966a3.5 3.5 0 00-5.071 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M12 12V9" /></svg>);
const NotificationsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>);
const ProfileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>);

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const calendarDays = [];

        for (let i = 0; i < startDay; i++) {
            calendarDays.push(<div key={`empty-${i}`}></div>);
        }
        for (let i = 1; i <= totalDays; i++) {
            calendarDays.push(
                <div key={i} className={`p-2 text-center rounded-xl cursor-pointer hover:bg-gray-200 transition-colors duration-200 ${i === currentDate.getDate() ? 'bg-blue-100 font-bold' : ''
                    }`}>
                    {i}
                </div>
            );
        }

        return calendarDays;
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="text-black hover:text-gray-600 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h3 className="text-xl font-bold text-black">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="text-black hover:text-gray-600 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center font-bold text-gray-500 mb-2">
                {dayNames.map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {renderCalendar()}
            </div>
        </div>
    );
};

const MentorDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('My Mentees');

    const renderContent = () => {
        switch (activeMenu) {
            case 'My Mentees':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-black mb-6">My Mentees</h2>
                        <div className="font-sans grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className=" p-6 rounded-xl shadow-md border border-gray-200">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-black">JD</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-black">Jane Doe</h3>
                                        <p className="text-sm text-gray-600">Career: Software Engineering</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 rounded-xl shadow-md border border-gray-200">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-black">SM</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-black">Samson Mbaye</h3>
                                        <p className="text-sm text-gray-600">Career: Product Management</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Schedules':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-black mb-6">Schedules</h2>
                        <Calendar />
                    </div>
                );
            case 'Resources':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-black mb-6">Resources</h2>
                        <div className="p-6 rounded-xl shadow-md border border-gray-200">
                            <div className="mb-4">
                                <p className="text-gray-600 mb-2">Upload a new resource:</p>
                                <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-600 hover:file:bg-blue-200" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-black mb-2">My Uploaded Resources</h3>
                                <ul className="space-y-2">
                                    <li className="p-3 bg-gray-100 rounded-lg flex justify-between items-center">
                                        <span className="text-black">Resume_Writing_Guide.pdf</span>
                                        <button className="text-red-500 hover:text-red-700">Remove</button>
                                    </li>
                                    <li className="p-3 bg-gray-100 rounded-lg flex justify-between items-center">
                                        <span className="text-black">Interview_Tips.docx</span>
                                        <button className="text-red-500 hover:text-red-700">Remove</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'Messages':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-black mb-6">Messages</h2>
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex h-96">
                            {/* Conversation List */}
                            <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
                                <h3 className="text-xl font-bold text-black mb-4">Conversations</h3>
                                <ul className="space-y-2">
                                    <li className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-black font-bold">JD</div>
                                            <div className="flex-1">
                                                <p className="text-black font-semibold">Jane Doe</p>
                                                <p className="text-xs text-gray-500 truncate">Last message...</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-black font-bold">SM</div>
                                            <div className="flex-1">
                                                <p className="text-black font-semibold">Samson Mbaye</p>
                                                <p className="text-xs text-gray-500 truncate">Last message...</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/* Chat Window */}
                            <div className="flex-1 p-4 flex flex-col">
                                <div className="flex-1 overflow-y-auto">
                                    {/* Chat messages will go here */}
                                    <div className="text-center text-gray-500 my-4">No messages yet.</div>
                                </div>
                                <div className="mt-4 flex space-x-2">
                                    <input type="text" placeholder="Type a message..." className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100" />
                                    <button className="bg-blue-100 hover:font-bold px-4 py-2 rounded-xl">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Announcements':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-black mb-6">Announcements</h2>
                        <div className="p-6 rounded-xl shadow-md border border-gray-200">
                            <textarea placeholder="Write your announcement here..." rows="6" className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100"></textarea>
                            <button className="mt-4 w-full border-2 border-gray-200 bg-white px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors duration-200">
                                Send Announcement to all Mentees
                            </button>
                        </div>
                    </div>
                );
            case 'Edit Profile':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-black mb-6">Edit Profile</h2>
                        <div className="p-6 rounded-xl shadow-md border border-gray-200">
                            <p className="text-gray-600">Here you can edit your profile information.</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-white font-inter">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-100 shadow-lg p-6 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-black text-3xl font-bold mt-4 mb-6">JD</div>
                <h2 className="text-xl font-bold text-black">John Doe</h2>
                <p className="text-sm text-gray-600">Mentor</p>

                <nav className="mt-8 w-full space-y-2">
                    {['My Mentees', 'Schedules', 'Resources', 'Messages', 'Announcements'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveMenu(item)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none ${activeMenu === item
                                    ? 'bg-blue-100 shadow-md'
                                    : 'text-black hover:bg-white'
                                }`}
                        >
                            {item === 'My Mentees' && <MenteesIcon />}
                            {item === 'Schedules' && <SchedulesIcon />}
                            {item === 'Resources' && <ResourcesIcon />}
                            {item === 'Messages' && <MessagesIcon />}
                            {item === 'Announcements' && <AnnouncementIcon />}
                            <span>{item}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {/* Top bar */}
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-black">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <button className="relative text-black hover:text-gray-800 transition-colors duration-200">
                            <NotificationsIcon />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                        </button>
                        <button onClick={() => setActiveMenu('Edit Profile')} className="flex items-center space-x-2 text-black hover:text-gray-800 transition-colors duration-200">
                            <ProfileIcon />
                            <span>Profile</span>
                        </button>
                    </div>
                </header>

                {renderContent()}
            </main>
        </div>
    );
};

export default MentorDashboard;
