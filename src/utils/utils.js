export function convertJSONToObject(data) {
    const dataString = JSON.stringify(data)
    return JSON.parse(dataString);
}