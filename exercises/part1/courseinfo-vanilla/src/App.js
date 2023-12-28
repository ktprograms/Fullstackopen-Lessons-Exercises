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

const Content = (part1, part2, part3) => {
    const root = document.createElement('div');
    root.appendChild(Part(part1.name, part1.exercises));
    root.appendChild(Part(part2.name, part2.exercises));
    root.appendChild(Part(part3.name, part3.exercises));
    return root;
};

const Total = (part1, part2, part3) => {
    const root = document.createElement('p');
    root.textContent = `Number of exercises: ${part1.exercises + part2.exercises + part3.exercises}`;
    return root;
};

const App = () => {
    const course = 'Half Stack application development';
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10,
    };
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7,
    };
    const part3 = {
        name: 'State of a component',
        exercises: 14,
    };

    const root = document.createElement('div');
    root.appendChild(Header(course));
    root.appendChild(Content(part1, part2, part3));
    root.appendChild(Total(part1, part2, part3));
    return root;
};

export default App;
