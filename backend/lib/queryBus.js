class QueryBus {
    constructor() {
        this.handlers = new Map();
    }

    register(queryName, handler) {
        this.handlers.set(queryName, handler);
    }

    async execute(queryName, queryData) {
        if (!this.handlers.has(queryName)) {
            throw new Error(`No handler registered for query: ${queryName}`);
        }
        return await this.handlers.get(queryName)(queryData);
    }
}

export const queryBus = new QueryBus();
