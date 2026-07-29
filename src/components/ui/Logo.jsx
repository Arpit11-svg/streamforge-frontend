import React from "react";
import logoImage from "../../assets/streamforge_logo.png";

function Logo({ width = "100px" }) {
  return (
    <div>
      <img src={logoImage} alt="StreamForge Logo" style={{ width: width }} />
    </div>
  );
}

export default Logo;
