import React from "react";

export default function JobCard({ job, onDelete }) {
  return (
    <div className="job-card">
      <h3>{job.companyName}</h3>
      <p><b>Role:</b> {job.role}</p>
      <p><b>Status:</b> {job.status}</p>

      <button className="btn delete" onClick={() => onDelete(job._id)}>
        Delete
      </button>
    </div>
  );
}
