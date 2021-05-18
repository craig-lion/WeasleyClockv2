import React from "react";
import { Path, WandSVG } from "./component-styles";

export const Krum = ({
  rotate,
  fill,
}: {
  rotate: number;
  fill: string;
}): JSX.Element => {
  // console.log("Krum Component Exists");
  return (
    <WandSVG>
      <Path
        d="M174.82 2465.35c-9.73 0-20.54-.36-23.88-15.59-2.84-13 0-77.75 0-82.22 0-7.88 41.91-976.66 44.73-991.22 2.19-11.34 28.06-319.52 39-457.8.28-3.58-3.22-9.14-3-12.48.79-10-.43-27.8 5.39-32.42 3.71-2.94 4.18-14.75 4.89-27.72 1.72-31.51 15.77-179 30-232.76 10.84-41.07 16.35-99.32.75-150.78-6.6-21.77-17.19-32.83-35.4-57-25-33.14-86.52-84.91-92.84-95.77-36-62-18.07-144.69-12.21-164 8-26.46 37.89-31 75.25-32.24 15.13-.5 35.16 2.14 38.62 0s11.51-2.61 17.88-1q18.51 4.64-.89 27.34c-3.6 4.21-13.2 25.89-21.34 48.16-13 35.57-14.13 42.64-9.46 58.27 6 20 41.43 53.49 66.25 62.6 12.47 4.57 19.13 13.05 35.07 44.62 10.82 21.44 22.83 50.84 26.69 65.35 12.75 47.94 7.28 175.77-15 349-4.42 34.43-10.33 58.74-11.27 79.6-.14 3.09-3.88 24.89-2.36 28 2.39 4.82-.08 33.76-2.06 36.3-.85 1.07-4.34 4.77-5.31 8.08-1.71 5.78-.91 13-2 21.4-1.67 13.25-5.24 40.34-7.92 60.2-8.24 60.83-23.43 196.69-28.8 257.66-2.81 31.79-7.23 76.21-9.83 98.73-5.11 44.13-7.09 68.61-28.68 354-24.15 319.2-22.75 296-38.45 638.12-4.74 104.39-8.02 115.57-33.82 115.57z"
        data-name="Krum"
        fill={fill}
        rotate={`${rotate}`}
      />
    </WandSVG>
  );
};