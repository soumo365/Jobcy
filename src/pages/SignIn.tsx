import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom"
import { login } from "../services/AuthServices";
import { FirebaseError } from "firebase/app";

function SignIn() {
  const navigate = useNavigate();
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [loading , setLoading] = useState<boolean>();
  const [error , setError] = useState("");

  const handleSubmit = async (e:FormEvent) => {
     e.preventDefault();
     setLoading(true); 
     try{
      await login(email.trim(),password);
       navigate("/", { replace: true });
     }
     catch (err: unknown) {
  if (err instanceof FirebaseError) {
    setError(err.message);
  } else {
    setError("Signup failed");
  }
}finally {
      setLoading(false);
    }

  }


  return (
    <>
    <div className="auth-wrapper">
      <div className="auth-card">
        <Link to="/" className="back-to-home"><i className="ri-home-8-line"></i></Link>
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to continue your job search</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <i className="ri-mail-line"></i>
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
              required />
          </div>

          <div className="input-group">
            <i className="ri-lock-2-line"></i>
            <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
          </div>

          <div className="auth-options">
            <label><input type="checkbox" /> Remember me</label>
            <a href="#">Forgot Password?</a>
          </div>

          <button className="btn primary-btn auth-btn" disabled={loading}>{loading?"signing in":"Sign In"}</button>
          {error && <p className="error">{error}</p>}
        </form>

        <p className="footer-text">
          Don’t have an account? <Link to="/signup">Create Account</Link>
        </p>

      </div>
    </div>

    </>
  )
}

export default SignIn