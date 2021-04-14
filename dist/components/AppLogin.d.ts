import React from 'react';
declare const _default: React.NamedExoticComponent<{
    onLoginSuccess: (uid: string) => void;
    authenticate: (email: string, password: string, operation: "create" | "login", onAuthenticated: (uid: string) => void) => Promise<string>;
}>;
export default _default;
