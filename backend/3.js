function solution(pin) {
    // You must complete the logic for the function that is provided
    // before compiling or submitting to avoid an error.

    // Write your code here
    const adjacentDigits = {
        '0': ['0', '8'],
        '1': ['1', '2', '4'],
        '2': ['2', '1', '3', '5'],
        '3': ['3', '2', '6'],
        '4': ['4', '1', '5', '7'],
        '5': ['5', '2', '4', '6', '8'],
        '6': ['6', '3', '5', '9'],
        '7': ['7', '4', '8'],
        '8': ['8', '5', '7', '9', '0'],
        '9': ['9', '6', '8']
    };

    if (pin === '') return [];

    const digits = pin.split('');
    const possibleDigits = digits.map(d => adjacentDigits[d]);

    const combinations = possibleDigits.reduce((acc, current) => {
        const temp = [];
        acc.forEach(a => {
            current.forEach(c => {
                temp.push(a + c);
            });
        });
        return temp;
    }, ['']);

    combinations.sort((a, b) => a.localeCompare(b));

    return combinations;

}