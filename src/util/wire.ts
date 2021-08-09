import { Vector2D } from "./vector.js"

export class Wire {
    Edges: WireEdge[] = [];

    buildWire(instructions: string[]) {
        // Initialise start point
        let x = 0;
        let y = 0;

        const instructionRegexp = /^(D|L|R|U)(\d+)$/;
        for (const instruction of instructions) {
            const matches = instructionRegexp.exec(instruction);
            if (matches === null) {
                throw `Error parsing instruction: ${instruction}`;
            }

            const op = matches[1];
            let length = Number(matches[2]);
            if (length === NaN) {
                throw `Error parsing wire instruction "${instruction}" number`;
            }

            let newX = x;
            let newY = y;
            switch (op) {
                case 'D':
                    length = -length;
                case 'U':
                    newY = y + length;
                    break;
                case 'L':
                    length = -length;
                case 'R':
                    newX = x + length;
                    break;
                default:
                    throw `Unknown wire building op ${op}`;
            }

            this.Edges.push(new WireEdge(new Vector2D(x, y), new Vector2D(newX, newY)));
            x = newX;
            y = newY;
        }
    }

    closestIntersects(otherWire: Wire): [number, number] {
        let closestToSoure = Infinity;
        let shortestWire = Infinity;

        let thisLength = 0;
        for (const thisEdge of this.Edges) {
            let otherLength = 0;

            for (const otherEdge of otherWire.Edges) {
                const intersect = thisEdge.intersection(otherEdge);
                if (intersect !== null) {
                    //console.log(`Found intersect: (${intersect.x}, ${intersect.y})`);
                    const distance = intersect.manhattanDistance();
                    if (distance > 0) {
                        if (distance < closestToSoure) {
                            closestToSoure = intersect.manhattanDistance();
                        }

                        const wirelength = thisLength + thisEdge.distanceToIntersect(intersect) + otherLength + otherEdge.distanceToIntersect(intersect);
                        if (wirelength < shortestWire) {
                            shortestWire = wirelength;
                        }
                    }
                }
                otherLength += otherEdge.length();
            }
            thisLength += thisEdge.length();
        }

        return [closestToSoure, shortestWire];
    }

    printWire() {
        console.log("Wires:");
        for (const wire of this.Edges) {
            console.log(`${wire}`);
        }
    }
}

// Represents a vertical portion of a wire (same x value section)
class WireEdge {
    start: Vector2D;
    end: Vector2D;
    // Would have been better to do this as different sub classes
    direction: "vertical" | "horizontal";

    constructor(start: Vector2D, end: Vector2D) {
        this.start = start;
        this.end = end;

        if (start.x == end.x) {
            this.direction = "vertical";
        } else if (start.y == end.y) {
            this.direction = "horizontal";
        } else {
            throw `Wire is not horizontal or vertical: ${this}`;
        }
    }

    toString(): string {
        return `(${this.start}, ${this.end})`;
    }

    /**
     * Returns the point where the wires intersect
     * Returns null if they don't intersect
     */
    intersection(otherWire: WireEdge): Vector2D | null {
        if (this.direction == otherWire.direction) {
            return null;
        }

        if (this.direction == "vertical") {
            let minX = Math.min(otherWire.start.x, otherWire.end.x);
            let maxX = Math.max(otherWire.start.x, otherWire.end.x);
            if (this.start.x < minX || this.start.x > maxX) {
                return null;
            }

            let minY = Math.min(this.start.y, this.end.y);
            let maxY = Math.max(this.start.y, this.end.y);
            if (otherWire.start.y < minY || otherWire.start.y > maxY) {
                return null;
            }
        } else {
            return otherWire.intersection(this);
        }

        return new Vector2D(this.start.x, otherWire.start.y);
    }

    length(): number {
        if (this.direction == "vertical") {
            return Math.abs(this.end.y - this.start.y);
        }
        return Math.abs(this.end.x - this.start.x);
    }

    distanceToIntersect(intersect: Vector2D): number {
        if (this.direction == "vertical") {
            if (intersect.x != this.start.x) {
                throw `Point ${intersect} does not intersect edge ${this}`;
            }
            return Math.abs(intersect.y - this.start.y);
        } else {
            if (intersect.y != this.start.y) {
                throw `Point ${intersect} does not intersect edge ${this}`;
            }
            return Math.abs(intersect.x - this.start.x);
        }
    }
}
