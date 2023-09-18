import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const OnClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldTodo = oldToDos[targetIndex];
      const newToDo = { ...oldTodo, category: newCategory };
      const newToDos = [...oldToDos];
      newToDos[targetIndex] = newToDo;
      return newToDos;
    });
  };
  return (
    <li>
      {category !== "TO_DO" && (
        <button onClick={() => OnClick("TO_DO")}>To Do</button>
      )}
      {category !== "DOING" && (
        <button onClick={() => OnClick("DOING")}>DOING</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => OnClick("DONE")}>DONE</button>
      )}
      <span style={{ marginLeft: "10px" }}>{text}</span>
      <span style={{ marginLeft: "10px" }}>{category}</span>
    </li>
  );
}

export default ToDo;
