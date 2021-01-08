/// <reference types="react" />
/// <reference types="@emotion/core" />
declare const rootRoute: {
    icon: string;
    path: string;
    title: string;
    component: import("react").FC<{}>;
    nested: {
        icon: string;
        path: string;
        title: string;
        component: import("react").FC<{}>;
    }[];
};
export default rootRoute;
