import * as React from "react";
import { SVGProps } from "react";

export const StretchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 13 13"
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    className="stretch"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4.871 3.553L9.37 8.098V3.553H4.871zm3.134 5.769L3.506 4.777v4.545h4.499z"
    />
    <circle cx={6.438} cy={6.438} r={6.438} fill="none" />
  </svg>
);
export default StretchIcon;
