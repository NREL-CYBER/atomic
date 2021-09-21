import React from 'react';
import { IFileWithMeta, IMeta, IUploadParams } from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
export declare type AppFill = "clear" | "outline" | "solid" | "default" | undefined;
export interface uploaderProps {
    required?: boolean;
    title: string;
    description: string;
    file?: File;
    onFileReceived: (meta: IMeta, data_uri: string) => void;
    accept: string;
    uploadParams?: (fileWithMeta: IFileWithMeta) => IUploadParams;
}
/**
 * Upload Component
 */
declare const AppUploader: React.FC<uploaderProps>;
export default AppUploader;
