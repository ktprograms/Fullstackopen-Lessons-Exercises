const Header = (course) => {
    const root = document.createElement('h1');
    root.textContent = course;
    return root;
};

const Content = (part1, exercises1, part2, exercises2, part3, exercises3) => {
    const p_part1 = document.createElement('p');
    p_part1.textContent = `${part1} ${exercises1}`;
    const p_part2 = document.createElement('p');
    p_part2.textContent = `${part2} ${exercises2}`;
    const p_part3 = document.createElement('p');
    p_part3.textContent = `${part3} ${exercises3}`;

    const root = document.createElement('div');
    root.appendChild(p_part1);
    root.appendChild(p_part2);
    root.appendChild(p_part3);
    return root;
};

const Total = (exercises1, exercises2, exercises3) => {
    const root = document.createElement('p');
    root.textContent = `Number of exercises: ${exercises1 + exercises2 + exercises3}`;
    return root;
};

const App = () => {
    const course = 'Half Stack application development';
    const part1 = 'Fundamentals of React';
    const exercises1 = 10;
    const part2 = 'Using props to pass data';
    const exercises2 = 7;
    const part3 = 'State of a component';
    const exercises3 = 14;

    const root = document.createElement('div');
    root.appendChild(Header(course));
    root.appendChild(Content(part1, exercises1, part2, exercises2, part3, exercises3));
    root.appendChild(Total(exercises1, exercises2, exercises3));
    return root;
};

export default App;
