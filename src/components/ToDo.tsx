import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const OnClick = (newCategory: Categories) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo: IToDo = { text, id, category: newCategory };
      const newToDos = [...oldToDos];
      newToDos.splice(targetIndex, 1, newToDo);
      return newToDos;
    });
  };
  return (
    <li>
      {category !== Categories.TO_DO && (
        <button onClick={() => OnClick(Categories.TO_DO)}>To Do</button>
      )}
      {category !== Categories.DOING && (
        <button onClick={() => OnClick(Categories.DOING)}>DOING</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => OnClick(Categories.DONE)}>DONE</button>
      )}
      <span style={{ marginLeft: "10px" }}>{text}</span>
    </li>
  );
}

export default ToDo;
