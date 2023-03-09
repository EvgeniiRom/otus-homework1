type OperatorType = '+' | '-' | '*' | '/' | '^';

type Operator = {
    type: OperatorType;
    priority: number;
    operation(o1: number, o2: number): number;
};

const operatorList: Operator[] = [
    {
        type: '+',
        priority: 1,
        operation: (o1: number, o2: number) => {
            return o1 + o2;
        },
    },
    {
        type: '-',
        priority: 1,
        operation: (o1: number, o2: number) => {
            return o1 - o2;
        },
    },
    {
        type: '*',
        priority: 2,
        operation: (o1: number, o2: number) => {
            return o1 * o2;
        },
    },
    {
        type: '/',
        priority: 2,
        operation: (o1: number, o2: number) => {
            return o1 / o2;
        },
    },
    {
        type: '^',
        priority: 3,
        operation: (o1: number, o2: number) => {
            return Math.pow(o1, o2);
        },
    },
];

export const getOperator = (s: string): Operator | undefined => {
    return operatorList.find((item) => item.type === s);
};

export const execRPN = (rpn: (Operator | number)[]): number => {
    const stack: number[] = [];
    for (const element of rpn) {
        if (typeof element === 'number') {
            stack.push(element);
        } else {
            const o2 = stack.pop();
            const o1 = stack.pop();
            if (o1 !== undefined && o2 !== undefined) {
                stack.push(element.operation(o1, o2));
            }
        }
    }
    return stack[0];
};

export const sequenceToRPN = (s: string): (Operator | number)[] => {
    const elements = s
        .split(' ')
        .join('')
        .match(/((?<=(\d|\)))-(?=(\d|\()))|(-?\d+(\.\d+)*)|[+*/()^]/g);
    const stack: (Operator | number | '(')[] = [];
    const out: (Operator | number)[] = [];
    if (elements != null) {
        for (const element of elements) {
            const operator = getOperator(element);
            if (operator !== undefined) {
                while (stack.length > 0) {
                    const lastElement = stack[stack.length - 1];
                    if (
                        lastElement !== undefined &&
                        typeof lastElement !== 'number' &&
                        typeof lastElement !== 'string' &&
                        lastElement.priority >= operator.priority
                    ) {
                        out.push(lastElement);
                        stack.pop();
                    } else {
                        break;
                    }
                }
                stack.push(operator);
            } else if (element === '(') {
                stack.push(element);
            } else if (element === ')') {
                let lastElement = stack.pop();
                while (lastElement !== '(') {
                    if (lastElement === undefined) {
                        throw Error('Несоотвествие скобок');
                    }
                    out.push(lastElement);
                    lastElement = stack.pop();
                }
            } else {
                out.push(parseFloat(element));
            }
        }
        do {
            const element = stack.pop();
            if (element === '(') {
                throw Error('Несоотвествие скобок');
            }
            if (element !== undefined) {
                out.push(element);
            }
        } while (stack.length > 0);
        return out;
    }
    return [];
};
