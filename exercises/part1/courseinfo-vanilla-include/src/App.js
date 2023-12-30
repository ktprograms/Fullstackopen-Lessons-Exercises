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

const Content = (part1, part2, part3) => {
    const template = document.querySelector('template[data-component=Content]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('.content_part1').replaceChildren(Part(part1.name, part1.exercises));
        root.querySelector('.content_part2').replaceChildren(Part(part2.name, part2.exercises));
        root.querySelector('.content_part3').replaceChildren(Part(part3.name, part3.exercises));
    };
    render();
    return root;
};

const Total = (part1, part2, part3) => {
    const template = document.querySelector('template[data-component=Total]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('.total_total').textContent = `Number of exercises ${
            part1.exercises + part2.exercises + part3.exercises
        }`;
    };
    render();
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

    const template = document.querySelector('template[data-component=App]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('.app_header').replaceChildren(Header(course));
        root.querySelector('.app_content').replaceChildren(Content(part1, part2, part3));
        root.querySelector('.app_total').replaceChildren(Total(part1, part2, part3));
    };
    render();
    return root;
};

export default App;
