import { Link } from "react-router-dom";
import { ArrowLeft, Zap } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function PlaceholderPage({
  title,
  description,
  icon,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <span className="text-slate-600 dark:text-slate-400">
            Page Builder
          </span>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center mx-auto mb-6">
            {icon}
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
            {description}
          </p>
          <div className="bg-gradient-to-r from-primary-100 to-primary-50 dark:from-primary-900/20 dark:to-primary-800/10 border border-primary-200 dark:border-primary-800 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
              <div className="text-left">
                <p className="font-semibold text-primary-900 dark:text-primary-300 mb-1">
                  Ready to build this page?
                </p>
                <p className="text-sm text-primary-800/70 dark:text-primary-300/70">
                  Continue prompting to have this section filled in with full
                  functionality.
                </p>
              </div>
            </div>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold hover:shadow-lg transition-all hover:-translate-y-1"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
