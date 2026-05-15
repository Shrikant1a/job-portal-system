import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Briefcase, DollarSign, Clock, Filter } from 'lucide-react';
import { MOCK_JOBS } from '../mockData';
import { Loader } from 'lucide-react';

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  
  // State for real API data
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:8080/api/jobs');
        const data = await response.json();
        
        // Map the backend data to our UI structure
        const backendJobs = data.map(job => ({
          id: job.id,
          title: job.jobTitle,
          company: job.company?.name || 'Unknown Company',
          location: job.location || 'Remote',
          type: job.fullOrPartTime || 'Full-time',
          schedule: job.job_schedules?.join(', ') || 'Regular',
          pay: job.pay ? `${job.pay.from} - ${job.pay.to}` : 'Competitive',
          postedAt: job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'Just now',
          tags: job.job_types || [],
          logo: job.company?.logo || null
        }));

        setAllJobs(backendJobs);
        setFilteredJobs(backendJobs);
      } catch (error) {
        console.error("Error fetching jobs from backend:", error);
        setAllJobs(MOCK_JOBS);
        setFilteredJobs(MOCK_JOBS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Run search filtering whenever allJobs or searchParams changes
  useEffect(() => {
    handleSearch();
  }, [searchParams, allJobs]);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    if (!term) {
      setFilteredJobs(allJobs);
      return;
    }
    const filtered = allJobs.filter(job => 
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      (job.tags && job.tags.some(tag => tag.toLowerCase().includes(term)))
    );
    setFilteredJobs(filtered);
  };

  const handleApply = (jobTitle, jobUrl) => {
    if (jobUrl) {
      window.open(jobUrl, '_blank');
    } else {
      alert(`Application submitted successfully for ${jobTitle}!`);
    }
  };
  
  return (
    <div className="container py-8 fade-in">
      <div className="mb-8 text-center">
        <h2>Find Your Next Opportunity</h2>
        <p className="text-secondary mt-2">Discover thousands of job openings from top companies.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="glass-card mb-8" style={{ padding: '1rem' }}>
        <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <Search className="text-muted" size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search by job title, skill, or company..." 
              style={{ paddingLeft: '2.5rem', background: 'var(--bg-primary)' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ flex: '1 1 200px', position: 'relative' }}>
            <MapPin className="text-muted" size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="City, state, or remote" 
              style={{ paddingLeft: '2.5rem', background: 'var(--bg-primary)' }}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSearch}>
            Find Jobs
          </button>
        </div>
      </div>

      <div className="jobs-layout" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Sidebar Filters */}
        <div className="glass-card jobs-sidebar" style={{ flex: '0 0 250px', position: 'sticky', top: '100px' }}>
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} className="text-primary" />
            <h3 style={{ fontSize: '1.1rem' }}>Filters</h3>
          </div>
          
          <div className="mb-6">
            <h4 className="form-label mb-3">Job Type</h4>
            {['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Fresher'].map(type => (
              <div key={type} className="flex items-center gap-2 mb-2">
                <input type="checkbox" id={`type-${type}`} />
                <label htmlFor={`type-${type}`} className="text-secondary" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>{type}</label>
              </div>
            ))}
          </div>

          <div>
            <h4 className="form-label mb-3">Schedule</h4>
            {['Day shift', 'Night shift', 'Flexible shift', 'Remote'].map(schedule => (
              <div key={schedule} className="flex items-center gap-2 mb-2">
                <input type="checkbox" id={`sch-${schedule}`} />
                <label htmlFor={`sch-${schedule}`} className="text-secondary" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>{schedule}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {isLoading ? (
            <div className="glass-card text-center py-16 flex flex-col items-center justify-center">
              <Loader className="text-primary mb-4" size={32} style={{ animation: 'spin 2s linear infinite' }} />
              <h3>Fetching real jobs...</h3>
              <p className="text-secondary mt-2">Connecting to live job boards.</p>
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="glass-card text-center py-8">
              <h3>No jobs found matching your criteria.</h3>
              <p className="text-secondary mt-2">Try adjusting your search terms or filters.</p>
            </div>
          ) : (
            filteredJobs.map((job, index) => (
              <div key={job.id} className="glass-card" style={{ padding: '1.5rem', animationDelay: `${index * 100}ms` }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4 items-center">
                    {job.logo && (
                      <img src={job.logo} alt={job.company} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'contain', background: 'white' }} />
                    )}
                    <div>
                      <h3 className="mb-1" style={{ fontSize: '1.25rem' }}>{job.title}</h3>
                      <div className="text-primary" style={{ fontWeight: 500 }}>{job.company}</div>
                    </div>
                  </div>
                  <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }} onClick={() => handleApply(job.title, job.url)}>Apply</button>
                </div>

              <div className="flex gap-4 mb-4" style={{ flexWrap: 'wrap' }}>
                <div className="flex items-center gap-1 text-secondary" style={{ fontSize: '0.875rem' }}>
                  <MapPin size={16} /> {job.location}
                </div>
                <div className="flex items-center gap-1 text-secondary" style={{ fontSize: '0.875rem' }}>
                  <Briefcase size={16} /> {job.type}
                </div>
                <div className="flex items-center gap-1 text-secondary" style={{ fontSize: '0.875rem' }}>
                  <DollarSign size={16} /> {job.pay}
                </div>
                <div className="flex items-center gap-1 text-secondary" style={{ fontSize: '0.875rem' }}>
                  <Clock size={16} /> {job.schedule}
                </div>
              </div>

              <div className="flex gap-2">
                {job.tags.map(tag => (
                  <span key={tag} className="badge badge-primary">{tag}</span>
                ))}
              </div>
              
              <div className="text-muted mt-4" style={{ fontSize: '0.75rem', textAlign: 'right' }}>
                Posted {job.postedAt}
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
