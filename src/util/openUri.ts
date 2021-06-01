
export const openUri = (uri: string) => {
    const confirmation_msg = "Open \n" + uri + "\nin a new window?";
    const electronIPCFound = typeof (window as any).ipc !== "undefined";
    const openUriInNewWindow = () => electronIPCFound ? (window as any).ipc.send('open-uri', uri) : window.open(uri);
    window.confirm(confirmation_msg) && openUriInNewWindow();
}
