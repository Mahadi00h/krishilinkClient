import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setErrors({ password: passwordErrors.join(". ") });
      return;
    }

    try {
      await register(
        formData.email,
        formData.password,
        formData.name,
        formData.photo
      );
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="input input-bordered"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered"
                value={formData.photo}
                onChange={(e) =>
                  setFormData({ ...formData, photo: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>

          <div className="divider">OR</div>

          <button onClick={handleGoogleLogin} className="btn btn-outline">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              {/* Google icon SVG */}
            </svg>
            Continue with Google
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
