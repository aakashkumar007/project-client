// src/lazyComponent/LazyResults.js
import React from "react";
import { Link } from "react-router-dom";

const LazyResults = ({ results }) => {
  return (
    <section className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Latest Results</h2>
      {results.length > 0 ? (
        results.slice(0, 10).map((result) => (
          <div key={result._id} className="border-b border-gray-300 py-4">
            <div className="flex justify-between items-start">
              <div className="w-3/4">
                <Link
                  to={`/result/${result._id}`}
                  className="text-2xl font-serif text-gray-800 hover:underline"
                >
                  {result.title}
                </Link>
              </div>
              <div className="text-right w-1/4">
                <p className="text-gray-500 text-sm">
                  {new Date(result.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-500 text-sm">Published by Aarti</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No results available at the moment.</p>
      )}
      <div className="mt-4">
        <Link
          to="/get-all-results"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View More Results
        </Link>
      </div>
    </section>
  );
};

export default LazyResults;
