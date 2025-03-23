class QueryBus {
    constructor() {
        this.handlers = new Map();
    }

    register(queryName, handler) {
        this.handlers.set(queryName, handler);
    }

    async execute(queryName, queryData) {
        if (!this.handlers.has(queryName)) {
            console.error(`Query not found: ${queryName}`);
            throw new Error(`Query not found: ${queryName}`);
        }

        try {
            console.log(`Executing query: ${queryName}`, queryData);
            const result = await this.handlers.get(queryName)(queryData);
            console.log(`Query executed successfully: ${queryName}`);
            return result;
        } catch (error) {
            console.error(`Error executing ${queryName}: ${error.message}`);
            throw new Error(`Error executing ${queryName}: ${error.message}`);
        }
    }
}

export const queryBus = new QueryBus();
