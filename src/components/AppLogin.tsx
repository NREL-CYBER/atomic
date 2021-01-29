import firebase from 'firebase';
import React, { useState, memo } from 'react';
import Validator from 'validator';
import credentialSchema from '../schemas/credential.schema.json';
import AppCard from './AppCard';
import AppSelectButtons from './AppSelectButtons';
import AppFormComposer from './forms/AppFormComposer';
import useFirebaseStorage from '../hooks/useFirebaseSerialization';
import { AppCloudConfig } from '../util/AppConfig';
import { AppSpinner } from '.';
import AppButton from './AppButton';
import AppIcon from './AppIcon';
import { arrowBackOutline } from 'ionicons/icons';

interface credential { email: string, password: string };
/**
 * Component to show a loading overlay on the application
 */
const AppLogin: React.FC<{ onLoginSuccess: (uid: string) => void, cloud: AppCloudConfig }> = ({ onLoginSuccess, cloud }) => {
    const [status, setStatus] = useState<"idle" | "login" | "create" | "authenticating">("idle")
    const cloudSerializer = useFirebaseStorage(cloud)
    const { authenticate } = cloudSerializer();

    const [validator] = useState<Validator<credential>>(new Validator<credential>(credentialSchema));
    return <AppCard title="Please Authenticate">
        {status === "idle" && <AppSelectButtons onSelectionChange={(values) => {
            if (values.includes("login")) {
                setStatus("login");
            } else if (values.includes("create")) {
                setStatus("create");
            }
        }} buttons={[
            { text: "Login", value: "login" },
            { text: "Sign up", value: "create" }
        ]} />}
        {status !== "idle" && status !== "authenticating" && <AppFormComposer title={"Account " + status} data={{}} validator={validator} onSubmit={({ email, password }) => {
            authenticate(email, password, status, onLoginSuccess);
        }} >
            <AppButton onClick={() => setStatus("idle")}>
                <AppIcon icon={arrowBackOutline} />
            </AppButton>
        </AppFormComposer>}
        {status === "authenticating" && <AppSpinner />}
    </AppCard>
};
export default memo(AppLogin);