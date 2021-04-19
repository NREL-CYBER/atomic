import { arrowBackOutline } from 'ionicons/icons';
import React, { memo, useState } from 'react';
import Validator from 'validator';
import { AppTitle } from '.';
import { useNotifications } from '../hooks';
//import useFirebaseStorage from '../hooks/useFirebaseSerialization';
import AppButton from './AppButton';
import AppCard from './AppCard';
import AppIcon from './AppIcon';
import AppItemDivider from './AppItemDivider';
import AppProgress from './AppProgress';
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
const AppLogin: React.FC<{ onLoginSuccess: (uid: string) => void, authenticate: (email: string, password: string, operation: "create" | "login", onAuthenticated: (uid: string) => void) => Promise<string> }> = ({ onLoginSuccess, authenticate }) => {
    const [status, setStatus] = useState<"idle" | "login" | "create" | "authenticating">("idle")
    //    const cloudSerializer = useFirebaseStorage(cloud)
    //    const { authenticate } = cloudSerializer();
    const { post } = useNotifications();

    const [validator] = useState<Validator<credential>>(new Validator<credential>(credentialSchema));
    return <AppCard titleColor="medium" title="Please Authenticate">
        <AppItemDivider />     {status === "idle" && <AppSelectButtons selected={[]} onSelectionChange={(values) => {
            if (values.includes("login")) {
                setStatus("login");
            } else if (values.includes("create")) {
                setStatus("create");
            }
        }} buttons={[
            { text: "Login", value: "login", fill: 'solid' },
            { text: "Sign up", value: "create", fill: "solid" }
        ]} />}
        {status !== "idle" && status !== "authenticating" && <AppForm
            customSubmit={<>{status}</>}
            title={"Account " + status} data={{}} validator={validator} onSubmit={({ email, password }) => {
                setStatus("authenticating");
                authenticate(email, password, status, (result: string) => {
                    if (typeof result !== "undefined") {
                        onLoginSuccess(result);
                    } else {
                        post({ color: "danger", id: "login-failure", message: "Failed to Authenticate" });
                        setStatus("idle")
                    }
                });
            }} >
            <AppButton onClick={() => setStatus("idle")}>
                <AppIcon icon={arrowBackOutline} />
            </AppButton>
        </AppForm>}
        {status === "authenticating" && <>
            <AppTitle color="tertiary">
                Authenticating
            </AppTitle>
            <AppItemDivider />
            <AppProgress type="indeterminate" color="tertiary" />
        </>}
    </AppCard>
};
export default memo(AppLogin);