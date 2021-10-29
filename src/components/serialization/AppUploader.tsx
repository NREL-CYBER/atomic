import React, { useState, useRef } from 'react';
import Dropzone, { IFileWithMeta, IMeta, IUploadParams, StatusValue } from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { AppButtons, AppChip, AppItem } from '..';
import { AppColor } from '../../theme';
import { prettyTitle } from '../../util';
import { byteArrayToBase64 } from '../../util/binaryToBase64';
import AppText from '../AppText';
import { AppFormLabel } from '../forms/AppFormLabel';

export type AppFill = "clear" | "outline" | "solid" | "default" | undefined


export interface uploaderProps {
    required?: boolean,
    title: string,
    description: string,
    file?: File
    onFileReceived: (meta: IMeta, data_uri: string) => void
    accept: string,
    uploadParams?: (fileWithMeta: IFileWithMeta) => IUploadParams
}

/**
 * Upload Component 
 */
const AppUploader: React.FC<uploaderProps> = ({ accept, required, description, title, onFileReceived, uploadParams, file }) => {
    const [status, setStatus] = useState<StatusValue>("ready");
    const successStatus: StatusValue[] = ["done"];
    const errorStatus: StatusValue[] = ["error_file_size",
        "error_upload", "error_upload_params",
        "error_validation", "aborted", "rejected_file_type"]
    const normalStatus: StatusValue[] = ["ready", "preparing", "getting_upload_params"]
    const statusColor: AppColor = normalStatus.includes(status) ? "medium" : successStatus.includes(status) ? "favorite" : errorStatus.includes(status) ? "danger" : "clear";

    const propertyFormattedName = prettyTitle(title);

    // called every time a file's `status` changes
    const handleChangeStatus: (fileWithMeta: IFileWithMeta, status: StatusValue, allFiles: IFileWithMeta[]) => void = (fileWithMeta, status) => {
        console.log(status);
        if (status === "done") {
            handleSubmit(fileWithMeta);
        }
        setStatus(status);
    }

    const handleSubmit: (successFile: IFileWithMeta) => Promise<void> = async (fileWithMeta) => {
        const { meta, file } = fileWithMeta;
        const fileBuffer = await file.arrayBuffer()
        onFileReceived(meta,
            byteArrayToBase64(new Uint8Array(fileBuffer))
        );
    }
    const dropRef = useRef<Dropzone>(null)
    return <>
        <AppItem>
            <AppFormLabel required={required} name={propertyFormattedName} color={statusColor} />
            <Dropzone ref={dropRef}
                initialFiles={file ? [file] : undefined}
                maxFiles={1}
                multiple={false}
                getUploadParams={uploadParams}
                autoUpload={true}
                onChangeStatus={handleChangeStatus}
                accept={accept}
            >
            </Dropzone>
        </AppItem>
    </>
};

// receives array of files that are done uploading when submit button is clicked
export default AppUploader;
