import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Header from "./layouts/Header.jsx";
import Footer from "./layouts/Footer.jsx";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
