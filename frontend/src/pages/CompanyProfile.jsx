import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_COMPANIES, MOCK_JOBS } from '../mockData';
import { MapPin, Users, Building2, Globe, ArrowLeft, Star, Briefcase, DollarSign, Clock, Loader } from 'lucide-react';

export default function CompanyProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const companyName = decodeURIComponent(id);
  
  const [company, setCompany] = useState(null);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://remotive.com/api/remote-jobs?company_name=${encodeURIComponent(companyName)}`);
        const data = await response.json();
        
        if (data.jobs && data.jobs.length > 0) {
          const firstJob = data.jobs[0];
          setCompany({
            id: companyName,
            name: firstJob.company_name,
            location: firstJob.candidate_required_location || 'Worldwide',
            sector: firstJob.category || 'Technology',
            industry: 'Digital',
            size: ['10-50', '50-200', '200-500', '1000+'][Math.floor(Math.random() * 4)],
            founded: 2010 + Math.floor(Math.random() * 12),
            rating: (4 + Math.random()).toFixed(1),
            logo: firstJob.company_logo,
            logoText: firstJob.company_name.substring(0, 2).toUpperCase(),
            description: `A fast-growing company in the ${firstJob.category || 'technology'} sector, building products for the future of work.`,
            benefits: ["Remote Work Options", "Flexible Hours", "Health Insurance", "401(k) Matching"]
          });

          setCompanyJobs(data.jobs.map(job => ({
            id: job.id,
            title: job.title,
            location: job.candidate_required_location || 'Remote',
            pay: job.salary || 'Competitive',
            url: job.url
          })));
        } else {
          // Fallback to mock data if API fails or returns empty
          const mockC = MOCK_COMPANIES.find(c => c.name === companyName || c.id === parseInt(id));
          if (mockC) {
             setCompany(mockC);
             setCompanyJobs(MOCK_JOBS.filter(job => job.company === mockC.name));
          }
        }
      } catch (error) {
        console.error("Error fetching company details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompanyData();
  }, [companyName, id]);

  if (isLoading) {
    return (
      <div className="container py-16 text-center flex flex-col items-center justify-center">
        <Loader className="text-primary mb-4" size={32} style={{ animation: 'spin 2s linear infinite' }} />
        <h3>Loading company profile...</h3>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="container py-16 text-center">
        <h2>Company Not Found</h2>
        <p className="text-secondary mt-4 mb-8">The company you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/companies')} className="btn btn-primary">
          Back to Companies
        </button>
      </div>
    );
  }

  return (
    <div className="container py-8 fade-in">
      {/* Back Button */}
      <button onClick={() => navigate('/companies')} className="btn btn-ghost mb-6" style={{ paddingLeft: 0 }}>
        <ArrowLeft size={18} /> Back to Companies
      </button>

      {/* Hero Section */}
      <div className="glass-card mb-8 p-8" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Decorative background element */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '300px',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, var(--primary-light))',
          opacity: 0.5,
          zIndex: 0
        }} />
        
        <div className="flex gap-6 items-center position-relative" style={{ zIndex: 1 }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            boxShadow: 'var(--shadow-glow)',
            overflow: 'hidden'
          }}>
            {company.logo ? (
              <img src={company.logo} alt={company.name} style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'white' }} />
            ) : (
              company.logoText
            )}
          </div>
          
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{company.name}</h1>
              <span className="badge" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                <Star size={14} className="text-warning mr-1" style={{ display: 'inline' }} /> {company.rating}
              </span>
            </div>
            
            <div className="flex gap-6 text-secondary flex-wrap mt-3">
              <div className="flex items-center gap-2">
                <MapPin size={18} /> {company.location}
              </div>
              <div className="flex items-center gap-2">
                <Building2 size={18} /> {company.industry}
              </div>
              <div className="flex items-center gap-2">
                <Globe size={18} /> Est. {company.founded}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
        {/* Left Column: About & Benefits */}
        <div style={{ flex: '2 1 500px' }}>
          <div className="glass-card mb-8 p-6">
            <h3 className="mb-4">About {company.name}</h3>
            <p className="text-secondary" style={{ lineHeight: 1.7 }}>
              {company.description}
            </p>
          </div>

          <div className="glass-card p-6">
            <h3 className="mb-4">Perks & Benefits</h3>
            <div className="flex gap-2 flex-wrap">
              {company.benefits.map((benefit, i) => (
                <span key={i} className="badge" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '0.5rem 1rem' }}>
                  ✓ {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Key Stats & Jobs */}
        <div style={{ flex: '1 1 300px' }}>
          <div className="glass-card mb-8 p-6">
            <h3 className="mb-4">Company Overview</h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pb-3 border-b" style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="text-secondary flex items-center gap-2"><Users size={16}/> Company Size</span>
                <span className="font-semibold">{company.size}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b" style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="text-secondary flex items-center gap-2"><Briefcase size={16}/> Sector</span>
                <span className="font-semibold">{company.sector}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary flex items-center gap-2"><Globe size={16}/> Founded</span>
                <span className="font-semibold">{company.founded}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="mb-4 flex justify-between items-center">
              Open Positions
              <span className="badge badge-primary">{companyJobs.length}</span>
            </h3>
            
            <div className="flex flex-col gap-4">
              {companyJobs.length > 0 ? (
                companyJobs.map(job => (
                  <div key={job.id} className="p-4 rounded-md" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                    <h4 className="mb-1">{job.title}</h4>
                    <div className="flex gap-3 text-secondary text-sm mb-3" style={{ fontSize: '0.8rem' }}>
                      <span className="flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign size={12}/> {job.pay}</span>
                    </div>
                    <button className="btn btn-outline" style={{ width: '100%', padding: '0.4rem', fontSize: '0.8rem' }} onClick={() => job.url ? window.open(job.url, '_blank') : alert('Applied!')}>
                      Apply Now
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-secondary text-sm">No open positions currently available for this company.</p>
              )}
              
              {companyJobs.length > 0 && (
                <button onClick={() => navigate(`/jobs?search=${company.name}`)} className="btn btn-ghost mt-2">
                  View all {company.name} jobs
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
