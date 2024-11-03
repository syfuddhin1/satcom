import React from "react";

export default function CurvedSvgTop() {
  return (
    <div className="landing-curve landing-dark-color">
      <svg
        viewBox="15 -1 1470 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 48C4.93573 47.6644 8.85984 47.3311 12.7725 47H1489.16C1493.1 47.3311 1497.04 47.6644 1501 48V47H1489.16C914.668 -1.34764 587.282 -1.61174 12.7725 47H1V48Z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
}

export function CurvedSvgBottom(svg) {
  return (
    <div className="landing-curve landing-dark-color">
      <svg
        viewBox="15 12 1470 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 11C3.93573 11.3356 7.85984 11.6689 11.7725 12H1488.16C1492.1 11.6689 1496.04 11.3356 1500 11V12H1488.16C913.668 60.3476 586.282 60.6117 11.7725 12H0V11Z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
}
