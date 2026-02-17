import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  


  const navigate = useNavigate();
  

  // ✅ Fetch jobs
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      // ✅ If no token -> redirect
      if (!token) {
        navigate("/");
        return;
      }

      const res = await axios.get("https://job-tracker-backend-lovatbackend.vercel.app/api/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

     setJobs(Array.isArray(res.data) ? res.data : []);

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error fetching jobs");
    }
  };

  // ✅ On page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  // ✅ Add Job
  const addJob = async (e) => {
    e.preventDefault();

    if (!company || !role) {
      alert("Please enter Company and Role");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      await axios.post(
        "https://job-tracker-backend-lovatbackend.vercel.app/api/jobs",
        { company, role, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCompany("");
      setRole("");
      setStatus("Applied");
      fetchJobs();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error adding job");
    }
  };

  // ✅ Update Job Status
  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      await axios.put(
        `http://localhost:5000/api/jobs/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchJobs();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error updating status");
    }
  };

  // ✅ Delete Job
  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure to delete this job?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      await axios.delete(`https://job-tracker-backend-lovatbackend.vercel.app/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchJobs();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error deleting job");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ✅ Search + Filter (safe)
  const filteredJobs = jobs.filter((job) => {
    const companyText = (job.company || "").toLowerCase();
    const roleText = (job.role || "").toLowerCase();

    const matchesSearch =
      companyText.includes(search.toLowerCase()) ||
      roleText.includes(search.toLowerCase());

    const matchesFilter =
      filterStatus === "All" ? true : job.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

 return (
  <div className="app-container">
    <div className="window-header">
      <div className="circle red"></div>
      <div className="circle yellow"></div>
      <div className="circle green"></div>
      <span className="window-title">Job Tracker</span>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>

    <div className="main-layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Dashboard</h2>
        <p>Total Jobs</p>
        <div className="stats-number">{jobs.length}</div>
      </div>

      {/* Main Content */}
      <div className="content">

        {/* Add Job */}
        <div className="card">
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

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Applied</option>
              <option>Interview</option>
              <option>Selected</option>
              <option>Rejected</option>
            </select>

            <button className="primary-btn" type="submit">
              + Add Job
            </button>
          </form>
        </div>

        {/* Search & Filter */}
        <div className="card">
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
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Job Table */}
        <div className="card">
          <h3>All Jobs ({filteredJobs.length})</h3>

          {filteredJobs.length === 0 ? (
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
                      <span className={`status-badge ${job.status}`}>
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
    </div>
  </div>
);
