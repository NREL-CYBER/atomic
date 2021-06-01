
export const openUri = (uri: string) => {
    if (typeof (window as any).ipc !== "undefined")
        window.confirm("Open " + uri + "in a new window?") && (window as any).ipc.send('open-uri', uri)
    else {
        window.confirm("Open " + uri + "in a new window?") && window.open(uri);
    }
}
