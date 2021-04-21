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



const hash = new SHA3(512);

interface credential { email: string, password: string };
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
    const { synchronize } = useRestSerializeation();
    const synchronizeLocal = useIndexDBStorage(x => x.synchronize);
    const { post } = useNotifications();
    const hasAccounts = account.credential(x => x.index.length !== 0)
    const insertAccount = account.credential(x => x.insert);
    const retrieveCredential = account.credential(x => x.retrieve);
    let accountValidOptions: selectButtonProps[] = [
        { text: "Sign up", value: "create", fill: "solid" }
    ]
    if (hasAccounts) {
        accountValidOptions.push(
            { text: "Login", value: "login", fill: 'solid' }
        )
    }

    const [validator] = useState<Validator<credential>>(new Validator<credential>(credentialSchema));
    useEffect(() => {
        if (status === "booting") {
            if (serialization && serialization.mode === "rest") {
                synchronize(serialization, "account", account.credential.getState, "anonymous")
            } else {
                synchronizeLocal("account", account.credential.getState, "anonymous")
            }
            setStatus("synchronizing");
            setTimeout(() => {
                setStatus("idle");
            }, 500)
        }
    }, [serialization, status, synchronize, synchronizeLocal])
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
            customSubmit={<>{status}</>}
            title={"Account " + status} data={{}} validator={validator} onSubmit={({ email, password }) => {
                setStatus("authenticating");
                authenticate(email, password, status, (result: string) => {
                    if (typeof result === "undefined") {
                        post({ color: "danger", id: "login-failure", message: "Failed to Authenticate" });
                        setStatus("idle")
                        return;
                    }
                    const account_credential = {
                        uid: byteArrayToBase64(new Uint8Array(hash.update(email).digest())),
                        password_hash: byteArrayToBase64(new Uint8Array(hash.update(password).digest()))
                    };
                    if (status === "create") {
                        if (typeof retrieveCredential(account_credential.uid) === "undefined") {
                            insertAccount(account_credential, account_credential.uid)
                            onLoginSuccess(result);
                        }
                        else {
                            post({ color: "danger", id: "account-failure", message: "Account Already Exists" });
                            setStatus("idle");
                        }
                    } else if (status === "login") {
                        if (retrieveCredential(account_credential.uid)?.password_hash === account_credential.password_hash) {
                            onLoginSuccess(result);
                        } else {
                            post({ color: "danger", id: "credential-failure", message: "Invalid username & Password combination" });
                            setStatus("idle");
                        }
                    }
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