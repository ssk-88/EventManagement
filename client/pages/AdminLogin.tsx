import { Link } from "react-router-dom";
import { LogIn, ArrowRight, Sparkles } from "lucide-react";
import PlaceholderPage from "./PlaceholderPage";

export default function AdminLogin() {
  return (
    <PlaceholderPage
      title="Admin Portal Login"
      description="Secure authentication for event organizers and administrators. Full login interface will be implemented with JWT authentication and role-based access control."
      icon={<LogIn className="w-12 h-12 text-primary-600 dark:text-primary-400" />}
    />
  );
}
