import React, { useState, useEffect } from 'react';

// Inline SVG for icons to avoid external dependencies.
const MentorsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h-3a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v10a3 3 0 01-3 3zM15 10a1 1 0 100-2 1 1 0 000 2zM9 10a1 1 0 100-2 1 1 0 000 2z" /></svg>);
const SchedulesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);
const ResourcesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13.5m0-13.5a4.125 4.125 0 110-8.25m0 8.25a4.125 4.125 0 100 8.25m-6.75 2.25l-2.25 2.25h15.75l-2.25-2.25M12 21.75a2.25 2.25 0 110-4.5m0 4.5a2.25 2.25 0 100-4.5" /></svg>);
const MessagesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>);
const AnnouncementIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 10.966a3.5 3.5 0 00-5.071 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M12 12V9" /></svg>);
const NotificationsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>);
const ProfileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>);
const DownloadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>);

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
        <div key={i} className={`p-2 text-center rounded-xl cursor-pointer hover:bg-blue-100 transition-colors duration-200 ${
          i === currentDate.getDate() ? 'bg-blue-100 font-bold' : ''
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
    <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="text-black hover:bg-blue-100 transition-colors duration-200 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h3 className="text-xl font-bold text-black">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="text-black hover:bg-blue-100 transition-colors duration-200 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center font-bold text-black mb-2">
        {dayNames.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {renderCalendar()}
      </div>
    </div>
  );
};

const MenteeDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('My Mentors');

  const renderContent = () => {
    switch (activeMenu) {
      case 'My Mentors':
        return (
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">My Mentors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-black">JD</div>
                  <div>
                    <h3 className="text-lg font-bold text-black">John Doe</h3>
                    <p className="text-sm text-black">Field: Software Engineering</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-black">SM</div>
                  <div>
                    <h3 className="text-lg font-bold text-black">Sarah Mbote</h3>
                    <p className="text-sm text-black">Field: Product Management</p>
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
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
              <h3 className="text-xl font-bold text-black mb-2">My Resources</h3>
              <ul className="space-y-2">
                <li className="p-3 bg-blue-100 rounded-lg flex justify-between items-center">
                  <span className="text-black">Resume_Writing_Guide.pdf</span>
                  <button className="text-black hover:text-blue-500 transition-colors duration-200 flex items-center space-x-1">
                    <DownloadIcon />
                    <span>Download</span>
                  </button>
                </li>
                <li className="p-3 bg-blue-100 rounded-lg flex justify-between items-center">
                  <span className="text-black">Interview_Tips.docx</span>
                  <button className="text-black hover:text-blue-500 transition-colors duration-200 flex items-center space-x-1">
                    <DownloadIcon />
                    <span>Download</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'Messages':
        return (
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">Messages</h2>
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 flex h-96">
              {/* Conversation List */}
              <div className="w-1/3 border-r border-blue-100 overflow-y-auto">
                <h3 className="text-xl font-bold text-black mb-4">Conversations</h3>
                <ul className="space-y-2">
                  <li className="p-3 rounded-lg hover:bg-blue-100 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-black font-bold">JD</div>
                      <div className="flex-1">
                        <p className="text-black font-semibold">John Doe (Mentor)</p>
                        <p className="text-xs text-black truncate">Last message...</p>
                      </div>
                    </div>
                  </li>
                  <li className="p-3 rounded-lg hover:bg-blue-100 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-black font-bold">SM</div>
                      <div className="flex-1">
                        <p className="text-black font-semibold">Sarah Mbote (Mentee)</p>
                        <p className="text-xs text-black truncate">Last message...</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              {/* Chat Window */}
              <div className="flex-1 p-4 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  {/* Chat messages will go here */}
                  <div className="text-center text-black my-4">No messages yet.</div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <input type="text" placeholder="Type a message..." className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100" />
                  <button className="bg-blue-100 px-4 py-2 rounded-xl hover:font-bold transition-colors duration-200">Send</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Announcements':
        return (
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">Announcements</h2>
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
              <ul className="space-y-4">
                <li className="p-4 bg-blue-100 rounded-lg">
                  <p className="font-semibold text-black mb-1">Weekly check-in meeting on Friday.</p>
                  <p className="text-sm text-black">Please be ready to discuss your progress and any roadblocks you've encountered.</p>
                </li>
                <li className="p-4 bg-blue-100 rounded-lg">
                  <p className="font-semibold text-black mb-1">New resource available: "Effective Communication in the Workplace."</p>
                  <p className="text-sm text-black">I've uploaded a new guide to the resources section. Let me know what you think!</p>
                </li>
              </ul>
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
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-black text-3xl font-bold mt-4 mb-6">SA</div>
        <h2 className="text-xl font-bold text-black">Samson Adebayo</h2>
        <p className="text-sm text-black">Mentee</p>

        <nav className="mt-8 w-full space-y-2">
          {['My Mentors', 'Schedules', 'Resources', 'Messages', 'Announcements'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveMenu(item)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none ${
                activeMenu === item
                  ? 'bg-blue-100 text-black shadow-md'
                  : 'text-black hover:bg-white'
              }`}
            >
              {item === 'My Mentors' && <MentorsIcon />}
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
            <button className="relative text-black hover:text-blue-500 transition-colors duration-200">
              <NotificationsIcon />
              <span className="absolute top-0 right-0 w-2 h-2 bg-black rounded-full animate-ping"></span>
            </button>
            <button className="flex items-center space-x-2 text-black hover:text-blue-500 transition-colors duration-200">
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

export default MenteeDashboard;
