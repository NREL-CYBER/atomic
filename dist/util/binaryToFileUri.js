export const binaryToFileUri = (binary, type) => {
  var bytes = new Uint8Array(binary.length);

  for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

  const file = new File([bytes], "name", {
    type
  });
  return URL.createObjectURL(file);
};