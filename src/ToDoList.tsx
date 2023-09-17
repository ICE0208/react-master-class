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

interface IForm {
  email: string;
  username: string;
  password: string;
  password2: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(errors);

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message?.toString()}</span>
        <input
          {...register("username", {
            required: "Username is required",
            minLength: { value: 10, message: "your password is too short" },
          })}
          placeholder="Username"
        />
        <span>{errors?.username?.message?.toString()}</span>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 5, message: "your password is too short" },
          })}
          placeholder="Password"
        />
        <span>{errors?.password?.message?.toString()}</span>
        <input
          {...register("password2", {
            required: "Password2 is required",
            minLength: { value: 5, message: "your password is too short" },
          })}
          placeholder="Password Confirm"
        />
        <span>{errors?.password2?.message?.toString()}</span>
        <button>Add</button>
      </form>
    </div>
  );
  /*
    input의 기본 required 속성을 사용하면 디버깅 툴로 쉽게 제거할 수 있음
    react-hook-form에서 required는 자바스크립트에서 제어하기 때문에 조금 더 안전할 수 있음
    
    useForm->formState->errors의 정보로 올바르지 않은 데이터의 정보를 얻을 수 있음.
   */
}

export default ToDoList;
