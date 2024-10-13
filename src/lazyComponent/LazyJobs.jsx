import React from "react";
import { Link } from "react-router-dom";

const LazyJobs = ({ jobs }) => {

  console.log(jobs)
  // Flatten the jobs array and filter only valid job objects
  const flattenedJobs = jobs

  return (
    <section className="bg-white shadow-md rounded-lg p-6 flex flex-col h-full">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Latest Jobs</h2>
      {flattenedJobs.length > 0 ? (
        flattenedJobs.slice(0, 10).map(job => (
          <div key={job.id} className="border-b border-gray-300 py-4">
            <div className="flex justify-between items-start">
              <div className="w-3/4">
                <Link to={`/job/${job.id}`} className="text-2xl font-serif text-gray-800 hover:underline">
                  {job.title}
                </Link>
              </div>
              <div className="text-right w-1/4">
                <p className="text-gray-500 text-sm">
                  {new Date(job.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-500 text-sm">— by Prakash</p>
                <p className="text-gray-500 text-sm">in Latest Jobs</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No jobs available at the moment.</p>
      )}
      <div className="mt-4">
        <Link to="/get-all-jobs" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-105 transition-all duration-200">
          View More Jobs
        </Link>
      </div>
    </section>
  );
};

export default LazyJobs;
