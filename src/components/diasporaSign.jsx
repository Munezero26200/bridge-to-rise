import React, { useState } from "react";

export default function DiasporaSignin() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    country: "",
    field: "Information Technology (IT)",
    otherField: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    console.log("Diaspora SignUp:", formData);
    alert(`Welcome Mentor ${formData.fullName} from ${formData.country}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md bg-blue-200 shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-center mb-4 font-serif">
          Diaspora (Mentor) Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
            className="w-full font-serif border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
            minLength={6}
          />
          <input
            type="text"
            placeholder="Country of Residence"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          />
          <select
            value={formData.field}
            onChange={(e) => setFormData({ ...formData, field: e.target.value })}
            className="w-full font-serif border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <option>Information Technology (IT)</option>
            <option>Business & Entrepreneurship</option>
            <option>HealthCare & Medicine</option>
            <option>Education & Research</option>
            <option>Engineering & Architecture</option>
            <option>Tourism & Hospitality Management</option>
            <option>Other</option>
          </select>
          {formData.field === "Other" && (
            <input
              type="text"
              placeholder="Please specify your field"
              value={formData.otherField}
              onChange={(e) => setFormData({ ...formData, otherField: e.target.value })}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-gray-300 font-serif font-semibold p-2 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
