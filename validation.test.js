const { validateEmail, validatePhone } = require('./script.js');

describe('Email Validation', () => {
    test('Valid email should return true', () => {
        expect(validateEmail('student@muet.edu.pk')).toBe(true);
        expect(validateEmail('test@example.com')).toBe(true);
    });

    test('Invalid email should return false', () => {
        expect(validateEmail('invalidEmail')).toBe(false);
        expect(validateEmail('test@')).toBe(false);
        expect(validateEmail('@example.com')).toBe(false);
        expect(validateEmail('')).toBe(false);
    });
});

describe('Phone Validation', () => {
    test('Valid phone should return true', () => {
        expect(validatePhone('03001234567')).toBe(true);
        expect(validatePhone('1234567890')).toBe(true);
    });

    test('Invalid phone should return false', () => {
        expect(validatePhone('123')).toBe(false);
        expect(validatePhone('abcd123456')).toBe(false);
        expect(validatePhone('')).toBe(false);
    });
});