import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/ui/Logo";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaEnvelope,
  FaLaptopCode,
  FaPaperPlane,
} from "react-icons/fa6";
import { FaMapMarkerAlt, FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiMongodb } from "react-icons/si";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-gray-300">
      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"></div>

      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Newsletter */}
        <div className="mb-14 flex flex-col lg:flex-row items-center justify-between gap-6 rounded-2xl border border-slate-800 bg-slate-900/50 px-8 py-8 backdrop-blur-sm">
          <div className="text-center lg:text-left">
            <h3 className="text-white text-xl font-semibold mb-2">
              Stay in the loop
            </h3>
            <p className="text-gray-400">
              Get updates on new features, creators, and platform news.
            </p>
          </div>

          <form className="flex w-full max-w-md gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-blue-500"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-blue-500 hover:to-purple-500"
            >
              <FaPaperPlane size={14} />
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Logo */}
          <div>
            <div className="mb-6">
              <Logo width="120px" />
            </div>

            <p className="text-gray-400 leading-7 mb-6">
              <span className="text-cyan-300">StreamForge</span> is a platform for creators to share their content and
              connect with their audience. Join us and start your journey today!
            </p>

            <div className="flex gap-4">
              <a
                href="https://github.com/Arpit11-svg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-900 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/arpit-choudhary-092706328/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-900 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="https://x.com/ChoudharyArpit_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-900 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                <FaXTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/all-posts"
                  className="hover:text-blue-400 transition"
                >
                  All Videos
                </Link>
              </li>

              <li>
                <Link to="/category" className="hover:text-blue-400 transition">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}

          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Support</h3>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/support?type=contact"
                  className="hover:text-blue-400 transition"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/support?type=issue"
                  className="hover:text-blue-400 transition"
                >
                  Report Issue
                </Link>
              </li>

              <li>
                <Link
                  to="/support?type=feedback"
                  className="hover:text-blue-400 transition"
                >
                  Submit Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Contact</h3>

            <div className="space-y-5">
              <div className="flex gap-3 items-center">
                <FaEnvelope className="text-blue-400" />
                <span>support@streamforge.com</span>
              </div>

              <div className="flex gap-3 items-center">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>Delhi, Uttar Pradesh</span>
              </div>

              <a
                href="https://www.linkedin.com/in/arpit-choudhary-092706328/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-3 items-center hover:text-blue-400 transition"
              >
                <FaLaptopCode className="text-blue-400" />

                <span className="group-hover:translate-x-1 transition">
                  Developed by Arpit Choudhary
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="border-t border-slate-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} StreamForge. All rights reserved.
          </p>

          <div className="flex gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5 rounded-full border border-slate-800 px-3 py-1.5 hover:text-white hover:border-slate-600 transition">
              <FaReact className="text-sky-400" /> React
            </span>

            <span className="flex items-center gap-1.5 rounded-full border border-slate-800 px-3 py-1.5 hover:text-white hover:border-slate-600 transition">
              <FaNodeJs className="text-green-500" /> Node.js
            </span>

            <span className="flex items-center gap-1.5 rounded-full border border-slate-800 px-3 py-1.5 hover:text-white hover:border-slate-600 transition">
              <SiMongodb className="text-green-400" /> MongoDB
            </span>

            <span className="flex items-center gap-1.5 rounded-full border border-slate-800 px-3 py-1.5 hover:text-white hover:border-slate-600 transition">
              <SiTailwindcss className="text-cyan-400" /> Tailwind
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
