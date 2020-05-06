import React from "react";

const Screw = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="10"
      cy="10"
      r="10"
      transform="rotate(-180 10 10)"
      fill="url(#paint0_linear)"
    />
    <circle cx="10" cy="10" r="7" fill="url(#paint1_linear)" />
    <rect x="9" y="6" width="2" height="8" fill="#60615F" />
    <rect
      x="6"
      y="11"
      width="2"
      height="8"
      transform="rotate(-90 6 11)"
      fill="#60615F"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="10"
        y1="0"
        x2="10"
        y2="20"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#707070" />
        <stop offset="0.583333" stopColor="#EAEAEA" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="10"
        y1="3"
        x2="10"
        y2="17"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#707070" />
        <stop offset="0.583333" stopColor="#EAEAEA" />
      </linearGradient>
    </defs>
  </svg>
);

export default Screw;
