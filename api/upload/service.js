const store = require('../../utils/store')
const { mockValidateEmail } = require('../../utils/emailValidation')

const processData = async (fileId, data) => {
    let curr = 0
    const failed = []

    let successCount = 0
    for (const record of data) {
        curr++

        let isValid = false
        try {
            isValid = await mockValidateEmail(record.email)
        } catch (err) {
            throw new Error('Validation timeout')
        }
        
        if (isValid) {
            successCount++
        } else {
            failed.push({...record, reason: 'invalid email'})
        }
        store.set(fileId, (curr/data.length)*100)
    }

    return {
        totlaRecords: data.length,
        processedRecords: successCount,
        failedRecords: failed.length,
        details: failed
    }
}

module.exports = {
    processData
}