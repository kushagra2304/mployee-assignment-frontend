import type { Job } from "../types/Job";
import { useState } from "react";

type Props = {
  jobs: Job[];
  onSelect: (job: Job) => void;
};

export const JobList = ({ jobs, onSelect }: Props) => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500 font-medium">No jobs found</p>
      </div>
    );
  }

  const handleSelect = (job: Job) => {
    setSelectedJobId(job._id.toString());
    onSelect(job);
  };

  return (
    <ul className="space-y-3">
      {jobs.map((job) => {
        const isSelected = selectedJobId === job._id.toString();
        
        return (
          <li
            key={job._id.toString()}
            onClick={() => handleSelect(job)}
            className={`group cursor-pointer p-5 border-2 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
              isSelected
                ? "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-500 shadow-md"
                : "bg-white border-slate-200 hover:border-indigo-400"
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className={`font-bold text-lg leading-tight transition-colors line-clamp-2 ${
                isSelected
                  ? "text-indigo-700"
                  : "text-slate-800 group-hover:text-indigo-600"
              }`}>
                {job.title}
              </h3>
              <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                isSelected
                  ? "bg-indigo-200"
                  : "bg-indigo-50 group-hover:bg-indigo-100"
              }`}>
                <svg
                  className="w-4 h-4 text-indigo-600 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-1.5">
              {job.company && (
                <div className="flex items-center gap-2 text-slate-600">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-sm font-medium">{job.company}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-slate-600">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium">{job.location}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};