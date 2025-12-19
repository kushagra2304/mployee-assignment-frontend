import { useEffect, useState } from "react";
import { fetchJobs } from "../api/jobApi";
import type { Job } from "../types/Job";
import { JobList } from "../components/JobList";
import { JobDetails } from "../components/JobDetails";
import { SearchBar } from "../components/SearchBar";

const LIMIT = 20;

export const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [location, setLocation] = useState<string | undefined>(undefined);

  const loadJobs = async (opts?: { location?: string; page?: number }) => {
    try {
      setLoading(true);

      const currentPage = opts?.page ?? page;
      const currentLocation = opts?.location ?? location;

      const data = await fetchJobs({
        location: currentLocation,
        page: currentPage,
        limit: LIMIT,
      });

      const jobsArray: Job[] = Array.isArray(data)
        ? data
        : Array.isArray(data?.jobs)
        ? data.jobs
        : [];

      setJobs(jobsArray);
      setHasMore(jobsArray.length === LIMIT);
      setPage(currentPage);
      setLocation(currentLocation);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs({ page: 1 });
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full md:w-[420px] flex flex-col bg-white shadow-xl border-r border-slate-200">
        <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-2">Job Board</h1>
          <p className="text-indigo-100 text-sm">Find your next opportunity</p>
        </div>
        <div className="px-6 py-4 bg-white border-b border-slate-200">
          <SearchBar onSearch={(loc) => loadJobs({ location: loc, page: 1 })} />
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-600 font-medium">Loading jobs...</p>
              </div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-slate-600 font-semibold text-lg">No jobs available</p>
              <p className="text-slate-500 text-sm mt-1">Try adjusting your search filters</p>
            </div>
          ) : (
            <JobList jobs={jobs} onSelect={(job) => setSelectedJob(job)} />
          )}
        </div>
        <div className="sticky bottom-0 px-6 py-4 bg-white border-t border-slate-200 shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => loadJobs({ page: page - 1 })}
              disabled={page === 1 || loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 hover:border-indigo-400 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <span className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-lg border border-indigo-200">
              Page {page}
            </span>

            <button
              onClick={() => loadJobs({ page: page + 1 })}
              disabled={!hasMore || loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:from-indigo-600 disabled:to-purple-600"
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
        <JobDetails job={selectedJob} />
      </div>
    </div>
  );
};