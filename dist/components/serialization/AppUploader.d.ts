import React from 'react';
import { IFileWithMeta, IUploadParams } from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
export declare type AppFill = "clear" | "outline" | "solid" | "default" | undefined;
export interface uploaderProps {
    title: string;
    description: string;
    file?: File;
    onFileReceived: (file: IFileWithMeta, uri: string) => void;
    accept: string;
    identifier: string;
    uploadParams?: (fileWithMeta: IFileWithMeta) => IUploadParams;
}
/**
 * Upload Component
 */
declare const AppUploader: React.FC<uploaderProps>;
export default AppUploader;
