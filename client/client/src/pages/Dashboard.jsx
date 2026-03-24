import { useAuthStore } from "../store/authStore";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";

export default function Dashboard() {
  const role = useAuthStore((state) => state.role);

  if (role === "student") {
    return <StudentDashboard />;
  }

  // Default to teacher dashboard
  return <TeacherDashboard />;
}
