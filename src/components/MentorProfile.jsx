import { useState } from "react";

export default function MentorProfile() {
  const [profile, setProfile] = useState({
    fullName: "",
    country: "",
    field: "",
    topics: "",
    topicsOther: "",
    availability: "",
    language: "",
    bio: "",
    photo: "",
  });

  const [isEditing, setIsEditing] = useState(true); // start with form view

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile({ ...profile, photo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false); // switch to profile view
  };

  const handleEdit = () => {
    setIsEditing(true); // back to form
  };

  const hasData = Object.values(profile).some((value) => value && value !== "");

  return (
    <div className="max-w-3xl mx-auto p-6 bg-blue-100 rounded-2xl shadow-lg border border-gray-200">
      {isEditing ? (
        // ========== Form View ==========
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            {profile.photo ? (
              <img
                src={profile.photo}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
            ) : (
              <div className="w-32 h-32 font-serif rounded-full bg-white flex items-center justify-center mb-4 text-sm text-gray-500">
                Upload Photo
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="mb-4"
            />
          </div>

          <input
            type="text"
            placeholder="Full Name"
            value={profile.fullName}
            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
            className="w-full border rounded p-2"
          />

          <input
            type="text"
            placeholder="Country of Residence"
            value={profile.country}
            onChange={(e) => setProfile({ ...profile, country: e.target.value })}
            className="w-full border rounded p-2"
          />

          <select
            value={profile.field}
            onChange={(e) => setProfile({ ...profile, field: e.target.value })}
            className="w-full font-serif border rounded p-2"
          >
            <option value="" className="text-gray-200">Professional field</option>
            <option>Information Technology (IT)</option>
            <option>Business & Entrepreneurship</option>
            <option>Healthcare & Medicine</option>
            <option>Education & Research</option>
            <option>Engineering & Architecture</option>
            <option>Tourism & Hospitality Management</option>
            <option>Others</option>
          </select>

          <select
            value={profile.topics}
            onChange={(e) => setProfile({ ...profile, topics: e.target.value })}
            className="w-full font-serif border rounded p-2"
          >
            <option value="">Preferred mentorship topic</option>
            <option>Career advice</option>
            <option>Job search</option>
            <option>Entrepreneurship</option>
            <option>Other</option>
          </select>

          {profile.topics === "Other" && (
            <input
              type="text"
              placeholder="Enter other topic"
              value={profile.topicsOther}
              onChange={(e) =>
                setProfile({ ...profile, topicsOther: e.target.value })
              }
              className="w-full border rounded p-2"
            />
          )}

          <input
            type="text"
            placeholder="Availability (weekly hours)"
            value={profile.availability}
            onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
            className="w-full border rounded p-2"
          />

          <select
            value={profile.language}
            onChange={(e) => setProfile({ ...profile, language: e.target.value })}
            className="w-full font-serif border rounded p-2"
          >
            <option value="" className="text-gray-200">Language spoken</option>
            <option>English</option>
            <option>French</option>
            <option>Kiswahili</option>
          </select>

          <textarea
            placeholder="Short Bio (2-3 lines)"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full border rounded p-2"
          />

          <div className="flex justify-center mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-500 font-serif text-white rounded shadow hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        // ========== Profile View ==========
        <div className="flex flex-col items-center space-y-4 text-center">
          {/* Photo */}
          {profile.photo ? (
            <img
              src={profile.photo}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4 text-sm text-gray-500">
              Profile Photo
            </div>
          )}

          {/* Only show fields that have data */}
          {hasData && (
            <div className="space-y-1 bg-slate-300">
              {profile.fullName && <h2 className="text-xl font-serif font-bold">{profile.fullName}</h2>}
              {profile.country && <p>{profile.country}</p>}
              {profile.field && <p className="text-blue-900 font-serif font-semibold">{profile.field}</p>}
              {profile.topics && (
                <p>{profile.topics === "Other" ? profile.topicsOther : profile.topics}</p>
              )}
              {profile.availability && <p>Availability: {profile.availability}</p>}
              {profile.language && <p>Language: {profile.language}</p>}
              {profile.bio && <p className="text-gray-700">{profile.bio}</p>}
            </div>
          )}

          {/* Edit Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
