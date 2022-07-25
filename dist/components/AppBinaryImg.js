import React, { memo } from 'react';
import { binaryToFileUri } from "../util";

/**
 */
const AppBinaryImg = ({
  width,
  height,
  alt,
  binary
}) => {
  return /*#__PURE__*/React.createElement("img", {
    alt: alt,
    height: height,
    width: width,
    src: binaryToFileUri(binary, "image")
  });
};

export default /*#__PURE__*/memo(AppBinaryImg);