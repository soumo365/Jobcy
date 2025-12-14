import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "./AuthContext";

// Job interface
export interface Job {
  id: string;
  postedBy: string;
  title: string;
  category: string;
  companyName: string;
  location: {
    city: string;
    country: string;
    type: "remote" | "onsite" | "hybrid";
  };
  employmentType: "full-time" | "part-time" | "internship" | "contract";
  experienceLevel: "fresher" | "junior" | "mid" | "senior";
  salary: {
    min: number;
    max: number;
    currency: "INR" | "USD";
    visible: boolean;
  };
  description: string;
  skillsRequired: string[];
}

// Context type
interface JobContextType {
  jobs: Job[];
  myJobs: Job[];
  loading: boolean;
  refetchJobs: () => void;
}

const JobContext = createContext<JobContextType>({
  jobs: [],
  myJobs: [],
  loading: true,
  refetchJobs: () => {},
});

export const useJobs = () => useContext(JobContext);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const myJobs = jobs.filter((job) => job.postedBy === user?.uid);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "jobs"));
      const jobsList: Job[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Job, "id">),
      }));

      setJobs(jobsList);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <JobContext.Provider value={{ jobs, myJobs, loading, refetchJobs: fetchJobs }}>
      {children}
    </JobContext.Provider>
  );
};
