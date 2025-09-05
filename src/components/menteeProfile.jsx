import React, { useState } from "react";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    fieldOfStudy: "",
    otherField: "",
    skills: "",
    careerGoal: "",
    mentorshipAreas: "",
    languages: "",
    bio: "",
    photo: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Dropdown options
  const fieldsOfStudy = ["Computer Science", "Engineering", "Medicine", "Business", "Other"];
  const careerGoals = ["Software Developer", "Entrepreneur", "Researcher", "Other"];
  const skillsOptions = ["Web Development", "Data Science", "UI/UX Design", "Project Management", "Other"];
  const mentorshipAreas = ["Career Guidance", "Technical Skills", "Networking", "Leadership", "Other"];
  const languagesOptions = ["English", "French", "Kinyarwanda", "Swahili", "Other"];

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
    <div className="min-h-screen bg-white flex items-center justify-center py-10">
      <div className="w-full max-w-lg bg-blue-100 rounded-lg shadow-md p-6">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo */}
            <div className="flex flex-col items-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-400"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
                  Upload
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="mt-2"
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

            {/* Field of Study */}
            <div>
              <label className="block font-medium font-serif">Field of Study</label>
              <select
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded font-serif"
                required
              >
                <option value="">Select...</option>
                {fieldsOfStudy.map((field, i) => (
                  <option key={i} value={field}>
                    {field}
                  </option>
                ))}
              </select>

              {formData.fieldOfStudy === "Other" && (
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

            {/* Skills */}
            <div>
              <label className="block font-medium font-serif">Skills You Want to Learn</label>
              <select
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded font-serif"
              >
                <option value="">Select...</option>
                {skillsOptions.map((skill, i) => (
                  <option key={i} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            {/* Career Goals */}
            <div>
              <label className="block font-medium font-serif">Career Goals</label>
              <select
                name="careerGoal"
                value={formData.careerGoal}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded font-serif"
                required
              >
                <option value="">Select...</option>
                {careerGoals.map((goal, i) => (
                  <option key={i} value={goal}>
                    {goal}
                  </option>
                ))}
              </select>
            </div>

            {/* Mentorship Areas */}
            <div>
              <label className="block font-medium font-serif">Preferred Mentorship Areas</label>
              <select
                name="mentorshipAreas"
                value={formData.mentorshipAreas}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded font-serif"
              >
                <option value="">Select...</option>
                {mentorshipAreas.map((area, i) => (
                  <option key={i} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Languages */}
            <div>
              <label className="block font-medium font-serif">Languages Spoken</label>
              <select
                name="languages"
                value={formData.languages}
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
              className="w-full bg-black font-serif text-white py-2 mr-36 rounded"
            >
              Save Changes
            </button>
          </form>
        ) : (
          // Profile Preview after submission
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                />
              )}
              <h2 className="mt-4 text-xl font-bold font-serif">{formData.fullName}</h2>
              <p className="text-black font-serif">{formData.country}</p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold font-serif">Field of Study:</span>{" "}
                {formData.fieldOfStudy === "Other"
                  ? formData.otherField
                  : formData.fieldOfStudy}
              </p>
              <p><span className="font-semibold font-serif">Skills:</span> {formData.skills}</p>
              <p><span className="font-semibold font-serif">Career Goal:</span> {formData.careerGoal}</p>
              <p><span className="font-semibold font-serif">Mentorship Areas:</span> {formData.mentorshipAreas}</p>
              <p><span className="font-semibold font-serif">Languages:</span> {formData.languages}</p>
              <p><span className="font-semibold font-serif">Bio:</span> {formData.bio}</p>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 w-full bg-black text-white font-serif py-2 rounded"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;