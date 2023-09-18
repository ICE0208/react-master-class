import { IToDo } from "../atoms";

function ToDo({ text }: IToDo) {
  return (
    <li>
      <button>To Do</button>
      <button>Doing</button>
      <button>Done</button>
      <span style={{ marginLeft: "10px" }}>{text}</span>
    </li>
  );
}

export default ToDo;
