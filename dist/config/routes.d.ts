/// <reference types="react" />
import { AppRoute } from "atomic";
export declare const submenuRoute: AppRoute;
declare const routes: ({
    icon: string;
    path: string;
    title: string;
    component: import("react").FC<{}>;
    exact: boolean;
} | {
    icon: string;
    path: string;
    title: string;
    component: import("react").FC<{}>;
    exact?: undefined;
})[];
export default routes;
