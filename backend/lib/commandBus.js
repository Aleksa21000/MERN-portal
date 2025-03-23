class CommandBus {
    constructor() {
        this.handlers = new Map();
    }

    register(commandName, handler) {
        this.handlers.set(commandName, handler);
    }

    async execute(commandName, commandData) {
        if (!this.handlers.has(commandName)) {
            throw new Error(`Command not found: ${commandName}`);
        }
        try {
            return await this.handlers.get(commandName)(commandData);
        } catch (error) {
            throw new Error(`Error executing ${commandName}: ${error.message}`);
        }
    }
}

export const commandBus = new CommandBus();
