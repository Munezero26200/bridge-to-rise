function menteeSignin({ navigate }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    education: "",
    otherEducation: "",
    role: "Mentee",
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

    const exists = users.some((u) => u.email === email && u.role === "Mentee");
    if (exists) {
      setMessage("Account already exists! Please log in.");
      navigate("menteeLogin");
      return;
    }

    users.push({ ...formData, email });
    localStorage.setItem("users", JSON.stringify(users));

    setMessage(`Signup successful! Welcome ${formData.fullName}`);
    navigate("menteeLogin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md bg-green-100 shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-center mb-4 font-serif">
          Mentee (Youth) Signup
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
            className="w-full bg-gray-300 text-green-900 p-2 rounded-lg font-semibold font-serif transition hover:bg-gray-400"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}