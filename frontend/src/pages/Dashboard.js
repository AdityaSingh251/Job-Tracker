import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const API = "https://job-tracker-backend-lovatbackend.vercel.app/api";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchJobs();
    }
    // eslint-disable-next-line
  }, []);

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API}/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      alert("Error fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  // Add Job
  const addJob = async (e) => {
    e.preventDefault();
    if (!company || !role) return alert("Enter Company and Role");

    try {
      await axios.post(
        `${API}/jobs`,
        { company, role, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCompany("");
      setRole("");
      setStatus("Applied");
      fetchJobs();
    } catch {
      alert("Error adding job");
    }
  };

  // Update Status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `${API}/jobs/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchJobs();
    } catch {
      alert("Error updating status");
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await axios.delete(`${API}/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchJobs();
    } catch {
      alert("Error deleting job");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Search + Filter
  const filteredJobs = jobs.filter((job) => {
    const text =
      (job.company || "").toLowerCase() +
      (job.role || "").toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());
    const matchesFilter =
      filterStatus === "All" ? true : job.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="dash-container">
      {/* HEADER */}
      <div className="dash-header">
        <h2>📊 Job Tracker Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* ADD JOB */}
      <div className="dash-card">
        <h3>Add New Job</h3>

        <form className="job-form" onSubmit={addJob}>
          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            type="text"
            placeholder="Role / Position"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>

          <button className="add-btn">+ Add Job</button>
        </form>
      </div>

      {/* SEARCH + FILTER */}
      <div className="dash-card">
        <h3>Search & Filter</h3>

        <div className="filter-row">
          <input
            type="text"
            placeholder="Search by company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="dash-card">
        <h3>All Jobs ({filteredJobs.length})</h3>

        {loading ? (
          <p>Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="empty-text">No jobs found.</p>
        ) : (
          <table className="job-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.company}</td>
                  <td>{job.role}</td>

                  <td>
                    <span
                      className={`status-badge ${job.status.toLowerCase()}`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td>
                    <select
                      value={job.status}
                      onChange={(e) =>
                        updateStatus(job._id, e.target.value)
                      }
                    >
                      <option>Applied</option>
                      <option>Interview</option>
                      <option>Selected</option>
                      <option>Rejected</option>
                    </select>
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteJob(job._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
