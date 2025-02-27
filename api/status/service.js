const store = require('../../utils/store')

const getStatus = (id) => {
    const result = store.get(id)

    if (!result) {
        throw new Error(`No file found with id: ${id}`)
    }

    return {
        uploadId: id,
        progress: `${result}%`
    }
}

module.exports = {
    getStatus
}