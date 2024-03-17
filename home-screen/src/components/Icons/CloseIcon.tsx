import * as React from "react";
import { SVGProps } from "react";

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="close"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      d="M1.182 5.99L5.99 1.182m0 4.95L1.182 1.323"
    />
  </svg>
);
export default CloseIcon;
