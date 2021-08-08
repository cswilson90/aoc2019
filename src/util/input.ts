import fs from "fs";

export function readNumbers(file: string): number[] {
    const lines = readFile(file);

    let numbers: number[] = []
    let lineNum = 0;
    for (const line of lines) {
        lineNum++;

        if (line == '') {
            continue;
        }
        const number = Number(line);
        if (number == NaN) {
            throw `Line ${lineNum} of ${file} is not a number`;
        }
        numbers.push(number);
    }

    return numbers
}

export function readIntCode(file: string): number[] {
    const lines = readFile(file);

    if (lines.length == 0) {
        throw `Intcode input file ${file} contains no lines`;
    }

    return lines[0].split(',').map(function(stringCode: string): number {
        const numCode = Number(stringCode);
        if (numCode == NaN) {
            throw `Intcode from file ${file} contains the non-number ${stringCode}`;
        }
        return numCode;
    });
}

function readFile(file: string): string[] {
    const data = fs.readFileSync(file, 'utf8');
    return data.split("\n");
}