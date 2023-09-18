import React from "react";

import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const handleValid = (data: IForm) => {
    console.log("add to do", data.toDo);
    setValue("toDo", "");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Plase write a To Do",
          })}
          placeholder="text"
        />
        <button>Add</button>
        <span>{errors?.toDo?.message?.toString()}</span>
      </form>
    </div>
  );
}

export default ToDoList;
