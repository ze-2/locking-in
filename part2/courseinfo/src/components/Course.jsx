const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => {
  return parts.map((part) => <Part key={part.name} part={part} />);
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);


const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => {
        return sum + part.exercises;
    }, 0);

    return <p>Number of exercises {total}</p>;
};

const Course = ({ courses }) => {
  return courses.map((course) => (
    <div key={course.name}>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  ));
};

export default Course