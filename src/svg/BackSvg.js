import * as React from "react";
import Svg, { Polygon } from "react-native-svg";
const BackSvg = (props) => (
  <Svg
    height="30px"
    id="Layer_1"
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    viewBox="0 0 512 512"
    width="50px"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 " />
  </Svg>
);
export default BackSvg;
