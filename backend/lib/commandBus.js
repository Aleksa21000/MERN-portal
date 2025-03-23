class CommandBus {
    constructor() {
        this.handlers = new Map();
    }

    register(commandName, handler) {
        this.handlers.set(commandName, handler);
    }

    async execute(commandName, commandData) {
        if (!this.handlers.has(commandName)) {
            console.error(`Command not found: ${commandName}`);
            throw new Error(`Command not found: ${commandName}`);
        }

        try {
            console.log(`Executing command: ${commandName}`, commandData);
            const result = await this.handlers.get(commandName)(commandData);
            console.log(`Command executed successfully: ${commandName}`);
            return result;
        } catch (error) {
            console.error(`Error executing ${commandName}: ${error.message}`);
            throw new Error(`Error executing ${commandName}: ${error.message}`);
        }
    }
}

export const commandBus = new CommandBus();
