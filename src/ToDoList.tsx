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
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
        />
        <input
          {...register("username", {
            required: "Username is required",
            minLength: { value: 10, message: "your password is too short" },
          })}
          placeholder="Username"
        />
        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 5, message: "your password is too short" },
          })}
          placeholder="Password"
        />
        <input
          {...register("password2", {
            required: "Password2 is required",
            minLength: { value: 5, message: "your password is too short" },
          })}
          placeholder="Password Confirm"
        />
        <button>Add</button>
      </form>
    </div>
  );
  /*
    input의 기본 required 속성을 사용하면 디버깅 툴로 쉽게 제거할 수 있음
    react-hook-form에서 required는 자바스크립트에서 제어하기 때문에 조금 더 안전할 수 있음

   */
}

export default ToDoList;
