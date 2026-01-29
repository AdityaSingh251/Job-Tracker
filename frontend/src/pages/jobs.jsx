import { useEffect, useState } from "react";
import { getJobs } from "../Api/Jobs";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await getJobs();
        setJobs(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h2>My Jobs</h2>
      {jobs.map((job) => (
        <p key={job._id}>{job.company}</p>
      ))}
    </div>
  );
};

export default Jobs;
