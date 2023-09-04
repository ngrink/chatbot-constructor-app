export function choice(array) {
    const n = array.length;
    const i = Math.floor(Math.random() * n)
    return array[i];
}
