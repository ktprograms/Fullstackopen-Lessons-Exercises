const Header = (course) => {
    const template = document.querySelector('template[data-component=Header]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('#header_title').textContent = course.name;
    };
    render();
    return root;
};

const Part = (name, exercises) => {
    const template = document.querySelector('template[data-component=Part]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('#part_part').textContent = `${name} ${exercises}`;
    };
    render();
    return root;
};

const Content = (course) => {
    const template = document.querySelector('template[data-component=Content]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('#content_parts').replaceChildren(
            ...course.parts.map((part) => Part(part.name, part.exercises))
        );
    };
    render();
    return root;
};

const Total = (course) => {
    const template = document.querySelector('template[data-component=Total]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('#total_total').textContent = `Number of exercises ${
            course.parts.map((part) => part.exercises).reduce((acc, n) => acc + n, 0)
        }`;
    };
    render();
    return root;
};

const Course = (course) => {
    const template = document.querySelector('template[data-component=Course]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('#course_header').replaceChildren(Header(course));
        root.querySelector('#course_content').replaceChildren(Content(course));
        root.querySelector('#course_total').replaceChildren(Total(course));
    };
    render();
    return root;
};

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1,
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2,
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3,
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4,
                },
            ],
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1,
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ];

    const template = document.querySelector('template[data-component=App]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('#app_courses').replaceChildren(
            ...courses.map((course) => Course(course))
        );
    };
    render();
    return root;
};

export default App;
