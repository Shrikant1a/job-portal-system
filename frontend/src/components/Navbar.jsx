import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, User, LogIn, LogOut, ChevronDown, Edit2, Save, X, Globe, Link as LinkIcon, FileText, Camera, Star, Settings, HelpCircle, Lock, Bookmark, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, updateUser } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Edit Profile Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    company: '',
    location: '',
    github: '',
    linkedin: '',
    photo: '',
    resume: ''
  });

  // Reset edit state when user changes
  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || '',
        email: user.email || '',
        company: user.company || '',
        location: user.location || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
        photo: user.photo || '',
        resume: user.resume || ''
      });
    }
  }, [user, showEditModal]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUser(editData);
    setShowEditModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar">
        <div className="container flex items-center justify-between">
          <Link to="/" className="nav-brand">
            <Briefcase color="var(--primary)" size={28} />
            <span>Hire<span className="text-gradient">Nova</span></span>
          </Link>

          {isAuthenticated && (
            <div className="nav-links desktop-only">
              <Link
                to="/"
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
              <Link
                to="/jobs"
                className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`}
              >
                Find Jobs
              </Link>
              <Link
                to="/companies"
                className={`nav-link ${location.pathname === '/companies' ? 'active' : ''}`}
              >
                Companies
              </Link>
              <Link
                to="/live-jobs"
                className={`nav-link ${location.pathname === '/live-jobs' ? 'active' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Globe size={16} className="text-primary" /> Live Jobs
              </Link>
            </div>
          )}

          <div className="flex gap-4 items-center">
            {/* Mobile Menu Toggle */}
            {isAuthenticated && (
              <button
                className="mobile-only btn btn-ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ padding: '0.5rem' }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}

            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setShowProfile(!showProfile)}
                  style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', background: showProfile ? 'rgba(255,255,255,0.05)' : 'transparent', transition: 'background 0.2s' }}
                >
                  <div style={{ background: 'var(--primary-light)', padding: '0.4rem', borderRadius: '50%', color: 'var(--primary)', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {user?.photo ? <img src={user.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={18} />}
                  </div>
                  <span className="font-semibold">{user?.name}</span>
                  <ChevronDown size={16} className="text-secondary" style={{ transform: showProfile ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </div>

                {/* Profile Dropdown */}
                {showProfile && (
                  <div
                    className="glass-card slide-up"
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 0.5rem)',
                      right: 0,
                      width: '320px',
                      borderRadius: '8px',
                      zIndex: 50,
                      boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      padding: 0,
                      overflow: 'hidden'
                    }}
                  >
                    {/* Up Arrow Pointer */}
                    <div style={{ position: 'absolute', top: '-6px', right: '1.2rem', width: '12px', height: '12px', background: 'var(--card-bg)', transform: 'rotate(45deg)', borderLeft: '1px solid var(--border)', borderTop: '1px solid var(--border)', zIndex: -1 }} />

                    {/* Header / Email */}
                    <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: 'var(--text)' }}>{user?.email || 'shrikantaher2004@gmail.com'}</h4>
                    </div>

                    {/* Menu Items */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <button
                        onClick={() => { navigate('/profile'); setShowProfile(false); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1.5rem', width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.95rem', color: 'var(--text)', transition: 'background 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <FileText size={20} color="var(--primary)" /> Profile
                      </button>

                      <button
                        onClick={() => { navigate('/profile', { state: { openView: 'reviews' } }); setShowProfile(false); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1.5rem', width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.95rem', color: 'var(--text)', transition: 'background 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Star size={20} color="var(--text-muted)" /> My reviews
                      </button>

                      <button
                        onClick={() => { navigate('/profile', { state: { openView: 'settings' } }); setShowProfile(false); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1.5rem', width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.95rem', color: 'var(--text)', transition: 'background 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Settings size={20} color="var(--text-muted)" /> Settings
                      </button>

                      <button
                        onClick={() => { navigate('/profile', { state: { openView: 'help' } }); setShowProfile(false); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1.5rem', width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.95rem', color: 'var(--text)', transition: 'background 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <HelpCircle size={20} color="var(--text-muted)" /> Help
                      </button>

                      <button
                        onClick={() => { navigate('/profile', { state: { openView: 'privacy' } }); setShowProfile(false); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1.5rem', width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.95rem', color: 'var(--text)', transition: 'background 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Lock size={20} color="var(--text-muted)" /> Privacy Centre
                      </button>
                    </div>

                    {/* Footer Section */}
                    <div style={{ borderTop: '1px solid var(--border)', padding: '1rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      © 2026 HireNova - <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms</span> - <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Accessibility</span>
                    </div>

                    {/* Sign Out Button */}
                    <div style={{ borderTop: '1px solid var(--border)' }}>
                      <button
                        onClick={handleLogout}
                        style={{ width: '100%', padding: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: 'var(--primary)', fontSize: '1rem', transition: 'background 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  <LogIn size={18} />
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  <User size={18} />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isAuthenticated && isMobileMenuOpen && (
          <div className="mobile-menu slide-up">
            <Link
              to="/"
              className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className={`mobile-nav-link ${location.pathname === '/jobs' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link
              to="/companies"
              className={`mobile-nav-link ${location.pathname === '/companies' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Companies
            </Link>
            <Link
              to="/live-jobs"
              className={`mobile-nav-link ${location.pathname === '/live-jobs' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Globe size={16} /> Live Jobs
            </Link>
          </div>
        )}
      </nav>

      {/* Edit Profile Modal (Rendered outside nav to fix CSS stacking contexts) */}
      {showEditModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
          <div className="glass-card slide-up" style={{ width: '100%', maxWidth: '500px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Edit Profile</h2>
              <button onClick={() => setShowEditModal(false)} className="text-secondary hover:text-primary" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
              <div className="form-group mb-0">
                <label className="form-label">Profile Photo (URL)</label>
                <div style={{ position: 'relative' }}>
                  <Camera size={18} className="text-muted" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="text" className="form-input" placeholder="https://example.com/photo.jpg" value={editData.photo} onChange={(e) => setEditData({ ...editData, photo: e.target.value })} style={{ paddingLeft: '2.5rem' }} />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="form-group mb-0" style={{ flex: 1 }}>
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-input" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} required />
                </div>
                <div className="form-group mb-0" style={{ flex: 1 }}>
                  <label className="form-label">Location</label>
                  <input type="text" className="form-input" value={editData.location} onChange={(e) => setEditData({ ...editData, location: e.target.value })} />
                </div>
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} required />
              </div>

              {user?.type === 'provider' && (
                <div className="form-group mb-0">
                  <label className="form-label">Company Name</label>
                  <input type="text" className="form-input" value={editData.company} onChange={(e) => setEditData({ ...editData, company: e.target.value })} />
                </div>
              )}

              <div className="form-group mb-0">
                <label className="form-label">GitHub Profile (URL)</label>
                <div style={{ position: 'relative' }}>
                  <Globe size={18} className="text-muted" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="url" className="form-input" placeholder="https://github.com/username" value={editData.github} onChange={(e) => setEditData({ ...editData, github: e.target.value })} style={{ paddingLeft: '2.5rem' }} />
                </div>
              </div>

              <div className="form-group mb-0">
                <label className="form-label">LinkedIn Profile (URL)</label>
                <div style={{ position: 'relative' }}>
                  <LinkIcon size={18} className="text-muted" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="url" className="form-input" placeholder="https://linkedin.com/in/username" value={editData.linkedin} onChange={(e) => setEditData({ ...editData, linkedin: e.target.value })} style={{ paddingLeft: '2.5rem' }} />
                </div>
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Resume Link (URL)</label>
                <div style={{ position: 'relative' }}>
                  <FileText size={18} className="text-muted" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="url" className="form-input" placeholder="https://drive.google.com/.../resume.pdf" value={editData.resume} onChange={(e) => setEditData({ ...editData, resume: e.target.value })} style={{ paddingLeft: '2.5rem' }} />
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <button type="button" onClick={() => setShowEditModal(false)} className="btn btn-ghost" style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  <Save size={18} className="mr-2" /> Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
