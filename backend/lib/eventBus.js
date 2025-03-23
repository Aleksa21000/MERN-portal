class EventBus {
    constructor() {
        this.handlers = new Map();
    }

    register(eventName, handler) {
        if (!this.handlers.has(eventName)) {
            this.handlers.set(eventName, []);
        }
        this.handlers.get(eventName).push(handler);
    }

    async publish(eventName, eventData) {
        if (!this.handlers.has(eventName)) {
            console.warn(`No handlers registered for event: ${eventName}`);
            return;
        }

        const handlers = this.handlers.get(eventName);
        for (const handler of handlers) {
            try {
                await handler(eventData);
            } catch (error) {
                console.error(`Error in event ${eventName} handler: ${error.message}`);
            }
        }
    }
}

export const eventBus = new EventBus();
