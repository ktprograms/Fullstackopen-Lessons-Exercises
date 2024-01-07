const Counter = {
    $: {
        add: document.querySelector('#add'),
        displayCount: (count) => {
            document.querySelector('#count').textContent = count;
        },
    },
    $model: {
        count: 0,
        setCount: (newCount) => {
            Counter.$model.count = newCount;
            return Counter.$model.count;
        },
    },
    init: () => {
        Counter.$.add.addEventListener('click', () => {
            const count = Counter.$model.setCount(Counter.$model.count + 1);
            Counter.$.displayCount(count);
        });
    },
};

export default Counter;
