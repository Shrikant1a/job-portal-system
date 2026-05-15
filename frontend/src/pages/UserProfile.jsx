import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, EyeOff, MoreHorizontal, ChevronRight, Download, Edit2, Trash2, FileSearch, FileUp, FileText, ArrowLeft, Eye, Briefcase, Award, Globe, Plus, X, DollarSign, Calendar, Home, User, Clock, Wallet, Check, Star, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UserProfile() {
  const { user, updateUser } = useAuth();
  const [showResumeMenu, setShowResumeMenu] = useState(false);
  const [activeView, setActiveView] = useState('main');
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openView) {
      setActiveView(location.state.openView);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchFullProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/api/profile');
        const data = await response.json();
        if (!data.error) {
          updateUser(data);
        }
      } catch (error) {
        console.error("Error fetching full profile:", error);
      }
    };
    fetchFullProfile();
  }, []);
  const [showWorkModal, setShowWorkModal] = useState(false);
  const [workData, setWorkData] = useState({ jobTitle: '', companyName: '' });
  const [showEduModal, setShowEduModal] = useState(false);
  const [eduData, setEduData] = useState({ level: '', field: '' });
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [skillData, setSkillData] = useState('');
  const [showLicenceModal, setShowLicenceModal] = useState(false);
  const [licenceData, setLicenceData] = useState({ name: '', month: '', year: '', doesNotExpire: false });
  const [showCertModal, setShowCertModal] = useState(false);
  const [certData, setCertData] = useState({ name: '', month: '', year: '', doesNotExpire: false });
  const [showLangModal, setShowLangModal] = useState(false);
  const [langData, setLangData] = useState({ language: '', proficiency: '' });
  const [showJobTitlesModal, setShowJobTitlesModal] = useState(false);
  const [jobTitles, setJobTitles] = useState(['']);
  const [showJobTypesModal, setShowJobTypesModal] = useState(false);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [showPayModal, setShowPayModal] = useState(false);
  const [payData, setPayData] = useState({ amount: '', period: 'Per month' });
  const [showRelocationModal, setShowRelocationModal] = useState(false);
  const [relocationData, setRelocationData] = useState({ willing: false, type: 'anywhere', cities: [''] });
  const [showRemoteModal, setShowRemoteModal] = useState(false);
  const [selectedRemoteOptions, setSelectedRemoteOptions] = useState([]);
  const [isReadyToWork, setIsReadyToWork] = useState(false);
  const [reviewTab, setReviewTab] = useState('reviews');

  // Fallback defaults if user is not fully populated
  const userName = user?.name || 'SHRIKANT AHER';
  const userInitials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const userEmail = user?.email || 'shrikantaher2004@gmail.com';
  const userLocation = user?.location || 'Shevgaon, Maharashtra, IN';

  const handleViewResume = () => {
    if (user?.resume) {
      window.open(user.resume, '_blank');
    } else {
      alert("No resume URL found. Please upload one first.");
    }
    setShowResumeMenu(false);
  };

  const handleDownloadResume = () => {
    if (user?.resume) {
      window.open(user.resume, '_blank'); 
    }
    setShowResumeMenu(false);
  };

  const handleDeleteResume = () => {
    if (window.confirm("Are you sure you want to delete your resume?")) {
      updateUser({ ...user, resume: '' });
    }
    setShowResumeMenu(false);
  };

  const handleReplaceResume = () => {
    const newResumeUrl = window.prompt("Enter new Resume URL (e.g., Google Drive link):", user?.resume || "");
    if (newResumeUrl !== null) {
      updateUser({ ...user, resume: newResumeUrl });
    }
    setShowResumeMenu(false);
  };

  if (activeView === 'qualifications') {
    return (
      <div className="container py-12" style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="glass-card" style={{ borderRadius: '12px', padding: '2.5rem', minHeight: '60vh' }}>
          
          {/* Top Header */}
          <div style={{ marginBottom: '2rem' }}>
            <button 
              onClick={() => setActiveView('main')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text)', padding: '0 0 1.5rem 0', marginLeft: '-0.5rem' }}
            >
              <ArrowLeft size={24} />
            </button>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: 'var(--text)' }}>Qualifications</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>We use these details to show you jobs that match your unique skills and experience.</p>
          </div>

          {/* Info Banner */}
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.2rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
            <Eye size={20} color="var(--text)" style={{ marginTop: '0.1rem', flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text)', lineHeight: '1.5' }}>
              Qualifications may be shown to employers when you apply to jobs or allow them to <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'var(--text)' }}>find your profile</span>.
            </p>
          </div>

          {/* Action List */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            <div className="hover-bg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border)', cursor: 'pointer', margin: '0 -1.5rem', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} onClick={() => setShowWorkModal(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Briefcase size={24} color="var(--text-muted)" />
                <span style={{ color: 'var(--text)', fontWeight: '600', fontSize: '1rem' }}>Add most recent work experience</span>
              </div>
              <Plus size={24} color="var(--text)" style={{ flexShrink: 0, marginLeft: '1rem' }} />
            </div>

            <div className="hover-bg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border)', cursor: 'pointer', margin: '0 -1.5rem', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} onClick={() => setShowEduModal(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <FileText size={24} color="var(--text-muted)" />
                <span style={{ color: 'var(--text)', fontWeight: '600', fontSize: '1rem' }}>Add education</span>
              </div>
              <Plus size={24} color="var(--text)" style={{ flexShrink: 0, marginLeft: '1rem' }} />
            </div>

            <div className="hover-bg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border)', cursor: 'pointer', margin: '0 -1.5rem', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} onClick={() => setShowSkillModal(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Award size={24} color="var(--text-muted)" />
                <span style={{ color: 'var(--text)', fontWeight: '600', fontSize: '1rem' }}>Add skill</span>
              </div>
              <Plus size={24} color="var(--text)" style={{ flexShrink: 0, marginLeft: '1rem' }} />
            </div>

            <div className="hover-bg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border)', cursor: 'pointer', margin: '0 -1.5rem', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} onClick={() => setShowLicenceModal(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Award size={24} color="var(--text-muted)" />
                <span style={{ color: 'var(--text)', fontWeight: '600', fontSize: '1rem' }}>Add licences</span>
              </div>
              <Plus size={24} color="var(--text)" style={{ flexShrink: 0, marginLeft: '1rem' }} />
            </div>

            <div className="hover-bg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border)', cursor: 'pointer', margin: '0 -1.5rem', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} onClick={() => setShowCertModal(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Award size={24} color="var(--text-muted)" />
                <span style={{ color: 'var(--text)', fontWeight: '600', fontSize: '1rem' }}>Add certifications</span>
              </div>
              <Plus size={24} color="var(--text)" style={{ flexShrink: 0, marginLeft: '1rem' }} />
            </div>

            <div className="hover-bg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border)', cursor: 'pointer', margin: '0 -1.5rem', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} onClick={() => setShowLangModal(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Globe size={24} color="var(--text-muted)" />
                <span style={{ color: 'var(--text)', fontWeight: '600', fontSize: '1rem' }}>Add languages</span>
              </div>
              <Plus size={24} color="var(--text)" style={{ flexShrink: 0, marginLeft: '1rem' }} />
            </div>

          </div>
        </div>
        
        {/* Footer Text */}
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
          ©2026 HireNova - <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Cookies, Privacy and Terms</span>
        </div>

        {/* Work Experience Modal */}
        {showWorkModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
            <div className="glass-card slide-up" style={{ width: '95%', maxWidth: '500px', borderRadius: '16px', overflow: 'hidden', padding: 0, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text)' }}>Add most recent work experience</h3>
                <button onClick={() => setShowWorkModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '5px' }}>
                  <X size={24} />
                </button>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '1.8rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text)' }}>
                    Job title <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    value={workData.jobTitle}
                    onChange={(e) => setWorkData({...workData, jobTitle: e.target.value})}
                    style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontSize: '1rem' }}
                    placeholder="e.g. Software Engineer"
                    autoFocus
                  />
                </div>
                
                <div style={{ marginBottom: '0.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text)' }}>
                    Company name
                  </label>
                  <input 
                    type="text" 
                    value={workData.companyName}
                    onChange={(e) => setWorkData({...workData, companyName: e.target.value})}
                    style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontSize: '1rem' }}
                    placeholder="e.g. Google"
                  />
                </div>
              </div>
              
              <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '1.2rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <button 
                  onClick={() => setShowWorkModal(false)}
                  style={{ padding: '0.7rem 1.8rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--text)', fontWeight: '600', cursor: 'pointer' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { alert("Work experience saved!"); setShowWorkModal(false); }}
                  className="btn btn-primary"
                  style={{ padding: '0.7rem 2.2rem', borderRadius: '30px', fontWeight: 'bold' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Education Modal */}
        {showEduModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
            <div className="glass-card slide-up" style={{ width: '95%', maxWidth: '500px', borderRadius: '16px', overflow: 'hidden', padding: 0, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text)' }}>Add education</h3>
                <button onClick={() => setShowEduModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '5px' }}>
                  <X size={24} />
                </button>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '1.8rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text)' }}>
                    Level of education <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    value={eduData.level}
                    onChange={(e) => setEduData({...eduData, level: e.target.value})}
                    style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontSize: '1rem' }}
                    placeholder="e.g. Bachelor's Degree"
                    autoFocus
                  />
                </div>
                
                <div style={{ marginBottom: '0.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text)' }}>
                    Field of study
                  </label>
                  <input 
                    type="text" 
                    value={eduData.field}
                    onChange={(e) => setEduData({...eduData, field: e.target.value})}
                    style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontSize: '1rem' }}
                    placeholder="e.g. Computer Science"
                  />
                </div>
              </div>
              
              <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <button 
                  onClick={() => setShowEduModal(false)}
                  style={{ padding: '0.7rem 1.2rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--text)', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { alert("Education saved!"); setEduData({ level: '', field: '' }); }}
                  style={{ padding: '0.7rem 1.2rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--primary-light)', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Save and add another
                </button>
                <button 
                  onClick={() => { alert("Education saved!"); setShowEduModal(false); }}
                  className="btn btn-primary"
                  style={{ padding: '0.7rem 1.8rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.95rem' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Skill Modal */}
        {showSkillModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
            <div className="glass-card slide-up" style={{ width: '95%', maxWidth: '500px', borderRadius: '16px', overflow: 'hidden', padding: 0, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text)' }}>Add skill</h3>
                <button onClick={() => setShowSkillModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '5px' }}>
                  <X size={24} />
                </button>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text)' }}>
                    Skill <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    value={skillData}
                    onChange={(e) => setSkillData(e.target.value)}
                    style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontSize: '1rem' }}
                    placeholder="e.g. JavaScript, Design, Communication"
                    autoFocus
                  />
                </div>
              </div>
              
              <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <button 
                  onClick={() => setShowSkillModal(false)}
                  style={{ padding: '0.7rem 1.2rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--text)', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { alert("Skill saved!"); setSkillData(''); }}
                  style={{ padding: '0.7rem 1.2rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--primary-light)', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Save and add another
                </button>
                <button 
                  onClick={() => { alert("Skill saved!"); setShowSkillModal(false); }}
                  className="btn btn-primary"
                  style={{ padding: '0.7rem 1.8rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.95rem' }}
                >
                  Save
                </button>
              </div>
            </div>
              </div>
        )}

        {/* Licence Modal */}
        {showLicenceModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
            <div className="glass-card slide-up" style={{ width: '100%', maxWidth: '550px', borderRadius: '16px', overflow: 'hidden', padding: 0, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text)' }}>Add licence</h3>
                <button onClick={() => setShowLicenceModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '5px' }}>
                  <X size={24} />
                </button>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '1.8rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text)' }}>
                    Licence name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Example: Driving licence</p>
                  <input 
                    type="text" 
                    value={licenceData.name}
                    onChange={(e) => setLicenceData({...licenceData, name: e.target.value})}
                    style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontSize: '1rem' }}
                    placeholder="Enter licence name"
                    autoFocus
                  />
                </div>

                <div style={{ marginBottom: '1.8rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text)' }}>
                    Expiration date
                  </label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <select 
                      value={licenceData.month}
                      onChange={(e) => setLicenceData({...licenceData, month: e.target.value})}
                      disabled={licenceData.doesNotExpire}
                      style={{ flex: 1, padding: '0.9rem 1rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: licenceData.doesNotExpire ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontSize: '1rem', appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" style={{ backgroundColor: '#1a1a1a' }}>Month</option>
                      {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                        <option key={m} value={m} style={{ backgroundColor: '#1a1a1a' }}>{m}</option>
                      ))}
                    </select>
                    <select 
                      value={licenceData.year}
                      onChange={(e) => setLicenceData({...licenceData, year: e.target.value})}
                      disabled={licenceData.doesNotExpire}
                      style={{ flex: 1, padding: '0.9rem 1rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: licenceData.doesNotExpire ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontSize: '1rem', appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" style={{ backgroundColor: '#1a1a1a' }}>Year</option>
                      {Array.from({ length: 31 }, (_, i) => 2024 + i).map(y => (
                        <option key={y} value={y} style={{ backgroundColor: '#1a1a1a' }}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }} onClick={() => setLicenceData({...licenceData, doesNotExpire: !licenceData.doesNotExpire})}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '4px', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: licenceData.doesNotExpire ? 'var(--primary)' : 'transparent', transition: 'all 0.2s' }}>
                    {licenceData.doesNotExpire && <Plus size={16} color="white" style={{ transform: 'rotate(45deg)' }} />}
                  </div>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text)' }}>Does not expire</span>
                </div>
              </div>
              
              <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <button 
                  onClick={() => setShowLicenceModal(false)}
                  style={{ padding: '0.7rem 1.2rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--text)', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { alert("Licence saved!"); setLicenceData({ name: '', month: '', year: '', doesNotExpire: false }); }}
                  style={{ padding: '0.7rem 1.2rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--primary-light)', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Save and add another
                </button>
                <button 
                  onClick={() => { alert("Licence saved!"); setShowLicenceModal(false); }}
                  className="btn btn-primary"
                  style={{ padding: '0.7rem 1.8rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.95rem' }}
                >
                  Save
                </button>
              </div>
            </div>
              </div>
        )}

        {/* Certification Modal */}
        {showCertModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
            <div className="glass-card slide-up" style={{ width: '100%', maxWidth: '550px', borderRadius: '16px', overflow: 'hidden', padding: 0, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text)' }}>Add certification</h3>
                <button onClick={() => setShowCertModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '5px' }}>
                  <X size={24} />
                </button>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '1.8rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text)' }}>
                    Certification name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Example: MOS Associate</p>
                  <input 
                    type="text" 
                    value={certData.name}
                    onChange={(e) => setCertData({...certData, name: e.target.value})}
                    style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontSize: '1rem' }}
                    placeholder="Enter certification name"
                    autoFocus
                  />
                </div>

                <div style={{ marginBottom: '1.8rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text)' }}>
                    Expiration date
                  </label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <select 
                      value={certData.month}
                      onChange={(e) => setCertData({...certData, month: e.target.value})}
                      disabled={certData.doesNotExpire}
                      style={{ flex: 1, padding: '0.9rem 1rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: certData.doesNotExpire ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontSize: '1rem', appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" style={{ backgroundColor: '#1a1a1a' }}>Month</option>
                      {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                        <option key={m} value={m} style={{ backgroundColor: '#1a1a1a' }}>{m}</option>
                      ))}
                    </select>
                    <select 
                      value={certData.year}
                      onChange={(e) => setCertData({...certData, year: e.target.value})}
                      disabled={certData.doesNotExpire}
                      style={{ flex: 1, padding: '0.9rem 1rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: certData.doesNotExpire ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontSize: '1rem', appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" style={{ backgroundColor: '#1a1a1a' }}>Year</option>
                      {Array.from({ length: 31 }, (_, i) => 2024 + i).map(y => (
                        <option key={y} value={y} style={{ backgroundColor: '#1a1a1a' }}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }} onClick={() => setCertData({...certData, doesNotExpire: !certData.doesNotExpire})}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '4px', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: certData.doesNotExpire ? 'var(--primary)' : 'transparent', transition: 'all 0.2s' }}>
                    {certData.doesNotExpire && <Plus size={16} color="white" style={{ transform: 'rotate(45deg)' }} />}
                  </div>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text)' }}>Does not expire</span>
                </div>
              </div>
              
              <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <button 
                  onClick={() => setShowCertModal(false)}
                  style={{ padding: '0.7rem 1.2rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--text)', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { alert("Certification saved!"); setCertData({ name: '', month: '', year: '', doesNotExpire: false }); }}
                  style={{ padding: '0.7rem 1.2rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--primary-light)', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Save and add another
                </button>
                <button 
                  onClick={() => { alert("Certification saved!"); setShowCertModal(false); }}
                  className="btn btn-primary"
                  style={{ padding: '0.7rem 1.8rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.95rem' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Language Modal */}
        {showLangModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
            <div className="glass-card slide-up" style={{ width: '95%', maxWidth: '500px', borderRadius: '16px', overflow: 'hidden', padding: 0, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text)' }}>Add language</h3>
                <button onClick={() => setShowLangModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '5px' }}>
                  <X size={24} />
                </button>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '1.8rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text)' }}>
                    Language <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    value={langData.language}
                    onChange={(e) => setLangData({...langData, language: e.target.value})}
                    style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontSize: '1rem' }}
                    placeholder="e.g. English, Spanish, Hindi"
                    autoFocus
                  />
                </div>

                <div style={{ marginBottom: '0.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text)' }}>
                    Proficiency
                  </label>
                  <select 
                    value={langData.proficiency}
                    onChange={(e) => setLangData({...langData, proficiency: e.target.value})}
                    style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontSize: '1rem', appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="" style={{ backgroundColor: '#1a1a1a' }}>Select</option>
                    <option value="Basic" style={{ backgroundColor: '#1a1a1a' }}>Basic</option>
                    <option value="Conversational" style={{ backgroundColor: '#1a1a1a' }}>Conversational</option>
                    <option value="Fluent" style={{ backgroundColor: '#1a1a1a' }}>Fluent</option>
                    <option value="Native" style={{ backgroundColor: '#1a1a1a' }}>Native or Bilingual</option>
                  </select>
                </div>
              </div>
              
              <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <button 
                  onClick={() => setShowLangModal(false)}
                  style={{ padding: '0.7rem 1.2rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--text)', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { alert("Language saved!"); setLangData({ language: '', proficiency: '' }); }}
                  style={{ padding: '0.7rem 1.2rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--primary-light)', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Save and add another
                </button>
                <button 
                  onClick={() => { alert("Language saved!"); setShowLangModal(false); }}
                  className="btn btn-primary"
                  style={{ padding: '0.7rem 1.8rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.95rem' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (activeView === 'preferences') {
    return (
      <div className="container py-12" style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="glass-card" style={{ borderRadius: '12px', padding: '2.5rem', minHeight: '60vh' }}>
          
          {/* Top Header */}
          <div style={{ marginBottom: '2rem' }}>
            <button 
              onClick={() => setActiveView('main')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text)', padding: '0 0 1.5rem 0', marginLeft: '-0.5rem' }}
            >
              <ArrowLeft size={24} />
            </button>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: 'var(--text)' }}>Job preferences</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>We use these details to find jobs that are a great fit for you.</p>
          </div>

          {/* Action List */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            <div className="hover-bg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border)', cursor: 'pointer', margin: '0 -1.5rem', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} onClick={() => setShowJobTitlesModal(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <User size={24} color="var(--text-muted)" />
                <span style={{ color: 'var(--text)', fontWeight: '600', fontSize: '1rem' }}>Add job titles</span>
              </div>
              <Plus size={24} color="var(--text)" style={{ flexShrink: 0, marginLeft: '1rem' }} />
            </div>

            <div className="hover-bg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border)', cursor: 'pointer', margin: '0 -1.5rem', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} onClick={() => setShowJobTypesModal(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Briefcase size={24} color="var(--text-muted)" />
                <span style={{ color: 'var(--text)', fontWeight: '600', fontSize: '1rem' }}>Add job types</span>
              </div>
              <Plus size={24} color="var(--text)" style={{ flexShrink: 0, marginLeft: '1rem' }} />
            </div>

            <div className="hover-bg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border)', cursor: 'pointer', margin: '0 -1.5rem', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} onClick={() => setShowScheduleModal(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Clock size={24} color="var(--text-muted)" />
                <span style={{ color: 'var(--text)', fontWeight: '600', fontSize: '1rem' }}>Add work schedule</span>
              </div>
              <Plus size={24} color="var(--text)" style={{ flexShrink: 0, marginLeft: '1rem' }} />
            </div>

            <div className="hover-bg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border)', cursor: 'pointer', margin: '0 -1.5rem', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} onClick={() => setShowPayModal(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Wallet size={24} color="var(--text-muted)" />
                <span style={{ color: 'var(--text)', fontWeight: '600', fontSize: '1rem' }}>Add pay</span>
              </div>
              <Plus size={24} color="var(--text)" style={{ flexShrink: 0, marginLeft: '1rem' }} />
            </div>

            <div className="hover-bg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border)', cursor: 'pointer', margin: '0 -1.5rem', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} onClick={() => setShowRelocationModal(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <MapPin size={24} color="var(--text-muted)" />
                <span style={{ color: 'var(--text)', fontWeight: '600', fontSize: '1rem' }}>Add relocation</span>
              </div>
              <Plus size={24} color="var(--text)" style={{ flexShrink: 0, marginLeft: '1rem' }} />
            </div>

            <div className="hover-bg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border)', cursor: 'pointer', margin: '0 -1.5rem', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} onClick={() => setShowRemoteModal(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Home size={24} color="var(--text-muted)" />
                <span style={{ color: 'var(--text)', fontWeight: '600', fontSize: '1rem' }}>Add remote</span>
              </div>
              <Plus size={24} color="var(--text)" style={{ flexShrink: 0, marginLeft: '1rem' }} />
            </div>

          </div>
        </div>

        {/* Job Titles Modal */}
        {showJobTitlesModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
            <div className="glass-card slide-up" style={{ width: '95%', maxWidth: '500px', borderRadius: '16px', overflow: 'hidden', padding: 0, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text)' }}>Add job titles</h3>
                <button onClick={() => setShowJobTitlesModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '5px' }}>
                  <X size={24} />
                </button>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text)' }}>What are your desired job titles?</h4>
                <p style={{ margin: '0 0 1.2rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Add up to ten job titles</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {jobTitles.map((title, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        value={title}
                        onChange={(e) => {
                          const newTitles = [...jobTitles];
                          newTitles[index] = e.target.value;
                          setJobTitles(newTitles);
                        }}
                        style={{ flex: 1, padding: '0.9rem 1.2rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontSize: '1rem' }}
                        placeholder="e.g. Software Engineer"
                        autoFocus={index === jobTitles.length - 1}
                      />
                      {jobTitles.length > 1 && (
                        <button onClick={() => setJobTitles(jobTitles.filter((_, i) => i !== index))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {jobTitles.length < 10 && (
                  <button 
                    onClick={() => setJobTitles([...jobTitles, ''])}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-light)', fontWeight: '600', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.2rem', padding: '0.5rem 0' }}
                  >
                    <Plus size={18} /> Add another
                  </button>
                )}
              </div>
              
              <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <button 
                  onClick={() => setShowJobTitlesModal(false)}
                  style={{ padding: '0.7rem 1.8rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--text)', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { alert("Job titles saved!"); setShowJobTitlesModal(false); }}
                  className="btn btn-primary"
                  style={{ padding: '0.7rem 2rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.95rem' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Job Types Modal */}
        {showJobTypesModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
            <div className="glass-card slide-up" style={{ width: '95%', maxWidth: '500px', borderRadius: '16px', overflow: 'hidden', padding: 0, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text)' }}>Add job types</h3>
                <button onClick={() => setShowJobTypesModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '5px' }}>
                  <X size={24} />
                </button>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <h4 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text)' }}>What are your desired job types?</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {['Full-time', 'Permanent', 'Fresher', 'Part-time', 'Internship', 'Contractual / Temporary', 'Freelance', 'Volunteer'].map((type) => (
                    <div 
                      key={type} 
                      style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
                      onClick={() => {
                        if (selectedJobTypes.includes(type)) {
                          setSelectedJobTypes(selectedJobTypes.filter(t => t !== type));
                        } else {
                          setSelectedJobTypes([...selectedJobTypes, type]);
                        }
                      }}
                    >
                      <div style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '6px', 
                        border: '2px solid var(--border)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        backgroundColor: selectedJobTypes.includes(type) ? 'var(--primary)' : 'transparent',
                        transition: 'all 0.2s'
                      }}>
                        {selectedJobTypes.includes(type) && <Check size={18} color="white" />}
                      </div>
                      <span style={{ fontSize: '1rem', color: 'var(--text)' }}>{type}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <button 
                  onClick={() => setShowJobTypesModal(false)}
                  style={{ padding: '0.7rem 1.8rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--text)', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { alert("Job types saved!"); setShowJobTypesModal(false); }}
                  className="btn btn-primary"
                  style={{ padding: '0.7rem 2rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.95rem' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Modal */}
        {showScheduleModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
            <div className="glass-card slide-up" style={{ width: '100%', maxWidth: '550px', maxHeight: '90vh', borderRadius: '16px', overflow: 'hidden', padding: 0, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text)' }}>Add work schedule</h3>
                <button onClick={() => setShowScheduleModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '5px' }}>
                  <X size={24} />
                </button>
              </div>
              
              <div style={{ padding: '2rem', overflowY: 'auto' }}>
                <h4 style={{ margin: '0 0 2rem 0', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text)' }}>What are your desired schedules?</h4>
                
                <div style={{ marginBottom: '2.5rem' }}>
                  <h5 style={{ margin: '0 0 1.2rem 0', fontSize: '1rem', fontWeight: 'bold', color: 'var(--text)' }}>Days</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {['Monday to Friday', 'Weekend availability', 'Weekend only'].map((day) => (
                      <div 
                        key={day} 
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
                        onClick={() => {
                          if (selectedSchedules.includes(day)) {
                            setSelectedSchedules(selectedSchedules.filter(t => t !== day));
                          } else {
                            setSelectedSchedules([...selectedSchedules, day]);
                          }
                        }}
                      >
                        <div style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '6px', 
                          border: '2px solid var(--border)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          backgroundColor: selectedSchedules.includes(day) ? 'var(--primary)' : 'transparent',
                          transition: 'all 0.2s'
                        }}>
                          {selectedSchedules.includes(day) && <Check size={18} color="white" />}
                        </div>
                        <span style={{ fontSize: '1rem', color: 'var(--text)' }}>{day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 style={{ margin: '0 0 1.2rem 0', fontSize: '1rem', fontWeight: 'bold', color: 'var(--text)' }}>Shifts</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {['Day shift', 'Morning shift', 'Rotational shift', 'Night shift', 'Evening shift', 'Fixed shift', 'US shift', 'UK shift'].map((shift) => (
                      <div 
                        key={shift} 
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
                        onClick={() => {
                          if (selectedSchedules.includes(shift)) {
                            setSelectedSchedules(selectedSchedules.filter(t => t !== shift));
                          } else {
                            setSelectedSchedules([...selectedSchedules, shift]);
                          }
                        }}
                      >
                        <div style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '6px', 
                          border: '2px solid var(--border)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          backgroundColor: selectedSchedules.includes(shift) ? 'var(--primary)' : 'transparent',
                          transition: 'all 0.2s'
                        }}>
                          {selectedSchedules.includes(shift) && <Check size={18} color="white" />}
                        </div>
                        <span style={{ fontSize: '1rem', color: 'var(--text)' }}>{shift}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', flexShrink: 0 }}>
                <button 
                  onClick={() => setShowScheduleModal(false)}
                  style={{ padding: '0.7rem 1.8rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--text)', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { alert("Work schedule saved!"); setShowScheduleModal(false); }}
                  className="btn btn-primary"
                  style={{ padding: '0.7rem 2rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.95rem' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pay Modal */}
        {showPayModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
            <div className="glass-card slide-up" style={{ width: '100%', maxWidth: '550px', borderRadius: '16px', overflow: 'hidden', padding: 0, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text)' }}>Add pay</h3>
                <button onClick={() => setShowPayModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '5px' }}>
                  <X size={24} />
                </button>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <h4 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text)' }}>What is the minimum pay you'll consider in your search?</h4>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', borderRadius: '12px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', marginBottom: '2rem' }}>
                  <EyeOff size={20} color="var(--primary-light)" />
                  <span style={{ color: 'var(--text)', fontSize: '0.95rem' }}>Not shown to employers.</span>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text)' }}>
                    Minimum base pay
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '1.2rem' }}>₹</span>
                    <input 
                      type="number" 
                      value={payData.amount}
                      onChange={(e) => setPayData({...payData, amount: e.target.value})}
                      style={{ width: '100%', padding: '0.9rem 1.2rem 0.9rem 2.5rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontSize: '1.1rem' }}
                      placeholder="Amount"
                      autoFocus
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text)' }}>
                    Pay period
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                    {['Per hour', 'Per year', 'Per month', 'Per week', 'Per day'].map((period) => (
                      <button
                        key={period}
                        onClick={() => setPayData({...payData, period})}
                        style={{ 
                          padding: '0.6rem 1.2rem', 
                          borderRadius: '30px', 
                          border: '1px solid var(--border)', 
                          backgroundColor: payData.period === period ? 'var(--primary)' : 'rgba(255,255,255,0.05)', 
                          color: payData.period === period ? 'white' : 'var(--text)',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-light)', fontWeight: '600', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Show less pay periods <ChevronRight size={18} style={{ transform: 'rotate(-90deg)' }} />
                </button>
              </div>
              
              <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <button 
                  onClick={() => setShowPayModal(false)}
                  style={{ padding: '0.7rem 1.8rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--text)', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { alert("Pay preferences saved!"); setShowPayModal(false); }}
                  className="btn btn-primary"
                  style={{ padding: '0.7rem 2rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.95rem' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Relocation Modal */}
        {showRelocationModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
            <div className="glass-card slide-up" style={{ width: '100%', maxWidth: '550px', borderRadius: '16px', overflow: 'hidden', padding: 0, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text)' }}>Add relocation</h3>
                <button onClick={() => setShowRelocationModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '5px' }}>
                  <X size={24} />
                </button>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <h4 style={{ margin: '0 0 2rem 0', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text)' }}>Are you willing to relocate?</h4>
                
                <div 
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', marginBottom: '2rem' }}
                  onClick={() => setRelocationData({...relocationData, willing: !relocationData.willing})}
                >
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '6px', 
                    border: '2px solid var(--border)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    backgroundColor: relocationData.willing ? 'var(--primary)' : 'transparent',
                    transition: 'all 0.2s'
                  }}>
                    {relocationData.willing && <Check size={18} color="white" />}
                  </div>
                  <span style={{ fontSize: '1rem', color: 'var(--text)' }}>Yes, I'm willing to relocate</span>
                </div>

                <div style={{ opacity: relocationData.willing ? 1 : 0.5, pointerEvents: relocationData.willing ? 'auto' : 'none', transition: 'all 0.3s' }}>
                  <div 
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', marginBottom: '1.5rem', paddingLeft: '0.5rem' }}
                    onClick={() => setRelocationData({...relocationData, type: 'anywhere'})}
                  >
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {relocationData.type === 'anywhere' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary-light)' }} />}
                    </div>
                    <span style={{ fontSize: '1rem', color: 'var(--text)' }}>Anywhere in India</span>
                  </div>

                  <div 
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', marginBottom: '1.5rem', paddingLeft: '0.5rem' }}
                    onClick={() => setRelocationData({...relocationData, type: 'desired'})}
                  >
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {relocationData.type === 'desired' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary-light)' }} />}
                    </div>
                    <span style={{ fontSize: '1rem', color: 'var(--text)' }}>Desired Work Location</span>
                  </div>

                  {relocationData.type === 'desired' && (
                    <div style={{ paddingLeft: '2.5rem', marginTop: '1rem' }}>
                      <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>You can add up to 3 cities.</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {relocationData.cities.map((city, index) => (
                          <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input 
                              type="text" 
                              value={city}
                              onChange={(e) => {
                                const newCities = [...relocationData.cities];
                                newCities[index] = e.target.value;
                                setRelocationData({...relocationData, cities: newCities});
                              }}
                              style={{ flex: 1, padding: '0.9rem 1.2rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text)', outline: 'none', fontSize: '1rem' }}
                              placeholder="Enter city"
                              autoFocus={index === relocationData.cities.length - 1}
                            />
                            {relocationData.cities.length > 1 && (
                              <button onClick={() => setRelocationData({...relocationData, cities: relocationData.cities.filter((_, i) => i !== index)})} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                                <Trash2 size={20} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {relocationData.cities.length < 3 && (
                        <button 
                          onClick={() => setRelocationData({...relocationData, cities: [...relocationData.cities, '']})}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-light)', fontWeight: '600', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.2rem' }}
                        >
                          <Plus size={18} /> Add another location
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <button 
                  onClick={() => setShowRelocationModal(false)}
                  style={{ padding: '0.7rem 1.8rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--text)', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { alert("Relocation preferences saved!"); setShowRelocationModal(false); }}
                  className="btn btn-primary"
                  style={{ padding: '0.7rem 2rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.95rem' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Remote Modal */}
        {showRemoteModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
            <div className="glass-card slide-up" style={{ width: '95%', maxWidth: '500px', borderRadius: '16px', overflow: 'hidden', padding: 0, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text)' }}>Add remote</h3>
                <button onClick={() => setShowRemoteModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '5px' }}>
                  <X size={24} />
                </button>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <h4 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text)' }}>Desired work setting</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {['Remote', 'Hybrid work', 'In-person'].map((option) => (
                    <div 
                      key={option} 
                      style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
                      onClick={() => {
                        if (selectedRemoteOptions.includes(option)) {
                          setSelectedRemoteOptions(selectedRemoteOptions.filter(o => o !== option));
                        } else {
                          setSelectedRemoteOptions([...selectedRemoteOptions, option]);
                        }
                      }}
                    >
                      <div style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '6px', 
                        border: '2px solid var(--border)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        backgroundColor: selectedRemoteOptions.includes(option) ? 'var(--primary)' : 'transparent',
                        transition: 'all 0.2s'
                      }}>
                        {selectedRemoteOptions.includes(option) && <Check size={18} color="white" />}
                      </div>
                      <span style={{ fontSize: '1rem', color: 'var(--text)' }}>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <button 
                  onClick={() => setShowRemoteModal(false)}
                  style={{ padding: '0.7rem 1.8rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--text)', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { alert("Remote preferences saved!"); setShowRemoteModal(false); }}
                  className="btn btn-primary"
                  style={{ padding: '0.7rem 2rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.95rem' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Footer Text */}
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          ©2026 HireNova - <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Cookies, Privacy and Terms</span>
        </div>
      </div>
    );
  }

  if (activeView === 'hideJobs') {
    return (
      <div className="container py-12" style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="glass-card" style={{ borderRadius: '12px', padding: '2.5rem', minHeight: '60vh' }}>
          
          {/* Top Header */}
          <div style={{ marginBottom: '2rem' }}>
            <button 
              onClick={() => setActiveView('main')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text)', padding: '0 0 1.5rem 0', marginLeft: '-0.5rem' }}
            >
              <ArrowLeft size={24} />
            </button>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: 'var(--text)' }}>Hide jobs with these details</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>We'll try to hide jobs asking for these qualifications or preferences.</p>
          </div>

          {/* Feedback Info Card */}
          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.03)', 
            borderRadius: '16px', 
            padding: '2rem', 
            border: '1px solid var(--border)',
            marginTop: '3rem'
          }}>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', textAlign: 'left' }}>
              When you provide feedback about the jobs shown in your search results and email notifications, you'll see the details here.
            </p>
          </div>

        </div>

        {/* Footer Text */}
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          ©2026 HireNova - <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Cookies, Privacy and Terms</span>
        </div>
      </div>
    );
  }

  if (activeView === 'readyToWork') {
    return (
      <div className="container py-12" style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="glass-card" style={{ borderRadius: '12px', padding: '2.5rem', minHeight: '50vh' }}>
          
          {/* Top Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            <button 
              onClick={() => setActiveView('main')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text)', padding: '0 0 1.5rem 0', marginLeft: '-0.5rem' }}
            >
              <ArrowLeft size={24} />
            </button>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: 'var(--text)' }}>Ready to work</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Let employers know that you can begin work right away.</p>
          </div>

          {/* Toggle Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
            <div 
              onClick={() => setIsReadyToWork(!isReadyToWork)}
              style={{ 
                width: '60px', 
                height: '32px', 
                borderRadius: '20px', 
                backgroundColor: isReadyToWork ? 'var(--primary)' : 'rgba(255,255,255,0.1)', 
                position: 'relative', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease',
                border: '1px solid var(--border)'
              }}
            >
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                backgroundColor: 'white', 
                position: 'absolute', 
                top: '3px', 
                left: isReadyToWork ? '31px' : '4px', 
                transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {!isReadyToWork && <X size={14} color="#666" />}
                {isReadyToWork && <Check size={14} color="var(--primary)" />}
              </div>
            </div>
            <span style={{ fontSize: '1.1rem', color: 'var(--text)', fontWeight: '500' }}>I'm available to start immediately</span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => { alert("Ready to work status saved!"); setActiveView('main'); }}
              className="btn btn-primary"
              style={{ padding: '0.8rem 2.5rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '1rem' }}
            >
              Save
            </button>
            <button 
              onClick={() => setActiveView('main')}
              style={{ padding: '0.8rem 2.5rem', borderRadius: '30px', border: '1px solid var(--border)', background: 'none', color: 'var(--text)', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Cancel
            </button>
          </div>

        </div>

        {/* Footer Text */}
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          ©2026 HireNova - <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Cookies, Privacy and Terms</span>
        </div>
      </div>
    );
  }

  if (activeView === 'reviews') {
    return (
      <div className="container py-12" style={{ maxWidth: '900px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="glass-card" style={{ borderRadius: '12px', padding: '3rem', minHeight: '60vh' }}>
          
          {/* Top Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            <button 
              onClick={() => setActiveView('main')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text)', padding: '0 0 1.5rem 0', marginLeft: '-0.5rem' }}
            >
              <ArrowLeft size={24} />
            </button>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: '0 0 1rem 0', color: 'var(--text)' }}>My contributions</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', maxWidth: '700px' }}>
              Your reviews, questions and answers will appear on the employer's Company Page. They are not associated with your name, CV or job applications.
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '3rem', borderBottom: '1px solid var(--border)', marginBottom: '4rem' }}>
            {['Reviews', 'Questions', 'Answers'].map((tab) => (
              <div 
                key={tab}
                onClick={() => setReviewTab(tab.toLowerCase())}
                style={{ 
                  padding: '1rem 0', 
                  color: reviewTab === tab.toLowerCase() ? 'var(--text)' : 'var(--text-muted)', 
                  fontWeight: '600', 
                  fontSize: '1.05rem',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'color 0.2s'
                }}
              >
                {tab} (0)
                {reviewTab === tab.toLowerCase() && (
                  <div style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '3px', backgroundColor: 'var(--primary)', borderRadius: '3px 3px 0 0' }} />
                )}
              </div>
            ))}
          </div>

          {/* Empty State Illustration & Content */}
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ 
              width: '180px', 
              height: '180px', 
              backgroundColor: 'rgba(59, 130, 246, 0.05)', 
              borderRadius: '50%', 
              margin: '0 auto 2.5rem auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{ 
                width: '100px', 
                height: '80px', 
                backgroundColor: '#d97706', 
                borderRadius: '8px', 
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
              }}>
                <Star size={16} color="white" fill="white" />
                <Star size={16} color="white" fill="white" />
                <Star size={16} color="white" fill="white" />
                <div style={{ position: 'absolute', top: '-40px', width: '60px', height: '60px', border: '8px solid #1e3a8a', borderRadius: '50%', clipPath: 'inset(0 0 50% 0)' }} />
              </div>
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text)', marginBottom: '0.8rem' }}>Unlock all reviews</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>Access all reviews by writing yours</p>
            
            <button 
              className="btn btn-primary"
              style={{ padding: '0.9rem 2.5rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}
            >
              Write a review <ArrowRight size={20} />
            </button>
          </div>

        </div>

        {/* Footer Text */}
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          ©2026 HireNova - <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Cookies, Privacy and Terms</span>
        </div>
      </div>
    );
  }

  if (activeView === 'settings') {
    return (
      <div className="container py-12" style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="glass-card" style={{ borderRadius: '12px', padding: '2.5rem', minHeight: '60vh' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <button onClick={() => setActiveView('main')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text)', padding: '0 0 1.5rem 0', marginLeft: '-0.5rem' }}>
              <ArrowLeft size={24} />
            </button>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: 'var(--text)' }}>Account Settings</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Manage your account preferences and security settings.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text)' }}>Personal Information</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Update your email, phone number, and physical address.</p>
              <button className="btn btn-ghost" style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Edit Info</button>
            </div>
            
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text)' }}>Password & Security</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Change your password and enable two-factor authentication.</p>
              <button className="btn btn-ghost" style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Update Password</button>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text)' }}>Email Notifications</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Choose which emails you'd like to receive from us.</p>
              <button className="btn btn-ghost" style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Manage Notifications</button>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          ©2026 HireNova - <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Cookies, Privacy and Terms</span>
        </div>
      </div>
    );
  }

  if (activeView === 'help') {
    return (
      <div className="container py-12" style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="glass-card" style={{ borderRadius: '12px', padding: '2.5rem', minHeight: '60vh' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <button onClick={() => setActiveView('main')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text)', padding: '0 0 1.5rem 0', marginLeft: '-0.5rem' }}>
              <ArrowLeft size={24} />
            </button>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: 'var(--text)' }}>Help Center</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Find answers to common questions or contact support.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'rgba(59, 130, 246, 0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text)' }}>Contact Support</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Our team is available 24/7 to help with any issues.</p>
              <button className="btn btn-primary" style={{ padding: '0.7rem 1.5rem' }}>Send a Message</button>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text)' }}>Frequently Asked Questions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {["How do I change my password?", "How can I delete my account?", "How do I upload a new resume?", "Where can I see my application status?"].map((q, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <span style={{ color: 'var(--text)' }}>{q}</span>
                    <ChevronRight size={18} color="var(--text-muted)" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          ©2026 HireNova - <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Cookies, Privacy and Terms</span>
        </div>
      </div>
    );
  }

  if (activeView === 'privacy') {
    return (
      <div className="container py-12" style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="glass-card" style={{ borderRadius: '12px', padding: '2.5rem', minHeight: '60vh' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <button onClick={() => setActiveView('main')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text)', padding: '0 0 1.5rem 0', marginLeft: '-0.5rem' }}>
              <ArrowLeft size={24} />
            </button>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: 'var(--text)' }}>Privacy Centre</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Your privacy is our priority. Manage your data and visibility.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text)' }}>Data Usage</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                We use your data to improve your job recommendations and provide a better experience. You can choose what data we collect and how we use it.
              </p>
              <button className="btn btn-ghost" style={{ marginTop: '1rem' }}>Download My Data</button>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text)' }}>Visibility Settings</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                <div>
                  <h4 style={{ margin: 0, color: 'var(--text)' }}>Profile Visibility</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Allow employers to find your profile in searches.</p>
                </div>
                <div style={{ width: '40px', height: '20px', borderRadius: '10px', backgroundColor: 'var(--primary)', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white', position: 'absolute', top: '2px', right: '2px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          ©2026 HireNova - <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Cookies, Privacy and Terms</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 sm:py-12" style={{ maxWidth: '900px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Main Profile Container */}
      <div className="glass-card" style={{ borderRadius: '12px', padding: '1.5rem sm:2.5rem' }}>
        
        {/* Header Section */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center sm:items-start gap-6 mb-8 text-center sm:text-left">
          <div className="w-full">
            <h1 className="text-h2" style={{ margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text)' }}>
              {userName}
            </h1>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center sm:justify-start gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                <Mail size={18} />
                <span>{userEmail}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 text-sm cursor-pointer hover:underline" style={{ color: 'var(--primary-light)' }}>
                <Phone size={18} color="var(--text-muted)" />
                <span>Add phone number</span>
                <ChevronRight size={14} color="var(--text-muted)" />
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                <MapPin size={18} />
                <span>{userLocation}</span>
              </div>
            </div>
          </div>
          
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold', flexShrink: 0 }}>
            {user?.photo ? <img src={user.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : userInitials}
          </div>
        </div>

        {/* Visibility Warning Badge */}
        <div className="flex-responsive items-center justify-between gap-4" style={{ backgroundColor: 'rgba(255, 152, 0, 0.1)', border: '1px solid rgba(255, 152, 0, 0.3)', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2.5rem', color: '#ffb74d', fontWeight: '500' }}>
          <div className="flex items-center gap-2 text-sm">
            <EyeOff size={18} />
            <span>Employers can't find you</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:underline">
            <span>Update settings</span>
            <ChevronRight size={18} />
          </div>
        </div>

        {/* Resume Section */}
        <div className="mb-10">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text)' }}>Resume</h2>
          
          {user?.resume ? (
            <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem', position: 'relative' }}>
              <div className="flex justify-between items-start">
                <div className="flex gap-4 items-center overflow-hidden">
                  <div style={{ minWidth: '48px', height: '56px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <FileText size={24} color="var(--text-muted)" style={{ margin: 'auto' }} />
                    <div style={{ backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.6rem', fontWeight: 'bold', padding: '2px', textAlign: 'center', width: '100%', position: 'absolute', bottom: 0 }}>
                      PDF
                    </div>
                  </div>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: '600', fontSize: '1rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName.split(' ')[0]} Resume-.pdf</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Added today</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', marginLeft: '1rem' }}>
                  <button 
                    onClick={() => setShowResumeMenu(!showResumeMenu)}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                  >
                    <MoreHorizontal size={20} color="var(--text)" />
                  </button>
                  
                  {/* 3-Dot Dropdown Menu */}
                  {showResumeMenu && (
                    <div className="glass-card slide-up" style={{ position: 'absolute', right: 0, top: 'calc(100% + 0.5rem)', width: '280px', borderRadius: '8px', zIndex: 10, padding: '0.5rem 0', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', border: '1px solid var(--border)' }}>
                      <button 
                        onClick={handleViewResume}
                        style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '0.85rem 1.5rem', width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.95rem', color: 'var(--text)' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <FileSearch size={20} color="var(--text-muted)" /> View
                      </button>
                      <button 
                        onClick={handleDownloadResume}
                        style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '0.85rem 1.5rem', width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.95rem', color: 'var(--text)' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Download size={20} color="var(--text-muted)" /> Download
                      </button>
                      <button 
                        onClick={() => { setShowResumeMenu(false); alert("To update saved info, please edit your profile from the main dropdown menu."); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '0.85rem 1.5rem', width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.95rem', color: 'var(--text)' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Edit2 size={20} color="var(--text-muted)" /> Update saved information
                      </button>
                      <button 
                        onClick={handleReplaceResume}
                        style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '0.85rem 1.5rem', width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.95rem', color: 'var(--text)' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <FileUp size={20} color="var(--text-muted)" /> Replace file
                      </button>
                      <button 
                        onClick={handleDeleteResume}
                        style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '0.85rem 1.5rem', width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.95rem', color: '#ef4444' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Trash2 size={20} color="#ef4444" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ border: '1px dashed var(--border)', borderRadius: '12px', padding: '3rem 2rem', textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <FileUp size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>No resume uploaded yet.</p>
              <button 
                onClick={handleReplaceResume} 
                className="btn btn-primary"
                style={{ padding: '0.6rem 1.5rem' }}
              >
                Upload Resume
              </button>
            </div>
          )}
        </div>

        {/* Improve Job Matches Section */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text)' }}>Improve your job matches</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            <div 
              className="flex justify-between items-center py-4 border-b" 
              style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
              onClick={() => setActiveView('qualifications')}
            >
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: '600', fontSize: '0.95rem', color: 'var(--text)' }}>Qualifications</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Highlight your skills and experience.</p>
              </div>
              <ChevronRight size={20} color="var(--text-muted)" />
            </div>

            <div className="flex justify-between items-center py-4 border-b" style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => setActiveView('preferences')}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: '600', fontSize: '0.95rem', color: 'var(--text)' }}>Job preferences</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Save specific details like minimum desired pay and schedule.</p>
              </div>
              <ChevronRight size={20} color="var(--text-muted)" />
            </div>

            <div className="flex justify-between items-center py-4 border-b" style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => setActiveView('hideJobs')}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: '600', fontSize: '0.95rem', color: 'var(--text)' }}>Hide jobs with these details</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage the qualifications or preferences used to hide jobs from your search.</p>
              </div>
              <ChevronRight size={20} color="var(--text-muted)" />
            </div>

            <div className="flex justify-between items-center py-4 border-b" style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => setActiveView('readyToWork')}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: '600', fontSize: '0.95rem', color: 'var(--text)' }}>Ready to work</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Let employers know that you're available to start working as soon as possible.</p>
              </div>
              <ChevronRight size={20} color="var(--text-muted)" />
            </div>

            <div className="flex justify-between items-center py-4 border-b" style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => setActiveView('reviews')}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: '600', fontSize: '0.95rem', color: 'var(--text)' }}>My reviews</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage the company reviews you've shared with other job seekers.</p>
              </div>
              <ChevronRight size={20} color="var(--text-muted)" />
            </div>

          </div>
        </div>

      </div>

      {/* Footer Text */}
      <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        ©2026 HireNova - <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Cookies, Privacy and Terms</span>
      </div>
      
    </div>
  );
}
