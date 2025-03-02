const store = require('../../utils/store');
const validateEmail = require('../../utils/emailValidation');
const logger = require('../../utils/logger');

const processData = async (fileId, data) => {
    let curr = 0;
    const failed = [];

    let successCount = 0;
    for (const record of data) {
        curr++;
        logger.info(`Proccessing record ${curr} of ${data.length} for file ${fileId}`);

        let isValid = false;
        try {
            isValid = await validateEmail(record.email);
        } catch (err) {
            throw new Error('Validation timeout');
        }
        
        if (isValid) {
            successCount++;
            logger.info(`Successfully processed record ${curr} of ${data.length} for file ${fileId}`);
        } else {
            failed.push({...record, reason: 'invalid email'});
            logger.info(`Failed to process record ${curr} of ${data.length} for file ${fileId}`);
        }
        store.set(fileId, (curr/data.length)*100);
    }

    return {
        totlaRecords: data.length,
        processedRecords: successCount,
        failedRecords: failed.length,
        details: failed
    };
}

module.exports = {
    processData
};