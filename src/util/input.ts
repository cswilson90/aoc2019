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

function readFile(file: string): string[] {
    const data = fs.readFileSync(file, 'utf8');
    return data.split("\n");
}