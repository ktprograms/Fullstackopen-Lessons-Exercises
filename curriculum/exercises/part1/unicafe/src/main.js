const Model = {
    good: 0,
    neutral: 0,
    bad: 0,

    setGood(good) {
        Model.good = good;
    },
    setNeutral(neutral) {
        Model.neutral = neutral;
    },
    setBad(bad) {
        Model.bad = bad;
    },
};

const View = {
    registerOnGoodClick(handler) {
        document.querySelector('#button-good').addEventListener('click', handler);
    },
    registerOnNeutralClick(handler) {
        document.querySelector('#button-neutral').addEventListener('click', handler);
    },
    registerOnBadClick(handler) {
        document.querySelector('#button-bad').addEventListener('click', handler);
    },

    setGood(good) {
        document.querySelector('#text-good').textContent = good;
    },
    setNeutral(neutral) {
        document.querySelector('#text-neutral').textContent = neutral;
    },
    setBad(bad) {
        document.querySelector('#text-bad').textContent = bad;
    },
};

const Controller = {
    init() {
        View.registerOnGoodClick(Controller.handleGoodClick);
        View.registerOnNeutralClick(Controller.handleNeutralClick);
        View.registerOnBadClick(Controller.handleBadClick);
    },

    handleGoodClick() {
        Model.setGood(Model.good + 1);
        View.setGood(Model.good);
    },
    handleNeutralClick() {
        Model.setNeutral(Model.neutral + 1);
        View.setNeutral(Model.neutral);
    },
    handleBadClick() {
        Model.setBad(Model.bad + 1);
        View.setBad(Model.bad);
    },
};

Controller.init();
