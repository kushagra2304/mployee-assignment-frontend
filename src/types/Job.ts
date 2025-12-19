export interface Job {
  _id: string;
  jobIdNumeric?: string;
  title: string;
  company?: string;
  location: string;
  job_link?: string;
  employment_type?: string;
  experience?: string;
  source?: string;
  country?: string;
  postedDateTime?: string;
  companyImageUrl?: string;
  min_exp?: number;
  max_exp?: number;
}
