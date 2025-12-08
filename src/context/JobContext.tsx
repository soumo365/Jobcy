import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config"; // Adjust path if needed

// Job interface
export interface Job {
  id: string;
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
  loading: boolean;
  refetchJobs: () => void;
}

// Create context
const JobContext = createContext<JobContextType>({
  jobs: [],
  loading: true,
  refetchJobs: () => {},
});

export const useJobs = () => useContext(JobContext);

// Provider component
export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    console.log("Fetching jobs from Firestore...");
    setLoading(true);
    try {
      const jobsCollection = collection(db, "jobs"); // Make sure your collection name is correct
      const snapshot = await getDocs(jobsCollection);
       console.log(snapshot);
      const jobsList: Job[] = [];
     
      snapshot.forEach((doc) => jobsList.push(doc.data() as Job));

      console.log("Jobs fetched:", jobsList.length);
      setJobs(jobsList);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false); // Ensure loading stops even if error occurs
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <JobContext.Provider value={{ jobs, loading, refetchJobs: fetchJobs }}>
      {children}
    </JobContext.Provider>
  );
};
