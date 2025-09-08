function loginMentee({ navigate }) {
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

    const existingUser = users.find((u) => u.email === email);

    if (!existingUser) {
      setMessage("You don't have an account yet. Please sign up first.");
      navigate("menteeSignup");
      return;
    }

    if (existingUser.role !== "Mentee") {
      setMessage(
        `This email is registered as ${existingUser.role}. Please log in as ${existingUser.role}.`
      );
      return;
    }

    if (existingUser.password !== formData.password) {
      setMessage("Incorrect password. Try again.");
      return;
    }

    // Save login session
    localStorage.setItem(
      "authUser",
      JSON.stringify({ email: existingUser.email, role: "Mentee" })
    );

    setMessage(`Welcome ${formData.role}: ${formData.email}`);
    navigate("menteeDashboard");
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md bg-blue-100 shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-center mb-4 font-serif">
          Mentee (Youth) Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full border rounded-lg p-2 font-serif focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
            minLength={6}
          />
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
            className="w-full border rounded-lg p-2 font-serif focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <option value="Mentee">Local (Mentee)</option>
            <option value="Mentor">Diaspora (Mentor)</option>
          </select>
          <button
            type="submit"
            className="w-full bg-gray-300 text-blue-900 p-2 rounded-lg font-semibold font-serif transition hover:bg-gray-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}