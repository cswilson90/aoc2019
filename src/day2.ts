import { readIntCode } from "./util/input.js";
import { IntcodeProgram } from "./util/intcodeprogram.js";

const intCode = readIntCode('./input/day2/input.txt');
const program = new IntcodeProgram(intCode);

/*
 * Part 1
 */
program.setAddressValue(1, 12);
program.setAddressValue(2, 2);
program.execute();
const part1Answer = program.getAddressValue(0);
console.log(`Part 1 answer: ${part1Answer}`);

/*
 * Part 2
 */
const part2Answer = findNounAndVerb(program, 19690720);
console.log(`Part 2 answer: ${part2Answer}`);

function findNounAndVerb(program: IntcodeProgram, target: number): number {
    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb <= 99; verb++) {
            program.reset();

            program.setAddressValue(1, noun);
            program.setAddressValue(2, verb);
            program.execute();

            if (program.getAddressValue(0) == target) {
                return (100 * noun) + verb;
            }
        }
    }
    return 0;
}
