import { execRPN, sequenceToRPN } from './parser';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Input sequence\n', (sequence: string) => {
    console.log(execRPN(sequenceToRPN(sequence)));
    rl.close();
});
