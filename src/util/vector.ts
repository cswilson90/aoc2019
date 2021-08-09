export class Vector2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
    }

    manhattanDistance(): number {
        return Math.abs(this.x) + Math.abs(this.y);
    }
}
