import { CounterModel } from '../models/Counter.model';

export const Counter = {
    $: {
        add: document.querySelector('#add'),
        displayCount(count) {
            document.querySelector('#count').textContent = count;
        },
    },
    Model: new CounterModel(),
    init() {
        Counter.Model.addEventListener('save', function () {
            Counter.$.displayCount(Counter.Model.get());
        });
        Counter.$.add.addEventListener('click', function () {
            Counter.Model.add();
        });
    },
};
