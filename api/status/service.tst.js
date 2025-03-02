const { getStatus } = require('./service'); 
const store = require("../../utils/store");

describe('Status Service', () => {
    const fileId = '123';
    const invalidFileId = '321';

    beforeEach(() => {
        store.clear();
        store.set(fileId, 50);
    })

    it('should return the correct progress for a given fileId', () => {
        const result = getStatus(fileId);
        expect(result).toStrictEqual({
            uploadId: fileId,
            progress: '50%'
        });
    })

    it('should throw an error when file is not found by id', () => {
        expect(() => {
            getStatus(invalidFileId);
        }).toThrow(`No file found with id: ${invalidFileId}`);
    })
})