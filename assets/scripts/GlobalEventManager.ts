import { EventTarget } from 'cc';

class GlobalEventManager {
    private static instance: EventTarget;

    private constructor() { }

    public static getInstance(): EventTarget {
        if (!GlobalEventManager.instance) {
            GlobalEventManager.instance = new EventTarget();
        }
        return GlobalEventManager.instance;
    }
}

export default GlobalEventManager;
