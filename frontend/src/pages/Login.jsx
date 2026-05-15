import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login({ isSignup = false }) {
  const [userType, setUserType] = useState('seeker'); // seeker or provider
  
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (isSignup) {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        userType: userType === 'seeker' ? 1 : 2,
        companyName: userType === 'provider' ? companyName : null,
        location: userType === 'provider' ? location : null
      };
      
      const result = await signup(userData);
      if (result.success) {
        // Automatically login or redirect to login
        const loginResult = await login(email, password);
        if (loginResult.success) navigate('/');
        else navigate('/login');
      } else {
        setError(result.error || 'Signup failed');
      }
    } else {
      const result = await login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Invalid email or password');
      }
    }
  };

  return (
    <div className="container py-16 flex justify-center fade-in">
      <div className="glass-card" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="text-center mb-8">
          <h2>{isSignup ? 'Create an Account' : 'Welcome Back'}</h2>
          <p className="text-secondary mt-2">
            {isSignup 
              ? 'Join our community and find your dream job' 
              : 'Enter your credentials to access your account'}
          </p>
          {error && <div className="error-message mt-4" style={{ color: '#ff4d4d', fontSize: '0.875rem' }}>{error}</div>}
        </div>

        {isSignup && (
          <div className="flex gap-4 mb-6">
            <button 
              className={`btn ${userType === 'seeker' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1 }}
              onClick={() => setUserType('seeker')}
            >
              <User size={18} />
              Job Seeker
            </button>
            <button 
              className={`btn ${userType === 'provider' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1 }}
              onClick={() => setUserType('provider')}
            >
              <Briefcase size={18} />
              Employer
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="flex gap-4 mb-4">
              <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                <label className="form-label">First Name</label>
                <input type="text" className="form-input" placeholder="John" value={firstName} onChange={e => setFirstName(e.target.value)} required />
              </div>
              <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                <label className="form-label">Last Name</label>
                <input type="text" className="form-input" placeholder="Doe" value={lastName} onChange={e => setLastName(e.target.value)} required />
              </div>
            </div>
          )}

          {isSignup && userType === 'provider' && (
            <>
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <div style={{ position: 'relative' }}>
                  <Building size={18} className="text-muted" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="text" className="form-input" placeholder="Acme Corp" style={{ paddingLeft: '2.5rem' }} value={companyName} onChange={e => setCompanyName(e.target.value)} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} className="text-muted" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="text" className="form-input" placeholder="New York, NY" style={{ paddingLeft: '2.5rem' }} value={location} onChange={e => setLocation(e.target.value)} required />
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} className="text-muted" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="email" className="form-input" placeholder="name@example.com" style={{ paddingLeft: '2.5rem' }} value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <div className="flex justify-between items-center mb-2">
              <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
              {!isSignup && <a href="#" className="text-secondary" style={{ fontSize: '0.75rem' }}>Forgot password?</a>}
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} className="text-muted" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="password" className="form-input" placeholder="••••••••" style={{ paddingLeft: '2.5rem' }} value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            {isSignup ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6 text-secondary" style={{ fontSize: '0.875rem' }}>
          {isSignup ? (
            <>Already have an account? <Link to="/login" className="text-primary" style={{ fontWeight: 600 }}>Sign in</Link></>
          ) : (
            <>Don't have an account? <Link to="/signup" className="text-primary" style={{ fontWeight: 600 }}>Sign up</Link></>
          )}
        </div>
      </div>
    </div>
  );
}

// Temporary Building icon to fix missing import
function Building(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}
