const App = () => {
    let good = 0;
    let neutral = 0;
    let bad = 0;

    const t_good = document.createTextNode(`good ${good}`);
    const t_neutral = document.createTextNode(`neutral ${neutral}`);
    const t_bad = document.createTextNode(`bad ${bad}`);

    const button_good = document.createElement('button');
    button_good.textContent = 'good';
    button_good.addEventListener('click', () => {
        good++;
        t_good.textContent = `good ${good}`;
    });
    const button_neutral = document.createElement('button');
    button_neutral.textContent = 'neutral';
    button_neutral.addEventListener('click', () => {
        neutral++;
        t_neutral.textContent = `neutral ${neutral}`;
    });
    const button_bad = document.createElement('button');
    button_bad.textContent = 'bad';
    button_bad.addEventListener('click', () => {
        bad++;
        t_bad.textContent = `bad ${bad}`;
    });

    const h1_giveFeedback = document.createElement('h1');
    h1_giveFeedback.textContent = 'Give Feedback';

    const div_buttons = document.createElement('div');
    div_buttons.appendChild(button_good);
    div_buttons.appendChild(button_neutral);
    div_buttons.appendChild(button_bad);

    const h1_statistics = document.createElement('h1');
    h1_statistics.textContent = 'Statistics';

    const div_statistics = document.createElement('div');
    div_statistics.appendChild(t_good);
    div_statistics.appendChild(document.createElement('br'));
    div_statistics.appendChild(t_neutral);
    div_statistics.appendChild(document.createElement('br'));
    div_statistics.appendChild(t_bad);

    const root = document.createElement('div');
    root.appendChild(h1_giveFeedback);
    root.appendChild(div_buttons);
    root.appendChild(h1_statistics);
    root.appendChild(div_statistics);
    return root;
};

export default App;
