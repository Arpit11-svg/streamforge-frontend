import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Header from "./layouts/Header.jsx";
import Footer from "./layouts/Footer.jsx";
import Home from "./pages/Home.jsx";
import VideoWatch from "./pages/VideoWatch.jsx";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-800">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/video/:id" element={<VideoWatch />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
