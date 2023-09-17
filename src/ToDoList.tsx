import React, { useState } from "react";

import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setTodo] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setTodo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(toDo);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           type="text"
//           value={toDo}
//           onChange={onChange}
//           placeholder="Write a to do"
//         />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  const { register, watch } = useForm();
  console.log(watch());

  return (
    <div>
      <form>
        <input
          {...register("Email")}
          placeholder="Email"
        />
        <input
          {...register("Username")}
          placeholder="Username"
        />
        <input
          {...register("Password")}
          placeholder="Password"
        />
        <input
          {...register("Password Confirm")}
          placeholder="Password Confirm"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
