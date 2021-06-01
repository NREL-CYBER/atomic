export const openUri = uri => {
  const confirmation_msg = "Open \n" + uri + "\nin a new window?";
  const electronIPCFound = typeof window.ipc !== "undefined";

  const openUriInNewWindow = () => electronIPCFound ? window.ipc.send('open-uri', uri) : window.open(uri);

  window.confirm(confirmation_msg) && openUriInNewWindow();
};