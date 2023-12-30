const App = () => {
    const course = 'Half Stack application development';
    const part1 = 'Fundamentals of React';
    const exercises1 = 10;
    const part2 = 'Using props to pass data';
    const exercises2 = 7;
    const part3 = 'State of a component';
    const exercises3 = 14;

    const template = document.querySelector('template[data-component=App]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('.title').textContent = course;
        root.querySelector('.part1').textContent = `${part1} ${exercises1}`;
        root.querySelector('.part2').textContent = `${part2} ${exercises2}`;
        root.querySelector('.part3').textContent = `${part3} ${exercises3}`;
        root.querySelector('.total').textContent = `Number of exercises ${exercises1 + exercises2 + exercises3}`;
    };
    render();
    return root;
};

export default App;
