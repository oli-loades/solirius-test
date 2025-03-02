const validateEmail = require('./emailValidation');

describe('Email validation', () => {
    it('should return true for a valid email', async () => {
        const result = await validateEmail('test@email.com');
        expect(result).toBe(true);
    });

    it('should return false for an invalid email', async () => {
        const result = await validateEmail('testemail.com');
        expect(result).toBe(false);
    });
});