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

document.querySelector('#header').textContent = course;
document.querySelector('#part1').textContent = part1 + ' ' + exercises1;
document.querySelector('#part2').textContent = part2 + ' ' + exercises2;
document.querySelector('#part3').textContent = part3 + ' ' + exercises3;
document.querySelector('#total').textContent = exercises1 + exercises2 + exercises3;
