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
document.querySelector('#part1').textContent = parts[0].name + ' ' + parts[0].exercises;
document.querySelector('#part2').textContent = parts[1].name + ' ' + parts[1].exercises;
document.querySelector('#part3').textContent = parts[2].name + ' ' + parts[2].exercises;
document.querySelector('#total').textContent = parts[0].exercises + parts[1].exercises + parts[2].exercises;
