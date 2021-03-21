export default function divide(str, type) {
    str.split(" ")
    let i = str.indexOf(type)
    return [
        str.slice(0, i).trim(),
        str.slice(i + 2, str.length).trim()
    ]
}