import React from "react";
import { Path, WandSVG } from "./component-styles";

export const Longbottom = ({
  rotate,
  fill,
}: {
  rotate: number;
  fill: string;
}): JSX.Element => {
  // console.log("Longbottom Component Exists");
  return (
    <WandSVG>
      <Path
        d="M182.16 2047.13c2.69-214.13 11.76-1240.62 13.21-1322.77 2.07-116.55 3.42-220.57 3-231.17-.72-18.55-.83-56.5-.25-86.69.89-46-3.52-90.07-11.33-113.24-11.87-35.26-12.33-101.77-.79-124.69 4.52-9 8.28-19.85 8.37-24.08s2.79-10.93 6-14.91c7.87-9.69 31.58-21.64 35.39-17.83 1.67 1.67 12-2.07 22.88-8.32 34.24-19.63 40-19.84 51-1.83 15.16 24.87 13.29 69.34-4.88 116.06-8 20.63-13 40.11-11 43.27 3.75 6.06 12.5 103.18 12.24 135.94-.46 60-5.08 156.22-7.7 160.46-4.08 6.6-18 230.42-19.92 321.14-.86 39.73-2.79 106.92-4.3 149.3-1.84 51.82-3.74 115.12-5.55 184.19-2.44 235.11-7.16 550.78-13.19 771.77.18 66.89-2.7 185.62-8.2 322.68-5.9 146.85-10.77 145-16.84 161.34-11.34 30.47-47.59 23.47-53.64 9-10.82-25.87-5.68-73-5.28-117.95.01-4.47 9.96-246.38 10.78-311.67z"
        data-name="Longbottom"
        fill={fill}
        rotate={`${rotate}`}
      />
    </WandSVG>
  );
};
