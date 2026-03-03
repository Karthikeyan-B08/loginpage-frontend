import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorMessage from '../../../components/Common/ErrorMessage'
import './Auth.css'
import axios from "axios";


function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  })
  const navigate = useNavigate()

  const validatePassword = (password) => {
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
  }

  const isPasswordValid = (validation) => {
    return Object.values(validation).every(value => value === true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    setError('')

    
    if (name === 'password') {
      setPasswordValidation(validatePassword(value))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB')
        return
      }
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file')
        return
      }
      
      
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height
          
          
          const maxSize = 200
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width
              width = maxSize
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height
              height = maxSize
            }
          }
          
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
          
          
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6)
          setImagePreview(compressedBase64)
          setFormData({ ...formData, profileImage: compressedBase64 })
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
      setImageFile(file)
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Email and password are required')
      return
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return
    }

  
    if (!isPasswordValid(passwordValidation)) {
      setError('Password must meet all security requirements')
      return
    }

  
    if (formData.password.length > 128) {
      setError('Password must not exceed 128 characters')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
   try {
    await axios.post("https://loginpage-backend-production.up.railway.app/api/user/register", {
      email: formData.email,
      pwd: formData.password,
      image: formData.profileImage || "https://via.placeholder.com/150"
    });

    alert("Registered successfully!");
    navigate("/login");

  } catch (err) {
    console.error(err);
    setError(err.response?.data || "Registration failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join Gidy ai Club</p>
        </div>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              required
            />
            {formData.password && (
              <div className="password-requirements">
                <p className="requirements-title">
                  Password must contain:
                </p>
                <ul className="requirements-list">
                  <li className={passwordValidation.minLength ? 'valid' : 'invalid'}>
                    {passwordValidation.minLength ? '✓' : '○'} At least 8 characters
                  </li>
                  <li className={passwordValidation.hasUpperCase ? 'valid' : 'invalid'}>
                    {passwordValidation.hasUpperCase ? '✓' : '○'} One uppercase letter (A-Z)
                  </li>
                  <li className={passwordValidation.hasLowerCase ? 'valid' : 'invalid'}>
                    {passwordValidation.hasLowerCase ? '✓' : '○'} One lowercase letter (a-z)
                  </li>
                  <li className={passwordValidation.hasNumber ? 'valid' : 'invalid'}>
                    {passwordValidation.hasNumber ? '✓' : '○'} One number (0-9)
                  </li>
                  <li className={passwordValidation.hasSpecialChar ? 'valid' : 'invalid'}>
                    {passwordValidation.hasSpecialChar ? '✓' : '○'} One special character (!@#$%^&*)
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="profileImage">Profile Image (Optional)</label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
            <small className="form-hint">Max size: 5MB. Formats: JPG, PNG, GIF</small>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
