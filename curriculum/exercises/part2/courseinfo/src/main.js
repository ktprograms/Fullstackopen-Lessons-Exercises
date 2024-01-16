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
    setTotal(total) {
        document.querySelector('#total').textContent = total;
    },
};

const Controller = {
    init() {
        View.setHeader(course.name);
        View.setParts(course.parts);
        View.setTotal(Controller.calculateTotal(course.parts));
    },

    calculateTotal(parts) {
        return parts
            .map(function (part) {
                return part.exercises;
            })
            .reduce(function (acc, n) {
                return acc + n;
            }, 0);
    },
};

Controller.init();
