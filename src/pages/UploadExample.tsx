import React from 'react';
import { AppContent, AppPage } from '../components';
import AppUploader from '../components/serialization/AppUploader';

const UploadExample: React.FC = () => {

    return <AppPage >
        <AppContent>
            <AppUploader title=" A Test Upload" description="Drop it like its sub-atomic and emiting radiation" accept="image/*" onFileReceived={() => {
                alert("file recevied");
            }} />
        </AppContent>
    </AppPage>
}
export default UploadExample;
