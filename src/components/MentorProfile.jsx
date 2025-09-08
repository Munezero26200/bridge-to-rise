import React, { useState } from "react";

const MentorProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    field: "",
    otherField: "",
    topics: "",
    topicsOther: "",
    availability: "",
    language: "",
    bio: "",
    photo: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitted, setSubmitted] = useState(false);

 
  const fields = [
    "Information Technology (IT)",
    "Business & Entrepreneurship",
    "Healthcare & Medicine",
    "Education & Research",
    "Engineering & Architecture",
    "Tourism & Hospitality Management",
    "Other",
  ];

  const mentorshipTopics = ["Career advice", "Job search", "Entrepreneurship", "Other"];
  const languagesOptions = ["English", "French", "Kiswahili", "Other"];

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center py-10">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo */}
            <div className="flex flex-col items-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-400 shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 border-2 border-gray-400 shadow-lg">
                  No Photo
                </div>
              )}

              {/* Custom Upload Button */}
              <label
                htmlFor="photoUpload"
                className="mt-3 px-6 py-2 bg-blue-200 font-serif rounded-full shadow hover:bg-blue-300 cursor-pointer transition"
              >
                Upload Photo
              </label>
              <input
                id="photoUpload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block font-medium font-serif">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded font-serif"
                required
              />
            </div>

            {/* Country */}
            <div>
              <label className="block font-medium font-serif">Country of Residence</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded font-serif"
                required
              />
            </div>

            {/* Field */}
            <div>
              <label className="block font-medium font-serif">Professional Field</label>
              <select
                name="field"
                value={formData.field}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded font-serif"
                required
              >
                <option value="">Select...</option>
                {fields.map((field, i) => (
                  <option key={i} value={field}>
                    {field}
                  </option>
                ))}
              </select>
              {formData.field === "Other" && (
                <input
                  type="text"
                  name="otherField"
                  placeholder="Specify your field"
                  value={formData.otherField}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded font-serif"
                />
              )}
            </div>

            {/* Mentorship Topic */}
            <div>
              <label className="block font-medium font-serif">Preferred Mentorship Topic</label>
              <select
                name="topics"
                value={formData.topics}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded font-serif"
              >
                <option value="">Select...</option>
                {mentorshipTopics.map((topic, i) => (
                  <option key={i} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
              {formData.topics === "Other" && (
                <input
                  type="text"
                  name="topicsOther"
                  placeholder="Specify your topic"
                  value={formData.topicsOther}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded font-serif"
                />
              )}
            </div>

            {/* Availability */}
            <div>
              <label className="block font-medium font-serif">Availability (weekly hours)</label>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded font-serif"
              />
            </div>

            {/* Languages */}
            <div>
              <label className="block font-medium font-serif">Languages Spoken</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded font-serif"
              >
                <option value="">Select...</option>
                {languagesOptions.map((lang, i) => (
                  <option key={i} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Bio */}
            <div>
              <label className="block font-medium font-serif">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded font-serif"
                rows="4"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-100 font-serif  font-semibold py-2 rounded hover:bg-black hover:text-white transition"
            >
              Save Changes
            </button>
          </form>
        ) : (
          // Profile Preview
          <div className="space-y-6 text-center">
            {/* Profile Photo */}
            <div className="flex justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover border-4 border-black shadow-lg"
                />
              ) : (
                <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-400 shadow-lg text-gray-500">
                  No Photo
                </div>
              )}
            </div>

            {/* Name + Country */}
            <div>
              <h2 className="text-2xl font-bold font-serif text-black">{formData.fullName}</h2>
              <p className="text-gray-700 font-serif">{formData.country}</p>
            </div>

            {/* Details */}
            <div className="space-y-2 text-left bg-white p-4 rounded-lg shadow font-serif">
              <p>
                <span className="font-semibold">Professional Field:</span>{" "}
                {formData.field === "Other" ? formData.otherField : formData.field}
              </p>
              <p>
                <span className="font-semibold">Mentorship Topic:</span>{" "}
                {formData.topics === "Other" ? formData.topicsOther : formData.topics}
              </p>
              <p>
                <span className="font-semibold">Availability:</span> {formData.availability}
              </p>
              <p>
                <span className="font-semibold">Languages:</span> {formData.language}
              </p>
              <p>
                <span className="font-semibold">Bio:</span> {formData.bio}
              </p>
            </div>

            {/* Edit button */}
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 w-full bg-black text-white font-serif py-2 rounded hover:bg-gray-800 transition"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorProfile;
