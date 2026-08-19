import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaVideo,
  FaHeart,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaChartBar,
} from "react-icons/fa";
import Logout from "./Logout.jsx";

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData).data;
  
  const ownerName = userData?.fullName || userData?.username || "User";
  const username = userData?.username ? `@${userData.username}` : "";
  const avatar = userData?.avatar.url;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open profile menu"
        className="
          group
          flex
          items-center
          gap-2
          rounded-full
          p-1
          transition-all
          duration-300
          hover:bg-slate-700
        "
      >
        {/* Avatar */}
        <div
          className="
            h-9
            w-9
            overflow-hidden
            rounded-full
            bg-slate-600
            ring-2
            ring-slate-600
            transition-all
            duration-300
            group-hover:ring-cyan-400
          "
        >
          {avatar ? (
            <img
              src={avatar}
              alt={ownerName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-300">
              {ownerName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <FaChevronDown
          className={`mr-1 text-xs text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-cyan-300" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="
            absolute
            right-0
            top-12
            z-50
            w-72
            overflow-hidden
            rounded-2xl
            border
            border-slate-700
            bg-slate-800
            shadow-2xl
            shadow-black/40
            ring-1
            ring-white/5
          "
        >
          {/* User Info */}
          <div className="border-b border-slate-700 p-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-full bg-slate-600">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={ownerName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-bold text-slate-300">
                    {ownerName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate font-semibold text-white">{ownerName}</p>

                <p className="truncate text-sm text-slate-400">{username}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button
              onClick={() => {
                navigate("/dashboard");
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              <FaChartBar className="text-slate-400" />
              Dashboard
            </button>

            <button
              onClick={() => {
                navigate("/my-profile");
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              <FaUser className="text-slate-400" />
              My Profile
            </button>

            <button
              onClick={() => {
                navigate("/my-videos");
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              <FaVideo className="text-slate-400" />
              My Videos
            </button>

            <button
              onClick={() => {
                navigate("/liked-videos");
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              <FaHeart className="text-slate-400" />
              Liked Videos
            </button>

            <button
              onClick={() => {
                navigate("/settings");
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              <FaCog className="text-slate-400" />
              Settings
            </button>
          </div>

          {/* Logout */}
          <div className="border-t border-slate-700 p-2">
            <div className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10">
              <FaSignOutAlt />

              <Logout />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
