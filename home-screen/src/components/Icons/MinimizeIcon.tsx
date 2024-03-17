import * as React from "react";
import { SVGProps } from "react";

const MinimizeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={6}
    height={1}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="minimize"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      d="M.61.703h5.8"
    />
  </svg>
);
export default MinimizeIcon;
