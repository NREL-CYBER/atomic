export const openUri = uri => {
  const confirmation_msg = "Would you like to \nOpen " + uri + "\nin a new window with your default browser?";
  const electronIPCFound = typeof window.ipc !== "undefined";

  const openUriInNewWindow = () => electronIPCFound ? window.ipc.send('open-uri', uri) : window.open(uri);

  window.confirm(confirmation_msg) && openUriInNewWindow();
};