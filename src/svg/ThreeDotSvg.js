import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ThreeDotSvg = (props) => (
  <Svg
    width="40px"
    height="20px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
    className="bi bi-three-dots-vertical"
    {...props}
  >
    <Path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
  </Svg>
);
export default ThreeDotSvg;
