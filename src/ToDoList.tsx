import React from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./components/CreateToDo";
import { Categories, categoryState, toDoSelector } from "./atoms";
import ToDo from "./components/ToDo";

function ToDoList() {
  const selectedList = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    // TODO fix later (any)
    setCategory(event.currentTarget.value as any);
  };
  console.log(selectedList);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form>
        <select
          value={category}
          onInput={onInput}
        >
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
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
