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
        root.querySelector('#content_part1').replaceChildren(Part(course.parts[0].name, course.parts[0].exercises));
        root.querySelector('#content_part2').replaceChildren(Part(course.parts[1].name, course.parts[1].exercises));
        root.querySelector('#content_part3').replaceChildren(Part(course.parts[2].name, course.parts[2].exercises));
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
            course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
        }`;
    };
    render();
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

    const template = document.querySelector('template[data-component=App]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('#app_header').replaceChildren(Header(course));
        root.querySelector('#app_content').replaceChildren(Content(course));
        root.querySelector('#app_total').replaceChildren(Total(course));
    };
    render();
    return root;
};

export default App;
