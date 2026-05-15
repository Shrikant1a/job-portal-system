import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, Briefcase, DollarSign, ExternalLink, Loader, AlertCircle } from 'lucide-react';

export default function LiveJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('React Developer');

  const fetchLiveJobs = async (query = searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      // Calling our local API Server which proxies to RapidAPI
      const response = await axios.get(`http://127.0.0.1:8080/api/external-jobs?query=${encodeURIComponent(query)}`);
      
      // Remotive uses 'jobs' key, JSearch used 'data'
      const jobsData = response.data.jobs || response.data.data || [];
      
      // Map Remotive fields to our UI fields
      const normalizedJobs = jobsData.map(job => ({
        job_id: job.id,
        job_title: job.title,
        employer_name: job.company_name,
        employer_logo: job.company_logo,
        job_apply_link: job.url,
        job_city: job.candidate_required_location,
        job_country: '',
        job_employment_type: job.job_type,
        job_min_salary: job.salary,
        job_description: job.description
      }));
      
      setJobs(normalizedJobs);
    } catch (err) {
      console.error('Error fetching live jobs:', err);
      const message = err.response?.data?.message || err.response?.data?.error || 'Failed to connect to the job server.';
      setError(message + " (Check your RapidAPI subscription and key)");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLiveJobs();
  };

  return (
    <div className="container py-8 fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-gradient">Live Global Opportunities</h2>
        <p className="text-secondary mt-2">Real-time job listings from across the web via JSearch API.</p>
      </div>

      <div className="glass-card mb-8 p-4">
        <form onSubmit={handleSearch} className="flex-responsive gap-4">
          <div style={{ flex: 1, position: 'relative' }}>
            <Search className="text-muted" size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search e.g. 'Software Engineer', 'Remote Marketing'..." 
              style={{ paddingLeft: '2.5rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Searching...' : 'Find Live Jobs'}
          </button>
        </form>
      </div>

      {error && (
        <div className="glass-card mb-8 p-4 flex items-center gap-3" style={{ borderLeft: '4px solid #ff4d4d' }}>
          <AlertCircle className="text-danger" size={24} />
          <div>
            <h4 style={{ color: '#ff4d4d' }}>Error</h4>
            <p className="text-secondary text-sm">{error}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader className="text-primary animate-spin mb-4" size={40} />
          <h3>Fetching live listings...</h3>
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <div key={job.job_id || index} className="glass-card p-6 slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="flex gap-4 items-start">
                    {job.employer_logo ? (
                      <img src={job.employer_logo} alt={job.employer_name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'contain', background: 'white' }} />
                    ) : (
                      <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Briefcase className="text-primary" size={24} />
                      </div>
                    )}
                    <div>
                      <h3 className="mb-1">{job.job_title}</h3>
                      <p className="text-primary font-medium">{job.employer_name}</p>
                    </div>
                  </div>
                  <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer" className="btn btn-outline flex items-center gap-2">
                    Apply Now <ExternalLink size={16} />
                  </a>
                </div>

                <div className="flex gap-6 mt-4 flex-wrap text-secondary text-sm">
                  <span className="flex items-center gap-1"><MapPin size={16} /> {job.job_city ? `${job.job_city}, ${job.job_country}` : (job.job_is_remote ? 'Remote' : 'Location not specified')}</span>
                  <span className="flex items-center gap-1"><Briefcase size={16} /> {job.job_employment_type || 'Full-time'}</span>
                  <span className="flex items-center gap-1"><DollarSign size={16} /> {job.job_min_salary ? `${job.job_min_salary} - ${job.job_max_salary} ${job.job_salary_currency}` : 'Salary not specified'}</span>
                </div>

                <div className="mt-4">
                   <p className="text-secondary text-sm line-clamp-2">
                     {job.job_description ? job.job_description.substring(0, 200) + '...' : 'No description available.'}
                   </p>
                </div>
              </div>
            ))
          ) : (
            !loading && <div className="text-center py-10"><h3>No live jobs found. Try a different search.</h3></div>
          )}
        </div>
      )}
    </div>
  );
}
