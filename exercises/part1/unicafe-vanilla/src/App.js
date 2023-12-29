const Button = (text, onClick) => {
    const root = document.createElement('button');
    const render = () => {
        root.textContent = text;
        // Only happens and needed on self render call
        root.removeEventListener('click', onClick);
        root.addEventListener('click', onClick);
    };
    render();
    return root;
};

const StatisticsLine = (text, value) => {
    const root = document.createElement('tr');
    const render = () => {
        const td_text = document.createElement('td');
        td_text.textContent = text;

        const td_value = document.createElement('td');
        td_value.textContent = value;

        root.replaceChildren(
            td_text,
            td_value
        );
    };
    render();
    return root;
};

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
            const tbody = document.createElement('tbody');
            tbody.append(
                StatisticsLine('good', good),
                StatisticsLine('neutral', neutral),
                StatisticsLine('bad', bad),
                StatisticsLine('average', calculateAverage(good, neutral, bad)),
                StatisticsLine('positive', calculatePositive(good, neutral, bad))
            );

            const table = document.createElement('table');
            table.append(tbody);

            root.replaceChildren(table);
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
        const h1_giveFeedback = document.createElement('h1');
        h1_giveFeedback.textContent = 'Give Feedback';

        const div_buttons = document.createElement('div');
        div_buttons.replaceChildren(
            Button('good', () => {
                good++;
                render();
            }),
            Button('neutral', () => {
                neutral++;
                render();
            }),
            Button('bad', () => {
                bad++;
                render();
            })
        );

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
