export default function clubIdGenerator(params) {
    for (let i = 0; i < params.length; i++) {
        const element = params[i];
        let newId = Math.floor(Math.random() * 1000).toString()
        if (element.clubId !== newId) {
            return newId
        } else {
            return false
        }
    }
}
