export default function Navbar() {
  return (
    <div className="h-16 flex justify-between items-center px-20">
      <div className="flex items-center space-x-4">
        <img src="/src/assets/image/logo.png" alt="logo" class="h-16 rounded-2xl" />
        <h1 className="text-2xl font-bold font-serif text-yellow-500">BRIDGE2RISE</h1>
      </div>
      <div className="flex space-x-16 font-semibold font-serif">
        <p>Home</p>
        <p>Profile</p>
        <p>Message</p>
        <p>Calendar</p>
        <p>Resources</p>
      </div>
    </div>
  );
}
