const Header = (course) => {
    const root = document.createElement('h1');
    root.textContent = course;
    return root;
};

const Part = (part, exercises) => {
    const root = document.createElement('p');
    root.textContent = `${part} ${exercises}`;
    return root;
};

const Content = (part1, exercises1, part2, exercises2, part3, exercises3) => {
    const root = document.createElement('div');
    root.appendChild(Part(part1, exercises1));
    root.appendChild(Part(part2, exercises2));
    root.appendChild(Part(part3, exercises3));
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
