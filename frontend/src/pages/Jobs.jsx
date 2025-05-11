import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { getJobList } from '../services/userService';
import { Container, Modal, Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicant, setApplicant] = useState({ name: '', email: '', cover: '' });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobList();
        if (response.status === 200) {
          setJobs(response.data);
        } else {
          toast.error('Failed to load jobs');
        }
      } catch (error) {
        toast.error('Error fetching jobs');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setApplicant({ name: '', email: '', cover: '' });
  };

  const handleInputChange = (e) => {
    setApplicant({ ...applicant, [e.target.name]: e.target.value });
  };

  const handleSubmitApplication = () => {
    toast.success(`Applied for: ${selectedJob?.role}`);
    // Submit logic goes here
    handleCloseModal();
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center'
  };

  const jobsListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={jobsListStyle}>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onApply={() => handleApply(job.id)} />
        ))}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for {selectedJob?.role}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" value={applicant.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" value={applicant.email} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formCoverLetter">
              <Form.Label>Cover Letter</Form.Label>
              <Form.Control
                name="cover"
                as="textarea"
                rows={3}
                value={applicant.cover}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmitApplication}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Jobs;
