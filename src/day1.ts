import { readNumbers } from "./util/input.js";

let moduleMasses = readNumbers("input/day1/input.txt");

/*
 * Part 1
 */
let fuel_part1 = 0;
for (const moduleMass of moduleMasses) {
    fuel_part1 += fuelRequirement(moduleMass);
}

console.log(`Part1: ${fuel_part1}`);

/*
 * Part 2
 */
let fuel_part2 = 0;
for (const moduleMass of moduleMasses) {
    let moduleFuel = 0;
    let extraFuel = fuelRequirement(moduleMass);
    while (extraFuel > 0) {
        moduleFuel += extraFuel
        extraFuel = fuelRequirement(extraFuel);
    }
    fuel_part2 += moduleFuel
}

console.log(`Part2: ${fuel_part2}`);

// Common Functions
function fuelRequirement(mass: number): number {
    return (Math.floor(mass / 3) - 2);
}