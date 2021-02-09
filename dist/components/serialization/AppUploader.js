import React, { useState } from 'react';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { AppCard } from '..';

/**
 * Upload Component 
 */
const AppUploader = ({
  accept,
  description,
  title,
  children,
  onFileReceived,
  uploadParams,
  file
}) => {
  const [status, setStatus] = useState("ready");
  const successStatus = ["done"];
  const errorStatus = ["error_file_size", "error_upload", "error_upload_params", "error_validation", "aborted", "rejected_file_type"];
  const normalStatus = ["ready", "preparing", "getting_upload_params"];
  const statusColor = normalStatus.includes(status) ? "primary" : successStatus.includes(status) ? "success" : errorStatus.includes(status) ? "danger" : "clear"; // called every time a file's `status` changes

  const handleChangeStatus = ({
    meta,
    file
  }, status) => {
    setStatus(status);
  };

  const handleSubmit = (files, allFiles) => {
    allFiles.forEach(file => {
      onFileReceived(file);
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppCard, {
    contentColor: "light",
    headerColor: statusColor,
    title: title,
    subTitle: description
  }, /*#__PURE__*/React.createElement(Dropzone, {
    initialFiles: file ? [file] : undefined,
    maxFiles: 1,
    multiple: false,
    getUploadParams: uploadParams,
    onChangeStatus: handleChangeStatus,
    onSubmit: handleSubmit,
    accept: accept
  }), "        "));
}; // receives array of files that are done uploading when submit button is clicked


export default AppUploader;