import React, { useState, useEffect } from "react";
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, setLogLevel, doc, setDoc, onSnapshot } from 'firebase/firestore';

// Inline SVG for icons to avoid external dependencies.
const LuUsers = () => (<svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><path d="M20 8v6M23 11h-6"></path><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /> <circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>);
const LuUserPlus = () => (<svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><path d="M20 8v6M23 11h-6"></path></svg>);
const LuLayers = () => (<svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19L2 12l10-7 10 7-10 7z"></path><path d="M2 12l10 7 10-7zM12 2v20z"></path></svg>);
const MentorsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h-3a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v10a3 3 0 01-3 3zM15 10a1 1 0 100-2 1 1 0 000 2zM9 10a1 1 0 100-2 1 1 0 000 2z" /></svg>);
const SchedulesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);
const ResourcesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13.486m0-13.486a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0 0l-3.25 2.167M12 6.253l3.25 2.167m-3.25-2.167A4.5 4.5 0 0112 4.5a4.5 4.5 0 01-4.5 4.5H7.5" /></svg>);
const MessagesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8m-8 4h8m-4-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v12a1 1 0 001 1h4a1 1 0 001-1v-4zm8 0h4a1 1 0 001-1V5a1 1 0 00-1-1h-4a1 1 0 00-1 1v4z" /></svg>);
const AnnouncementIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>);
const NotificationsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 5.165 6 7.64 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0h6zm-6 0h6" /></svg>);
const ProfileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>);
const DownloadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>);

// --- Navbar Component ---
function Navbar({ navigate }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white text-black">
            <div className="h-18 flex items-center justify-between px-6 py-2 md:px-12 lg:px-20 lg:py-2">
                <div className="flex items-center space-x-3">
                    <img
                        src="/src/assets/image/logo.png"
                        alt="Bridge2Rise logo"
                        className="h-12 md:h-14 lg:h-16 rounded-2xl"
                    />
                    <h1 className="text-lg md:text-2xl font-bold font-serif">
                        BRIDGE2RISE
                    </h1>
                </div>
                <ul className="hidden md:flex items-center space-x-8 lg:space-x-16 font-serif">
                    <li><a onClick={() => navigate('hero')} className="hover:font-bold transition-colors duration-200 cursor-pointer">Home</a></li>
                    <li><a onClick={() => navigate('mentorLogin')} className="hover:font-bold transition-colors duration-200 cursor-pointer">Mentor</a></li>
                    <li><a onClick={() => navigate('menteeLogin')} className="hover:font-bold transition-colors duration-200 cursor-pointer">Mentee</a></li>
                </ul>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none focus:ring-2 focus:ring-white" aria-expanded={isOpen} aria-controls="mobile-menu">
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? (
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M6 6l12 12"></path>
                                <path d="M6 18L18 6"></path>
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M3 6h18"></path>
                                <path d="M3 12h18"></path>
                                <path d="M3 18h18"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-black border-t border-white">
                    <ul className="hidden md:flex items-center space-x-8 lg:space-x-16 font-serif">
                        <li><a onClick={() => navigate('hero')} className="hover:font-bold transition-colors duration-200 cursor-pointer">Home</a></li>
                        <li><a onClick={() => navigate('mentorLogin')} className="hover:font-bold transition-colors duration-200 cursor-pointer">Mentor</a></li>
                        <li><a onClick={() => navigate('menteeLogin')} className="hover:font-bold transition-colors duration-200 cursor-pointer">Mentee</a></li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

// --- Hero Section Component ---
const Stat = ({ number, text, icon: Icon }) => (
    <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md">
        <div className="text-black mb-2"><Icon /></div>
        <div className="text-4xl font-bold font-serif">{number}</div>
        <div className="text-lg text-black">{text}</div>
    </div>
);

const stats = [
    { number: "100+", text: "Mentors", icon: LuUsers },
    { number: "500+", text: "Mentees", icon: LuUserPlus },
    { number: "1,000+", text: "Interactions", icon: LuLayers },
    { number: "25+", text: "Courses", icon: LuLayers },
];

function Hero({ navigate }) {
    return (
        <main className="bg-blue-100">
            <section className="bg-white bg-[url('C:\Users\User\bridge-to-rise\src\assets\image\longBridge.png')] bg-cover  text-black py-16 px-6 md:px-12 lg:px-20 lg:py-24 rounded-b-3xl">
                <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0 lg:space-x-12">
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight">
                            Connecting the <span className="text-black">African Diaspora</span> with local youth.
                        </h1>
                        <p className="mt-4 md:text-lg font-sans">
                            A bridge to global opportunities and mentorship, empowering the next generation of African leaders.
                        </p>
                    </div>
                    {/* <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <img
                            src="/src/assets/image/mentoring.png"
                            alt="Mentorship illustration"
                            className="rounded-xl shadow-lg w-full max-w-lg"
                        />
                    </div> */}
                </div>
            </section>
            <section className="container mx-auto px-6 py-12 text-center text-black">
                <h2 className="text-xl md:text-2xl font-semibold mb-10">Our Growing Impact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (<Stat key={index} {...stat} />))}
                </div>
            </section>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                <div className='space-x-8 space-y-8'>
                    <h1 className='font-bold text-2xl text-black'>Choose your Role to Get Started</h1>
                    <button onClick={() => navigate('mentorLogin')} className="w-full sm:w-auto px-8 py-3 bg-black text-white font-bold rounded-xl shadow-lg transition-colors duration-200 hover:text-blue-100 hover:bg-black">
                        Login as Mentor
                    </button>
                    <button onClick={() => navigate('menteeLogin')} className="w-full sm:w-auto px-8 py-3 bg-black text-white font-bold rounded-xl shadow-lg transition-colors duration-200 hover:text-blue-100 hover:bg-black">
                        Login as Mentee
                    </button>
                </div>
            </div>
        </main>
    );
}

// --- Footer Component ---
function Footer() {
    return (
        <footer className="bg-white py-8 text-black">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left space-y-4 md:space-y-0">
                <div className="left-footer">
                    <h3 className="text-xl font-bold">BRIDGE2RISE</h3>
                    <p className="mt-2 text-sm">
                        Connecting African youth with global diaspora professionals for a brighter future.
                    </p>
                    <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
                </div>
                <div className="right-footer">
                    <h3 className="text-lg font-bold mb-2">Resources</h3>
                    <ul className="space-y-1">
                        <li><a href="#" className="hover:underline hover:text-blue-100 transition-colors duration-200">Mentorship</a></li>
                        <li><a href="#" className="hover:underline hover:text-blue-100 transition-colors duration-200">Career Resources</a></li>
                        <li><a href="#" className="hover:underline hover:text-blue-100 transition-colors duration-200">Contact Us</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

// --- Mentor Login Component ---
function MentorLogin({ navigate }) {
    const [formData, setFormData] = useState({ email: "", password: "", role: "Mentor" });
    const [message, setMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password.length < 6) {
            setMessage("Password must be at least 6 characters.");
            return;
        }
        console.log("Mentor Login:", formData);
        setMessage(`Welcome ${formData.role}: ${formData.email}`);
        navigate('mentorDashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold text-center mb-4 font-serif text-black">
                    Mentor (Diaspora) Login
                </h2>
                {message && (
                    <div className="bg-white text-black p-3 rounded-md mb-4 text-center">
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password (min 6 characters)"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        required
                        minLength={6}
                    />
                    <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full border font-serif rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value="Mentor">Diaspora (Mentor)</option>
                        <option value="Mentee">Local (Mentee)</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-black text-white p-2 rounded-lg transition font-serif font-semibold hover:bg-gray-800"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-black">
                    Don't have an account? <span onClick={() => navigate('diasporaSignup')} className="text-black font-bold  hover:text-black cursor-pointer">Sign Up</span>
                </p>
            </div>
        </div>
    );
}

// --- Mentee Login Component ---
function MenteeLogin({ navigate }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "Mentee",
    });
    const [message, setMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const email = formData.email.trim().toLowerCase();

        // 1) Check if account exists
        const existingUser = users.find((u) => u.email === email);

        if (!existingUser) {
            setMessage("You don't have an account yet. Please sign up first.");
            navigate("menteeSignup"); // redirect to signup
            return;
        }

        // 2) Check role
        if (existingUser.role !== "Mentee") {
            setMessage(
                `This email is registered as ${existingUser.role}. Please log in as ${existingUser.role}.`
            );
            return;
        }

        // 3) Check password
        if (existingUser.password !== formData.password) {
            setMessage("Incorrect password. Try again.");
            return;
        }

        // 4) Save session and go to dashboard
        localStorage.setItem(
            "authUser",
            JSON.stringify({ email: existingUser.email, role: "Mentee" })
        );

        setMessage(`Welcome ${formData.role}: ${formData.email}`);
        navigate("menteeDashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold text-center mb-4 font-serif text-black">
                    Mentee (Youth) Login
                </h2>
                {message && (
                    <div className="bg-white text-black p-3 rounded-md mb-4 text-center">
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full border rounded-lg p-2 font-serif focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                    <select
                        value={formData.role}
                        onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                        }
                        className="w-full border rounded-lg p-2 font-serif focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value="Mentee">Local (Mentee)</option>
                        <option value="Mentor">Diaspora (Mentor)</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-black text-white p-2 rounded-lg font-serif font-semibold transition hover:bg-gray-800"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-black">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("menteeSignup")}
                        className="text-black font-bold hover:text-black cursor-pointer"
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
}


// --- Diaspora Sign Up Component ---
function DiasporaSignin({ navigate }) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        country: "",
        field: "",
        otherField: ""
    });
    const [message, setMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.field) {
            setMessage("Please choose a field from the list.");
            return;
        }
        if (formData.password.length < 6) {
            setMessage("Password must be at least 6 characters.");
            return;
        }
        console.log("Diaspora SignUp:", formData);
        setMessage(`Welcome Mentor ${formData.fullName} from ${formData.country}`);
        navigate('mentorDashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold text-center mb-4 font-serif text-black">
                    Diaspora (Mentor) Sign Up
                </h2>
                {message && (
                    <div className="bg-white text-black p-3 rounded-md mb-4 text-center">
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password (min 6 characters)"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full border rounded-lg p-2 font-serif focus:outline-none focus:ring-2 focus:ring-black"
                        required
                        minLength={6}
                    />
                    <input
                        type="text"
                        placeholder="Country of Residence"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                    <select
                        value={formData.field}
                        onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                        className="w-full font-serif border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    >
                        <option value="" disabled>Choose a field</option>
                        <option>Information Technology (IT)</option>
                        <option>Business & Entrepreneurship</option>
                        <option>HealthCare & Medicine</option>
                        <option>Education & Research</option>
                        <option>Engineering & Architecture</option>
                        <option>Tourism & Hospitality Management</option>
                        <option>Other</option>
                    </select>
                    {formData.field === "Other" && (
                        <input
                            type="text"
                            placeholder="Please specify your field"
                            value={formData.otherField}
                            onChange={(e) => setFormData({ ...formData, otherField: e.target.value })}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    )}
                    <button
                        type="submit"
                        className="w-full bg-black text-white font-serif font-semibold p-2 rounded-lg transition hover:bg-gray-800"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-black">
                    Already a member? <span onClick={() => navigate('mentorLogin')} className="text-black font-bold hover:text-black cursor-pointer">Log In</span>
                </p>
            </div>
        </div>
    );
}

// --- Mentee Sign Up Component ---
function MenteeSignin({ navigate }) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        education: "",
        otherEducation: "",
        role: "Mentee", // add role for consistency
    });
    const [message, setMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.education) {
            setMessage("Please choose education level from the list.");
            return;
        }
        if (formData.password.length < 6) {
            setMessage("Password must be at least 6 characters.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const email = formData.email.trim().toLowerCase();

        // Check if account already exists
        const exists = users.some(
            (u) => u.email === email && u.role === "Mentee"
        );
        if (exists) {
            setMessage("Account already exists! Please log in.");
            navigate("menteeLogin");
            return;
        }

        // Save new user
        users.push({ ...formData, email });
        localStorage.setItem("users", JSON.stringify(users));

        setMessage(`Signup successful! Welcome ${formData.fullName}`);
        navigate("menteeLogin"); // send them to login, not dashboard
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold text-center mb-4 font-serif text-black">
                    Mentee (Youth) Sign Up
                </h2>
                {message && (
                    <div className="bg-white text-black p-3 rounded-md mb-4 text-center">
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password (min 6 characters)"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        required
                        minLength={6}
                    />
                    <select
                        value={formData.education}
                        onChange={(e) =>
                            setFormData({ ...formData, education: e.target.value })
                        }
                        className="w-full border rounded-lg p-2 font-serif focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    >
                        <option value="" disabled>
                            Choose education level
                        </option>
                        <option>Secondary</option>
                        <option>Undergraduate</option>
                        <option>Post-graduate</option>
                        <option>Other</option>
                    </select>
                    {formData.education === "Other" && (
                        <input
                            type="text"
                            placeholder="Please specify education level"
                            value={formData.otherEducation}
                            onChange={(e) =>
                                setFormData({ ...formData, otherEducation: e.target.value })
                            }
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    )}
                    <button
                        type="submit"
                        className="w-full bg-black text-white p-2 rounded-lg font-serif font-semibold transition hover:bg-gray-800"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-black">
                    Already a member?{" "}
                    <span
                        onClick={() => navigate("menteeLogin")}
                        className="text-black font-bold hover:text-black cursor-pointer"
                    >
                        Log In
                    </span>
                </p>
            </div>
        </div>
    );
}
// --- Dashboard Components ---
function MyMentees() {
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
}

function Schedules() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dates = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <div className="text-black">
            <h3 className="text-xl font-semibold mb-4">Schedules</h3>
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg">November 2025</h4>
                <div className="flex space-x-2">
                    <button className="bg-gray-200 text-black px-3 py-1 rounded-full">&lt;</button>
                    <button className="bg-gray-200 text-black px-3 py-1 rounded-full">&gt;</button>
                </div>
            </div>
            <div className="grid grid-cols-7 text-center font-bold">
                {days.map(day => <div key={day} className="py-2">{day}</div>)}
            </div>
            <div className="grid grid-cols-7 text-center">
                {dates.map(date => (
                    <div key={date} className={`p-2 border rounded-xl m-1 ${date === 15 ? 'bg-black text-white' : 'hover:bg-gray-200'}`}>
                        {date}
                    </div>
                ))}
            </div>
        </div>
    );
}

function Resources() {
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
}
function Resourcess() {
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
    )
};
function Messages() {
    const [messages, setMessages] = useState([
        { sender: 'Mentee', text: 'Hi, I have a question about my project.', timestamp: '10:00 AM' },
        { sender: 'Mentor', text: 'Sure, what do you need help with?', timestamp: '10:01 AM' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { sender: 'Mentor', text: newMessage, timestamp: '10:02 AM' }]);
            setNewMessage('');
        }
    };

    const handleFileUpload = () => {
        console.log("Document upload simulated.");
    };

    const handleAudioCall = () => {
        console.log("Audio call simulated.");
    };

    const handleVideoCall = () => {
        console.log("Video call simulated.");
    };

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
}

function Announcements() {
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
}
function Announcementss() {
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
}

// --- Mentor Dashboard Component ---
const MentorProfile = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        country: "",
        field: "",
        otherField: "",
        topics: "",
        topicsOther: "",
        availability: "",
        language: "",
        bio: "",
        photo: null,
    });

    const [previewUrl, setPreviewUrl] = useState(null);
    const [submitted, setSubmitted] = useState(false);


    const fields = [
        "Information Technology (IT)",
        "Business & Entrepreneurship",
        "Healthcare & Medicine",
        "Education & Research",
        "Engineering & Architecture",
        "Tourism & Hospitality Management",
        "Other",
    ];

    const mentorshipTopics = ["Career advice", "Job search", "Entrepreneurship", "Other"];
    const languagesOptions = ["English", "French", "Kiswahili", "Other"];

    // Handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, photo: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen  flex items-center justify-center py-10">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Profile Photo */}
                        <div className="flex flex-col items-center">
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Profile Preview"
                                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-400 shadow-lg"
                                />
                            ) : (
                                <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 border-2 border-gray-400 shadow-lg">
                                    No Photo
                                </div>
                            )}

                            {/* Custom Upload Button */}
                            <label
                                htmlFor="photoUpload"
                                className="mt-3 px-6 py-2 bg-blue-200 font-serif rounded-full shadow hover:bg-blue-300 cursor-pointer transition"
                            >
                                Upload Photo
                            </label>
                            <input
                                id="photoUpload"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="hidden"
                            />
                        </div>

                        {/* Full Name */}
                        <div>
                            <label className="block font-medium font-serif">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded font-serif"
                                required
                            />
                        </div>

                        {/* Country */}
                        <div>
                            <label className="block font-medium font-serif">Country of Residence</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded font-serif"
                                required
                            />
                        </div>

                        {/* Field */}
                        <div>
                            <label className="block font-medium font-serif">Professional Field</label>
                            <select
                                name="field"
                                value={formData.field}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded font-serif"
                                required
                            >
                                <option value="">Select...</option>
                                {fields.map((field, i) => (
                                    <option key={i} value={field}>
                                        {field}
                                    </option>
                                ))}
                            </select>
                            {formData.field === "Other" && (
                                <input
                                    type="text"
                                    name="otherField"
                                    placeholder="Specify your field"
                                    value={formData.otherField}
                                    onChange={handleChange}
                                    className="w-full mt-2 p-2 border rounded font-serif"
                                />
                            )}
                        </div>

                        {/* Mentorship Topic */}
                        <div>
                            <label className="block font-medium font-serif">Preferred Mentorship Topic</label>
                            <select
                                name="topics"
                                value={formData.topics}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded font-serif"
                            >
                                <option value="">Select...</option>
                                {mentorshipTopics.map((topic, i) => (
                                    <option key={i} value={topic}>
                                        {topic}
                                    </option>
                                ))}
                            </select>
                            {formData.topics === "Other" && (
                                <input
                                    type="text"
                                    name="topicsOther"
                                    placeholder="Specify your topic"
                                    value={formData.topicsOther}
                                    onChange={handleChange}
                                    className="w-full mt-2 p-2 border rounded font-serif"
                                />
                            )}
                        </div>

                        {/* Availability */}
                        <div>
                            <label className="block font-medium font-serif">Availability (weekly hours)</label>
                            <input
                                type="text"
                                name="availability"
                                value={formData.availability}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded font-serif"
                            />
                        </div>

                        {/* Languages */}
                        <div>
                            <label className="block font-medium font-serif">Languages Spoken</label>
                            <select
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded font-serif"
                            >
                                <option value="">Select...</option>
                                {languagesOptions.map((lang, i) => (
                                    <option key={i} value={lang}>
                                        {lang}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block font-medium font-serif">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded font-serif"
                                rows="4"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-blue-100 font-serif  font-semibold py-2 rounded hover:bg-black hover:text-white transition"
                        >
                            Save Changes
                        </button>
                    </form>
                ) : (
                    // Profile Preview
                    <div className="space-y-6 text-center">
                        {/* Profile Photo */}
                        <div className="flex justify-center">
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Profile"
                                    className="w-36 h-36 rounded-full object-cover border-4 border-black shadow-lg"
                                />
                            ) : (
                                <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-400 shadow-lg text-gray-500">
                                    No Photo
                                </div>
                            )}
                        </div>

                        {/* Name + Country */}
                        <div>
                            <h2 className="text-2xl font-bold font-serif text-black">{formData.fullName}</h2>
                            <p className="text-gray-700 font-serif">{formData.country}</p>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 text-left bg-white p-4 rounded-lg shadow font-serif">
                            <p>
                                <span className="font-semibold">Professional Field:</span>{" "}
                                {formData.field === "Other" ? formData.otherField : formData.field}
                            </p>
                            <p>
                                <span className="font-semibold">Mentorship Topic:</span>{" "}
                                {formData.topics === "Other" ? formData.topicsOther : formData.topics}
                            </p>
                            <p>
                                <span className="font-semibold">Availability:</span> {formData.availability}
                            </p>
                            <p>
                                <span className="font-semibold">Languages:</span> {formData.language}
                            </p>
                            <p>
                                <span className="font-semibold">Bio:</span> {formData.bio}
                            </p>
                        </div>

                        {/* Edit button */}
                        <button
                            onClick={() => setSubmitted(false)}
                            className="mt-4 w-full bg-black text-white font-serif py-2 rounded hover:bg-gray-800 transition"
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

function MentorDashboard() {
    const [activeMenu, setActiveMenu] = useState('My Mentees');
    const menuItems = ['My Mentees', 'Schedules', 'Resources', 'Messages', 'Announcements', 'Profile'];

    const renderContent = () => {
        switch (activeMenu) {
            case 'My Mentees': return <MyMentees />;
            case 'Schedules': return <Schedules />;
            case 'Resources': return <Resources />;
            case 'Messages': return <Messages />;
            case 'Announcements': return <Announcements />;
            case 'Profile': return <MentorProfile db={db} userId={userId} onProfileUpdate={handleProfileUpdate} />;
            default: return <div className="text-black">Welcome to your dashboard!</div>;
        }
    };

    return (
        <div className="min-h-screen flex  font-sans">
            <aside className="w-64 bg-blue-100 p-6 flex flex-col items-center">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold font-serif">BRIDGE2RISE</h2>
                    <p className="text-sm">Mentor Dashboard</p>
                </div>
                <nav className="w-full space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveMenu(item)}
                            className={`w-full flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors duration-200 ${activeMenu === item ? 'bg-blue-100 text-black shadow-md' : 'text-white hover:bg-white hover:text-black'}`}
                        >
                            {item === 'My Mentees' && <MentorsIcon />}
                            {item === 'Schedules' && <SchedulesIcon />}
                            {item === 'Resources' && <ResourcesIcon />}
                            {item === 'Messages' && <MessagesIcon />}
                            {item === 'Announcements' && <AnnouncementIcon />}
                            <span>{item}</span>
                        </button>
                    ))}
                </nav>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-black">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <button className="relative text-black transition-colors duration-200">
                            <NotificationsIcon />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-black rounded-full animate-ping"></span>
                        </button>
                        <button className="flex items-center space-x-2 text-black hover:text-white transition-colors duration-200">
                            <ProfileIcon />
                            <span>Profile</span>
                        </button>
                    </div>
                </header>
                <div className="p-6 rounded-lg shadow-md h-5/6">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}

// --- Mentee Profile Component ---
const MenteeProfile = ({ db, userId, onProfileUpdate }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        country: "",
        fieldOfStudy: "",
        otherField: "",
        skills: "",
        careerGoal: "",
        mentorshipAreas: "",
        languages: "",
        bio: "",
        photoUrl: "https://placehold.co/128x128/ffffff/000000?text=Profile",
    });

    const [previewUrl, setPreviewUrl] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Dropdown options
    const fieldsOfStudy = ["Computer Science", "Engineering", "Medicine", "Business", "Other"];
    const careerGoals = ["Software Developer", "Entrepreneur", "Researcher", "Other"];
    const skillsOptions = ["Web Development", "Data Science", "UI/UX Design", "Project Management", "Other"];
    const mentorshipAreas = ["Career Guidance", "Technical Skills", "Networking", "Leadership", "Other"];
    const languagesOptions = ["English", "French", "Kinyarwanda", "Swahili", "Other"];

    useEffect(() => {
        if (db && userId) {
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const userDocRef = doc(db, 'artifacts', appId, 'users', userId, 'profile', 'mentee');

            const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
                if (docSnap.exists()) {
                    const profileData = docSnap.data();
                    setFormData(profileData);
                    setSubmitted(true);
                } else {
                    setSubmitted(false);
                }
            });
            return () => unsubscribe();
        }
    }, [db, userId]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newUrl = URL.createObjectURL(file);
            setPreviewUrl(newUrl);
            setFormData((prev) => ({ ...prev, photoUrl: newUrl }));
        }
    };


    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            if (db && userId) {
                const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
                const userDocRef = doc(db, 'artifacts', appId, 'users', userId, 'profile', 'mentee');
                await setDoc(userDocRef, formData);
                onProfileUpdate(); // Callback to parent component
                setIsEditing(false);
                setSubmitted(true);
            }
        } catch (error) {
            console.error("Error saving profile:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-lg">
            {!isEditing && submitted ? (
                // Display mode
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold font-serif text-black">Your Profile</h2>
                    <div className="flex flex-col items-center">
                        <img
                            src={formData.photoUrl}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-2 border-black"
                        />
                        <h2 className="mt-4 text-xl font-bold font-serif">{formData.fullName}</h2>
                        <p className="text-black font-serif">{formData.country}</p>
                    </div>
                    <div className="text-left space-y-2 text-black">
                        <p><span className="font-semibold font-serif">Field of Study:</span> {formData.fieldOfStudy === "Other" ? formData.otherField : formData.fieldOfStudy}</p>
                        <p><span className="font-semibold font-serif">Skills:</span> {formData.skills}</p>
                        <p><span className="font-semibold font-serif">Career Goal:</span> {formData.careerGoal}</p>
                        <p><span className="font-semibold font-serif">Mentorship Areas:</span> {formData.mentorshipAreas}</p>
                        <p><span className="font-semibold font-serif">Languages:</span> {formData.languages}</p>
                        <p><span className="font-semibold font-serif">Bio:</span> {formData.bio}</p>
                    </div>
                    <button onClick={handleEdit} className="mt-4 w-full bg-black text-white font-serif py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                        Edit Profile
                    </button>
                </div>
            ) : (
                // Edit mode
                <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
                    <h2 className="text-2xl font-bold text-center font-serif text-black">Edit Profile</h2>
                    <div className="flex flex-col items-center space-y-2">
                        <img
                            src={previewUrl || formData.photoUrl}
                            alt="Profile Preview"
                            className="w-24 h-24 rounded-full object-cover border-2 border-black"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer bg-blue-100 text-black py-2 px-4 rounded-lg font-serif">
                            Upload Photo
                        </label>
                        <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                        />
                    </div>
                    <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-100" required />
                    <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-100" required />
                    <select name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-100">
                        {fieldsOfStudy.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                    {formData.fieldOfStudy === "Other" && (<input type="text" name="otherField" placeholder="Specify field of study" value={formData.otherField} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-100" required />)}
                    <input type="text" name="skills" placeholder="Skills (e.g., HTML, CSS, JavaScript)" value={formData.skills} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-100" required />
                    <select name="careerGoal" value={formData.careerGoal} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-100">
                        {careerGoals.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                    <select name="mentorshipAreas" value={formData.mentorshipAreas} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-100">
                        {mentorshipAreas.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                    <input type="text" name="languages" placeholder="Languages (e.g., English, French)" value={formData.languages} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-100" required />
                    <textarea name="bio" placeholder="Tell us about yourself..." value={formData.bio} onChange={handleChange} rows="4" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-100" required />
                    <button type="submit" className="w-full bg-blue-100 text-black font-serif py-2 rounded-lg hover:bg-black hover:text-white transition-colors duration-200" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Profile"}
                    </button>
                </form>
            )}
        </div>
    );
};

// --- Mentee Dashboard Component ---

function MyMentors() {
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
}

function MenteeDashboard() {
    const [activeMenu, setActiveMenu] = useState('My Mentors');
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const menuItems = ['My Mentors', 'Schedules', 'Resources', 'Messages', 'Announcements'];

    useEffect(() => {
        // Check for global variables
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

        if (Object.keys(firebaseConfig).length > 0) {
            try {
                const app = initializeApp(firebaseConfig, appId);
                const authInstance = getAuth(app);
                const dbInstance = getFirestore(app);

                setDb(dbInstance);
                setAuth(authInstance);

                // Set Firebase log level for debugging
                setLogLevel('debug');

                // Listen for authentication state changes
                const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
                    if (user) {
                        setUserId(user.uid);
                        console.log("User authenticated:", user.uid);
                    } else {
                        console.log("No user found, signing in anonymously...");
                        try {
                            if (initialAuthToken) {
                                await signInWithCustomToken(authInstance, initialAuthToken);
                                console.log("Signed in with custom token.");
                            } else {
                                await signInAnonymously(authInstance);
                                console.log("Signed in anonymously.");
                            }
                        } catch (error) {
                            console.error("Firebase auth error:", error);
                        }
                    }
                    setIsAuthReady(true);
                });

                // Cleanup function for the listener
                return () => unsubscribe();
            } catch (error) {
                console.error("Error initializing Firebase:", error);
            }
        } else {
            console.log("Firebase config not available. App will run without database features.");
            setIsAuthReady(true);
        }
    }, []);

    const handleProfileUpdate = () => {
        setActiveMenu('Profile');
    };

    //Rendering Content

    const renderContent = () => {
        switch (activeMenu) {
            case 'My Mentors': return <MyMentors />;
            case 'Schedules': return <Schedules />;
            case 'Resources': return <Resourcess />;
            case 'Messages': return <Messages />;
            case 'Announcements': return <Announcementss />;
            case 'Profile': return <MenteeProfile db={db} userId={userId} onProfileUpdate={handleProfileUpdate} />;
            default: return <div className="text-black">Welcome to your dashboard!</div>;
        }
    };
    if (!isAuthReady) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="text-center">
                    <svg className="animate-spin h-10 w-10 text-black mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-2 text-black">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-white text-black">
            {/* Sidebar */}
            <aside className="w-full md:w-64 p-4 bg-blue-100 flex flex-col items-center shadow-lg">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-black shadow-inner">
                    <ProfileIcon />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-black">{userId || "Mentee"}</h2>
                <nav className="mt-8 w-full space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveMenu(item)}
                            className={`w-full flex items-center space-x-3 p-3 rounded-lg font-serif transition-all duration-200 ${activeMenu === item
                                ? 'bg-white text-black shadow-md'
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
            <main className="flex-1 p-8 overflow-y-auto bg-white">
                {/* Top bar */}
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-black">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <button className="relative text-black hover:text-blue-100 transition-colors duration-200">
                            <NotificationsIcon />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-black rounded-full animate-ping"></span>
                        </button>
                        <button onClick={() => setActiveMenu('Profile')} className="flex items-center space-x-2 text-black hover:text-blue-100 transition-colors duration-200">
                            <ProfileIcon />
                            <span>Profile</span>
                        </button>
                    </div>
                </header>

                {renderContent()}
            </main>
        </div>
    );
}


// --- Main App Component ---
export default function All() {
    const [currentPage, setCurrentPage] = useState('hero');

    const navigate = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const handleHashChange = () => {
            const page = window.location.hash.substring(1) || 'hero';
            setCurrentPage(page);
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const renderPage = () => {
        switch (currentPage) {
            case 'hero':
                return (
                    <>
                        <Navbar navigate={navigate} />
                        <Hero navigate={navigate} />
                        <Footer />
                    </>
                );
            case 'mentorLogin':
                return (
                    <>
                        <Navbar navigate={navigate} />
                        <MentorLogin navigate={navigate} />
                        <Footer />
                    </>
                );
            case 'menteeLogin':
                return (
                    <>
                        <Navbar navigate={navigate} />
                        <MenteeLogin navigate={navigate} />
                        <Footer />
                    </>
                );
            case 'diasporaSignup':
                return (
                    <>
                        <Navbar navigate={navigate} />
                        <DiasporaSignin navigate={navigate} />
                        <Footer />
                    </>
                );
            case 'menteeSignup':
                return (
                    <>
                        <Navbar navigate={navigate} />
                        <MenteeSignin navigate={navigate} />
                        <Footer />
                    </>
                );
            case 'mentorDashboard':
                return (
                    <>
                        <MentorDashboard />
                    </>
                );
            case 'menteeDashboard':
                return (
                    <>
                        <MenteeDashboard />
                    </>
                );
            default:
                return <p>Page not found.</p>;
        }
    };

    return <div className="font-sans antialiased">{renderPage()}</div>;
}
