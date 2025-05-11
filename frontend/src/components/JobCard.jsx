const JobCard = ({ job, onApply }) => {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'left',
    backgroundColor: 'rgb(0, 35, 34)',
    color: 'rgb(227, 246, 234)'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    
    marginBottom: '10px'
  };

  const titleStyle = {
    fontSize: '30px',
    // fontWeight: 'bold',
    margin: '0'
  };

  const companyStyle = {
    color: 'rgb(148, 177, 159)',
    margin: '5px 0'
  };

  const detailStyle = {
    margin: '10px 0',
    color: 'rgb(109, 147, 123)'
  };

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: 'rgb(227, 246, 234)',
    color: 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>{job.role}</h3>
        <span>{job.posted}</span>
      </div>
      <p><strong>Company:</strong> {job.skills}</p>
      <p style={detailStyle}>{job.details}</p>
      <button onClick={onApply} style={buttonStyle}>
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;