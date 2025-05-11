import axios from "axios";

const API_URL = "http://localhost:7800";

// Function to get the token from localStorage
const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found");
        // Optionally, you could redirect the user to login or show a message
        return null;
    }
    return token;
};

export function signIn(email, password) {
    return axios.post(`${API_URL}/signin`, { email, password }, { withCredentials: true });
}

export function signup(userData) {
    return axios.post(`${API_URL}/signup`, userData);
}

export const postJob = (data) => {
    const token = getAuthToken(); // Get the token using the helper function
    if (!token) {
        return Promise.reject(new Error("Authentication required"));
    }

    console.log("Token being sent:", token); // Log the token for debugging

    return axios.post(`${API_URL}/job-post`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
};

// Get all jobs from the backend API
export const getJobList = () => {
    return axios.get(`${API_URL}/job-get`);
};

export const getJobList1 = () => {
    return axios.get(`${API_URL}/job-get1`);
};

// Update a specific job
export const editJob = (jobId, updatedData) => {
    const token = getAuthToken(); // Get the token using the helper function
    if (!token) {
        return Promise.reject(new Error("Authentication required"));
    }

    return axios.put(`${API_URL}/job-edit/${jobId}`, updatedData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
};

// Delete a specific job
export const deleteJob = (jobId) => {
    const token = getAuthToken(); // Get the token using the helper function
    if (!token) {
        return Promise.reject(new Error("Authentication required"));
    }

    return axios.delete(`${API_URL}/job-delete/${jobId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// Logout user and clear the token from localStorage
export const logoutUser = () => {
    localStorage.removeItem("token"); // Clear the token from localStorage
    return axios.get(`${API_URL}/logout`, { withCredentials: true });
};
