import React from "react";

import { useRecoilValue } from "recoil";
import CreateToDo from "./components/CreateToDo";
import { toDoSelector, toDoState } from "./atoms";
import ToDo from "./components/ToDo";

function ToDoList() {
  const [toDo, doing, done] = useRecoilValue(toDoSelector);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <h2>To Do</h2>
      <ul>
        {toDo.map((toDo) => (
          <ToDo
            {...toDo}
            key={toDo.id}
          />
        ))}
      </ul>
      <hr />
      <h2>Doing</h2>
      <ul>
        {doing.map((toDo) => (
          <ToDo
            {...toDo}
            key={toDo.id}
          />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((toDo) => (
          <ToDo
            {...toDo}
            key={toDo.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
