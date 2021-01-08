import { AppColor } from "../theme/AppColor";
declare type Notice = {
    id: string;
    message: string;
    color?: AppColor;
    path?: string;
};
/**
 * Type that defines what the useNotifications hook can do
 */
declare type NotificationService = {
    status: "ready" | "throttled";
    notices: Notice[];
    dismiss: (id: string) => void;
    post: (notice: Notice) => void;
    enable: () => void;
};
/**
*  Push Notifications
*/
declare const useNotifications: import("zustand").UseStore<NotificationService>;
export default useNotifications;
