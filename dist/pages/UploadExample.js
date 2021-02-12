import React from 'react';
import { AppContent, AppPage } from '../components';
import AppUploader from '../components/serialization/AppUploader';

const UploadExample = () => {
  return /*#__PURE__*/React.createElement(AppPage, null, /*#__PURE__*/React.createElement(AppContent, null, /*#__PURE__*/React.createElement(AppUploader, {
    title: " A Test Upload",
    description: "Drop it like its sub-atomic and emiting radiation",
    accept: "image/*",
    onFileReceived: () => {
      alert("file recevied");
    }
  })));
};

export default UploadExample;