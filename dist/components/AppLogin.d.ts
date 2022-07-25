import React from 'react';
import { AppSerializationConfig } from '../util/AppConfig';
export interface credential {
    email: string;
    password: string;
}
/**
 * Sha3 hash then convert to base64 and then to HEX
 * It's a really long string now... there is probably a better solution that is URI safe.
 * @param sensitive
 */
export declare const hash_sensitive_info: (sensitive: string) => string;
declare const _default: React.NamedExoticComponent<{
    serialization?: AppSerializationConfig;
    onLoginSuccess: (uid: string) => void;
    authenticate: (email: string, password: string, operation: "create" | "login", onAuthenticated: (uid: string) => void) => Promise<string>;
}>;
export default _default;
