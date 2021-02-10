import React, { useState } from 'react';
import Dropzone, { IFileWithMeta, IUploadParams, StatusValue } from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { AppCard } from '..';
import { AppColor } from '../../theme';
import { useFileStorage } from '../../hooks';
import { v4 } from 'uuid';

export type AppFill = "clear" | "outline" | "solid" | "default" | undefined


export interface uploaderProps {
    title: string,
    description: string,
    file?: File
    onFileReceived: (file: IFileWithMeta, uri: string) => void
    accept: string,
    identifier: string
    uploadParams?: (fileWithMeta: IFileWithMeta) => IUploadParams
}

/**
 * Upload Component 
 */
const AppUploader: React.FC<uploaderProps> = ({ accept, description, title, children, onFileReceived, uploadParams, identifier, file }) => {
    const [status, setStatus] = useState<StatusValue>("ready");
    const successStatus: StatusValue[] = ["done"];
    const errorStatus: StatusValue[] = ["error_file_size", "error_upload", "error_upload_params", "error_validation", "aborted", "rejected_file_type"]
    const normalStatus: StatusValue[] = ["ready", "preparing", "getting_upload_params"]
    const statusColor: AppColor = normalStatus.includes(status) ? "primary" : successStatus.includes(status) ? "success" : errorStatus.includes(status) ? "danger" : "clear";

    const { insert } = useFileStorage();

    // called every time a file's `status` changes
    const handleChangeStatus: (meta: IFileWithMeta, status: StatusValue, allFiles: IFileWithMeta[]) => void = ({ meta, file }, status) => {
        setStatus(status);
    }

    const handleSubmit: (successFiles: IFileWithMeta[], allFiles: IFileWithMeta[]) => void = (files, allFiles) => {
        allFiles.forEach((fileWithMeta) => {
            const { file } = fileWithMeta;
            const URI = "/" + identifier + v4();
            insert(file, URI);
            onFileReceived(fileWithMeta, URI);
        })
    }
    return <>
        <AppCard titleColor={statusColor} title={title} subTitle={description}>

            <Dropzone
                initialFiles={file ? [file] : undefined}
                maxFiles={1}
                multiple={false}
                getUploadParams={uploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                accept={accept}
            />        </AppCard>
    </>
};

// receives array of files that are done uploading when submit button is clicked
export default AppUploader;