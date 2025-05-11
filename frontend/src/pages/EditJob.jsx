import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getJobList1, editJob, deleteJob } from "../services/userService"; // Adjust path if needed
import { Alert } from "react-bootstrap";



const EditJob = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [updatedJob, setUpdatedJob] = useState({ role: '', skills: '', details: '' });

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await getJobList1();
                if (response.status === 200) {
                    setJobs(response.data);
                } else {
                    toast.error("Error fetching job data.");
                }
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong while fetching job data.");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleEdit = (jobId) => {
        const job = jobs.find((j) => j.id === jobId);
        setSelectedJob(job);
        setUpdatedJob({ role: job.role, skills: job.skills, details: job.details });
        setShowModal(true);
    };

    const handleDelete = async (jobId) => {
        try {
            const response = await deleteJob(jobId);
            if (response.status === 200) {
                toast.success(`Job with ID: ${jobId} deleted.`);
                setJobs(jobs.filter((job) => job.id !== jobId));
            } else {
                toast.error("Error deleting job.");
            }
        } catch (error) {
            toast.error("Something went wrong while deleting the job.");
        }
    };

    const handleCloseModal = () => setShowModal(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedJob((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitChanges = async () => {
        try {
            const response = await editJob(selectedJob.id, updatedJob);
            if (response.status === 200) {
                toast.success(`Job updated: ${selectedJob?.role}`);
                setJobs(jobs.map((job) => job.id === selectedJob.id ? { ...job, ...updatedJob } : job));
                setShowModal(false);
            } else {
                toast.error("Error updating job.");
            }
        } catch (error) {
            toast.error("Something went wrong while updating the job.");
        }
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Alert variant="success" className="text-center">
                <h3>Edit or Delete Jobs</h3>
            </Alert>
            <Table striped bordered hover responsive className="align-middle text-center">
                <thead className="table-white">
                    <tr>
                        <th>ID</th>
                        <th>Role</th>
                        <th>Company Name</th>
                        <th>Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <tr key={job.id}>
                                <td>{job.id}</td>
                                <td className="text-truncate" title={job.role} style={{ maxWidth: '150px' }}>{job.role}</td>
                                <td className="text-truncate" title={job.skills} style={{ maxWidth: '200px' }}>{job.skills}</td>
                                <td className="text-truncate" title={job.details} style={{ maxWidth: '250px' }}>{job.details}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => handleEdit(job.id)}
                                        className="me-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(job.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center text-muted">
                                No jobs available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>




            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Job: {selectedJob?.role}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                type="text"
                                name="role"
                                value={updatedJob.role}
                                onChange={handleInputChange}
                                placeholder="Enter job role"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="skills"
                                value={updatedJob.skills}
                                onChange={handleInputChange}
                                placeholder="Enter the name of company"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Details</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="details"
                                rows={3}
                                value={updatedJob.details}
                                onChange={handleInputChange}
                                placeholder="Enter job details"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default EditJob;
