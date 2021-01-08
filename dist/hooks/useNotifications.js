import create from "zustand";

/**
*  Push Notifications
*/
const useNotifications = create((set, store) => {
  return {
    status: "throttled",
    enable: () => {
      set({
        status: "ready"
      });
    },
    notices: [],
    dismiss: id => {
      const notices = [...store().notices.filter(notice => notice.id !== id)];
      set({
        notices
      });
    },
    post: notice => {
      if (store().status === "throttled") {
        return;
      }

      const notices = [...store().notices, notice];
      set({
        notices
      });
    }
  };
});
export default useNotifications;