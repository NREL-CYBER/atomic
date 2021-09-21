import { AppButtons, AppCol } from "atomic";
import AppButton from "../AppButton";
export const AppFormLabel = ({
  name,
  color,
  info,
  required,
  onClick
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    minWidth: 200
  }
}, /*#__PURE__*/React.createElement(AppButtons, {
  slot: "start"
}, /*#__PURE__*/React.createElement(AppCol, {
  size: "6"
}, /*#__PURE__*/React.createElement(AppButton, {
  fill: "clear",
  disabled: typeof onClick === "undefined",
  onClick: onClick,
  color: color
}, name, required && color !== "favorite" && /*#__PURE__*/React.createElement("span", {
  style: {
    "color": "crimson",
    left: -7,
    top: 5,
    "position": "absolute"
  }
}, "*")))));