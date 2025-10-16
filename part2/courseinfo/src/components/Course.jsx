const Header = ({ header }) => <h1>{header}</h1>

const Course = ({ header, content }) => {
  return (
    <>
        <Header header={header}></Header>
        <Content content={content}></Content>
        <Total parts={content} />
    </>
  );
}

const Content = ({ content }) => (
  <>
    {content.map((part) =>
      <Part
      key={part.name}
      name={part.name}
      exercises={part.exercises}/>
    )}
  </>
);

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
)

const Total = ({ parts }) => {

  let total = parts.reduce((sum, part) =>
    sum += part.exercises,
    // initial value of sum (accumulator)
    0
  );

  return (
    <>
      <b>Number of exercises {total}</b>
    </>
  );

}

export default Course;