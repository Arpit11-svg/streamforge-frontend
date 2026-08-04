import React, { useState } from "react";
import { Logo } from "../components/ui";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    // TODO: Implement search functionality
    e.preventDefault();
    alert("Search functionality will be implemented soon!"); 
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:h-20 md:gap-6 md:px-6">
        {/* Logo - left */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <Logo width="50px" />
          </div>

          <div className="hidden md:block">
              <h1 className="text-xl font-bold text-cyan-300">StreamForge</h1>
              <p className="text-xs text-gray-500">Create • Share • Inspire</p>
            </div>

        </Link>

        {/* Search - middle */}
        <form
          onSubmit={handleSearch}
          className="mx-auto flex w-full max-w-xl flex-1 items-center"
        >
          <div className="group flex w-full items-center rounded-full border border-slate-700 bg-slate-900 px-4 py-2.5 transition-all duration-300 focus-within:border-transparent focus-within:shadow-lg focus-within:shadow-blue-500/20 focus-within:ring-2 focus-within:ring-blue-500/50">
            <FaSearch
              size={14}
              className="mr-3 shrink-0 text-slate-500 transition-colors group-focus-within:text-blue-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
            />
          </div>
        </form>

        {/* Signup - right */}
        <button
          onClick={() => navigate("/signup")}
          className="shrink-0 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-blue-600/50 active:scale-95"
        >
          Sign Up
        </button>
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />
    </header>
  );
}

export default Header;
