import axios from "axios";
import type { Job } from "../types/Job";

type FetchJobsParams = {
  location?: string;
  page?: number;
  limit?: number;
};

export const fetchJobs = async ({
  location,
  page = 1,
  limit = 20,
}: FetchJobsParams): Promise<{ jobs: Job[]; count: number }> => {
  const res = await axios.get("http://localhost:5000/api/jobs", {
    params: {
      location,
      page,
      limit,
    },
  });

  return res.data;
};

export const fetchJobById = async (id: string) => {
  const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
  return res.data;
};

