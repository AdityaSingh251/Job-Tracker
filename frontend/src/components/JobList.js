import React from "react";
import JobCard from "./JobCard";

export default function JobList({ jobs, onDelete }) {
  return (
    <div className="job-list">
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map((job) => <JobCard key={job._id} job={job} onDelete={onDelete} />)
      )}
    </div>
  );
}
