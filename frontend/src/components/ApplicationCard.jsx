const ApplicationCard = ({ application }) => {
  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'submitted':
        return 'status-submitted';
      case 'under review':
        return 'status-review';
      case 'rejected':
        return 'status-rejected';
      case 'accepted':
        return 'status-accepted';
      default:
        return '';
    }
  };

  return (
    <div className="application-card">
      <div className="application-header">
        <h4>{application.jobTitle}</h4>
        <span className="company">{application.company}</span>
      </div>
      <div className="application-details">
        <div className="detail-item">
          <span className="detail-label">Applied:</span>
          <span className="detail-value">{application.appliedDate}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Last Update:</span>
          <span className="detail-value">{application.lastUpdate}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Status:</span>
          <span className={`status-badge ${getStatusClass(application.status)}`}>
            {application.status}
          </span>
        </div>
      </div>
      <div className="application-actions">
        <button className="btn btn-small">View Details</button>
        <button className="btn btn-small btn-outline">Withdraw</button>
      </div>
    </div>
  );
};

export default ApplicationCard;