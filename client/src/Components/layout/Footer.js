import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
function Footer() {
  return (
    <div style={{ position: "fixed", bottom: "10px", left: "10px" }}>
      <div className="flex items-center justify-center font-body mb-[100px]">
        <span className="mr-3 text-[0.8rem]"> © Made by JamesNguyen </span>
        <a
          href="https://github.com/jamesnguyenn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon></GitHubIcon>
        </a>
      </div>
    </div>
  );
}

export default Footer;
