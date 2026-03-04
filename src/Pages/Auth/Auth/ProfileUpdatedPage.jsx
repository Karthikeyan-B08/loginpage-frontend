import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Profile.css";
import axios from "axios";

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




   const [details, setDetails] = useState(null); 
  const [error, setError] = useState("");

  const handledisplay = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "https://loginpage-backend-production.up.railway.app/api/user/details"
      );
      setDetails(response.data); 
    } catch (err) {
      console.error(err);
      setError("Failed to fetch details");
    } finally {
      setLoading(false);
    }
  };




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

       <button className="logout-btn" onClick={handledisplay}>
        {loading ? "Loading..." : "Display Details"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      </div>
      )}

<div className="table">
      {details && details.length > 0 && (
  <div className="user-details">
    <h3>All Users</h3>
    <table className="user-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Password</th>
          <th>Profile Image</th>
        </tr>
      </thead>
      <tbody>
        {details.map((user, index) => (
          <tr key={index}>
            <td>{user.email}</td>
            <td>{user.pwd}</td>
            <td>
              {user.image ? (
                <img src={user.image} alt="Profile" width="50" />
              ) : (
                "No Image"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
</div>
    </div>
  );
}

export default ProfileUpdatePage;
