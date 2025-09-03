import React, { useState } from "react";

export default function MenteeSignin() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    education: "Secondary",
    otherEducation: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    console.log("Mentee SignUp:", formData);
    alert(`Welcome Mentee ${formData.fullName}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md bg-blue-200 shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-center mb-4 font-serif">
          Mentee (Youth) Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
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
            value={formData.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            className="w-full border rounded-lg p-2 font-serif focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <option>Secondary</option>
            <option>Undergraduate</option>
            <option>Post-graduate</option>
            <option>Other</option>
          </select>
          {formData.education === "Other" && (
            <input
              type="text"
              placeholder="Please specify education level"
              value={formData.otherEducation}
              onChange={(e) => setFormData({ ...formData, otherEducation: e.target.value })}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-gray-300 p-2 rounded-lg font-serif font-semibold transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

