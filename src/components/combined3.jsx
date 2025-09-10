import React, { useState, useEffect } from "react";

/* -----------------------
   Local storage helpers
   ----------------------- */
const KEYS = {
    USERS: "b2r_users",
    AUTH: "b2r_auth",
    ANN: "b2r_ann",
    RES: "b2r_res",
    MSGS: "b2r_msgs",
};
const load = (k, fallback) =>
    JSON.parse(localStorage.getItem(k) || JSON.stringify(fallback));
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const getUsers = () => load(KEYS.USERS, []);
const saveUsers = (u) => save(KEYS.USERS, u);
const getAuth = () => load(KEYS.AUTH, null);
const setAuth = (u) => save(KEYS.AUTH, u);
const clearAuth = () => localStorage.removeItem(KEYS.AUTH);
const getAnn = () => load(KEYS.ANN, []);
const saveAnn = (a) => save(KEYS.ANN, a);
const getRes = () => load(KEYS.RES, []);
const saveRes = (r) => save(KEYS.RES, r);
const getMsgs = () => load(KEYS.MSGS, []);
const saveMsgs = (m) => save(KEYS.MSGS, m);

/* -----------------------
   Seed admin user (if missing)
   ----------------------- */
(function seedAdmin() {
    const u = getUsers();
    if (!u.some((x) => x.role === "Admin")) {
        u.push({
            id: "admin-1",
            fullName: "Platform Admin",
            email: "admin@bridge2rise.org",
            password: "admin123",
            role: "Admin",
            field: "Administration",
            bio: "",
            avatar: null,
            mentees: [],
        });
        saveUsers(u);
    }
})();

/* -----------------------
   Utilities
   ----------------------- */
const id = (p = "id") => `${p}-${Date.now()}-${Math.floor(Math.random() * 9000)}`;
const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* -----------------------
   Small UI bits
   ----------------------- */
function Primary({ children, className = "", ...props }) {
    return (
        <button
            {...props}
            className={`px-4 py-2 rounded bg-blue-100 text-black hover:bg-black hover:text-white transition ${className}`}
        >
            {children}
        </button>
    );
}
function IconPlus() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
        </svg>
    );
}
function ConfirmModal({ show, message, onConfirm, onCancel }) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-sans">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center">
                <div className="text-lg font-semibold mb-4">{message}</div>
                <div className="flex justify-center gap-3">
                    <Primary onClick={onConfirm}>Yes</Primary>
                    <Primary onClick={onCancel} className="bg-black text-white hover:bg-blue-100 hover:text-black">
                        Cancel
                    </Primary>
                </div>
            </div>
        </div>
    );
}

/* -----------------------
   Navbar, Hero, Footer
   ----------------------- */
function Navbar({ navigate, auth, onLogout }) {
    const annCount = getAnn().length;
    return (
        <nav className="sticky top-0 z-40 bg-white border-b">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between font-sans">
                <div className="flex items-center space-x-3">
                    <img
                        src="/logo.png"
                        alt="Bridge2Rise logo"
                        className="h-12 md:h-14 lg:h-16 rounded-2xl"
                    />
                    <h1 className="text-lg md:text-2xl font-bold font-serif">
                        BRIDGE2RISE
                    </h1>
                </div>
                <div className="hidden md:flex gap-6">
                    <button onClick={() => (window.location.hash = "hero")}>Home</button>
                    <button onClick={() => (window.location.hash = "mentorLogin")}>Mentor</button>
                    <button onClick={() => (window.location.hash = "menteeLogin")}>Mentee</button>
                    <button onClick={() => (window.location.hash = "adminLogin")}>Admin</button>
                </div>
                <div className="flex items-center gap-3">
                    {auth ? (
                        <>
                            <span className="hidden sm:inline text-sm">{auth.email}</span>
                            <Primary onClick={() => (window.location.hash = auth.role === "Mentor" ? "mentorDashboard" : auth.role === "Mentee" ? "menteeDashboard" : "adminDashboard")}>
                                Dashboard
                            </Primary>
                            <button
                                onClick={() => {
                                    clearAuth();
                                    onLogout();
                                    window.location.hash = "hero";
                                }}
                                className="text-sm"
                            >
                                Logout
                            </button>
                            {annCount > 0 && <div className="ml-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{annCount}</div>}
                        </>
                    ) : (
                        <button onClick={() => (window.location.hash = "menteeLogin")} className="text-sm">
                            Sign in
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
function Hero() {
    return (
        <main className="bg-blue-100">
            <section className="bg-white bg-[url('/longBridge.png')] object-cover  text-black py-16 px-6 md:px-12 lg:px-20 lg:py-24 rounded-b-3xl">
                <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0 lg:space-x-12">
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight">
                            Connecting the <span className="text-black">African Diaspora</span> with local youth.
                        </h1>
                        <p className="mt-4 md:text-lg font-sans">
                            A bridge to global opportunities and mentorship, empowering the next generation of African leaders.
                        </p>
                    </div>
                </div>
            </section>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                <div className='space-x-8 space-y-8'>
                    <h1 className='font-bold text-2xl text-black'>Choose your Role to Get Started</h1>
                    <button onClick={() => (window.location.hash = "mentorLogin")} className="w-full sm:w-auto px-8 py-3 bg-black text-white font-bold rounded-xl shadow-lg transition-colors duration-200 hover:text-blue-100 hover:bg-black">
                        Login As a Mentor
                    </button>
                    <button onClick={() => (window.location.hash = "menteeLogin")} className="w-full sm:w-auto px-8 py-3 bg-black text-white font-bold rounded-xl shadow-lg transition-colors duration-200 hover:text-blue-100 hover:bg-black">
                        Login As a Mentee
                    </button>
                </div>
            </div>
        </main>

        
    );
}
function Footer() {
    return (
        <footer className="bg-white border-t mt-8 py-6 font-sans">
            <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-black/80 gap-2">
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

/* -----------------------
   Auth pages
   ----------------------- */
function MentorSignup() {
    const [f, setF] = useState({ fullName: "", email: "", password: "", field: "" });
    const [err, setErr] = useState(null);
    const submit = (e) => {
        e.preventDefault();
        setErr(null);
        if (!emailRE.test(f.email)) return setErr("Invalid email");
        const users = getUsers();
        if (users.some((u) => u.email === f.email.trim().toLowerCase())) return setErr("Email already registered");
        if (f.password.length < 6) return setErr("Password too short");
        const u = { id: id("u"), fullName: f.fullName, email: f.email.trim().toLowerCase(), password: f.password, role: "Mentor", field: f.field, bio: "", avatar: null, mentees: [] };
        users.push(u);
        saveUsers(users);
        alert("Registered — please login");
        window.location.hash = "mentorLogin";
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6 font-sans">
            <div className="w-full max-w-md bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold">Mentor Signup</h3>
                {err && <div className="text-red-600 mt-2">{err}</div>}
                <form className="mt-3 space-y-3" onSubmit={submit}>
                    <input required className="w-full border p-2 rounded" placeholder="Full name" value={f.fullName} onChange={(e) => setF({ ...f, fullName: e.target.value })} />
                    <input required className="w-full border p-2 rounded" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
                    <input required className="w-full border p-2 rounded" type="password" placeholder="Password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
                    <input required className="w-full border p-2 rounded" placeholder="Field of expertise" value={f.field} onChange={(e) => setF({ ...f, field: e.target.value })} />
                    <div className="flex gap-2">
                        <Primary type="submit" className="flex-1">Sign up</Primary>
                        <button type="button" className="flex-1 border rounded" onClick={() => (window.location.hash = "hero")}>Cancel</button>
                    </div>
                </form>
                <p className="mt-3 text-sm">Already have an account? <button onClick={() => (window.location.hash = "mentorLogin")} className="font-semibold">Login</button></p>
            </div>
        </div>
    );
}
function MenteeSignup() {
    const [f, setF] = useState({ fullName: "", email: "", password: "", field: "" });
    const [err, setErr] = useState(null);
    const submit = (e) => {
        e.preventDefault();
        setErr(null);
        if (!emailRE.test(f.email)) return setErr("Invalid email");
        const users = getUsers();
        if (users.some((u) => u.email === f.email.trim().toLowerCase())) return setErr("Email already registered");
        if (f.password.length < 6) return setErr("Password too short");
        const u = { id: id("u"), fullName: f.fullName, email: f.email.trim().toLowerCase(), password: f.password, role: "Mentee", field: f.field, bio: "", avatar: null, matchedMentor: null };
        users.push(u);
        saveUsers(users);
        alert("Registered — please login");
        window.location.hash = "menteeLogin";
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6 font-sans">
            <div className="w-full max-w-md bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold">Mentee Signup</h3>
                {err && <div className="text-red-600 mt-2">{err}</div>}
                <form className="mt-3 space-y-3" onSubmit={submit}>
                    <input required className="w-full border p-2 rounded" placeholder="Full name" value={f.fullName} onChange={(e) => setF({ ...f, fullName: e.target.value })} />
                    <input required className="w-full border p-2 rounded" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
                    <input required className="w-full border p-2 rounded" type="password" placeholder="Password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
                    <input required className="w-full border p-2 rounded" placeholder="Field of interest" value={f.field} onChange={(e) => setF({ ...f, field: e.target.value })} />
                    <div className="flex gap-2">
                        <Primary type="submit" className="flex-1">Sign up</Primary>
                        <button type="button" className="flex-1 border rounded" onClick={() => (window.location.hash = "hero")}>Cancel</button>
                    </div>
                </form>
                <p className="mt-3 text-sm">Already have an account? <button onClick={() => (window.location.hash = "menteeLogin")} className="font-semibold">Login</button></p>
            </div>
        </div>
    );
}
function MentorLogin({ onLogin }) {
    const [f, setF] = useState({ email: "", password: "" });
    const [err, setErr] = useState(null);
    const submit = (e) => {
        e.preventDefault();
        setErr(null);
        const users = getUsers();
        const u = users.find((x) => x.email === f.email.trim().toLowerCase());
        if (!u) return setErr("No account — sign up first");
        if (u.password !== f.password) return setErr("Wrong password");
        if (u.role !== "Mentor") return setErr("Not a Mentor account");
        setAuth(u);
        onLogin();
        window.location.hash = "mentorDashboard";
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6 font-sans">
            <div className="w-full max-w-md bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold">Mentor Login</h3>
                {err && <div className="text-red-600 mt-2">{err}</div>}
                <form className="mt-3 space-y-3" onSubmit={submit}>
                    <input required className="w-full border p-2 rounded" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
                    <input required className="w-full border p-2 rounded" type="password" placeholder="Password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
                    <Primary type="submit" className="w-full">Login</Primary>
                </form>
                <p className="mt-3 text-sm">Don't have an account? <button onClick={() => (window.location.hash = "mentorSignup")} className="font-semibold">Sign up</button></p>
            </div>
        </div>
    );
}
function MenteeLogin({ onLogin }) {
    const [f, setF] = useState({ email: "", password: "" });
    const [err, setErr] = useState(null);
    const submit = (e) => {
        e.preventDefault();
        setErr(null);
        const users = getUsers();
        const u = users.find((x) => x.email === f.email.trim().toLowerCase());
        if (!u) return setErr("No account — sign up first");
        if (u.password !== f.password) return setErr("Wrong password");
        if (u.role !== "Mentee") return setErr("Not a Mentee account");
        setAuth(u);
        onLogin();
        window.location.hash = "menteeDashboard";
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6 font-sans">
            <div className="w-full max-w-md bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold">Mentee Login</h3>
                {err && <div className="text-red-600 mt-2">{err}</div>}
                <form className="mt-3 space-y-3" onSubmit={submit}>
                    <input required className="w-full border p-2 rounded" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
                    <input required className="w-full border p-2 rounded" type="password" placeholder="Password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
                    <Primary type="submit" className="w-full">Login</Primary>
                </form>
                <p className="mt-3 text-sm">Don't have an account? <button onClick={() => (window.location.hash = "menteeSignup")} className="font-semibold">Sign up</button></p>
            </div>
        </div>
    );
}

/* -----------------------
   Profile: view & edit
   ----------------------- */
function ProfileView({ email, onClose }) {
    const users = getUsers();
    const user = users.find((u) => u.email === email);
    if (!user) return (
        <div className="p-6 font-sans">
            Profile not found. <button className="ml-2 border px-2 py-1 rounded" onClick={onClose}>Back</button>
        </div>
    );
    return (
        <div className="p-6 max-w-4xl mx-auto font-sans">
            <div className="bg-white p-6 rounded-lg">
                <div className="flex gap-6 items-center">
                    <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100">{user.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-black/40">No image</div>}</div>
                    <div>
                        <h2 className="text-2xl font-semibold">{user.fullName}</h2>
                        <div className="text-sm text-black/60">{user.role} • {user.field}</div>
                        <div className="mt-2">{user.bio}</div>
                    </div>
                </div>
            </div>
            <div className="mt-4"><button onClick={onClose} className="border px-3 py-1 rounded">Close</button></div>
        </div>
    );
}

function ProfileEdit({ email, onSaved }) {
    const [users, setUsers] = useState(getUsers());
    const me = users.find((u) => u.email === email);
    const [form, setForm] = useState({ ...me });
    useEffect(() => setForm({ ...me }), [email]);
    const pick = (file) => {
        if (!file) return;
        const fr = new FileReader();
        fr.onload = () => setForm((s) => ({ ...s, avatar: fr.result }));
        fr.readAsDataURL(file);
    };
    const saveProfile = () => {
        const updated = users.map((u) => (u.email === email ? { ...u, ...form } : u));
        setUsers(updated);
        saveUsers(updated);
        alert("Saved");
        if (onSaved) onSaved();
    };
    return (
        <div className="p-6 max-w-3xl mx-auto font-sans">
            <div className="bg-white p-6 rounded-lg">
                <div className="flex gap-6 items-start">
                    <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100">{form.avatar ? <img src={form.avatar} alt="avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-black/40">No image</div>}</div>
                    <div className="flex-1">
                        <label className="block mb-2 font-medium">Upload photo</label>
                        <input type="file" onChange={(e) => pick(e.target.files[0])} className="mb-4" />
                        <div className="space-y-2">
                            <input className="w-full border p-2 rounded" value={form.fullName || ""} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Full name" />
                            <input className="w-full border p-2 rounded" value={form.field || ""} onChange={(e) => setForm({ ...form, field: e.target.value })} placeholder="Field (e.g., Computer Science)" />
                            {form.role === "Mentee" && <input className="w-full border p-2 rounded" value={form.careerGoal || ""} onChange={(e) => setForm({ ...form, careerGoal: e.target.value })} placeholder="Career goal" />}
                            <textarea className="w-full border p-2 rounded" value={form.bio || ""} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Short bio" />
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <Primary onClick={saveProfile}>Save</Primary>
                    <button onClick={() => onSaved && onSaved()} className="border px-3 py-1 rounded">Cancel</button>
                </div>
            </div>
        </div>
    );
}

/* -----------------------
   Matching panel
   ----------------------- */
function MatchingPanel({ meEmail }) {
    const users = getUsers();
    const me = users.find((u) => u.email === meEmail);
    const mentors = users.filter((u) => u.role === "Mentor");
    const doMatch = (mentorEmail) => {
        const all = getUsers();
        const updated = all.map((u) => {
            if (u.email === meEmail) return { ...u, matchedMentor: mentorEmail };
            if (u.email === mentorEmail) return { ...u, mentees: (u.mentees || []).includes(meEmail) ? u.mentees : [...(u.mentees || []), meEmail] };
            return u;
        });
        saveUsers(updated);
    };
    const doUnmatch = (mentorEmail) => {
        const all = getUsers();
        const updated = all.map((u) => {
            if (u.email === meEmail) return { ...u, matchedMentor: null };
            if (u.email === mentorEmail) return { ...u, mentees: (u.mentees || []).filter((x) => x !== meEmail) };
            return u;
        });
        saveUsers(updated);
    };
    return (
        <div className="p-4">
            <h4 className="font-semibold">Suggested mentors</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                {mentors.map((m) => {
                    const matched = me?.matchedMentor === m.email;
                    return (
                        <div key={m.email} className="p-3 border rounded flex justify-between items-center">
                            <div>
                                <div className="font-semibold">{m.fullName}</div>
                                <div className="text-sm text-black/60">Field: {m.field}</div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                {matched ? <Primary onClick={() => doUnmatch(m.email)}>Unmatch</Primary> : <Primary onClick={() => doMatch(m.email)}>Match</Primary>}
                                <button onClick={() => (window.location.hash = `viewProfile?email=${encodeURIComponent(m.email)}`)} className="px-3 py-1 border rounded">View</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* -----------------------
   Announcements
   ----------------------- */
function AnnouncementsPanel({ me }) {
    const [ann, setAnn] = useState(getAnn());
    useEffect(() => saveAnn(ann), [ann]);
    const [text, setText] = useState("");
    const post = () => {
        if (!text) return;
        setAnn([{ id: id("a"), by: me.email, text, ts: Date.now() }, ...ann]);
        setText("");
    };
    return (
        <div className="p-4">
            <h4 className="font-semibold">Announcements</h4>
            {me.role === "Mentor" && (
                <div className="mt-2">
                    <textarea className="w-full border p-2 rounded h-24" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write announcement" />
                    <div className="mt-2"><Primary onClick={post}>Post</Primary></div>
                </div>
            )}
            <div className="mt-4 space-y-3">{getAnn().map((a) => (<div key={a.id} className="p-3 border rounded"><div className="text-sm text-black/60">By {a.by} • {new Date(a.ts).toLocaleString()}</div><div className="mt-1">{a.text}</div></div>))}</div>
        </div>
    );
}

/* -----------------------
   Resources
   ----------------------- */
function ResourcesPanel({ meEmail }) {
    const [res, setRes] = useState(getRes());
    useEffect(() => saveRes(res), [res]);
    const me = getUsers().find((u) => u.email === meEmail);
    const upload = (f) => {
        if (!f) return;
        const fr = new FileReader();
        fr.onload = () => setRes([{ id: id("r"), name: f.name, by: meEmail, data: fr.result, ts: Date.now() }, ...res]);
        fr.readAsDataURL(f);
    };
    const del = (rid) => {
        if (!confirm("Delete resource?")) return;
        setRes((prev) => prev.filter((x) => x.id !== rid));
    };
    return (
        <div className="p-4">
            <h4 className="font-semibold">Resources</h4>
            {me.role === "Mentor" && (
                <div className="mt-2 mb-3">
                    <label className="p-2 border rounded cursor-pointer">
                        <input type="file" className="hidden" onChange={(e) => upload(e.target.files[0])} />
                        Upload
                    </label>
                </div>
            )}
            <div className="space-y-3">{res.map((r) => (<div key={r.id} className="p-3 border rounded flex justify-between items-center"><div><div className="font-semibold">{r.name}</div><div className="text-sm text-black/60">By {r.by} • {new Date(r.ts).toLocaleString()}</div></div><div className="flex gap-2"><a className="underline" href={r.data} download={r.name}>Download</a>{me.role === "Mentor" && r.by === meEmail && <button onClick={() => del(r.id)} className="border px-2 py-1 rounded">Delete</button>}</div></div>))}</div>
        </div>
    );
}

/* -----------------------
   Left Sidebar (used in dashboards)
   ----------------------- */
function LeftSidebar({ meEmail, active, setActive }) {
    const me = getUsers().find((u) => u.email === meEmail);
    return (
        <aside className="w-64 hidden lg:block bg-blue-100 p-4">
            <div className="flex flex-col items-center mb-4">
                <div onClick={() => (window.location.hash = `viewProfile?email=${encodeURIComponent(meEmail)}`)} className="w-20 h-20 rounded-full overflow-hidden bg-white cursor-pointer">{me?.avatar ? <img src={me.avatar} alt="avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-black/40">No image</div>}</div>
                <div className="mt-2 font-semibold text-black">{me?.fullName || me?.email}</div>
                <div className="text-sm text-black/70">{me?.role}</div>
            </div>
            <ul className="space-y-2">
                {["Dashboard", "Messages", "Announcements", "Schedules", "Resources", "Profile"].map((t) => (
                    <li key={t}>
                        <button onClick={() => setActive(t)} className={`w-full text-left p-2 rounded ${active === t ? "bg-white" : ""} hover:bg-white`}>{t}</button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

/* -----------------------
   Mentor Dashboard
   ----------------------- */
function MentorDashboard() {
    const auth = getAuth();
    if (!auth || auth.role !== "Mentor") return <div className="p-6">Please login as Mentor</div>;
    const meEmail = auth.email;
    const [tab, setTab] = useState("Dashboard");
    return (
        <div className="min-h-screen flex font-sans">
            <LeftSidebar meEmail={meEmail} active={tab} setActive={setTab} />
            <div className="flex-1">
                <div className="p-4 border-b flex justify-between items-center"><h2 className="text-xl font-semibold">Mentor Dashboard</h2><div><button onClick={() => window.history.back()} className="border px-3 py-1 rounded">Back</button></div></div>
                <div>
                    {tab === "Dashboard" && (<div className="p-4">Your mentees:<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">{getUsers().filter(u => u.role === 'Mentee' && u.matchedMentor === meEmail).map(m => (<div key={m.email} className="p-3 border rounded"><div className="font-semibold">{m.fullName}</div><div className="text-sm">{m.email}</div></div>))}</div></div>)}
                    {tab === "Messages" && <MessagingPanel meEmail={meEmail} />}
                    {tab === "Announcements" && <AnnouncementsPanel me={getUsers().find(u => u.email === meEmail)} />}
                    {tab === "Resources" && <ResourcesPanel meEmail={meEmail} />}
                    {tab === "Schedules" && <div className="p-4">Schedules area</div>}
                    {tab === "Profile" && <ProfileEdit email={meEmail} onSaved={() => (window.location.hash = `viewProfile?email=${encodeURIComponent(meEmail)}`)} />}
                </div>
            </div>
        </div>
    );
}

/* -----------------------
   Mentee Dashboard
   ----------------------- */
function MenteeDashboard() {
    const auth = getAuth();
    if (!auth || auth.role !== "Mentee") return <div className="p-6">Please login as Mentee</div>;
    const meEmail = auth.email;
    const [tab, setTab] = useState("Dashboard");
    return (
        <div className="min-h-screen flex font-sans">
            <LeftSidebar meEmail={meEmail} active={tab} setActive={setTab} />
            <div className="flex-1">
                <div className="p-4 border-b flex justify-between items-center"><h2 className="text-xl font-semibold">Mentee Dashboard</h2><div><button onClick={() => window.history.back()} className="border px-3 py-1 rounded">Back</button></div></div>
                <div>
                    {tab === "Dashboard" && <div className="p-4"><MatchingPanel meEmail={meEmail} /></div>}
                    {tab === "Messages" && <MessagingPanel meEmail={meEmail} />}
                    {tab === "Announcements" && <AnnouncementsPanel me={getUsers().find(u => u.email === meEmail)} />}
                    {tab === "Resources" && <ResourcesPanel meEmail={meEmail} />}
                    {tab === "Schedules" && <div className="p-4">Schedules area</div>}
                    {tab === "Profile" && <ProfileEdit email={meEmail} onSaved={() => (window.location.hash = `viewProfile?email=${encodeURIComponent(meEmail)}`)} />}
                </div>
            </div>
        </div>
    );
}

/* -----------------------
   Admin: Add modal + CRUD
   ----------------------- */
function AddUserModal({ show, onClose, onAdd }) {
    const [form, setForm] = useState({ fullName: "", email: "", password: "", role: "Mentee" });
    useEffect(() => {
        if (!show) setForm({ fullName: "", email: "", password: "", role: "Mentee" });
    }, [show]);
    const submit = () => {
        if (!form.fullName || !form.email || !form.password) return alert("Please provide all fields");
        onAdd(form);
        onClose();
    };
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-sans">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Add New User</h3>
                <input className="w-full border p-2 mb-2 rounded" placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                <input className="w-full border p-2 mb-2 rounded" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className="w-full border p-2 mb-2 rounded" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <select className="w-full border p-2 mb-4 rounded" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    <option value="Mentee">Mentee</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Admin">Admin</option>
                </select>
                <div className="flex justify-end gap-3">
                    <Primary onClick={submit}>Add</Primary>
                    <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
                </div>
            </div>
        </div>
    );
}

function AdminPanel() {
    const [users, setUsers] = useState(getUsers());
    const [editing, setEditing] = useState(null);
    const [confirmShow, setConfirmShow] = useState(false);
    const [toDelete, setToDelete] = useState(null);
    const [addShow, setAddShow] = useState(false);

    useEffect(() => saveUsers(users), [users]);

    const add = (form) => {
        if (!emailRE.test(form.email)) return alert("Invalid email");
        if (getUsers().some((u) => u.email === form.email.trim().toLowerCase())) return alert("Email already exists");
        const u = {
            id: id("u"),
            fullName: form.fullName,
            email: form.email.trim().toLowerCase(),
            password: form.password,
            role: form.role,
            field: "",
            bio: "",
            avatar: null,
            mentees: [],
        };
        setUsers((prev) => [u, ...prev]);
    };

    const askDelete = (u) => { setToDelete(u); setConfirmShow(true); };
    const doDelete = () => {
        const u = toDelete;
        if (!u) { setConfirmShow(false); return; }
        const remaining = getUsers().filter((x) => x.id !== u.id && x.email !== u.email);
        const cleaned = remaining.map((x) => ({ ...x, mentees: (x.mentees || []).filter((m) => m !== u.email), matchedMentor: x.matchedMentor === u.email ? null : x.matchedMentor }));
        setUsers(cleaned);
        setConfirmShow(false); setToDelete(null);
    };

    const saveEdit = (u) => {
        setUsers((prev) => prev.map((p) => (p.id === u.id ? u : p)));
        setEditing(null);
    };

    return (
        <div className="min-h-screen p-6 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">Admin</h2>
                    <div className="flex gap-2">
                        <Primary onClick={() => setAddShow(true)}>Add</Primary>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {users.map((u) => (
                        <div key={u.id} className="p-3 border rounded flex justify-between items-center">
                            <div>
                                <div className="font-semibold">{u.fullName}</div>
                                <div className="text-sm text-black/60">{u.email} • {u.role}</div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setEditing(u)} className="border px-2 py-1 rounded">Edit</button>
                                <button onClick={() => askDelete(u)} className="border px-2 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                {editing && <EditUser user={editing} onClose={() => setEditing(null)} onSave={saveEdit} />}
                <ConfirmModal show={confirmShow} message={`Delete ${toDelete?.fullName || ""}?`} onConfirm={doDelete} onCancel={() => setConfirmShow(false)} />
                <AddUserModal show={addShow} onClose={() => setAddShow(false)} onAdd={add} />
            </div>
        </div>
    );
}

function EditUser({ user, onClose, onSave }) {
    const [s, setS] = useState({ ...user });
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
                <h3 className="text-lg font-semibold mb-3">Edit</h3>
                <div className="space-y-2">
                    <input className="w-full border p-2 rounded" value={s.fullName} onChange={(e) => setS({ ...s, fullName: e.target.value })} />
                    <input className="w-full border p-2 rounded" value={s.email} onChange={(e) => setS({ ...s, email: e.target.value })} />
                    <input className="w-full border p-2 rounded" value={s.password} onChange={(e) => setS({ ...s, password: e.target.value })} />
                    <select className="w-full border p-2 rounded" value={s.role} onChange={(e) => setS({ ...s, role: e.target.value })}>
                        <option>Mentor</option>
                        <option>Mentee</option>
                        <option>Admin</option>
                    </select>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={onClose} className="border px-3 py-1 rounded">Cancel</button>
                    <Primary onClick={() => onSave(s)}>Save</Primary>
                </div>
            </div>
        </div>
    );
}

/* -----------------------
   Admin login (small component)
   ----------------------- */
function AdminLogin({ onLogin }) {
    const [f, setF] = useState({ email: "", password: "" });
    const [err, setErr] = useState(null);
    const submit = (e) => {
        e.preventDefault();
        setErr(null);
        const users = getUsers();
        const u = users.find((x) => x.email === f.email.trim().toLowerCase());
        if (!u) return setErr("No account");
        if (u.password !== f.password) return setErr("Wrong password");
        if (u.role !== "Admin") return setErr("Not an Admin");
        setAuth(u);
        onLogin();
        window.location.hash = "adminDashboard";
    };
    return (
        <div className="p-6 max-w-md mx-auto font-sans">
            <div className="w-full bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold">Admin Login</h3>
                {err && <div className="text-red-600 mt-2">{err}</div>}
                <form className="mt-3 space-y-3" onSubmit={submit}>
                    <input className="w-full border p-2 rounded" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} required />
                    <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} required />
                    <Primary type="submit" className="w-full">Login</Primary>
                </form>
            </div>
        </div>
    );
}

/* -----------------------
   Router + Main App
   ----------------------- */
export default function CombinedFinal() {
    // Use hash routing so page persists on reload and links are bookmarkable
    const [page, setPage] = useState(window.location.hash.replace("#", "") || "hero");
    const [auth, setAuthState] = useState(getAuth());

    useEffect(() => {
        const onHash = () => setPage(window.location.hash.replace("#", "") || "hero");
        window.addEventListener("hashchange", onHash);
        return () => window.removeEventListener("hashchange", onHash);
    }, []);

    const onLogin = () => setAuthState(getAuth());
    const onLogout = () => setAuthState(null);

    // route helpers
    const routeEmail = (q) => {
        try {
            const [, qs] = q.split("?");
            if (!qs) return null;
            const params = new URLSearchParams(qs);
            return params.get("email");
        } catch (e) {
            return null;
        }
    };

    // page rendering
    if (page === "hero") return (<div className="font-sans"><Navbar navigate={() => { }} auth={getAuth()} onLogout={onLogout} /><Hero /><Footer /></div>);
    if (page === "mentorSignup") return (<div className="font-sans"><Navbar navigate={() => { }} auth={getAuth()} onLogout={onLogout} /><MentorSignup /></div>);
    if (page === "menteeSignup") return (<div className="font-sans"><Navbar navigate={() => { }} auth={getAuth()} onLogout={onLogout} /><MenteeSignup /></div>);
    if (page === "mentorLogin") return (<div className="font-sans"><Navbar navigate={() => { }} auth={getAuth()} onLogout={onLogout} /><MentorLogin onLogin={onLogin} /></div>);
    if (page === "menteeLogin") return (<div className="font-sans"><Navbar navigate={() => { }} auth={getAuth()} onLogout={onLogout} /><MenteeLogin onLogin={onLogin} /></div>);
    if (page === "adminLogin") return (<div className="font-sans"><Navbar navigate={() => { }} auth={getAuth()} onLogout={onLogout} /><AdminLogin onLogin={onLogin} /><Footer /></div>);
    if (page === "mentorDashboard") return (<div className="font-sans"><Navbar navigate={() => { }} auth={getAuth()} onLogout={onLogout} /><MentorDashboard /></div>);
    if (page === "menteeDashboard") return (<div className="font-sans"><Navbar navigate={() => { }} auth={getAuth()} onLogout={onLogout} /><MenteeDashboard /></div>);
    if (page === "adminDashboard") return (<div className="font-sans"><Navbar navigate={() => { }} auth={getAuth()} onLogout={onLogout} /><AdminPanel /></div>);
    if (page.startsWith("viewProfile")) {
        const e = routeEmail(page);
        return (<div className="font-sans"><Navbar navigate={() => { }} auth={getAuth()} onLogout={onLogout} /><ProfileView email={e} onClose={() => (getAuth()?.role === "Mentor" ? window.location.hash = "mentorDashboard" : window.location.hash = "menteeDashboard")} /></div>);
    }
    if (page.startsWith("editProfile")) {
        const e = routeEmail(page);
        return (<div className="font-sans"><Navbar navigate={() => { }} auth={getAuth()} onLogout={onLogout} /><ProfileEdit email={e} onSaved={() => (window.location.hash = `viewProfile?email=${encodeURIComponent(e)}`)} /></div>);
    }

    return <div className="p-6 font-sans">Page not found</div>;
}
