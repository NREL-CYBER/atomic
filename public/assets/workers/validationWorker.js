
/* eslint-disable no-restricted-globals */
// eslint-disable-next-line no-unused-vars
var module = {}
// eslint-disable-next-line no-undef
importScripts("./ajv.js")
console.log(self);
const ajv = new self.ajv7.default()
ajv.addFormat('date-time', () => true)
ajv.addFormat('uri', () => true)
ajv.addFormat('uri-reference', () => true)
ajv.addFormat('email', () => true)
ajv.addFormat('date', () => true)
self.onmessage = ({ data }) => {
    let { rootSchema, objectSchema, property, uuid, instance } = data
    if (typeof objectSchema.$id === 'undefined') {
        objectSchema.$id = btoa(JSON.stringify(objectSchema));
    }
    const path = rootSchema.$id + objectSchema.$id
    if (ajv.getSchema(rootSchema.$id) === undefined) {
        ajv.addSchema(rootSchema);
    }
    let validationFunction = ajv.getSchema(path)
    if (!validationFunction) {
        ajv.addSchema(objectSchema, path);
        validationFunction = ajv.getSchema(path)
    }
    validationFunction(instance.current);
    const errors = validationFunction.errors || [];
    postMessage({ errors, property, uuid })
}