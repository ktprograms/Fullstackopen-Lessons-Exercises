const App = () => {
    const course = 'Half Stack application development';
    const part1 = 'Fundamentals of React';
    const exercises1 = 10;
    const part2 = 'Using props to pass data';
    const exercises2 = 7;
    const part3 = 'State of a component';
    const exercises3 = 14;

    const h1_header = document.createElement('h1');
    h1_header.textContent = course;
    const p_part1 = document.createElement('p');
    p_part1.textContent = `${part1} ${exercises1}`;
    const p_part2 = document.createElement('p');
    p_part2.textContent = `${part2} ${exercises2}`;
    const p_part3 = document.createElement('p');
    p_part3.textContent = `${part3} ${exercises3}`;
    const p_total = document.createElement('p');
    p_total.textContent = `Number of exercises: ${exercises1 + exercises2 + exercises3}`;

    const root = document.createElement('div');
    root.appendChild(h1_header);
    root.appendChild(p_part1);
    root.appendChild(p_part2);
    root.appendChild(p_part3);
    root.appendChild(p_total);
    return root;
};

export default App;
