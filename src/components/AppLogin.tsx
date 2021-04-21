import { arrowBackOutline } from 'ionicons/icons';
import React, { memo, useState } from 'react';
import Validator from 'validator';
import { AppTitle } from '.';
import { useNotifications } from '../hooks';
import { account } from '../hooks/useAppAccount';
//import useFirebaseStorage from '../hooks/useFirebaseSerialization';
import AppButton from './AppButton';
import AppCard from './AppCard';
import AppIcon from './AppIcon';
import AppItemDivider from './AppItemDivider';
import AppProgress from './AppProgress';
import AppSelectButtons, { selectButtonProps } from './AppSelectButtons';
import AppForm from './forms/AppForm';
import { SHA3 } from 'sha3';
import credentialSchema from "../schemas/credential.schema.json"
import AppLoadingCard from './AppLoadingCard';
import { useEffect } from 'react';
import { useRestSerializeation } from '../hooks/useRestSerialization';
import { AppSerializationConfig } from '../util/AppConfig';
import useIndexDBStorage from '../hooks/useLocalSerialization';
import { prettyTitle } from '../util';
import { byteArrayToBase64 } from '../util/binaryToBase64';
import { base64ToHex } from '../util/base64ToHex';



interface credential { email: string, password: string };

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
    const accountValidOptions: selectButtonProps[] =
        !hasAccounts ?
            [
                { text: "Create Account", value: "create", fill: "solid" }] :
            [
                { text: "New Account", value: "create", fill: "solid" },
                { text: "Login", value: "login", fill: 'solid' }
            ]
    const [validator] = useState<Validator<credential>>(new Validator<credential>(credentialSchema));
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
        <AppItemDivider /> {status === "idle" && <AppSelectButtons selected={[]} onSelectionChange={(values) => {
            if (values.includes("login")) {
                setStatus("login");
            } else if (values.includes("create")) {
                setStatus("create");
            }
        }} buttons={accountValidOptions} />}
        {status !== "idle" && status !== "authenticating" && <AppForm
            customSubmit={status}
            title={"Account " + status} data={{}} validator={validator} onSubmit={({ email, password }) => {
                setStatus("authenticating");
                authenticate(email, password, status, (result: string) => {
                    if (typeof result === "undefined") {
                        post({ color: "danger", id: "login-failure", message: "Failed to Authenticate" });
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
                                insertAccount(entered_credential, entered_credential.uid).then(() => {
                                    onLoginSuccess(result);
                                })
                            else
                                post({ color: "danger", id: "credential-failure", message: "Invalid username & Password combination" });
                            break;
                        case "login":
                            if (existing_credential && existing_credential.password_hash === entered_credential.password_hash)
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
                <AppProgress type="indeterminate" color="tertiary" />
            </>
        }
    </AppCard >
};
export default memo(AppLogin);