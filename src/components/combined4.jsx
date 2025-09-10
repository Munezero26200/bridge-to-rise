import React, { useState, useEffect } from "react";

///////////////////////
// Storage helpers
///////////////////////
const KEYS = {
    USERS: "b2r_users",
    AUTH: "b2r_auth",
    ANN: "b2r_ann",
    RES: "b2r_res",
    MSGS: "b2r_msgs",
    SCHED: "b2r_sched",
};

const load = (k, fallback) =>
    JSON.parse(localStorage.getItem(k) || JSON.stringify(fallback));
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const getUsers = () => load(KEYS.USERS, []);
const saveUsers = (u) => save(KEYS.USERS, u);
const getAuth = () => load(KEYS.AUTH, null);
const setAuthLS = (u) => save(KEYS.AUTH, u);
const clearAuthLS = () => localStorage.removeItem(KEYS.AUTH);
const getAnn = () => load(KEYS.ANN, []);
const saveAnn = (a) => save(KEYS.ANN, a);
const getRes = () => load(KEYS.RES, []);
const saveRes = (r) => save(KEYS.RES, r);
const getMsgs = () => load(KEYS.MSGS, []);
const saveMsgs = (m) => save(KEYS.MSGS, m);
const getSched = () => load(KEYS.SCHED, []);
const saveSched = (s) => save(KEYS.SCHED, s);

///////////////////////
// Utilities
///////////////////////
const makeId = (prefix = "id") =>
    `${prefix}-${Date.now()}-${Math.floor(Math.random() * 9000)}`;
const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

///////////////////////
// Shared UI
///////////////////////
function PrimaryButton({ children, className = "", ...props }) {
    // sunset gold background, hover -> white with deep blue text
    return (
        <button
            {...props}
            className={`px-4 py-2 rounded bg-[#d89e3b] text-white hover:bg-[#0b2545] hover:text-white transition font-medium ${className}`}
        >
            {children}
        </button>
    );
}

function ConfirmModal({ show, message, onConfirm, onCancel }) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
                <div className="mb-4 text-lg text-[#0b2545]">{message}</div>
                <div className="flex justify-center gap-3">
                    <PrimaryButton onClick={onConfirm}>Yes</PrimaryButton>
                    <button onClick={onCancel} className="px-4 py-2 rounded border text-[#0b2545]">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

function IconPlus() {
    return (
        <svg className="w-5 h-5 text-[#0b2545]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
        </svg>
    );
}

///////////////////////
// Navbar
///////////////////////
function Navbar({ navigate, auth, onLogout }) {
    return (
        <nav className="sticky top-0 z-50 bg-[#d89e3b] border-b rounded-md">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain rounded-xl" />
                    <div className="text-2xl font-semibold text-white">BRIDGE2RISE</div>
                </div>

                <div className="hidden md:flex items-center gap-8 text-white text-xl font-semibold font-sans">
                    <button onClick={() => navigate("hero")}>Home</button>

                    {!auth && (
                        <>
                            <button onClick={() => navigate("mentorLogin")}>Mentor</button>
                            <button onClick={() => navigate("menteeLogin")}>Mentee</button>
                            <button onClick={() => navigate("adminLogin")}>Admin</button>
                        </>
                    )}

                    {auth?.role === "Mentor" && <button onClick={() => navigate("mentorDashboard")}>Dashboard</button>}
                    {auth?.role === "Mentee" && <button onClick={() => navigate("menteeDashboard")}>Dashboard</button>}
                    {auth?.role === "Admin" && <button onClick={() => navigate("adminDashboard")}>Dashboard</button>}
                </div>

                <div className="flex items-center gap-3">
                    {auth ? (
                        <>
                            <span className="hidden sm:inline text-sm text-white">{auth.email}</span>
                            <button
                                onClick={() => {
                                    clearAuthLS();
                                    onLogout();
                                    navigate("hero");
                                }}
                                className="text-sm text-white"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button onClick={() => navigate("menteeLogin")} className="text-sm text-white">
                            Sign in
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

///////////////////////
// Footer (fixed as provided)
///////////////////////
function Footer() {
    return (
        <footer
            className="footer-brand"
            style={{
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                borderTop: "1px solid rgba(255,255,255,0.06)",
                backgroundColor: "#0b2545",
                color: "white",
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "12px 18px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                }}
            >
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
                        <li>
                            <a href="#" className="hover:underline hover:text-bg-[#d89e3b] transition-colors duration-200">
                                Mentorship
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline hover:text-bg-[#d89e3b] transition-colors duration-200">
                                Career Resources
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline hover:text-bg-[#d89e3b] transition-colors duration-200">
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

///////////////////////
// Landing / Hero
///////////////////////
function Hero({ navigate }) {
    return (
        <main className="relative bg-cover bg-center" style={{ backgroundImage: "url('/mentoringNew.png')" }}>
            <div className="absolute inset-0 bg-black opacity-80" />
            <div className="relative max-w-6xl mx-auto px-6 py-20 text-white">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Connecting diaspora expertise with youth.
                        </h1>
                        <p className="mt-4 text-lg opacity-90">
                            Mentorship, career readiness, and networks. A bridge to global opportunities and mentorship, empowering the next generation of African leaders.
                        </p>
                        <div className="mt-6 flex gap-4">
                            <PrimaryButton onClick={() => navigate("mentorLogin")}>Login as Mentor</PrimaryButton>
                            <PrimaryButton onClick={() => navigate("menteeLogin")}>Login as Mentee</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

///////////////////////
// Authentication screens (centered)
///////////////////////
function MentorSignup({ navigate, setAuth }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [field, setField] = useState("");
    const [err, setErr] = useState("");

    const submit = (e) => {
        e.preventDefault();
        setErr("");
        if (!emailRE.test(email)) return setErr("Invalid email");
        if (password.length < 6) return setErr("Password must be at least 6 chars");
        const users = getUsers();
        if (users.some((u) => u.email === email.trim().toLowerCase())) return setErr("Email already exists");
        const u = { id: makeId("u"), fullName, email: email.trim().toLowerCase(), password, role: "Mentor", field, bio: "", avatar: null, mentees: [] };
        users.unshift(u);
        saveUsers(users);
        setAuth(u);
        setAuthLS(u);
        window.location.hash = "mentorDashboard";
    };

    return (
        <div className="min-h-screen bg-[#0b2545] text-[#0b2545] flex items-center justify-center px-6 py-12">
            <form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Mentor Sign up</h2>
                {err && <div className="text-red-300 mb-2">{err}</div>}
                <input className="w-full p-2 rounded bg-white/10 border mb-2" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <input className="w-full p-2 rounded bg-white/10 border mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="w-full p-2 rounded bg-white/10 border mb-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input className="w-full p-2 rounded bg-white/10 border mb-4" placeholder="Field (e.g., Computer Science)" value={field} onChange={(e) => setField(e.target.value)} required />
                <div className="flex gap-3">
                    <PrimaryButton type="submit" className="flex-1">Sign up</PrimaryButton>
                    <button type="button" onClick={() => (window.location.hash = "hero")} className="flex-1 border rounded">Cancel</button>
                </div>
                <p className="mt-3 text-sm">Already have an account? <button type="button" className="underline" onClick={() => (window.location.hash = "mentorLogin")}>Login</button></p>
            </form>
        </div>
    );
}

function MenteeSignup({ navigate, setAuth }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [field, setField] = useState("");
    const [err, setErr] = useState("");

    const submit = (e) => {
        e.preventDefault();
        setErr("");
        if (!emailRE.test(email)) return setErr("Invalid email");
        if (password.length < 6) return setErr("Password must be at least 6 chars");
        const users = getUsers();
        if (users.some((u) => u.email === email.trim().toLowerCase())) return setErr("Email already exists");
        const u = { id: makeId("u"), fullName, email: email.trim().toLowerCase(), password, role: "Mentee", field, bio: "", avatar: null, matchedMentor: null };
        users.unshift(u);
        saveUsers(users);
        setAuth(u);
        setAuthLS(u);
        window.location.hash = "menteeDashboard";
    };

    return (
        <div className="min-h-screen bg-[#0b2545] text-[#0b2545] flex items-center justify-center px-6 py-12">
            <form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Mentee Sign up</h2>
                {err && <div className="text-red-300 mb-2">{err}</div>}
                <input className="w-full p-2 rounded bg-white/10 border mb-2" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <input className="w-full p-2 rounded bg-white/10 border mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="w-full p-2 rounded bg-white/10 border mb-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input className="w-full p-2 rounded bg-white/10 border mb-4" placeholder="Field of interest (e.g., Computer Science)" value={field} onChange={(e) => setField(e.target.value)} required />
                <div className="flex gap-3">
                    <PrimaryButton type="submit" className="flex-1">Sign up</PrimaryButton>
                    <button type="button" onClick={() => (window.location.hash = "hero")} className="flex-1 border rounded">Cancel</button>
                </div>
                <p className="mt-3 text-sm">Already have an account? <button type="button" className="underline" onClick={() => (window.location.hash = "menteeLogin")}>Login</button></p>
            </form>
        </div>
    );
}

function MentorLogin({ setAuth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const submit = (e) => {
        e.preventDefault();
        setErr("");
        const users = getUsers();
        const u = users.find((x) => x.email === email.trim().toLowerCase() && x.password === password && x.role === "Mentor");
        if (!u) return setErr("Invalid credentials");
        setAuthLS(u);
        setAuth(u);
        window.location.hash = "mentorDashboard";
    };
    return (
        <div className="min-h-screen bg-[#0b2545] text-[#0b2545] flex items-center justify-center px-6 py-12">
            <form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Mentor Login</h2>
                {err && <div className="text-red-300 mb-2">{err}</div>}
                <input className="w-full p-2 rounded bg-white/10 border mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="w-full p-2 rounded bg-white/10 border mb-4" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <PrimaryButton type="submit" className="w-full">Login</PrimaryButton>
                <p className="mt-3 text-sm">No account? <button type="button" className="underline" onClick={() => (window.location.hash = "mentorSignup")}>Sign up</button></p>
            </form>
        </div>
    );
}

function MenteeLogin({ setAuth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const submit = (e) => {
        e.preventDefault();
        setErr("");
        const users = getUsers();
        const u = users.find((x) => x.email === email.trim().toLowerCase() && x.password === password && x.role === "Mentee");
        if (!u) return setErr("Invalid credentials");
        setAuthLS(u);
        setAuth(u);
        window.location.hash = "menteeDashboard";
    };
    return (
        <div className="min-h-screen bg-[#0b2545] text-[#0b2545] flex items-center justify-center px-6 py-12">
            <form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Mentee Login</h2>
                {err && <div className="text-red-300 mb-2">{err}</div>}
                <input className="w-full p-2 rounded bg-white/10 border mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="w-full p-2 rounded bg-white/10 border mb-4" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <PrimaryButton type="submit" className="w-full">Login</PrimaryButton>
                <p className="mt-3 text-sm">No account? <button type="button" className="underline" onClick={() => (window.location.hash = "menteeSignup")}>Sign up</button></p>
            </form>
        </div>
    );
}

function AdminLogin({ setAuth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const submit = (e) => {
        e.preventDefault();
        setErr("");
        const users = getUsers();
        const u = users.find((x) => x.email === email.trim().toLowerCase() && x.password === password && x.role === "Admin");
        if (!u) return setErr("Invalid credentials");
        setAuthLS(u);
        setAuth(u);
        window.location.hash = "adminDashboard";
    };
    return (
        <div className="min-h-screen bg-[#0b2545] text-[#0b2545] flex items-center justify-center px-6 py-12">
            <form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Admin Login</h2>
                {err && <div className="text-red-300 mb-2">{err}</div>}
                <input className="w-full p-2 rounded bg-white/10 border mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="w-full p-2 rounded bg-white/10 border mb-4" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <PrimaryButton type="submit" className="w-full">Login</PrimaryButton>
            </form>
        </div>
    );
}

///////////////////////
// Profile view & edit
///////////////////////
function ProfileView({ email, onBack }) {
    const users = getUsers();
    const user = users.find((u) => u.email === email);
    if (!user) return <div className="p-6">Profile not found <button onClick={onBack} className="ml-2 border px-2 py-1 rounded">Back</button></div>;
    return (
        <div className="min-h-screen bg-[#0b2545] text-white px-6 py-8">
            <div className="max-w-4xl mx-auto bg-white/5 p-6 rounded">
                <div className="flex gap-6 items-center">
                    <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200">
                        {user.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-black/40">No image</div>}
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold">{user.fullName}</h2>
                        <div className="text-white/80">{user.role} • {user.field}</div>
                        <p className="mt-3">{user.bio}</p>
                        {user.role === "Mentee" && user.careerGoal && <p className="mt-2 text-sm">Career goal: {user.careerGoal}</p>}
                    </div>
                </div>
                <div className="mt-4">
                    <button onClick={onBack} className="border px-3 py-1 rounded">Back</button>
                    <button onClick={() => window.location.hash = `editProfile?email=${encodeURIComponent(email)}`} className="ml-2 px-3 py-1 rounded border">Edit</button>
                </div>
            </div>
        </div>
    );
}

function ProfileEdit({ email, onSaved }) {
    const [usersState, setUsersState] = useState(getUsers());
    const me = usersState.find((u) => u.email === email) || {};
    const [form, setForm] = useState({ ...me });
    useEffect(() => setForm({ ...me }), [email]); // reset when email changes

    const pick = (file) => {
        if (!file) return;
        const fr = new FileReader();
        fr.onload = () => setForm((s) => ({ ...s, avatar: fr.result }));
        fr.readAsDataURL(file);
    };

    const saveProfile = () => {
        const updated = usersState.map((u) => (u.email === email ? { ...u, ...form } : u));
        setUsersState(updated);
        saveUsers(updated);

        // if current auth is the edited user, update auth in storage too
        const auth = getAuth();
        if (auth && auth.email === email) {
            const updatedAuth = { ...auth, ...form };
            setAuthLS(updatedAuth);
        }

        if (onSaved) onSaved();
    };

    return (
        <div className="min-h-screen bg-[#0b2545] text-white px-6 py-8">
            <div className="max-w-3xl mx-auto bg-white/5 p-6 rounded">
                <div className="flex gap-6">
                    <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200">
                        {form.avatar ? <img src={form.avatar} alt="avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-black/40">No image</div>}
                    </div>
                    <div className="flex-1">
                        <label className="block mb-2">Upload photo</label>
                        <input type="file" onChange={(e) => pick(e.target.files[0])} className="mb-4" />
                        <input className="w-full p-2 rounded bg-white/10 border mb-2" value={form.fullName || ""} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Full name" />
                        <input className="w-full p-2 rounded bg-white/10 border mb-2" value={form.field || ""} onChange={(e) => setForm({ ...form, field: e.target.value })} placeholder="Field" />
                        {form.role === "Mentee" && <input className="w-full p-2 rounded bg-white/10 border mb-2" value={form.careerGoal || ""} onChange={(e) => setForm({ ...form, careerGoal: e.target.value })} placeholder="Career goal" />}
                        <textarea className="w-full p-2 rounded bg-white/10 border mb-2" value={form.bio || ""} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Short bio" />
                        <div className="mt-4 flex justify-end gap-2">
                            <PrimaryButton onClick={saveProfile}>Save</PrimaryButton>
                            <button onClick={() => onSaved && onSaved()} className="border px-3 py-1 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
///////////////////////
// Schedules Panel
///////////////////////
function SchedulesPanel({ meEmail }) {
    const [items, setItems] = useState(getSched());
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [desc, setDesc] = useState("");

    useEffect(() => saveSched(items), [items]);

    const me = getUsers().find((u) => u.email === meEmail);

    const add = () => {
        if (!title || !date) return alert("Please add title and date");
        const it = { id: makeId("s"), by: meEmail, for: me.matchedMentor || null, title, date, desc, ts: Date.now() };
        setItems([it, ...items]);
        setTitle(""); setDate(""); setDesc("");
    };

    // Visible: personal + (if mentor) mentee schedules; if mentee, show mentor’s schedules too
    const visible = items.filter((s) => {
        if (s.by === meEmail) return true;
        if (me.role === "Mentee" && s.by === me.matchedMentor) return true;
        if (me.role === "Mentor" && (me.mentees || []).includes(s.by)) return true;
        return false;
    });

    const del = (id) => {
        if (!confirm("Delete schedule?")) return;
        setItems((s) => s.filter((x) => x.id !== id));
    };

    return (
        <div className="p-4 bg-white">
            <h4 className="font-semibold text-[#0b2545]">Schedules</h4>

            <div className="mt-3 bg-white p-3 rounded">
                <input className="w-full p-2 rounded bg-white border mb-2 text-[#0b2545]"
                    placeholder="Title (e.g., Meeting, Personal Task)"
                    value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="date" className="w-full p-2 rounded bg-white border mb-2 text-[#0b2545]"
                    value={date} onChange={(e) => setDate(e.target.value)} />
                <textarea className="w-full p-2 rounded bg-white border mb-2 text-w[#0b2545]"
                    placeholder="Description (optional)"
                    value={desc} onChange={(e) => setDesc(e.target.value)} />
                <PrimaryButton onClick={add}>Add Schedule</PrimaryButton>
            </div>

            <div className="mt-4 space-y-3">
                {visible.map((s) => (
                    <div key={s.id} className="p-3 rounded bg-white">
                        <div className="font-semibold text-[#0b2545]">{s.title}</div>
                        <div className="text-sm text-[#0b2545]">{s.date} • by {s.by}</div>
                        {s.desc && <p className="mt-1">{s.desc}</p>}
                        {s.by === meEmail && (
                            <button onClick={() => del(s.id)} className="mt-2 border px-2 py-1 rounded text-[#0b2545]">Delete</button>
                        )}
                    </div>
                ))}
                {visible.length === 0 && <div className="text-white">No schedules yet.</div>}
            </div>
        </div>
    );
}

///////////////////////
// Messaging
///////////////////////
function MessagingPanel({ meEmail }) {
    const [msgs, setMsgs] = useState(getMsgs());
    useEffect(() => saveMsgs(msgs), [msgs]);

    const [to, setTo] = useState("");
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);

    const people = getUsers().filter((u) => u.email !== meEmail);

    const attach = (f) => {
        if (!f) return;
        const fr = new FileReader();
        fr.onload = () => setFile({ name: f.name, data: fr.result });
        fr.readAsDataURL(f);
    };

    const send = () => {
        if (!to || !text.trim()) return alert("Please add recipient and message");
        const m = { id: makeId("m"), from: meEmail, to, text: text.trim(), file, ts: Date.now() };
        setMsgs([m, ...msgs]);
        setText("");
        setFile(null);
    };

    return (
        <div className="p-4">
            <h4 className="font-semibold text-white">Messages</h4>
            <select className="w-full border p-2 rounded mb-2 bg-white text-[#0b2545]" value={to} onChange={(e) => setTo(e.target.value)}>
                <option value="">Select recipient</option>
                {people.map((p) => (
                    <option key={p.email} value={p.email}>
                        {p.fullName} ({p.role})
                    </option>
                ))}
            </select>

            <div className="relative">
                <textarea className="w-full border p-3 rounded h-28 bg-white text-[#0b2545]" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a message" />
                <div className="absolute right-2 bottom-2 flex items-center gap-2">
                    <label className="p-2 border rounded cursor-pointer bg-white/5">
                        <input type="file" className="hidden text-[#0b2545]" onChange={(e) => attach(e.target.files[0])} />
                        <IconPlus />
                    </label>
                    <PrimaryButton onClick={send}>Send</PrimaryButton>
                    <button onClick={() => { setText(""); setFile(null); }} className="border px-3 py-1 rounded text-[#0b2545]">Cancel</button>
                </div>
            </div>

            <div className="mt-4 space-y-3">
                {msgs.filter((m) => m.to === meEmail || m.from === meEmail).map((m) => (
                    <div key={m.id} className="p-3 rounded bg-white/5">
                        <div className="text-sm text-white/70">{m.from} → {m.to} • {new Date(m.ts).toLocaleString()}</div>
                        <div className="mt-1">{m.text}</div>
                        {m.file && (
                            <a href={m.file.data} download={m.file.name} className="underline text-white/90">Download {m.file.name}</a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

///////////////////////
// Announcements
///////////////////////
function AnnouncementsPanel({ me }) {
    const [ann, setAnn] = useState(getAnn());
    useEffect(() => saveAnn(ann), [ann]);
    const [text, setText] = useState("");

    const post = () => {
        if (!text.trim()) return;
        setAnn([{ id: makeId("a"), by: me.email, text: text.trim(), ts: Date.now() }, ...ann]);
        setText("");
    };

    return (
        <div className="p-4">
            <h4 className="font-semibold text-white">Announcements</h4>
            {me.role === "Mentor" && (
                <div className="mt-2">
                    <textarea className="w-full border p-2 rounded h-24 bg-white/5 text-white" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write announcement" />
                    <div className="mt-2"><PrimaryButton onClick={post}>Post</PrimaryButton></div>
                </div>
            )}

            <div className="mt-4 space-y-3">
                {getAnn().map((a) => (
                    <div key={a.id} className="p-3 rounded bg-white/5">
                        <div className="text-sm text-white/70">By {a.by} • {new Date(a.ts).toLocaleString()}</div>
                        <div className="mt-1 text-white">{a.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

///////////////////////
// Resources (mentor upload, mentee download)
///////////////////////
function ResourcesPanel({ meEmail }) {
    const [res, setRes] = useState(getRes());
    useEffect(() => saveRes(res), [res]);
    const me = getUsers().find((u) => u.email === meEmail);
    const upload = (f) => {
        if (!f) return;
        const fr = new FileReader();
        fr.onload = () => setRes([{ id: makeId("r"), name: f.name, by: meEmail, data: fr.result, ts: Date.now() }, ...res]);
        fr.readAsDataURL(f);
    };
    const del = (id) => {
        if (!confirm("Delete resource?")) return;
        setRes((s) => s.filter((x) => x.id !== id));
    };
    return (
        <div className="p-4">
            <h4 className="font-semibold text-white">Resources</h4>
            {me.role === "Mentor" && (
                <div className="mt-2 mb-3">
                    <label className="p-2 border rounded cursor-pointer bg-white/5 text-white">
                        <input type="file" className="hidden" onChange={(e) => upload(e.target.files[0])} />
                        Upload resource
                    </label>
                </div>
            )}
            <div className="space-y-3">
                {res.map((r) => (
                    <div key={r.id} className="p-3 rounded bg-white/5 flex justify-between items-center">
                        <div>
                            <div className="font-semibold text-white">{r.name}</div>
                            <div className="text-sm text-white/70">By {r.by} • {new Date(r.ts).toLocaleString()}</div>
                        </div>
                        <div className="flex gap-2">
                            <a href={r.data} download={r.name} className="underline text-white">Download</a>
                            {me.role === "Mentor" && r.by === meEmail && <button onClick={() => del(r.id)} className="border px-2 py-1 rounded text-white">Delete</button>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

///////////////////////
// Matching
///////////////////////
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
        alert("Matched");
    };
    const doUnmatch = (mentorEmail) => {
        const all = getUsers();
        const updated = all.map((u) => {
            if (u.email === meEmail) return { ...u, matchedMentor: null };
            if (u.email === mentorEmail) return { ...u, mentees: (u.mentees || []).filter((x) => x !== meEmail) };
            return u;
        });
        saveUsers(updated);
        alert("Unmatched");
    };

    // Suggest mentors matching mentee.field (if available), else list all
    const suggested = me?.field ? mentors.filter((m) => m.field?.toLowerCase().includes(me.field.toLowerCase())) : mentors;

    return (
        <div className="p-4">
            <h4 className="font-semibold text-white">Suggested mentors</h4>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
                {suggested.map((m) => {
                    const matched = me?.matchedMentor === m.email;
                    return (
                        <div key={m.email} className="p-3 rounded bg-white/5 flex justify-between items-center">
                            <div>
                                <div className="font-semibold text-white">{m.fullName}</div>
                                <div className="text-white/80 text-sm">Field: {m.field}</div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                {matched ? <PrimaryButton onClick={() => doUnmatch(m.email)}>Unmatch</PrimaryButton> : <PrimaryButton onClick={() => doMatch(m.email)}>Match</PrimaryButton>}
                                <button onClick={() => window.location.hash = `viewProfile?email=${encodeURIComponent(m.email)}`} className="px-3 py-1 border rounded text-white">View</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

///////////////////////
// Projects Panel (with file upload)
///////////////////////
function ProjectsPanel({ meEmail }) {
    const [projects, setProjects] = useState(load("b2r_projects", []));
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const me = getUsers().find((u) => u.email === meEmail);

    useEffect(() => save("b2r_projects", projects), [projects]);

    const addProject = () => {
        if (!title) return alert("Please add title");
        const p = {
            id: makeId("p"),
            title,
            desc,
            by: meEmail,
            mentee: me.role === "Mentee" ? meEmail : null,
            tasks: [],
            files: [],
            ts: Date.now()
        };
        setProjects([p, ...projects]);
        setTitle(""); setDesc("");
    };

    const addTask = (pid, text) => {
        if (!text) return;
        setProjects((s) =>
            s.map((p) =>
                p.id === pid ? { ...p, tasks: [...p.tasks, { id: makeId("t"), text, done: false }] } : p
            )
        );
    };

    const toggleTask = (pid, tid) => {
        setProjects((s) =>
            s.map((p) =>
                p.id === pid ? { ...p, tasks: p.tasks.map((t) => (t.id === tid ? { ...t, done: !t.done } : t)) } : p
            )
        );
    };

    const handleFileUpload = (pid, file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileData = {
                id: makeId("f"),
                name: file.name,
                type: file.type,
                size: file.size,
                data: e.target.result
            };
            setProjects((s) =>
                s.map((p) =>
                    p.id === pid ? { ...p, files: [...p.files, fileData] } : p
                )
            );
        };
        reader.readAsDataURL(file);
    };

    // visible projects
    // visible projects (mentee sees mentor's, mentor sees mentees')
    const visible = projects.filter((p) => {
        if (me.role === "Mentee") {
            // show my projects + projects by my mentor
            return p.mentee === meEmail || p.by === me.matchedMentor;
        }
        if (me.role === "Mentor") {
            // show my projects + projects from any of my mentees
            return p.by === meEmail || (me.mentees || []).includes(p.mentee);
        }
        return false;
    });

    return (
        <div className="p-4">
            <h4 className="font-semibold text-white">Projects</h4>

            <div className="mt-3 bg-white/5 p-3 rounded">
                <input className="w-full p-2 rounded bg-white/10 border mb-2 text-white"
                    placeholder="Project title"
                    value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea className="w-full p-2 rounded bg-white/10 border mb-2 text-white"
                    placeholder="Description"
                    value={desc} onChange={(e) => setDesc(e.target.value)} />
                <PrimaryButton onClick={addProject}>Add Project</PrimaryButton>
            </div>

            <div className="mt-4 space-y-3">
                {visible.map((p) => (
                    <div key={p.id} className="p-3 rounded bg-white/5">
                        <div className="font-semibold text-white">{p.title}</div>
                        <div className="text-sm text-white/70">By {p.by} • {new Date(p.ts).toLocaleString()}</div>
                        {p.desc && <p className="mt-1">{p.desc}</p>}

                        {/* Add tasks */}
                        <div className="mt-2">
                            <input type="text" placeholder="New task" className="border p-1 mr-2 rounded bg-white/10 text-white"
                                onKeyDown={(e) => { if (e.key === "Enter") { addTask(p.id, e.target.value); e.target.value = ""; } }} />
                        </div>
                        <ul className="mt-2 space-y-1">
                            {p.tasks.map((t) => (
                                <li key={t.id} className="flex items-center gap-2">
                                    <input type="checkbox" checked={t.done} onChange={() => toggleTask(p.id, t.id)} />
                                    <span className={t.done ? "line-through text-white/60" : ""}>{t.text}</span>
                                </li>
                            ))}
                        </ul>

                        {/* File upload */}
                        <div className="mt-3">
                            <label className="cursor-pointer text-sm text-[#f59e0b] hover:underline">
                                + Upload File
                                <input type="file" hidden onChange={(e) => handleFileUpload(p.id, e.target.files[0])} />
                            </label>
                            <ul className="mt-2 space-y-1">
                                {p.files.map((f) => (
                                    <li key={f.id}>
                                        <a href={f.data} download={f.name} className="text-sm text-blue-300 hover:underline">
                                            {f.name} ({Math.round(f.size / 1024)} KB)
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
                {visible.length === 0 && <div className="text-white/60">No projects yet.</div>}
            </div>
        </div>
    );
}

///////////////////////
// Left Sidebar for dashboards
///////////////////////
function LeftSidebar({ meEmail, active, setActive }) {
    const me = getUsers().find((u) => u.email === meEmail);
    return (
        <aside className="w-72 hidden lg:block bg-white/5 p-4 rounded">
            <div className="flex flex-col items-center">
                <div onClick={() => window.location.hash = `viewProfile?email=${encodeURIComponent(meEmail)}`} className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 cursor-pointer">
                    {me?.avatar ? <img src={me.avatar} alt="avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-black/40">No image</div>}
                </div>
                <div className="mt-3 text-white font-semibold">{me?.fullName}</div>
                <div className="text-white/80 text-sm">{me?.role}</div>
            </div>

            <nav className="mt-6">
                {["Dashboard", "Messages", "Announcements", "Schedules", "Resources", "Projects", "Profile"].map((tab) => (
                    <button key={tab} onClick={() => setActive(tab)} className={`w-full text-left p-2 rounded my-1 ${active === tab ? "bg-white/10" : "hover:bg-white/5"} text-white`}>
                        {tab}
                    </button>
                ))}
            </nav>
        </aside>
    );
}

///////////////////////
// Mentor Dashboard
///////////////////////
function MentorDashboardWrapper() {
    const auth = getAuth();
    if (!auth || auth.role !== "Mentor") return <div className="p-6">Please login as Mentor</div>;
    const meEmail = auth.email;
    const [tab, setTab] = useState("Dashboard");

    return (
        <div className="min-h-screen bg-[#0b2545] text-white pb-40">
            <div className="max-w-6xl mx-auto px-6 py-6 flex gap-6">
                <LeftSidebar meEmail={meEmail} active={tab} setActive={setTab} />
                <main className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Mentor Dashboard</h2>
                        <div className="flex gap-2">
                            <button onClick={() => window.history.back()} className="border px-3 py-1 rounded">Back</button>
                        </div>
                    </div>

                    {tab === "Dashboard" && (
                        <div className="bg-white/5 p-4 rounded">
                            <h3 className="font-semibold text-white">Your Mentees</h3>
                            <div className="grid md:grid-cols-3 gap-3 mt-3">
                                {getUsers().filter((u) => u.role === "Mentee" && u.matchedMentor === meEmail).map((m) => (
                                    <div key={m.email} className="p-3 rounded bg-white/10">
                                        <div className="font-semibold text-white">{m.fullName}</div>
                                        <div className="text-white/70 text-sm">{m.email}</div>
                                        <div className="mt-2">
                                            <button onClick={() => window.location.hash = `viewProfile?email=${encodeURIComponent(m.email)}`} className="px-3 py-1 border rounded text-white">View</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* {tab === "Dashboard" && <div className="bg-white/5 p-4 rounded"><MatchingPanel meEmail={meEmail} /></div>} */}
                    {tab === "Messages" && <div className="mt-3"><MessagingPanel meEmail={meEmail} /></div>}
                    {tab === "Announcements" && <div className="mt-3"><AnnouncementsPanel me={getUsers().find((u) => u.email === meEmail)} /></div>}
                    {tab === "Resources" && <div className="mt-3"><ResourcesPanel meEmail={meEmail} /></div>}
                    {tab === "Projects" && <div className="mt-3"><ProjectsPanel meEmail={meEmail} /></div>}
                    {tab === "Schedules" && <div className="mt-3"><SchedulesPanel meEmail={meEmail} /></div>}
                    {tab === "Profile" && <div className="mt-3"><ProfileEdit email={meEmail} onSaved={() => window.location.hash = `viewProfile?email=${encodeURIComponent(meEmail)}`} /></div>}
                </main>
            </div>
        </div>
    );
}

///////////////////////
// Mentee Dashboard
///////////////////////
function MenteeDashboardWrapper() {
    const auth = getAuth();
    if (!auth || auth.role !== "Mentee") return <div className="p-6">Please login as Mentee</div>;
    const meEmail = auth.email;
    const [tab, setTab] = useState("Dashboard");

    return (
        <div className="min-h-screen bg-[#0b2545] text-white pb-40">
            <div className="max-w-6xl mx-auto px-6 py-6 flex gap-6">
                <LeftSidebar meEmail={meEmail} active={tab} setActive={setTab} />
                <main className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Mentee Dashboard</h2>
                        <div className="flex gap-2">
                            <button onClick={() => window.history.back()} className="border px-3 py-1 rounded">Back</button>
                        </div>
                    </div>

                    {tab === "Dashboard" && <div className="bg-white/5 p-4 rounded"><MatchingPanel meEmail={meEmail} /></div>}
                    {tab === "Messages" && <div className="mt-3"><MessagingPanel meEmail={meEmail} /></div>}
                    {tab === "Announcements" && <div className="mt-3"><AnnouncementsPanel me={getUsers().find((u) => u.email === meEmail)} /></div>}
                    {tab === "Resources" && <div className="mt-3"><ResourcesPanel meEmail={meEmail} /></div>}
                    {tab === "Projects" && <div className="mt-3"><ProjectsPanel meEmail={meEmail} /></div>}
                    {tab === "Schedules" && <div className="mt-3"><SchedulesPanel meEmail={meEmail} /></div>}
                    {tab === "Profile" && <div className="mt-3"><ProfileEdit email={meEmail} onSaved={() => window.location.hash = `viewProfile?email=${encodeURIComponent(meEmail)}`} /></div>}
                </main>
            </div>
        </div>
    );
}

///////////////////////
// Admin panel with add modal & confirm delete
///////////////////////
function AddUserModal({ show, onClose, onAdd }) {
    const [form, setForm] = useState({ fullName: "", email: "", password: "", role: "Mentee", field: "" });
    useEffect(() => { if (!show) setForm({ fullName: "", email: "", password: "", role: "Mentee", field: "" }); }, [show]);

    const submit = () => {
        if (!form.fullName || !form.email || !form.password) return alert("Please fill all fields");
        if (!emailRE.test(form.email)) return alert("Invalid email");
        onAdd(form);
        onClose();
    };

    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white text-[#0b2545] p-6 rounded max-w-md w-full">
                <h3 className="text-lg font-semibold mb-3">Add user</h3>
                <input className="w-full p-2 border rounded mb-2" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                <input className="w-full p-2 border rounded mb-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className="w-full p-2 border rounded mb-2" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <select className="w-full p-2 border rounded mb-3" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    <option value="Mentee">Mentee</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Admin">Admin</option>
                </select>
                <input className="w-full p-2 border rounded mb-3" placeholder="Field (optional)" value={form.field} onChange={(e) => setForm({ ...form, field: e.target.value })} />
                <div className="flex justify-end gap-3">
                    <PrimaryButton onClick={submit}>Add</PrimaryButton>
                    <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
                </div>
            </div>
        </div>
    );
}

function EditUserModal({ user, onClose, onSave }) {
    const [s, setS] = useState({ ...user });
    useEffect(() => setS({ ...user }), [user]);
    if (!user) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white text-[#0b2545] p-6 rounded max-w-md w-full">
                <h3 className="text-lg font-semibold mb-3">Edit user</h3>
                <input className="w-full p-2 border rounded mb-2" value={s.fullName} onChange={(e) => setS({ ...s, fullName: e.target.value })} />
                <input className="w-full p-2 border rounded mb-2" value={s.email} onChange={(e) => setS({ ...s, email: e.target.value })} />
                <input className="w-full p-2 border rounded mb-2" value={s.password} onChange={(e) => setS({ ...s, password: e.target.value })} />
                <select className="w-full p-2 border rounded mb-3" value={s.role} onChange={(e) => setS({ ...s, role: e.target.value })}>
                    <option>Mentor</option>
                    <option>Mentee</option>
                    <option>Admin</option>
                </select>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
                    <PrimaryButton onClick={() => onSave(s)}>Save</PrimaryButton>
                </div>
            </div>
        </div>
    );
}

function AdminPanelWrapper() {
    const [users, setUsers] = useState(getUsers());
    const [addShow, setAddShow] = useState(false);
    const [editing, setEditing] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [toDelete, setToDelete] = useState(null);

    useEffect(() => saveUsers(users), [users]);

    const addUser = (form) => {
        const u = { id: makeId("u"), fullName: form.fullName, email: form.email.trim().toLowerCase(), password: form.password, role: form.role, field: form.field || "", bio: "", avatar: null, mentees: [] };
        setUsers((s) => [u, ...s]);
    };

    const askDelete = (u) => { setToDelete(u); setConfirmDelete(true); };
    const doDelete = () => {
        setUsers((s) => s.filter((x) => x.email !== toDelete.email));
        setConfirmDelete(false);
        setToDelete(null);
    };

    const saveEdit = (u) => {
        setUsers((s) => s.map((x) => (x.id === u.id ? u : x)));
        setEditing(null);
    };

    return (
        <div className="min-h-screen bg-[#0b2545] text-white pb-40">
            <div className="max-w-6xl mx-auto px-6 py-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Admin</h2>
                    <PrimaryButton onClick={() => setAddShow(true)}>Add User</PrimaryButton>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {users.map((u) => (
                        <div key={u.id} className="p-3 rounded bg-white/5 flex justify-between items-center">
                            <div>
                                <div className="font-semibold">{u.fullName}</div>
                                <div className="text-sm text-white/70">{u.email} • {u.role}</div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setEditing(u)} className="border px-2 py-1 rounded">Edit</button>
                                <button onClick={() => askDelete(u)} className="border px-2 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                <AddUserModal show={addShow} onClose={() => setAddShow(false)} onAdd={addUser} />
                <EditUserModal user={editing} onClose={() => setEditing(null)} onSave={saveEdit} />
                <ConfirmModal show={confirmDelete} message={`Delete ${toDelete?.fullName || ""}?`} onConfirm={doDelete} onCancel={() => setConfirmDelete(false)} />
            </div>
        </div>
    );
}

///////////////////////
// Router + App Shell
///////////////////////
export default function Bridge2RiseApp() {
    const [page, setPage] = useState(window.location.hash.replace("#", "") || "hero");
    const [auth, setAuth] = useState(getAuth());

    useEffect(() => {
        function onHash() {
            setPage(window.location.hash.replace("#", "") || "hero");
            setAuth(getAuth());
        }
        window.addEventListener("hashchange", onHash);
        return () => window.removeEventListener("hashchange", onHash);
    }, []);

    useEffect(() => {
        const onStorage = () => setAuth(getAuth());
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const navigate = (p) => {
        window.location.hash = p;
        setPage(p);
        setAuth(getAuth());
    };

    const setAuthState = (u) => {
        setAuth(u);
        setAuthLS(u);
    };

    const onLogout = () => {
        clearAuthLS();
        setAuth(null);
        window.location.hash = "hero";
    };

    // helper to parse query string for view/edit routes
    const parseEmailFromRoute = (route) => {
        const [, qs] = route.split("?");
        if (!qs) return null;
        const params = new URLSearchParams(qs);
        return params.get("email");
    };

    // Route mapping
    let content = null;
    if (page === "hero") content = <Hero navigate={navigate} />;
    else if (page === "mentorSignup") content = <MentorSignup navigate={navigate} setAuth={setAuthState} />;
    else if (page === "menteeSignup") content = <MenteeSignup navigate={navigate} setAuth={setAuthState} />;
    else if (page === "mentorLogin") content = <MentorLogin setAuth={setAuthState} />;
    else if (page === "menteeLogin") content = <MenteeLogin setAuth={setAuthState} />;
    else if (page === "adminLogin") content = <AdminLogin setAuth={setAuthState} />;
    else if (page === "mentorDashboard") content = <MentorDashboardWrapper />;
    else if (page === "menteeDashboard") content = <MenteeDashboardWrapper />;
    else if (page === "adminDashboard") content = <AdminPanelWrapper />;
    else if (page.startsWith("viewProfile")) {
        const mail = parseEmailFromRoute(page);
        content = <ProfileView email={mail} onBack={() => { const a = getAuth(); if (!a) window.location.hash = "hero"; else window.location.hash = a.role === "Mentor" ? "mentorDashboard" : "menteeDashboard"; }} />;
    } else if (page.startsWith("editProfile")) {
        const mail = parseEmailFromRoute(page);
        content = <ProfileEdit email={mail} onSaved={() => window.location.hash = `viewProfile?email=${encodeURIComponent(mail)}`} />;
    } else {
        content = <div className="p-6">Page not found</div>;
    }

    return (
        <div className="min-h-screen bg-[#0b2545] text-white pb-40 font-sans">
            <Navbar navigate={navigate} auth={auth} onLogout={onLogout} />
            <div className="max-w-6xl mx-auto px-6">
                {content}
            </div>
            <div style={{ height: 140 }} /> {/* spacer to avoid footer overlap on small pages */}
            <Footer />
        </div>
    );
}
