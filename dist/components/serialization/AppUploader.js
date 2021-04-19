import React, { useState } from 'react';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { AppItem, AppLabel } from '..';
import { prettyTitle } from '../../util';
import AppText from '../AppText';

/**
 * Upload Component 
 */
const AppUploader = ({
  accept,
  description,
  title,
  onFileReceived,
  uploadParams,
  file
}) => {
  const [status, setStatus] = useState("ready");
  const successStatus = ["done"];
  const errorStatus = ["error_file_size", "error_upload", "error_upload_params", "error_validation", "aborted", "rejected_file_type"];
  const normalStatus = ["ready", "preparing", "getting_upload_params"];
  const statusColor = normalStatus.includes(status) ? "primary" : successStatus.includes(status) ? "favorite" : errorStatus.includes(status) ? "danger" : "clear";
  const propertyFormattedName = prettyTitle(title); // called every time a file's `status` changes

  const handleChangeStatus = (fileWithMeta, status) => {
    if (status === "done") {
      handleSubmit(fileWithMeta);
    }

    setStatus(status);
  };

  const handleSubmit = async fileWithMeta => {
    const {
      meta,
      file
    } = fileWithMeta;
    const fileBuffer = await file.arrayBuffer();
    var binary = '';
    var bytes = new Uint8Array(fileBuffer);
    var len = bytes.byteLength;

    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    onFileReceived(meta, btoa(binary));
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: statusColor
  }, propertyFormattedName)), /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppText, null, description)), /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(Dropzone, {
    initialFiles: file ? [file] : undefined,
    maxFiles: 1,
    multiple: false,
    getUploadParams: uploadParams,
    autoUpload: true,
    onChangeStatus: handleChangeStatus,
    accept: accept
  })));
}; // receives array of files that are done uploading when submit button is clicked


export default AppUploader;