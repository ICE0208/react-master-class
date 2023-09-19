import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}
function CreateToDo() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const handleValid = (data: IForm) => {
    console.log("add to do", data.toDo);
    setToDos((oldToDos) => [
      { text: data.toDo, id: Date.now(), category: category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
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
  );
}

export default CreateToDo;
