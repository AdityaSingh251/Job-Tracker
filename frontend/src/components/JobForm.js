import React, { useState } from "react";
import API from "../Api/axios";

export default function JobForm({ refreshJobs }) {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/jobs", { companyName, role, status });
      setCompanyName("");
      setRole("");
      setStatus("Applied");
      refreshJobs();
    } catch (err) {
      alert("Error adding job");
    }
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Selected</option>
        <option>Rejected</option>
      </select>

      <button className="btn" type="submit">Add Job</button>
    </form>
  );
}
