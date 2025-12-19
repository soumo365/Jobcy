import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://iiwezipwwzrpuzdrljtg.supabase.co",
 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlpd2V6aXB3d3pycHV6ZHJsanRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODQyOTQsImV4cCI6MjA4MDQ2MDI5NH0.5hD8pP4WdQSus6-H6tYWg3kjSNzchG9c-3wRtpZ7nGQ"
);
