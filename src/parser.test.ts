import { getOperator, sequenceToRPN, execRPN } from "./parser";

describe('operators', () => {
    it('check \'+\'', () => {
        expect(getOperator('+')?.operation(2, 5)).toBe(7);
    });
    it('check \'-\'', () => {
        expect(getOperator('-')?.operation(4, 1)).toBe(3);
    });
    it('check \'*\'', () => {
        expect(getOperator('*')?.operation(4, 5)).toBe(20);
    });
    it('check \'/\'', () => {
        expect(getOperator('/')?.operation(36, 6)).toBe(6);
    });
    it('check \'^\'', () => {
        expect(getOperator('^')?.operation(2, 10)).toBe(1024);
    });
})


describe('sequence parser', () => {
    it('2*2=4', () => {
        expect(execRPN(sequenceToRPN('2+2'))).toBe(4);
    });
    it('2+2*2=6', () => {
        expect(execRPN(sequenceToRPN('2+2*2'))).toBe(6);
    });
    it('3+4*2/(1-5)^2=3.5', () => {
        expect(execRPN(sequenceToRPN('3+4*2/(1-5)^2'))).toBe(3.5);
    });
    it('1.6+5.3=6.9', () => {
        expect(execRPN(sequenceToRPN('1.6+5.3'))).toBe(6.9);
    });
    it('10^-5=Math.pow(10, -5)', () => {
        expect(execRPN(sequenceToRPN('10^-5'))).toBe(Math.pow(10, -5));
    });
})