import React from "react";
import { useForm } from "react-hook-form";

import { useSetRecoilState } from "recoil";
import { IToDo, todoState } from "./Atoms";

interface IForm {
  toDo: string;
}
const CreateTodo = () => {
  const setToDos = useSetRecoilState(todoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { id: Date.now(), text: toDo, category: "TO_DO" },
      ...oldToDos,
    ]); //신규값 위에 기존값 아래에
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please Write a Todo" })}
        placeholder="Write a Todo"
      />
      <button>Add</button>
    </form>
  );
};

export default CreateTodo;
