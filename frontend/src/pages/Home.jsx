import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Application Portal</h1>
          <h3>– Your Gateway to Career Success !</h3>
          <p className="hero-subtitle"><br></br>
            Discover amazing features that will transform your experience.
            Whether you're a fresh graduate, an experienced professional, 
            or an employer looking for the perfect hire, we provide the tools, 
            resources, and opportunities to make the right match.
          </p>
          <Link to="/signup" className="btn btn-success">
            Get Started
          </Link>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1604845152150-79d128ac8817?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Macbook Pro on table" 
            className="hero-img"
          />
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose us ?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Vast Job Listings</h3>
            <p>Browse thousands of job postings from reputable companies.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3> Fast & Easy Applications</h3>
            <p>Apply to jobs seamlessly with a few clicks.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Trusted</h3>
            <p>Your information is safe with us, and we ensure high-quality job postings.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <h2>Ready to Get Started?</h2>
        <Link to="/signup" className="btn btn-large btn-success">
          Create Your Free Account
        </Link>
      </section>
    </div>
  );
};

export default Home;