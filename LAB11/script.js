const changeText = (event) => {
  console.log(event.target);
  event.target.innerText = event.target.innerText + " 被點了";
};

function App() {
  const styleArgument = {
    color: "blue",
    cursor: "pointer"
  };

  return (
    <div className="App">
      <h1 style={styleArgument} onClick={changeText}>
        hello CGU!!
      </h1>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
