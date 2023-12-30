const Header = (course) => {
    const template = document.querySelector('template[data-component=Header]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('.header_title').textContent = course.name;
    };
    render();
    return root;
};

const Part = (key, name, exercises) => {
    const template = document.querySelector('template[data-component=Part]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.dataset.key = key;
        root.querySelector('.part_part').textContent = `${name} ${exercises}`;
    };
    render();
    return root;
};

const Content = (course) => {
    const template = document.querySelector('template[data-component=Content]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.querySelector('.content_parts').replaceChildren(
            ...course.parts.map((part) => Part(part.id, part.name, part.exercises))
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
        root.querySelector('.total_total').textContent = `Number of exercises ${
            course.parts.map((part) => part.exercises).reduce((acc, n) => acc + n, 0)
        }`;
    };
    render();
    return root;
};

const Course = (key, course) => {
    const template = document.querySelector('template[data-component=Course]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.dataset.key = key;
        root.querySelector('.course_header').replaceChildren(Header(course));
        root.querySelector('.course_content').replaceChildren(Content(course));
        root.querySelector('.course_total').replaceChildren(Total(course));
    };
    render();
    return root;
};

export default Course;
