import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Profile.css";

function ProfileUpdatePage() {

  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    pwd: "",
    profileImage: ""
  });

  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        pwd: "",
        profileImage: user.profileImage || ""
      });
      setImagePreview(user.profileImage || "");
    }
  }, [user]);

  if (!user) {
    return <h2 style={{ textAlign: "center" }}>Loading profile...</h2>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setFormData({ ...formData, profileImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(formData);
      setMessage("Profile updated successfully");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-page">


      <button
  className="profile-toggle-btn"
  onClick={() => setShowProfile(!showProfile)}
>
  👤
</button>

      {showProfile && (
      <div className="profile-card">

        <h2>Edit Profile</h2>

        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="pwd"
              value={formData.pwd}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>

          <div className="form-group">
            <label>Profile Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Update Profile"}
          </button>

        </form>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>
      )}
    </div>
  );
}

export default ProfileUpdatePage;
