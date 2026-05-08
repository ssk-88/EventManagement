import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  Trophy,
  Zap,
  CheckCircle2,
  ArrowRight,
  Star,
  Sparkles,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white">
              FestHub
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/participant/login"
              className="px-6 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Student Login
            </Link>
            <Link
              to="/admin/login"
              className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary-500/30 transition-all"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Animated background elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-gradient-to-br from-secondary-400/20 to-primary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                <Star className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                  Next-Gen Fest Management
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                Manage Your College Fest{" "}
                <span className="bg-gradient-to-r from-primary-500 via-purple-500 to-accent-500 bg-clip-text text-transparent">
                  Effortlessly
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                Transform your college fest management from chaotic WhatsApp
                groups and Google Forms into a powerful, centralized digital
                platform with real-time updates and seamless team coordination.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/participant/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold hover:shadow-xl hover:shadow-primary-500/30 transition-all hover:-translate-y-1"
              >
                Join as Student
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/admin/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Organize Events
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    10K+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Active Users
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary-100 to-secondary-50 dark:from-secondary-900/30 dark:to-secondary-800/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    500+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Events Managed
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative z-10 bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-900/80 dark:to-slate-800/60 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 p-8 shadow-2xl">
              <div className="space-y-6">
                {[
                  { icon: Calendar, label: "Create Events", color: "primary" },
                  { icon: Users, label: "Manage Teams", color: "secondary" },
                  { icon: Trophy, label: "Live Leaderboard", color: "accent" },
                  { icon: Zap, label: "Real-time Updates", color: "primary" },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 group hover:shadow-lg transition-all"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-50 dark:from-${feature.color}-900/30 dark:to-${feature.color}-800/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon
                        className={`w-6 h-6 text-${feature.color}-600 dark:text-${feature.color}-400`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {feature.label}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Built for your needs
                      </p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl blur-2xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50 border-y border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Powerful Features for Everyone
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Everything you need to run smooth, organized, and engaging college
              fests
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Calendar,
                title: "Event Management",
                description:
                  "Create, edit, and organize events with custom rules, venues, and schedules",
                color: "primary",
              },
              {
                icon: Users,
                title: "Team System",
                description:
                  "Students can create teams or join via invite codes with ease",
                color: "secondary",
              },
              {
                icon: Trophy,
                title: "Live Leaderboard",
                description:
                  "Real-time score updates and rankings visible to all participants",
                color: "accent",
              },
              {
                icon: Zap,
                title: "Announcements",
                description:
                  "Send instant notifications and updates to all registered participants",
                color: "primary",
              },
              {
                icon: CheckCircle2,
                title: "Registrations",
                description:
                  "Streamlined registration with approval workflow and QR tickets",
                color: "secondary",
              },
              {
                icon: Star,
                title: "Analytics",
                description:
                  "Track participation rates, engagement, and event success metrics",
                color: "accent",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/60 hover:border-primary-300 dark:hover:border-primary-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 rounded-lg bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-50 dark:from-${feature.color}-900/30 dark:to-${feature.color}-800/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon
                    className={`w-7 h-7 text-${feature.color}-600 dark:text-${feature.color}-400`}
                  />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary-500 via-purple-500 to-accent-500 p-12 text-center">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Transform Your Fest?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of colleges already using FestHub to run
                successful, well-organized events.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/participant/login"
                  className="px-8 py-3 bg-white text-primary-600 font-bold rounded-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  Get Started as Student
                </Link>
                <Link
                  to="/admin/login"
                  className="px-8 py-3 bg-white/20 text-white font-bold rounded-lg border border-white/30 hover:bg-white/30 transition-all"
                >
                  Organize Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 dark:border-slate-800/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  FestHub
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Managing college fests made simple
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-3">
                Product
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <Link to="/" className="hover:text-primary-600 transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-primary-600 transition">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-primary-600 transition">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-3">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <Link to="/" className="hover:text-primary-600 transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-primary-600 transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-primary-600 transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-3">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <Link to="/" className="hover:text-primary-600 transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-primary-600 transition">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-8">
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              © 2024 FestHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
