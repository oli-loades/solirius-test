let map

const store = () => {
    if (!map) {
        return new Map()
    } else {
        return map
    }
}

module.exports = store