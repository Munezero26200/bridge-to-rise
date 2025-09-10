import React, { useState, useEffect } from 'react';

const KEYS = { USERS: 'b2r_users', AUTH: 'b2r_auth', MSGS: 'b2r_msgs', RES: 'b2r_res', SCHED: 'b2r_sched', ANN: 'b2r_ann' };
const load = (k, fallback) => JSON.parse(localStorage.getItem(k) || JSON.stringify(fallback));
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const getUsers = () => load(KEYS.USERS, []);
const saveUsers = (u) => save(KEYS.USERS, u);
const getAuth = () => load(KEYS.AUTH, null);
const setAuth = (a) => save(KEYS.AUTH, a);
const clearAuth = () => localStorage.removeItem(KEYS.AUTH);
const getMsgs = () => load(KEYS.MSGS, []);
const saveMsgs = (m) => save(KEYS.MSGS, m);
const getRes = () => load(KEYS.RES, []);
const saveRes = (r) => save(KEYS.RES, r);
const getSched = () => load(KEYS.SCHED, []);
const saveSched = (s) => save(KEYS.SCHED, s);
const getAnn = () => load(KEYS.ANN, []);
const saveAnn = (a) => save(KEYS.ANN, a);

(function seedAdmin(){
  const users = getUsers();
  if(!users.some(u=>u.role==='Admin')){
    users.push({ id:'admin-1', fullName:'Platform Admin', email:'admin@bridge2rise.org', password:'admin123', role:'Admin', avatar:null });
    saveUsers(users);
  }
})();

const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function passwordStrength(p){ let s=0; if(p.length>=8) s++; if(/[A-Z]/.test(p)) s++; if(/[0-9]/.test(p)) s++; if(/[^A-Za-z0-9]/.test(p)) s++; return {s,ok:s>=3}; }
const id = (p='id')=>`${p}-${Date.now()}-${Math.floor(Math.random()*9000)}`;

const ProfileIcon = ()=> (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>);

function Navbar({navigate, auth, onLogout}){
  const [open,setOpen]=useState(false);
  return (
    <nav className="sticky top-0 bg-white border-b z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black text-white rounded flex items-center justify-center font-bold">B2R</div>
          <div>
            <div className="font-semibold">BRIDGE2RISE</div>
            <div className="text-xs text-black/60">Unlock diaspora potential</div>
          </div>
        </div>
        <div className="hidden md:flex gap-6">
          <button onClick={()=>navigate('hero')} className="hover:underline">Home</button>
          <button onClick={()=>navigate('mentorLogin')} className="hover:underline">Mentor</button>
          <button onClick={()=>navigate('menteeLogin')} className="hover:underline">Mentee</button>
          <button onClick={()=>navigate('adminLogin')} className="hover:underline">Admin</button>
        </div>
        <div className="flex items-center gap-3">
          {auth ? (
            <>
              <span className="hidden sm:inline text-sm">{auth.email}</span>
              <button onClick={()=>navigate(auth.role==='Mentee'?'menteeDashboard':auth.role==='Mentor'?'mentorDashboard':'adminDashboard')} className="px-3 py-1 rounded bg-black text-white">Dashboard</button>
              <button onClick={()=>{clearAuth(); onLogout(); navigate('hero');}} className="text-sm">Logout</button>
            </>
          ) : (
            <button onClick={()=>navigate('menteeLogin')} className="text-sm">Sign in</button>
          )}
          <button className="md:hidden p-2" onClick={()=>setOpen(s=>!s)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>
      {open && (<div className="md:hidden px-4 py-3 bg-white border-t"><div className="flex flex-col gap-2"><button onClick={()=>navigate('hero')}>Home</button><button onClick={()=>navigate('mentorLogin')}>Mentor</button><button onClick={()=>navigate('menteeLogin')}>Mentee</button><button onClick={()=>navigate('adminLogin')}>Admin</button></div></div>)}
    </nav>
  );
}

function Footer(){ return (<footer className="bg-white border-t py-6 mt-8"><div className="max-w-6xl mx-auto px-6 text-sm">© {new Date().getFullYear()} BRIDGE2RISE — connecting diaspora expertise with youth.</div></footer>); }

function Hero({navigate}){
  return (
    <main className="min-h-[60vh] bg-blue-100 flex items-center">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold">Bridge diaspora expertise to youth</h1>
          <p className="mt-4 text-black/80">A tech-enabled bridge to mentorship, job readiness, and meaningful employment.</p>
          <div className="mt-6 flex gap-3">
            <button onClick={()=>navigate('mentorLogin')} className="px-5 py-3 bg-blue-100 text-black hover:bg-black hover:text-white rounded">Mentor</button>
            <button onClick={()=>navigate('menteeLogin')} className="px-5 py-3 bg-blue-100 text-black hover:bg-black hover:text-white rounded">Mentee</button>
          </div>
        </div>
        <div className="md:w-1/2"><div className="w-full h-64 bg-white rounded-lg border flex items-center justify-center">Illustration</div></div>
      </div>
    </main>
  );
}

// Centered forms and links between login/signup
function MentorSignup({navigate}){
  const [f,setF]=useState({fullName:'',email:'',password:'',country:'',field:''}); const [err,setErr]=useState(null);
  const submit=(e)=>{e.preventDefault(); setErr(null); const email=f.email.trim().toLowerCase(); if(!emailRE.test(email)) return setErr('Invalid email'); const pw=passwordStrength(f.password); if(!pw.ok) return setErr('Password too weak'); const users=getUsers(); if(users.some(u=>u.email===email)) return setErr('Account exists'); users.push({...f,email,role:'Mentor',id:id('u'),avatar:null,bio:''}); saveUsers(users); alert('Registered'); navigate('mentorLogin'); };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold">Mentor Sign up</h3>
        {err && <div className="text-sm text-red-600 mt-2">{err}</div>}
        <form onSubmit={submit} className="space-y-3 mt-3">
          <input className="w-full border p-2 rounded" placeholder="Full name" value={f.fullName} onChange={e=>setF({...f,fullName:e.target.value})} required />
          <input className="w-full border p-2 rounded" placeholder="Email" value={f.email} onChange={e=>setF({...f,email:e.target.value})} required />
          <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={f.password} onChange={e=>setF({...f,password:e.target.value})} required />
          <input className="w-full border p-2 rounded" placeholder="Country" value={f.country} onChange={e=>setF({...f,country:e.target.value})} required />
          <input className="w-full border p-2 rounded" placeholder="Field (e.g., Computer Science)" value={f.field} onChange={e=>setF({...f,field:e.target.value})} required />
          <div className="flex gap-2"><button type="submit" className="flex-1 bg-blue-100 text-black hover:bg-black hover:text-white py-2 rounded">Sign up</button><button type="button" onClick={()=>window.history.back()} className="flex-1 border py-2 rounded">Cancel</button></div>
        </form>
        <p className="mt-3 text-sm">Already have an account? <button onClick={()=>navigate('mentorLogin')} className="text-black font-semibold">Login</button></p>
      </div>
    </div>
  );
}

function MenteeSignup({navigate}){
  const [f,setF]=useState({fullName:'',email:'',password:'',education:'',field:'',careerGoal:''}); const [err,setErr]=useState(null);
  const submit=(e)=>{e.preventDefault(); setErr(null); const email=f.email.trim().toLowerCase(); if(!emailRE.test(email)) return setErr('Invalid email'); const pw=passwordStrength(f.password); if(!pw.ok) return setErr('Password too weak'); const users=getUsers(); if(users.some(u=>u.email===email)) return setErr('Account exists'); users.push({...f,email,role:'Mentee',id:id('u'),avatar:null,bio:'',matchedMentor:null}); saveUsers(users); alert('Registered'); navigate('menteeLogin'); };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold">Mentee Sign up</h3>
        {err && <div className="text-sm text-red-600 mt-2">{err}</div>}
        <form onSubmit={submit} className="space-y-3 mt-3">
          <input className="w-full border p-2 rounded" placeholder="Full name" value={f.fullName} onChange={e=>setF({...f,fullName:e.target.value})} required />
          <input className="w-full border p-2 rounded" placeholder="Email" value={f.email} onChange={e=>setF({...f,email:e.target.value})} required />
          <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={f.password} onChange={e=>setF({...f,password:e.target.value})} required />
          <select className="w-full border p-2 rounded" value={f.education} onChange={e=>setF({...f,education:e.target.value})} required><option value="">Choose education</option><option>Secondary</option><option>Undergraduate</option><option>Post-graduate</option></select>
          <input className="w-full border p-2 rounded" placeholder="Field of interest" value={f.field} onChange={e=>setF({...f,field:e.target.value})} required />
          <input className="w-full border p-2 rounded" placeholder="Career goal" value={f.careerGoal} onChange={e=>setF({...f,careerGoal:e.target.value})} required />
          <div className="flex gap-2"><button type="submit" className="flex-1 bg-blue-100 text-black hover:bg-black hover:text-white py-2 rounded">Sign up</button><button type="button" onClick={()=>window.history.back()} className="flex-1 border py-2 rounded">Cancel</button></div>
        </form>
        <p className="mt-3 text-sm">Already have an account? <button onClick={()=>navigate('menteeLogin')} className="text-black font-semibold">Login</button></p>
      </div>
    </div>
  );
}

function Login({role,navigate,onLogin}){
  const [f,setF]=useState({email:'',password:''}); const [err,setErr]=useState(null);
  const submit=(e)=>{e.preventDefault(); setErr(null); const u=getUsers().find(x=>x.email===f.email.trim().toLowerCase()); if(!u) return setErr('No account'); if(u.password!==f.password) return setErr('Wrong password'); if(role && u.role!==role) return setErr(`Not a ${role}`); setAuth({email:u.email,role:u.role}); onLogin(); navigate(u.role==='Mentee'?'menteeDashboard':u.role==='Mentor'?'mentorDashboard':'adminDashboard'); };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold">{role} Login</h3>
        {err && <div className="text-sm text-red-600 mt-2">{err}</div>}
        <form onSubmit={submit} className="space-y-3 mt-3">
          <input className="w-full border p-2 rounded" placeholder="Email" value={f.email} onChange={e=>setF({...f,email:e.target.value})} required />
          <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={f.password} onChange={e=>setF({...f,password:e.target.value})} required />
          <div className="flex gap-2"><button type="submit" className="flex-1 bg-blue-100 text-black hover:bg-black hover:text-white py-2 rounded">Login</button><button type="button" onClick={()=>window.history.back()} className="flex-1 border py-2 rounded">Cancel</button></div>
        </form>
        <p className="mt-3 text-sm">Don't have an account? {role==='Mentor' ? <button onClick={()=>navigate('mentorSignup')} className="text-black font-semibold">Sign up</button> : <button onClick={()=>navigate('menteeSignup')} className="text-black font-semibold">Sign up</button>}</p>
      </div>
    </div>
  );
}

function LeftSide({me,active,setActive}){
  const tabs=['Dashboard','Messages','Announcements','Schedules','Resources','Profile'];
  return (
    <aside className="w-64 hidden lg:block" style={{backgroundColor:'#ebf8ff'}}>
      <div className="p-4">
        <div className="flex flex-col items-center mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-white flex items-center justify-center">{me?.avatar ? <img src={me.avatar} alt="avatar" className="w-full h-full object-cover"/> : <ProfileIcon/>}</div>
          <div className="mt-2 font-semibold text-black">{me?.fullName || me?.email}</div>
          <div className="text-sm text-black/70">{me?.role}</div>
        </div>
        <ul className="space-y-2">
          {tabs.map(t=> (
            <li key={t}><button onClick={()=>setActive(t)} className={`w-full text-left p-2 rounded ${active===t? 'bg-white text-black':'text-black'} hover:bg-white`}>{t}</button></li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function Messaging({me}){
  const [msgs,setMsgs]=useState(getMsgs()); const [to,setTo]=useState(''); const [text,setText]=useState(''); const [file,setFile]=useState(null);
  useEffect(()=>setMsgs(getMsgs()),[]); useEffect(()=>saveMsgs(msgs),[msgs]);
  const users=getUsers().filter(u=>u.email!==me.email);
  const attach=(f)=>{ const fr=new FileReader(); fr.onload=()=>setFile({name:f.name,data:fr.result}); fr.readAsDataURL(f); };
  const send=()=>{ if(!to||!text) return alert('To and message required'); const m={id:id('m'),from:me.email,to,text,file,ts:Date.now()}; setMsgs([m,...msgs]); setText(''); setFile(null); };
  return (<div className="p-4"><h4 className="font-semibold mb-3">Messages</h4><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><select className="w-full border p-2 rounded mb-2" value={to} onChange={e=>setTo(e.target.value)}><option value="">Choose recipient</option>{users.map(u=>(<option key={u.email} value={u.email}>{u.fullName} ({u.role})</option>))}</select><textarea className="w-full border p-2 rounded h-28" value={text} onChange={e=>setText(e.target.value)} placeholder="Write message"/><input type="file" onChange={e=>attach(e.target.files[0])} className="mt-2"/><div className="mt-2 flex gap-2"><button onClick={send} className="bg-blue-100 text-black hover:bg-black hover:text-white px-3 py-1 rounded">Send</button><button onClick={()=>window.history.back()} className="border px-3 py-1 rounded">Cancel</button></div></div><div className="md:col-span-2"><div className="space-y-3">{msgs.filter(m=>m.to===me.email||m.from===me.email).map(m=>(<div key={m.id} className="p-3 border rounded"><div className="text-sm text-black/60">From: {m.from} • To: {m.to} • {new Date(m.ts).toLocaleString()}</div><div className="mt-1">{m.text}</div>{m.file && <a href={m.file.data} download={m.file.name} className="underline text-sm mt-2 inline-block">Download {m.file.name}</a>}</div>))}</div></div></div></div>);
}

function ResourcesPanel({me}){
  const [resources,setResources]=useState(getRes()); useEffect(()=>saveRes(resources),[resources]);
  const upload=(f)=>{ const fr=new FileReader(); fr.onload=()=>{ setResources([{id:id('r'),name:f.name,uploader:me.email,data:fr.result,ts:Date.now()},...resources]); }; fr.readAsDataURL(f); };
  const remove=(idv)=>setResources(prev=>prev.filter(r=>r.id!==idv));
  return (<div className="p-4"><div className="flex items-center justify-between mb-3"><h4 className="font-semibold">Resources</h4><div className="text-sm">Signed in: {me.email}</div></div>{me.role==='Mentor' && <div className="mb-3"><input type="file" onChange={e=>upload(e.target.files[0])} /></div>}<div className="space-y-3">{resources.map(r=>(<div key={r.id} className="p-3 border rounded flex justify-between items-center"><div><div className="font-semibold">{r.name}</div><div className="text-sm text-black/60">Uploaded by: {r.uploader} • {new Date(r.ts).toLocaleString()}</div></div><div className="flex gap-2"><a className="underline text-sm" href={r.data} download={r.name}>Download</a>{me.role==='Mentor' && me.email===r.uploader && <button onClick={()=>remove(r.id)} className="border px-2 py-1 rounded">Delete</button>}</div></div>))}</div></div>);
}

function SchedulesPanel({me}){
  const [sched,setSched]=useState(getSched()); const [form,setForm]=useState({title:'',when:'',with:''}); useEffect(()=>saveSched(sched),[sched]);
  const create=()=>{ if(!form.title||!form.when) return alert('Title and time required'); setSched([{...form,id:id('s'),creator:me.email,ts:Date.now()},...sched]); setForm({title:'',when:'',with:''}); };
  const remove=(idv)=>setSched(prev=>prev.filter(s=>s.id!==idv));
  return (<div className="p-4"><h4 className="font-semibold mb-3">Schedules</h4><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><input className="w-full border p-2 rounded mb-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} /><input type="datetime-local" className="w-full border p-2 rounded mb-2" value={form.when} onChange={e=>setForm({...form,when:e.target.value})} /><input className="w-full border p-2 rounded mb-2" placeholder="With (email)" value={form.with} onChange={e=>setForm({...form,with:e.target.value})} /><div className="flex gap-2"><button onClick={create} className="bg-blue-100 text-black hover:bg-black hover:text-white px-3 py-1 rounded">Create</button><button onClick={()=>window.history.back()} className="border px-3 py-1 rounded">Cancel</button></div></div><div className="md:col-span-2"><div className="space-y-3">{sched.map(s=>(<div key={s.id} className="p-3 border rounded flex justify-between items-center"><div><div className="font-semibold">{s.title}</div><div className="text-sm text-black/60">{s.with?`with ${s.with}`:''} • {new Date(s.when).toLocaleString()}</div></div><div className="flex gap-2"><button onClick={()=>remove(s.id)} className="border px-2 py-1 rounded">Delete</button></div></div>))}</div></div></div></div>);
}

function ProfilePanel({me,setMe}){
  const [s,setS]=useState({...me}); useEffect(()=>setS({...me}),[me]);
  const pick=(f)=>{ const fr=new FileReader(); fr.onload=()=>setS(prev=>({...prev,avatar:fr.result})); fr.readAsDataURL(f); };
  const saveProfile=()=>{ const users=getUsers(); const updated=users.map(u=>u.email===me.email?{...u,...s}:u); saveUsers(updated); setMe({...s}); alert('Saved'); };
  return (<div className="p-4"><div className="flex items-center gap-4 mb-4"><div className="w-20 h-20 rounded-full overflow-hidden bg-white flex items-center justify-center">{s.avatar? <img src={s.avatar} alt="avatar" className="w-full h-full object-cover"/> : <ProfileIcon/>}</div><div><div className="font-semibold">{s.fullName}</div><div className="text-sm text-black/60">{s.email}</div></div></div><div className="space-y-2"><input className="w-full border p-2 rounded" value={s.fullName||''} onChange={e=>setS({...s,fullName:e.target.value})} /><input className="w-full border p-2 rounded" value={s.bio||''} onChange={e=>setS({...s,bio:e.target.value})} placeholder="Bio" />{s.role==='Mentee' && <input className="w-full border p-2 rounded" value={s.field||''} onChange={e=>setS({...s,field:e.target.value})} placeholder="Field of interest" />} {s.role==='Mentee' && <input className="w-full border p-2 rounded" value={s.careerGoal||''} onChange={e=>setS({...s,careerGoal:e.target.value})} placeholder="Career goal" />}<div className="flex gap-2 mt-2"><input type="file" onChange={e=>pick(e.target.files[0])} /><button onClick={saveProfile} className="bg-blue-100 text-black hover:bg-black hover:text-white px-3 py-1 rounded">Save</button><button onClick={()=>window.history.back()} className="border px-3 py-1 rounded">Cancel</button></div></div></div>);
}

function Matching({me}){
  const mentors=getUsers().filter(u=>u.role==='Mentor');
  const suggestions=mentors.filter(m=>(me.field && m.field && m.field.toLowerCase()===me.field.toLowerCase()) || (me.careerGoal && m.field && m.field.toLowerCase().includes(me.careerGoal.split(' ')[0].toLowerCase())));
  const match=(mentorEmail)=>{ const users=getUsers().map(u=>u.email===me.email?{...u,matchedMentor:mentorEmail}:u); saveUsers(users); alert('Matched'); };
  return (<div className="p-4"><h4 className="font-semibold mb-3">Suggested mentors</h4>{suggestions.length===0 && <div className="text-sm">No exact suggestions.</div>}<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">{suggestions.map(m=>(<div key={m.email} className="p-3 border rounded flex justify-between items-center"><div><div className="font-semibold">{m.fullName}</div><div className="text-sm text-black/60">Field: {m.field}</div></div><div className="flex flex-col gap-2"><button onClick={()=>match(m.email)} className="bg-blue-100 text-black hover:bg-black hover:text-white px-3 py-1 rounded">Match</button><a className="underline text-sm" href={`#mentorProfile?email=${encodeURIComponent(m.email)}`}>View</a></div></div>))}</div></div>);
}

function MentorDashboard(){
  const auth=getAuth(); const me=getUsers().find(u=>u.email===auth.email); const [tab,setTab]=useState('Dashboard'); const [meState,setMeState]=useState(me);
  useEffect(()=>setMeState(getUsers().find(u=>u.email===auth.email)),[]);
  return (<div className="min-h-screen flex bg-white"><LeftSide me={meState} active={tab} setActive={setTab} /><div className="flex-1"><div className="p-4 border-b flex justify-between items-center"><h2 className="text-xl font-bold">Mentor Dashboard</h2><div className="flex gap-3 items-center"><div className="text-sm">{auth.email}</div><button onClick={()=>window.history.back()} className="border px-3 py-1 rounded">Back</button></div></div><div>{tab==='Dashboard' && (<div className="p-4"><h3 className="font-semibold">My Mentees</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">{getUsers().filter(u=>u.role==='Mentee' && u.matchedMentor===auth.email).map(m=>(<div key={m.email} className="p-3 border rounded"><div className="font-semibold">{m.fullName}</div><div className="text-sm text-black/60">{m.email}</div><div className="text-sm mt-1">Career: {m.careerGoal}</div></div>))}</div></div>)}{tab==='Messages' && <Messaging me={meState} />}{tab==='Announcements' && <Announcements me={meState} />}{tab==='Resources' && <ResourcesPanel me={meState} />}{tab==='Schedules' && <SchedulesPanel me={meState} />}{tab==='Profile' && <ProfilePanel me={meState} setMe={setMeState} />}</div></div></div>);
}

function MenteeDashboard(){
  const auth=getAuth(); const me=getUsers().find(u=>u.email===auth.email); const [tab,setTab]=useState('Dashboard'); const [meState,setMeState]=useState(me);
  useEffect(()=>setMeState(getUsers().find(u=>u.email===auth.email)),[]);
  return (<div className="min-h-screen flex bg-white"><LeftSide me={meState} active={tab} setActive={setTab} /><div className="flex-1"><div className="p-4 border-b flex justify-between items-center"><h2 className="text-xl font-bold">Mentee Dashboard</h2><div className="flex gap-3 items-center"><div className="text-sm">{auth.email}</div><button onClick={()=>window.history.back()} className="border px-3 py-1 rounded">Back</button></div></div><div>{tab==='Dashboard' && (<div className="p-4"><h3 className="font-semibold">Recommended Mentors</h3><Matching me={meState} /><div className="mt-6"><h4>Your Match</h4>{meState.matchedMentor? <div className="p-3 border rounded mt-2">Matched with: {meState.matchedMentor}</div> : <div className="text-sm mt-2">No mentor matched yet.</div>}</div></div>)}{tab==='Messages' && <Messaging me={meState} />}{tab==='Announcements' && <Announcements me={meState} />}{tab==='Resources' && <ResourcesPanel me={meState} />}{tab==='Schedules' && <SchedulesPanel me={meState} />}{tab==='Profile' && <ProfilePanel me={meState} setMe={setMeState} />}</div></div></div>);
}

function Announcements({me}){ const [ann,setAnn]=useState(getAnn()); useEffect(()=>saveAnn(ann),[ann]); const [text,setText]=useState(''); const post=()=>{ if(!text) return; setAnn([{id:id('a'),by:me.email,text,ts:Date.now()},...ann]); setText(''); }; return (<div className="p-4"><h4 className="font-semibold">Announcements</h4><div className="mt-2"><textarea className="w-full border p-2 rounded h-24" value={text} onChange={e=>setText(e.target.value)} placeholder="Write announcement"/><div className="mt-2 flex gap-2"><button onClick={post} className="bg-blue-100 text-black hover:bg-black hover:text-white px-3 py-1 rounded">Post</button><button onClick={()=>window.history.back()} className="border px-3 py-1 rounded">Cancel</button></div></div><div className="mt-4 space-y-3">{ann.map(a=>(<div key={a.id} className="p-3 border rounded"><div className="text-sm text-black/60">By {a.by} • {new Date(a.ts).toLocaleString()}</div><div className="mt-1">{a.text}</div></div>))}</div></div>);
}

function AdminPanel(){ const [users,setUsers]=useState(getUsers()); const [editing,setEditing]=useState(null); useEffect(()=>saveUsers(users),[users]); const add=()=>setUsers([{id:id('u'),fullName:'New',email:`user${Date.now()}@example.com`,password:'pass123',role:'Mentee'},...users]); const del=(i)=>setUsers(prev=>prev.filter(u=>u.id!==i)); const runTests=()=>{ const r=[]; r.push({n:'email',ok:emailRE.test('a@b.com')}); r.push({n:'pw',ok:passwordStrength('Aabc123!').ok}); const f=r.filter(x=>!x.ok); if(f.length===0) alert('All tests passed'); else alert('Some tests failed: '+JSON.stringify(f)); }; return (<div className="min-h-screen p-6 bg-white"><div className="max-w-6xl mx-auto"><header className="flex items-center justify-between mb-6"><h2 className="text-2xl font-bold">Admin</h2><div className="flex gap-2"><button onClick={add} className="bg-blue-100 text-black hover:bg-black hover:text-white px-3 py-1 rounded">Add</button><button onClick={runTests} className="border px-3 py-1 rounded">Run tests</button></div></header><div className="grid grid-cols-1 md:grid-cols-2 gap-3">{users.map(u=>(<div key={u.id} className="p-3 border rounded flex justify-between items-center"><div><div className="font-semibold">{u.fullName}</div><div className="text-sm text-black/60">{u.email} • {u.role}</div></div><div className="flex gap-2"><button onClick={()=>setEditing(u)} className="border px-2 py-1 rounded">Edit</button><button onClick={()=>del(u.id)} className="border px-2 py-1 rounded">Delete</button></div></div>))}</div>{editing && <EditUser user={editing} onClose={()=>setEditing(null)} onSave={(u)=>{ setUsers(prev=>prev.map(p=>p.id===u.id?u:p)); setEditing(null);}} />}</div></div>);
}
function EditUser({user,onClose,onSave}){ const [s,setS]=useState({...user}); return (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"><div className="bg-white p-6 rounded w-full max-w-md"><h3 className="text-lg font-semibold mb-3">Edit</h3><div className="space-y-2"><input className="w-full border p-2 rounded" value={s.fullName} onChange={e=>setS({...s,fullName:e.target.value})} /><input className="w-full border p-2 rounded" value={s.email} onChange={e=>setS({...s,email:e.target.value})} /><input className="w-full border p-2 rounded" value={s.password} onChange={e=>setS({...s,password:e.target.value})} /><select className="w-full border p-2 rounded" value={s.role} onChange={e=>setS({...s,role:e.target.value})}><option>Mentor</option><option>Mentee</option><option>Admin</option></select></div><div className="mt-4 flex justify-end gap-2"><button onClick={onClose} className="border px-3 py-1 rounded">Cancel</button><button onClick={()=>onSave(s)} className="bg-blue-100 text-black hover:bg-black hover:text-white px-3 py-1 rounded">Save</button></div></div></div>);
}

export default function CombinedFinalUpdated(){
  const [page,setPage]=useState('hero'); const [auth,setAuth]=useState(getAuth());
  useEffect(()=>{ const h=()=>setPage(window.location.hash.replace('#','')||'hero'); window.addEventListener('hashchange',h); h(); return ()=>window.removeEventListener('hashchange',h); },[]);
  useEffect(()=>setAuth(getAuth()),[]);
  const navigate=(p)=>{ window.location.hash=p; setPage(p); };
  const onLogin=()=>setAuth(getAuth()); const onLogout=()=>setAuth(null);

  if(page==='hero') return (<><Navbar navigate={navigate} auth={auth} onLogout={onLogout} /><Hero navigate={navigate}/><Footer /></>);
  if(page==='mentorSignup') return (<><Navbar navigate={navigate} auth={auth} onLogout={onLogout} /><MentorSignup navigate={navigate} /><Footer /></>);
  if(page==='menteeSignup') return (<><Navbar navigate={navigate} auth={auth} onLogout={onLogout} /><MenteeSignup navigate={navigate} /><Footer /></>);
  if(page==='mentorLogin') return (<><Navbar navigate={navigate} auth={auth} onLogout={onLogout} /><Login role={'Mentor'} navigate={navigate} onLogin={onLogin} /><Footer /></>);
  if(page==='menteeLogin') return (<><Navbar navigate={navigate} auth={auth} onLogout={onLogout} /><Login role={'Mentee'} navigate={navigate} onLogin={onLogin} /><Footer /></>);
  if(page==='adminLogin') return (<><Navbar navigate={navigate} auth={auth} onLogout={onLogout} /><Login role={'Admin'} navigate={navigate} onLogin={onLogin} /><Footer /></>);
  if(page==='mentorDashboard'){ const a=getAuth(); if(!a||a.role!=='Mentor') return (<div className="p-6">Please login as Mentor. <button onClick={()=>navigate('mentorLogin')} className="text-black underline">Login</button></div>); return (<><Navbar navigate={navigate} auth={auth} onLogout={onLogout} /><MentorDashboard /></>); }
  if(page==='menteeDashboard'){ const a=getAuth(); if(!a||a.role!=='Mentee') return (<div className="p-6">Please login as Mentee. <button onClick={()=>navigate('menteeLogin')} className="text-black underline">Login</button></div>); return (<><Navbar navigate={navigate} auth={auth} onLogout={onLogout} /><MenteeDashboard /></>); }
  if(page==='adminDashboard'){ const a=getAuth(); if(!a||a.role!=='Admin') return (<div className="p-6">Please login as Admin. <button onClick={()=>navigate('adminLogin')} className="text-black underline">Login</button></div>); return (<><Navbar navigate={navigate} auth={auth} onLogout={onLogout} /><AdminPanel /></>); }

  return <div className="p-6">Page not found</div>;
}
