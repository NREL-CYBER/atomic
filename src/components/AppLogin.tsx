import { arrowBackOutline } from 'ionicons/icons';
import React, { memo, useState } from 'react';
import Validator from 'validator';
import { AppSpinner } from '.';
import useFirebaseStorage from '../hooks/useFirebaseSerialization';
import { AppCloudConfig } from '../util/AppConfig';
import AppButton from './AppButton';
import AppCard from './AppCard';
import AppIcon from './AppIcon';
import AppSelectButtons from './AppSelectButtons';
import AppForm from './forms/AppForm';


const credentialSchema = {
    "$id": "user",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "description": "Please Enter your Username and Password",
    "title": "Account",
    "$comment": "~",
    "type": "object",
    "properties": {
        "email": {
            "type": "string",
            "format": "email"
        },
        "password": {
            "type": "string",
            "writeOnly": true
        }
    },
    "required": [
        "email",
        "password"
    ]
}


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
        {status === "idle" && <AppSelectButtons selected={[]} onSelectionChange={(values) => {
            if (values.includes("login")) {
                setStatus("login");
            } else if (values.includes("create")) {
                setStatus("create");
            }
        }} buttons={[
            { text: "Login", value: "login" },
            { text: "Sign up", value: "create" }
        ]} />}
        {status !== "idle" && status !== "authenticating" && <AppForm
            customSubmit={<>{status}</>}
            title={"Account " + status} data={{}} validator={validator} onSubmit={({ email, password }) => {
                authenticate(email, password, status, onLoginSuccess);
            }} >
            <AppButton onClick={() => setStatus("idle")}>
                <AppIcon icon={arrowBackOutline} />
            </AppButton>
        </AppForm>}
        {status === "authenticating" && <AppSpinner />}
    </AppCard>
};
export default memo(AppLogin);