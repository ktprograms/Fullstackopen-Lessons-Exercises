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

const Content = (parts) => {
    const root = document.createElement('div');
    root.appendChild(Part(parts[0].name, parts[0].exercises));
    root.appendChild(Part(parts[1].name, parts[1].exercises));
    root.appendChild(Part(parts[2].name, parts[2].exercises));
    return root;
};

const Total = (parts) => {
    const root = document.createElement('p');
    root.textContent = `Number of exercises: ${parts[0].exercises + parts[1].exercises + parts[2].exercises}`;
    return root;
};

const App = () => {
    const course = 'Half Stack application development';
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10,
        },
        {
            name: 'Using props to pass data',
            exercises: 7,
        },
        {
            name: 'State of a component',
            exercises: 14,
        },
    ];

    const root = document.createElement('div');
    root.appendChild(Header(course));
    root.appendChild(Content(parts));
    root.appendChild(Total(parts));
    return root;
};

export default App;
