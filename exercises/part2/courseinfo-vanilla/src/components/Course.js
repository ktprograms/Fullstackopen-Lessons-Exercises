const Header = (course) => {
    const root = document.createElement('h1');
    const render = () => {
        root.textContent = course.name;
    };
    render();
    return root;
};

const Part = (name, exercises) => {
    const root = document.createElement('p');
    const render = () => {
        root.textContent = `${name} ${exercises}`;
    };
    render();
    return root;
};

const Content = (course) => {
    const root = document.createElement('div');
    const render = () => {
        root.replaceChildren(...course.parts.map((part) => Part(part.name, part.exercises)));
    };
    render();
    return root;
};

const Total = (course) => {
    const root = document.createElement('b');
    const render = () => {
        root.textContent = `total of ${
            course
                .parts
                .map((part) => part.exercises)
                .reduce((acc, n) => acc + n, 0)
        } exercises`;
    };
    render();
    return root;
};

const Course = (course) => {
    const root = document.createElement('div');
    const render = () => {
        root.replaceChildren(
            Header(course),
            Content(course),
            Total(course)
        );
    };
    render();
    return root;
};

export default Course;
