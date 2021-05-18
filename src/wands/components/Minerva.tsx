import React from "react";
import { Path, WandSVG } from "./component-styles";

export const Minerva = ({
  rotate,
  fill,
}: {
  rotate: number;
  fill: string;
}): JSX.Element => {
  // console.log("Minerva Component Exists");
  return (
    <WandSVG>
      <Path
        d="M189.44 2498.81c-1.73-2.78-1.87-44.51-.33-92.71 7.82-244.52 12.43-1344.9 5.73-1365.32-2.14-6.49-1.43-13.74 1.71-17.52 3.45-4.15 7-60.25 9.89-157.49 2.5-83.08 5.64-168 7-188.84 2.24-34.77 1.48-39-9.49-53.43-14.32-18.78-15.09-29.53-2.67-37.28 9.13-5.7 9.13-5.94 0-17.55-5.09-6.47-9.19-15.27-9.1-19.54.19-9.56 11.16-24.64 17.92-24.64 2.73 0 6.29-3.42 7.9-7.61 5.6-14.6 2.84-27.7-9.12-43.38-6.62-8.69-12-17.16-12-18.84s-5.62-10.41-12.47-19.41c-24.24-31.77-19.26-71.17 11.78-93.28 18.46-13.14 27.09-44.63 17.38-63.41-11.8-22.82-14.22-51.72-5.17-61.72 7.13-7.88 7.2-9.47.64-14.92-10.06-8.35-9.38-32.18 1.08-38.12 6.93-3.93 7.42-6.44 2.74-14.1-9.49-15.51-12.92-43.51-6.3-51.47 7.33-8.85 57.9-9.91 66.41-1.4 8 8 7.2 32.33-1.55 49.1-6.76 13-6.6 14.41 2.44 20.74 11.39 8 12.43 20 2.85 33-5.95 8.11-5.91 10.39.26 17.23 10.14 11.24 8.09 47.77-3.32 59.3-12.3 12.42-3.53 36.84 24.88 69.28 29.08 33.2 29.51 71.39 1.16 101.93-17.62 19-35.39 45.48-35.39 52.8 0 4.47 5.24 13 11.63 19 15.83 14.87 19.22 31.6 10.12 49.85-6.71 13.45-6.73 15.49-.18 19.15 10.6 5.94 9 17.33-4.92 35.63L268.64 640l-2.51 199c-1.39 109.48-4.26 216.24-6.38 237.24s-4.25 96.51-4.71 167.79-1.59 130.89-2.5 132.44-3.12 89.53-4.89 195.53c-5.67 340-21.75 832.69-29.59 906.62-2.4 22.63-3.88 25.28-14.09 25.28-6.28 0-12.82-2.28-14.54-5.06z"
        data-name="Minerva"
        fill={fill}
        rotate={`${rotate}`}
      />
    </WandSVG>
  );
};