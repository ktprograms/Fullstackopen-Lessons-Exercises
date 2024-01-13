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

document.querySelector('#header').textContent = course;
document.querySelector('#part1').textContent = part1.name + ' ' + part1.exercises;
document.querySelector('#part2').textContent = part2.name + ' ' + part2.exercises;
document.querySelector('#part3').textContent = part3.name + ' ' + part3.exercises;
document.querySelector('#total').textContent = part1.exercises + part2.exercises + part3.exercises;
