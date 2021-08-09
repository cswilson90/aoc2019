import { readStrings } from "./util/input.js";
import { Wire } from "./util/wire.js";

let lines = readStrings('./input/day3.txt');

const wire1 = new Wire();
wire1.buildWire(lines[0].split(','));

const wire2 = new Wire();
wire2.buildWire(lines[1].split(','));

const answers = wire1.closestIntersects(wire2);
console.log(`Part 1 answer: ${answers[0]}`);
console.log(`Part 2 answer: ${answers[1]}`);
