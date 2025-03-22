class QueryBus {
    constructor() {
        this.handlers = new Map();
    }

    register(queryName, handler) {
        this.handlers.set(queryName, handler);
    }

    async execute(queryName, queryData) {
        if (!this.handlers.has(queryName)) {
            throw new Error(`Query not found: ${queryName}`);
        }
        try {
            return await this.handlers.get(queryName)(queryData);
        } catch (error) {
            throw new Error(`Error executing ${queryName}: ${error.message}`);
        }
    }
}

export const queryBus = new QueryBus();
