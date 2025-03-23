class EventBus {
    constructor() {
        this.handlers = new Map();
    }

    register(eventName, handler) {
        this.handlers.set(eventName, handler);
    }

    async publish(eventName, eventData) {
        if (!this.handlers.has(eventName)) {
            throw new Error(`Event not found: ${eventName}`);
        }

        try {
            await this.handlers.get(eventName)(eventData);
        } catch (error) {
            console.error(`Error publishing event ${eventName}: ${error.message}`);
        }
    }
}

export const eventBus = new EventBus();
