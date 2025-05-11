import { useState } from 'react';
import ApplicationCard from '../components/ApplicationCard';

const Dashboard = () => {
  // Mock user data
  const [user] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: 'candidate'
  });

  // Mock applications data
  const [applications] = useState([
    { 
      id: 1, 
      jobId: 1, 
      jobTitle: 'Frontend Developer', 
      company: 'Tech Corp',
      status: 'Submitted', 
      appliedDate: '2023-05-01',
      lastUpdate: '2023-05-02'
    },
    { 
      id: 2, 
      jobId: 2, 
      jobTitle: 'Backend Developer', 
      company: 'Data Systems',
      status: 'Under Review', 
      appliedDate: '2023-05-05',
      lastUpdate: '2023-05-07'
    },
    { 
      id: 3, 
      jobId: 3, 
      jobTitle: 'UX Designer', 
      company: 'Creative Solutions',
      status: 'Rejected', 
      appliedDate: '2023-04-20',
      lastUpdate: '2023-04-25'
    }
  ]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome back, {user.firstName}!</h2>
        <p>Here's your application status and profile information</p>
      </div>
      
      <div className="dashboard-section">
        <h3>Your Applications</h3>
        {applications.length > 0 ? (
          <div className="applications-list">
            {applications.map(app => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        ) : (
          <div className="no-applications">
            <p>You haven't applied to any jobs yet.</p>
            <button className="btn">Browse Jobs</button>
          </div>
        )}
      </div>

      <div className="dashboard-section">
        <h3>Your Profile</h3>
        <div className="profile-card">
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{user.firstName} {user.lastName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Account Type:</span>
              <span className="info-value">
                {user.role === 'candidate' ? 'Job Seeker' : 'Employer'}
              </span>
            </div>
          </div>
          <div className="profile-actions">
            <button className="btn">Edit Profile</button>
            <button className="btn btn-outline">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;