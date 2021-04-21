export const binaryToFileUri = (binary: string, type: string) => {
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++)
        bytes[i] = binary.charCodeAt(i);
    const file = new File([bytes], "name", { type });
    return URL.createObjectURL(file);
}

export const binaryToString = (binary: string) => {
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++)
        bytes[i] = binary.charCodeAt(i);
    return URL.createObjectURL(file);
}
