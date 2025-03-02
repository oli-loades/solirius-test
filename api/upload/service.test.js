const store = require("../../utils/store");
const { processData } = require('./service');

describe('Upload Service', () => {
    const fileId = '123';

    const validData = [
        { name: 'John', email: 'test@email.com' },
        { name: 'Jane', email: 'test@example.com' }
    ];
    const invalidData = [
        { name: 'inavlid', email: 'invalid-email1' },
        { name: 'test', email: 'test' }
    ];

    beforeEach(() => {
        store.clear();
    });

    it('should return the correct data when given valid emails', async () => {
        const result = await processData(fileId, validData);
        expect(result).toStrictEqual({
            totlaRecords: 2,
            processedRecords: 2,
            failedRecords: 0,
            details: []
        });
    });

    it('should return the correct data when given invalid emails', async () => {
        const result = await processData(fileId, invalidData);
        expect(result).toStrictEqual({
            totlaRecords: 2,
            processedRecords: 0,
            failedRecords: 2,
            details: [{
                name: 'inavlid',
                email: 'invalid-email1',
                reason: 'invalid email'
            },
            {
                name: 'test',
                email: 'test',
                reason: 'invalid email'
            }]
        });
    });

    it('should return the correct data when given both valid and invalid emails', async () => {
        const result = await processData(fileId, [...validData, ...invalidData]);
        expect(result).toStrictEqual({
            totlaRecords: 4,
            processedRecords: 2,
            failedRecords: 2,
            details: [{
                name: 'inavlid',
                email: 'invalid-email1',
                reason: 'invalid email'
            },
            {
                name: 'test',
                email: 'test',
                reason: 'invalid email'
            }]
        });
    });

    it('should udpate store', async () => {
        await processData(fileId, validData);
        expect(store.size).toEqual(1);
    });
});