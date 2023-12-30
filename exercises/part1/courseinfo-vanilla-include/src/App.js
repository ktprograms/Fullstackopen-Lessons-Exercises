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

const Content = (part1, exercises1, part2, exercises2, part3, exercises3) => {
    const template = document.querySelector('template[data-component=Content]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('.content_part1').replaceChildren(Part(part1, exercises1));
        root.querySelector('.content_part2').replaceChildren(Part(part2, exercises2));
        root.querySelector('.content_part3').replaceChildren(Part(part3, exercises3));
    };
    render();
    return root;
};

const Total = (exercises1, exercises2, exercises3) => {
    const template = document.querySelector('template[data-component=Total]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('.total_total').textContent = `Number of exercises ${exercises1 + exercises2 + exercises3}`;
    };
    render();
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

    const template = document.querySelector('template[data-component=App]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('.app_header').replaceChildren(Header(course));
        root.querySelector('.app_content').replaceChildren(Content(part1, exercises1, part2, exercises2, part3, exercises3));
        root.querySelector('.app_total').replaceChildren(Total(exercises1, exercises2, exercises3));
    };
    render();
    return root;
};

export default App;
