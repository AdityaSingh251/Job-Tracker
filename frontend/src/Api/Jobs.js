import API from "./axios";

export const getJobs = () => API.get("/jobs");

export const addJob = (jobData) =>
  API.post("/jobs", jobData);

export const updateJob = (id, jobData) =>
  API.put(`/jobs/${id}`, jobData);

export const deleteJob = (id) =>
  API.delete(`/jobs/${id}`);
