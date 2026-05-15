import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, TrendingUp, Building, Users } from 'lucide-react';
import Footer from '../components/Footer';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="container slide-up">
      <section className="py-16 text-center">
        <div className="badge badge-primary mb-4 inline-flex stagger-1">
          ✨ Over 10,000+ Active Jobs
        </div>
        <h1 className="text-h1 stagger-2" style={{ marginBottom: '1.5rem' }}>
          Find Your <span className="text-gradient">Dream Job</span><br />
          Today
        </h1>
        <p className="text-body-lg stagger-3 mx-auto" style={{ maxWidth: '600px', marginBottom: '2.5rem' }}>
          Connect with top employers and discover opportunities that match your skills, experience, and aspirations.
        </p>
        
        <form onSubmit={handleSearch} className="glass-card stagger-4 mx-auto flex-responsive" style={{ maxWidth: '800px', gap: '1rem', padding: '1rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search className="text-muted" size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Job title, keywords, or company" 
              style={{ paddingLeft: '3rem', border: 'none', background: 'var(--bg-primary)' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full md:w-auto" style={{ padding: '0.75rem 2rem' }}>
            Search Jobs
          </button>
        </form>
      </section>

      <section className="py-8">
        <div className="flex items-center justify-between mb-8">
          <h2>Featured Categories</h2>
          <Link to="/jobs" className="btn btn-ghost">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {[
            { icon: <TrendingUp size={24} />, title: "Technology", count: "2,450" },
            { icon: <Building size={24} />, title: "Finance", count: "1,200" },
            { icon: <Users size={24} />, title: "Human Resources", count: "850" },
            { icon: <Briefcase size={24} />, title: "Marketing", count: "1,600" },
          ].map((cat, i) => (
            <div key={i} className="glass-card" style={{ textAlign: 'center', transitionDelay: `${i * 100}ms` }}>
              <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: 'var(--radius-full)', background: 'var(--primary-light)', color: 'var(--primary)', marginBottom: '1rem' }}>
                {cat.icon}
              </div>
              <h3 className="mb-2">{cat.title}</h3>
              <p className="text-secondary">{cat.count} open positions</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Temporary Briefcase icon to fix missing import
function Briefcase(props) {
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
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
