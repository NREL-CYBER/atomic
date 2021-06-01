export const openUri = uri => {
  if (typeof window.ipc !== "undefined") window.confirm("Open " + uri + "in a new window?") && window.ipc.send('open-uri', uri);else {
    window.confirm("Open " + uri + "in a new window?") && window.open(uri);
  }
};