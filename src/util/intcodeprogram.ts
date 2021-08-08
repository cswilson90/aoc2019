/**
 * Class for executing intcode programs
 */
export class IntcodeProgram {
    private initialMemory: number[];
    private memory: number[];

    constructor(memory: number[]) {
        this.initialMemory = memory;
        this.memory = [...this.initialMemory];
    }

    /**
     * Resets the program memory to it's initial values
     */
    reset() {
        this.memory = [...this.initialMemory];
    }

    /**
     * Returns the value at the given address in the memory
     */
    getAddressValue(address: number): number {
        return this.memory[address];
    }

    /**
     * Sets the value of the address in the memory.
     * Note: reseting the program will remove any set values.
     */
    setAddressValue(address: number, value: number) {
        this.memory[address] = value;
    }

    /**
     * Executes the opcode program, continuing until execution ends
     */
    execute() {
        let instructionPointer = 0
        let terminate = false;

        while (!terminate) {
            const opCode = this.memory[instructionPointer];
            const param1 = this.memory[instructionPointer + 1];
            const param2 = this.memory[instructionPointer + 2];
            const result = this.memory[instructionPointer + 3];

            terminate = this.executeOperation(opCode, param1, param2, result);
            instructionPointer += 4;
        }
    }

    /**
     * Executes a single opcode instruction
     * Returns true if the program should terminate
     */
    private executeOperation(opCode: number, param1Addr: number, param2Addr: number, resultAddr: number): boolean {
        let result = 0;
        const param1 = this.memory[param1Addr];
        const param2 = this.memory[param2Addr];

        switch (opCode) {
            case 1:
                result = param1 + param2;
                break;
            case 2:
                result = param1 * param2;
                break;
            case 99:
                return true;
                break;
            default:
                throw `Unknown opcode ${opCode}`;
        }

        this.memory[resultAddr] = result;
        return false;
    }
}
