let lowerRange = 145852;
let upperRange = 616942;

function splitToDigits(value: number): number[] {
    let digits = value.toString().split('');
    return digits.map(Number);
}

function hasAdjacentDigits(value: number): boolean {
    const digits = splitToDigits(value);
    let lastDigit: number = NaN;

    for (const digit of digits) {
        if (lastDigit !== NaN && digit == lastDigit) {
            return true;
        }
        lastDigit = digit;
    }

    return false;
}

function hasPairButNotMore(value: number): boolean {
    const digits = splitToDigits(value);

    let seenAPair = false;
    let matchingRun = 1;
    for (let i = 1; i < digits.length; i++) {
        if (digits[i] == digits[i-1]) {
            matchingRun++;
        } else {
            if (matchingRun == 2) {
                seenAPair = true;
            }
            matchingRun = 1;
        }
    }

    return (seenAPair || matchingRun == 2);
}

function nextAscendingNumber(value: number) : number {
    const digits = splitToDigits(value);

    for (let i = 0; i < digits.length - 1; i++) {
        if (digits[i] > digits[i+1]) {
            // Digits not in ascending order, return next number
            // where they will be
            digits[i+1] = digits[i];
        }
    }

    return Number(digits.join(''));
}

let part1ValidPasswords = 0;
let part2ValidPasswords = 0;
let currentNumber = nextAscendingNumber(lowerRange);
while (currentNumber <= upperRange) {
    if (hasAdjacentDigits(currentNumber)) {
        part1ValidPasswords++;
    }

    if (hasPairButNotMore(currentNumber)) {
        part2ValidPasswords++;
    }

    currentNumber++;
    currentNumber = nextAscendingNumber(currentNumber);
}

console.log(`Part 1 Answer: ${part1ValidPasswords}`);
console.log(`Part 2 Answer: ${part2ValidPasswords}`);
