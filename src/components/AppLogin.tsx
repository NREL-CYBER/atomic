import { arrowBackOutline } from 'ionicons/icons';
import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { SHA3 } from 'sha3';
import { AppTitle } from '.';
import { useNotifications } from '../hooks';
import { account } from '../hooks/useAppAccount';
import useIndexDBStorage from '../hooks/useLocalSerialization';
import { useRestSerializeation } from '../hooks/useRestSerialization';
import { prettyTitle } from '../util';
import { AppSerializationConfig } from '../util/AppConfig';
import { base64ToHex } from '../util/base64ToHex';
import { byteArrayToBase64 } from '../util/binaryToBase64';
import AppButton from './AppButton';
import AppCard from './AppCard';
import AppIcon from './AppIcon';
import AppItemDivider from './AppItemDivider';
import AppLoadingCard from './AppLoadingCard';
import AppProgress from './AppProgress';
import AppSelectButtons, { selectButtonProps } from './AppSelectButtons';
import AppForm from './forms/AppForm';


const loginFormSchema = {
    "$id": "user",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "description": "Please Enter your Email and Password",
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
            "writeOnly": true,
            "minLength": 8
        }
    },
    "required": [
        "email",
        "password"
    ]
}


export interface credential { email: string, password: string };

/**
 * Sha3 hash then convert to base64 and then to HEX
 * It's a really long string now... there is probably a better solution that is URI safe.
 * @param sensitive 
 */
export const hash_sensitive_info = (sensitive: string) =>
    base64ToHex(
        byteArrayToBase64(
            new Uint8Array(
                new SHA3(512)
                    .update(sensitive)
                    .digest()
            )
        )
    )

/**
 * Component to show a loading overlay on the application
 */
const AppLogin: React.FC<{
    serialization?: AppSerializationConfig,
    onLoginSuccess: (uid: string) => void,
    authenticate: (email: string, password: string, operation: "create" | "login",
        onAuthenticated: (uid: string) => void) => Promise<string>
}> = ({ onLoginSuccess, authenticate, serialization }) => {
    const [status, setStatus] = useState<"booting" | "synchronizing" | "idle" | "login" | "create" | "authenticating">("booting")
    const synchronizeRest = useRestSerializeation(x => x.synchronize);
    const synchronizeLocal = useIndexDBStorage(x => x.synchronize);
    const { post } = useNotifications();
    const insertAccount = account.credential(x => x.insert);
    const credentials = account.credential(x => x.all());
    const hasAccounts = credentials.length > 0
    const searchParams = new URLSearchParams(window.location.search)
    const access_token = searchParams.get("access_token")
    const uid = searchParams.get("uid")
    useEffect(() => {
        if (access_token && uid) {
            //Verify the token here
            onLoginSuccess(uid);
        }
    }, [access_token, onLoginSuccess, uid])
    const accountValidOptions: selectButtonProps[] =
        !hasAccounts ?
            [
                { text: "Create Account", value: "create", fill: "solid" }] : serialization?.authentication?.provider.type === "oauth" ? [{
                    text: "Login With " + serialization.authentication.provider.name,
                    value: "oauth"
                }] :
                [
                    { text: "New Account", value: "create", fill: "solid" },
                    { text: "Login", value: "login", fill: 'solid' }
                ]
    useEffect(() => {
        if (status === "booting" && typeof serialization !== "undefined") {
            const synchronize = serialization && serialization.mode === "rest" ? synchronizeRest : synchronizeLocal;
            setStatus("synchronizing");
            synchronize(serialization, "account", account.credential.getState, "", () => {
                setStatus("idle")
            })
        }
    }, [serialization, status, synchronizeLocal, synchronizeRest])
    if (status === "booting" || status === "synchronizing") {
        return <AppLoadingCard color="tertiary" title={prettyTitle(status)} message="" />
    }
    return <AppCard titleColor="medium" title="Please Authenticate">
        <AppItemDivider /> {status === "idle" &&
            <AppSelectButtons selected={[]} onSelectionChange={(values) => {
                if (values.includes("login")) {
                    setStatus("login");
                } else if (values.includes("create")) {
                    setStatus("create");
                } else if (values.includes("oauth")) {
                    const oAuthLink = serialization?.authentication?.provider.oAuthEndPoint
                    oAuthLink && window.location.assign(oAuthLink);
                }
            }} buttons={accountValidOptions} />}
        {status !== "idle" && status !== "authenticating" &&
            <AppForm
                customSubmit={status}
                title={"Account " + status} data={{}}
                rootSchema={loginFormSchema}
                objectSchema={loginFormSchema}
                onSubmit={({ email, password }) => {
                    setStatus("authenticating");
                    authenticate(email, password, status, (result: string) => {
                        if (typeof result === "undefined") {
                            post({
                                color: "danger",
                                id: "login-failure",
                                message: "Failed to Authenticate"
                            });
                            return;
                        }
                        const entered_credential = {
                            uid: hash_sensitive_info(email.toLowerCase()),
                            password_hash: hash_sensitive_info(password)
                        };
                        const existing_credential = credentials.find(x => x.uid === entered_credential.uid)
                        const account_exists = typeof existing_credential !== "undefined"
                        switch (status) {
                            case "create":
                                if (!account_exists)
                                    insertAccount(entered_credential.uid, entered_credential).then(() => {
                                        onLoginSuccess(result);
                                    })
                                else
                                    post(
                                        {
                                            color: "danger",
                                            id: "credential-failure",
                                            message: "Invalid usern ame & Password combination"
                                        });
                                break;
                            case "login":
                                if (
                                    existing_credential &&
                                    existing_credential.password_hash === entered_credential.password_hash
                                )
                                    onLoginSuccess(result);
                                else
                                    post({ color: "danger", id: "credential-failure", message: "Invalid username & Password combination" });
                                break;

                        }
                        setStatus("idle");

                    });
                }} >
                <AppButton onClick={() => setStatus("idle")}>
                    <AppIcon icon={arrowBackOutline} />
                </AppButton>
            </AppForm>
        }
        {
            status === "authenticating" && <>
                <AppTitle color="tertiary">
                    Authenticating
                </AppTitle>
                <AppItemDivider />
                <AppProgress color="tertiary" />
            </>
        }
    </AppCard >
};
export default memo(AppLogin);