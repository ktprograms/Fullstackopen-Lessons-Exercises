const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Header = ({ course }) => <h2>{course.name}</h2>

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => <Part key={part.id} part={part} />)}
    </>
  )
}

const Total = ({ course }) => (
  <b>total of {course.parts.map((part) => part.exercises).reduce((acc, n) => acc + n, 0)} exercises</b>
)

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default Course