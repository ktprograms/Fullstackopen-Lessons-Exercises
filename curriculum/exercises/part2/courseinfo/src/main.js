const course = {
    id: 1,
    name: 'Half Stack application development',
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
    ],
};

const View = {
    setHeader(header) {
        document.querySelector('#header').textContent = header;
    },
    setParts(parts) {
        const children = parts
            .map(function (part) {
                const child = document.createElement('p');
                child.dataset.id = part.id;
                child.textContent = part.name + ' ' + part.exercises;
                return child;
            });
        document.querySelector('#parts').replaceChildren(...children);
    },
};

const Controller = {
    init() {
        View.setHeader(course.name);
        View.setParts(course.parts);
    },
};

Controller.init();
