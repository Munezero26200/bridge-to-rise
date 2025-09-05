import Navbar from "./components/navbar"
import LoginPage from "./components/loginPage"
import MenteeLogin from "./components/loginMentee"
import DiasporaSignin from "./components/diasporaSign"
import MenteeSignin from "./components/MenteeSignIn"
import Hero from './components/hero'
import MentorDashboard from './components/mentorDashboard'
import MenteeDashboard from './components/MenteeDashboard'
import Footer from './components/footer'
import MenteeProfile from "./components/menteeProfile"


export default function App() {
  return (
   <>
    <Navbar />
    <LoginPage />
    <MenteeSignin />
    <MenteeLogin/>
    <DiasporaSignin/>
    < Hero/>
    <MentorDashboard />
    <MenteeDashboard />
    <Footer />
    <MenteeProfile/>
   </>
  )
}