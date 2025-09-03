import Navbar from "./components/navbar"
import LoginPage from "./components/loginPage"
import MenteeLogin from "./components/loginMentee"
import DiasporaSignin from "./components/diasporaSign"
import MenteeSignin from "./components/MenteeSignIn"

export default function App() {
  return (
   <>
    <Navbar />
    <LoginPage />
    <MenteeSignin />
    <MenteeLogin/>
    <DiasporaSignin/>
   </>
  )
}