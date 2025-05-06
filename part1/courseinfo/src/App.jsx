const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part data={props.course.parts[0]}/>
      <Part data={props.course.parts[1]}/>
      <Part data={props.course.parts[2]}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.data.name} {props.data.exercises}</p>
  )
}

const Total = (props) => {
  const count = props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises;

  return (
    <p>Number of exercises {count}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course}></Header>
      <Content course={course}></Content>
      <Total course={course}></Total>
    </>
  )
}

export default App