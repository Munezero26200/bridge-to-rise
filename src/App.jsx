import Navbar from "./components/navbar"
import Hero from './components/hero'
import MentorDashboard from './components/mentorDashboard'
import MenteeDashboard from './components/MenteeDashboard'
import Footer from './components/footer'


export default function App() {
  return (
   <>
    <Navbar />
    < Hero/>
    <MentorDashboard />
    <MenteeDashboard />
    <Footer />
   </>
  )
}