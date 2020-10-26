export function isEmptyObject(object) {
    if (typeof object != 'object') return false;
    for (let key in object) {
        return false;
    }
    return true;
}

export function json2Object(json) {
    let obj = json.reduce((prev, curr) => {
        prev[curr.key] = curr.value
        return prev
      }, {})
    return obj
}