import React, { useEffect, useState, Suspense, lazy, startTransition } from "react";
import Loader from "../../component/Loader";

const LazyJobs = lazy(() => import('../../lazyComponent/LazyJobs'));
const LazyResults = lazy(() => import('../../lazyComponent/LazyResults'));
const LazyAdmitCards = lazy(() => import('../../lazyComponent/LazyAdmitCards'));

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [results, setResults] = useState([]);
  const [admitCards, setAdmitCards] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');

      try {
        // Fetch jobs, results, and admit cards simultaneously
        const [jobsResponse, resultsResponse, admitCardsResponse] = await Promise.all([
          fetch(`${apiUrl}/api/jobs/get-jobs`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
          }),
          fetch(`${apiUrl}/api/result/get-results`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
          }),
          fetch(`${apiUrl}/api/admit-card/get-admit-cards`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
          }),
        ]);

        

        if (!jobsResponse.ok || !resultsResponse.ok || !admitCardsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        // Parse JSON responses
        const [jobsData, resultsData, admitCardsData] = await Promise.all([
          jobsResponse.json(),
          resultsResponse.json(),
          admitCardsResponse.json(),
        ]);

        startTransition(() => {
          setJobs(jobsData.jobs || []);
          setResults(resultsData.results || []);
          setAdmitCards(admitCardsData || []);
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) {
    return <div className="text-center py-4 min-h-screen"><Loader/></div>;
  }

  if (error) {
    return <div className="text-center py-4">Error fetching data: {error}</div>;
  }

  return (
    <div className="bg-gray-50 ">
      <main className="container mx-auto py-8">
        <h1 className="font-thin text-slate-700 text-4xl text-center mb-8 leading-tight" style={{ fontFamily: "Merriweather" }}>
          Latest Sarkari Naukari Updates:
        </h1>
        <h2 className="text-center font-bold text-slate-700 leading-tight mb-20 font-mono">
          Your Gateway To Success
        </h2>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pass fetched data as props */}
          <Suspense fallback={<div className="text-">Loading ...</div>}>
            <LazyJobs jobs={jobs} />
          </Suspense>
          <Suspense fallback={<div>Loading ...</div>}>
            <LazyResults results={results} />
          </Suspense>
          <Suspense fallback={<div><Loader/></div>}>
            <LazyAdmitCards admitCards={admitCards} />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
