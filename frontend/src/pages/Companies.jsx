import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Users, Building2, Briefcase, ExternalLink, Globe, Loader } from 'lucide-react';
import { MOCK_COMPANIES } from '../mockData';

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allCompanies, setAllCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:8080/api/companies');
        const data = await response.json();
        
        // Map the backend data to our UI structure
        const backendCompanies = data.map(company => ({
          id: company.id,
          name: company.name,
          location: company.location || 'Unknown',
          sector: company.sector || 'Technology',
          industry: company.industry || 'Digital',
          size: company.size || '50-200',
          founded: company.founded || 2010,
          openJobs: company.openJobs || 0,
          rating: company.ratings || 0,
          logo: company.logo,
          logoText: company.name.substring(0, 2).toUpperCase(),
          description: company.description || 'A growing company.'
        }));

        setAllCompanies(backendCompanies);
        setFilteredCompanies(backendCompanies);
      } catch (error) {
        console.error("Error fetching companies from backend:", error);
        setAllCompanies(MOCK_COMPANIES);
        setFilteredCompanies(MOCK_COMPANIES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, allCompanies]);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    if (!term) {
      setFilteredCompanies(allCompanies);
      return;
    }
    const filtered = allCompanies.filter(company => 
      company.name.toLowerCase().includes(term) ||
      company.sector.toLowerCase().includes(term) ||
      company.industry.toLowerCase().includes(term)
    );
    setFilteredCompanies(filtered);
  };

  const handleViewProfile = (companyId) => {
    navigate(`/companies/${companyId}`);
  };

  return (
    <div className="container py-8 fade-in">
      <div className="mb-10 text-center">
        <h2 className="stagger-1">Top Companies Hiring Now</h2>
        <p className="text-secondary mt-2 stagger-2">Discover great places to work and find your next employer.</p>
      </div>

      {/* Search Bar */}
      <div className="glass-card mb-8 stagger-3" style={{ padding: '1.5rem' }}>
        <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            <Search className="text-muted" size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search companies by name, sector, or industry..." 
              style={{ paddingLeft: '2.5rem', background: 'var(--bg-primary)' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" style={{ padding: '0 2rem' }} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* Company Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '2rem' 
      }}>
        {isLoading ? (
          <div className="glass-card text-center py-16 flex flex-col items-center justify-center" style={{ gridColumn: '1 / -1' }}>
            <Loader className="text-primary mb-4" size={32} style={{ animation: 'spin 2s linear infinite' }} />
            <h3>Discovering top companies...</h3>
            <p className="text-secondary mt-2">Analyzing live job market data.</p>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="glass-card text-center py-8" style={{ gridColumn: '1 / -1' }}>
            <h3>No companies found.</h3>
            <p className="text-secondary mt-2">Try adjusting your search terms.</p>
          </div>
        ) : (
          filteredCompanies.map((company, index) => (
            <div key={company.id} className="glass-card flex" style={{ flexDirection: 'column', animationDelay: `${index * 100}ms` }}>
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4 items-center">
                {/* Logo Placeholder */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  overflow: 'hidden'
                }}>
                  {company.logo ? (
                    <img src={company.logo} alt={company.name} style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'white' }} />
                  ) : (
                    company.logoText
                  )}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>{company.name}</h3>
                  <div className="flex items-center gap-1 text-secondary" style={{ fontSize: '0.875rem' }}>
                    <MapPin size={14} /> {company.location}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 flex gap-2" style={{ flexWrap: 'wrap' }}>
              <span className="badge badge-accent">{company.sector}</span>
              <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)' }}>
                ★ {company.rating}
              </span>
            </div>

            <div className="flex gap-4 mb-6" style={{ flexWrap: 'wrap', flex: 1 }}>
              <div className="flex items-center gap-2 text-secondary" style={{ fontSize: '0.875rem', width: '45%' }}>
                <Building2 size={16} className="text-muted" /> {company.industry}
              </div>
              <div className="flex items-center gap-2 text-secondary" style={{ fontSize: '0.875rem', width: '45%' }}>
                <Users size={16} className="text-muted" /> {company.size} emp.
              </div>
              <div className="flex items-center gap-2 text-secondary" style={{ fontSize: '0.875rem', width: '45%' }}>
                <Globe size={16} className="text-muted" /> Est. {company.founded}
              </div>
              <div className="flex items-center gap-2 text-primary" style={{ fontSize: '0.875rem', width: '45%', fontWeight: 500 }}>
                <Briefcase size={16} /> {company.openJobs} Open Jobs
              </div>
            </div>

            <div className="mt-auto pt-4 border-t" style={{ borderTop: '1px solid var(--border)' }}>
              <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => handleViewProfile(company.id)}>
                View Company Profile <ExternalLink size={16} />
              </button>
            </div>
            
          </div>
          ))
        )}
      </div>
    </div>
  );
}
