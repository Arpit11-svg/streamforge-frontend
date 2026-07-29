import React from "react";

function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`w-full rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-5 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-600/30 active:scale-95 disabled:cursor-not-alloweddisabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
