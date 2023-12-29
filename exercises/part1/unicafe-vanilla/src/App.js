const Statistics = (good, neutral, bad) => {
    const calculateAverage = (good, neutral, bad) => (
        (good + (bad * -1)) / (good + neutral + bad)
    );

    const calculatePositive = (good, neutral, bad) => (
        (good / (good + neutral + bad)) * 100
    );

    const root = document.createElement('div');
    const render = () => {
        if (good + neutral + bad > 0) {
            const t_good = document.createTextNode(`good ${good}`);
            const t_neutral = document.createTextNode(`neutral ${neutral}`);
            const t_bad = document.createTextNode(`bad ${bad}`);
            const t_average = document.createTextNode(`average ${calculateAverage(good, neutral, bad)}`);
            const t_positive = document.createTextNode(`positive ${calculatePositive(good, neutral, bad)}`);

            root.replaceChildren(
                t_good,
                document.createElement('br'),
                t_neutral,
                document.createElement('br'),
                t_bad,
                document.createElement('br'),
                t_average,
                document.createElement('br'),
                t_positive
            );
        } else {
            root.replaceChildren('No feedback given');
        }
    };
    render();
    return root;
};

const App = () => {
    let good = 0;
    let neutral = 0;
    let bad = 0;

    const root = document.createElement('div');
    const render = () => {
        const button_good = document.createElement('button');
        button_good.textContent = 'good';
        button_good.addEventListener('click', () => {
            good++;
            render();
        });
        const button_neutral = document.createElement('button');
        button_neutral.textContent = 'neutral';
        button_neutral.addEventListener('click', () => {
            neutral++;
            render();
        });
        const button_bad = document.createElement('button');
        button_bad.textContent = 'bad';
        button_bad.addEventListener('click', () => {
            bad++;
            render();
        });

        const h1_giveFeedback = document.createElement('h1');
        h1_giveFeedback.textContent = 'Give Feedback';

        const div_buttons = document.createElement('div');
        div_buttons.appendChild(button_good);
        div_buttons.appendChild(button_neutral);
        div_buttons.appendChild(button_bad);

        const h1_statistics = document.createElement('h1');
        h1_statistics.textContent = 'Statistics';

        root.replaceChildren(
            h1_giveFeedback,
            div_buttons,
            h1_statistics,
            Statistics(good, neutral, bad)
        );
    };
    render();
    return root;
};

export default App;
