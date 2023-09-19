import React from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./components/CreateToDo";
import { IToDo, categoryState, toDoSelector, toDoState } from "./atoms";
import ToDo from "./components/ToDo";

function ToDoList() {
  const selectedList = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form>
        <select
          value={category}
          onInput={onInput}
        >
          <option value="TO_DO">To Do</option>
          <option value="DOING">Doing</option>
          <option value="DONE">Done</option>
        </select>
      </form>
      <CreateToDo />
      <ul>
        {selectedList.map((ele) => (
          <ToDo
            key={ele.id}
            {...ele}
          />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
