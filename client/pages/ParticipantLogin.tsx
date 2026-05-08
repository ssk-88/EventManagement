import { LogIn } from "lucide-react";
import PlaceholderPage from "./PlaceholderPage";

export default function ParticipantLogin() {
  return (
    <PlaceholderPage
      title="Student Portal Login"
      description="Secure login for students and participants. Register for events, manage teams, and track your fest experience with full authentication and profile management."
      icon={<LogIn className="w-12 h-12 text-secondary-600 dark:text-secondary-400" />}
    />
  );
}
