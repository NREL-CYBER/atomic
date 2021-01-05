import create from "zustand";
import { AppColor } from "../theme/AppColor";



type Notice = {
    id: string,
    message: string,
    color?: AppColor,
    path?: string
}

/**
 * Type that defines what the useNotifications hook can do
 */
type NotificationService = {
    status: "ready" | "throttled"
    notices: Notice[]
    dismiss: (id: string) => void
    post: (notice: Notice) => void
    enable: () => void
}

/**
*  Push Notifications
*/
const useNotifications = create<NotificationService>((set, store) => {
    return ({
        status: "throttled",
        enable: () => {
            set({ status: "ready" })
        },
        notices: [],
        dismiss: (id) => {
            const notices = [...store().notices.filter(notice => notice.id !== id)]
            set({ notices });
        },
        post: (notice) => {
            if (store().status === "throttled") {
                return;
            }

            const notices = [...store().notices, notice]
            set({ notices });
        }
    })
});
export default useNotifications;