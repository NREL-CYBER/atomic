import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { AppItem } from '..';
import { prettyTitle } from '../../util';
import { byteArrayToBase64 } from '../../util/binaryToBase64';
import { AppFormLabel } from '../forms/AppFormLabel';

/**
 * Upload Component 
 */
const AppUploader = ({
  accept,
  required,
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
  const statusColor = normalStatus.includes(status) ? "medium" : successStatus.includes(status) ? "favorite" : errorStatus.includes(status) ? "danger" : "clear";
  const propertyFormattedName = prettyTitle(title); // called every time a file's `status` changes

  const handleChangeStatus = (fileWithMeta, status) => {
    console.log(status);

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
    onFileReceived(meta, byteArrayToBase64(new Uint8Array(fileBuffer)));
  };

  const dropRef = useRef(null);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppFormLabel, {
    required: required,
    name: propertyFormattedName,
    color: statusColor
  }), /*#__PURE__*/React.createElement(Dropzone, {
    ref: dropRef,
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