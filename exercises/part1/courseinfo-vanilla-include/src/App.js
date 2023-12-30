const Header = (course) => {
    const template = document.querySelector('template[data-component=Header]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('.header_title').textContent = course;
    };
    render();
    return root;
};

const Part = (name, exercises) => {
    const template = document.querySelector('template[data-component=Part]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('.part_part').textContent = `${name} ${exercises}`;
    };
    render();
    return root;
};

const Content = (parts) => {
    const template = document.querySelector('template[data-component=Content]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('.content_part1').replaceChildren(Part(parts[0].name, parts[0].exercises));
        root.querySelector('.content_part2').replaceChildren(Part(parts[1].name, parts[1].exercises));
        root.querySelector('.content_part3').replaceChildren(Part(parts[2].name, parts[2].exercises));
    };
    render();
    return root;
};

const Total = (parts) => {
    const template = document.querySelector('template[data-component=Total]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('.total_total').textContent = `Number of exercises ${
            parts[0].exercises + parts[1].exercises + parts[2].exercises
        }`;
    };
    render();
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

    const template = document.querySelector('template[data-component=App]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('.app_header').replaceChildren(Header(course));
        root.querySelector('.app_content').replaceChildren(Content(parts));
        root.querySelector('.app_total').replaceChildren(Total(parts));
    };
    render();
    return root;
};

export default App;
