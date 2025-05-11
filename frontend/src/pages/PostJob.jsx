// src/pages/PostJob.jsx

import React, { useState } from "react";
import { postJob } from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostJob() {
    const [jobData, setJobData] = useState({
        id: "",
        role: "",
        skills: "",
        details: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setJobData({
            ...jobData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { id, role, skills, details } = jobData;

        if (!id || !role || !skills || !details) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await postJob(jobData);
            if (response.status === 200) {
                toast.success("Job posted successfully!");
                setSubmitted(true);
                setJobData({
                    id: "",
                    role: "",
                    skills: "",
                    details: "",
                });
                setError("");
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong.");
            }
        }
    };

    return (
        <div className="auth-container">
            <h2>Post New Job</h2>
            {submitted ? (
                <p style={{ color: "var(--primary)" }}>Thank you for posting a job!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert error">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="id">Job ID</label>
                        <input
                            type="text"
                            name="id"
                            placeholder="Enter job ID"
                            value={jobData.id}
                            onChange={handleChange}
                            className="textar"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <input
                            type="text"
                            name="role"
                            placeholder="Enter job role"
                            value={jobData.role}
                            onChange={handleChange}
                            className="textar"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="skills">Company Name</label>
                        <input
                            type="text"
                            name="skills"
                            placeholder="Enter company name"
                            value={jobData.skills}
                            onChange={handleChange}
                            className="textar"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="details">Job Details</label>
                        <textarea
                            name="details"
                            placeholder="Enter job details"
                            rows="3"
                            value={jobData.details}
                            onChange={handleChange}
                            style={{
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid var(--border-color)",
                                backgroundColor: "rgb(73, 91, 86)",
                                color: "var(--text-light)",
                                resize: "vertical",
                            }}
                        />
                    </div>

                    <button type="submit" className="btn">
                        Post Job
                    </button>
                </form>
            )}
        </div>
    );
}
