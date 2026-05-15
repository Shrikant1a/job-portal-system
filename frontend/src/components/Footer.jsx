import { Link } from 'react-router-dom';
import { Briefcase, Globe, Send, Users, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-card" style={{ marginTop: '4rem', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', padding: '3rem 1rem 2rem', borderBottom: 'none' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <Link to="/" className="nav-brand mb-4" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase color="var(--primary)" size={28} />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Hire<span className="text-gradient">Nova</span></span>
            </Link>
            <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              Connecting talented professionals with world-class opportunities. Discover your next career move with our premium job matching platform.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-secondary hover:text-primary transition-all"><Globe size={20} /></a>
              <a href="#" className="text-secondary hover:text-primary transition-all"><Send size={20} /></a>
              <a href="#" className="text-secondary hover:text-primary transition-all"><Users size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><Link to="/jobs" className="text-secondary hover:text-primary transition-all">Find Jobs</Link></li>
              <li><Link to="/companies" className="text-secondary hover:text-primary transition-all">Browse Companies</Link></li>
              <li><Link to="/live-jobs" className="text-secondary hover:text-primary transition-all">Live Global Jobs</Link></li>
              <li><Link to="/profile" className="text-secondary hover:text-primary transition-all">User Profile</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><a href="#" className="text-secondary hover:text-primary transition-all">Help Center</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-all">Terms of Service</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-all">Privacy Policy</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-all">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Contact</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li className="flex items-center gap-2 text-secondary"><Mail size={16} /> support@hirenova.com</li>
              <li className="flex items-center gap-2 text-secondary"><Phone size={16} /> +91 88056 84102</li>
              <li className="flex items-center gap-2 text-secondary"><MapPin size={16} /> Pune , India</li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', textAlign: 'center' }}>
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>
            © 2026 HireNova. Built with ❤️ for professionals worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
