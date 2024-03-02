import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [task, setTask] = useState("");
  const [toDo, settodo] = useState([]);
  const [IndexEdit, setEdit] = useState(null);
  const [editmode, setEditMode] = useState(false);
  const TODO = "todoo";

  const handle = (event) => {
    const { value } = event.target;

    setTask(value);
  };

  const click = () => {
    const newvalue = [...toDo, { name: task, isCompleted: false }];
    settodo(newvalue);
    setTask("");

    localStorage.setItem(TODO, JSON.stringify(newvalue));
  };

  console.log("nova vrijednost:", toDo);

  const deletee = (index) => {
    const nova = [...toDo];

    nova.splice(index, 1);
    settodo(nova);

    localStorage.setItem(TODO, JSON.stringify(nova));
  };

  const handleedit = (taskedit, index) => {
    setTask(taskedit.name);
    setEditMode(true);
    setEdit(index);
  };

  const handleupdate = () => {
    const nova = [...toDo];
    nova[IndexEdit].name = task;
    settodo(nova);
    setEditMode(false);
    setTask("");

    localStorage.setItem(TODO, JSON.stringify(nova));
  };

  useEffect(() => {
    const items = localStorage.getItem(TODO);

    if (items) {
      const parseint = JSON.parse(items);

      settodo(parseint);
    }
  }, []);

  const handleComplete = (index) => {
    const nova = [...toDo];

    nova[index].isCompleted = true;

    settodo(nova);

    localStorage.setItem(TODO, JSON.stringify(nova));
  };

  return (
    <div className="App">
      <h1>TODO APP</h1>
      <header className="App-header">
        <div>
          <input value={task} onChange={(event) => handle(event)} />
          <button
            disabled={task.length < 0}
            className="button-dugme"
            onClick={editmode ? handleupdate : click}
          >
            {editmode ? "UPDATE" : "CREATE"}
          </button>
        </div>
        <div>
          {toDo.map((doo, index) => (
            <div key={index} className="todo-wraper">
              <p className={`${doo.isCompleted ? "complete" : ""}`}>
                {doo.name}
              </p>
              <div className="action-wrapper">
                <button
                  className="complete-button"
                  onClick={() => handleComplete(index)}
                  disabled={doo.isCompleted}
                >
                  COMPLETED
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleedit(doo, index)}
                  disabled={doo.isCompleted}
                >
                  EDIT
                </button>
                <button className="dugme" onClick={() => deletee(index)}>
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;
