// Bridge2RiseApp with Firebase (Auth + Firestore + Storage), schedules/messages, and guidance for tests & linting
// - Single-file React component (code/react canvas)
// - Uses Firebase modular SDK (v9+) — you must provide firebaseConfig below
// - Realtime syncing: platform stats, users, schedules, messages
// - Auth: register / login / logout via Firebase Auth
// - Profiles: avatar upload to Firebase Storage (optional, needs config)
// - Schedules & Messages: create/read in Firestore with realtime listeners
// - Unit test & linting guidance included (see comments at bottom)

import React, { useEffect, useState, createContext, useContext } from 'react';

// -------------------- IMPORTANT: Add your Firebase config --------------------
// Replace the placeholder object below with your Firebase project config.
// You can also inject this via environment variables (recommended for production).
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '<YOUR_API_KEY>',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '<YOUR_AUTH_DOMAIN>',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '<YOUR_PROJECT_ID>',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '<YOUR_STORAGE_BUCKET>',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '<YOUR_MESSAGING_SENDER_ID>',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '<YOUR_APP_ID>'
};

// -------------------- Firebase imports (modular) --------------------
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  onSnapshot,
  runTransaction,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';

// -------------------- Initialize Firebase services --------------------
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// -------------------- Auth context that wraps Firebase Auth --------------------
const AuthContext = createContext(null);
function useAuth() { return useContext(AuthContext); }

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        // read user doc from Firestore
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const snap = await getDoc(userDocRef);
          const userData = snap.exists() ? snap.data() : { email: fbUser.email };
          setCurrentUser({ uid: fbUser.uid, email: fbUser.email, ...userData });
        } catch (e) {
          setCurrentUser({ uid: fbUser.uid, email: fbUser.email });
        }
      } else {
        setCurrentUser(null);
      }
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  async function registerUser({ email, password, role, fullName, country }) {
    // create auth user
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;
    const userRecord = { email: email.toLowerCase().trim(), role, fullName: fullName || '', country: country || '', createdAt: new Date() };
    // create user doc in Firestore
    await setDoc(doc(db, 'users', uid), userRecord);

    // increment platform stats atomically
    const statsRef = doc(db, 'meta', 'platformStats');
    await runTransaction(db, async (t) => {
      const snap = await t.get(statsRef);
      if (!snap.exists()) {
        t.set(statsRef, { mentors: 0, mentees: 0, interactions: 0, courses: 0 });
      }
      const current = (snap.exists() ? snap.data() : { mentors: 0, mentees: 0 });
      const updated = { ...current };
      if (role === 'Mentor') updated.mentors = (Number(current.mentors) || 0) + 1;
      if (role === 'Mentee') updated.mentees = (Number(current.mentees) || 0) + 1;
      t.set(statsRef, updated, { merge: true });
    });

    return { uid, ...userRecord };
  }

  async function loginUser({ email, password }) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    // auth state listener will update currentUser
    return cred.user;
  }

  async function logoutUser() {
    await signOut(auth);
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider value={{ currentUser, authReady, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// -------------------- Helper UI pieces --------------------
const UploadIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5-5 5 5"/><path d="M12 5v12"/></svg>
);

function BackableNavbar() {
  const { currentUser, logoutUser } = useAuth();
  const handleLogout = async () => { await logoutUser(); window.location.hash = 'hero'; };

  return (
    <nav className="sticky top-0 z-50 bg-white text-black shadow">
      <div className="h-16 flex items-center justify-between px-6">
        <div className="flex items-center space-x-3">
          <button onClick={() => window.history.back()} className="px-3 py-1 rounded hover:bg-blue-100 text-black">← Back</button>
          <button onClick={() => (window.location.hash = 'hero')} className="flex items-center gap-2">
            <div className="h-10 w-10 bg-black rounded flex items-center justify-center text-white font-bold">B</div>
            <h1 className="text-lg font-semibold">BRIDGE2RISE</h1>
          </button>
        </div>
        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-medium">{currentUser.fullName || currentUser.email}</span>
                <span className="text-xs text-gray-500">{currentUser.role}</span>
              </div>
              <button onClick={handleLogout} className="px-3 py-2 rounded bg-black text-white hover:bg-gray-800">Logout</button>
            </>
          ) : (
            <div className="flex gap-2">
              <a href="#mentorLogin" className="px-3 py-2 rounded bg-black text-white">Mentor</a>
              <a href="#menteeLogin" className="px-3 py-2 rounded bg-black text-white">Mentee</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// -------------------- Hero: realtime stats from Firestore --------------------
function AnimatedStat({ target = 0, label = '', Icon }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    let current = 0;
    const duration = 1000;
    const fps = 30;
    const totalFrames = Math.max(1, Math.round((duration / 1000) * fps));
    const increment = (target - current) / totalFrames;
    let frame = 0;
    const raf = setInterval(() => {
      frame += 1;
      current += increment;
      if (!mounted) return;
      if (frame >= totalFrames) { setCount(Math.round(target)); clearInterval(raf); } else setCount(Math.round(current));
    }, Math.round(1000 / fps));
    return () => { mounted = false; clearInterval(raf); };
  }, [target]);

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md">
      <div className="mb-2 text-black">{Icon ? <Icon /> : null}</div>
      <div className="text-4xl font-bold font-serif">{count}</div>
      <div className="text-lg text-black">{label}</div>
    </div>
  );
}

function Hero({ navigate }) {
  const [stats, setStats] = useState({ mentors: 0, mentees: 0, interactions: 0, courses: 0 });

  useEffect(() => {
    const statsDoc = doc(db, 'meta', 'platformStats');
    const unsub = onSnapshot(statsDoc, (snap) => {
      if (!snap.exists()) {
        setStats({ mentors: 0, mentees: 0, interactions: 0, courses: 0 });
      } else {
        const data = snap.data();
        setStats({ mentors: Number(data.mentors || 0), mentees: Number(data.mentees || 0), interactions: Number(data.interactions || 0), courses: Number(data.courses || 0) });
      }
    });
    return () => unsub();
  }, []);

  return (
    <main className="bg-blue-100 min-h-screen font-sans">
      <section className="bg-white bg-cover text-black py-16 px-6 md:px-12 lg:px-20 lg:py-24 rounded-b-3xl">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0 lg:space-x-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight">Connecting the <span className="text-black">African Diaspora</span> with local youth.</h1>
            <p className="mt-4 md:text-lg font-sans">A bridge to global opportunities and mentorship, empowering the next generation of African leaders.</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 text-center text-black">
        <h2 className="text-xl md:text-2xl font-semibold mb-10">Our Growing Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatedStat target={stats.mentors} label="Mentors" Icon={UploadIcon} />
          <AnimatedStat target={stats.mentees} label="Mentees" Icon={UploadIcon} />
          <AnimatedStat target={stats.interactions} label="Interactions" Icon={UploadIcon} />
          <AnimatedStat target={stats.courses} label="Courses" Icon={UploadIcon} />
        </div>
      </section>

      <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center pb-12">
        <div className='space-x-8 space-y-8'>
          <h1 className='font-bold text-2xl text-black'>Choose your Role to Get Started</h1>
          <div className="flex gap-4 justify-center">
            <button onClick={() => navigate('mentorLogin')} className="px-8 py-3 bg-black text-white font-bold rounded-xl shadow-lg transition-colors duration-200 hover:text-blue-100">Login as Mentor</button>
            <button onClick={() => navigate('menteeLogin')} className="px-8 py-3 bg-black text-white font-bold rounded-xl shadow-lg transition-colors duration-200 hover:text-blue-100">Login as Mentee</button>
          </div>
        </div>
      </div>
    </main>
  );
}

// -------------------- Auth forms wired to Firebase --------------------
function MentorLogin() {
  const { loginUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser({ email: form.email, password: form.password });
      // read user role and route accordingly via onAuthStateChanged
      window.location.hash = 'mentorDashboard';
    } catch (err) { setMessage(err.message); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-center mb-4 font-serif text-black">Mentor (Diaspora) Login</h2>
        {message && <div className="bg-white text-black p-3 rounded-md mb-4 text-center">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black" />
          <input type="password" placeholder="Password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black" minLength={6} />
          <button type="submit" className="w-full bg-black text-white p-2 rounded-lg transition font-serif font-semibold hover:bg-gray-800">Login</button>
        </form>
        <p className="mt-4 text-center text-black">Don't have an account? <a href="#diasporaSignup" className="text-black font-bold hover:text-black">Sign Up</a></p>
      </div>
    </div>
  );
}

function MenteeLogin() {
  const { loginUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email: form.email, password: form.password });
      window.location.hash = 'menteeDashboard';
    } catch (err) { setMessage(err.message); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-center mb-4 font-serif text-black">Mentee (Youth) Login</h2>
        {message && <div className="bg-white text-black p-3 rounded-md mb-4 text-center">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black" />
          <input type="password" placeholder="Password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black" />
          <button type="submit" className="w-full bg-black text-white p-2 rounded-lg font-serif font-semibold transition hover:bg-gray-800">Login</button>
        </form>
        <p className="mt-4 text-center text-black">Don't have an account? <a href="#menteeSignup" className="text-black font-bold hover:text-black">Sign Up</a></p>
      </div>
    </div>
  );
}

function MenteeSignup() {
  const { registerUser } = useAuth();
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email: form.email, password: form.password, role: 'Mentee', fullName: form.fullName });
      window.location.hash = 'menteeDashboard';
    } catch (err) { setMessage(err.message); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-center mb-4 font-serif text-black">Mentee (Youth) Sign Up</h2>
        {message && <div className="bg-white text-black p-3 rounded-md mb-4 text-center">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} placeholder="Full Name" className="w-full border rounded-lg p-2" />
          <input required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" type="email" className="w-full border rounded-lg p-2" />
          <input required minLength={6} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" type="password" className="w-full border rounded-lg p-2" />
          <button type="submit" className="w-full bg-black text-white p-2 rounded-lg">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

function MentorSignup() {
  const { registerUser } = useAuth();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', country: '' });
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email: form.email, password: form.password, role: 'Mentor', fullName: form.fullName, country: form.country });
      window.location.hash = 'mentorDashboard';
    } catch (err) { setMessage(err.message); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-center mb-4 font-serif text-black">Diaspora (Mentor) Sign Up</h2>
        {message && <div className="bg-white text-black p-3 rounded-md mb-4 text-center">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} placeholder="Full Name" className="w-full border rounded-lg p-2" />
          <input required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" type="email" className="w-full border rounded-lg p-2" />
          <input required minLength={6} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" type="password" className="w-full border rounded-lg p-2" />
          <input value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} placeholder="Country" className="w-full border rounded-lg p-2" />
          <button type="submit" className="w-full bg-black text-white p-2 rounded-lg">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

// -------------------- Dashboards with schedules & messages --------------------
function MentorDashboard() {
  const { currentUser, authReady } = useAuth();
  const [mentees, setMentees] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');

  useEffect(() => {
    if (!authReady) return;
    if (!currentUser) { window.location.hash = 'mentorLogin'; return; }

    // realtime listeners: mentees list, schedules for this mentor, messages to/from this mentor
    const usersQuery = query(collection(db, 'users'), where('role', '==', 'Mentee'));
    const unsubUsers = onSnapshot(usersQuery, (snap) => setMentees(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    const schedulesQuery = query(collection(db, 'schedules'), where('mentorId', '==', currentUser.uid), orderBy('when', 'desc'));
    const unsubSchedules = onSnapshot(schedulesQuery, (snap) => setSchedules(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    const messagesQuery = query(collection(db, 'messages'), where('participants', 'array-contains', currentUser.uid), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(messagesQuery, (snap) => setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    return () => { unsubUsers(); unsubSchedules(); unsubMessages(); };
  }, [authReady, currentUser]);

  const createSchedule = async (title, when) => {
    await addDoc(collection(db, 'schedules'), { mentorId: currentUser.uid, title, when: new Date(when), createdAt: new Date() });
    // increment interactions
    const statsRef = doc(db, 'meta', 'platformStats');
    await runTransaction(db, async (t) => {
      const s = await t.get(statsRef);
      const data = s.exists() ? s.data() : { interactions: 0 };
      t.set(statsRef, { interactions: (Number(data.interactions) || 0) + 1 }, { merge: true });
    });
  };

  const sendMessage = async (recipientId, content) => {
    await addDoc(collection(db, 'messages'), { participants: [currentUser.uid, recipientId], sender: currentUser.uid, recipient: recipientId, content, createdAt: new Date() });
    // increment interactions
    const statsRef = doc(db, 'meta', 'platformStats');
    await runTransaction(db, async (t) => {
      const s = await t.get(statsRef);
      const data = s.exists() ? s.data() : { interactions: 0 };
      t.set(statsRef, { interactions: (Number(data.interactions) || 0) + 1 }, { merge: true });
    });
  };

  const postAnnouncement = async () => {
    if (!newAnnouncement) return;
    await addDoc(collection(db, 'announcements'), { text: newAnnouncement, authorId: currentUser.uid, createdAt: new Date() });
    setNewAnnouncement('');
  };

  return (
    <div className="min-h-screen flex font-sans">
      <aside className="w-64 bg-blue-100 p-6 flex flex-col items-center">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold font-serif text-black">BRIDGE2RISE</h2>
          <p className="text-sm text-black">Mentor Dashboard</p>
        </div>
        <nav className="w-full space-y-2">
          <a href="#mentorDashboard" className="w-full block px-3 py-3 rounded-lg text-black hover:bg-white">My Mentees</a>
          <a href="#mentorDashboard" className="w-full block px-3 py-3 rounded-lg text-black hover:bg-white">Schedules</a>
          <a href="#mentorDashboard" className="w-full block px-3 py-3 rounded-lg text-black hover:bg-white">Resources</a>
          <a href="#mentorDashboard" className="w-full block px-3 py-3 rounded-lg text-black hover:bg-white">Messages</a>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-white">
        <BackableNavbar />
        <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2">
            <h3 className="text-xl font-semibold mb-4">My Mentees</h3>
            <ul className="space-y-3">
              {mentees.map(m => (
                <li key={m.id} className="p-3 bg-white rounded shadow-sm flex justify-between items-center">
                  <div>
                    <div className="font-medium text-black">{m.fullName || m.email}</div>
                    <div className="text-sm text-gray-500">{m.email}</div>
                  </div>
                  <div className="text-sm text-gray-600">Joined: {m.createdAt?.toDate ? m.createdAt.toDate().toLocaleDateString() : new Date(m.createdAt).toLocaleDateString()}</div>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">Create Schedule</h3>
            <ScheduleCreator onCreate={createSchedule} />

            <h3 className="text-xl font-semibold mt-8 mb-4">Post Announcement</h3>
            <div className="flex gap-2">
              <input value={newAnnouncement} onChange={(e) => setNewAnnouncement(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Announcement text" />
              <button onClick={postAnnouncement} className="px-4 py-2 bg-black text-white rounded">Post</button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Recent Schedules</h3>
            <ul className="space-y-3">
              {schedules.map(s => (
                <li key={s.id} className="p-3 bg-white rounded shadow-sm">
                  <div className="font-medium">{s.title}</div>
                  <div className="text-sm text-gray-500">When: {s.when?.toDate ? s.when.toDate().toLocaleString() : new Date(s.when).toLocaleString()}</div>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-4">Messages</h3>
            <ul className="space-y-2 max-h-64 overflow-auto">
              {messages.map(m => (
                <li key={m.id} className="p-2 bg-white rounded shadow-sm">
                  <div className="text-sm text-gray-500">{new Date(m.createdAt?.toDate ? m.createdAt.toDate() : m.createdAt).toLocaleString()}</div>
                  <div className="text-black">{m.content}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

function ScheduleCreator({ onCreate }) {
  const [title, setTitle] = useState('');
  const [when, setWhen] = useState('');
  const handleSubmit = async (e) => { e.preventDefault(); if (!title || !when) return; await onCreate(title, when); setTitle(''); setWhen(''); };
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
      <input value={when} onChange={(e) => setWhen(e.target.value)} placeholder="YYYY-MM-DD HH:MM" className="w-full p-2 border rounded" />
      <button type="submit" className="px-4 py-2 bg-black text-white rounded">Create</button>
    </form>
  );
}

function MenteeDashboard() {
  const { currentUser, authReady } = useAuth();
  const [mentors, setMentors] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [messages, setMessages] = useState([]);
  const [profileUrl, setProfileUrl] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!authReady) return;
    if (!currentUser) { window.location.hash = 'menteeLogin'; return; }

    const mentorsQuery = query(collection(db, 'users'), where('role', '==', 'Mentor'));
    const unsubMentors = onSnapshot(mentorsQuery, (snap) => setMentors(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    const schedulesQuery = query(collection(db, 'schedules'), where('mentorId', 'in', mentors.map(m => m.id)).orderBy ? query(collection(db, 'schedules'), orderBy('when', 'desc')) : collection(db, 'schedules'));
    // For simplicity: load recent schedules collection (filtering client-side)
    const unsubSchedules = onSnapshot(collection(db, 'schedules'), (snap) => setSchedules(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    const messagesQuery = query(collection(db, 'messages'), where('participants', 'array-contains', currentUser.uid), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(messagesQuery, (snap) => setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    // load profile URL if set
    (async () => {
      const userSnap = await getDoc(doc(db, 'users', currentUser.uid));
      if (userSnap.exists()) setProfileUrl(userSnap.data().avatarUrl || null);
    })();

    return () => { unsubMentors(); unsubSchedules(); unsubMessages(); };
  }, [authReady, currentUser]);

  const uploadAvatar = async (file) => {
    if (!file || !currentUser) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target.result;
      // store in Firebase Storage (recommended) but we will store as base64 in Storage for this example
      const storagePath = `avatars/${currentUser.uid}`;
      const sRef = storageRef(storage, storagePath);
      await uploadString(sRef, base64, 'data_url');
      const url = await getDownloadURL(sRef);
      await updateDoc(doc(db, 'users', currentUser.uid), { avatarUrl: url });
      setProfileUrl(url);
    };
    reader.readAsDataURL(file);
  };

  const sendMessageTo = async (mentorId) => {
    if (!newMessage) return;
    await addDoc(collection(db, 'messages'), { participants: [currentUser.uid, mentorId], sender: currentUser.uid, recipient: mentorId, content: newMessage, createdAt: new Date() });
    setNewMessage('');
    // increment interactions
    const statsRef = doc(db, 'meta', 'platformStats');
    await runTransaction(db, async (t) => {
      const s = await t.get(statsRef);
      const data = s.exists() ? s.data() : { interactions: 0 };
      t.set(statsRef, { interactions: (Number(data.interactions) || 0) + 1 }, { merge: true });
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-black">
      <aside className="w-full md:w-64 p-4 bg-blue-100 flex flex-col items-center shadow-lg">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-black shadow-inner">
          {profileUrl ? <img src={profileUrl} alt="avatar" className="w-full h-full object-cover"/> : 'P'}
        </div>
        <h2 className="mt-4 text-xl font-semibold text-black">{currentUser?.fullName || 'Guest'}</h2>
        <nav className="mt-6 w-full space-y-2">
          <a href="#menteeDashboard" className="w-full block px-3 py-3 rounded-lg text-black hover:bg-white">My Mentors</a>
          <a href="#menteeDashboard" className="w-full block px-3 py-3 rounded-lg text-black hover:bg-white">Schedules</a>
          <a href="#menteeDashboard" className="w-full block px-3 py-3 rounded-lg text-black hover:bg-white">Messages</a>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto bg-white">
        <BackableNavbar />
        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Available Mentors</h3>
          <ul className="space-y-3">
            {mentors.map(m => (
              <li key={m.id} className="p-3 bg-white rounded shadow-sm flex justify-between items-center">
                <div>
                  <div className="font-medium text-black">{m.fullName || m.email}</div>
                  <div className="text-sm text-gray-500">{m.email}</div>
                </div>
                <div className="flex flex-col items-end">
                  <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Message mentor" className="p-2 border rounded mb-2" />
                  <button onClick={() => sendMessageTo(m.id)} className="px-3 py-2 bg-black text-white rounded">Send</button>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">Recent Schedules</h3>
          <ul className="space-y-3">
            {schedules.slice(0, 10).map(s => (
              <li key={s.id} className="p-3 bg-white rounded shadow-sm">
                <div className="font-medium">{s.title}</div>
                <div className="text-sm text-gray-500">When: {s.when?.toDate ? s.when.toDate().toLocaleString() : new Date(s.when).toLocaleString()}</div>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">My Messages</h3>
          <ul className="space-y-2">
            {messages.map(m => (
              <li key={m.id} className="p-2 bg-white rounded shadow-sm">
                <div className="text-sm text-gray-500">{new Date(m.createdAt?.toDate ? m.createdAt.toDate() : m.createdAt).toLocaleString()}</div>
                <div className="text-black">{m.content}</div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

// -------------------- App shell --------------------
export default function Bridge2RiseApp() {
  const [route, setRoute] = useState('hero');

  useEffect(() => {
    const initialRoute = () => window.location.hash.substring(1) || 'hero';
    setRoute(initialRoute());
    const listener = () => setRoute(window.location.hash.substring(1) || 'hero');
    window.addEventListener('hashchange', listener);
    return () => window.removeEventListener('hashchange', listener);
  }, []);

  return (
    <AuthProvider>
      <div className="font-sans antialiased" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
        {route === 'hero' && <Hero navigate={(p) => (window.location.hash = p)} />}
        {route === 'mentorLogin' && <><BackableNavbar /><MentorLogin /></>}
        {route === 'menteeLogin' && <><BackableNavbar /><MenteeLogin /></>}
        {route === 'menteeSignup' && <><BackableNavbar /><MenteeSignup /></>}
        {route === 'diasporaSignup' && <><BackableNavbar /><MentorSignup /></>}
        {route === 'mentorDashboard' && <MentorDashboard />}
        {route === 'menteeDashboard' && <MenteeDashboard />}
      </div>
    </AuthProvider>
  );
}

/*
  -------------------- Test & Linting Guidance --------------------
  I added the Firebase-connected app above. Because I cannot write filesystem files outside this canvas, follow these steps to add unit tests and linting in your project:

  1) Install dev dependencies:
     npm install --save-dev jest @testing-library/react @testing-library/jest-dom eslint eslint-plugin-react eslint-config-airbnb

  2) Example test file (save as src/__tests__/auth.test.jsx):

     import { render, screen, waitFor } from '@testing-library/react';
     import Bridge2RiseApp from '../Bridge2RiseApp';

     test('renders hero heading', async () => {
       render(<Bridge2RiseApp />);
       expect(screen.getByText(/Connecting the/i)).toBeInTheDocument();
     });

  3) Add scripts to package.json:
     "test": "jest --watchAll",
     "lint": "eslint . --ext .js,.jsx"

  4) ESLint recommended config (.eslintrc.json):
     {
       "extends": ["airbnb", "plugin:react/recommended"],
       "env": { "browser": true, "es2021": true, "jest": true },
       "rules": { "react/jsx-filename-extension": [1, { "extensions": [".jsx"] }], "react/react-in-jsx-scope": "off" }
     }

  5) Run tests: npm run test
     Lint: npm run lint

  -------------------- Final notes & next steps --------------------
  - Fill firebaseConfig with your project values (or set REACT_APP_... env vars) before running.
  - Ensure Firestore rules allow authenticated reads/writes while developing. For production, lock rules properly.
  - If you want, I can now:
     • Add role-based route guards (only mentors see mentor pages),
     • Improve schedule creation to use proper datetime pickers,
     • Add pagination / search for messages and users, or
     • Create the test & lint files in the repo for you.

  Tell me which of those you'd like next and I will add it directly into this project file.
*/
