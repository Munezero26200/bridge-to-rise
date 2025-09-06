import React, { useState } from "react";

export default function MentorLogin() {
  const [formData, setFormData] = useState({ email: "", password: "", role: "Mentor" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    console.log("Mentor Login:", formData);
    alert(`Welcome ${formData.role}: ${formData.email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md bg-blue-100 shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-center mb-4 font-serif">
          Mentor (Diaspora) Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
            minLength={6}
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full border font-serif rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <option value="Mentor">Diaspora (Mentor)</option>
            <option value="Mentee">Local (Mentee)</option>
          </select>
          <button
            type="submit"
            className="w-full bg-gray-300 text-blue-900 p-2 rounded-lg transition font-serif font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

