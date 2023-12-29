const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.',
    ];

    let selected = 0;
    let votes = anecdotes.map(() => 0);

    const getRandomInt = (max) => Math.floor(Math.random() * max);
    const getMaxVote = () => Math.max(...votes);
    const getIndexOfMax = () => votes.indexOf(getMaxVote());

    const root = document.createElement('div');
    const render = () => {
        const h1_anecdoteOfTheDay = document.createElement('h1');
        h1_anecdoteOfTheDay.textContent = 'Anecdote of the day';

        const t_anecdote = document.createTextNode(anecdotes[selected]);
        const t_votes = document.createTextNode(`has ${votes[selected]} votes`);

        const button_vote = document.createElement('button');
        button_vote.textContent = 'vote';
        button_vote.addEventListener('click', () => {
            votes[selected]++;
            render();
        });
        const button_nextAnecdote = document.createElement('button');
        button_nextAnecdote.textContent = 'next anecdote';
        button_nextAnecdote.addEventListener('click', () => {
            selected = getRandomInt(anecdotes.length);
            render();
        });

        const h1_anecdoteWithMostVotes = document.createElement('h1');
        h1_anecdoteWithMostVotes.textContent = 'Anecdote with most votes';
        const t_anecdoteWithMostVotes = document.createTextNode(anecdotes[getIndexOfMax()]);
        const t_mostVotes = document.createTextNode(`has ${getMaxVote()} votes`);

        root.replaceChildren(
            h1_anecdoteOfTheDay,
            t_anecdote,
            document.createElement('br'),
            t_votes,
            document.createElement('br'),
            button_vote,
            button_nextAnecdote,

            h1_anecdoteWithMostVotes,
            t_anecdoteWithMostVotes,
            document.createElement('br'),
            t_mostVotes
        );
    };
    render();
    return root;
};

export default App;
