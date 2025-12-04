import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/AuthServices";
import { FirebaseError } from "firebase/app";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    if (!role) {
     setError("Please select your role");
      setLoading(false);
    return;
  }

    try {
      await register(email.trim(), password , role);
      navigate("/", { replace: true });
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <Link to="/" className="back-to-home"><i className="ri-home-8-line"></i></Link>
        <h2>Create Account</h2>
        <p className="subtitle">Join JobCy and apply to your dream jobs</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="ri-mail-line"></i>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <i className="ri-lock-2-line"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <i className="ri-lock-password-line"></i>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

       <div className="input-group select-box">
             <i className="ri-lock-password-line"></i>

          <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="" disabled>Account Type</option>
              <option value="employer">Employer</option>
               <option value="candidate">Candidate</option>
            </select>

            </div>



          {/* Error */}
          {error && <p className="error">{error}</p>}

          <button className="btn primary-btn auth-btn" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="footer-text">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
