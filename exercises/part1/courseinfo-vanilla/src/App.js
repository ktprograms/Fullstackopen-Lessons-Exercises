const Header = (course) => {
    const root = document.createElement('h1');
    root.textContent = course.name;
    return root;
};

const Part = (name, exercises) => {
    const root = document.createElement('p');
    root.textContent = `${name} ${exercises}`;
    return root;
};

const Content = (course) => {
    const root = document.createElement('div');
    root.appendChild(Part(course.parts[0].name, course.parts[0].exercises));
    root.appendChild(Part(course.parts[1].name, course.parts[1].exercises));
    root.appendChild(Part(course.parts[2].name, course.parts[2].exercises));
    return root;
};

const Total = (course) => {
    const root = document.createElement('p');
    root.textContent = `Number of exercises: ${
        course.parts[0].exercises
        + course.parts[1].exercises
        + course.parts[2].exercises
    }`;
    return root;
};

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
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
        ],
    };

    const root = document.createElement('div');
    root.appendChild(Header(course));
    root.appendChild(Content(course));
    root.appendChild(Total(course));
    return root;
};

export default App;
