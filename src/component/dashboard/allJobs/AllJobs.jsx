import React, { useEffect, useState, useTransition } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../Loader';

const AllJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPending, startTransition] = useTransition(); // useTransition hook for non-blocking updates
  const jobsPerPage = 10;
  const apiUrl = import.meta.env.VITE_REACT_API_URL;

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        // Fetch data for the current page
        const response = await fetch(`${apiUrl}/api/jobs/get-jobs?page=${currentPage}&limit=${jobsPerPage}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();

        const flattenedJobs = data.jobs;

console.log(flattenedJobs[0].createdAt)
        startTransition(() => {
          setJobs(flattenedJobs);
          setTotalPages(data.totalPages);
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [apiUrl, currentPage]);

  // Filter out invalid jobs (e.g., jobs without a valid id, title, or created_at)
  const validJobs = jobs;

  if (loading) {
    return <div className="text-center"><Loader/></div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error fetching data: {error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-4">
        <h1 className="font-light text-slate-700 text-2xl text-center mb-4 leading-tight" style={{ fontFamily: 'Merriweather' }}>
          All Jobs
        </h1>

        <section className="bg-white shadow-md rounded-lg p-4">
          {validJobs.length > 0 ? (
            validJobs.map((job) => (
              <div key={job._id} className="border-b border-gray-300 py-1 mb-2">
                <div className="flex justify-between items-center">
                  <Link
                    to={`/job/${job._id}`}
                    className="text-lg font-serif text-gray-800 hover:underline flex-grow text-center"
                    style={{ lineHeight: '1.1' }}
                  >
                    {job.title}
                  </Link>
                  <div className="text-right">
                    <p className="text-gray-500 text-xs">
                      {new Date(job.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-gray-500 text-xs">— by Aarti</p>
                    <p className="text-gray-500 text-xs">in Latest Jobs</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center min-h-screen">No valid jobs available at the moment.</p>
          )}

          {/* Pagination controls */}
          <div className="flex justify-between mt-4">
            <button
              className={`px-3 py-1 text-white rounded-md ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'}`}
              onClick={() => startTransition(() => setCurrentPage(currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p className="text-sm text-gray-700">Page {currentPage} of {totalPages}</p>
            <button
              className={`px-3 py-1 text-white rounded-md ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'}`}
              onClick={() => startTransition(() => setCurrentPage(currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AllJobsPage;
