export const CounterModel = class extends EventTarget {
    constructor() {
        super();
        this.count = 0;
    }

    get() {
        return this.count;
    }

    add() {
        this.count++;
        this.dispatchEvent(new CustomEvent('save'));
    }
};
